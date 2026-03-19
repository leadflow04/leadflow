const metrics = [
  { label: "Leads ce mois", value: "1 840", sub: "+12% vs mois dernier" },
  { label: "Agences clientes", value: "4", sub: "+1 ce mois" },
  { label: "Revenus MRR", value: "1 400€", sub: "+ commissions" },
  { label: "Coût sourcing", value: "1,20€", sub: "ce mois" },
];

const leads = [
  { name: "Cuisines Dupont", dirigeant: "Marc Dupont", ville: "Lyon", tel: "06 12 34 56 78", statut: "Pas de site", agence: "Media Solar" },
  { name: "Atelier Cuisine", dirigeant: "Sophie Martin", ville: "Bordeaux", tel: "07 23 45 67 89", statut: "Site obsolète", agence: "WebPro" },
  { name: "Micka Service", dirigeant: "Mickael Saada", ville: "Montpellier", tel: "07 83 07 28 74", statut: "Pas de site", agence: "Media Solar" },
];

const badgeColor: Record<string, string> = {
  "Pas de site": "bg-red-100 text-red-700",
  "Site obsolète": "bg-yellow-100 text-yellow-700",
  "Site correct": "bg-green-100 text-green-700",
};

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">Dashboard</h1>
        <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg">+ Nouveau sourcing</button>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {metrics.map((m) => (
          <div key={m.label} className="bg-gray-50 rounded-lg p-4">
            <div className="text-xs text-gray-500 mb-1">{m.label}</div>
            <div className="text-2xl font-medium">{m.value}</div>
            <div className="text-xs text-green-600 mt-1">{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <div className="text-sm font-medium mb-4">Derniers leads générés</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 uppercase">
              <th className="text-left pb-3">Entreprise</th>
              <th className="text-left pb-3">Dirigeant</th>
              <th className="text-left pb-3">Ville</th>
              <th className="text-left pb-3">Téléphone</th>
              <th className="text-left pb-3">Statut</th>
              <th className="text-left pb-3">Agence</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((l) => (
              <tr key={l.name} className="border-t border-gray-50">
                <td className="py-3 font-medium">{l.name}</td>
                <td className="py-3 text-gray-500">{l.dirigeant}</td>
                <td className="py-3 text-gray-500">{l.ville}</td>
                <td className="py-3 text-gray-500">{l.tel}</td>
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