import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/cgv")({
  head: () => ({
    meta: [
      { title: "Conditions Générales de Vente — Méthode PAC" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CgvPage,
});

const sections: LegalSection[] = [
  {
    id: "objet",
    title: "Objet",
    content: (
      <>
        <p>
          Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre{" "}
          <strong>Méthode PAC SAS</strong>, SAS au capital de 10 000 €, RCS Lyon B 912 345 678, siège : 42 rue de la
          République, 69002 Lyon (le "Vendeur"), et toute personne physique majeure ou personne morale procédant à
          un achat sur methode-pac.fr (l'"Acheteur").
        </p>
        <p>
          Toute commande implique l'acceptation pleine et entière des présentes CGV, qui prévalent sur toute autre
          condition, sauf dérogation expresse préalable et écrite.
        </p>
      </>
    ),
  },
  {
    id: "produits",
    title: "Produits",
    content: (
      <>
        <p>
          Le Vendeur commercialise un guide numérique de formation intitulé <strong>« Guide Ultime PAC — Google Ads
          »</strong> (le "Guide"), au format PDF téléchargeable, accompagné de bonus numériques (templates, scripts,
          accès au groupe privé en ligne).
        </p>
        <p>
          Le Guide est un produit pédagogique et ne constitue ni un service de prestation publicitaire, ni un conseil
          personnalisé. Les résultats présentés (CPL, ROAS, volumes de leads) sont des exemples réels mais ne
          constituent pas une garantie de résultat individuel.
        </p>
      </>
    ),
  },
  {
    id: "prix",
    title: "Prix",
    content: (
      <p>
        Le prix du Guide est de <strong>47 € TTC</strong> (TVA française 20% incluse — 39,17 € HT). Méthode PAC SAS
        se réserve le droit de modifier ses prix à tout moment, étant entendu que le prix figurant au catalogue le
        jour de la commande est le seul applicable.
      </p>
    ),
  },
  {
    id: "commande",
    title: "Commande et paiement",
    content: (
      <>
        <p>
          La commande s'effectue exclusivement en ligne via methode-pac.fr. Le paiement est traité par{" "}
          <strong>Stripe</strong>, conforme PCI-DSS. Sont acceptées : carte bancaire (Visa, Mastercard, Amex), Apple
          Pay, Google Pay, virement SEPA.
        </p>
        <p>
          La commande est validée dès réception du paiement. L'Acheteur reçoit alors par email un récapitulatif, sa
          facture et le lien de téléchargement.
        </p>
      </>
    ),
  },
  {
    id: "livraison",
    title: "Livraison",
    content: (
      <>
        <p>
          Le Guide étant un produit numérique, la "livraison" consiste en l'envoi par email d'un lien de
          téléchargement sécurisé immédiatement après validation du paiement. L'accès est à vie, mises à jour
          futures de l'édition incluses.
        </p>
        <p>
          En cas de difficulté, contactez{" "}
          <a href="mailto:support@methode-pac.fr" className="text-primary underline underline-offset-4">
            support@methode-pac.fr
          </a>{" "}
          — réponse sous 24 h ouvrées.
        </p>
      </>
    ),
  },
  {
    id: "garantie",
    title: "Droit de rétractation et garantie 30 jours",
    content: (
      <>
        <p>
          <strong>Important</strong> : conformément à l'article L. 221-28 13° du Code de la consommation, le droit
          de rétractation ne peut être exercé pour les contrats de fourniture de contenu numérique non fourni sur
          support matériel dont l'exécution a commencé après accord préalable exprès du consommateur. En
          téléchargeant le Guide, l'Acheteur renonce à son droit de rétractation légal.
        </p>
        <div className="rounded-2xl border-2 border-gold/30 bg-gold-soft/50 p-5 not-prose">
          <p className="font-semibold text-foreground">
            Méthode PAC SAS offre une garantie commerciale de 30 jours, satisfait ou remboursé.
          </p>
          <p className="mt-2 text-base text-foreground/85">
            Sans justification. Email à{" "}
            <a href="mailto:support@methode-pac.fr" className="text-primary underline underline-offset-4">
              support@methode-pac.fr
            </a>{" "}
            depuis l'adresse utilisée pour l'achat, dans un délai de 30 jours suivant la commande. Remboursement
            sous 5 jours ouvrés sur le moyen de paiement utilisé.
          </p>
        </div>
      </>
    ),
  },
  {
    id: "propriete",
    title: "Propriété intellectuelle",
    content: (
      <>
        <p>L'achat du Guide confère à l'Acheteur un droit d'usage personnel et non transférable. Sont strictement interdits :</p>
        <ul className="space-y-2 mt-2">
          {[
            "La revente, le partage ou la diffusion du Guide ou de ses bonus",
            "La reproduction totale ou partielle sur tout support",
            "La création d'œuvres dérivées commercialisées",
            "L'utilisation de l'identifiant d'accès par plusieurs personnes",
          ].map((it) => (
            <li key={it} className="flex gap-3">
              <span className="mt-2 size-1.5 rounded-full bg-gold shrink-0" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
        <p>
          Tout manquement entraîne la résiliation immédiate de l'accès et peut donner lieu à des poursuites
          judiciaires.
        </p>
      </>
    ),
  },
  {
    id: "responsabilite",
    title: "Responsabilité",
    content: (
      <>
        <p>
          Méthode PAC SAS s'engage à fournir un Guide de qualité, à jour des dernières évolutions Google Ads.
          Toutefois, le Vendeur ne peut être tenu responsable :
        </p>
        <ul className="space-y-2 mt-2">
          {[
            "Des résultats commerciaux obtenus par l'Acheteur (zone, budget, mise en œuvre)",
            "Des évolutions de politique ou tarification décidées par Google Ads",
            "Des sanctions ou suspensions de compte Google Ads de l'Acheteur",
            "Des cas de force majeure",
          ].map((it) => (
            <li key={it} className="flex gap-3">
              <span className="mt-2 size-1.5 rounded-full bg-gold shrink-0" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
        <p>La responsabilité du Vendeur est en tout état de cause limitée au montant de la commande.</p>
      </>
    ),
  },
  {
    id: "donnees",
    title: "Données personnelles",
    content: (
      <p>
        Le traitement des données personnelles est encadré par notre{" "}
        <a href="/confidentialite" className="text-primary underline underline-offset-4">
          Politique de confidentialité
        </a>
        , conforme au RGPD.
      </p>
    ),
  },
  {
    id: "litiges",
    title: "Litiges et droit applicable",
    content: (
      <>
        <p>
          Les présentes CGV sont soumises au droit français. En cas de litige, l'Acheteur est invité à contacter le
          Vendeur à{" "}
          <a href="mailto:support@methode-pac.fr" className="text-primary underline underline-offset-4">
            support@methode-pac.fr
          </a>{" "}
          afin de rechercher une solution amiable.
        </p>
        <p>
          Conformément à l'article L. 612-1 du Code de la consommation, l'Acheteur consommateur peut recourir
          gratuitement au médiateur <strong>CMAP</strong> (cmap.fr).
        </p>
        <p>
          À défaut d'accord amiable, le litige sera porté devant les juridictions compétentes du ressort du siège
          social du Vendeur, sauf dispositions impératives contraires applicables aux consommateurs.
        </p>
      </>
    ),
  },
];

function CgvPage() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <SiteHeader />
      <LegalPage
        eyebrow="Conditions de vente"
        eyebrowVariant="terracotta"
        title="Conditions Générales de Vente"
        intro="Tout ce qui encadre votre achat du guide : prix, paiement, livraison, garantie 30 jours, propriété intellectuelle, responsabilité et litiges."
        updatedLabel={`En vigueur depuis ${new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}`}
        sections={sections}
      />
      <SiteFooter />
    </div>
  );
}
