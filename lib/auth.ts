import { cookies } from "next/headers";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "calea-luminii-secret-dev-key-32chars"
);

export type ParishSession = {
  type: "parish";
  parishId: string;
  email: string;
  name: string;
};

export type ChildSession = {
  type: "child";
  childId: string;
  groupId: string;
  displayName: string;
  talantsBalance: number;
};

export type ParentSession = {
  type: "parent";
  parentId: string;
  childId: string;
};

export type Session = ParishSession | ChildSession | ParentSession;

export async function signToken(payload: Session): Promise<string> {
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as Session;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("calea-parish-token")?.value ||
    cookieStore.get("calea-child-token")?.value ||
    cookieStore.get("calea-parent-token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function getParishSession(): Promise<ParishSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("calea-parish-token")?.value;
  if (!token) return null;
  const session = await verifyToken(token);
  if (!session || session.type !== "parish") return null;
  return session;
}

export async function getChildSession(): Promise<ChildSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("calea-child-token")?.value;
  if (!token) return null;
  const session = await verifyToken(token);
  if (!session || session.type !== "child") return null;
  return session;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function loginParish(
  email: string,
  password: string
): Promise<{ token: string; parish: { id: string; name: string; email: string } } | null> {
  const parish = await prisma.parish.findUnique({ where: { email } });
  if (!parish) return null;
  const valid = await verifyPassword(password, parish.passwordHash);
  if (!valid) return null;

  const session: ParishSession = {
    type: "parish",
    parishId: parish.id,
    email: parish.email,
    name: parish.name,
  };
  const token = await signToken(session);
  return { token, parish: { id: parish.id, name: parish.name, email: parish.email } };
}

export async function loginChildWithCode(
  groupInviteCode: string,
  accessToken: string
): Promise<{ token: string; child: { id: string; displayName: string } } | null> {
  const group = await prisma.group.findUnique({
    where: { inviteCode: groupInviteCode },
  });
  if (!group) return null;

  const child = await prisma.child.findFirst({
    where: { accessToken, groupId: group.id },
  });
  if (!child) return null;

  const session: ChildSession = {
    type: "child",
    childId: child.id,
    groupId: child.groupId,
    displayName: child.displayName,
    talantsBalance: child.talantsBalance,
  };
  const token = await signToken(session);
  return { token, child: { id: child.id, displayName: child.displayName } };
}

export function generateInviteCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}
