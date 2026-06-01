import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader, SiteFooter } from "@/components/site-shell";
import { LegalPage, type LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Méthode PAC" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MentionsLegalesPage,
});

const sections: LegalSection[] = [
  {
    id: "editeur",
    title: "Éditeur du site",
    content: (
      <>
        <p>Le site methode-pac.fr (ci-après "le Site") est édité par :</p>
        <Identity
          rows={[
            ["Raison sociale", "Méthode PAC SAS"],
            ["Forme juridique", "Société par actions simplifiée (SAS)"],
            ["Capital social", "10 000 €"],
            ["Siège social", "42 rue de la République, 69002 Lyon, France"],
            ["RCS", "Lyon B 912 345 678"],
            ["N° SIRET", "912 345 678 00012"],
            ["TVA intracommunautaire", "FR45 912345678"],
            ["Directeur de la publication", "Julien Marchand, Président"],
            ["Email", "contact@methode-pac.fr"],
            ["Téléphone", "+33 1 23 45 67 89"],
          ]}
        />
      </>
    ),
  },
  {
    id: "hebergement",
    title: "Hébergement",
    content: (
      <>
        <p>Le Site est hébergé par :</p>
        <Identity
          rows={[
            ["Hébergeur", "OVH SAS"],
            ["Adresse", "2 rue Kellermann, 59100 Roubaix, France"],
            ["Téléphone", "+33 9 72 10 10 07"],
            ["Site", "ovh.com"],
          ]}
        />
      </>
    ),
  },
  {
    id: "propriete",
    title: "Propriété intellectuelle",
    content: (
      <>
        <p>
          L'ensemble des contenus présents sur le Site (textes, images, logos, vidéos, code, structure, méthodes
          pédagogiques, templates, scripts) est protégé par le droit d'auteur et la propriété intellectuelle. Toute
          reproduction, représentation, modification, publication, transmission, dénaturation, totale ou partielle,
          du Site ou de son contenu, par quelque procédé que ce soit, et sur quelque support que ce soit, est
          interdite sans autorisation écrite préalable de Méthode PAC SAS.
        </p>
        <p>
          Les marques citées (Daikin, Mitsubishi, Atlantic, Viessmann, Bosch, Hitachi, Toshiba, etc.) sont la
          propriété de leurs détenteurs respectifs. Leur citation est faite à titre informatif et n'implique aucun
          partenariat commercial sauf mention contraire.
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
          Méthode PAC SAS s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur le Site.
          Cependant, l'éditeur ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à
          disposition. Les chiffres et résultats clients présentés (CPL, ROAS, volumes de leads, nombre
          d'installations) reflètent des cas réels mais ne constituent pas une garantie de résultat individuel.
        </p>
        <p>
          L'utilisateur reconnaît utiliser les informations sous sa responsabilité exclusive. Méthode PAC SAS ne
          pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur lors
          de l'accès au Site.
        </p>
      </>
    ),
  },
  {
    id: "liens",
    title: "Liens hypertextes",
    content: (
      <p>
        Le Site peut contenir des liens hypertextes vers d'autres sites. Méthode PAC SAS n'est pas responsable du
        contenu de ces sites tiers.
      </p>
    ),
  },
  {
    id: "mediation",
    title: "Médiation de la consommation",
    content: (
      <>
        <p>
          Conformément à l'article L. 612-1 du Code de la consommation, le consommateur a le droit de recourir
          gratuitement à un médiateur de la consommation en vue de la résolution amiable d'un litige.
        </p>
        <Identity
          rows={[
            ["Médiateur", "CMAP — Centre de Médiation et d'Arbitrage de Paris"],
            ["Site", "cmap.fr"],
          ]}
        />
      </>
    ),
  },
  {
    id: "droit",
    title: "Droit applicable",
    content: (
      <p>
        Le Site et les présentes mentions légales sont soumis au droit français. En cas de litige, et après échec de
        toute tentative de résolution amiable, les tribunaux français seront seuls compétents.
      </p>
    ),
  },
];

function MentionsLegalesPage() {
  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <SiteHeader />
      <LegalPage
        eyebrow="Informations légales"
        title="Mentions légales"
        intro="Toutes les informations légales relatives à l'éditeur, l'hébergeur et l'usage du site methode-pac.fr."
        updatedLabel={`Dernière mise à jour : ${new Date().toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}`}
        sections={sections}
      />
      <SiteFooter />
    </div>
  );
}

function Identity({ rows }: { rows: [string, string][] }) {
  return (
    <div className="rounded-2xl border bg-cream/40 divide-y overflow-hidden">
      {rows.map(([k, v]) => (
        <div key={k} className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-1 md:gap-4 p-4">
          <span className="text-xs uppercase tracking-wider text-foreground/60 font-semibold">{k}</span>
          <span className="text-sm md:text-base">{v}</span>
        </div>
      ))}
    </div>
  );
}
