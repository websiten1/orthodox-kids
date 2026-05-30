import { getParishSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function EvangheligePage() {
  const session = await getParishSession();
  if (!session) return null;

  const today = new Date();
  const isSunday = today.getDay() === 0;

  const upcomingGospels = await prisma.gospel.findMany({
    orderBy: { calendarDate: "asc" },
    take: 10,
    include: {
      schedules: {
        where: { isActive: true },
        take: 1,
      },
    },
  });

  return (
    <div className="p-4 lg:p-8 max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Evanghelia Zilei</h1>
        <p className="text-gray-500 font-sans text-sm mt-1">
          Duminica, copiii pot accesa Evanghelia zilei cu activități interactive.
        </p>
      </div>

      {!isSunday && (
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-center">
          <div className="text-4xl mb-3">📅</div>
          <p className="text-gray-500 font-sans text-sm">
            Evanghelia zilei este activă automat în fiecare duminică.
            <br />
            Azi este {today.toLocaleDateString("ro-RO", { weekday: "long" })}.
          </p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">Evanghelii înregistrate</h2>
        </div>
        {upcomingGospels.length === 0 ? (
          <p className="text-center py-8 text-gray-400 font-sans text-sm">
            Rulați: npm run db:seed pentru a popula evangheliile.
          </p>
        ) : (
          <div className="divide-y divide-gray-50">
            {upcomingGospels.map((gospel) => (
              <div key={gospel.id} className="px-5 py-3.5 flex items-center gap-4">
                <div className="text-2xl">✦</div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">{gospel.title}</p>
                  <p className="text-xs text-gray-400 font-sans">
                    {new Date(gospel.calendarDate).toLocaleDateString("ro-RO", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                    {gospel.isHoliday && <span className="ml-2 text-amber-500">🌟 Sărbătoare</span>}
                  </p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-lg font-sans font-semibold ${
                  gospel.schedules.length > 0 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"
                }`}>
                  {gospel.schedules.length > 0 ? "Programată" : "Inactivă"}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
