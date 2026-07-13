import React, { useRef, useEffect } from "react";

interface VisualizerProps {
  barCount?: number;
  className?: string;
  isPlaying?: boolean;
  light?: boolean;
}

export function Visualizer({ barCount = 48, className = "", isPlaying = true, light = false }: VisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const barsRef = useRef<{ h: number; target: number; speed: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    barsRef.current = Array.from({ length: barCount }, () => ({
      h: Math.random() * 0.3 + 0.05,
      target: Math.random() * 0.8 + 0.1,
      speed: Math.random() * 0.04 + 0.01,
    }));

    const draw = () => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      const barW = (width - (barCount - 1) * 3) / barCount;

      barsRef.current.forEach((bar, i) => {
        if (isPlaying) {
          bar.h += (bar.target - bar.h) * bar.speed;
          if (Math.abs(bar.h - bar.target) < 0.01) {
            bar.target = Math.random() * 0.85 + 0.08;
            bar.speed = Math.random() * 0.04 + 0.015;
          }
        } else {
          bar.h += (0.08 - bar.h) * 0.05;
        }

        const x = i * (barW + 3);
        const barH = bar.h * height;
        const y = height - barH;

        const grad = ctx.createLinearGradient(0, height, 0, y);
        if (light) {
          grad.addColorStop(0, "rgba(0,160,200,0.15)");
          grad.addColorStop(0.5, "rgba(0,200,232,0.7)");
          grad.addColorStop(1, "rgba(0,200,232,1)");
          ctx.shadowColor = "rgba(0,200,232,0.4)";
        } else {
          grad.addColorStop(0, "rgba(0,229,255,0.15)");
          grad.addColorStop(0.5, "rgba(0,229,255,0.7)");
          grad.addColorStop(1, "rgba(0,229,255,1)");
          ctx.shadowColor = "#00e5ff";
        }
        ctx.shadowBlur = light ? 5 : 8;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barW, barH, 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [barCount, isPlaying, light]);

  return <canvas ref={canvasRef} className={`w-full ${className}`} />;
}
