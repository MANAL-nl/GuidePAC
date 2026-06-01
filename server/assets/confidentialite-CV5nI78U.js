import { T as jsxRuntimeExports } from "./worker-entry-DaylyazV.js";
import { S as SiteHeader, a as SiteFooter } from "./router-DKkmzreU.js";
import { L as LegalPage } from "./legal-page-BF_S6Que.js";
import "node:events";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const sections = [{
  id: "responsable",
  title: "Responsable du traitement",
  content: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Méthode PAC SAS" }),
      " — 42 rue de la République, 69002 Lyon, France — est responsable du traitement de vos données personnelles collectées via le site methode-pac.fr."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Contact DPO" }),
      " :",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:dpo@methode-pac.fr", className: "text-primary underline underline-offset-4", children: "dpo@methode-pac.fr" })
    ] })
  ] })
}, {
  id: "donnees",
  title: "Données collectées",
  content: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Nous collectons les catégories de données suivantes :" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: [/* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Identification" }),
      " : nom, prénom, civilité, email, téléphone (formulaire, achat, support)"
    ] }), /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Données professionnelles" }),
      " : société, fonction, secteur, zone géographique, volume cible"
    ] }), /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Paiement" }),
      " : traité par Stripe — nous ne stockons aucun numéro de carte"
    ] }), /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Navigation" }),
      " : adresse IP, navigateur, pages visitées, durée, source d'acquisition (UTM)"
    ] })] })
  ] })
}, {
  id: "finalites",
  title: "Finalités du traitement",
  content: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Vos données sont traitées pour :" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: ["Traiter votre demande d'audit ou votre commande du guide (exécution du contrat)", "Vous envoyer le guide PDF, les bonus et les mises à jour (exécution du contrat)", "Vous envoyer des informations commerciales (consentement)", "Établir des statistiques anonymes d'usage du site (intérêt légitime)", "Respecter nos obligations légales (comptables, fiscales, anti-fraude)"] })
  ] })
}, {
  id: "duree",
  title: "Durée de conservation",
  content: /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: ["Données client et facturation : 10 ans (obligation comptable)", "Prospect (formulaire sans achat) : 3 ans à compter du dernier contact", "Cookies de mesure d'audience : 13 mois maximum", "Données support : 3 ans après clôture du dossier"] })
}, {
  id: "destinataires",
  title: "Destinataires des données",
  content: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Vos données sont accessibles uniquement par notre équipe interne (acquisition, support, comptabilité) et par nos prestataires sous contrat de sous-traitance RGPD :" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: ["Stripe (paiement)", "OVH (hébergement, France)", "Brevo / Sendinblue (emailing)", "Google Workspace (messagerie)", "Tally / Typeform (formulaires)"] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Aucune donnée n'est transférée hors de l'Union européenne sans garantie appropriée (clauses contractuelles types CE)." })
  ] })
}, {
  id: "droits",
  title: "Vos droits",
  content: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: ["Droit d'accès à vos données", "Droit de rectification", "Droit à l'effacement (« droit à l'oubli »)", "Droit à la limitation du traitement", "Droit à la portabilité", "Droit d'opposition", "Droit de retirer votre consentement à tout moment", "Droit de définir des directives post-mortem"] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Pour exercer vos droits, écrivez à ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "dpo@methode-pac.fr" }),
      " en joignant une copie d'une pièce d'identité. Nous répondons sous 1 mois maximum. En cas de réponse insatisfaisante, vous pouvez saisir la",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "CNIL" }),
      " (cnil.fr)."
    ] })
  ] })
}, {
  id: "cookies",
  title: "Cookies",
  content: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Le Site utilise les cookies suivants :" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BulletList, { items: [/* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Essentiels" }),
      " (session, panier) — exempts de consentement"
    ] }), /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Mesure d'audience" }),
      " (Google Analytics 4 anonymisé) — soumis à votre consentement"
    ] }), /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Publicitaires" }),
      " (Google Ads, Meta Pixel) — soumis à votre consentement"
    ] })] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Vous pouvez gérer vos préférences à tout moment via le bandeau cookies en bas du site." })
  ] })
}, {
  id: "securite",
  title: "Sécurité",
  content: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données : chiffrement TLS, authentification forte, sauvegardes chiffrées, accès restreint aux données sensibles." })
}, {
  id: "modifications",
  title: "Modifications",
  content: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Cette politique peut évoluer. La date de dernière mise à jour figure en haut de la page. En cas de changement substantiel, vous serez informé par email." })
}];
function ConfidentialitePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background text-foreground min-h-screen flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LegalPage, { eyebrow: "RGPD · Vie privée", eyebrowVariant: "sky", title: "Politique de confidentialité", intro: "Quelles données nous collectons, pourquoi, combien de temps, qui y a accès — et comment exercer vos droits RGPD.", updatedLabel: `Dernière mise à jour : ${(/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric"
    })}`, sections }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] });
}
function BulletList({
  items
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2 mt-2", children: items.map((it, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 size-1.5 rounded-full bg-gold shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: it })
  ] }, i)) });
}
export {
  ConfidentialitePage as component
};
