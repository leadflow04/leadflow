"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Agence = {
  id: string;
  nom: string;
  contact: string;
  email: string;
  tel: string;
  leads: number;
  tarif: number;
  commission: number;
  statut: string;
};

export default function Agences() {
  const [agences, setAgences] = useState<Agence[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [nom, setNom] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [tarif, setTarif] = useState("");
  const [commission, setCommission] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAgences = async () => {
    const { data } = await supabase.from("agences").select("*").order("created_at", { ascending: false });
    if (data) setAgences(data);
  };

  useEffect(() => {
    fetchAgences();
  }, []);

  const handleSave = async () => {
    if (!nom) return;
    setLoading(true);
    await supabase.from("agences").insert({
      nom, contact, email, tel,
      tarif: Number(tarif),
      commission: Number(commission),
      statut: "Actif"
    });
    setNom(""); setContact(""); setEmail(""); setTel(""); setTarif(""); setCommission("");
    setShowForm(false);
    setLoading(false);
    fetchAgences();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("agences").delete().eq("id", id);
    fetchAgences();
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">Agences clientes</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg">
          + Ajouter une agence
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="text-sm font-medium mb-4">Nouvelle agence</div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Nom</label>
              <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Ex: Media Solar" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Contact</label>
              <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Prénom Nom" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Email</label>
              <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@agence.fr" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Téléphone</label>
              <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="06 xx xx xx xx" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Tarif fixe (€/mois)</label>
              <input type="number" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" value={tarif} onChange={(e) => setTarif(e.target.value)} placeholder="500" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Commission (%)</label>
              <input type="number" className="border border-gray-200 rounded-lg px-3 py-2 text-sm" value={commission} onChange={(e) => setCommission(e.target.value)} placeholder="5" />
            </div>
          </div>
          <button onClick={handleSave} disabled={loading} className="mt-4 bg-blue-500 text-white text-sm px-6 py-2 rounded-lg disabled:opacity-50">
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {agences.length === 0 && (
          <div className="text-center text-gray-400 text-sm py-10">Aucune agence — ajoute ta première agence !</div>
        )}
        {agences.map((a) => (
          <div key={a.id} className="bg-white border border-gray-100 rounded-xl p-5 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="font-medium text-sm">{a.nom}</div>
              <div className="text-xs text-gray-400">{a.contact} · {a.email} · {a.tel}</div>
            </div>
            <div className="flex gap-8 items-center">
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Tarif fixe</div>
                <div className="font-medium text-sm text-green-500">{a.tarif}€</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Commission</div>
                <div className="font-medium text-sm">{a.commission > 0 ? `${a.commission}%` : "—"}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Statut</div>
                <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 font-medium">{a.statut}</span>
              </div>
              <button onClick={() => handleDelete(a.id)} className="text-xs text-gray-400 hover:text-red-500">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}