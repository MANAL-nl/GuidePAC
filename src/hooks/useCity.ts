import { useEffect, useMemo, useState } from "react";

/**
 * useCity — récupère la ville depuis le 1er segment du chemin de l'URL.
 *
 * Exemples d'URL :
 *   /                  → city: "",       label: "France",         inCity: "en France"
 *   /paris             → city: "Paris",  label: "Paris",          inCity: "à Paris"
 *   /ile-de-france     → city: "Ile-De-France", ...
 *
 * Met aussi à jour <title> et <meta name="description"> automatiquement quand
 * une ville est passée — utile pour le SEO et le partage social.
 */
export function useCity() {
  const [city, setCity] = useState<string>(() => readCityFromUrl());

  useEffect(() => {
    const onPop = () => setCity(readCityFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (city) {
      document.title = `Guide PAC à ${city} — Leads Pompe à Chaleur via Google Ads`;
      setMeta(
        "description",
        `Le guide premium pour générer 30 à 80 leads PAC qualifiés/mois à ${city} via Google Ads. Templates, scripts et campagnes prêts à l'emploi.`,
      );
      setMeta("og:title", `Guide PAC à ${city} — Leads Pompe à Chaleur via Google Ads`, "property");
      setMeta(
        "og:description",
        `Stop aux agrégateurs. Générez vos propres leads PAC à ${city}. Offre de lancement -76%.`,
        "property",
      );
    }
  }, [city]);

  return useMemo(() => {
    const label = city || "France";
    const inCity = city ? `à ${city}` : "en France";
    const ofCity = city ? `de ${city}` : "de France";
    const forCity = city ? `pour ${city}` : "pour la France";
    return { city, label, inCity, ofCity, forCity };
  }, [city]);
}

const RESERVED_PATHS = new Set(["mentions-legales", "confidentialite", "cgv"]);

function readCityFromUrl(): string {
  if (typeof window === "undefined") return "";
  const first = window.location.pathname.split("/").filter(Boolean)[0];
  if (!first || RESERVED_PATHS.has(first.toLowerCase())) return "";
  return decodeURIComponent(first)
    .trim()
    .split(/[\s-]+/)
    .map((w) => (w.length ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : w))
    .join("-");
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}
