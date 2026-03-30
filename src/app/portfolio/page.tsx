'use client';

import { useState, useEffect } from 'react';
import MagicCursor from '@/components/MagicCursor';

/* ── Data ───────────────────────────────────────────────── */

const images = [
  { id: 1, category: 'AI ART',     title: 'Cosmic brand campaign',  src: '', wide: true  },
  { id: 2, category: 'AMAZON POD', title: 'Feather flag design',    src: '', wide: false },
  { id: 3, category: 'WALL ART',   title: 'Abstract series vol.1',  src: '', wide: false },
  { id: 4, category: 'BRAND',      title: 'Identity concept',       src: '', wide: false },
  { id: 5, category: 'AMAZON POD', title: 'Canvas set — triptych',  src: '', wide: false },
  { id: 6, category: 'AI ART',     title: 'Surreal landscape',      src: '', wide: true  },
];

const videos = [
  { id: 1, category: 'AI VIDEO', title: 'Cinematic product reel',  src: '', wide: true  },
  { id: 2, category: 'SHORTS',   title: 'Viral AI short #1',       src: '', wide: false },
  { id: 3, category: 'REELS',    title: 'Brand reel — fashion',    src: '', wide: false },
  { id: 4, category: 'AI VIDEO', title: 'Ambient loop — nature',   src: '', wide: false },
  { id: 5, category: 'SHORTS',   title: 'Viral AI short #2',       src: '', wide: false },
];

const imageCategories = ['ALL', 'AI ART', 'AMAZON POD', 'BRAND', 'WALL ART'];
const videoCategories = ['ALL', 'AI VIDEO', 'SHORTS', 'REELS'];

/* ── Page ───────────────────────────────────────────────── */

export default function PortfolioPage() {
  const [activeTab, setActiveTab]       = useState<'images' | 'videos'>('images');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [scrolled, setScrolled]         = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [activeTab, activeFilter]);

  const handleTabSwitch = (tab: 'images' | 'videos') => {
    setActiveTab(tab);
    setActiveFilter('ALL');
  };

  const filteredImages = activeFilter === 'ALL' ? images : images.filter(i => i.category === activeFilter);
  const filteredVideos = activeFilter === 'ALL' ? videos : videos.filter(v => v.category === activeFilter);

  /* shared styles matching main site */
  const goldText   = { color: 'rgba(201,168,76,0.55)' };
  const dimText    = { color: 'rgba(240,235,224,0.4)' };
  const creamText  = { color: 'rgba(240,235,224,0.88)' };

  return (
    <>
      <MagicCursor />

      {/* grain overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9989] opacity-[0.022]"
        style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"}} />

      {/* ── NAV ── */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'nav-glass' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
          <a href="/" className="font-display font-bold tracking-[0.15em] text-xl gold-shimmer">
            MAYA FORGE
          </a>
          <div className="hidden md:flex items-center gap-10">
            {['services','amazon','projects','contact'].map(s => (
              <a key={s} href={`/#${s}`}
                className="font-sans text-[11px] tracking-[0.22em] uppercase transition-colors duration-300 hover:text-[#e8c97a]"
                style={{color:'rgba(240,235,224,0.4)'}}>
                {s === 'amazon' ? 'AMAZON' : s.toUpperCase()}
              </a>
            ))}
          </div>
          <a href="/#contact"
            className="hidden md:block gold-btn font-sans text-[11px] tracking-[0.22em] uppercase px-7 py-3">
            HIRE US
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="min-h-[40vh] flex items-end justify-start relative overflow-hidden bg-[#080808] px-6 md:px-12 pb-16 pt-36">
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{background:'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)'}} />
        <div className="absolute inset-0 opacity-[0.02]"
          style={{backgroundImage:'radial-gradient(circle at 1px 1px, #c9a84c 1px, transparent 0)', backgroundSize:'48px 48px'}} />
        <div className="relative z-10 max-w-7xl w-full mx-auto">
          <p className="font-mono text-[10px] tracking-[0.45em] uppercase mb-6 anim-fade-in d1" style={goldText}>
            SELECTED WORK
          </p>
          <h1 className="font-display font-light leading-none anim-fade-up d2" style={{fontSize:'clamp(3.5rem,9vw,8rem)'}}>
            <span style={creamText}>Our </span>
            <span className="gold-shimmer italic">Portfolio</span>
          </h1>
          <p className="font-sans font-light text-lg mt-6 max-w-xl leading-relaxed anim-fade-up d3" style={dimText}>
            AI-generated images, cinematic videos and creative work — browse by category below.
          </p>
        </div>
      </section>

      {/* ── TABS + FILTERS ── */}
      <section className="bg-[#080808] px-6 md:px-12 pt-10 pb-4 sticky top-[72px] z-40"
        style={{borderBottom:'1px solid rgba(201,168,76,0.07)'}}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6">

          {/* Tabs */}
          <div className="flex gap-1 p-1" style={{border:'1px solid rgba(201,168,76,0.12)', background:'#0a0a0a'}}>
            {(['images','videos'] as const).map(tab => (
              <button key={tab} onClick={() => handleTabSwitch(tab)}
                className="font-mono text-[10px] tracking-[0.3em] uppercase px-8 py-3 transition-all duration-300"
                style={activeTab === tab
                  ? {background:'rgba(201,168,76,0.12)', color:'rgba(201,168,76,0.9)'}
                  : {color:'rgba(240,235,224,0.25)'}}>
                {tab}
              </button>
            ))}
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2">
            {(activeTab === 'images' ? imageCategories : videoCategories).map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)}
                className="font-mono text-[9px] tracking-[0.3em] uppercase px-4 py-2 transition-all duration-300"
                style={activeFilter === cat
                  ? {border:'1px solid rgba(201,168,76,0.5)', color:'rgba(201,168,76,0.85)', background:'rgba(201,168,76,0.06)'}
                  : {border:'1px solid rgba(201,168,76,0.1)', color:'rgba(240,235,224,0.25)'}}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── GRID ── */}
      <section className="bg-[#080808] px-6 md:px-12 py-16 min-h-screen">
        <div className="max-w-7xl mx-auto">

          {/* Images */}
          {activeTab === 'images' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredImages.map((item, i) => (
                <div key={item.id}
                  className={`proj-card reveal ${item.wide ? 'md:col-span-2' : ''} ${item.wide ? 'aspect-[16/7]' : 'aspect-[4/3]'}`}
                  style={{transitionDelay:`${i*0.07}s`}}>
                  {item.src ? (
                    <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3"
                      style={{background:'#111'}}>
                      <div className="w-10 h-10 flex items-center justify-center"
                        style={{border:'1px solid rgba(201,168,76,0.15)'}}>
                        <span className="material-symbols-outlined text-lg"
                          style={{fontFamily:'Material Symbols Outlined', color:'rgba(201,168,76,0.3)'}}>image</span>
                      </div>
                      <span className="font-mono text-[8px] tracking-widest uppercase"
                        style={{color:'rgba(201,168,76,0.2)'}}>Add image</span>
                    </div>
                  )}
                  <div className="proj-overlay" />
                  <div className="proj-content">
                    <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-2"
                      style={{color:'rgba(201,168,76,0.65)'}}>{item.category}</p>
                    <h3 className="font-display text-2xl md:text-3xl" style={creamText}>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Videos */}
          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredVideos.map((item, i) => (
                <div key={item.id}
                  className={`proj-card reveal ${item.wide ? 'md:col-span-2' : ''} ${item.wide ? 'aspect-[16/7]' : 'aspect-video'}`}
                  style={{transitionDelay:`${i*0.07}s`}}>
                  {item.src ? (
                    <video src={item.src} className="w-full h-full object-cover" controls />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3"
                      style={{background:'#111'}}>
                      <div className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{border:'1px solid rgba(201,168,76,0.2)', background:'rgba(201,168,76,0.04)'}}>
                        <div className="w-0 h-0 border-t-[7px] border-t-transparent border-b-[7px] border-b-transparent border-l-[12px] ml-1"
                          style={{borderLeftColor:'rgba(201,168,76,0.5)'}} />
                      </div>
                      <span className="font-mono text-[8px] tracking-widest uppercase"
                        style={{color:'rgba(201,168,76,0.2)'}}>Add video</span>
                    </div>
                  )}
                  <div className="proj-overlay" />
                  <div className="proj-content">
                    <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-2"
                      style={{color:'rgba(201,168,76,0.65)'}}>{item.category}</p>
                    <h3 className="font-display text-2xl md:text-3xl" style={creamText}>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* ── FOOTER CTA ── */}
      <section className="py-24 px-6 md:px-12 bg-[#060606]"
        style={{borderTop:'1px solid rgba(201,168,76,0.07)'}}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-8 reveal">
          <div className="flex-1">
            <h2 className="font-display font-light mb-3" style={{fontSize:'clamp(2rem,4vw,3.5rem)', ...creamText}}>
              Ready to work <span className="gold-shimmer italic">together?</span>
            </h2>
            <p className="font-sans text-sm" style={dimText}>
              Let&apos;s create something extraordinary.
            </p>
          </div>
          <a href="/#contact"
            className="gold-btn font-sans text-[11px] tracking-[0.25em] uppercase px-12 py-5 flex-shrink-0">
            GET IN TOUCH
          </a>
        </div>
      </section>
    </>
  );
}
