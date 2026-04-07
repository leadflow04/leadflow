"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import Sourcing from "@/components/Sourcing";
import Leads from "@/components/Leads";
import Agences from "@/components/Agences";
import Revenus from "@/components/Revenus";
import Parametres from "@/components/Parametres";

import Login from "@/components/Login";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [page, setPage] = useState("Dashboard");
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return <div className="h-screen w-full flex items-center justify-center bg-gray-50 text-gray-500 font-medium">Chargement sécurisé...</div>;

  if (!session) {
    return <Login />;
  }

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