"use client";

const testimonials = [
  {
    text: "Mirza has been phenomenal in helping me to bring the graphics alive in my book. He is very creative and really listens and clarifies what I am saying so that he can create what I want. He is easily accessible and very competent in his skills. I highly recommend him and will use him again.",
    project: "Graphic Design / AI Art for Leadership Book",
    rating: 5,
  },
  {
    text: "Amazing person to work with! Very skilled and willing to make efforts to help the project.",
    project: "100 Landmarks",
    rating: 5,
  },
  {
    text: "Zahid is easy to work with and does a great job refining everything in the intended way.",
    project: "Midjourney Prompt Expert — YouTube Thumbnails",
    rating: 5,
  },
  {
    text: "Created coloring pages using AI tool and they came out great! He made the revisions requested and was very cooperative.",
    project: "Coloring Book Pages",
    rating: 5,
  },
  {
    text: "Great experience working with Mirza!",
    project: "Children's Book Illustrations",
    rating: 5,
  },
  {
    text: "What a great artist and he was able to understand the character and pull in a lot of emotion. Delivered on time and super easy to work with. Great experience!",
    project: "Children's Book Illustrations — Midjourney",
    rating: 5,
  },
  {
    text: "Muhammad did an excellent job and is a great freelancer! I will definitely hire him again on future projects.",
    project: "Picture Creation & Editing",
    rating: 5,
  },
  {
    text: "A fantastic freelancer with exceptional communication and the willingness to adapt to the challenges faced. Highly recommend to anyone looking for a great result and solid communication.",
    project: "AI Art Video",
    rating: 5,
  },
  {
    text: "Muhammad was great to work with. He was very responsive, communicative and highly skilled. His creativity shined thru. I recommend him and would hire him again!",
    project: "Custom Pixar-Style Avatar",
    rating: 5,
  },
  {
    text: "Great midjourney expert, helped with my task and shared lots of useful info on how to do it by myself. Strongly recommend.",
    project: "Midjourney Character",
    rating: 5,
  },
  {
    text: "Muhammad was a fantastic freelancer. He took on a very urgent implementation project with a very friendly, responsive and understanding attitude. Looking forward to working with him again.",
    project: "GenAI Images",
    rating: 5,
  },
  {
    text: "Muhammad was excellent to work with and went above and beyond to get the project finished — I would highly recommend him for all illustrations / mid journey projects.",
    project: "Book Illustration — Sumi E Zen",
    rating: 5,
  },
  {
    text: "Fast communication and gives you a lot of AI design options.",
    project: "AI Cat Figures",
    rating: 5,
  },
  {
    text: "It was a very good experience to work with Abdullah — the requested images were great, the communication was wonderful. I highly recommend working with him!",
    project: "Midjourney Images",
    rating: 5,
  },
  {
    text: "Very talented.",
    project: "Character Influencer",
    rating: 5,
  },
  {
    text: "He does great work.",
    project: "Image Editing Specialist",
    rating: 5,
  },
  {
    text: "Great timely job. Created A.I. persons.",
    project: "AI Image Generation",
    rating: 5,
  },
];

const doubled = [...testimonials, ...testimonials];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#c9a84c", fontSize: "12px" }}>★</span>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const goldText  = { color: "rgba(201,168,76,0.55)" };
  const dimText   = { color: "rgba(240,235,224,0.4)" };
  const creamText = { color: "rgba(240,235,224,0.88)" };

  return (
    <section className="py-32 bg-[#060606] overflow-hidden"
      style={{ borderTop: "1px solid rgba(201,168,76,0.07)" }}>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 reveal">
        <p className="font-mono text-[10px] tracking-[0.45em] uppercase mb-6" style={goldText}>
          CLIENT FEEDBACK
        </p>
        <h2 className="font-display font-light leading-none" style={{ fontSize: "clamp(2.8rem,6vw,6rem)" }}>
          <span style={creamText}>What clients </span>
          <span className="gold-shimmer italic">say.</span>
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative mb-4">
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #060606, transparent)" }} />
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #060606, transparent)" }} />
        <div className="testimonials-track-left flex gap-4" style={{ width: "max-content" }}>
          {doubled.slice(0, 20).map((t, i) => (
            <div key={i} className="flex-shrink-0 w-80 p-7 flex flex-col justify-between"
              style={{ border: "1px solid rgba(201,168,76,0.1)", background: "#0a0a0a", minHeight: "190px" }}>
              <div>
                <Stars count={t.rating} />
                <p className="font-sans font-light text-sm leading-relaxed mb-4"
                  style={{ ...dimText, fontStyle: "italic" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-between pt-4"
                style={{ borderTop: "1px solid rgba(201,168,76,0.07)" }}>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase"
                  style={{ color: "rgba(240,235,224,0.2)" }}>
                  {t.project}
                </span>
                <span className="font-mono text-[8px] tracking-widest uppercase px-2 py-1 flex-shrink-0 ml-2"
                  style={{ border: "1px solid rgba(201,168,76,0.2)", color: "rgba(201,168,76,0.5)" }}>
                  Upwork
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative">
        <div className="absolute left-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #060606, transparent)" }} />
        <div className="absolute right-0 top-0 h-full w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #060606, transparent)" }} />
        <div className="testimonials-track-right flex gap-4" style={{ width: "max-content" }}>
          {doubled.slice(0, 20).map((t, i) => (
            <div key={i} className="flex-shrink-0 w-80 p-7 flex flex-col justify-between"
              style={{ border: "1px solid rgba(201,168,76,0.1)", background: "#0a0a0a", minHeight: "190px" }}>
              <div>
                <Stars count={t.rating} />
                <p className="font-sans font-light text-sm leading-relaxed mb-4"
                  style={{ ...dimText, fontStyle: "italic" }}>
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-between pt-4"
                style={{ borderTop: "1px solid rgba(201,168,76,0.07)" }}>
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase"
                  style={{ color: "rgba(240,235,224,0.2)" }}>
                  {t.project}
                </span>
                <span className="font-mono text-[8px] tracking-widest uppercase px-2 py-1 flex-shrink-0 ml-2"
                  style={{ border: "1px solid rgba(201,168,76,0.2)", color: "rgba(201,168,76,0.5)" }}>
                  Upwork
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonials-track-left {
          animation: scroll-left 60s linear infinite;
        }
        .testimonials-track-left:hover {
          animation-play-state: paused;
        }
        .testimonials-track-right {
          animation: scroll-right 60s linear infinite;
        }
        .testimonials-track-right:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </section>
  );
}
