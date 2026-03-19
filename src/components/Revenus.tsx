"use client";

const mois = ["Oct", "Nov", "Déc", "Jan", "Fév", "Mar"];
const revenus = [400, 600, 600, 900, 1100, 1400];
const max = Math.max(...revenus);

const transactions = [
  { date: "19/03/2026", agence: "Media Solar", type: "Fixe", montant: 600 },
  { date: "19/03/2026", agence: "Agence WebPro", type: "Fixe", montant: 500 },
  { date: "15/03/2026", agence: "Media Solar", type: "Commission", montant: 87.5 },
  { date: "01/03/2026", agence: "DigiLocal", type: "Fixe", montant: 300 },
  { date: "15/02/2026", agence: "Media Solar", type: "Commission", montant: 175 },
  { date: "01/02/2026", agence: "Media Solar", type: "Fixe", montant: 600 },
];

export default function Revenus() {
  const total = transactions.reduce((acc, t) => acc + t.montant, 0);
  const fixe = transactions.filter((t) => t.type === "Fixe").reduce((acc, t) => acc + t.montant, 0);
  const commission = transactions.filter((t) => t.type === "Commission").reduce((acc, t) => acc + t.montant, 0);

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
      <h1 className="text-lg font-medium">Revenus</h1>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="text-xs text-gray-400 mb-1">Total ce mois</div>
          <div className="text-2xl font-medium text-green-500">{total.toLocaleString()}€</div>
          <div className="text-xs text-gray-400 mt-1">+27% vs mois dernier</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="text-xs text-gray-400 mb-1">Revenus fixes</div>
          <div className="text-2xl font-medium">{fixe.toLocaleString()}€</div>
          <div className="text-xs text-gray-400 mt-1">3 agences actives</div>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <div className="text-xs text-gray-400 mb-1">Commissions</div>
          <div className="text-2xl font-medium text-blue-400">{commission.toLocaleString()}€</div>
          <div className="text-xs text-gray-400 mt-1">5% sur ventes closées</div>
        </div>
      </div>

<div className="bg-white border border-gray-100 rounded-xl p-5">
  <div className="text-sm font-medium mb-4">Évolution des revenus</div>
  <div style={{ display: "flex", alignItems: "flex-end", gap: "12px", height: "160px" }}>
    {mois.map((m, i) => (
      <div key={m} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "flex-end", gap: "8px" }}>
        <div style={{ fontSize: "11px", color: "#9ca3af" }}>{revenus[i]}€</div>
        <div style={{
          width: "100%",
          height: `${(revenus[i] / max) * 100}%`,
          backgroundColor: "#60a5fa",
          borderRadius: "6px 6px 0 0"
        }} />
        <div style={{ fontSize: "11px", color: "#9ca3af" }}>{m}</div>
      </div>
    ))}
  </div>
</div>

      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <div className="text-sm font-medium mb-4">Historique des paiements</div>
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-gray-400 uppercase">
              <th className="text-left pb-3">Date</th>
              <th className="text-left pb-3">Agence</th>
              <th className="text-left pb-3">Type</th>
              <th className="text-right pb-3">Montant</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i} className="border-t border-gray-50">
                <td className="py-3 text-gray-400">{t.date}</td>
                <td className="py-3 font-medium">{t.agence}</td>
                <td className="py-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    t.type === "Commission"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {t.type}
                  </span>
                </td>
                <td className="py-3 text-right font-medium text-green-500">+{t.montant.toLocaleString()}€</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}