"use client";
import { useEffect } from "react";

export default function MagicCursor() {
  useEffect(() => {
    const dot   = document.getElementById("cursor-dot");
    const ring  = document.getElementById("cursor-ring");
    const trail = document.getElementById("cursor-trail");
    if (!dot || !ring || !trail) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let trailX = 0, trailY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top  = mouseY + "px";
    };

    const animate = () => {
      ringX  += (mouseX - ringX)  * 0.15;
      ringY  += (mouseY - ringY)  * 0.15;
      trailX += (mouseX - trailX) * 0.07;
      trailY += (mouseY - trailY) * 0.07;
      ring.style.left  = ringX  + "px";
      ring.style.top   = ringY  + "px";
      trail.style.left = trailX + "px";
      trail.style.top  = trailY + "px";
      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    animate();

    // Hover effects
    const onEnter = () => {
      dot.style.width  = "12px";
      dot.style.height = "12px";
      dot.style.background = "#e8c97a";
    };
    const onLeave = () => {
      dot.style.width  = "8px";
      dot.style.height = "8px";
    };

    const interactives = document.querySelectorAll("a, button");
    interactives.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      interactives.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="cursor-dot"   />
      <div id="cursor-ring"  />
      <div id="cursor-trail" />
    </>
  );
}
