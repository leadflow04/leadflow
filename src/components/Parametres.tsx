"use client";
import { useState } from "react";

export default function Parametres() {
  const [nom, setNom] = useState("Waisa");
  const [email, setEmail] = useState("waisa@leadflow.fr");
  const [darkMode, setDarkMode] = useState(true);
  const [notifs, setNotifs] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
      <h1 className="text-lg font-medium">Paramètres</h1>

      <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-4">
        <div className="text-sm font-medium">Mon profil</div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Nom</label>
            <input
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Email</label>
            <input
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-4">
        <div className="text-sm font-medium">Préférences</div>

        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <div>
            <div className="text-sm">Mode sombre</div>
            <div className="text-xs text-gray-400">Interface en dark mode</div>
          </div>
          <div
            onClick={() => setDarkMode(!darkMode)}
            style={{
              width: "44px",
              height: "24px",
              backgroundColor: darkMode ? "#3b82f6" : "#374151",
              borderRadius: "99px",
              cursor: "pointer",
              position: "relative",
              transition: "background-color 0.2s"
            }}
          >
            <div style={{
              width: "18px",
              height: "18px",
              backgroundColor: "white",
              borderRadius: "50%",
              position: "absolute",
              top: "3px",
              left: darkMode ? "23px" : "3px",
              transition: "left 0.2s"
            }} />
          </div>
        </div>

        <div className="flex justify-between items-center py-2">
          <div>
            <div className="text-sm">Notifications</div>
            <div className="text-xs text-gray-400">Alertes sourcing terminé</div>
          </div>
          <div
            onClick={() => setNotifs(!notifs)}
            style={{
              width: "44px",
              height: "24px",
              backgroundColor: notifs ? "#3b82f6" : "#374151",
              borderRadius: "99px",
              cursor: "pointer",
              position: "relative",
              transition: "background-color 0.2s"
            }}
          >
            <div style={{
              width: "18px",
              height: "18px",
              backgroundColor: "white",
              borderRadius: "50%",
              position: "absolute",
              top: "3px",
              left: notifs ? "23px" : "3px",
              transition: "left 0.2s"
            }} />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col gap-4">
        <div className="text-sm font-medium">Abonnement</div>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm font-medium">Plan Pro</div>
            <div className="text-xs text-gray-400">Agences illimitées · Leads illimités</div>
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">Actif</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white text-sm px-6 py-2 rounded-lg"
        >
          {saved ? "✓ Sauvegardé !" : "Sauvegarder"}
        </button>
        <button className="border border-gray-200 text-gray-400 text-sm px-6 py-2 rounded-lg">
          Annuler
        </button>
      </div>
    </div>
  );
}