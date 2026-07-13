import React, { useRef, useState, useEffect } from "react";

// Mouse parallax hook
export function useParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0, nx: 0, ny: 0 });
  useEffect(() => {
    const handler = (e: MouseEvent) =>
      setPos({ x: e.clientX, y: e.clientY, nx: (e.clientX / window.innerWidth) * 2 - 1, ny: (e.clientY / window.innerHeight) * 2 - 1 });
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

// 3D tilt hook
export function useTilt(maxDeg = 12) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50, on: false });
  const handlers = {
    onMouseMove(e: React.MouseEvent) {
      const r = e.currentTarget.getBoundingClientRect();
      const px = (e.clientX - r.left - r.width / 2) / (r.width / 2);
      const py = (e.clientY - r.top - r.height / 2) / (r.height / 2);
      setTilt({ rx: -py * maxDeg, ry: px * maxDeg, mx: ((e.clientX - r.left) / r.width) * 100, my: ((e.clientY - r.top) / r.height) * 100, on: true });
    },
    onMouseLeave() {
      setTilt({ rx: 0, ry: 0, mx: 50, my: 50, on: false });
    },
  };
  const style = {
    transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(${tilt.on ? 14 : 0}px)`,
    transition: tilt.on ? "transform 0.08s ease" : "transform 0.55s cubic-bezier(0.23,1,0.32,1)",
  };
  return { tilt, style, handlers };
}

// Reveal on scroll hook
export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}
