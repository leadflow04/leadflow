import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";



async function findEmail(url: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(url, { signal: controller.signal }).catch(() => null);
    clearTimeout(timeoutId);

    if (!res || !res.ok) return "";
    const html = await res.text();

    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = html.match(emailRegex);
    
    if (matches) {
      const validEmails = matches.filter(e => !e.endsWith('.png') && !e.endsWith('.jpg') && !e.includes('sentry') && !e.includes('example.com') && !e.includes('w3.org'));
      if (validEmails.length > 0) {
        return validEmails[0];
      }
    }
  } catch (e) {
    // ignore fetch errors
  }
  return "";
}

let currentSerperKeyIndex = 0;

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return NextResponse.json({ success: false, error: "Non autorisé" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: authHeader } } }
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ success: false, error: "Utilisateur introuvable" });

  const { niche, villes, agence, exclusions } = await req.json();

  const serperKeys = (process.env.SERPER_API_KEYS || process.env.SERPER_API_KEY || "")
    .split(",")
    .map(k => k.trim())
    .filter(Boolean);

  const getSerperKey = () => serperKeys[currentSerperKeyIndex] || "";
  const nextSerperKey = () => {
    currentSerperKeyIndex++;
    return currentSerperKeyIndex < serperKeys.length;
  };

  const villesArray = villes.split(",").map((v: string) => v.trim());
  const leadsInseres: object[] = [];

  for (const ville of villesArray) {
    const query = `${niche} ${ville}`;

    // On boucle sur 15 pages maximum pour récupérer jusqu'à ~300 leads par ville (si disponibles)
    for (let page = 1; page <= 15; page++) {
      let response;

      while (true) {
        const key = getSerperKey();
        if (!key) break;

        response = await fetch("https://google.serper.dev/places", {
          method: "POST",
          headers: {
            "X-API-KEY": key,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ q: query, gl: "fr", hl: "fr", page: page }),
        });

        if (!response.ok && (response.status === 403 || response.status === 429)) {
          console.warn(`Clé API épuisée ou bloquée: ${key}. Passage à la clé suivante...`);
          if (!nextSerperKey()) {
            console.error("Toutes les clés Serper sont épuisées !");
            break;
          }
        } else {
          break; // Succès ou autre erreur fatale (ex: 500)
        }
      }

      if (!response || !response.ok) {
        break; // Arrête le scraping pour cette ville si aucune clé ne marche
      }

      const data = await response.json();
      const places = data.places || [];

      if (places.length === 0) break; // S'il n'y a plus de résultats sur cette page, on arrête la boucle

      for (const place of places) {
        const nomLower = place.title?.toLowerCase() || "";
        const exclu = exclusions.some((ex: string) => nomLower.includes(ex.toLowerCase()));
        if (exclu) continue;

        const website = place.website || "";
        let email = "";
        let statut = "Pas de site";

        if (website) {
          statut = "Site web trouvé";
          email = await findEmail(website);
          if (email) statut = "Email trouvé";
        }

        const lead = {
          nom: place.title || "",
          dirigeant: "",
          ville: ville,
          tel: place.phoneNumber || "",
          email: email,
          statut: statut,
          agence: agence,
          niche: niche,
          user_id: user.id
        };

        const { error } = await supabase.from("leads").insert(lead);
        if (error) {
          console.error("Supabase Error:", error);
        } else {
          leadsInseres.push(lead);
        }
      }
    }
  }

  return NextResponse.json({ success: true, count: leadsInseres.length });
}