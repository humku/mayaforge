"use client";
import { useState } from "react";
import Image from "next/image";

interface DesignCarouselProps {
  folder: string;
  images: string[];
  alt?: string;
}

export default function DesignCarousel({ folder, images, alt = "Design" }: DesignCarouselProps) {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent(i => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrent(i => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden group" style={{background:"#0a0a0a"}}>
      <Image
        src={`/pod-images/${folder}/${images[current]}`}
        alt={`${alt} ${current + 1}`}
        fill
        className="object-contain transition-all duration-500"
        sizes="(max-width:768px) 100vw, 33vw"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      {/* Arrows */}
      <button onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        style={{background:"rgba(0,0,0,0.6)", border:"1px solid rgba(201,168,76,0.3)"}}>
        <span className="material-symbols-outlined text-sm" style={{color:"#e8c97a"}}>chevron_left</span>
      </button>
      <button onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        style={{background:"rgba(0,0,0,0.6)", border:"1px solid rgba(201,168,76,0.3)"}}>
        <span className="material-symbols-outlined text-sm" style={{color:"#e8c97a"}}>chevron_right</span>
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className="w-1.5 h-1.5 rounded-full transition-all"
            style={{background: i === current ? "#e8c97a" : "rgba(255,255,255,0.3)"}} />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-2 right-2 font-mono text-[9px] tracking-widest px-2 py-1"
        style={{background:"rgba(0,0,0,0.6)", color:"rgba(201,168,76,0.8)"}}>
        {current + 1}/{images.length}
      </div>
    </div>
  );
}