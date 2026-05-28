import React, { useEffect, useRef } from 'react';

interface ShimmerOverlayProps {
  /** Increment this to play the sweep once. Initial value 0 plays nothing. */
  trigger: number;
}

const DURATION = 1150; // ms — full sweep
const BAND_HALF = 0.26; // half-width of the glitter band, fraction of viewport width

interface Spark {
  x: number; // 0..1 of width
  y: number; // 0..1 of height
  size: number;
  twPhase: number;
  twSpeed: number;
  streak: number;
  orange: boolean;
}

interface BigStar {
  x: number;
  y: number;
  at: number; // progress (0..1) of peak brightness
  span: number; // half-window of visibility in progress units
  size: number;
  orange: boolean;
}

function drawSpark(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  b: number,
  streak: number,
  orange: boolean,
) {
  const col = orange ? '255,150,70' : '255,252,245';
  const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 3);
  glow.addColorStop(0, `rgba(${col},${b})`);
  glow.addColorStop(1, `rgba(${col},0)`);
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x, y, size * 3, 0, Math.PI * 2);
  ctx.fill();

  const L = size * streak;
  ctx.strokeStyle = `rgba(${col},${b * 0.9})`;
  ctx.lineWidth = Math.max(0.6, size * 0.22);
  ctx.beginPath();
  ctx.moveTo(x - L, y);
  ctx.lineTo(x + L, y);
  ctx.moveTo(x, y - L);
  ctx.lineTo(x, y + L);
  ctx.stroke();
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

    // Sparks: density biased toward the vertical centre, where headlines sit.
    const COUNT = reduce ? 0 : 160;
    const sparks: Spark[] = Array.from({ length: COUNT }, () => ({
      x: Math.random(),
      y: (Math.random() + Math.random() + Math.random()) / 3, // ~centre-weighted
      size: 1 + Math.random() * 2.6,
      twPhase: Math.random() * Math.PI * 2,
      twSpeed: 6 + Math.random() * 10,
      streak: 4 + Math.random() * 10,
      orange: Math.random() < 0.18,
    }));

    const STAR_COUNT = reduce ? 0 : 2 + Math.floor(Math.random() * 2); // 2–3
    const stars: BigStar[] = Array.from({ length: STAR_COUNT }, () => ({
      x: 0.18 + Math.random() * 0.64,
      y: 0.18 + Math.random() * 0.64,
      at: 0.25 + Math.random() * 0.5,
      span: 0.16,
      size: 48 + Math.random() * 44,
      orange: Math.random() < 0.3,
    }));

    const start = performance.now();

    const frame = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      const env = Math.sin(Math.PI * t); // fade in then out
      const bandX = -0.2 + 1.4 * t; // centre travels from off-left to off-right

      ctx.globalCompositeOperation = 'lighter';

      // Overexposed hot core trailing the band centre.
      const coreX = bandX * W;
      const core = ctx.createLinearGradient(coreX - BAND_HALF * W, 0, coreX + BAND_HALF * W, 0);
      core.addColorStop(0, 'rgba(255,255,255,0)');
      core.addColorStop(0.5, `rgba(255,250,245,${0.3 * env})`);
      core.addColorStop(0.64, `rgba(255,120,40,${0.1 * env})`);
      core.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = core;
      ctx.fillRect(0, 0, W, H);

      for (const p of sparks) {
        const dx = Math.abs(p.x - bandX);
        if (dx > BAND_HALF) continue;
        const proximity = 1 - dx / BAND_HALF;
        const tw = 0.5 + 0.5 * Math.sin(p.twPhase + t * p.twSpeed * Math.PI);
        const b = proximity * tw * env;
        if (b <= 0.02) continue;
        drawSpark(ctx, p.x * W, p.y * H, p.size * (0.8 + proximity), b, p.streak * proximity, p.orange);
      }

      for (const s of stars) {
        const d = Math.abs(t - s.at);
        if (d > s.span) continue;
        const b = (1 - d / s.span) * env;
        drawBigStar(ctx, s.x * W, s.y * H, s.size, b, s.orange);
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
