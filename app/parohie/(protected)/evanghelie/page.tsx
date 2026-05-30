import { getParishSession } from "@/lib/auth";

const GOSPELS = [
  { id: "g1", title: "Pilda Fiului Risipitor", date: "16 martie 2025", active: true },
  { id: "g2", title: "Vindecarea orbului din naștere", date: "23 martie 2025", active: false },
  { id: "g3", title: "Învierea lui Lazăr", date: "30 martie 2025", active: false },
];

export default async function EvangheligePage() {
  const session = await getParishSession();
  if (!session) return null;
  return (
    <div className="p-4 lg:p-8 max-w-3xl space-y-6 lg:pt-8 pt-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Evanghelia Zilei</h1>
        <p className="text-gray-500 font-sans text-sm mt-1">Duminica, copiii pot accesa Evanghelia zilei cu activități interactive.</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-800">Evanghelii disponibile</h2>
        </div>
        <div className="divide-y divide-gray-50">
          {GOSPELS.map(gospel => (
            <div key={gospel.id} className="px-5 py-3.5 flex items-center gap-4">
              <div className="text-2xl">✦</div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800 text-sm">{gospel.title}</p>
                <p className="text-xs text-gray-400 font-sans">{gospel.date}</p>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-lg font-sans font-semibold ${gospel.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                {gospel.active ? "Activă" : "Inactivă"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
