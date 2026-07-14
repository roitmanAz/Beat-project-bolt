import React, { useState } from "react";
import { Upload, Cog, Download, Check, ArrowLeft } from "lucide-react";
import { useTilt, useReveal } from "../hooks";

const STEPS = [
  { n: "01", Icon: Upload, title: "העלה את הקובץ שלך", desc: "גרור ושחרר את קובץ ה-.inf של האורגן שלך. תומכים בכל דגמי יאמהה PSR, Genos, Tyros ו-CVP.", detail: "קבצי .inf, .sty, .prs" },
  { n: "02", Icon: Cog, title: "אנחנו מעבדים", desc: "הצוות המקצועי שלנו מנתח את ההגדרות הנוכחיות ומייצר מקצבים המותאמים בדיוק לאורגן הספציפי שלך.", detail: "24-48 שעות עבודה" },
  { n: "03", Icon: Download, title: "הורד את החבילה", desc: "קבל קישור להורדת חבילת הסגנונות המותאמת אישית, מוכנה להתקנה ישירה באורגן.", detail: "קבצים מוכנים להתקנה" },
];

const INCLUDES = [
  "התאמה מלאה לדגם האורגן שלך",
  "עד 20 מקצבים מותאמים בחבילה",
  "תמיכה מלאה לאחר ההתקנה",
  "אחריות שביעות רצון 100%",
];

function StepCard({ step }: { step: (typeof STEPS)[number] }) {
  const { tilt, style, handlers } = useTilt(7);
  const { Icon } = step;
  return (
    <div {...handlers} className="relative rounded-2xl p-8 group overflow-hidden" style={{ ...style, background: "#101e30", border: tilt.on ? "1.5px solid rgba(0,200,232,0.4)" : "1px solid rgba(0,200,232,0.14)", boxShadow: tilt.on ? "0 14px 40px rgba(0,0,0,0.4)" : "0 2px 14px rgba(0,0,0,0.3)" }}>
      <div className="font-display font-black text-6xl absolute top-3 right-5 select-none pointer-events-none" style={{ color: "rgba(0,200,232,0.06)" }}>{step.n}</div>
      {tilt.on && <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: `radial-gradient(circle 150px at ${tilt.mx}% ${tilt.my}%, rgba(0,200,232,0.06) 0%, transparent 70%)` }} />}
      <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:shadow-neon-sm" style={{ background: "rgba(0,200,232,0.1)", border: "1px solid rgba(0,200,232,0.3)" }}>
        <Icon size={24} style={{ color: "#00c8e8" }} />
      </div>
      <h3 className="font-display font-semibold text-base mb-3 tracking-wide" style={{ color: "#eaf4fa" }}>{step.title}</h3>
      <p className="font-body text-sm leading-relaxed mb-5" style={{ color: "#8097ae" }}>{step.desc}</p>
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#00c8e8" }} />
        <span className="font-mono text-xs tracking-wider" style={{ color: "#8097ae" }}>{step.detail}</span>
      </div>
    </div>
  );
}

function UploadForm() {
  const [hover, setHover] = useState(false);
  return (
    <div className="p-10 flex flex-col items-center justify-center">
      <div
        className="w-full rounded-2xl p-10 flex flex-col items-center gap-5 text-center cursor-pointer transition-all duration-300 border-2 border-dashed"
        style={{
          borderColor: hover ? "rgba(0,200,232,0.7)" : "rgba(0,200,232,0.3)",
          background: hover ? "rgba(0,200,232,0.07)" : "#0d1a2a",
          boxShadow: hover ? "0 0 24px rgba(0,200,232,0.15), inset 0 0 16px rgba(0,200,232,0.04)" : "none",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300" style={{ background: hover ? "rgba(0,200,232,0.18)" : "rgba(0,200,232,0.1)", border: "1px solid rgba(0,200,232,0.35)", transform: hover ? "scale(1.08)" : "scale(1)", boxShadow: hover ? "0 0 16px rgba(0,200,232,0.3)" : "none" }}>
          <Upload size={28} style={{ color: "#00c8e8" }} />
        </div>
        <div>
          <p className="font-display font-semibold tracking-wide mb-1" style={{ color: "#eaf4fa" }}>גרור את קובץ ה-.inf שלך לכאן</p>
          <p className="font-body text-sm" style={{ color: "#8097ae" }}>או לחץ לבחירת קובץ</p>
        </div>
        <span className="tag-neon">MAX 50MB · .INF .STY .PRS</span>
      </div>
      <button className="w-full mt-6 btn-metal py-4 rounded-xl text-sm flex items-center justify-center gap-3">
        <span>שלח לעיבוד ← הזמן עכשיו</span>
        <ArrowLeft size={16} />
      </button>
      <p className="font-mono text-xs mt-4 text-center tracking-wider" style={{ color: "#5a7a9a" }}>התשלום מתבצע לאחר בדיקת הקובץ ואישור הצוות</p>
    </div>
  );
}

export function CustomService() {
  const ref = useReveal();

  return (
    <section id="custom" className="py-24 relative overflow-hidden" style={{ background: "#0d1a2a" }}>
      <div className="absolute top-0 inset-x-0 section-divider" />
      <div className="absolute bottom-0 inset-x-0 section-divider" />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(0,200,232,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className="reveal text-center mb-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#00c8e8" }}>// התאמה אישית</p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl mb-4" style={{ color: "#eaf4fa" }}>מקצבים שמותאמים בדיוק בשבילך</h2>
          <p className="font-body text-lg max-w-2xl mx-auto" style={{ color: "#8097ae" }}>שלח לנו את קובץ ההגדרות של האורגן שלך, והצוות שלנו ייצר עבורך חבילת מקצבים מותאמת אישית — מוכנה להתקנה.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative mb-16">
          {[33.33, 66.66].map((n) => (
            <div key={n} className="hidden md:block absolute top-16 w-[20%] h-px" style={{ left: `${n}%`, transform: "translateX(-50%)", background: "linear-gradient(90deg,transparent,rgba(0,200,232,0.5),transparent)" }} />
          ))}
          {STEPS.map((step) => (
            <StepCard key={step.n} step={step} />
          ))}
        </div>

        <div className="rounded-3xl overflow-hidden" style={{ background: "#101e30", border: "1px solid rgba(0,200,232,0.18)", boxShadow: "0 4px 30px rgba(0,0,0,0.3)" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-10 border-b lg:border-b-0 lg:border-l" style={{ borderColor: "rgba(0,200,232,0.14)" }}>
              <h3 className="font-display font-bold text-2xl mb-2" style={{ color: "#eaf4fa" }}>מה כלול בשירות?</h3>
              <p className="font-body text-sm mb-8" style={{ color: "#8097ae" }}>חבילת התאמה אישית — הכל מהכל</p>
              <ul className="space-y-4 mb-10">
                {INCLUDES.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(0,200,232,0.12)", border: "1px solid rgba(0,200,232,0.35)" }}>
                      <Check size={12} style={{ color: "#00c8e8" }} />
                    </div>
                    <span className="font-body text-sm" style={{ color: "#a0bcd0" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-end gap-3 mb-1">
                <span className="font-mono text-sm line-through" style={{ color: "#5a7a9a" }}>₪299</span>
                <span className="font-display font-black text-4xl" style={{ color: "#00c8e8", textShadow: "0 2px 14px rgba(0,200,232,0.35)" }}>₪199</span>
              </div>
              <p className="font-mono text-xs tracking-wider" style={{ color: "#5a7a9a" }}>לחבילה מלאה · מחיר השקה</p>
            </div>
            <UploadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
