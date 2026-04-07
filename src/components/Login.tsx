"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-50 items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 w-96 flex flex-col gap-5">
        <div className="text-2xl font-bold text-center text-gray-900 mb-2">Lead<span className="text-blue-600">Flow</span></div>
        <div className="text-sm text-gray-500 text-center -mt-4 mb-4">Connecte-toi pour accéder à ton espace</div>
        
        {error && <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">{error}</div>}
        
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
          <input type="email" placeholder="admin@leadflow.fr" className="border border-gray-200 p-2.5 text-sm rounded-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500 uppercase">Mot de passe</label>
          <input type="password" placeholder="••••••••" className="border border-gray-200 p-2.5 text-sm rounded-lg outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>

        <button type="submit" disabled={loading} className="bg-blue-600 text-white font-medium py-3 mt-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors">
          {loading ? "Vérification..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
