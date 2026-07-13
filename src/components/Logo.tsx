import React from "react";

const BARS = [0.42, 0.68, 0.92, 0.55, 0.78, 0.35, 0.85, 0.62, 0.48, 0.73, 0.9, 0.38, 0.66, 0.82, 0.5, 0.7, 0.95, 0.45, 0.6, 0.88, 0.4, 0.75, 0.52, 0.8];
const BAR_W = 4.2;
const GAP = 2.6;

export function Logo({ size = 40, className = "", animated = true }: { size?: number; className?: string; animated?: boolean }) {
  const totalW = BARS.length * BAR_W + (BARS.length - 1) * GAP;
  const startX = 100 - totalW / 2;

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} className={className} xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible", display: "block" }}>
      <defs>
        <linearGradient id="ytMetalRing" x1="15%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#4a6070" />
          <stop offset="20%" stopColor="#a0bcd0" />
          <stop offset="38%" stopColor="#ddeef8" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#c8dcea" />
          <stop offset="82%" stopColor="#8097ae" />
          <stop offset="100%" stopColor="#3a5060" />
        </linearGradient>
        <linearGradient id="ytInnerRim" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a3248" />
          <stop offset="50%" stopColor="#3a5870" />
          <stop offset="100%" stopColor="#0e1e2a" />
        </linearGradient>
        <radialGradient id="ytBg" cx="40%" cy="32%" r="70%">
          <stop offset="0%" stopColor="#163260" />
          <stop offset="45%" stopColor="#08203e" />
          <stop offset="100%" stopColor="#030c1a" />
        </radialGradient>
        <linearGradient id="ytText" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#e4f2fa" />
          <stop offset="22%" stopColor="#c0d8ea" />
          <stop offset="52%" stopColor="#8097ae" />
          <stop offset="80%" stopColor="#5a7888" />
          <stop offset="100%" stopColor="#384a58" />
        </linearGradient>
        <filter id="ytGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="ytTextGlow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="ytClip">
          <circle cx="100" cy="100" r="88" />
        </clipPath>
      </defs>
      {animated && (
        <style>{`
          .ytb{transform-origin:50% 50%;animation:ytbp var(--d,1.4s) ease-in-out infinite var(--dl,0s)}
          @keyframes ytbp{0%,100%{transform:scaleY(0.2)}50%{transform:scaleY(1)}}
          .ytrp{animation:ytrpa 2.8s ease-in-out infinite}
          @keyframes ytrpa{0%,100%{opacity:.8}50%{opacity:1}}
          .ytdp{animation:ytdpa 2.8s ease-in-out infinite var(--dp,0s)}
          @keyframes ytdpa{0%,100%{opacity:.6}50%{opacity:1}}
        `}</style>
      )}
      <circle cx="100" cy="100" r="99.5" fill="url(#ytMetalRing)" />
      <circle cx="100" cy="100" r="92" fill="url(#ytInnerRim)" />
      <circle cx="100" cy="100" r="88" fill="url(#ytBg)" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="#00e5ff" strokeWidth="1.8" opacity="0.92" filter="url(#ytGlow)" className="ytrp" />
      <circle cx="100" cy="100" r="76" fill="none" stroke="#00d4f0" strokeWidth="0.9" opacity="0.38" />
      <circle cx="100" cy="100" r="68" fill="none" stroke="#00c8e4" strokeWidth="0.7" opacity="0.28" />
      <circle cx="100" cy="100" r="57" fill="none" stroke="#00e5ff" strokeWidth="1.9" opacity="0.88" filter="url(#ytGlow)" />
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={deg}
            x1={100 + 80 * Math.sin(rad)}
            y1={100 - 80 * Math.cos(rad)}
            x2={100 + 85 * Math.sin(rad)}
            y2={100 - 85 * Math.cos(rad)}
            stroke="#00e5ff"
            strokeWidth="1.2"
            opacity="0.55"
          />
        );
      })}
      {[
        { cx: 100, cy: 16, dp: "0s" },
        { cx: 184, cy: 100, dp: "0.7s" },
        { cx: 100, cy: 184, dp: "1.4s" },
        { cx: 16, cy: 100, dp: "2.1s" },
      ].map(({ cx, cy, dp }) => (
        <circle key={`${cx}${cy}`} cx={cx} cy={cy} r="3" fill="#00e5ff" filter="url(#ytGlow)" className="ytdp" style={{ ["--dp" as string]: dp }} />
      ))}
      <g clipPath="url(#ytClip)" opacity="0.55">
        {BARS.map((h, i) => {
          const x = startX + i * (BAR_W + GAP);
          const barH = h * 28;
          return (
            <rect
              key={i}
              x={x}
              y={100 - barH / 2}
              width={BAR_W}
              height={barH}
              rx="1.4"
              fill="white"
              opacity={0.3 + h * 0.5}
              className={animated ? "ytb" : undefined}
              style={animated ? { ["--d" as string]: `${1.1 + (i % 5) * 0.12}s`, ["--dl" as string]: `${(i * 0.04) % 0.8}s` } : undefined}
            />
          );
        })}
      </g>
      <text x="102" y="122" textAnchor="middle" fontFamily="'Arial Black',Impact,'Helvetica Neue',sans-serif" fontSize="70" fontWeight="900" letterSpacing="-2" fill="#010810" opacity="0.75">YT</text>
      <text x="101" y="121" textAnchor="middle" fontFamily="'Arial Black',Impact,'Helvetica Neue',sans-serif" fontSize="70" fontWeight="900" letterSpacing="-2" fill="#0d2844">YT</text>
      <text x="100" y="120" textAnchor="middle" fontFamily="'Arial Black',Impact,'Helvetica Neue',sans-serif" fontSize="70" fontWeight="900" letterSpacing="-2" fill="none" stroke="#00e5ff" strokeWidth="2.5" opacity="0.45" filter="url(#ytTextGlow)">YT</text>
      <text x="100" y="120" textAnchor="middle" fontFamily="'Arial Black',Impact,'Helvetica Neue',sans-serif" fontSize="70" fontWeight="900" letterSpacing="-2" fill="url(#ytText)">YT</text>
    </svg>
  );
}
