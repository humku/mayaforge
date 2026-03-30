"use client";
import { useState, useEffect } from "react";
import MagicCursor from "@/components/MagicCursor";

const services = [
  {
    icon: "flag",
    title: "Car Flag Design",
    desc: "Eye-catching custom car flag designs built for maximum visibility and print clarity. Bold graphics that stand out on the road.",
    tags: ["300 DPI", "PRINT READY", "CUSTOM SIZE"],
    deliverable: "AI + PNG + PDF",
  },
  {
    icon: "air",
    title: "Feather Flag Design",
    desc: "Tall, striking feather flag artwork optimised for outdoor display. Perfect proportions for vertical banners that demand attention.",
    tags: ["VECTOR", "BLEED INCLUDED", "MULTIPLE SIZES"],
    deliverable: "AI + SVG + PDF",
  },
  {
    icon: "wallpaper",
    title: "Wall Art",
    desc: "Premium decorative wall art designs crafted for Amazon listings. From abstract to photorealistic — every style, every theme.",
    tags: ["HIGH RES", "MULTIPLE RATIOS", "FRAMED READY"],
    deliverable: "PNG + TIFF + JPEG",
  },
  {
    icon: "crop_landscape",
    title: "Wall Canvas",
    desc: "Gallery-quality canvas designs with proper wrap allowance and print margins. Ready to upload directly to your Amazon POD store.",
    tags: ["WRAP INCLUDED", "GALLERY QUALITY", "AMAZON READY"],
    deliverable: "PNG + PDF",
  },
  {
    icon: "texture",
    title: "Tapestry Design",
    desc: "Large-format tapestry artwork with rich textures and vivid colour profiles optimised for woven fabric printing.",
    tags: ["FABRIC OPTIMISED", "LARGE FORMAT", "RICH COLOURS"],
    deliverable: "PNG + TIFF",
  },
  {
    icon: "signpost",
    title: "Metal Indoor Signs",
    desc: "Sharp, professional metal sign designs for indoor display. Clean layouts, durable aesthetics and perfect sizing for Amazon listings.",
    tags: ["METAL OPTIMISED", "INDOOR", "PROFESSIONAL"],
    deliverable: "PNG + PDF + AI",
  },
  {
    icon: "view_module",
    title: "Wall Canvas Sets",
    desc: "Coordinated multi-panel canvas set designs — diptych, triptych and beyond. Cohesive collections that sell as premium bundles.",
    tags: ["MULTI-PANEL", "SET MATCHED", "BUNDLE READY"],
    deliverable: "PNG + PDF (all panels)",
  },
];

const process = [
  { n: "01", title: "PLACE ORDER", desc: "Hire on Upwork and share your niche, theme, colours and any references you have." },
  { n: "02", title: "DESIGN PHASE", desc: "We get to work. First draft delivered within 24–48 hours depending on complexity." },
  { n: "03", title: "REVISIONS", desc: "Unlimited revisions until you are 100% happy. Your satisfaction is guaranteed." },
  { n: "04", title: "FINAL FILES", desc: "Receive print-ready files in all required formats, optimised for Amazon POD upload." },
];

const faqs = [
  { q: "What files will I receive?", a: "You will receive print-ready files in all formats required for your product type — typically PNG at 300 DPI, PDF with bleed, and AI/SVG source files where applicable." },
  { q: "Are the designs Amazon POD ready?", a: "Yes. Every design is sized, formatted and colour-profiled specifically for Amazon Merch, KDP, or your chosen POD platform." },
  { q: "How long does delivery take?", a: "Standard delivery is 24–48 hours. Rush delivery available on request." },
  { q: "Do you offer revisions?", a: "Absolutely. We offer unlimited revisions until you are completely satisfied with the design." },
  { q: "Can I request custom sizes?", a: "Yes. We design to any size specification you need for your Amazon product listing." },
  { q: "Do you do bulk orders?", a: "Yes — we offer discounted rates for bulk design orders. Message us on Upwork to discuss." },
];

export default function AmazonPage() {
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq]   = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <MagicCursor />

      {/* ── NAV ── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "nav-blur" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
          <a href="/" className="font-display text-2xl font-bold tracking-widest gold-shimmer">
            MAYA FORGE
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="font-sans text-xs tracking-[0.2em] uppercase text-cream/50 hover:text-gold transition-colors">
              HOME
            </a>
            <button onClick={() => scrollTo("services")}
              className="font-sans text-xs tracking-[0.2em] uppercase text-cream/50 hover:text-gold transition-colors">
              SERVICES
            </button>
            <button onClick={() => scrollTo("process")}
              className="font-sans text-xs tracking-[0.2em] uppercase text-cream/50 hover:text-gold transition-colors">
              PROCESS
            </button>
            <button onClick={() => scrollTo("faq")}
              className="font-sans text-xs tracking-[0.2em] uppercase text-cream/50 hover:text-gold transition-colors">
              FAQ
            </button>
          </div>
          <a
            href="https://www.upwork.com/freelancers/~010e451543988bdbe0"
            target="_blank" rel="noopener noreferrer"
            className="font-sans text-xs tracking-[0.2em] uppercase px-6 py-3 bg-gold text-royal-navy font-bold hover:bg-gold-light transition-all duration-300 gold-glow"
          >
            HIRE ON UPWORK
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-royal-navy px-6">
        {/* Background orbs */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full bg-purple/8 blur-[140px] animate-pulse_glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gold/6 blur-[120px] animate-pulse_glow" style={{animationDelay:"2s"}} />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{backgroundImage: "linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)", backgroundSize: "60px 60px"}} />

        <div className="relative z-10 text-center max-w-5xl mx-auto pt-24">
          {/* Amazon badge */}
          <div className="inline-flex items-center gap-3 border border-gold/20 px-5 py-2 mb-10 animate-fade-in delay-100">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.4em] text-gold/70 uppercase">
              Amazon POD Design Specialist
            </span>
          </div>

          <h1 className="font-display font-light leading-[0.88] mb-8">
            <span className="block text-[clamp(3.5rem,10vw,9rem)] text-cream/90 animate-fade-up delay-200">
              Amazon
            </span>
            <span className="block text-[clamp(3.5rem,10vw,9rem)] gold-shimmer animate-fade-up delay-300">
              Design
            </span>
            <span className="block text-[clamp(3.5rem,10vw,9rem)] text-cream/90 italic animate-fade-up delay-400">
              Services
            </span>
          </h1>

          <p className="font-sans font-light text-cream/50 text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed animate-fade-up delay-500">
            Print-ready designs for Amazon POD sellers — car flags, feather flags,
            wall art, canvas, tapestry, metal signs and canvas sets.
            Delivered fast. Unlimited revisions.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up delay-600">
            <a
              href="https://www.upwork.com/freelancers/~010e451543988bdbe0"
              target="_blank" rel="noopener noreferrer"
              className="font-sans text-sm tracking-[0.2em] uppercase px-12 py-5 bg-gold text-royal-navy font-bold hover:bg-gold-light transition-all duration-300 gold-glow flex items-center justify-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-royal-navy" />
              HIRE ON UPWORK
            </a>
            <button onClick={() => scrollTo("services")}
              className="font-sans text-sm tracking-[0.2em] uppercase px-12 py-5 border border-cream/15 text-cream/60 hover:border-gold/40 hover:text-gold transition-all duration-300">
              VIEW SERVICES
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-24 pt-12 border-t border-gold/10 animate-fade-up delay-700">
            {[
              { n: "500+", l: "Designs Delivered" },
              { n: "100%", l: "Satisfaction Rate" },
              { n: "24H",  l: "Avg. Turnaround" },
            ].map(s => (
              <div key={s.l}>
                <div className="font-display text-3xl md:text-5xl gold-shimmer mb-2">{s.n}</div>
                <div className="font-mono text-[10px] tracking-widest text-cream/30 uppercase">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-y border-gold/10 py-4 overflow-hidden bg-royal-deep">
        <div className="marquee-inner">
          {[
            "CAR FLAG DESIGN","FEATHER FLAG","WALL ART","WALL CANVAS",
            "TAPESTRY","METAL SIGNS","CANVAS SETS","AMAZON POD",
            "CAR FLAG DESIGN","FEATHER FLAG","WALL ART","WALL CANVAS",
            "TAPESTRY","METAL SIGNS","CANVAS SETS","AMAZON POD",
          ].map((t, i) => (
            <span key={i} className="font-mono text-[10px] tracking-[0.35em] text-gold/30 uppercase mx-10 flex-shrink-0">
              {t} <span className="text-gold/15 mx-4">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <section id="services" className="py-32 px-6 md:px-12 bg-royal-navy">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="font-mono text-gold/60 text-xs tracking-[0.4em] uppercase mb-6">WHAT I DESIGN</p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-none">
              <span className="text-cream">7 Specialised</span>
              <br />
              <span className="gold-shimmer italic">Design Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <div key={s.title}
                className={`service-card p-8 flex flex-col gap-5 ${i === 6 ? "md:col-span-2 lg:col-span-1" : ""}`}>
                {/* Icon */}
                <div className="w-14 h-14 border border-gold/20 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-gold/70 text-2xl"
                    style={{fontFamily:"Material Symbols Outlined", fontVariationSettings:"'FILL' 1"}}>
                    {s.icon}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="font-display text-2xl font-semibold text-cream mb-3">{s.title}</h3>
                  <p className="font-sans font-light text-cream/50 text-sm leading-relaxed mb-5">{s.desc}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {s.tags.map(t => (
                      <span key={t} className="font-mono text-[9px] tracking-[0.2em] uppercase px-3 py-1 border border-gold/15 text-gold/50">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverable */}
                <div className="border-t border-gold/10 pt-4 flex items-center justify-between">
                  <span className="font-mono text-[9px] tracking-widest text-cream/25 uppercase">Files</span>
                  <span className="font-mono text-[10px] tracking-widest text-gold/60">{s.deliverable}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA after services */}
          <div className="mt-16 text-center">
            <a
              href="https://www.upwork.com/freelancers/~010e451543988bdbe0"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-4 font-sans text-sm tracking-[0.2em] uppercase px-14 py-5 bg-gold text-royal-navy font-bold hover:bg-gold-light transition-all duration-300 gold-glow"
            >
              ORDER ANY SERVICE ON UPWORK
              <span className="material-symbols-outlined text-lg" style={{fontFamily:"Material Symbols Outlined"}}>arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" className="py-32 px-6 md:px-12 bg-royal-deep">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="font-mono text-gold/60 text-xs tracking-[0.4em] uppercase mb-6">HOW IT WORKS</p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-none">
              <span className="text-cream">Simple</span>
              <br />
              <span className="gold-shimmer italic">4-Step Process</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {process.map((p, i) => (
              <div key={p.n} className={`p-10 border-t-2 border-gold/20 relative ${i < 3 ? "md:border-r md:border-r-gold/10" : ""}`}>
                {/* Connector line */}
                {i < 3 && (
                  <div className="hidden lg:block absolute top-[-2px] right-0 w-full h-[2px] bg-gradient-to-r from-gold/20 to-transparent" />
                )}
                <div className="font-display text-6xl gold-shimmer mb-6 leading-none">{p.n}</div>
                <h3 className="font-mono text-sm tracking-[0.2em] text-cream mb-4">{p.title}</h3>
                <p className="font-sans font-light text-cream/50 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPWORK CTA BANNER ── */}
      <section className="py-24 px-6 md:px-12 bg-royal-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{backgroundImage: "radial-gradient(circle at 2px 2px, #c9a84c 1px, transparent 0)", backgroundSize: "32px 32px"}} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="font-mono text-gold/60 text-xs tracking-[0.5em] uppercase mb-6">READY TO ORDER?</p>
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-light leading-none mb-8">
            <span className="text-cream">Get your design</span>
            <br />
            <span className="gold-shimmer italic">in 24 hours.</span>
          </h2>
          <p className="font-sans font-light text-cream/50 text-lg max-w-xl mx-auto mb-12">
            100% satisfaction guaranteed. Unlimited revisions. Print-ready files delivered fast.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://www.upwork.com/freelancers/~010e451543988bdbe0"
              target="_blank" rel="noopener noreferrer"
              className="group font-sans text-sm tracking-[0.2em] uppercase px-14 py-5 bg-gold text-royal-navy font-bold hover:bg-gold-light transition-all duration-300 gold-glow flex items-center gap-3"
            >
              <span className="w-2 h-2 rounded-full bg-[#14a800]" />
              HIRE ME ON UPWORK
            </a>
          </div>

          {/* Trust signals */}
          <div className="flex flex-wrap justify-center gap-10 mt-14">
            {[
              "✦  Print-Ready Files",
              "✦  Unlimited Revisions",
              "✦  24–48H Delivery",
              "✦  100% Satisfaction",
              "✦  500+ Designs Done",
            ].map(t => (
              <span key={t} className="font-mono text-[10px] tracking-[0.25em] text-gold/40 uppercase">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-32 px-6 md:px-12 bg-royal-deep">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20">
            <p className="font-mono text-gold/60 text-xs tracking-[0.4em] uppercase mb-6">QUESTIONS</p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-light leading-none">
              <span className="text-cream">Frequently</span>
              <br />
              <span className="gold-shimmer italic">Asked</span>
            </h2>
          </div>

          <div className="flex flex-col border-t border-gold/10">
            {faqs.map((f, i) => (
              <div key={i} className="border-b border-gold/10">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex justify-between items-center py-7 text-left gap-6 group"
                >
                  <span className="font-display text-xl md:text-2xl text-cream group-hover:text-gold transition-colors">
                    {f.q}
                  </span>
                  <span className="material-symbols-outlined text-gold/50 flex-shrink-0 transition-transform duration-300"
                    style={{
                      fontFamily:"Material Symbols Outlined",
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)"
                    }}>
                    add
                  </span>
                </button>
                {openFaq === i && (
                  <div className="pb-7">
                    <p className="font-sans font-light text-cream/55 text-base leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-gold/10 bg-royal-navy">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 flex flex-col md:flex-row justify-between items-start gap-10">
          <div>
            <a href="/" className="font-display text-2xl gold-shimmer block mb-3">MAYA FORGE</a>
            <p className="font-sans text-cream/35 text-sm">Amazon POD Design Specialist</p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] tracking-widest text-gold/40 uppercase mb-2">HIRE ME</p>
            <a
              href="https://www.upwork.com/freelancers/~010e451543988bdbe0"
              target="_blank" rel="noopener noreferrer"
              className="font-sans text-sm text-cream/50 hover:text-gold transition-colors flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#14a800]" />
              Upwork Profile
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[10px] tracking-widest text-gold/40 uppercase mb-2">SERVICES</p>
            {["Car Flag Design","Feather Flag","Wall Art","Wall Canvas","Tapestry","Metal Signs","Canvas Sets"].map(s => (
              <span key={s} className="font-sans text-sm text-cream/35">{s}</span>
            ))}
          </div>
        </div>
        <div className="border-t border-gold/5 px-6 md:px-12 py-5 max-w-7xl mx-auto flex justify-between">
          <p className="font-mono text-[10px] text-cream/20 tracking-widest uppercase">
            ©{new Date().getFullYear()} MAYA FORGE. ALL RIGHTS RESERVED.
          </p>
          <a href="/" className="font-mono text-[10px] text-cream/20 hover:text-gold/40 tracking-widest uppercase transition-colors">
            BACK TO HOME
          </a>
        </div>
      </footer>
    </>
  );
}
