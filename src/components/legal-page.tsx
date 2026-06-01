import { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Mail, ShieldCheck, Calendar } from "lucide-react";

export type LegalSection = { id: string; title: string; content: ReactNode };

export function LegalPage({
  eyebrow,
  eyebrowVariant = "gold",
  title,
  intro,
  updatedLabel,
  sections,
}: {
  eyebrow: string;
  eyebrowVariant?: "gold" | "sky" | "terracotta";
  title: string;
  intro?: string;
  updatedLabel: string;
  sections: LegalSection[];
}) {
  const eyebrowClass =
    eyebrowVariant === "sky" ? "eyebrow eyebrow-sky" : eyebrowVariant === "terracotta" ? "eyebrow eyebrow-terracotta" : "eyebrow";
  return (
    <main className="flex-1 pt-44 pb-20 relative">
      <div className="absolute inset-x-0 top-32 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-gold-soft/30 blur-3xl pointer-events-none" />

      <div className="relative max-w-[1240px] mx-auto px-8 grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
        <article className="min-w-0">
          {/* Header */}
          <div className="reveal">
            <span className={eyebrowClass}>{eyebrow}</span>
            <h1 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">{title}</h1>
            {intro ? <p className="mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl">{intro}</p> : null}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-xs text-muted-foreground">
              <Calendar className="size-3.5 text-gold" />
              <span>{updatedLabel}</span>
            </div>
          </div>

          {/* Sections */}
          <div className="mt-12 space-y-12">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} className="reveal scroll-mt-40">
                <div className="flex items-start gap-4">
                  <div className="size-10 lg:size-11 rounded-xl bg-gold-soft border border-gold/30 text-foreground flex items-center justify-center font-display font-bold text-base shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold leading-tight pt-1">{s.title}</h2>
                </div>
                <div className="mt-5 pl-0 lg:pl-[60px] space-y-3 text-base leading-relaxed text-foreground/85 prose-legal">
                  {s.content}
                </div>
              </section>
            ))}
          </div>

          {/* Help callout */}
          <div className="mt-16 reveal rounded-3xl bg-gradient-to-br from-primary to-primary/85 text-primary-foreground p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 size-60 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-gold text-foreground px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
                  <ShieldCheck className="size-3.5" /> Une question ?
                </div>
                <h3 className="mt-4 font-display text-2xl md:text-3xl font-bold">
                  Besoin de précisions sur ce document ?
                </h3>
                <p className="mt-3 text-base text-primary-foreground/85 max-w-xl">
                  Notre équipe répond sous 24h ouvrées. Pour les demandes RGPD (accès, rectification, suppression),
                  écrivez directement au DPO.
                </p>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <a
                  href="mailto:contact@methode-pac.fr"
                  className="inline-flex items-center gap-2 rounded-[100px] bg-background text-foreground px-6 h-12 font-semibold text-sm shadow-elevated hover:-translate-y-0.5 transition"
                >
                  <Mail className="size-4 text-gold" /> contact@methode-pac.fr
                </a>
                <a
                  href="mailto:dpo@methode-pac.fr"
                  className="inline-flex items-center gap-2 rounded-[100px] border border-primary-foreground/20 px-6 h-12 font-medium text-sm text-primary-foreground hover:bg-primary-foreground/10 transition"
                >
                  <Mail className="size-4 text-gold" /> dpo@methode-pac.fr
                </a>
              </div>
            </div>
          </div>

          {/* Back to home */}
          <div className="mt-10 text-center reveal">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition group"
            >
              <ArrowRight className="size-3.5 rotate-180 transition group-hover:-translate-x-0.5" />
              Retour à l'accueil
            </Link>
          </div>
        </article>

        {/* Sticky TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-44">
            <div className="text-[11px] uppercase tracking-[0.18em] text-foreground/60 font-bold mb-4">
              Sur cette page
            </div>
            <nav>
              <ul className="space-y-1.5 text-sm">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="group flex items-center gap-3 py-1.5 text-muted-foreground hover:text-foreground transition"
                    >
                      <span className="font-display text-xs text-gold/70 group-hover:text-gold w-6 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="leading-snug">{s.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 rounded-2xl border bg-cream/40 p-5">
              <div className="text-[11px] uppercase tracking-wider text-gold font-bold">Garantie</div>
              <div className="mt-1 font-display text-base font-semibold leading-tight">
                Satisfait ou remboursé 30 jours
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                Sans justification. Remboursement sous 5 j ouvrés.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
