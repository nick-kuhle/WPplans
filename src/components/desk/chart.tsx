import { useEffect, useRef } from "react";
import type { Candle } from "@/lib/wolfpit/types";

export function PitChart({ candles, height = 280 }: { candles: Candle[]; height?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const dpr = window.devicePixelRatio || 1;
    const w = parent.clientWidth;
    const h = height;
    canvas.width = Math.max(1, Math.floor(w * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#101210";
    ctx.fillRect(0, 0, w, h);
    if (candles.length < 2) return;
    const padL = 8;
    const padR = 56;
    const padT = 10;
    const padB = 18;
    const slice = candles.slice(-120);
    let lo = Math.min(...slice.map((c) => c.l));
    let hi = Math.max(...slice.map((c) => c.h));
    const pad = (hi - lo) * 0.06 || 1;
    lo -= pad;
    hi += pad;
    const plotW = w - padL - padR;
    const plotH = h - padT - padB;
    const x = (i: number) => padL + (i / (slice.length - 1)) * plotW;
    const y = (p: number) => padT + ((hi - p) / (hi - lo)) * plotH;
    ctx.strokeStyle = "#262826";
    ctx.lineWidth = 1;
    ctx.font = "10px 'IBM Plex Mono', monospace";
    ctx.fillStyle = "#6b6b62";
    for (let i = 0; i < 4; i++) {
      const p = lo + ((hi - lo) * i) / 3;
      const yy = y(p);
      ctx.beginPath();
      ctx.moveTo(padL, yy);
      ctx.lineTo(w - padR, yy);
      ctx.stroke();
      ctx.fillText(p >= 100 ? p.toFixed(0) : p.toFixed(2), w - padR + 6, yy + 3);
    }
    const cw = Math.max(2, plotW / slice.length - 1.5);
    slice.forEach((c, i) => {
      const up = c.c >= c.o;
      ctx.strokeStyle = up ? "#3f9d6e" : "#c45c52";
      ctx.fillStyle = up ? "#3f9d6e" : "#c45c52";
      const xc = x(i);
      ctx.beginPath();
      ctx.moveTo(xc, y(c.h));
      ctx.lineTo(xc, y(c.l));
      ctx.stroke();
      const top = y(Math.max(c.o, c.c));
      const bot = y(Math.min(c.o, c.c));
      ctx.fillRect(xc - cw / 2, top, cw, Math.max(1, bot - top));
    });
  }, [candles, height]);

  return <canvas ref={ref} className="block w-full" />;
}
