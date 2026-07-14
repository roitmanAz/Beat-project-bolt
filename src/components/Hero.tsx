import React, { useState, useEffect, useRef } from "react";
import { Sparkles, Play, Pause, ChevronDown, Upload, Music } from "lucide-react";
import { Logo } from "./Logo";
import { Visualizer } from "./Visualizer";
import { useParallax } from "../hooks";

const STATS = [
  { value: "2,400+", label: "מקצבים פרימיום" },
  { value: "180+", label: "סגנונות ז'אנר" },
  { value: "12K+", label: "מוזיקאים מרוצים" },
];

function TiltLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  return (
    <a
      ref={ref}
      href={href}
      className={className}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setOffset({ x: ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 7, y: ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * 5 });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)`, transition: offset.x === 0 ? "transform 0.5s cubic-bezier(0.23,1,0.32,1)" : "transform 0.1s ease" }}
    >
      {children}
    </a>
  );
}

export function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [visible, setVisible] = useState(false);
  const parallax = useParallax();

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const p = (n: number) => ({
    transform: `translate(${parallax.nx * n}px, ${parallax.ny * n}px)`,
    transition: "transform 0.35s ease",
    willChange: "transform" as const,
  });

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: "linear-gradient(160deg, #0a1420 0%, #0d1a2a 40%, #0a1622 100%)" }}>
      <div className="absolute inset-0 grid-overlay" style={{ opacity: 0.6, ...p(4) }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(120deg, rgba(0,200,232,0.06), rgba(0,160,255,0.04), rgba(0,220,180,0.05), rgba(0,120,200,0.04), rgba(0,200,232,0.06))", backgroundSize: "300% 300%", animation: "auroraShift 18s ease-in-out infinite" }} />
      <div className="absolute inset-x-0 h-px pointer-events-none animate-scan-line" style={{ background: "linear-gradient(90deg,transparent,rgba(0,200,232,0.4),transparent)", animationDuration: "6s" }} />

      <div className="absolute pointer-events-none" style={{ top: "12%", left: "8%", width: 400, height: 400, borderRadius: "50%", animation: "orbDrift1 14s ease-in-out infinite, colorCycle 10s ease-in-out infinite", ...p(16) }} />
      <div className="absolute pointer-events-none" style={{ bottom: "18%", right: "6%", width: 320, height: 320, borderRadius: "50%", animation: "orbDrift2 16s ease-in-out infinite, colorCycle2 12s ease-in-out infinite", ...p(-10) }} />
      <div className="absolute pointer-events-none" style={{ top: "40%", left: "55%", width: 260, height: 260, borderRadius: "50%", animation: "orbDrift3 20s ease-in-out infinite, colorCycle3 14s ease-in-out infinite", ...p(6) }} />

      <div className="absolute pointer-events-none overflow-hidden" style={{ top: 0, left: "20%", width: "60%", height: "100%" }}>
        <div className="absolute" style={{ width: "100%", height: "180%", top: "-10%", left: 0, background: "linear-gradient(180deg, transparent, rgba(0,200,232,0.08), rgba(0,160,255,0.05), transparent)", filter: "blur(40px)", animation: "beamSweep 8s ease-in-out infinite" }} />
      </div>

      {[...Array(14)].map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none rounded-full"
          style={{
            left: `${(i * 7 + 5) % 95}%`,
            top: `${(i * 13 + 10) % 80}%`,
            width: 3 + (i % 3),
            height: 3 + (i % 3),
            background: i % 2 === 0 ? "rgba(0,200,232,0.6)" : "rgba(0,180,255,0.5)",
            boxShadow: i % 2 === 0 ? "0 0 8px rgba(0,200,232,0.5)" : "0 0 8px rgba(0,180,255,0.4)",
            animation: `particleFade ${4 + (i % 5)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
            ...p(i % 2 === 0 ? 8 : -6),
          }}
        />
      ))}

      <div className="absolute bottom-[-60px] right-[-80px] pointer-events-none" style={{ opacity: 0.06, ...p(-5) }}>
        <Logo size={480} animated={false} />
      </div>

      <div className={`relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex flex-col items-center text-center transition-all duration-900 ${visible ? "opacity-100" : "opacity-0 translate-y-8"}`}>
        <div className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full" style={{ background: "rgba(0,200,232,0.1)", border: "1px solid rgba(0,200,232,0.35)", boxShadow: "0 0 18px rgba(0,200,232,0.12)", animation: "glowPulse 3s ease-in-out infinite" }}>
          <Sparkles size={12} style={{ color: "#0098b8" }} />
          <span className="font-mono text-xs tracking-[0.22em]" style={{ color: "#0098b8" }}>פלטפורמת הפרימיום לאורגן יאמהה</span>
        </div>

        <div style={p(4)}>
          <h1 className="font-display font-black leading-none mb-6 tracking-tight" style={{ fontSize: "clamp(2.8rem,8vw,6rem)", color: "#eaf4fa" }}>
            <span className="text-gradient-silver block">שדרג את</span>
            <span className="block mt-2" style={{ color: "#00c8e8", textShadow: "0 2px 20px rgba(0,200,232,0.35)" }}>האורגן שלך</span>
            <span className="text-gradient-silver block mt-2">עם מקצבי פרימיום</span>
          </h1>
        </div>

        <div style={p(2)}>
          <p className="font-body text-lg sm:text-xl max-w-2xl mb-12 leading-relaxed" style={{ color: "#8097ae", direction: "rtl" }}>
            מקצבים מקצועיים, סגנונות ייחודיים וחבילות הרחבה מותאמות אישית — הכל בפלטפורמה אחת שתרים את הנגינה שלך לרמה חדשה.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
          <TiltLink href="#catalog" className="btn-metal px-8 py-4 rounded-xl text-sm flex items-center gap-3">
            <Play size={18} />
            <span>חקור את הקטלוג המלא</span>
          </TiltLink>
          <TiltLink href="#custom" className="btn-neon px-8 py-4 rounded-xl text-sm flex items-center gap-3">
            <Upload size={18} />
            <span>שירות התאמה אישית</span>
          </TiltLink>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-12 mb-16">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 group cursor-default">
              <span className="font-display font-bold text-4xl group-hover:scale-110 transition-transform duration-300" style={{ color: "#00c8e8", textShadow: "0 2px 16px rgba(0,200,232,0.4)" }}>{s.value}</span>
              <span className="font-body text-sm tracking-wider" style={{ color: "#8097ae" }}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="w-full max-w-4xl" style={p(-3)}>
          <div className="relative rounded-2xl overflow-hidden" style={{ background: "rgba(16,30,48,0.88)", border: "1px solid rgba(0,200,232,0.22)", backdropFilter: "blur(20px)", boxShadow: "0 4px 40px rgba(0,0,0,0.4)" }}>
            <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(0,200,232,0.12)" }}>
              <div className="flex items-center gap-3">
                <button onClick={() => setIsPlaying(!isPlaying)} className="w-10 h-10 rounded-full flex items-center justify-center btn-metal" style={{ borderRadius: "50%" }}>
                  {isPlaying ? (
                    <span className="flex gap-1">
                      <span className="w-1 h-4 rounded" style={{ background: "#050f1f" }} />
                      <span className="w-1 h-4 rounded" style={{ background: "#050f1f" }} />
                    </span>
                  ) : (
                    <Play size={15} fill="#050f1f" color="#050f1f" className="ml-0.5" />
                  )}
                </button>
                <div className="text-right">
                  <div className="font-display font-semibold text-sm tracking-wider" style={{ color: "#eaf4fa" }}>Latin Samba Pro</div>
                  <div className="font-mono text-xs" style={{ color: "#0098b8" }}>Genre: Latin — 128 BPM</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-2 py-0.5 rounded text-xs font-mono tracking-widest" style={{ background: "rgba(0,200,232,0.1)", border: "1px solid rgba(0,200,232,0.3)", color: "#007a90" }}>PREVIEW</span>
                <span className="font-mono text-xs" style={{ color: "#8097ae" }}>2:34 / 4:12</span>
              </div>
            </div>
            <div className="px-5 py-4" style={{ background: "#0d1a2a" }}>
              <Visualizer barCount={72} className="h-28" isPlaying={isPlaying} light={true} />
            </div>
          </div>
        </div>
      </div>

      <a href="#catalog" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-colors duration-300 animate-float" style={{ color: "#5a7a9a" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#00c8e8")} onMouseLeave={(e) => (e.currentTarget.style.color = "#5a7a9a")}>
        <span className="font-mono text-xs tracking-widest">גלול למטה</span>
        <ChevronDown size={20} />
      </a>
    </section>
  );
}
