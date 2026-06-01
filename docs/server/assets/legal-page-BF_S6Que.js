import { T as jsxRuntimeExports } from "./worker-entry-DaylyazV.js";
import { c as createLucideIcon, b as ShieldCheck, M as Mail, L as Link, A as ArrowRight } from "./router-DKkmzreU.js";
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }]
];
const Calendar = createLucideIcon("calendar", __iconNode);
function LegalPage({
  eyebrow,
  eyebrowVariant = "gold",
  title,
  intro,
  updatedLabel,
  sections
}) {
  const eyebrowClass = eyebrowVariant === "sky" ? "eyebrow eyebrow-sky" : eyebrowVariant === "terracotta" ? "eyebrow eyebrow-terracotta" : "eyebrow";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 pt-44 pb-20 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-32 h-px bg-gradient-to-r from-transparent via-border to-transparent" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-10 left-1/2 -translate-x-1/2 size-[600px] rounded-full bg-gold-soft/30 blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-[1240px] mx-auto px-8 grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reveal", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: eyebrowClass, children: eyebrow }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]", children: title }),
          intro ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-lg text-muted-foreground leading-relaxed max-w-2xl", children: intro }) : null,
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 inline-flex items-center gap-2 rounded-full border bg-background px-4 py-1.5 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-3.5 text-gold" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: updatedLabel })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 space-y-12", children: sections.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { id: s.id, className: "reveal scroll-mt-40", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 lg:size-11 rounded-xl bg-gold-soft border border-gold/30 text-foreground flex items-center justify-center font-display font-bold text-base shrink-0", children: String(i + 1).padStart(2, "0") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl md:text-3xl font-bold leading-tight pt-1", children: s.title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 pl-0 lg:pl-[60px] space-y-3 text-base leading-relaxed text-foreground/85 prose-legal", children: s.content })
        ] }, s.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 reveal rounded-3xl bg-gradient-to-br from-primary to-primary/85 text-primary-foreground p-8 lg:p-10 relative overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-20 -right-20 size-60 rounded-full bg-gold/20 blur-3xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative grid md:grid-cols-[1fr_auto] gap-6 items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-gold text-foreground px-3 py-1 text-[11px] font-bold uppercase tracking-wider", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3.5" }),
                " Une question ?"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-4 font-display text-2xl md:text-3xl font-bold", children: "Besoin de précisions sur ce document ?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-base text-primary-foreground/85 max-w-xl", children: "Notre équipe répond sous 24h ouvrées. Pour les demandes RGPD (accès, rectification, suppression), écrivez directement au DPO." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 shrink-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "mailto:contact@methode-pac.fr",
                  className: "inline-flex items-center gap-2 rounded-[100px] bg-background text-foreground px-6 h-12 font-semibold text-sm shadow-elevated hover:-translate-y-0.5 transition",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4 text-gold" }),
                    " contact@methode-pac.fr"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "a",
                {
                  href: "mailto:dpo@methode-pac.fr",
                  className: "inline-flex items-center gap-2 rounded-[100px] border border-primary-foreground/20 px-6 h-12 font-medium text-sm text-primary-foreground hover:bg-primary-foreground/10 transition",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4 text-gold" }),
                    " dpo@methode-pac.fr"
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 text-center reveal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/",
            className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition group",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-3.5 rotate-180 transition group-hover:-translate-x-0.5" }),
              "Retour à l'accueil"
            ]
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sticky top-44", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-[0.18em] text-foreground/60 font-bold mb-4", children: "Sur cette page" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5 text-sm", children: sections.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "a",
          {
            href: `#${s.id}`,
            className: "group flex items-center gap-3 py-1.5 text-muted-foreground hover:text-foreground transition",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs text-gold/70 group-hover:text-gold w-6 shrink-0", children: String(i + 1).padStart(2, "0") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-snug", children: s.title })
            ]
          }
        ) }, s.id)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 rounded-2xl border bg-cream/40 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] uppercase tracking-wider text-gold font-bold", children: "Garantie" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-display text-base font-semibold leading-tight", children: "Satisfait ou remboursé 30 jours" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground leading-relaxed", children: "Sans justification. Remboursement sous 5 j ouvrés." })
        ] })
      ] }) })
    ] })
  ] });
}
export {
  LegalPage as L
};
