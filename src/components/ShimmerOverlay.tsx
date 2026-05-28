import React, { useEffect, useRef } from 'react';

interface ShimmerOverlayProps {
  /** Increment this to play the sweep once. Initial value 0 plays nothing. */
  trigger: number;
}

const BURST_MS = 1200; // duration of each sparkle burst
const GIVE_UP_MS = 2600; // stop waiting for the incoming slide after this
const MAX_PARTICLES = 520;
const SLIDE_SELECTOR = '[data-shimmer-slide]';

// Soft warm beige drawn from the slide palette, plus the deck's orange accent.
const BEIGE = '224,206,184';
const SPARK_ORANGE = '232,120,40';

interface Particle {
  x: number;
  y: number;
  size: number;
  streak: number;
  twPhase: number;
  twSpeed: number;
  brightness: number;
  orange: boolean;
}

function clamp(v: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, v));
}

function smoothstep(e: number) {
  return e * e * (3 - 2 * e);
}

/** Asymmetric envelope: ramp up over the first 1/3, ramp down over the last 2/3. */
function rampEnv(local: number) {
  if (local <= 0 || local >= 1) return 0;
  const up = clamp(local / (1 / 3), 0, 1);
  const down = clamp((1 - local) / (2 / 3), 0, 1);
  return smoothstep(Math.min(up, down));
}

/** Growth factor: 0 → 1 over the ramp-up third, then held at full size. */
function growFactor(local: number) {
  return smoothstep(clamp(local / (1 / 3), 0, 1));
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

/** Build particles scattered across text rects, weighted by line width. */
function makeParticles(rects: DOMRect[]): Particle[] {
  const mk = (x: number, y: number): Particle => ({
    x,
    y,
    size: 0.8 + Math.random() * 2.6,
    streak: 14 + Math.random() * 60,
    twPhase: Math.random() * Math.PI * 2,
    twSpeed: 5 + Math.random() * 9,
    brightness: 0.5 + Math.random() * 0.5,
    orange: Math.random() < 0.16,
  });

  const total = rects.reduce((s, r) => s + r.width, 0);
  const out: Particle[] = [];
  if (!total) return out;
  for (const r of rects) {
    const n = Math.max(1, Math.round(MAX_PARTICLES * (r.width / total)));
    for (let i = 0; i < n; i++) {
      out.push(mk(r.left + Math.random() * r.width, r.top + (0.2 + Math.random() * 0.6) * r.height));
    }
  }
  return out.slice(0, MAX_PARTICLES);
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
  const col = orange ? SPARK_ORANGE : BEIGE;
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
  const col = orange ? '232,120,40' : '214,170,110';
  const core = ctx.createRadialGradient(x, y, 0, x, y, size);
  core.addColorStop(0, `rgba(245,228,196,${b})`);
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
    grad.addColorStop(0.5, `rgba(245,228,196,${b})`);
    grad.addColorStop(1, `rgba(${col},0)`);
    ctx.strokeStyle = grad;
    ctx.lineWidth = axis ? 2.4 : 1.2;
    ctx.beginPath();
    ctx.moveTo(x - ux * L, y - uy * L);
    ctx.lineTo(x + ux * L, y + uy * L);
    ctx.stroke();
  }
}

function drawBurst(
  ctx: CanvasRenderingContext2D,
  particles: Particle[],
  local: number,
  nowS: number,
) {
  const env = rampEnv(local);
  if (env <= 0) return;
  const grow = growFactor(local);
  for (const p of particles) {
    const tw = 0.5 + 0.5 * Math.sin(p.twPhase + nowS * p.twSpeed);
    const b = env * tw * p.brightness;
    if (b <= 0.02) continue;
    drawStarburst(ctx, p.x, p.y, p.size * (0.12 + 0.88 * grow), p.streak * (0.2 + 0.8 * grow), b, p.orange);
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

    // Burst A: the outgoing slide (still mounted now, before AnimatePresence swaps it).
    const outgoingEl = document.querySelector(SLIDE_SELECTOR);
    const aParticles = reduce || !outgoingEl ? [] : makeParticles(sampleTextRects(outgoingEl));

    // Burst B: seeded once the incoming slide mounts.
    let bParticles: Particle[] = [];
    let bSeeded = false;
    let bStart = 0;

    const stars = Array.from({ length: reduce ? 0 : 2 + Math.floor(Math.random() * 2) }, () => ({
      x: 0.18 + Math.random() * 0.64,
      y: 0.2 + Math.random() * 0.55,
      at: 0.28 + Math.random() * 0.45, // fraction of the estimated total window
      span: 0.16,
      size: 46 + Math.random() * 44,
      orange: Math.random() < 0.3,
    }));

    const aStart = performance.now();
    const estTotal = BURST_MS + 700; // rough window for star timing

    const frame = (now: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const nowS = now / 1000;

      const localA = (now - aStart) / BURST_MS;

      if (!bSeeded && !reduce) {
        const el = document.querySelector(SLIDE_SELECTOR);
        if (el && el !== outgoingEl) {
          bParticles = makeParticles(sampleTextRects(el));
          if (bParticles.length) {
            bSeeded = true;
            bStart = now;
          }
        }
      }

      drawBurst(ctx, aParticles, localA, nowS);
      if (bSeeded) drawBurst(ctx, bParticles, (now - bStart) / BURST_MS, nowS);

      const starWindow = clamp((now - aStart) / estTotal, 0, 1);
      const starEnv = rampEnv(starWindow);
      for (const s of stars) {
        const d = Math.abs(starWindow - s.at);
        if (d > s.span) continue;
        drawBigStar(ctx, s.x * W, s.y * H, s.size, (1 - d / s.span) * Math.max(starEnv, 0.3), s.orange);
      }

      const aDone = localA >= 1;
      const bDone = bSeeded ? (now - bStart) / BURST_MS >= 1 : now - aStart > GIVE_UP_MS;
      if (aDone && bDone) {
        ctx.clearRect(0, 0, W, H);
      } else {
        rafRef.current = requestAnimationFrame(frame);
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
