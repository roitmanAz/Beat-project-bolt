import React from "react";
import { Music, Send, Instagram, Youtube, Facebook, Twitter } from "lucide-react";
import { Logo } from "./Logo";

const FOOTER_LINKS: Record<string, string[]> = {
  קטלוג: ["מקצבים בודדים", "סטים וחבילות", "מסנן לפי ז'אנר", "מבצעים"],
  שירותים: ["התאמה אישית", "ייעוץ מוזיקלי", "תמיכה טכנית", "API למפתחים"],
  מידע: ["בלוג", "תיק עבודות", "אודותינו", "צור קשר"],
};

const SOCIALS = [
  { Icon: Instagram, label: "Instagram" },
  { Icon: Youtube, label: "YouTube" },
  { Icon: Facebook, label: "Facebook" },
  { Icon: Twitter, label: "Twitter/X" },
];

const MODELS = ["PSR-SX900", "PSR-SX700", "Genos", "Genos 2", "Tyros 5", "CVP-900"];

export function Footer() {
  return (
    <footer id="contact" className="relative" style={{ background: "#080f1a" }}>
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(0,200,232,0.5),rgba(184,201,217,0.3),rgba(0,200,232,0.5),transparent)" }} />

      {/* Newsletter */}
      <div className="py-16 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="font-mono text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "#00c8e8" }}>// הישאר מעודכן</p>
          <h3 className="font-display font-bold text-3xl sm:text-4xl mb-3" style={{ color: "#eaf4fa" }}>מקצבים חדשים כל שבוע</h3>
          <p className="font-body mb-8" style={{ color: "rgba(184,201,217,0.65)" }}>הירשם לניוזלטר וקבל גישה מוקדמת למקצבים חדשים, הנחות בלעדיות וטיפים מקצועיים.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="הכנס את כתובת האימייל שלך..."
              className="flex-1 px-5 py-3.5 rounded-xl font-body text-sm outline-none"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(0,200,232,0.2)", color: "#eaf4fa", backdropFilter: "blur(10px)" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(0,200,232,0.6)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(0,200,232,0.2)")}
            />
            <button type="submit" className="btn-metal px-6 py-3.5 rounded-xl text-sm flex items-center gap-2 justify-center flex-shrink-0">
              <span>הירשם</span>
              <Send size={14} />
            </button>
          </form>
          <p className="font-mono text-xs mt-4" style={{ color: "rgba(184,201,217,0.28)" }}>ללא ספאם. ביטול בכל עת.</p>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mb-16">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "linear-gradient(135deg,#071428,#0a1c38)", border: "1.5px solid rgba(0,200,232,0.4)", boxShadow: "0 0 10px rgba(0,200,232,0.2)" }}>
                <Music size={18} style={{ color: "#00c8e8" }} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display font-bold text-lg text-gradient-silver tracking-widest">YT</span>
                <span className="font-display font-medium text-[10px] tracking-[0.3em] uppercase" style={{ color: "#00c8e8" }}>Beats</span>
              </div>
            </div>
            <p className="font-body text-sm leading-relaxed mb-6 max-w-xs" style={{ color: "rgba(184,201,217,0.6)", direction: "rtl" }}>
              הפלטפורמה המקצועית היחידה שמתמחה במקצבים, סגנונות וחבילות הרחבה לאורגן יאמהה.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-250"
                  style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(184,201,217,0.5)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#00c8e8"; e.currentTarget.style.borderColor = "rgba(0,200,232,0.4)"; e.currentTarget.style.boxShadow = "0 0 12px rgba(0,200,232,0.2)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(184,201,217,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="mt-8">
              <p className="font-mono text-xs tracking-wider mb-3" style={{ color: "rgba(184,201,217,0.3)" }}>דגמים נתמכים:</p>
              <div className="flex flex-wrap gap-2">
                {MODELS.map((m) => (
                  <span key={m} className="text-xs font-mono tracking-widest uppercase px-2 py-0.5 rounded" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(184,201,217,0.4)" }}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-semibold text-xs tracking-[0.2em] uppercase mb-5" style={{ color: "rgba(184,201,217,0.6)" }}>{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-sm flex items-center gap-1.5 group transition-colors"
                      style={{ color: "rgba(184,201,217,0.45)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#00c8e8")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(184,201,217,0.45)")}
                    >
                      <span className="w-1 h-1 rounded-full flex-shrink-0 transition-colors" style={{ background: "rgba(0,200,232,0.3)" }} />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="h-px mb-6" style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent)" }} />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-center sm:text-right" style={{ color: "rgba(184,201,217,0.25)" }}>© 2025 YT Beats. כל הזכויות שמורות. | עוצב ופותח בישראל</p>
          <div className="flex items-center gap-6">
            {["תנאי שימוש", "מדיניות פרטיות", "מדיניות זכויות יוצרים"].map((link) => (
              <a key={link} href="#" className="font-mono text-xs transition-colors" style={{ color: "rgba(184,201,217,0.25)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(184,201,217,0.6)")} onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(184,201,217,0.25)")}>{link}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
