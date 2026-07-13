import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Eye, MapPin, ArrowLeft } from "lucide-react";
import { useReveal } from "../hooks";

interface Event {
  id: number;
  title: string;
  date: string;
  loc: string;
  type: string;
  views: string;
  img: string;
}

const EVENTS: Event[] = [
  { id: 1, title: "גאלה מוזיקלית — מלון הילטון תל אביב", date: "15 יוני 2025", loc: "תל אביב", type: "חתונה", views: "12.4K", img: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?w=900&h=650&fit=crop" },
  { id: 2, title: "קונצרט קיץ — אמפיתיאטרון ירושלים", date: "22 מאי 2025", loc: "ירושלים", type: "קונצרט", views: "8.7K", img: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=600&h=800&fit=crop" },
  { id: 3, title: "בר מצווה פרימיום — חולון", date: "10 אפריל 2025", loc: "חולון", type: "בר מצווה", views: "5.2K", img: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?w=500&h=500&fit=crop" },
  { id: 4, title: "ערב מוזיקה מזרחית — נתניה", date: "5 מרץ 2025", loc: "נתניה", type: "מסיבה", views: "9.1K", img: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?w=500&h=500&fit=crop" },
];

function NavArrow({ dir, disabled, onClick }: { dir: "right" | "left"; disabled: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 disabled:opacity-30"
      style={{ background: "#fff", border: "1px solid rgba(0,200,232,0.25)", boxShadow: "0 1px 6px rgba(5,15,31,0.07)" }}
      onMouseEnter={(e) => { if (!disabled) { e.currentTarget.style.borderColor = "rgba(0,200,232,0.6)"; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,200,232,0.2)"; } }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(0,200,232,0.25)"; e.currentTarget.style.boxShadow = "0 1px 6px rgba(5,15,31,0.07)"; }}
    >
      {dir === "right" ? <ChevronRight size={20} style={{ color: "#5a7a9a" }} /> : <ChevronLeft size={20} style={{ color: "#5a7a9a" }} />}
    </button>
  );
}

function EventCard({ event, tall, compact }: { event: Event; tall?: boolean; compact?: boolean }) {
  const [hover, setHover] = useState(false);
  const [cursor, setCursor] = useState({ x: 50, y: 50 });
  const h = tall ? "h-[480px]" : compact ? "h-44" : "h-64";

  return (
    <div
      className={`relative ${h} rounded-2xl overflow-hidden cursor-pointer`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setCursor({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
      style={{
        boxShadow: hover ? "0 16px 48px rgba(5,15,31,0.2), 0 0 0 1.5px rgba(0,200,232,0.45)" : "0 4px 18px rgba(5,15,31,0.1), 0 0 0 1px rgba(0,200,232,0.1)",
        transform: hover ? "translateY(-5px)" : "translateY(0)",
        transition: "all 0.38s cubic-bezier(0.25,0.1,0.25,1)",
      }}
    >
      <img src={event.img} alt={event.title} className="w-full h-full object-cover transition-transform duration-700" style={{ transform: hover ? "scale(1.08)" : "scale(1)" }} />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,15,31,0.9) 0%, rgba(5,15,31,0.3) 50%, transparent 100%)" }} />
      {hover && <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(circle 180px at ${cursor.x}% ${cursor.y}%, rgba(0,200,232,0.12) 0%, transparent 70%)` }} />}
      <div className="absolute top-3 right-3">
        <span className="tag-neon">{event.type}</span>
      </div>
      <div className="absolute bottom-0 inset-x-0 p-5">
        <h3 className="font-display font-semibold text-sm leading-snug mb-2" style={{ color: "#eaf4fa" }}>{event.title}</h3>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs" style={{ color: "rgba(184,201,217,0.7)" }}>{event.date}</span>
          <div className="flex items-center gap-1">
            <MapPin size={11} style={{ color: "rgba(0,200,232,0.8)" }} />
            <span className="font-mono text-xs" style={{ color: "rgba(184,201,217,0.6)" }}>{event.loc}</span>
          </div>
          <div className="flex items-center gap-1 mr-auto">
            <Eye size={11} style={{ color: "rgba(0,200,232,0.8)" }} />
            <span className="font-mono text-xs" style={{ color: "rgba(184,201,217,0.6)" }}>{event.views}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Showcase() {
  const ref = useReveal();
  const [idx, setIdx] = useState(0);

  return (
    <section id="showcase" className="py-24 relative" style={{ background: "#f0f5fb" }}>
      <div className="absolute top-0 inset-x-0 section-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#0098b8" }}>// תיק עבודות</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl" style={{ color: "#071428" }}>מהאירועים האחרונים</h2>
            <p className="font-body mt-3 max-w-md" style={{ color: "#5a7a9a" }}>הצצה לאירועים שבהם המקצבים שלנו הפכו ערב רגיל לחוויה בלתי נשכחת.</p>
          </div>
          <div className="flex items-center gap-3">
            <NavArrow dir="right" disabled={idx === 0} onClick={() => setIdx((r) => Math.max(0, r - 1))} />
            <span className="font-mono text-sm" style={{ color: "#8097ae" }}>{idx + 1} / {EVENTS.length}</span>
            <NavArrow dir="left" disabled={idx === EVENTS.length - 1} onClick={() => setIdx((r) => Math.min(EVENTS.length - 1, r + 1))} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2">
            <EventCard event={EVENTS[0]} tall />
          </div>
          <EventCard event={EVENTS[1]} />
          <div className="grid grid-cols-2 gap-5">
            <EventCard event={EVENTS[2]} compact />
            <EventCard event={EVENTS[3]} compact />
          </div>
        </div>

        <div className="mt-10 text-center">
          <a href="#showcase" className="btn-neon inline-flex items-center gap-2 px-8 py-3 rounded-xl text-sm">
            <ArrowLeft size={16} />
            <span>לכל תיק העבודות</span>
          </a>
        </div>
      </div>
    </section>
  );
}
