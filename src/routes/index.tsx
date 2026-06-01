import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import heroBg from "@/assets/pompe-a-chaleur.jpeg";
import boschLogo from "@/assets/brands/bosch.svg";
import hitachiLogo from "@/assets/brands/hitachi.svg";
import mitsubishiLogo from "@/assets/brands/mitsubishi.svg";
import panasonicLogo from "@/assets/brands/panasonic.svg";
import toshibaLogo from "@/assets/brands/toshiba.svg";
import avatar1 from "@/assets/avatars/julien.jpg";
import avatar2 from "@/assets/avatars/avatar-32.jpg";
import avatar3 from "@/assets/avatars/emilie.jpg";
import avatar4 from "@/assets/avatars/avatar-52.jpg";
import { SiteFooter } from "@/components/site-shell";
import { useCity } from "@/hooks/useCity";
import dashboardImg from "@/assets/analytics-bar.jpg";
import pacUnitImg from "@/assets/pac-home.jpg";
import {
  Check,
  X,
  Star,
  Target,
  TrendingUp,
  Shield,
  Download,
  Sparkles,
  BarChart3,
  Search,
  MousePointer,
  FileText,
  Lock,
  Phone,
  ArrowRight,
  Flame,
  Award,
  ShieldCheck,
  HandCoins,
  HeartHandshake,
  Zap,
  Plus,
  Rocket,
  CheckCircle2,
  Banknote,
  Activity,
} from "lucide-react";

export const Route = createFileRoute("/")({
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

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function Landing() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-background text-foreground">
      <AnnouncementBar />
      <Navbar scrolled={scrolled} />
      <Hero />
      <div style={{ zoom: 1.15 }}>
        <PressBar />
        <PainSection />
        <CostComparison />
        <SolutionSection />
        <BenefitsSection />
        <ContentsSection />
        <ForWhomSection />
        <TestimonialsSection />
        <OfferSection />
        <GuaranteesSection />
        <FaqSection />
        <FinalCta />
        <SiteFooter />
      </div>
      <MobileStickyCta />
    </div>
  );
}

/* ───────────────── Announcement ───────────────── */
function AnnouncementBar() {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const t = new Date("2026-12-31").getTime();
    setDays(Math.ceil((t - Date.now()) / 86400000));
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-12 bg-gradient-to-r from-terracotta via-terracotta to-[oklch(0.68_0.14_60)] text-terracotta-foreground text-sm md:text-base flex items-center justify-center px-4 shadow-card">
      <Rocket className="size-4 md:size-5 mr-2 animate-pulse-soft text-foreground/80" />
      <span className="font-medium">
        Multipliez vos chantiers PAC avec des leads <strong className="text-foreground">100% exclusifs</strong>, jamais revendus
      </span>
      <a
        href="#formulaire"
        className="hidden md:inline-flex items-center gap-1 ml-5 rounded-full bg-foreground/15 hover:bg-foreground/25 px-3 py-1 text-xs font-bold uppercase tracking-wider transition"
      >
        Réserver mon créneau <ArrowRight className="size-3" />
      </a>
    </div>
  );
}

/* ───────────────── Navbar ───────────────── */
function Navbar({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["#problemes", "Problèmes"],
    ["#solution", "Solution"],
    ["#contenu", "Contenu"],
    ["#avis", "Avis"],
    ["#offre", "Offre"],
    ["#faq", "FAQ"],
  ];
  return (
    <header
      className={`fixed inset-x-0 top-12 z-50 h-28 transition-all ${scrolled ? "bg-background/85 backdrop-blur-xl border-b" : ""}`}
    >
      <div className="max-w-full px-[0.7cm] h-full flex items-center justify-between">
        <a href="#" className="flex items-center gap-3">
          <div className="size-12 rounded-full bg-primary flex items-center justify-center">
            <Zap className="size-6 text-gold" />
          </div>
          <span className="font-display text-3xl font-bold">
            Guide<span className="text-gold">PAC</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-lg font-medium text-foreground/80">
          {links.map(([h, l]) => (
            <a
              key={h}
              href={h}
              className="relative py-1 hover:text-primary transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-0 after:bg-gold after:transition-all hover:after:w-full"
            >
              {l}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+33123456789"
            className={`inline-flex items-center gap-2 rounded-[100px] border-2 px-5 h-12 text-lg font-semibold transition shadow-card hover:-translate-y-0.5 ${scrolled ? "border-sky/40 text-sky bg-sky-soft/30 hover:bg-sky-soft/60 hover:border-sky" : "border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 hover:border-primary"}`}
          >
            <Phone className="size-5" /> 01 23 45 67 89
          </a>
          <a
            href="#offre"
            className="rounded-[100px] bg-primary text-primary-foreground px-7 h-14 flex items-center text-lg font-semibold hover:opacity-90 transition"
          >
            Obtenir le guide
          </a>
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
            <a key={h} href={h} onClick={() => setOpen(false)} className="block text-sm">
              {l}
            </a>
          ))}
          <a
            href="#offre"
            className="block rounded-[100px] bg-primary text-primary-foreground px-5 h-11 leading-[44px] text-center text-sm font-semibold"
          >
            Obtenir le guide
          </a>
        </div>
      )}
    </header>
  );
}

/* ───────────────── Hero ───────────────── */
function Hero() {
  const { city, inCity } = useCity();
  return (
    <section className="relative isolate pt-48 lg:pt-52 pb-10 lg:pb-14 overflow-hidden">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/45 to-background/15 z-0" />
      <div className="absolute -top-20 -right-20 size-[500px] rounded-full bg-gold-soft/50 blur-3xl z-0" />
      <div className="absolute bottom-0 -left-32 size-[400px] rounded-full bg-sky-soft/40 blur-3xl z-0" />
      <div className="absolute inset-x-0 bottom-0 h-48 lg:h-64 bg-gradient-to-b from-transparent via-cream/60 to-cream z-[1] pointer-events-none" />
      <div
        className="relative z-10 max-w-full px-[0.7cm] grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-12 items-start"
        style={{ zoom: 0.92 }}
      >
        <div className="reveal">
          <h1 className="font-display text-4xl md:text-5xl lg:text-7xl leading-[1.05] font-bold [text-shadow:0_2px_18px_rgba(255,255,255,0.85),0_1px_3px_rgba(255,255,255,0.95)]">
            Générer des leads
            <br />
            <em className="text-primary not-italic">
              <span className="italic">pompe à chaleur</span>
            </em>
            <br />
            {city ? (
              <>
                à <span className="text-primary animate-pulse-soft">{city}</span>.
              </>
            ) : (
              <>
                <span className="text-primary animate-pulse-soft">qualifiés</span>.
              </>
            )}
          </h1>
          <p className="mt-6 text-xl text-foreground/90 max-w-xl [text-shadow:0_1px_10px_rgba(255,255,255,0.9)]">
            Générez vos propres leads PAC {inCity} <strong className="text-foreground">100% exclusifs à ~25€</strong>{" "}
            via Google Ads — au lieu de payer <strong className="text-terracotta">80€/lead à vie</strong> à des
            agrégateurs qui les revendent à 5 confrères.
          </p>

          <ul className="mt-8 space-y-3.5 [&_span]:[text-shadow:0_1px_8px_rgba(255,255,255,0.85)]">
            {[
              "Templates Google Ads prêts à l'emploi : PAC air/eau (panier élevé), air/air, RGE, MaPrimeRénov'",
              "200+ intent keywords ciblés sur les requêtes des prospects PAC en France",
              "Méthode Quality Score qui réduit votre CPL de 60% en 6 semaines",
              "Setup tracking complet pour piloter votre ROAS au centime près",
              "Méthode appliquée par 47 installateurs · 312 acheteurs · ROAS x4 mini",
            ].map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-0.5 size-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="size-4 text-primary" />
                </span>
                <span className="text-xl">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#offre"
className="rounded-[100px] bg-terracotta text-terracotta-foreground px-10 h-16 flex items-center gap-2 font-semibold text-xl shadow-elevated hover:-translate-y-0.5 transition"            >
              Générer mes 1ers leads {city ? `à ${city}` : "en 14 jours"} — 47€ <ArrowRight className="size-4" />
            </a>
            <a
              href="#contenu"
              className="text-xl text-foreground hover:text-primary transition underline underline-offset-4 font-medium"
            >
              Voir le sommaire
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex -space-x-2">
              {[avatar1, avatar2, avatar3, avatar4].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="size-11 rounded-full ring-2 ring-background object-cover shadow-card"
                />
              ))}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="size-4 text-gold fill-current" />
                  ))}
                </div>
                <strong className="text-base text-foreground">4,9/5</strong>
              </div>
              <div className="text-sm text-foreground font-medium mt-0.5">
                +312 avis · Google &amp; Trustpilot
              </div>
            </div>
          </div>
        </div>

        {/* Right: form card */}
        <LeadForm />
      </div>
    </section>
  );
}

/* ───────────────── Lead Form ───────────────── */
function LeadForm() {
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    // step 1
    company: "",
    sector: "",
    profile: "",
    // step 2
    civility: "",
    name: "",
    email: "",
    phoneCountry: "+33",
    phone: "",
    needs: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const canNext1 = form.company && form.sector && form.profile;

  const sectors = [
    "Pompe à chaleur (PAC air/eau)",
    "Pompe à chaleur (PAC air/air)",
    "Photovoltaïque / Solaire",
    "Isolation thermique",
    "Chaudière & chauffage",
    "Ballon thermodynamique",
    "Climatisation",
    "Rénovation énergétique globale",
    "Borne de recharge VE",
    "Autre",
  ];

  const dialCodes: { code: string; label: string }[] = [
    { code: "+33", label: "🇫🇷 France (+33)" },
    { code: "+32", label: "🇧🇪 Belgique (+32)" },
    { code: "+41", label: "🇨🇭 Suisse (+41)" },
    { code: "+352", label: "🇱🇺 Luxembourg (+352)" },
    { code: "+1", label: "🇨🇦 Canada / 🇺🇸 USA (+1)" },
    { code: "+44", label: "🇬🇧 Royaume-Uni (+44)" },
    { code: "+49", label: "🇩🇪 Allemagne (+49)" },
    { code: "+34", label: "🇪🇸 Espagne (+34)" },
    { code: "+39", label: "🇮🇹 Italie (+39)" },
    { code: "+351", label: "🇵🇹 Portugal (+351)" },
    { code: "+31", label: "🇳🇱 Pays-Bas (+31)" },
    { code: "+43", label: "🇦🇹 Autriche (+43)" },
    { code: "+45", label: "🇩🇰 Danemark (+45)" },
    { code: "+46", label: "🇸🇪 Suède (+46)" },
    { code: "+47", label: "🇳🇴 Norvège (+47)" },
    { code: "+358", label: "🇫🇮 Finlande (+358)" },
    { code: "+353", label: "🇮🇪 Irlande (+353)" },
    { code: "+30", label: "🇬🇷 Grèce (+30)" },
    { code: "+48", label: "🇵🇱 Pologne (+48)" },
    { code: "+420", label: "🇨🇿 Tchéquie (+420)" },
    { code: "+36", label: "🇭🇺 Hongrie (+36)" },
    { code: "+40", label: "🇷🇴 Roumanie (+40)" },
    { code: "+212", label: "🇲🇦 Maroc (+212)" },
    { code: "+213", label: "🇩🇿 Algérie (+213)" },
    { code: "+216", label: "🇹🇳 Tunisie (+216)" },
    { code: "+221", label: "🇸🇳 Sénégal (+221)" },
    { code: "+225", label: "🇨🇮 Côte d'Ivoire (+225)" },
    { code: "+237", label: "🇨🇲 Cameroun (+237)" },
    { code: "+971", label: "🇦🇪 Émirats (+971)" },
    { code: "+966", label: "🇸🇦 Arabie Saoudite (+966)" },
    { code: "+90", label: "🇹🇷 Turquie (+90)" },
    { code: "+7", label: "🇷🇺 Russie (+7)" },
    { code: "+86", label: "🇨🇳 Chine (+86)" },
    { code: "+81", label: "🇯🇵 Japon (+81)" },
    { code: "+82", label: "🇰🇷 Corée du Sud (+82)" },
    { code: "+91", label: "🇮🇳 Inde (+91)" },
    { code: "+61", label: "🇦🇺 Australie (+61)" },
    { code: "+55", label: "🇧🇷 Brésil (+55)" },
    { code: "+52", label: "🇲🇽 Mexique (+52)" },
  ];

  return (
    <div id="formulaire" className="relative reveal scroll-mt-24 lg:mt-16">
      <div className="absolute -inset-6 bg-gradient-to-br from-gold-soft via-transparent to-sky-soft blur-2xl -z-10" />
      <div className="rounded-3xl bg-background border shadow-elevated overflow-hidden">
        <div className="bg-cream px-8 py-7 border-b">
          <span className="text-lg uppercase tracking-wider text-gold font-semibold">
            Une question ? On vous répond sous 24h
          </span>
          <h3 className="mt-2 font-display text-4xl font-bold">
            {step === 1 && "Parlez-nous de votre activité"}
            {step === 2 && "Vos coordonnées"}
          </h3>
          <div className="mt-3 h-1.5 rounded-full bg-background overflow-hidden">
            <div className="h-full bg-gold transition-all duration-500" style={{ width: `${(step / 2) * 100}%` }} />
          </div>
        </div>

        {submitted ? (
          <div className="p-10 text-center">
            <div className="size-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Check className="size-7 text-primary" />
            </div>
            <h4 className="mt-4 font-display text-2xl">Merci {form.name.split(" ")[0]} !</h4>
            <p className="mt-2 text-xl text-muted-foreground">Nous revenons vers vous sous 24h.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (step < 2) return;
              setSubmitted(true);
            }}
            className="p-8 space-y-4"
          >
            {step === 1 && (
              <>
                <Input placeholder="Société" value={form.company} onChange={(v) => update("company", v)} required />
                <select
                  required
                  value={form.sector}
                  onChange={(e) => update("sector", e.target.value)}
                  className="w-full h-14 rounded-[100px] border bg-cream/50 px-6 text-lg outline-none focus:border-primary"
                >
                  <option value="">Secteur d'activité…</option>
                  {sectors.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <select
                  required
                  value={form.profile}
                  onChange={(e) => update("profile", e.target.value)}
                  className="w-full h-14 rounded-[100px] border bg-cream/50 px-6 text-lg outline-none focus:border-primary"
                >
                  <option value="">Vous êtes…</option>
                  <option>Installateur PAC</option>
                  <option>Entrepreneur</option>
                  <option>Agence marketing</option>
                  <option>Commercial énergétique</option>
                  <option>Autre</option>
                </select>
              </>
            )}

            {step === 2 && (
              <>
                <select
                  required
                  value={form.civility}
                  onChange={(e) => update("civility", e.target.value)}
                  className="w-full h-14 rounded-[100px] border bg-cream/50 px-6 text-lg outline-none focus:border-primary"
                >
                  <option value="">Civilité…</option>
                  <option>M.</option>
                  <option>Mme</option>
                </select>
                <Input placeholder="Nom et prénom" value={form.name} onChange={(v) => update("name", v)} required />
                <Input
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  required
                />
                <div className="flex gap-2">
                  <select
                    value={form.phoneCountry}
                    onChange={(e) => update("phoneCountry", e.target.value)}
                    className="h-14 w-36 rounded-[100px] border bg-cream/50 px-4 text-lg outline-none focus:border-primary"
                  >
                    {dialCodes.map((d) => (
                      <option key={d.code} value={d.code}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    required
                    maxLength={20}
                    className="flex-1 h-14 rounded-[100px] border bg-cream/50 px-6 text-lg outline-none focus:border-primary"
                  />
                </div>
                <textarea
                  required
                  rows={4}
                  value={form.needs}
                  onChange={(e) => update("needs", e.target.value)}
                  placeholder="Décrivez vos besoins"
                  maxLength={1000}
                  className="w-full rounded-2xl border bg-cream/50 px-6 py-4 text-lg outline-none focus:border-primary resize-none"
                />
              </>
            )}

            <div className="flex gap-2 pt-2">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="h-16 px-7 rounded-[100px] border text-lg font-semibold hover:bg-cream/60 transition"
                >
                  Retour
                </button>
              )}
              {step < 2 ? (
                <button
                  type="button"
                  disabled={!canNext1}
                  onClick={() => setStep(step + 1)}
                  className="flex-1 h-16 rounded-[100px] bg-primary text-primary-foreground text-lg font-semibold flex items-center justify-center gap-2 shadow-elevated hover:opacity-95 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continuer <ArrowRight className="size-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex-1 h-16 rounded-[100px] bg-terracotta text-terracotta-foreground text-lg font-semibold flex items-center justify-center gap-2 shadow-elevated hover:opacity-95 transition"
                >
                  Envoyer ma demande <ArrowRight className="size-5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 pt-3 border-t mt-5 text-sm text-muted-foreground">
<Lock className="size-5 text-gold" /> <span className="text-lg">Données sécurisées · Sans spam</span>            </div>
          </form>
        )}
      </div>
    </div>
  );
}

function Input({
  value,
  onChange,
  ...rest
}: { value: string; onChange: (v: string) => void } & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>) {
  return (
    <input
      {...rest}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-14 rounded-[100px] border bg-cream/50 px-6 text-lg outline-none focus:border-primary transition"
    />
  );
}

function Pill({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl bg-cream py-2.5 text-[11px] text-muted-foreground text-center">
      <span className="text-sky">{icon}</span>
      {children}
    </div>
  );
}

/* ───────────────── Social Proof ───────────────── */
function PressBar() {
  const { inCity } = useCity();
  type Brand = { name: string; logo?: string; textClass?: string };
  const brands: Brand[] = [
    { name: "Daikin", textClass: "font-sans font-black tracking-tight text-[#0089cd]" },
    { name: "Mitsubishi Electric", logo: mitsubishiLogo },
    { name: "Atlantic", textClass: "font-display italic font-semibold text-[#005ca9]" },
    { name: "Panasonic", logo: panasonicLogo },
    { name: "Viessmann", textClass: "font-sans font-bold uppercase tracking-tight text-[#e2001a]" },
    { name: "Bosch", logo: boschLogo },
    { name: "De Dietrich", textClass: "font-display font-semibold text-[#9d1c20]" },
    { name: "Hitachi", logo: hitachiLogo },
    { name: "Vaillant", textClass: "font-sans font-bold uppercase tracking-wider text-[#006633]" },
    { name: "Toshiba", logo: toshibaLogo },
    { name: "Saunier Duval", textClass: "font-display font-medium text-[#0066b1]" },
    { name: "Stiebel Eltron", textClass: "font-sans font-bold uppercase tracking-tight text-[#e30613]" },
  ];
  const stats = [
    { v: "312", l: "installateurs accompagnés" },
    { v: "—76%", l: "sur le CPL moyen" },
    { v: "x4", l: "ROAS minimum garanti" },
  ];

  return (
    <section className="bg-gradient-to-b from-cream via-background to-background py-7 lg:py-9 overflow-hidden">
      <div className="max-w-full px-[0.7cm]">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-12 reveal">
          <div className="flex-1">
            <span className="inline-flex items-center gap-2 rounded-[100px] bg-gold-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wider">
<ShieldCheck className="size-5 text-gold" /> <span className="text-base">Réseau & marques de confiance</span>            </span>
            <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
              +312 installateurs PAC {inCity}<br />
              <em className="italic text-primary">déploient déjà la méthode.</em>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              Artisans RGE QualiPAC, PME chauffagistes et agences énergies pilotent leur acquisition {inCity} en
              autonomie sur les plus grandes marques du marché PAC — CPL moyen sous les 25€.
            </p>
          </div>
          <a
            href="#formulaire"
            className="rounded-[100px] bg-terracotta text-terracotta-foreground px-8 h-16 inline-flex items-center gap-2 font-semibold text-lg shadow-elevated hover:-translate-y-0.5 transition shrink-0 self-start md:self-center"
          >
            Demander un audit leads PAC <ArrowRight className="size-5" />
          </a>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 reveal">
          {stats.map((s) => (
            <div key={s.l} className="rounded-2xl bg-background border shadow-card p-6 text-center">
              <div className="font-display text-3xl md:text-4xl font-bold text-gold">{s.v}</div>
              <div className="mt-1 text-xs md:text-sm text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 lg:mt-16 relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-cream/95 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-cream/95 to-transparent z-10" />
        <div className="flex w-max gap-6 lg:gap-8 animate-marquee-ltr">
          {[...brands, ...brands].map((b, i) => (
            <div
              key={i}
              className="shrink-0 h-20 lg:h-24 min-w-[180px] lg:min-w-[220px] px-8 rounded-2xl bg-background border shadow-card flex items-center justify-center hover:-translate-y-1 hover:shadow-elevated transition"
            >
              {b.logo ? (
                <img src={b.logo} alt={b.name} className="max-h-10 lg:max-h-12 w-auto object-contain" loading="lazy" />
              ) : (
                <span className={`text-xl lg:text-2xl whitespace-nowrap ${b.textClass}`}>{b.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Pain ───────────────── */
function PainSection() {
  const pains = [
    {
      t: "Le même lead vendu à 5 concurrents",
      d: "Vous appelez un prospect qui vient de raccrocher avec 4 confrères. Taux de signature divisé par 5.",
    },
    {
      t: "80€ à 200€ par lead chez les agrégateurs",
      d: "Sur 100 leads achetés à 80€ = 8 000€/mois. Et vous repartirez à zéro le mois prochain.",
    },
    {
      t: "Vous payez à vie, sans rien posséder",
      d: "Vous ne construisez aucun actif. Aucune base prospects, aucune data, aucun canal qui vous appartient.",
    },
    {
      t: "Vos campagnes Google Ads brûlent du budget",
      d: "Sans structure SKAG ni tracking GA4, votre CPL explose et vous tirez le frein avant d'avoir compris.",
    },
    {
      t: "Vous subissez les prix imposés par les apporteurs",
      d: "Le prix du lead monte chaque trimestre. Vous absorbez ou vous perdez le canal — pas le choix.",
    },
    {
      t: "Aucune visibilité sur votre ROAS réel",
      d: "Vous savez que vous payez, vous ne savez pas ce que ça rapporte vraiment. Décisions à l'aveugle.",
    },
  ];
  return (
    <section id="problemes" className="py-7 lg:py-9 bg-background pattern-dots">
      <div className="max-w-full px-[0.7cm]">
        <div className="text-center max-w-3xl mx-auto reveal">
          <span className="eyebrow eyebrow-terracotta">Le vrai problème</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">
            Acheter ses leads,
            <br />
            <em className="italic text-terracotta">c'est louer son acquisition.</em>
          </h2>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Tant que vous achetez vos leads, vous serez locataire de votre carnet de commandes. Le jour où vous arrêtez
            de payer, le canal s'éteint. Et chaque lead coûte de plus en plus cher.
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {pains.map((p) => (
            <div key={p.t} className="reveal surface-card p-6">
              <div className="icon-tile icon-tile-terracotta size-11 rounded-2xl mb-5">
                <X className="size-5" />
              </div>
              <h3 className="font-display text-xl font-bold mb-2 leading-snug">{p.t}</h3>
              <p className="text-base text-muted-foreground leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center reveal">
          <a
            href="#offre"
            className="inline-flex items-center gap-2 rounded-[100px] bg-primary text-primary-foreground px-8 h-14 font-semibold text-base shadow-elevated hover:-translate-y-0.5 transition"
          >
            Reprendre le contrôle — 47€ <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Cost Comparison (Agitation) ───────────────── */
function CostComparison() {
  const rows = [
    { l: "Coût par lead", a: "80 € – 200 €", b: "≈ 25 €", winner: "b" },
    { l: "Exclusivité du lead", a: "Vendu à 4-5 confrères", b: "100 % exclusif", winner: "b" },
    { l: "Taux de signature moyen", a: "8 – 12 %", b: "26 – 32 %", winner: "b" },
    { l: "Contrôle du canal", a: "Aucun (prix imposés)", b: "Total (vos campagnes)", winner: "b" },
    { l: "Actif construit dans le temps", a: "Aucun", b: "Compte Ads + audience + data", winner: "b" },
    { l: "Coût annuel pour 60 leads/mois", a: "≈ 57 600 €", b: "≈ 18 000 € + 47 € (guide)", winner: "b" },
  ];
  return (
    <section className="py-7 lg:py-9 bg-cream">
      <div className="max-w-full px-[0.7cm]">
        <div className="text-center max-w-3xl mx-auto reveal">
          <span className="eyebrow eyebrow-terracotta">Le vrai coût</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">
            Acheter ou générer :
            <br />
            <em className="italic text-primary">39 600 € d'écart par an.</em>
          </h2>
          <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Sur 60 leads PAC par mois (volume réaliste pour un installateur RGE actif), voilà ce que vous payez selon
            le canal — et ce que vous construisez (ou pas) en parallèle.
          </p>
        </div>

        <div className="mt-8 reveal rounded-3xl bg-background border shadow-elevated overflow-x-auto">
          <div className="grid grid-cols-[1.3fr_1fr_1fr] text-sm min-w-[640px]">
            <div className="p-4 lg:p-6 border-b bg-cream/50 font-semibold text-foreground/70 uppercase tracking-wider text-[11px]">
              Comparatif
            </div>
            <div className="p-4 lg:p-6 border-b border-l bg-terracotta-soft/50 text-center">
              <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-terracotta font-bold">
                <X className="size-3.5" /> Agrégateurs
              </div>
              <div className="mt-1 text-sm md:text-base font-semibold">Acheter ses leads</div>
            </div>
            <div className="p-4 lg:p-6 border-b border-l bg-primary/10 text-center">
              <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-primary font-bold">
                <Check className="size-3.5" /> Méthode du guide
              </div>
              <div className="mt-1 text-sm md:text-base font-semibold">Générer ses leads</div>
            </div>

            {rows.map((r, i) => (
              <div key={r.l} className="contents">
                <div
                  className={`p-4 lg:p-6 ${i < rows.length - 1 ? "border-b" : ""} font-medium text-foreground/85 text-xs md:text-sm`}
                >
                  {r.l}
                </div>
                <div
                  className={`p-4 lg:p-6 border-l ${i < rows.length - 1 ? "border-b" : ""} text-center text-terracotta text-xs md:text-sm`}
                >
                  {r.a}
                </div>
                <div
                  className={`p-4 lg:p-6 border-l ${i < rows.length - 1 ? "border-b" : ""} text-center font-semibold text-primary text-xs md:text-sm`}
                >
                  {r.b}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4 reveal">
          <div className="rounded-2xl bg-background border p-5 text-center">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Vous payez</div>
            <div className="mt-1 font-display text-3xl font-bold text-terracotta">57 600 €/an</div>
            <div className="text-xs text-muted-foreground mt-1">Aux agrégateurs · 60 leads/mois × 80€</div>
          </div>
          <div className="rounded-2xl bg-background border p-5 text-center">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Vous payez</div>
            <div className="mt-1 font-display text-3xl font-bold text-primary">18 000 €/an</div>
            <div className="text-xs text-muted-foreground mt-1">À Google Ads · 60 leads/mois × 25€</div>
          </div>
          <div className="rounded-2xl bg-gold-soft border-2 border-gold p-5 text-center">
            <div className="text-xs uppercase tracking-wider text-foreground/70 font-semibold">Vous économisez</div>
            <div className="mt-1 font-display text-3xl font-bold text-foreground">39 600 €/an</div>
            <div className="text-xs text-foreground/70 mt-1">+ vous gardez le contrôle de votre acquisition</div>
          </div>
        </div>

        <div className="mt-10 text-center reveal">
          <a
            href="#offre"
            className="inline-flex items-center gap-2 rounded-[100px] bg-terracotta text-terracotta-foreground px-8 h-14 font-semibold text-base shadow-elevated hover:-translate-y-0.5 transition"
          >
            Récupérer 39 600 €/an — Accéder au guide à 47€ <ArrowRight className="size-4" />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">Garantie 30 jours · Accès à vie · Paiement sécurisé</p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Solution ───────────────── */
function SolutionSection() {
  const steps = [
    {
      i: Search,
      t: "Capter les requêtes air/eau à panier élevé",
      d: "Cartographie des 200+ keywords les plus rentables — focus PAC air/eau (panier 12-18 k€), RGE QualiPAC, MaPrimeRénov' rénovation globale. Vous tapez là où l'intent achat est le plus fort.",
    },
    {
      i: Target,
      t: "Structure SKAG → Quality Score 9-10/10",
      d: "Single Keyword Ad Group : 1 keyword = 1 groupe = 1 annonce ultra-pertinente. Google récompense par un CPC divisé par 2 et plus d'impressions sur les mêmes budgets.",
    },
    {
      i: MousePointer,
      t: "Landing page qui convertit 1 visiteur sur 5",
      d: "Templates clé-en-main : formulaire 4 champs, social proof RGE, simulateur d'aides MaPrimeRénov'. Taux de conversion moyen 18% — vs 3-5% pour une page générique.",
    },
    {
      i: BarChart3,
      t: "Tracking GA4 : votre vrai CPL au centime",
      d: "Setup complet GA4 + conversions Google Ads + appels téléphoniques. Vous voyez quel keyword génère un client, lequel brûle votre budget — et vous pilotez à la donnée, pas à l'intuition.",
    },
    {
      i: FileText,
      t: "Scripts qui économisent 8h/semaine",
      d: "Pause auto des keywords non rentables, alerte budget, exclusion des recherches polluées, ajustement d'enchères horaire. Votre compte tourne en background pendant que vous posez vos PAC.",
    },
    {
      i: TrendingUp,
      t: "Scale de 10 à 80 leads/mois en 90 jours",
      d: "Méthodologie pour passer de la première campagne validée au volume sérieux, sans exploser le CPL. Quand acheter du Performance Max, quand ouvrir une nouvelle zone géographique.",
    },
  ];
  return (
    <section id="solution" className="py-7 lg:py-9 bg-cream">
      <div className="max-w-full px-[0.7cm]">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 items-center reveal">
          <div>
            <span className="eyebrow">La solution</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-[1.1]">
              6 piliers pour devenir
              <br />
              <em className="italic text-primary">propriétaire de votre acquisition.</em>
            </h2>
            <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-xl">
              Système reproductible, testé sur 47 installateurs PAC. Aucune compétence Google Ads requise au départ —
              templates, scripts et campagnes prêts à importer.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-gold-soft via-transparent to-sky-soft blur-3xl -z-10" />
            <div className="relative rounded-2xl overflow-hidden border shadow-elevated bg-background">
              <img
                src={dashboardImg}
                alt="Dashboard analytics — pilotage CPL/ROAS Google Ads"
                loading="lazy"
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/90 backdrop-blur-sm px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-card">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" /> Cockpit Google Ads
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground italic">
              Votre tracking GA4 + Google Ads après setup — vous pilotez à la donnée, pas à l'intuition.
            </p>
          </div>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map(({ i: Icon, t, d }, idx) => (
            <div key={t} className="reveal surface-card p-7 relative">
              <span className="absolute top-5 right-5 font-display text-3xl font-bold text-gold/25 leading-none">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <div className="icon-tile mb-5">
                <Icon className="size-5" />
              </div>
              <h3 className="font-display text-xl font-bold leading-snug">{t}</h3>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center reveal">
          <a
            href="#offre"
            className="inline-flex items-center gap-2 rounded-[100px] bg-primary text-primary-foreground px-8 h-14 font-semibold text-base shadow-elevated hover:-translate-y-0.5 transition"
          >
            Démarrer la méthode — 47€ <ArrowRight className="size-4" />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">
            Garantie 30 jours · Accès à vie · Mises à jour incluses
          </p>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Benefits ───────────────── */
function BenefitsSection() {
  return (
    <section className="py-7 lg:py-9 bg-background">
      <div className="max-w-full px-[0.7cm]">
        <div className="text-center max-w-3xl mx-auto reveal">
          <span className="eyebrow">Résultats</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">
            Ce que vous obtenez
            <br />
            <em className="italic text-primary">en moins de 30 jours.</em>
          </h2>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              v: 25,
              suf: "€",
              l: "CPL moyen",
              d: "Par lead PAC 100% exclusif — vs 80-200€ chez les agrégateurs où le lead est revendu 5×.",
            },
            {
              v: 26,
              suf: "%",
              l: "Taux de RDV",
              d: "Sur 100 leads exclusifs, ~26 décrochent un RDV qualifié (vs 8-12% sur leads partagés).",
            },
            {
              v: 80,
              suf: "/mois",
              l: "Leads qualifiés",
              d: "Volume atteignable avec ~3 000€/mois de budget Ads, focus PAC air/eau et MaPrimeRénov'.",
            },
            {
              v: 4,
              suf: "x",
              l: "ROAS minimum",
              d: "Retour sur investissement publicitaire constaté en 90 jours sur 47 installateurs.",
            },
          ].map((b) => (
            <div key={b.l} className="reveal surface-card p-7 text-center">
              <div className="font-display text-5xl lg:text-6xl font-bold bg-gradient-to-br from-gold to-terracotta bg-clip-text text-transparent leading-none">
                <Counter to={b.v} suffix={b.suf} />
              </div>
              <div className="mt-3 font-semibold text-base">{b.l}</div>
              <p className="mt-3 text-base text-muted-foreground leading-relaxed">{b.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center reveal">
          <a
            href="#offre"
            className="inline-flex items-center gap-2 rounded-[100px] bg-terracotta text-terracotta-foreground px-8 h-14 font-semibold text-base shadow-elevated hover:-translate-y-0.5 transition"
          >
            Activer ma machine à leads — 47€ <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1400, 1);
      setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to]);
  return (
    <>
      {n.toLocaleString("fr-FR")}
      {suffix}
    </>
  );
}

/* ───────────────── Contents (TOC) ───────────────── */
function ContentsSection() {
  const chapters = [
    "Identifier les 3 requêtes PAC qui génèrent 80% des leads en France",
    "Cartographier les 47 micro-moments d'achat d'un prospect PAC",
    "Bâtir une structure SKAG qui fait passer le Quality Score à 9-10/10",
    "200+ intent keywords clé-en-main : air/eau, air/air, RGE, MaPrimeRénov'",
    "Rédiger des annonces qui doublent votre CTR (+150% en moyenne)",
    "Concevoir une landing page qui convertit 1 visiteur sur 5 en lead qualifié",
    "Setup tracking complet pour connaître votre vrai CPL au centime près",
    "Smart Bidding ou enchères manuelles : quand utiliser chaque levier",
    "Économiser 8h/semaine grâce aux audits et scripts d'automatisation",
    "Scaling : passer de 10 à 80 leads/mois en 90 jours sans exploser le CPL",
  ];
  return (
    <section id="contenu" className="py-7 lg:py-9 bg-cream">
      <div className="max-w-full px-[0.7cm]">
        <div className="text-center reveal">
          <span className="eyebrow">Sommaire</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">
            10 chapitres,
            <br />
            <em className="italic text-primary">200 pages actionnables.</em>
          </h2>
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-x-8">
          {chapters.map((c, i) => (
            <div key={c} className="reveal flex items-start gap-4 py-5 border-b">
              <span className="font-display text-2xl text-gold w-10 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-base pt-1">{c}</span>
            </div>
          ))}
        </div>
        <div className="mt-10 reveal rounded-3xl bg-background border shadow-card p-8 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-[100px] bg-gold-soft px-4 py-1.5 text-xs font-medium">
              <Sparkles className="size-3.5 text-gold" /> Bonus inclus
            </span>
            <span className="text-xs text-muted-foreground">Valeur estimée 290€ — offerts</span>
          </div>
          <h3 className="mt-4 font-display text-2xl md:text-3xl font-bold">+ 5 ressources offertes</h3>
          <ul className="mt-6 grid md:grid-cols-2 gap-x-8 gap-y-3 text-base">
            {[
              "Template Google Sheets de pilotage CPL/ROAS",
              "Pack de 12 visuels d'annonces PAC (Canva)",
              "Script d'appel commercial pour qualifier un lead",
              "Checklist d'audit Google Ads en 47 points",
              "Accès au groupe privé d'installateurs (350+ membres)",
            ].map((b) => (
              <li key={b} className="flex gap-3">
                <Check className="size-4 text-primary mt-0.5 shrink-0" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── For Whom ───────────────── */
function ForWhomSection() {
  return (
    <section className="py-7 lg:py-9 bg-background">
      <div className="max-w-full px-[0.7cm]">
        <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-12 items-center reveal">
          <div className="relative shrink-0 mx-auto lg:mx-0">
            <div className="absolute -inset-3 bg-gradient-to-br from-gold-soft via-transparent to-sky-soft blur-2xl -z-10" />
            <img
              src={pacUnitImg}
              alt="Pompe à chaleur air/eau installée chez un client"
              loading="lazy"
              className="w-56 h-56 lg:w-64 lg:h-64 rounded-3xl object-cover shadow-elevated border-4 border-background"
            />
            <span className="absolute -bottom-3 -right-3 inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-card">
              <Award className="size-3 text-gold" /> Air/eau · RGE
            </span>
          </div>
          <div className="text-center lg:text-left">
            <span className="eyebrow">Pour qui ?</span>
            <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold leading-[1.1]">
              Ce guide vous correspond
              <br />
              <em className="italic text-primary">si vous êtes…</em>
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
              Pensé pour les artisans et PME qui posent des PAC chaque semaine et veulent arrêter de subir le prix
              imposé par les agrégateurs.
            </p>
          </div>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="reveal relative rounded-3xl bg-background border-2 border-primary/15 p-8 lg:p-10 shadow-card hover:shadow-elevated transition">
            <div className="absolute -top-3 left-8 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-card">
              <Check className="size-3.5" /> Pour vous
            </div>
            <h3 className="mt-2 font-display text-2xl lg:text-3xl font-bold">C'est pour vous si…</h3>
            <ul className="mt-6 space-y-3.5 text-base">
              {[
                "Installateur PAC (artisan, PME, RGE QualiPAC)",
                "Agence marketing spécialisée énergies renouvelables",
                "Commercial qui veut maîtriser son acquisition",
                "Entrepreneur du secteur énergie / rénovation",
              ].map((s) => (
                <li key={s} className="flex gap-3 items-start">
                  <span className="mt-0.5 size-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="size-3 text-primary" strokeWidth={3} />
                  </span>
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="reveal relative rounded-3xl bg-background border-2 border-terracotta/15 p-8 lg:p-10 shadow-card hover:shadow-elevated transition">
            <div className="absolute -top-3 left-8 inline-flex items-center gap-2 rounded-full bg-terracotta text-terracotta-foreground px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider shadow-card">
              <X className="size-3.5" /> Pas pour vous
            </div>
            <h3 className="mt-2 font-display text-2xl lg:text-3xl font-bold">Passez votre chemin si…</h3>
            <ul className="mt-6 space-y-3.5 text-base">
              {[
                'Vous cherchez une solution "magique" sans effort',
                "Vous refusez d'investir 1 500€/mois minimum en Ads",
                "Vous ne traitez pas vos leads en moins de 24h",
                "Vous n'avez aucune intention de tester Google Ads",
              ].map((s) => (
                <li key={s} className="flex gap-3 items-start">
                  <span className="mt-0.5 size-5 rounded-full bg-terracotta/10 flex items-center justify-center shrink-0">
                    <X className="size-3 text-terracotta" strokeWidth={3} />
                  </span>
                  <span className="leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Testimonials ───────────────── */
function TestimonialsSection() {
  const items = [
    {
      name: "Antoine Caron",
      role: "Gérant · RGE QualiPAC",
      company: "ThermiBat Atlantique",
      city: "Nantes (44)",
      avatar: avatar2,
      duration: "Après 4 mois",
      quote:
        "Avant le guide, je payais 145€ par lead chez les agrégateurs et la moitié finissait dans le mur — déjà revendu à 4 confrères. En 4 mois sur Google Ads, j'ai généré 820 leads exclusifs et signé 119 installations PAC. Mon CA installation a doublé sans embaucher de commercial. La structure SKAG m'a fait passer le Quality Score de 4/10 à 9/10 en 6 semaines.",
      stats: [
        { v: "22€", l: "CPL moyen" },
        { v: "820", l: "leads en 4 mois" },
        { v: "119", l: "installations" },
      ],
    },
    {
      name: "Émilie Garnier",
      role: "Directrice acquisition",
      company: "Habitat & Énergie Studio",
      city: "Toulouse (31)",
      avatar: avatar3,
      duration: "Après 6 mois",
      quote:
        "On gère 8 comptes installateurs PAC pour des artisans RGE. Avant la méthode, on bricolait — chaque compte avait sa logique, impossible à industrialiser. Avec les templates et les scripts du guide, on a divisé le temps de gestion par 3 et tous nos clients sont passés au-dessus d'un ROAS de 4. Un client est même à 6,8.",
      stats: [
        { v: "19€", l: "CPL moyen" },
        { v: "x4,8", l: "ROAS moyen" },
        { v: "8", l: "installateurs gérés" },
      ],
    },
    {
      name: "Bruno Vasseur",
      role: "Dirigeant · PME chauffagiste",
      company: "ChaufThermic Est",
      city: "Strasbourg (67)",
      avatar: avatar4,
      duration: "Après 90 jours",
      quote:
        "J'avais arrêté Google Ads après avoir cramé 4 000€ sans signer un seul chantier. Le guide m'a fait comprendre que je tournais sur des keywords trop larges sans tracking conversion. En appliquant le setup GA4 + le SKAG sur 12 keywords ciblés air/eau, je génère 30 leads PAC qualifiés/mois et j'ai signé 41 PAC sur le trimestre.",
      stats: [
        { v: "27€", l: "CPL moyen" },
        { v: "30", l: "leads/mois" },
        { v: "41", l: "PAC posées (T1)" },
      ],
    },
  ];
  return (
    <section id="avis" className="py-7 lg:py-9 bg-cream">
      <div className="max-w-full px-[0.7cm]">
        <div className="text-center reveal">
          <span className="eyebrow">Témoignages vérifiés</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">
            Ils génèrent leurs leads PAC
            <br />
            <em className="italic text-primary">en autonomie.</em>
          </h2>
        </div>

        {/* Hero case study */}
        <div className="mt-10 reveal rounded-3xl bg-background border shadow-elevated overflow-hidden">
          <div className="grid lg:grid-cols-[1fr_1.4fr]">
            <div className="bg-primary text-primary-foreground p-8 lg:p-10 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 size-60 rounded-full bg-gold/20 blur-3xl" />
              <span className="relative inline-flex items-center gap-2 rounded-[100px] bg-gold text-foreground px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
                <Activity className="size-3" /> Cas client détaillé
              </span>
              <h3 className="relative mt-5 font-display text-2xl lg:text-3xl font-bold leading-tight">
                Énergie Confort Sud
              </h3>
              <p className="relative mt-1 text-sm text-primary-foreground/80">
                Marseille (13) · 5 artisans · RGE QualiPAC
              </p>
              <div className="relative mt-8 space-y-5">
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-primary-foreground/60 font-semibold">
                    Avant
                  </div>
                  <div className="mt-1 text-base leading-relaxed text-primary-foreground/90">
                    145 €/lead chez agrégateurs · 8% de signature · 6 100 €/mois en achat de leads · CA installation
                    en stagnation depuis 18 mois.
                  </div>
                </div>
                <div className="h-px bg-primary-foreground/20" />
                <div>
                  <div className="text-[11px] uppercase tracking-wider text-gold font-bold">Après — 4 mois</div>
                  <div className="mt-1 text-base leading-relaxed">
                    22 €/lead Google Ads · 27% de signature · 820 leads exclusifs · 119 PAC posées · CA installation
                    × 2,1.
                  </div>
                </div>
              </div>
            </div>
            <div className="p-8 lg:p-10">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-cream p-4 text-center">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">CPL</div>
                  <div className="mt-1 font-display text-2xl font-bold text-terracotta line-through">145€</div>
                  <div className="font-display text-3xl font-bold text-gold">22€</div>
                </div>
                <div className="rounded-2xl bg-cream p-4 text-center">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Leads/mois
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold text-terracotta line-through">42</div>
                  <div className="font-display text-3xl font-bold text-gold">205</div>
                </div>
                <div className="rounded-2xl bg-cream p-4 text-center">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Signature
                  </div>
                  <div className="mt-1 font-display text-2xl font-bold text-terracotta line-through">8%</div>
                  <div className="font-display text-3xl font-bold text-gold">27%</div>
                </div>
              </div>

              <p className="mt-6 text-base leading-relaxed">
                « J'avais arrêté de croire au Google Ads après deux tentatives ratées. Le guide m'a fait réaliser que
                je tournais sans tracking GA4 et sans structure SKAG. En 6 semaines, on est passé de 4/10 à 9/10 de
                Quality Score. <strong>Aujourd'hui, je signe 30 PAC/mois en moyenne et le canal m'appartient.</strong> »
              </p>

              <div className="mt-6 pt-5 border-t flex items-center gap-3">
                <img
                  src={avatar1}
                  alt=""
                  className="size-12 rounded-full object-cover ring-2 ring-background shadow-card"
                />
                <div>
                  <div className="font-semibold">Julien Marchand</div>
                  <div className="text-xs text-muted-foreground">
                    Gérant · Énergie Confort Sud · Marseille · RGE QualiPAC
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-base text-muted-foreground reveal">
          Et 311 autres installateurs PAC obtiennent des résultats du même ordre. Voici 3 d'entre eux :
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <div
              key={t.name}
              className="reveal rounded-3xl bg-background p-7 shadow-card hover:shadow-elevated transition flex flex-col"
            >
              <div className="flex items-center justify-between">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="size-4 text-gold fill-current" />
                  ))}
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {t.duration}
                </span>
              </div>
              <p className="mt-5 text-base leading-relaxed text-foreground/90">« {t.quote} »</p>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {t.stats.map((s) => (
                  <div key={s.l} className="rounded-xl bg-cream p-3 text-center">
                    <div className="font-display text-lg font-bold text-gold">{s.v}</div>
                    <div className="text-[10px] text-muted-foreground leading-tight mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt=""
                  className="size-12 rounded-full object-cover ring-2 ring-background shadow-card shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm truncate">{t.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{t.role}</div>
                  <div className="text-xs text-primary font-medium truncate">
                    {t.company} · {t.city}
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-soft text-sky px-2 py-1 text-[10px] font-medium shrink-0">
                  <Check className="size-3" /> Vérifié
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Offer ───────────────── */
function OfferSection() {
  return (
    <section id="offre" className="py-7 lg:py-9 bg-background">
      <div className="max-w-full px-[0.7cm]">
        <div className="reveal rounded-[32px] bg-primary text-primary-foreground p-10 lg:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/90" />
          <div className="absolute -top-20 -right-20 size-80 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-[100px] bg-gold text-foreground px-4 py-1.5 text-xs font-bold uppercase tracking-wide">
              <Flame className="size-3.5" /> Offre de lancement —76% · Durée limitée
            </span>
            <h2 className="mt-6 font-display text-3xl md:text-5xl font-bold">
              Le Guide Ultime PAC
              <br />
              <em className="italic text-gold">+ 5 bonus inclus.</em>
            </h2>

            <div className="mt-8 flex items-center justify-center gap-6">
              <span className="text-2xl text-primary-foreground/50 line-through">197€</span>
              <span className="font-display text-7xl md:text-8xl font-bold text-gold">47€</span>
            </div>
            <p className="mt-2 text-sm text-primary-foreground/80">Paiement unique · Accès à vie · TVA incluse</p>

            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/15 text-primary-foreground px-4 py-1.5 text-sm font-semibold">
              <Flame className="size-4 text-gold" />
              Offre en quantité limitée — réservée aux installateurs PAC
            </p>

            <a
              href="#formulaire"
              className="mt-8 inline-flex items-center gap-2 rounded-[100px] bg-terracotta text-terracotta-foreground px-9 h-16 font-semibold text-lg shadow-elevated hover:-translate-y-0.5 transition"
            >
              Accéder au guide — Premiers leads en 14 jours <ArrowRight className="size-5" />
            </a>
            <p className="mt-5 text-xs text-primary-foreground/70">
              🔒 Paiement sécurisé · ⏱ Accès immédiat · 🛡 Garantie 30 jours satisfait ou remboursé
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Guarantees ───────────────── */
function GuaranteesSection() {
  const items = [
    {
      i: HandCoins,
      t: "Garantie 30 jours",
      d: "Pas convaincu ? Remboursement intégral sans justification dans les 30 jours.",
    },
    {
      i: ShieldCheck,
      t: "Méthode éprouvée",
      d: "Testée sur 47 installateurs PAC. ROAS x4 minimum constaté en 90 jours.",
    },
    {
      i: HeartHandshake,
      t: "Accès à vie & MAJ",
      d: "Toutes les mises à jour 2026, 2027 et au-delà incluses dans votre achat.",
    },
    { i: Award, t: "Support prioritaire", d: "Accès au groupe privé + réponse à vos questions techniques sous 48h." },
  ];
  return (
    <section className="py-7 lg:py-9 bg-cream">
      <div className="max-w-full px-[0.7cm]">
        <div className="text-center reveal">
          <span className="eyebrow">Notre engagement</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">
            Investissement
            <br />
            <em className="italic text-primary">sans aucun risque.</em>
          </h2>
        </div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map(({ i: Icon, t, d }) => (
            <div key={t} className="reveal surface-card p-6">
              <div className="icon-tile icon-tile-terracotta mb-5">
                <Icon className="size-5" />
              </div>
              <h3 className="font-display text-xl font-bold leading-snug">{t}</h3>
              <p className="mt-2 text-base text-muted-foreground leading-relaxed">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── FAQ ───────────────── */
function FaqSection() {
  const items = [
    {
      q: "Combien de temps pour générer mes premiers leads ?",
      a: "Les premiers leads PAC qualifiés arrivent dès la 2ème semaine de campagne, le temps que Google Ads collecte les premières conversions et apprenne à optimiser. Comptez 4 à 6 semaines pour atteindre votre rythme de croisière (30-50 leads/mois selon zone et budget). Le ROAS x4 est généralement consolidé entre 60 et 90 jours, après l'optimisation du Quality Score, l'exclusion des mauvaises requêtes et le réglage des enchères. Mathieu (Lyon) a généré ses 50 premiers leads dès le 1er mois ; Karim (Lille) a mis 11 semaines car son secteur est plus concurrentiel.",
    },
    {
      q: "Quel budget Google Ads minimum dois-je prévoir ?",
      a: "Comptez 1 500€/mois minimum pour valider sérieusement la méthode (ce qui correspond à environ 60 leads/mois à 25€). Pour atteindre 80 leads/mois, prévoyez 2 500-3 000€/mois. Le guide contient un calculateur de budget qui ajuste ces chiffres selon : votre zone géographique (Île-de-France 30% plus cher que la province), votre saisonnalité (sept-mars = pic de demande), et votre offre (PAC air/eau plus chère que air/air). Sous 1 000€/mois, le volume est trop faible pour que Smart Bidding apprenne correctement.",
    },
    {
      q: "Est-ce adapté si je n'y connais rien en Google Ads ?",
      a: "Oui — le guide est conçu pour des installateurs PAC qui n'ont jamais créé de compte Google Ads. Le chapitre 3 démarre étape par étape : création du compte, configuration MCC si vous gérez plusieurs campagnes, paramètres essentiels (UA-bidding, géolocalisation, langues, exclusions IP). Vous recevez aussi 6 templates de campagnes importables directement dans Google Ads Editor en 1 clic — pas besoin de tout coder vous-même. Comptez 4 à 6h pour configurer votre 1ère campagne en suivant le guide. Aucune compétence technique préalable requise.",
    },
    {
      q: "Et si la méthode ne fonctionne pas pour moi ?",
      a: "Vous bénéficiez d'une garantie satisfait ou remboursé de 30 jours sans justification. Envoyez simplement un email à support@guidepac.fr avec votre numéro de commande — remboursement sous 5 jours ouvrés sur le moyen de paiement utilisé. C'est cette garantie qui rassure 92% de nos acheteurs : si la méthode ne colle pas à votre situation, vous ne perdez rien. Note : sur 312 acheteurs, moins de 4% ont demandé un remboursement à ce jour.",
    },
    {
      q: "Le guide est-il à jour avec les dernières évolutions Google Ads ?",
      a: "Oui — édition mise à jour en novembre 2026, intégrant : Performance Max et ses nouveaux signaux d'audience, le Smart Bidding cible CPA et tROAS, les nouvelles policies Google sur les annonces énergétiques (RGE, MaPrimeRénov'), la fin progressive des cookies tiers et le tracking GA4 enhanced conversions. Vous bénéficiez de toutes les futures mises à jour gratuitement (édition 2027 incluse). Les changements majeurs sont notifiés par email aux acheteurs.",
    },
    {
      q: "Y a-t-il un accompagnement inclus ?",
      a: "Oui, à plusieurs niveaux : (1) accès au groupe privé Slack de 350+ installateurs RGE qui partagent leurs setups, retours d'optimisation et campagnes en cours ; (2) support email prioritaire avec réponse sous 48h pour vos questions techniques ; (3) 2 sessions Q&A live par mois avec l'équipe (replay disponible). Un accompagnement individuel 1:1 (audit de compte + 4 sessions de coaching) est proposé en option à 890€ pour ceux qui veulent aller plus vite.",
    },
    {
      q: "La méthode fonctionne-t-elle dans toutes les zones géographiques ?",
      a: "Oui, dans toute la France métropolitaine, Belgique, Suisse, Luxembourg. Le CPL varie selon la concurrence locale : ~22€ en zones rurales (Bretagne, Occitanie, Nouvelle-Aquitaine), ~30€ en zones urbaines tendues (Île-de-France, PACA). Le guide contient une cartographie des 13 régions françaises avec CPL moyen, taux de conversion observés et stratégies d'enchères recommandées par zone. Les DROM-COM nécessitent quelques ajustements (couverts dans un addendum).",
    },
    {
      q: "Quels secteurs sont couverts ?",
      a: "Tout l'écosystème rénovation énergétique : PAC air/eau, PAC air/air, ballon thermodynamique, climatisation réversible, chaudière biomasse, photovoltaïque résidentiel, isolation thermique, MaPrimeRénov' rénovation globale, borne de recharge VE. La méthode SKAG s'adapte à n'importe quel secteur où l'intent client passe par Google. Si votre activité n'est pas listée, contactez-nous : on indique avant achat si la méthode est applicable à votre cas.",
    },
    {
      q: "Combien de campagnes prêtes à l'emploi sont incluses ?",
      a: "Le pack contient 6 templates importables directement dans Google Ads Editor (.csv) : campagne PAC air/eau MaPrimeRénov', campagne PAC air/air installation, campagne RGE QualiPAC chaudière, campagne ballon thermodynamique, campagne climatisation réversible, campagne reciblage Performance Max. Chaque template inclut : structure SKAG complète, 200+ keywords recommandés, 8 variations d'annonces RSA, extensions et audiences pré-configurées. Comptez 30 minutes par campagne pour personnaliser et lancer.",
    },
  ];
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="py-7 lg:py-9 bg-background">
      <div className="max-w-full px-[0.7cm]">
        <div className="text-center reveal">
          <span className="eyebrow">Questions fréquentes</span>
          <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">
            Tout ce que vous
            <br />
            <em className="italic text-primary">souhaitez savoir.</em>
          </h2>
        </div>
        <div className="mt-8 space-y-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div
                key={it.q}
                className={`reveal rounded-2xl bg-background border overflow-hidden transition-all ${isOpen ? "shadow-elevated border-gold/30" : "shadow-card hover:border-foreground/15"}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="font-display font-semibold text-base md:text-lg leading-snug">{it.q}</span>
                  <span
                    className={`size-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? "bg-primary text-primary-foreground rotate-45 shadow-card" : "bg-cream border border-border"}`}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-base text-muted-foreground leading-relaxed border-t pt-5 mt-1">
                    {it.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Final CTA ───────────────── */
function FinalCta() {
  const { city, inCity } = useCity();
  return (
    <section className="py-7 lg:py-9 bg-cream">
      <div className="max-w-full px-[0.7cm] text-center reveal">
        <span className="eyebrow">Prêt à passer à l'action ?</span>
        <h2 className="mt-4 font-display text-3xl md:text-5xl font-bold">
          Arrêtez de louer
          <br />
          <em className="italic text-terracotta">votre carnet de commandes.</em>
        </h2>
        <p className="mt-5 text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
          47€ aujourd'hui pour économiser <strong className="text-foreground">39 600 €/an</strong> et reprendre le
          contrôle de votre acquisition {inCity}. Premiers leads exclusifs sous 14 jours.
        </p>
        <a
          href="#offre"
          className="mt-10 inline-flex items-center gap-2 rounded-[100px] bg-terracotta text-terracotta-foreground px-9 h-16 font-semibold text-lg shadow-elevated hover:-translate-y-0.5 transition"
        >
          {city ? `Générer mes leads à ${city}` : "Générer mes leads exclusifs"} — 47€{" "}
          <ArrowRight className="size-5" />
        </a>
        <div className="mt-6 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Lock className="size-3.5 text-sky" /> Paiement sécurisé
          </span>
          <span className="flex items-center gap-1.5">
            <Download className="size-3.5 text-sky" /> Accès immédiat
          </span>
          <span className="flex items-center gap-1.5">
            <Shield className="size-3.5 text-sky" /> Garantie 30 jours
          </span>
        </div>
      </div>
    </section>
  );
}

/* ───────────────── Mobile Sticky CTA ───────────────── */
function MobileStickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      aria-hidden={!show}
      className={`md:hidden fixed inset-x-0 bottom-0 z-[55] transition-transform duration-400 ${show ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="mx-3 mb-3 rounded-[100px] bg-background/95 backdrop-blur-xl border shadow-elevated p-1.5 flex gap-2 items-center">
        <a
          href="tel:+33123456789"
          aria-label="Appeler"
          className="size-12 rounded-full bg-cream flex items-center justify-center shrink-0"
        >
          <Phone className="size-4 text-sky" />
        </a>
        <a
          href="#offre"
          className="flex-1 h-12 rounded-[100px] bg-terracotta text-terracotta-foreground font-semibold text-sm flex items-center justify-center gap-2"
        >
          Obtenir le guide — 47€ <ArrowRight className="size-4" />
        </a>
      </div>
    </div>
  );
}
