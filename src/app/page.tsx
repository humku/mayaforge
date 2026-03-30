"use client";
import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import MagicCursor from "@/components/MagicCursor";

/* ── Data ───────────────────────────────────────────────── */

const services = [
  { icon: "auto_awesome",    title: "AI Image Design",      desc: "Stunning AI-generated visuals, brand assets and concept art. Includes our full Amazon POD design suite — see below." },
  { icon: "movie",           title: "AI Video Production",  desc: "Full AI video production from script to final render. Cinematic quality at a fraction of traditional cost." },
  { icon: "smart_display",   title: "AI Shorts & Reels",    desc: "Viral-ready AI shorts engineered for YouTube, Instagram and TikTok. Built for maximum reach and retention." },
  { icon: "monetization_on", title: "Content Monetization", desc: "We help you turn your content into revenue — AdSense, sponsorships, licensing and digital product strategy." },
  { icon: "cut",             title: "Video Editing",        desc: "Professional editing with colour grading, motion graphics, sound design and seamless pacing." },
  { icon: "web",             title: "Web Design",           desc: "High-performance, visually striking websites. From landing pages to full digital brand experiences." },
];

const amazonDesigns = [
  { icon: "flag",           title: "Car Flag Design",    desc: "Bold, high-visibility car flag artwork built for maximum print clarity. Custom sizes, any niche.",                                    files: "AI + PNG + PDF"          },
  { icon: "air",            title: "Feather Flag Design",desc: "Tall vertical feather flag artwork with perfect proportions for outdoor display. Bleed and safe zones included.",                    files: "AI + SVG + PDF"          },
  { icon: "wallpaper",      title: "Wall Art",           desc: "Premium decorative wall art for Amazon listings. Abstract, photorealistic, seasonal — every style.",                                 files: "PNG + TIFF + JPEG"       },
  { icon: "crop_landscape", title: "Wall Canvas",        desc: "Gallery-quality canvas designs with proper wrap allowance and print margins. Upload-ready for Amazon POD.",                          files: "PNG + PDF"               },
  { icon: "texture",        title: "Tapestry Design",    desc: "Large-format tapestry artwork with rich textures and vivid colour profiles optimised for woven fabric printing.",                    files: "PNG + TIFF"              },
  { icon: "signpost",       title: "Metal Indoor Signs", desc: "Sharp, professional metal sign designs for indoor display. Clean layouts and perfect sizing for Amazon listings.",                   files: "PNG + PDF + AI"          },
  { icon: "view_module",    title: "Wall Canvas Sets",   desc: "Coordinated multi-panel sets — diptych, triptych and beyond. Cohesive collections that sell as premium bundles.",                   files: "PNG + PDF (all panels)"  },
];

const projects = [
  { title: "AI Brand Campaign",   category: "AI IMAGE DESIGN",  img: "https://images.unsplash.com/photo-1620121478247-ec786b9be2fa?w=900&q=80", alt: "AI visuals",       wide: true  },
  { title: "Cinematic AI Reel",   category: "AI VIDEO",         img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=700&q=80", alt: "Cinematic reel",   wide: false },
  { title: "Viral Shorts Series", category: "AI SHORTS",        img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=700&q=80", alt: "Mobile content",   wide: false },
  { title: "SaaS Landing Page",   category: "WEB DESIGN",       img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&q=80", alt: "Web design",       wide: false },
  { title: "YouTube Channel Build",category:"MONETIZATION",     img: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=700&q=80", alt: "YouTube studio",   wide: false },
  { title: "Documentary Edit",    category: "VIDEO EDITING",    img: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=900&q=80", alt: "Editing timeline", wide: true  },
];

const platforms = [
  { label: "Upwork — Profile 1", href: "https://www.upwork.com/freelancers/~010e451543988bdbe0" },
  { label: "Upwork — Profile 2", href: "https://www.upwork.com/freelancers/~01c3d205c7ddd27658" },
];

const marqueeItems = [
  "AI IMAGE DESIGN","CAR FLAG","FEATHER FLAG","WALL ART","WALL CANVAS","TAPESTRY","METAL SIGNS","CANVAS SETS",
  "AI IMAGE DESIGN","CAR FLAG","FEATHER FLAG","WALL ART","WALL CANVAS","TAPESTRY","METAL SIGNS","CANVAS SETS",
];

type Status = "idle"|"loading"|"success"|"error";

/* ── Page ───────────────────────────────────────────────── */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [status,   setStatus]   = useState<Status>("idle");
  const [form, setForm] = useState({ name:"", email:"", service:"", message:"" });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name:"", email:"", service:"", message:"" });
    } catch { setStatus("error"); }
  };

  /* shared inline styles */
  const goldText   = { color: "rgba(201,168,76,0.55)" };
  const dimText    = { color: "rgba(240,235,224,0.4)" };
  const creamText  = { color: "rgba(240,235,224,0.88)" };
  const goldBorder = { border: "1px solid rgba(201,168,76,0.1)" };

  return (
    <>
      <MagicCursor />

      {/* grain */}
      <div className="fixed inset-0 pointer-events-none z-[9989] opacity-[0.022]"
        style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"}} />

      {/* ══ NAV ══ */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "nav-glass" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
          <button onClick={() => scrollTo("hero")} className="font-display font-bold tracking-[0.15em] text-xl gold-shimmer">
            MAYA FORGE
          </button>
          <div className="hidden md:flex items-center gap-10">
            {["services","amazon","projects","contact","portfolio"].map(s => (
              <button key={s} onClick={() => scrollTo(s)}
                className="font-sans text-[11px] tracking-[0.22em] uppercase transition-colors duration-300 hover:text-[#e8c97a]"
                style={{color:"rgba(240,235,224,0.4)"}}>
                {s === "amazon" ? "AMAZON" : s === "portfolio" ? "PORTFOLIO" : s}
              </button>
            ))}
          </div>
          <button onClick={() => scrollTo("contact")}
            className="hidden md:block gold-btn font-sans text-[11px] tracking-[0.22em] uppercase px-7 py-3">
            HIRE US
          </button>
          <button onClick={() => setMenuOpen(p => !p)} className="md:hidden" style={{color:"#f0ebe0"}}>
            <span style={{fontFamily:"Material Symbols Outlined"}} className="material-symbols-outlined text-2xl">
              {menuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#080808] flex flex-col items-center justify-center gap-12">
          {["services","amazon","projects","contact","portfolio"].map(s => (
            <button key={s} onClick={() => scrollTo(s)}
              className="font-display text-5xl font-light italic hover:text-[#e8c97a] transition-colors capitalize"
              style={{color:"rgba(240,235,224,0.8)"}}>
              {s}
            </button>
          ))}
        </div>
      )}

      {/* ══ HERO ══ */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#080808]">
        <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] rounded-full anim-pulse"
          style={{background:"radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 65%)"}} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full anim-pulse"
          style={{background:"radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%)", animationDelay:"1.8s"}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] anim-spin opacity-[0.04]"
          style={{border:"1px solid #c9a84c", borderRadius:"50%"}} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] anim-spin opacity-[0.06]"
          style={{border:"1px solid #c9a84c", borderRadius:"50%", animationDirection:"reverse", animationDuration:"14s"}} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{backgroundImage:"radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)", backgroundSize:"48px 48px"}} />

        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto pt-20">
          <div className="inline-flex items-center gap-3 mb-10 anim-fade-in d1"
            style={{border:"1px solid rgba(201,168,76,0.2)", padding:"8px 20px"}}>
            <span className="w-1.5 h-1.5 rounded-full bg-[#e8c97a] anim-pulse" />
            <span className="font-mono text-[10px] tracking-[0.45em] uppercase" style={goldText}>
              AI Creative Studio
            </span>
          </div>

          <h1 className="font-display font-light leading-[0.85] mb-8">
            <span className="block anim-fade-up d2" style={{fontSize:"clamp(5rem,14vw,12rem)", color:"rgba(240,235,224,0.92)"}}>MAYA</span>
            <span className="block gold-shimmer anim-fade-up d3" style={{fontSize:"clamp(5rem,14vw,12rem)"}}>FORGE</span>
          </h1>

          <p className="font-sans font-light text-lg md:text-xl max-w-2xl mx-auto mb-14 leading-relaxed anim-fade-up d4" style={dimText}>
            We forge the future of digital content — AI images, videos, shorts, Amazon designs
            and immersive web experiences that captivate and convert.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center anim-fade-up d5">
            <button onClick={() => scrollTo("services")} className="gold-btn font-sans text-[11px] tracking-[0.25em] uppercase px-14 py-5">
              EXPLORE SERVICES
            </button>
            <button onClick={() => scrollTo("projects")} className="ghost-btn font-sans text-[11px] tracking-[0.25em] uppercase px-14 py-5">
              VIEW WORK
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-24 pt-10 anim-fade-up d6" style={{borderTop:"1px solid rgba(201,168,76,0.1)"}}>
            {[["50M+","Views Generated"],["200+","Projects Completed"],["24H","Avg. Turnaround"]].map(([n,l]) => (
              <div key={l}>
                <div className="font-display gold-shimmer mb-1" style={{fontSize:"clamp(1.8rem,4vw,3.5rem)"}}>{n}</div>
                <div className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{color:"rgba(240,235,224,0.25)"}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 anim-fade-in d6">
          <span className="font-mono text-[8px] tracking-[0.5em] uppercase" style={{color:"rgba(240,235,224,0.2)"}}>SCROLL</span>
          <div className="w-px h-14 anim-float" style={{background:"linear-gradient(to bottom, #c9a84c88, transparent)"}} />
        </div>
      </section>

      {/* ══ MARQUEE ══ */}
      <div className="overflow-hidden py-4 border-y" style={{borderColor:"rgba(201,168,76,0.07)", background:"#050505"}}>
        <div className="marquee-track">
          {marqueeItems.map((t, i) => (
            <span key={i} className="font-mono text-[10px] tracking-[0.35em] uppercase mx-10 flex-shrink-0"
              style={{color:"rgba(201,168,76,0.28)"}}>
              {t} <span style={{color:"rgba(201,168,76,0.12)", margin:"0 16px"}}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══ SERVICES ══ */}
      <section id="services" className="py-32 px-6 md:px-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 reveal">
            <p className="font-mono text-[10px] tracking-[0.45em] uppercase mb-6" style={goldText}>WHAT WE DO</p>
            <h2 className="font-display font-light leading-none" style={{fontSize:"clamp(2.8rem,6vw,6rem)"}}>
              <span style={creamText}>Our </span>
              <span className="gold-shimmer italic">Services</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => (
              <div key={s.title} className="gold-card p-8 reveal" style={{transitionDelay:`${i*0.08}s`}}>
                <div className="w-12 h-12 flex items-center justify-center mb-6" style={goldBorder}>
                  <span className="material-symbols-outlined text-xl"
                    style={{fontFamily:"Material Symbols Outlined", fontVariationSettings:"'FILL' 1", color:"rgba(201,168,76,0.65)"}}>
                    {s.icon}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3" style={creamText}>{s.title}</h3>
                <p className="font-sans font-light text-sm leading-relaxed mb-6" style={dimText}>{s.desc}</p>
                <div className="w-8 h-px" style={{background:"rgba(201,168,76,0.3)"}} />
              </div>
            ))}
          </div>

          {/* Platform links */}
          <div className="mt-16 pt-16 reveal" style={{borderTop:"1px solid rgba(201,168,76,0.08)"}}>
            <p className="font-mono text-[10px] tracking-[0.4em] uppercase mb-8" style={goldText}>HIRE US ON UPWORK</p>
            <div className="flex flex-col sm:flex-row gap-4">
              {platforms.map(p => (
                <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer"
                  className="group flex items-center gap-4 px-8 py-5 transition-all duration-300 hover:border-[rgba(201,168,76,0.4)]"
                  style={{border:"1px solid rgba(201,168,76,0.12)", background:"#0c0c0c"}}>
                  <div className="w-8 h-8 rounded flex items-center justify-center font-bold text-sm text-white flex-shrink-0"
                    style={{background:"#14a800"}}>U</div>
                  <span className="font-sans text-sm" style={{color:"rgba(240,235,224,0.6)"}}>{p.label}</span>
                  <span className="material-symbols-outlined text-base ml-auto transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{fontFamily:"Material Symbols Outlined", color:"rgba(201,168,76,0.4)"}}>arrow_outward</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12"><div className="gold-line" /></div>

      {/* ══ AMAZON DESIGNS ══ */}
      <section id="amazon" className="py-32 px-6 md:px-12 bg-[#060606]">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="mb-6 reveal">
            <p className="font-mono text-[10px] tracking-[0.45em] uppercase mb-6" style={goldText}>
              AI IMAGE DESIGN — SPECIALISATION
            </p>
            <h2 className="font-display font-light leading-none mb-6" style={{fontSize:"clamp(2.8rem,6vw,6rem)"}}>
              <span style={creamText}>Amazon </span>
              <span className="gold-shimmer italic">POD Designs</span>
            </h2>
            <p className="font-sans font-light text-lg leading-relaxed max-w-2xl" style={dimText}>
              Print-ready designs for Amazon sellers — every product type, every niche.
              300 DPI, bleed-ready, upload-ready files delivered in 24–48 hours.
            </p>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-0 mb-16 reveal" style={{border:"1px solid rgba(201,168,76,0.1)"}}>
            {[["500+","Designs Delivered"],["24–48H","Turnaround"],["∞","Revisions"]].map(([n,l], i) => (
              <div key={l} className="px-8 py-6 flex flex-col gap-1"
                style={{borderRight: i < 2 ? "1px solid rgba(201,168,76,0.1)" : "none"}}>
                <span className="font-display gold-shimmer" style={{fontSize:"clamp(1.5rem,3vw,2.5rem)"}}>{n}</span>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase" style={{color:"rgba(240,235,224,0.25)"}}>{l}</span>
              </div>
            ))}
          </div>

          {/* Design type grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 mb-12">
            {amazonDesigns.map((d, i) => (
              <div key={d.title} className={`gold-card p-6 flex flex-col gap-4 reveal ${i === 6 ? "lg:col-span-1" : ""}`}
                style={{transitionDelay:`${i*0.06}s`}}>
                {/* Icon + title row */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0"
                    style={{border:"1px solid rgba(201,168,76,0.15)"}}>
                    <span className="material-symbols-outlined text-base"
                      style={{fontFamily:"Material Symbols Outlined", fontVariationSettings:"'FILL' 1", color:"rgba(201,168,76,0.6)"}}>
                      {d.icon}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold leading-tight" style={creamText}>{d.title}</h3>
                </div>

                <p className="font-sans font-light text-xs leading-relaxed flex-1" style={dimText}>{d.desc}</p>

                {/* File formats badge */}
                <div className="flex items-center justify-between pt-3" style={{borderTop:"1px solid rgba(201,168,76,0.07)"}}>
                  <span className="font-mono text-[8px] tracking-widest uppercase" style={{color:"rgba(201,168,76,0.3)"}}>
                    FILES
                  </span>
                  <span className="font-mono text-[9px] tracking-widest" style={{color:"rgba(201,168,76,0.55)"}}>
                    {d.files}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="reveal flex flex-col sm:flex-row items-center gap-6 p-8"
            style={{border:"1px solid rgba(201,168,76,0.12)", background:"#0a0a0a"}}>
            <div className="flex-1">
              <h3 className="font-display text-2xl md:text-3xl mb-2" style={creamText}>
                Ready to order your Amazon designs?
              </h3>
              <p className="font-sans text-sm" style={dimText}>
                Print-ready files. Unlimited revisions. 24–48H delivery. 100% satisfaction guaranteed.
              </p>
            </div>
            <a href="https://www.upwork.com/freelancers/~010e451543988bdbe0"
              target="_blank" rel="noopener noreferrer"
              className="gold-btn font-sans text-[11px] tracking-[0.25em] uppercase px-10 py-4 flex-shrink-0 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#14a800]" />
              ORDER ON UPWORK
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12"><div className="gold-line" /></div>

      {/* ══ PROJECTS ══ */}
      <section id="projects" className="py-32 px-6 md:px-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 flex justify-between items-end flex-wrap gap-6 reveal">
            <div>
              <p className="font-mono text-[10px] tracking-[0.45em] uppercase mb-6" style={goldText}>SELECTED WORK</p>
              <h2 className="font-display font-light leading-none" style={{fontSize:"clamp(2.8rem,6vw,6rem)"}}>
                <span style={creamText}>Our </span>
                <span className="gold-shimmer italic">Projects</span>
              </h2>
            </div>
            <p className="font-mono text-[10px] tracking-widest uppercase" style={{color:"rgba(240,235,224,0.18)"}}>
              HOVER TO REVEAL
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {projects.map((p, i) => (
              <div key={p.title}
                className={`proj-card reveal ${p.wide ? "md:col-span-2" : ""} ${p.wide ? "aspect-[16/7]" : "aspect-[4/3]"}`}
                style={{transitionDelay:`${i*0.07}s`}}>
                <Image src={p.img} alt={p.alt} fill className="object-cover"
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw" />
                <div className="proj-overlay" />
                <div className="proj-content">
                  <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-2"
                    style={{color:"rgba(201,168,76,0.65)"}}>{p.category}</p>
                  <h3 className="font-display text-2xl md:text-3xl" style={creamText}>{p.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-12"><div className="gold-line" /></div>

      {/* ══ CONTACT ══ */}
      <section id="contact" className="py-32 px-6 md:px-12 bg-[#080808]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div className="reveal">
            <p className="font-mono text-[10px] tracking-[0.45em] uppercase mb-6" style={goldText}>GET IN TOUCH</p>
            <h2 className="font-display font-light leading-[0.9] mb-8" style={{fontSize:"clamp(2.8rem,5vw,5rem)"}}>
              <span style={creamText}>Let&apos;s build</span><br />
              <span className="gold-shimmer italic">something great.</span>
            </h2>
            <p className="font-sans font-light text-lg leading-relaxed mb-14" style={dimText}>
              Ready to elevate your content with AI? Drop us a message and we&apos;ll get back to you within 24 hours.
            </p>
            {[
              { label:"EMAIL",    val:"hello@mayaiservices.com" },
              { label:"PLATFORM", val:"Available on Upwork"     },
              { label:"RESPONSE", val:"Within 24 hours"         },
            ].map(item => (
              <div key={item.label} className="flex gap-6 items-center py-5"
                style={{borderBottom:"1px solid rgba(201,168,76,0.08)"}}>
                <span className="font-mono text-[9px] tracking-[0.3em] uppercase w-24 flex-shrink-0"
                  style={goldText}>{item.label}</span>
                <span className="font-sans text-sm" style={{color:"rgba(240,235,224,0.55)"}}>{item.val}</span>
              </div>
            ))}
          </div>

          <div className="reveal" style={{transitionDelay:"0.15s"}}>
            {status === "success" ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20"
                style={{border:"1px solid rgba(201,168,76,0.2)"}}>
                <div className="w-14 h-14 flex items-center justify-center mb-6"
                  style={{border:"1px solid rgba(201,168,76,0.4)"}}>
                  <span className="material-symbols-outlined text-2xl"
                    style={{fontFamily:"Material Symbols Outlined", color:"#e8c97a"}}>check</span>
                </div>
                <h3 className="font-display text-3xl mb-3" style={creamText}>Message Received</h3>
                <p className="font-sans text-sm" style={dimText}>We&apos;ll be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-0"
                style={{borderTop:"1px solid rgba(201,168,76,0.1)"}}>
                {[
                  { key:"name",    label:"YOUR NAME",      type:"text",  ph:"Jane Smith",            req:true  },
                  { key:"email",   label:"EMAIL ADDRESS",  type:"email", ph:"jane@company.com",       req:true  },
                  { key:"service", label:"SERVICE NEEDED", type:"text",  ph:"AI Video, Amazon POD…",  req:false },
                ].map(f => (
                  <div key={f.key} className="py-6" style={{borderBottom:"1px solid rgba(201,168,76,0.07)"}}>
                    <label className="font-mono text-[9px] tracking-[0.35em] uppercase block mb-3" style={goldText}>
                      {f.label}
                    </label>
                    <input type={f.type} required={f.req} placeholder={f.ph}
                      value={(form as Record<string,string>)[f.key]}
                      onChange={e => setForm(p => ({...p, [f.key]:e.target.value}))}
                      className="w-full bg-transparent outline-none font-sans text-sm placeholder:opacity-20"
                      style={{color:"rgba(240,235,224,0.8)"}} />
                  </div>
                ))}
                <div className="py-6" style={{borderBottom:"1px solid rgba(201,168,76,0.07)"}}>
                  <label className="font-mono text-[9px] tracking-[0.35em] uppercase block mb-3" style={goldText}>
                    YOUR MESSAGE
                  </label>
                  <textarea required rows={4} placeholder="Tell us about your project…"
                    value={form.message}
                    onChange={e => setForm(p => ({...p, message:e.target.value}))}
                    className="w-full bg-transparent outline-none font-sans text-sm resize-none placeholder:opacity-20"
                    style={{color:"rgba(240,235,224,0.8)"}} />
                </div>
                {status === "error" && (
                  <p className="font-mono text-[10px] tracking-widest pt-4" style={{color:"rgba(255,80,80,0.7)"}}>
                    FAILED. PLEASE TRY AGAIN.
                  </p>
                )}
                <button type="submit" disabled={status==="loading"}
                  className="gold-btn font-sans text-[11px] tracking-[0.25em] uppercase py-5 mt-8 disabled:opacity-50 flex items-center justify-center gap-3">
                  {status === "loading" ? "SENDING…" : "SEND MESSAGE"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{background:"#050505", borderTop:"1px solid rgba(201,168,76,0.07)"}}>
        <div className="overflow-hidden py-4" style={{borderBottom:"1px solid rgba(201,168,76,0.04)"}}>
          <div className="marquee-track">
            {marqueeItems.map((t, i) => (
              <span key={i} className="font-mono text-[9px] tracking-[0.3em] uppercase mx-10 flex-shrink-0"
                style={{color:"rgba(201,168,76,0.18)"}}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <div className="font-display text-3xl gold-shimmer mb-3">MAYA FORGE</div>
            <p className="font-sans text-sm max-w-xs leading-relaxed" style={{color:"rgba(240,235,224,0.28)"}}>
              AI Creative Studio — forging the future of digital content.
            </p>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-5" style={{color:"rgba(201,168,76,0.35)"}}>
              HIRE US
            </p>
            {platforms.map(p => (
              <a key={p.href} href={p.href} target="_blank" rel="noopener noreferrer"
                className="font-sans text-sm flex items-center gap-2 mb-3 hover:text-[#e8c97a] transition-colors"
                style={{color:"rgba(240,235,224,0.35)"}}>
                <span className="w-1.5 h-1.5 rounded-full" style={{background:"#14a800"}} />
                {p.label}
              </a>
            ))}
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-5" style={{color:"rgba(201,168,76,0.35)"}}>
              NAVIGATE
            </p>
            {["services","amazon","projects","contact","portfolio"].map(s => (
              <button key={s} onClick={() => scrollTo(s)}
                className="font-sans text-sm capitalize text-left block mb-3 hover:text-[#e8c97a] transition-colors"
                style={{color:"rgba(240,235,224,0.35)"}}>
                {s === "amazon" ? "Amazon POD" : s}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center"
          style={{borderTop:"1px solid rgba(201,168,76,0.05)"}}>
          <p className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{color:"rgba(240,235,224,0.15)"}}>
            ©{new Date().getFullYear()} MAYA FORGE. ALL RIGHTS RESERVED.
          </p>
          <p className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{color:"rgba(240,235,224,0.15)"}}>
            MAYAISERVICES.COM
          </p>
        </div>
      </footer>
    </>
  );
}
