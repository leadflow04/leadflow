import { supabase } from "@/lib/supabase";

type Props = {
  activePage: string;
  onNavigate: (page: string) => void;
};

export default function Sidebar({ activePage, onNavigate }: Props) {
  return (
    <div className="w-52 bg-white border-r border-gray-200 flex flex-col p-4 gap-1">
      <div className="text-lg font-medium mb-6">Lead<span className="text-blue-500">Flow</span></div>
      {["Dashboard", "Sourcing", "Mes leads", "Agences", "Revenus", "Paramètres"].map((item) => (
        <div
          key={item}
          onClick={() => onNavigate(item)}
          className={`px-3 py-2 rounded-lg text-sm cursor-pointer ${
            activePage === item
              ? "bg-blue-50 text-blue-600 font-medium"
              : "text-gray-500 hover:bg-gray-100"
          }`}
        >
          {item}
        </div>
      ))}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <button onClick={() => supabase.auth.signOut()} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium">Déconnexion</button>
      </div>
    </div>
  );
}