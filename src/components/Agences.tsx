"use client";
import { useState } from "react";

const agencesData = [
  { nom: "Media Solar", contact: "Jean Dupuis", email: "jean@mediasolar.fr", tel: "06 12 34 56 78", leads: 3200, tarif: 600, commission: 5, statut: "Actif" },
  { nom: "Agence WebPro", contact: "Marie Leroy", email: "marie@webpro.fr", tel: "07 23 45 67 89", leads: 500, tarif: 500, commission: 0, statut: "Actif" },
  { nom: "DigiLocal", contact: "Pierre Martin", email: "pierre@digilocal.fr", tel: "06 98 76 54 32", leads: 300, tarif: 300, commission: 0, statut: "Actif" },
];

export default function Agences() {
  const [showForm, setShowForm] = useState(false);
  const [nom, setNom] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [tarif, setTarif] = useState("");
  const [commission, setCommission] = useState("");

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">Agences clientes</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg"
        >
          + Ajouter une agence
        </button>
      </div>

      {showForm && (
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="text-sm font-medium mb-4">Nouvelle agence</div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-400">Nom de l'agence</label>
              <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm" value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Ex: Agence WebPro" />
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
          <button className="mt-4 bg-blue-500 text-white text-sm px-6 py-2 rounded-lg">Enregistrer</button>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {agencesData.map((a) => (
          <div key={a.nom} className="bg-white border border-gray-100 rounded-xl p-5 flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="font-medium text-sm">{a.nom}</div>
              <div className="text-xs text-gray-400">{a.contact} · {a.email} · {a.tel}</div>
            </div>
            <div className="flex gap-8 items-center">
              <div className="text-center">
                <div className="text-xs text-gray-400 mb-1">Leads/mois</div>
                <div className="font-medium text-sm">{a.leads.toLocaleString()}</div>
              </div>
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
              <button className="text-xs text-gray-400 hover:text-red-500">Supprimer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}