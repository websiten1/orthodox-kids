import { getParishSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function SetariPage() {
  const session = await getParishSession();
  if (!session) return null;

  const parish = await prisma.parish.findUnique({
    where: { id: session.parishId },
    select: { name: true, city: true, email: true, subscriptionPlan: true, createdAt: true },
  });

  if (!parish) return null;

  return (
    <div className="p-4 lg:p-8 max-w-xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Setări parohie</h1>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
        <h2 className="font-bold text-gray-800">Informații parohie</h2>
        <div className="space-y-3">
          {[
            { label: "Nume parohie", value: parish.name },
            { label: "Oraș", value: parish.city },
            { label: "Email", value: parish.email },
            { label: "Plan", value: parish.subscriptionPlan === "free" ? "Gratuit" : "Premium" },
            { label: "Cont creat", value: new Date(parish.createdAt).toLocaleDateString("ro-RO") },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between">
              <span className="text-sm text-gray-500 font-sans">{label}</span>
              <span className="text-sm font-semibold text-gray-800 font-sans">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-albastru bg-opacity-5 rounded-2xl p-5 border border-blue-200">
        <h3 className="font-bold text-albastru mb-2">📊 Plan gratuit activ</h3>
        <ul className="space-y-1 text-sm text-gray-600 font-sans">
          <li>✅ Până la 3 grupe</li>
          <li>✅ Toate cele 12 teme pre-create</li>
          <li>✅ Mini-jocuri de echipă</li>
          <li>✅ Dashboard și rapoarte</li>
        </ul>
      </div>
    </div>
  );
}
