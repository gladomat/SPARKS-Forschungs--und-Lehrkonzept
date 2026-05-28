import React, { useEffect, useRef } from 'react';

interface ShimmerOverlayProps {
  /** Increment this to play the sweep once. Initial value 0 plays nothing. */
  trigger: number;
}

const DURATION = 1800; // ms — full dissolve + reconstruct
const MAX_PARTICLES = 520;
const SLIDE_SELECTOR = '[data-shimmer-slide]';

interface Particle {
  ox: number;
  oy: number;
  tx: number;
  ty: number;
  size: number;
  streak: number;
  twPhase: number;
  twSpeed: number;
  brightness: number;
  orange: boolean;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/** Line-level bounding rects of every visible text node under `root`. */
function sampleTextRects(root: Element): DOMRect[] {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const rects: DOMRect[] = [];
  let node = walker.nextNode();
  while (node) {
    const text = node.nodeValue?.trim();
    if (text) {
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const r of Array.from(range.getClientRects())) {
        if (r.width > 2 && r.height > 2) rects.push(r);
      }
    }
    node = walker.nextNode();
  }
  return rects;
}

/** Scatter `count` seed points across text rects, weighted by line width. */
function seedFromRects(rects: DOMRect[], count: number): Array<{ x: number; y: number }> {
  const pts: Array<{ x: number; y: number }> = [];
  const total = rects.reduce((s, r) => s + r.width, 0);
  if (!total) {
    // Fallback: a soft band across the middle of the screen.
    for (let i = 0; i < count; i++) {
      pts.push({
        x: window.innerWidth * (0.15 + Math.random() * 0.7),
        y: window.innerHeight * (0.35 + Math.random() * 0.3),
      });
    }
    return pts;
  }
  for (const r of rects) {
    const n = Math.max(1, Math.round(count * (r.width / total)));
    for (let i = 0; i < n; i++) {
      pts.push({
        x: r.left + Math.random() * r.width,
        y: r.top + (0.2 + Math.random() * 0.6) * r.height,
      });
    }
  }
  return pts;
}

function drawStarburst(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  streak: number,
  alpha: number,
  orange: boolean,
) {
  const col = orange ? '255,150,70' : '255,255,255';
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-Math.PI / 4);

  const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 9);
  glow.addColorStop(0, `rgba(${col},${alpha})`);
  glow.addColorStop(0.35, `rgba(${col},${alpha * 0.28})`);
  glow.addColorStop(1, `rgba(${col},0)`);
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, size * 9, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = `rgba(${col},${alpha})`;
  ctx.lineCap = 'round';
  ctx.lineWidth = Math.max(0.7, size * 0.45);
  ctx.beginPath();
  ctx.moveTo(-streak, 0);
  ctx.lineTo(streak, 0);
  ctx.moveTo(0, -streak * 0.65);
  ctx.lineTo(0, streak * 0.65);
  ctx.stroke();

  ctx.globalAlpha = alpha * 0.45;
  ctx.lineWidth = 0.6;
  ctx.beginPath();
  ctx.moveTo(-streak * 0.55, -size * 3);
  ctx.lineTo(streak * 0.55, size * 3);
  ctx.moveTo(-size * 3, -streak * 0.4);
  ctx.lineTo(size * 3, streak * 0.4);
  ctx.stroke();

  ctx.restore();
}

function drawBigStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  b: number,
  orange: boolean,
) {
  const col = orange ? '255,170,90' : '255,255,252';
  const core = ctx.createRadialGradient(x, y, 0, x, y, size);
  core.addColorStop(0, `rgba(255,255,255,${b})`);
  core.addColorStop(0.18, `rgba(${col},${b * 0.85})`);
  core.addColorStop(1, `rgba(${col},0)`);
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();

  const rays: Array<[number, number]> = [
    [1, 0],
    [0, 1],
    [0.7071, 0.7071],
    [-0.7071, 0.7071],
  ];
  for (const [ux, uy] of rays) {
    const axis = ux === 0 || uy === 0;
    const L = size * (axis ? 3.4 : 2.0);
    const grad = ctx.createLinearGradient(x - ux * L, y - uy * L, x + ux * L, y + uy * L);
    grad.addColorStop(0, `rgba(${col},0)`);
    grad.addColorStop(0.5, `rgba(255,255,255,${b})`);
    grad.addColorStop(1, `rgba(${col},0)`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = axis ? 2.4 : 1.2;
    ctx.beginPath();
    ctx.moveTo(x - ux * L, y - uy * L);
    ctx.lineTo(x + ux * L, y + uy * L);
    ctx.stroke();
  }
}

export const ShimmerOverlay: React.FC<ShimmerOverlayProps> = ({ trigger }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (trigger === 0) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;

    // Outgoing slide: capture now, before it unmounts.
    const outgoingEl = document.querySelector(SLIDE_SELECTOR);
    const fromRects = outgoingEl ? sampleTextRects(outgoingEl) : [];
    const fromPts = seedFromRects(fromRects, MAX_PARTICLES).slice(0, MAX_PARTICLES);

    const particles: Particle[] = fromPts.map((p) => ({
      ox: p.x,
      oy: p.y,
      tx: p.x,
      ty: p.y,
      size: 0.8 + Math.random() * 2.6,
      streak: 14 + Math.random() * 60,
      twPhase: Math.random() * Math.PI * 2,
      twSpeed: 5 + Math.random() * 9,
      brightness: 0.5 + Math.random() * 0.5,
      orange: Math.random() < 0.16,
    }));

    const stars = Array.from({ length: reduce ? 0 : 2 + Math.floor(Math.random() * 2) }, () => ({
      x: 0.18 + Math.random() * 0.64,
      y: 0.2 + Math.random() * 0.55,
      at: 0.3 + Math.random() * 0.45,
      span: 0.16,
      size: 46 + Math.random() * 44,
      orange: Math.random() < 0.3,
    }));

    let migrated = false;
    let migrateStart = 0;
    const start = performance.now();

    const frame = (now: number) => {
      const t = clamp((now - start) / DURATION, 0, 1);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const env = Math.sin(Math.PI * t);

      // Once the incoming slide has mounted, retarget particles onto its text.
      if (!migrated) {
        const el = document.querySelector(SLIDE_SELECTOR);
        if (el && el !== outgoingEl) {
          const toPts = seedFromRects(sampleTextRects(el), particles.length);
          if (toPts.length) {
            particles.forEach((p, i) => {
              const tp = toPts[i % toPts.length];
              p.tx = tp.x;
              p.ty = tp.y;
            });
            migrated = true;
            migrateStart = t;
          }
        }
      }

      // Dark scrim so white starbursts read against the light deck; peaks mid-sweep.
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = `rgba(7,9,14,${env * 0.5})`;
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = 'lighter';

      const mp = migrated
        ? easeInOutCubic(clamp((t - migrateStart) / Math.max(0.001, 1 - migrateStart), 0, 1))
        : 0;

      for (const p of particles) {
        const tw = 0.5 + 0.5 * Math.sin(p.twPhase + t * p.twSpeed * Math.PI);
        const b = env * tw * p.brightness;
        if (b <= 0.02) continue;
        const x = lerp(p.ox, p.tx, mp);
        const y = lerp(p.oy, p.ty, mp) + Math.sin(t * 6 + p.twPhase) * 6 * (1 - Math.abs(mp - 0.5) * 2);
        drawStarburst(ctx, x, y, p.size, p.streak * (0.5 + env * 0.5), b, p.orange);
      }

      for (const s of stars) {
        const d = Math.abs(t - s.at);
        if (d > s.span) continue;
        drawBigStar(ctx, s.x * W, s.y * H, s.size, (1 - d / s.span) * env, s.orange);
      }

      ctx.globalCompositeOperation = 'source-over';

      if (t < 1) {
        rafRef.current = requestAnimationFrame(frame);
      } else {
        ctx.clearRect(0, 0, W, H);
      }
    };

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
    };
  }, [trigger]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[60]" />;
};
