"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Parametres() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setEmail(user.email || "");
      }
    });
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
      <h1 className="text-lg font-medium">Paramètres</h1>

      <div className="bg-white border border-gray-100 rounded-xl p-5 w-full max-w-md">
        <div className="text-sm font-medium mb-4">Informations du compte</div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-400">Email de connexion</label>
          <input className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-gray-50 text-gray-600" value={email} disabled />
        </div>
        <p className="mt-4 text-xs text-gray-400 leading-relaxed">
          Ton compte est actif et géré de manière personnalisée. Pour modifier tes accès ou tes informations de facturation, contacte directement le support LeadFlow.
        </p>
      </div>
    </div>
  );
}