import React, { useState } from "react";
import { Calendar, Clock, Tag, ArrowLeft } from "lucide-react";
import { useTilt, useReveal } from "../hooks";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  img: string;
}

const POSTS: Post[] = [
  { id: 1, title: "10 טיפים לשיפור הצליל של האורגן שלך בהופעות חיות", excerpt: "ניהול צליל מקצועי באירוע חי הוא אמנות. מאמר זה מכסה את הטכניקות המובילות לקיבוע הצליל האידיאלי בכל סביבת הגברה.", category: "טיפים ומדריכים", date: "8 יולי 2025", readTime: "6 דקות", img: "https://images.pexels.com/photos/1001850/pexels-photo-1001850.jpeg?w=600&h=400&fit=crop" },
  { id: 2, title: "השוואה: מקצבי לטינית vs. פלמנקו — מה מתאים לאירוע שלך?", excerpt: "לטינית ופלמנקו נשמעות דומות, אבל ההבדל בין קנאות, ביט ואנרגיה הוא עצום. מדריך מקיף לבחירת הז'אנר המדויק.", category: "השוואות ז'אנרים", date: "1 יולי 2025", readTime: "4 דקות", img: "https://images.pexels.com/photos/210922/pexels-photo-210922.jpeg?w=600&h=400&fit=crop" },
  { id: 3, title: "כיצד להכין את קובץ ה-.inf לשירות ההתאמה האישית", excerpt: "מדריך שלב-אחר-שלב לייצוא קובץ ה-.inf מכל דגמי יאמהה הפופולריים: Genos, PSR-SX900, Tyros 5 ו-CVP-900.", category: "מדריכים טכניים", date: "22 יוני 2025", readTime: "8 דקות", img: "https://images.pexels.com/photos/4090521/pexels-photo-4090521.jpeg?w=600&h=400&fit=crop" },
];

function BlogCard({ post, delay }: { post: Post; delay: number }) {
  const { tilt, style, handlers } = useTilt(7);
  const [cursor, setCursor] = useState({ x: 50, y: 50 });

  return (
    <article
      {...handlers}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        ...style,
        transitionDelay: `${delay}ms`,
        background: "#fff",
        border: tilt.on ? "1.5px solid rgba(0,200,232,0.4)" : "1px solid rgba(0,200,232,0.14)",
        boxShadow: tilt.on ? "0 14px 40px rgba(5,15,31,0.12)" : "0 2px 14px rgba(5,15,31,0.07)",
      }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setCursor({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
      }}
    >
      {tilt.on && <div className="absolute inset-0 pointer-events-none z-10" style={{ background: `radial-gradient(circle 160px at ${cursor.x}% ${cursor.y}%, rgba(0,200,232,0.07) 0%, transparent 70%)` }} />}

      <div className="relative h-48 overflow-hidden">
        <img src={post.img} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(5,15,31,0.8), rgba(5,15,31,0.1))" }} />
        <div className="absolute bottom-3 right-3">
          <span className="tag-neon flex items-center gap-1">
            <Tag size={10} />
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar size={12} style={{ color: "#0098b8" }} />
            <span className="font-mono text-xs" style={{ color: "#8097ae" }}>{post.date}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={12} style={{ color: "#0098b8" }} />
            <span className="font-mono text-xs" style={{ color: "#8097ae" }}>קריאה של {post.readTime}</span>
          </div>
        </div>
        <h3 className="font-display font-semibold text-sm leading-snug mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-cyan-mid" style={{ color: "#071428" }}>{post.title}</h3>
        <p className="font-body text-xs leading-relaxed mb-5 line-clamp-3" style={{ color: "#5a7a9a" }}>{post.excerpt}</p>
        <div className="flex items-center gap-2 font-mono text-xs transition-colors" style={{ color: "#0098b8" }}>
          <span>קרא עוד</span>
          <ArrowLeft size={14} />
        </div>
      </div>
    </article>
  );
}

export function Blog() {
  const ref = useReveal();

  return (
    <section id="blog" className="py-24 relative" style={{ background: "#fff" }}>
      <div className="absolute top-0 inset-x-0 section-divider" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <p className="font-mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#0098b8" }}>// בלוג מקצועי</p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl" style={{ color: "#071428" }}>ידע ומשאבים</h2>
            <p className="font-body mt-3 max-w-md" style={{ color: "#5a7a9a" }}>מאמרים, מדריכים וטיפים מקצועיים לנגן המודרני.</p>
          </div>
          <a href="#blog" className="btn-neon px-6 py-3 rounded-xl text-xs flex items-center gap-2 self-start sm:self-auto">
            <span>לכל הפוסטים</span>
            <ArrowLeft size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <BlogCard key={post.id} post={post} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}
