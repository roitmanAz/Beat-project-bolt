import React, { useState, useEffect } from "react";
import { Menu, X, ShoppingBag } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { label: "דף הבית", href: "#home" },
  { label: "קטלוג", href: "#catalog" },
  { label: "התאמה אישית", href: "#custom" },
  { label: "תיק עבודות", href: "#showcase" },
  { label: "בלוג", href: "#blog" },
  { label: "צור קשר", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount] = useState(2);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-400" style={scrolled ? { background: "rgba(10,20,32,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,200,232,0.18)", boxShadow: "0 4px 24px rgba(0,0,0,0.4)" } : {}}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        <a href="#home" className="flex items-center gap-3 group flex-shrink-0">
          <div className="transition-transform duration-300 group-hover:scale-110" style={{ filter: "drop-shadow(0 0 8px rgba(0,200,232,0.3))" }}>
            <Logo size={52} animated={true} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-[15px] tracking-[0.28em] text-gradient-silver">YT</span>
            <span className="font-display font-semibold text-[9px] tracking-[0.38em] uppercase" style={{ color: "#0098b8" }}>Beats</span>
          </div>
        </a>

        <div className="hidden lg:flex items-center flex-1 justify-center">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative px-4 py-2.5 font-body font-medium text-sm tracking-wide group transition-colors duration-200"
              style={{ color: "#a0bcd0" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#00c8e8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#a0bcd0")}
            >
              {item.label}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4 transition-all duration-300 rounded-full" style={{ background: "linear-gradient(90deg,transparent,#00c8e8,transparent)" }} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105" style={{ background: "#101e30", border: "1px solid rgba(0,200,232,0.2)", boxShadow: "0 1px 6px rgba(0,0,0,0.3)" }}>
            <ShoppingBag size={18} style={{ color: "#a0bcd0" }} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold text-white" style={{ background: "linear-gradient(135deg,#00c8e8,#0098b8)" }}>
                {cartCount}
              </span>
            )}
          </button>
          <button className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "#101e30", border: "1px solid rgba(0,200,232,0.2)" }} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="lg:hidden border-t" style={{ background: "rgba(10,20,32,0.98)", backdropFilter: "blur(20px)", borderColor: "rgba(0,200,232,0.15)" }}>
          <div className="px-4 py-4 space-y-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 rounded-xl font-body font-medium text-sm transition-colors"
                style={{ color: "#2a4060" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#007a90")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#2a4060")}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
