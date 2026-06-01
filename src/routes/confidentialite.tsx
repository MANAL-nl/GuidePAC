import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité (RGPD) — Méthode PAC" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ConfidentialitePage,
});

const sections: LegalSection[] = [
  {
    id: "responsable",
    title: "Responsable du traitement",
    content: (
      <>
        <p>
          <strong>Méthode PAC SAS</strong> — 42 rue de la République, 69002 Lyon, France — est responsable du
          traitement de vos données personnelles collectées via le site methode-pac.fr.
        </p>
        <p>
          <strong>Contact DPO</strong> :{" "}
          <a href="mailto:dpo@methode-pac.fr" className="text-primary underline underline-offset-4">
            dpo@methode-pac.fr
          </a>
        </p>
      </>
    ),
  },
  {
    id: "donnees",
    title: "Données collectées",
    content: (
      <>
        <p>Nous collectons les catégories de données suivantes :</p>
        <BulletList
          items={[
            <>
              <strong>Identification</strong> : nom, prénom, civilité, email, téléphone (formulaire, achat, support)
            </>,
            <>
              <strong>Données professionnelles</strong> : société, fonction, secteur, zone géographique, volume
              cible
            </>,
            <>
              <strong>Paiement</strong> : traité par Stripe — nous ne stockons aucun numéro de carte
            </>,
            <>
              <strong>Navigation</strong> : adresse IP, navigateur, pages visitées, durée, source d'acquisition (UTM)
            </>,
          ]}
        />
      </>
    ),
  },
  {
    id: "finalites",
    title: "Finalités du traitement",
    content: (
      <>
        <p>Vos données sont traitées pour :</p>
        <BulletList
          items={[
            "Traiter votre demande d'audit ou votre commande du guide (exécution du contrat)",
            "Vous envoyer le guide PDF, les bonus et les mises à jour (exécution du contrat)",
            "Vous envoyer des informations commerciales (consentement)",
            "Établir des statistiques anonymes d'usage du site (intérêt légitime)",
            "Respecter nos obligations légales (comptables, fiscales, anti-fraude)",
          ]}
        />
      </>
    ),
  },
  {
    id: "duree",
    title: "Durée de conservation",
    content: (
      <BulletList
        items={[
          "Données client et facturation : 10 ans (obligation comptable)",
          "Prospect (formulaire sans achat) : 3 ans à compter du dernier contact",
          "Cookies de mesure d'audience : 13 mois maximum",
          "Données support : 3 ans après clôture du dossier",
        ]}
      />
    ),
  },
  {
    id: "destinataires",
    title: "Destinataires des données",
    content: (
      <>
        <p>
          Vos données sont accessibles uniquement par notre équipe interne (acquisition, support, comptabilité) et
          par nos prestataires sous contrat de sous-traitance RGPD :
        </p>
        <BulletList items={["Stripe (paiement)", "OVH (hébergement, France)", "Brevo / Sendinblue (emailing)", "Google Workspace (messagerie)", "Tally / Typeform (formulaires)"]} />
        <p>
          Aucune donnée n'est transférée hors de l'Union européenne sans garantie appropriée (clauses contractuelles
          types CE).
        </p>
      </>
    ),
  },
  {
    id: "droits",
    title: "Vos droits",
    content: (
      <>
        <p>Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :</p>
        <BulletList
          items={[
            "Droit d'accès à vos données",
            "Droit de rectification",
            "Droit à l'effacement (« droit à l'oubli »)",
            "Droit à la limitation du traitement",
            "Droit à la portabilité",
            "Droit d'opposition",
            "Droit de retirer votre consentement à tout moment",
            "Droit de définir des directives post-mortem",
          ]}
        />
        <p>
          Pour exercer vos droits, écrivez à <strong>dpo@methode-pac.fr</strong> en joignant une copie d'une pièce
          d'identité. Nous répondons sous 1 mois maximum. En cas de réponse insatisfaisante, vous pouvez saisir la{" "}
          <strong>CNIL</strong> (cnil.fr).
        </p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "Cookies",
    content: (
      <>
        <p>Le Site utilise les cookies suivants :</p>
        <BulletList
          items={[
            <>
              <strong>Essentiels</strong> (session, panier) — exempts de consentement
            </>,
            <>
              <strong>Mesure d'audience</strong> (Google Analytics 4 anonymisé) — soumis à votre consentement
            </>,
            <>
              <strong>Publicitaires</strong> (Google Ads, Meta Pixel) — soumis à votre consentement
            </>,
          ]}
        />
        <p>Vous pouvez gérer vos préférences à tout moment via le bandeau cookies en bas du site.</p>
      </>
    ),
  },
  {
    id: "securite",
    title: "Sécurité",
    content: (
      <p>
        Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :
        chiffrement TLS, authentification forte, sauvegardes chiffrées, accès restreint aux données sensibles.
      </p>
    ),
  },
  {
    id: "modifications",
    title: "Modifications",
    content: (
      <p>
        Cette politique peut évoluer. La date de dernière mise à jour figure en haut de la page. En cas de
        changement substantiel, vous serez informé par email.
      </p>
    ),
  },
];

function ConfidentialitePage() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <SiteHeader />
      <LegalPage
        eyebrow="RGPD · Vie privée"
        eyebrowVariant="sky"
        title="Politique de confidentialité"
        intro="Quelles données nous collectons, pourquoi, combien de temps, qui y a accès — et comment exercer vos droits RGPD."
        updatedLabel={`Dernière mise à jour : ${new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}`}
        sections={sections}
      />
      <SiteFooter />
    </div>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="space-y-2 mt-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3">
          <span className="mt-2 size-1.5 rounded-full bg-gold shrink-0" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
