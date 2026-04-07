'use client';

import { useState, useEffect, useCallback } from 'react';
import MagicCursor from '@/components/MagicCursor';

const CATEGORIES = ['ALL', 'Flag_Design', 'Tapestry_art', 'Metal_Indoor_signs', 'Large_Banner', 'Dishwasher', 'custom_Table_runner', 'Wall_Canvas', 'Wall_canvas_set_3'];
const CAT_LABELS: Record<string, string> = {
  'ALL': 'ALL',
  'Flag_Design': 'FLAG DESIGN',
  'Tapestry_art': 'TAPESTRY',
  'Metal_Indoor_signs': 'METAL SIGNS',
  'Large_Banner': 'LARGE BANNER',
  'Dishwasher': 'DISHWASHER',
  'custom_Table_runner': 'TABLE RUNNER',
  'Wall_Canvas': 'WALL CANVAS',
  'Wall_canvas_set_3': 'CANVAS SETS',
};

const videos = [
  { id: 1, category: 'AI VIDEO', title: 'AI Image & Character Design Showcase', src: 'https://www.youtube.com/embed/_oFeWefWoZY', wide: true, isYoutube: true },
];
const videoCategories = ['ALL', 'AI VIDEO', 'SHORTS', 'REELS'];

interface CloudImage {
  public_id: string;
  url: string;
  folder: string;
}

export default function PortfolioPage() {
  const [activeTab, setActiveTab]       = useState<'images' | 'videos'>('images');
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [scrolled, setScrolled]         = useState(false);
  const [images, setImages]             = useState<CloudImage[]>([]);
  const [loading, setLoading]           = useState(true);
  const [lightbox, setLightbox]         = useState<{ open: boolean; url: string; index: number }>({ open: false, url: '', index: 0 });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const fetchImages = useCallback(async (folder: string) => {
    setLoading(true);
    try {
      const url = folder === 'ALL' ? '/api/cloudinary' : `/api/cloudinary?folder=${folder}`;
      const res = await fetch(url);
      const data = await res.json();
      setImages(data.resources || []);
    } catch {
      setImages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages(activeFilter);
  }, [activeFilter, fetchImages]);

  useEffect(() => {
    if (!lightbox.open) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(l => ({ ...l, open: false }));
      if (e.key === 'ArrowRight') setLightbox(l => ({ ...l, index: Math.min(l.index + 1, images.length - 1), url: images[Math.min(l.index + 1, images.length - 1)].url }));
      if (e.key === 'ArrowLeft')  setLightbox(l => ({ ...l, index: Math.max(l.index - 1, 0), url: images[Math.max(l.index - 1, 0)].url }));
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [lightbox.open, images]);

  const filteredVideos = activeFilter === 'ALL' ? videos : videos.filter(v => v.category === activeFilter);
  const goldText  = { color: 'rgba(201,168,76,0.95)' };
  const dimText   = { color: 'rgba(240,235,224,0.72)' };
  const creamText = { color: 'rgba(240,235,224,1)' };

  return (
    <>
      <MagicCursor />
      <div className="fixed inset-0 pointer-events-none z-[9989] opacity-[0.022]"
        style={{backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"}} />

      {/* NAV */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'nav-glass' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex justify-between items-center">
          <a href="/" className="font-display font-bold tracking-[0.15em] text-xl gold-shimmer">MAYA FORGE</a>
          <div className="hidden md:flex items-center gap-10">
            {['services','amazon','projects','contact'].map(s => (
              <a key={s} href={`/#${s}`} className="font-sans text-[11px] tracking-[0.22em] uppercase transition-colors hover:text-[#e8c97a]"
                style={{color:'rgba(240,235,224,0.6)'}}>
                {s === 'amazon' ? 'AMAZON' : s.toUpperCase()}
              </a>
            ))}
          </div>
          <a href="/#contact" className="hidden md:block gold-btn font-sans text-[11px] tracking-[0.22em] uppercase px-7 py-3">
            HIRE US
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-[40vh] flex items-end justify-start relative overflow-hidden bg-[#080808] px-6 md:px-12 pb-16 pt-36">
        <div className="absolute top-1/2 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{background:'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 65%)'}} />
        <div className="relative z-10 max-w-7xl w-full mx-auto">
          <p className="font-mono text-[10px] tracking-[0.45em] uppercase mb-6" style={goldText}>SELECTED WORK</p>
          <h1 className="font-display font-light leading-none" style={{fontSize:'clamp(3.5rem,9vw,8rem)'}}>
            <span style={creamText}>Our </span>
            <span className="gold-shimmer italic">Portfolio</span>
          </h1>
          <p className="font-sans font-light text-lg mt-6 max-w-xl leading-relaxed" style={dimText}>
            Browse our full collection — flags, tapestries, metal signs, canvas and more.
          </p>
        </div>
      </section>

      {/* TABS + FILTERS */}
      <section className="bg-[#080808] px-6 md:px-12 pt-10 pb-4 sticky top-[72px] z-40"
        style={{borderBottom:'1px solid rgba(201,168,76,0.07)'}}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="flex gap-1 p-1" style={{border:'1px solid rgba(201,168,76,0.12)', background:'#0a0a0a'}}>
            {(['images','videos'] as const).map(tab => (
              <button key={tab} onClick={() => { setActiveTab(tab); setActiveFilter('ALL'); }}
                className="font-mono text-[10px] tracking-[0.3em] uppercase px-8 py-3 transition-all duration-300"
                style={activeTab === tab ? {background:'rgba(201,168,76,0.12)', color:'rgba(201,168,76,0.9)'} : {color:'rgba(240,235,224,0.4)'}}>
                {tab}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {(activeTab === 'images' ? CATEGORIES : videoCategories).map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)}
                className="font-mono text-[9px] tracking-[0.3em] uppercase px-4 py-2 transition-all duration-300"
                style={activeFilter === cat
                  ? {border:'1px solid rgba(201,168,76,0.5)', color:'rgba(201,168,76,0.85)', background:'rgba(201,168,76,0.06)'}
                  : {border:'1px solid rgba(201,168,76,0.1)', color:'rgba(240,235,224,0.4)'}}>
                {CAT_LABELS[cat] || cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GRID */}
      <section className="bg-[#080808] px-6 md:px-12 py-16 min-h-screen">
        <div className="max-w-7xl mx-auto">

          {/* Images tab */}
          {activeTab === 'images' && (
            <>
              {loading ? (
                <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="break-inside-avoid mb-3 animate-pulse"
                      style={{
                        height: i % 3 === 0 ? '280px' : i % 3 === 1 ? '200px' : '240px',
                        background:'linear-gradient(90deg, #111 0%, #1a1a1a 50%, #111 100%)',
                        border:'1px solid rgba(201,168,76,0.06)'
                      }}
                    />
                  ))}
                </div>
              ) : images.length === 0 ? (
                <div className="flex items-center justify-center py-40">
                  <p className="font-mono text-[10px] tracking-widest uppercase" style={{color:'rgba(240,235,224,0.3)'}}>NO IMAGES FOUND</p>
                </div>
              ) : (
                <>
                  <p className="font-mono text-[10px] tracking-widest uppercase mb-8" style={{color:'rgba(240,235,224,0.4)'}}>
                    {images.length} DESIGNS — CLICK TO ENLARGE
                  </p>
                  <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
                    {images.map((item, i) => (
                      <div key={item.public_id}
                        className="break-inside-avoid mb-3 group cursor-pointer relative overflow-hidden"
                        style={{border:'1px solid rgba(201,168,76,0.08)'}}
                        onClick={() => setLightbox({ open: true, url: item.url, index: i })}>
                        <img 
  src={item.url} 
  alt={item.public_id} 
  className="w-full block transition-all duration-700 group-hover:scale-105 group-hover:brightness-110 opacity-0"
  loading="lazy"
  onLoad={(e) => (e.currentTarget.style.opacity = '1')}
  style={{transition: 'opacity 0.5s ease, transform 0.7s ease'}}
/>
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                          style={{background:'rgba(8,8,8,0.5)'}}>
                          <span className="material-symbols-outlined text-3xl" style={{fontFamily:'Material Symbols Outlined', color:'#e8c97a'}}>zoom_in</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}

          {/* Videos tab */}
          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredVideos.map((item) => (
                <div key={item.id}
                  className={`proj-card ${item.wide ? 'md:col-span-2 aspect-[16/7]' : 'aspect-video'}`}>
                  {(item as any).isYoutube ? (
                    <iframe src={item.src} className="w-full h-full" allowFullScreen
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" />
                  ) : (
                    <video src={item.src} className="w-full h-full object-cover" controls />
                  )}
                  <div className="proj-overlay" />
                  <div className="proj-content">
                    <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-2" style={{color:'rgba(201,168,76,0.95)'}}>{item.category}</p>
                    <h3 className="font-display text-2xl md:text-3xl" style={creamText}>{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="py-24 px-6 md:px-12 bg-[#060606]" style={{borderTop:'1px solid rgba(201,168,76,0.07)'}}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="font-display font-light mb-3" style={{fontSize:'clamp(2rem,4vw,3.5rem)', ...creamText}}>
              Ready to work <span className="gold-shimmer italic">together?</span>
            </h2>
            <p className="font-sans text-sm" style={dimText}>Let&apos;s create something extraordinary.</p>
          </div>
          <a href="/#contact" className="gold-btn font-sans text-[11px] tracking-[0.25em] uppercase px-12 py-5 flex-shrink-0">
            GET IN TOUCH
          </a>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox.open && (
        <div className="fixed inset-0 z-[9995] flex items-center justify-center p-4 md:p-12"
          style={{background:'rgba(5,5,5,0.97)'}}
          onClick={() => setLightbox(l => ({ ...l, open: false }))}>
          <button className="absolute top-6 right-6 font-mono text-[10px] tracking-widest uppercase"
            style={{color:'rgba(240,235,224,0.5)'}}
            onClick={() => setLightbox(l => ({ ...l, open: false }))}>
            CLOSE ✕
          </button>
          {lightbox.index > 0 && (
            <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center"
              style={{border:'1px solid rgba(201,168,76,0.2)'}}
              onClick={e => { e.stopPropagation(); setLightbox(l => ({ ...l, index: l.index - 1, url: images[l.index - 1].url })); }}>
              <span className="material-symbols-outlined" style={{fontFamily:'Material Symbols Outlined', color:'#e8c97a'}}>chevron_left</span>
            </button>
          )}
          <img src={lightbox.url.replace('w_600,c_scale,q_70/', '')} className="max-w-full max-h-[85vh] object-contain"
            style={{border:'1px solid rgba(201,168,76,0.15)'}}
            onClick={e => e.stopPropagation()} />
          {lightbox.index < images.length - 1 && (
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center"
              style={{border:'1px solid rgba(201,168,76,0.2)'}}
              onClick={e => { e.stopPropagation(); setLightbox(l => ({ ...l, index: l.index + 1, url: images[l.index + 1].url })); }}>
              <span className="material-symbols-outlined" style={{fontFamily:'Material Symbols Outlined', color:'#e8c97a'}}>chevron_right</span>
            </button>
          )}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <p className="font-mono text-[10px] tracking-widest" style={{color:'rgba(201,168,76,0.6)'}}>
              {lightbox.index + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}