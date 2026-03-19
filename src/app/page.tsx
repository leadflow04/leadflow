"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import Sourcing from "@/components/Sourcing";
import Leads from "@/components/Leads";
import Agences from "@/components/Agences";
import Revenus from "@/components/Revenus";
import Parametres from "@/components/Parametres";

export default function Home() {
  const [page, setPage] = useState("Dashboard");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activePage={page} onNavigate={setPage} />
      {page === "Dashboard" && <Dashboard />}
      {page === "Sourcing" && <Sourcing />}
      {page === "Mes leads" && <Leads />}
      {page === "Agences" && <Agences />}
      {page === "Revenus" && <Revenus />}
      {page === "Paramètres" && <Parametres />}
    </div>
  );
}