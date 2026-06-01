import { createFileRoute } from "@tanstack/react-router";
import { Landing } from "./index";

export const Route = createFileRoute("/$city")({
  head: () => ({
    meta: [
      { title: "Guide Ultime PAC — Générer des Leads Pompe à Chaleur via Google Ads" },
      {
        name: "description",
        content:
          "Le guide premium pour générer 30 à 80 leads PAC qualifiés par mois à moins de 25€ via Google Ads. Templates, scripts et campagnes prêts à l'emploi.",
      },
      { property: "og:title", content: "Guide Ultime PAC — Leads Pompe à Chaleur via Google Ads" },
      {
        property: "og:description",
        content: "Stop aux agrégateurs. Générez vos propres leads PAC qualifiés. Offre de lancement -76%.",
      },
      { property: "og:type", content: "product" },
    ],
  }),
  component: Landing,
});
