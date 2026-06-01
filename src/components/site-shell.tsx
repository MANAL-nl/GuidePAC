import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, Zap, Rocket, ArrowRight, Lock, Mail, ShieldCheck, Award, HeartHandshake } from "lucide-react";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <AnnouncementBar />
      <Navbar scrolled={scrolled} />
    </>
  );
}

function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-12 bg-gradient-to-r from-terracotta via-terracotta to-[oklch(0.68_0.14_60)] text-terracotta-foreground text-sm md:text-base flex items-center justify-center px-4 shadow-card">
      <Rocket className="size-4 md:size-5 mr-2 animate-pulse-soft text-foreground/80" />
      <span className="font-medium">
        Multipliez vos chantiers PAC avec des leads <strong className="text-foreground">100% exclusifs</strong>, jamais
        revendus
      </span>
      <Link
        to="/"
        hash="formulaire"
        className="hidden md:inline-flex items-center gap-1 ml-5 rounded-full bg-foreground/15 hover:bg-foreground/25 px-3 py-1 text-xs font-bold uppercase tracking-wider transition"
      >
        Réserver mon créneau <ArrowRight className="size-3" />
      </Link>
    </div>
  );
}

function Navbar({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const links: [string, string][] = [
    ["problemes", "Problèmes"],
    ["solution", "Solution"],
    ["contenu", "Contenu"],
    ["avis", "Avis"],
    ["offre", "Offre"],
    ["faq", "FAQ"],
  ];
  return (
    <header
      className={`fixed inset-x-0 top-12 z-50 h-28 transition-all ${scrolled ? "bg-background/85 backdrop-blur-xl border-b" : ""}`}
    >
      <div className="max-w-[1240px] mx-auto px-8 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-12 rounded-full bg-primary flex items-center justify-center">
            <Zap className="size-6 text-gold" />
          </div>
          <span className="font-display text-3xl font-bold">
            Guide<span className="text-gold">PAC</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-lg font-medium text-foreground/80">
          {links.map(([h, l]) => (
            <Link
              key={h}
              to="/"
              hash={h}
              className="relative py-1 hover:text-primary transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full"
            >
              {l}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+33123456789"
            className={`flex items-center gap-2 text-lg transition ${scrolled ? "text-sky hover:text-primary" : "text-primary hover:text-sky"}`}
          >
            <Phone className="size-5" /> 01 23 45 67 89
          </a>
          <Link
            to="/"
            hash="offre"
            className="rounded-[100px] bg-primary text-primary-foreground px-7 h-14 flex items-center text-lg font-semibold hover:opacity-90 transition"
          >
            Obtenir le guide
          </Link>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden size-10 flex items-center justify-center"
          aria-label="Menu"
        >
          <div className={`w-5 h-0.5 bg-foreground transition ${open ? "rotate-45 translate-y-0.5" : ""}`} />
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-background border-b px-6 py-6 space-y-4">
          {links.map(([h, l]) => (
            <Link
              key={h}
              to="/"
              hash={h}
              onClick={() => setOpen(false)}
              className="block text-sm"
            >
              {l}
            </Link>
          ))}
          <Link
            to="/"
            hash="offre"
            onClick={() => setOpen(false)}
            className="block rounded-[100px] bg-primary text-primary-foreground px-5 h-11 leading-[44px] text-center text-sm font-semibold"
          >
            Obtenir le guide
          </Link>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  const trust = [
    { icon: Lock, label: "Paiement sécurisé", desc: "SSL · Stripe" },
    { icon: ShieldCheck, label: "Garantie 30 jours", desc: "Satisfait ou remboursé" },
    { icon: HeartHandshake, label: "Accès à vie", desc: "Mises à jour incluses" },
    { icon: Award, label: "Méthode éprouvée", desc: "+312 installateurs" },
  ];
  return (
    <footer className="relative bg-gradient-to-b from-cream via-cream/50 to-background overflow-hidden">
      <div className="absolute -top-32 -left-32 size-[420px] rounded-full bg-gold-soft/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 size-[460px] rounded-full bg-sky-soft/30 blur-3xl pointer-events-none" />

      {/* Trust strip */}
      <div className="relative max-w-[1240px] mx-auto px-8 pt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 rounded-3xl bg-background border shadow-card p-5">
          {trust.map(({ icon: Icon, label, desc }) => (
            <div key={label} className="flex items-center gap-3 px-2">
              <div className="size-10 rounded-xl bg-gold-soft flex items-center justify-center shrink-0">
                <Icon className="size-5 text-gold" />
              </div>
              <div className="min-w-0">
                <div className="font-semibold text-sm leading-tight">{label}</div>
                <div className="text-xs text-muted-foreground truncate">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative max-w-[1240px] mx-auto px-8 pt-14 pb-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <div className="icon-tile size-11 rounded-xl">
              <Zap className="size-5" />
            </div>
            <span className="font-display text-xl font-semibold">
              Méthode<span className="text-gold">PAC</span>
            </span>
          </div>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-md">
            Le système d'acquisition Google Ads pour installateurs PAC qui veulent posséder leur canal de leads —
            moins de 25 € par lead exclusif, ROAS x4 minimum garanti.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm">
            <a
              href="mailto:contact@methode-pac.fr"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition"
            >
              <Mail className="size-4 text-gold" /> contact@methode-pac.fr
            </a>
            <a
              href="tel:+33123456789"
              className="inline-flex items-center gap-2 text-foreground hover:text-primary transition"
            >
              <Phone className="size-4 text-gold" /> 01 23 45 67 89
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs uppercase tracking-[0.18em] text-foreground/60 font-bold mb-4">Ressources</div>
          <ul className="space-y-2.5 text-sm">
            <FooterLink to="/" hash="contenu" label="Sommaire du guide" />
            <FooterLink to="/" hash="offre" label="Tarifs" />
            <FooterLink to="/" hash="faq" label="Questions fréquentes" />
            <FooterLink to="/" hash="avis" label="Témoignages clients" />
            <FooterLink to="/" hash="problemes" label="Pourquoi générer ses leads" />
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="text-xs uppercase tracking-[0.18em] text-foreground/60 font-bold mb-4">Légal & support</div>
          <ul className="space-y-2.5 text-sm">
            <FooterLink to="/mentions-legales" label="Mentions légales" />
            <FooterLink to="/confidentialite" label="Politique de confidentialité (RGPD)" />
            <FooterLink to="/cgv" label="Conditions Générales de Vente" />
            <FooterLink to="/" hash="formulaire" label="Nous contacter" />
          </ul>
        </div>
      </div>

      <div className="relative border-t border-border/60">
        <div className="max-w-[1240px] mx-auto px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Méthode PAC SAS · RCS Lyon B 912 345 678 — Tous droits réservés.</span>
          <span className="inline-flex items-center gap-2">
            Conçu pour les installateurs PAC en France <span aria-hidden>·</span>{" "}
            <span className="inline-flex items-center gap-1 text-foreground/80">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Service en ligne
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, hash, label }: { to?: string; hash?: string; label: string }) {
  return (
    <li>
      <Link
        to={to ?? "/"}
        hash={hash}
        className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition group"
      >
        <span>{label}</span>
        <ArrowRight className="size-3 opacity-0 -translate-x-1 transition group-hover:opacity-100 group-hover:translate-x-0" />
      </Link>
    </li>
  );
}
