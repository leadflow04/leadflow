"use client";
import { useState } from "react";

const allLeads = [
  { name: "Cuisines Dupont", dirigeant: "Marc Dupont", ville: "Lyon", tel: "06 12 34 56 78", email: "marc@cuisinesdupont.fr", statut: "Pas de site", agence: "Media Solar", niche: "Cuisiniste" },
  { name: "Atelier Cuisine", dirigeant: "Sophie Martin", ville: "Bordeaux", tel: "07 23 45 67 89", email: "", statut: "Site obsolète", agence: "WebPro", niche: "Cuisiniste" },
  { name: "Micka Service", dirigeant: "Mickael Saada", ville: "Montpellier", tel: "07 83 07 28 74", email: "", statut: "Pas de site", agence: "Media Solar", niche: "Plombier" },
  { name: "La Cuisine de Paul", dirigeant: "Paul Renard", ville: "Nantes", tel: "06 98 76 54 32", email: "paul@cuisinedepaul.fr", statut: "Site correct", agence: "DigiLocal", niche: "Cuisiniste" },
  { name: "Wedding Dreams", dirigeant: "Julie Blanc", ville: "Paris", tel: "06 11 22 33 44", email: "", statut: "Pas de site", agence: "Media Solar", niche: "Wedding planner" },
  { name: "CBD Shop Lyon", dirigeant: "Kevin Morel", ville: "Lyon", tel: "07 55 66 77 88", email: "kevin@cbdlyon.fr", statut: "Site obsolète", agence: "WebPro", niche: "CBD" },
];

const badgeColor: Record<string, string> = {
  "Pas de site": "bg-red-100 text-red-700",
  "Site obsolète": "bg-yellow-100 text-yellow-700",
  "Site correct": "bg-green-100 text-green-700",
};

export default function Leads() {
  const [search, setSearch] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("Tous");
  const [filtreAgence, setFiltreAgence] = useState("Toutes");

  const filtered = allLeads.filter((l) => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.ville.toLowerCase().includes(search.toLowerCase());
    const matchStatut = filtreStatut === "Tous" || l.statut === filtreStatut;
    const matchAgence = filtreAgence === "Toutes" || l.agence === filtreAgence;
    return matchSearch && matchStatut && matchAgence;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">Mes leads</h1>
        <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg">⬇ Exporter Excel</button>
      </div>

      <div className="flex gap-3">
        <input
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          placeholder="Rechercher par nom, ville..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          value={filtreStatut}
          onChange={(e) => setFiltreStatut(e.target.value)}
        >
          {["Tous", "Pas de site", "Site obsolète", "Site correct"].map((s) => <option key={s}>{s}</option>)}
        </select>
        <select
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white"
          value={filtreAgence}
          onChange={(e) => setFiltreAgence(e.target.value)}
        >
          {["Toutes", "Media Solar", "WebPro", "DigiLocal"].map((a) => <option key={a}>{a}</option>)}
        </select>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <div className="text-xs text-gray-400 mb-3">{filtered.length} leads trouvés</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 uppercase">
              <th className="text-left pb-3">Entreprise</th>
              <th className="text-left pb-3">Dirigeant</th>
              <th className="text-left pb-3">Ville</th>
              <th className="text-left pb-3">Téléphone</th>
              <th className="text-left pb-3">Email</th>
              <th className="text-left pb-3">Statut</th>
              <th className="text-left pb-3">Agence</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.name} className="border-t border-gray-50">
                <td className="py-3 font-medium">{l.name}</td>
                <td className="py-3 text-gray-500">{l.dirigeant}</td>
                <td className="py-3 text-gray-500">{l.ville}</td>
                <td className="py-3 text-gray-500">{l.tel}</td>
                <td className="py-3 text-gray-400">{l.email || "—"}</td>
                <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColor[l.statut]}`}>{l.statut}</span></td>
                <td className="py-3 text-gray-500">{l.agence}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}