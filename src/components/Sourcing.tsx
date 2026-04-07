"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

const niches = ["Cuisiniste", "Wedding planner", "CBD", "Plombier", "Électricien", "Coiffeur"];
const agences = ["Media Solar", "Agence WebPro", "DigiLocal"];

export default function Sourcing() {
  const [niche, setNiche] = useState("");
  const [villes, setVilles] = useState("");
  const [exclusions, setExclusions] = useState<string[]>(["cuisinella", "ikea", "darty"]);
  const [newExclusion, setNewExclusion] = useState("");
  const [agence, setAgence] = useState(agences[0]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; count: number } | null>(null);

  const addExclusion = () => {
    if (newExclusion.trim()) {
      setExclusions([...exclusions, newExclusion.trim()]);
      setNewExclusion("");
    }
  };

  const removeExclusion = (tag: string) => {
    setExclusions(exclusions.filter((e) => e !== tag));
  };

  const handleLancer = async () => {
    if (!niche || !villes) return;
    setLoading(true);
    setResult(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();

      const res = await fetch("/api/scraping", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(session ? { "Authorization": `Bearer ${session.access_token}` } : {})
        },
        body: JSON.stringify({ niche, villes, agence, exclusions }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ success: false, count: 0 });
    }

    setLoading(false);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">Nouveau sourcing</h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-4">
          <div className="text-sm font-medium">Paramètres de recherche</div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Niche</label>
            <input
              list="niches"
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Ex: Cuisiniste, CBD..."
              value={niche}
              onChange={(e) => setNiche(e.target.value)}
            />
            <datalist id="niches">
              {niches.map((n) => <option key={n} value={n} />)}
            </datalist>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Villes (séparées par des virgules)</label>
            <input
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Ex: Lyon, Bordeaux, Nantes"
              value={villes}
              onChange={(e) => setVilles(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Agence destinataire</label>
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={agence}
              onChange={(e) => setAgence(e.target.value)}
            >
              {agences.map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-4">
          <div className="text-sm font-medium">Mots-clés à exclure</div>

          <div className="flex gap-2">
            <input
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              placeholder="Ex: ikea, darty..."
              value={newExclusion}
              onChange={(e) => setNewExclusion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addExclusion()}
            />
            <button
              onClick={addExclusion}
              className="bg-gray-100 text-gray-600 text-sm px-3 py-2 rounded-lg hover:bg-gray-200"
            >
              Ajouter
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {exclusions.map((tag) => (
              <span
                key={tag}
                className="bg-red-50 text-red-600 text-xs px-3 py-1 rounded-full flex items-center gap-1 cursor-pointer"
                onClick={() => removeExclusion(tag)}
              >
                {tag} ✕
              </span>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-gray-100">
            <button
              onClick={handleLancer}
              disabled={loading || !niche || !villes}
              className="w-full bg-blue-500 text-white text-sm py-3 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Sourcing en cours..." : "🚀 Lancer le sourcing"}
            </button>
            {loading && (
              <div className="mt-3 text-center text-xs text-gray-400">
                Recherche en cours sur Google Maps...
              </div>
            )}
            {result && result.success && (
              <div className="mt-3 bg-green-50 text-green-700 text-sm text-center py-2 rounded-lg">
                ✓ {result.count} leads générés et sauvegardés !
              </div>
            )}
            {result && !result.success && (
              <div className="mt-3 bg-red-50 text-red-700 text-sm text-center py-2 rounded-lg">
                Erreur — vérifie ta clé API Serper
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}