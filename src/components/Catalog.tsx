import React, { useState } from "react";
import { Play, Pause, Heart, Star, ArrowLeft } from "lucide-react";
import { useTilt, useReveal } from "../hooks";
import { Visualizer } from "./Visualizer";

const GENRES = ["הכל", "לטינית", "פופ", "מזרחית", "פלמנקו", "בוסה נובה", "ג'אז", "שאנסון"];

interface Beat {
  id: number;
  title: string;
  genre: string;
  bpm: number;
  price: number;
  rating: number;
  reviews: number;
  tag: string;
  neon: boolean;
  img: string;
}

const BEATS: Beat[] = [
  { id: 1, title: "Latin Samba Deluxe", genre: "לטינית", bpm: 128, price: 49, rating: 4.9, reviews: 124, tag: "BESTSELLER", neon: true, img: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?w=500&h=360&fit=crop" },
  { id: 2, title: "Oriental Nights Vol.3", genre: "מזרחית", bpm: 108, price: 59, rating: 5, reviews: 89, tag: "NEW", neon: true, img: "https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?w=500&h=360&fit=crop" },
  { id: 3, title: "Flamenco Passion Pro", genre: "פלמנקו", bpm: 96, price: 45, rating: 4.8, reviews: 67, tag: "PREMIUM", neon: false, img: "https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?w=500&h=360&fit=crop" },
  { id: 4, title: "Bossa Nova Sunset", genre: "בוסה נובה", bpm: 112, price: 39, rating: 4.7, reviews: 103, tag: "POPULAR", neon: false, img: "https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg?w=500&h=360&fit=crop" },
  { id: 5, title: "Jazz Club Modern", genre: "ג'אז", bpm: 132, price: 55, rating: 4.9, reviews: 78, tag: "HOT", neon: true, img: "https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg?w=500&h=360&fit=crop" },
  { id: 6, title: "Pop Ballad Suite", genre: "פופ", bpm: 90, price: 35, rating: 4.6, reviews: 145, tag: "VALUE", neon: false, img: "https://images.pexels.com/photos/4090521/pexels-photo-4090521.jpeg?w=500&h=360&fit=crop" },
];

function BeatCard({ beat, isPlaying, isLiked, onPlay, onLike, delay }: { beat: Beat; isPlaying: boolean; isLiked: boolean; onPlay: () => void; onLike: () => void; delay: number }) {
  const { tilt, style, handlers } = useTilt(8);

  return (
    <div
      {...handlers}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        ...style,
        transitionDelay: `${delay}ms`,
        background: "#fff",
        border: tilt.on ? "1.5px solid rgba(0,200,232,0.4)" : "1px solid rgba(0,200,232,0.14)",
        boxShadow: tilt.on ? "0 16px 50px rgba(5,15,31,0.15), 0 0 0 1px rgba(0,200,232,0.3), 0 0 25px rgba(0,200,232,0.1)" : "0 2px 16px rgba(5,15,31,0.08)",
      }}
    >
      {tilt.on && (
        <div className="absolute inset-0 pointer-events-none z-10 rounded-2xl" style={{ background: `radial-gradient(circle 200px at ${tilt.mx}% ${tilt.my}%, rgba(0,200,232,0.07) 0%, transparent 70%)` }} />
      )}

      <div className="relative h-44 overflow-hidden">
        <img src={beat.img} alt={beat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,15,31,0.8), rgba(5,15,31,0.1))" }} />
        <div className="absolute top-3 right-3">
          <span className={beat.neon ? "tag-neon" : "tag-metal"}>{beat.tag}</span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onLike(); }}
          className="absolute top-3 left-3 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
          style={{ background: "rgba(255,255,255,0.9)", border: "1px solid rgba(0,200,232,0.2)", backdropFilter: "blur(8px)" }}
        >
          <Heart size={16} className={isLiked ? "fill-red-400 text-red-400" : ""} style={isLiked ? {} : { color: "#8097ae" }} />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onPlay(); }}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="w-14 h-14 rounded-full flex items-center justify-center btn-metal transition-transform duration-200 hover:scale-110">
            {isPlaying ? <Pause size={20} fill="#050f1f" color="#050f1f" /> : <Play size={20} fill="#050f1f" color="#050f1f" className="ml-1" />}
          </div>
        </button>
      </div>

      {isPlaying && (
        <div className="px-4 py-2 border-b" style={{ borderColor: "rgba(0,200,232,0.12)", background: "#f8fbfe" }}>
          <Visualizer barCount={32} className="h-10" isPlaying={true} light={true} />
        </div>
      )}

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-display font-semibold text-sm tracking-wide leading-tight" style={{ color: "#071428" }}>{beat.title}</h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="tag-metal">{beat.genre}</span>
              <span className="font-mono text-xs" style={{ color: "#8097ae" }}>{beat.bpm} BPM</span>
            </div>
          </div>
          <div className="font-display font-bold text-xl" style={{ color: "#0098b8" }}>₪{beat.price}</div>
        </div>

        <div className="flex items-center gap-1.5 mb-4">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={12} className={i < Math.floor(beat.rating) ? "fill-yellow-400 text-yellow-400" : ""} style={i >= Math.floor(beat.rating) ? { color: "#d0dae4" } : {}} />
            ))}
          </div>
          <span className="font-mono text-xs" style={{ color: "#8097ae" }}>{beat.rating} ({beat.reviews})</span>
        </div>

        <button className="w-full btn-neon py-2.5 rounded-xl text-xs flex items-center justify-center gap-2">
          <span>הוסף לסל</span>
          <ArrowLeft size={14} />
        </button>
      </div>
    </div>
  );
}

export function Catalog() {
  const [genre, setGenre] = useState("הכל");
  const [playing, setPlaying] = useState<number | null>(null);
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const ref = useReveal();

  const filtered = genre === "הכל" ? BEATS : BEATS.filter((b) => b.genre === genre);

  return (
    <section id="catalog" className="py-24 relative" style={{ background: "#f0f5fb" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#0098b8" }}>// קטלוג מקצבים</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl" style={{ color: "#071428" }}>מקצבים מובחרים</h2>
            <p className="font-body mt-3 max-w-md" style={{ color: "#5a7a9a" }}>מאות מקצבים מקצועיים מוכנים לאורגן יאמהה — בחר, שמע, ורכוש.</p>
          </div>
          <a href="#catalog" className="btn-neon px-6 py-3 rounded-xl text-xs flex items-center gap-2 self-start sm:self-auto">
            <span>לקטלוג המלא</span>
            <ArrowLeft size={16} />
          </a>
        </div>

        <div className="flex items-center gap-2 mb-10 overflow-x-auto no-scrollbar pb-2">
          {GENRES.map((g) => (
            <button
              key={g}
              onClick={() => setGenre(g)}
              className="flex-shrink-0 px-5 py-2 rounded-full font-body font-medium text-sm tracking-wide transition-all duration-300"
              style={g === genre ? { background: "linear-gradient(135deg,#00c8e8,#0098b8)", color: "#fff", boxShadow: "0 4px 16px rgba(0,200,232,0.35)" } : { background: "#fff", color: "#3a5c78", border: "1px solid rgba(0,200,232,0.2)", boxShadow: "0 1px 4px rgba(5,15,31,0.06)" }}
            >
              {g}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((beat, i) => (
            <BeatCard
              key={beat.id}
              beat={beat}
              isPlaying={playing === beat.id}
              isLiked={liked.has(beat.id)}
              onPlay={() => setPlaying(playing === beat.id ? null : beat.id)}
              onLike={() => setLiked((prev) => { const s = new Set(prev); s.has(beat.id) ? s.delete(beat.id) : s.add(beat.id); return s; })}
              delay={i * 70}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
