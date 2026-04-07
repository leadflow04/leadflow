"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Lead = {
  id: string;
  nom: string;
  dirigeant: string;
  ville: string;
  tel: string;
  email: string;
  website?: string;
  statut: string;
  agence: string;
  niche: string;
};

const badgeColor: Record<string, string> = {
  "Pas de site": "bg-red-100 text-red-700",
  "Site obsolète": "bg-yellow-100 text-yellow-700",
  "Site web trouvé": "bg-blue-100 text-blue-700",
  "Email trouvé": "bg-green-100 text-green-700",
  "Site correct": "bg-emerald-100 text-emerald-700",
};

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [filtreStatut, setFiltreStatut] = useState("Tous");
  const [filtreAgence, setFiltreAgence] = useState("Toutes");
  const [showForm, setShowForm] = useState(false);
  const [nom, setNom] = useState("");
  const [dirigeant, setDirigeant] = useState("");
  const [ville, setVille] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [statut, setStatut] = useState("Pas de site");
  const [agence, setAgence] = useState("Media Solar");
  const [niche, setNiche] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchLeads = async () => {
    const { data } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (data) setLeads(data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleSave = async () => {
    if (!nom) return;
    setLoading(true);
    await supabase.from("leads").insert({ nom, dirigeant, ville, tel, email, website, statut, agence, niche });
    setNom(""); setDirigeant(""); setVille(""); setTel(""); setEmail(""); setWebsite(""); setNiche("");
    setShowForm(false);
    setLoading(false);
    fetchLeads();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("leads").delete().eq("id", id);
    fetchLeads();
  };

  const filtered = leads.filter((l) => {
    const matchSearch = l.nom?.toLowerCase().includes(search.toLowerCase()) || l.ville?.toLowerCase().includes(search.toLowerCase());
    const matchStatut = filtreStatut === "Tous" || l.statut === filtreStatut;
    const matchAgence = filtreAgence === "Toutes" || l.agence === filtreAgence;
    return matchSearch && matchStatut && matchAgence;
  });

  const exportCSV = () => {
    if (filtered.length === 0) return;
    const headers = ["Entreprise", "Dirigeant", "Ville", "Téléphone", "Email", "Site Web", "Statut", "Agence", "Niche"];
    const rows = filtered.map(l => [
      `"${l.nom || ""}"`,
      `"${l.dirigeant || ""}"`,
      `"${l.ville || ""}"`,
      `"${l.tel || ""}"`,
      `"${l.email || ""}"`,
      `"${l.website || ""}"`,
      `"${l.statut || ""}"`,
      `"${l.agence || ""}"`,
      `"${l.niche || ""}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">Mes leads</h1>
        <div className="flex gap-2">
          <button onClick={exportCSV} className="bg-white border border-gray-200 text-gray-700 text-sm px-4 py-2 rounded-lg hover:bg-gray-50">Exporter en CSV</button>
          <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600">+ Ajouter un lead</button>
        </div>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="text-sm font-medium mb-4">Nouveau lead</div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Entreprise</label>
              <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Nom entreprise" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Dirigeant</label>
              <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm" value={dirigeant} onChange={(e) => setDirigeant(e.target.value)} placeholder="Prénom Nom" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Ville</label>
              <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm" value={ville} onChange={(e) => setVille(e.target.value)} placeholder="Lyon" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Téléphone</label>
              <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="06 xx xx xx xx" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Email</label>
              <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@entreprise.fr" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Site Web</label>
              <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="https://..." />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Niche</label>
              <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm" value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="Cuisiniste" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Statut site</label>
              <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm" value={statut} onChange={(e) => setStatut(e.target.value)}>
                <option>Pas de site</option>
                <option>Site web trouvé</option>
                <option>Email trouvé</option>
                <option>Site obsolète</option>
                <option>Site correct</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Agence</label>
              <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm" value={agence} onChange={(e) => setAgence(e.target.value)} placeholder="Media Solar" />
            </div>
          </div>
          <button onClick={handleSave} disabled={loading} className="mt-4 bg-blue-500 text-white text-sm px-6 py-2 rounded-lg disabled:opacity-50">
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      )}

      <div className="flex gap-3">
        <input className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" placeholder="Rechercher par nom, ville..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filtreStatut} onChange={(e) => setFiltreStatut(e.target.value)}>
          {["Tous", "Pas de site", "Site web trouvé", "Email trouvé", "Site obsolète", "Site correct"].map((s) => <option key={s}>{s}</option>)}
        </select>
        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white" value={filtreAgence} onChange={(e) => setFiltreAgence(e.target.value)}>
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
              <th className="text-left pb-3">Site Web</th>
              <th className="text-left pb-3">Statut</th>
              <th className="text-left pb-3">Agence</th>
              <th className="text-left pb-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td colSpan={9} className="text-center text-gray-400 py-8">Aucun lead — ajoute ton premier lead !</td></tr>
            )}
            {filtered.map((l) => (
              <tr key={l.id} className="border-t border-gray-50">
                <td className="py-3 font-medium">{l.nom}</td>
                <td className="py-3 text-gray-500">{l.dirigeant}</td>
                <td className="py-3 text-gray-500">{l.ville}</td>
                <td className="py-3 text-gray-500">{l.tel}</td>
                <td className="py-3 text-gray-400">{l.email || "—"}</td>
                <td className="py-3">
                  {l.website ? (
                    <a href={l.website.startsWith('http') ? l.website : `https://${l.website}`} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline max-w-[150px] truncate block" title={l.website}>
                      Lien
                    </a>
                  ) : "—"}
                </td>
                <td className="py-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${badgeColor[l.statut] || 'bg-gray-100 text-gray-600'}`}>{l.statut}</span></td>
                <td className="py-3 text-gray-500">{l.agence}</td>
                <td className="py-3"><button onClick={() => handleDelete(l.id)} className="text-xs text-gray-400 hover:text-red-500">Supprimer</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}