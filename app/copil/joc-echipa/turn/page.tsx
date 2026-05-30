import { getChildSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import TurnulCredinteiGame from "@/components/child/TurnulCredintei";

export default async function TurnulCredinteiPage() {
  const session = await getChildSession();
  if (!session) return null;

  const child = await prisma.child.findUnique({
    where: { id: session.childId },
    include: {
      team: {
        include: {
          group: {
            include: {
              teams: { include: { children: { select: { id: true, displayName: true } } } },
            },
          },
        },
      },
    },
  });

  if (!child?.team) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-crem px-4">
        <div className="text-center space-y-4">
          <div className="text-5xl">🛡️</div>
          <h2 className="text-xl font-bold text-albastru">
            Nu ești în nicio echipă
          </h2>
          <p className="text-maro font-sans text-sm">
            Așteptați să fiți atribuiți la o echipă de preot.
          </p>
          <a href="/copil/echipa" className="block py-3 px-6 bg-albastru text-white rounded-xl font-sans">
            Înapoi
          </a>
        </div>
      </div>
    );
  }

  // Găsim o echipă adversă
  const otherTeams = child.team.group.teams.filter(
    (t) => t.id !== child.team!.id
  );
  const opponentTeam = otherTeams[0] ?? null;

  // Luăm întrebări random din DB
  const questions = await prisma.question.findMany({
    take: 10,
    orderBy: { id: "asc" }, // în producție: random
    include: { activity: { select: { themeId: true } } },
  });

  return (
    <TurnulCredinteiGame
      myTeam={{ id: child.team.id, name: child.team.name }}
      opponentTeam={
        opponentTeam
          ? { id: opponentTeam.id, name: opponentTeam.name }
          : { id: "ai", name: "Echipa Calcinii" }
      }
      childId={child.id}
      questions={questions.map((q) => ({
        id: q.id,
        text: q.text,
        options: q.options as string[],
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      }))}
    />
  );
}
