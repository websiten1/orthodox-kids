import { getChildSession } from "@/lib/auth";
import { DEMO_QUIZ_QUESTIONS } from "@/lib/demo-data";
import TurnulCredinteiGame from "@/components/child/TurnulCredintei";

export default async function TurnulCredinteiPage() {
  const session = await getChildSession();
  if (!session) return null;
  return (
    <TurnulCredinteiGame
      myTeam={{ id: "t1", name: "Apostolii" }}
      opponentTeam={{ id: "t2", name: "Îngerii" }}
      childId={session.childId}
      questions={DEMO_QUIZ_QUESTIONS}
    />
  );
}
