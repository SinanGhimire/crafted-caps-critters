/**
 * ECHO creature art — one flat, hand-drawn visual language for the whole roster.
 *
 * Every foe is drawn at runtime on a canvas in the ECHO style: solid colour
 * blocks, one uniform heavy outline, no gradients, no gloss, chunky readable
 * silhouettes with stubby black legs and big expressive eyes.
 *
 * Each creature is emitted as three horizontal sprite strips:
 *   idle  — 10 frames (breathe, blink, antenna/wing idle)
 *   walk  — 20 frames (waddle bounce, leg swing, body lean, arm swing)
 *   death — 30 frames (stagger, tip, squash, deflate)
 */

import type { CritterDesign } from "./critters";

export const FRAME = 112;
export const IDLE_FRAMES = 10;
export const WALK_FRAMES = 20;
export const DEATH_FRAMES = 30;

const OUTLINE = "#150f1a";
const LIMB = "#150f1a";
const WHITE = "#fdf7ff";

const TAU = Math.PI * 2;

interface Pose {
  /** vertical body offset (px, negative = up) */
  bob: number;
  /** body squash: >1 wider */
  sx: number;
  sy: number;
  /** whole-body tilt in radians */
  tilt: number;
  /** leg swing, -1..1 */
  step: number;
  /** 0 open .. 1 shut */
  blink: number;
  /** wing / arm flap phase */
  flap: number;
  /** 0 alive .. 1 gone */
  die: number;
}

function shadeOf(d: CritterDesign) {
  return d.shade ?? "#2a2233";
}

/* ------------------------------ primitives -------------------------------- */

function inked(
  g: CanvasRenderingContext2D,
  fill: string,
  path: () => void,
  lw = 6,
) {
  g.beginPath();
  path();
  g.closePath();
  g.fillStyle = fill;
  g.fill();
  g.lineJoin = "round";
  g.lineCap = "round";
  g.lineWidth = lw;
  g.strokeStyle = OUTLINE;
  g.stroke();
}

function ellipse(
  g: CanvasRenderingContext2D,
  fill: string,
  x: number,
  y: number,
  rx: number,
  ry: number,
  lw = 6,
) {
  inked(g, fill, () => g.ellipse(x, y, rx, ry, 0, 0, TAU), lw);
}

/* --------------------------------- parts ---------------------------------- */

function drawLegs(g: CanvasRenderingContext2D, d: CritterDesign, p: Pose, bw: number, baseY: number) {
  if (d.legs === "none") return;
  const spread = bw * 0.42;
  const pairs: number[] = d.legs === "many" ? [-1, -0.33, 0.33, 1] : [-1, 1];
  pairs.forEach((s, i) => {
    const swing = p.step * (i % 2 === 0 ? 1 : -1) * 5;
    const lift = Math.max(0, p.step * (i % 2 === 0 ? 1 : -1)) * 4;
    const x = s * spread * (d.legs === "many" ? 0.9 : 1);
    inked(
      g,
      LIMB,
      () => {
        g.roundRect(x - 5 + swing * 0.4, baseY - 12, 10, 14 - lift, 5);
      },
      5,
    );
    inked(
      g,
      LIMB,
      () => g.ellipse(x + swing, baseY + 1 - lift, 9, 5.5, 0, 0, TAU),
      5,
    );
  });
}

function drawArms(g: CanvasRenderingContext2D, d: CritterDesign, p: Pose, bw: number, cy: number) {
  if (!d.arms) return;
  const swing = p.step * 8;
  for (const s of [-1, 1]) {
    const x = s * bw * 0.52;
    const y = cy + 6 + s * swing * 0.5;
    inked(g, LIMB, () => g.ellipse(x, y, 7, 10, s * 0.35, 0, TAU), 5);
    if (d.claws) {
      inked(g, LIMB, () => {
        g.moveTo(x + s * 5, y + 8);
        g.lineTo(x + s * 12, y + 15);
        g.lineTo(x + s * 2, y + 13);
      }, 4);
    }
  }
}

function drawWings(g: CanvasRenderingContext2D, d: CritterDesign, p: Pose, bw: number, cy: number) {
  if (!d.wings) return;
  const open = 0.55 + Math.sin(p.flap * TAU) * 0.45;
  const shade = shadeOf(d);
  for (const s of [-1, 1]) {
    g.save();
    g.translate(s * bw * 0.62, cy - 4);
    g.scale(s, 1);
    g.rotate(-0.5 + open * 0.6);
    inked(g, shade, () => {
      g.moveTo(0, 0);
      g.quadraticCurveTo(26, -20, 40, -4);
      g.quadraticCurveTo(28, 2, 30, 14);
      g.quadraticCurveTo(18, 6, 12, 16);
      g.quadraticCurveTo(6, 6, 0, 10);
    }, 5);
    g.restore();
  }
}

function drawCrown(g: CanvasRenderingContext2D, d: CritterDesign, p: Pose, bw: number, topY: number) {
  const body = d.body;
  const shade = shadeOf(d);
  switch (d.crown) {
    case "horns":
    case "hornsteel":
    case "shards":
    case "spikes": {
      for (const s of [-1, 1]) {
        inked(g, d.crown === "shards" ? shade : body, () => {
          g.moveTo(s * bw * 0.44, topY + 12);
          g.lineTo(s * bw * 0.66, topY - 22);
          g.lineTo(s * bw * 0.2, topY + 4);
        }, 5);
      }
      break;
    }
    case "ears": {
      for (const s of [-1, 1]) {
        inked(g, body, () => {
          g.moveTo(s * bw * 0.4, topY + 14);
          g.quadraticCurveTo(s * bw * 0.78, topY - 26, s * bw * 0.14, topY + 2);
        }, 5);
      }
      break;
    }
    case "antenna": {
      for (const s of [-1, 1]) {
        const wob = Math.sin(p.flap * TAU + s) * 4;
        g.beginPath();
        g.moveTo(s * bw * 0.2, topY + 6);
        g.quadraticCurveTo(s * bw * 0.4, topY - 16, s * bw * 0.3 + wob, topY - 28);
        g.lineWidth = 5;
        g.strokeStyle = OUTLINE;
        g.lineCap = "round";
        g.stroke();
        ellipse(g, d.core ?? body, s * bw * 0.3 + wob, topY - 30, 6, 6, 4);
      }
      break;
    }
    case "crown": {
      inked(g, "#f4c65a", () => {
        g.moveTo(-bw * 0.42, topY + 8);
        g.lineTo(-bw * 0.42, topY - 12);
        g.lineTo(-bw * 0.2, topY + 1);
        g.lineTo(0, topY - 18);
        g.lineTo(bw * 0.2, topY + 1);
        g.lineTo(bw * 0.42, topY - 12);
        g.lineTo(bw * 0.42, topY + 8);
      }, 5);
      break;
    }
    case "fin": {
      inked(g, shade, () => {
        g.moveTo(-bw * 0.3, topY + 10);
        g.quadraticCurveTo(0, topY - 30, bw * 0.3, topY + 10);
      }, 5);
      break;
    }
    default:
      break;
  }
}

function drawFace(g: CanvasRenderingContext2D, d: CritterDesign, p: Pose, bw: number, cy: number) {
  const n = d.eyes;
  if (n <= 0) return;
  const spread = n === 1 ? 0 : bw * 0.26;
  const eyeR = n === 1 ? 15 : 11;
  const xs = n === 1 ? [0] : n === 3 ? [-spread, 0, spread] : [-spread, spread];
  for (const x of xs) {
    const open = 1 - p.blink;
    if (open < 0.12) {
      g.beginPath();
      g.moveTo(x - eyeR, cy);
      g.lineTo(x + eyeR, cy);
      g.lineWidth = 5;
      g.strokeStyle = OUTLINE;
      g.lineCap = "round";
      g.stroke();
      continue;
    }
    if (p.die > 0.35) {
      // X eyes once the lights go out
      g.beginPath();
      g.moveTo(x - eyeR * 0.7, cy - eyeR * 0.7);
      g.lineTo(x + eyeR * 0.7, cy + eyeR * 0.7);
      g.moveTo(x + eyeR * 0.7, cy - eyeR * 0.7);
      g.lineTo(x - eyeR * 0.7, cy + eyeR * 0.7);
      g.lineWidth = 5;
      g.strokeStyle = OUTLINE;
      g.lineCap = "round";
      g.stroke();
      continue;
    }
    ellipse(g, WHITE, x, cy, eyeR, eyeR * open, 5);
    g.beginPath();
    g.ellipse(x + 2, cy + 1, eyeR * 0.44, eyeR * 0.5 * open, 0, 0, TAU);
    g.fillStyle = d.eye ?? OUTLINE;
    g.fill();
  }

  if (d.brow === "angry") {
    for (const s of [-1, 1]) {
      g.beginPath();
      g.moveTo(s * (spread + eyeR * 0.9), cy - eyeR - 5);
      g.lineTo(s * (spread - eyeR * 0.6), cy - eyeR + 3);
      g.lineWidth = 6;
      g.strokeStyle = OUTLINE;
      g.lineCap = "round";
      g.stroke();
    }
  }

  const my = cy + 20;
  if (d.mouth === "fangs" || d.mouth === "maw") {
    inked(g, OUTLINE, () => g.ellipse(0, my, 13, 8, 0, 0, TAU), 0);
    for (const s of [-1, 0.2]) {
      g.beginPath();
      g.moveTo(s * 8 - 3, my - 7);
      g.lineTo(s * 8 + 3, my - 7);
      g.lineTo(s * 8, my + 2);
      g.closePath();
      g.fillStyle = WHITE;
      g.fill();
    }
  } else if (d.mouth === "grin") {
    g.beginPath();
    g.arc(0, my - 6, 12, 0.25 * Math.PI, 0.75 * Math.PI);
    g.lineWidth = 5;
    g.strokeStyle = OUTLINE;
    g.lineCap = "round";
    g.stroke();
  } else if (d.mouth === "smile") {
    g.beginPath();
    g.arc(0, my - 8, 9, 0.3 * Math.PI, 0.7 * Math.PI);
    g.lineWidth = 4.5;
    g.strokeStyle = OUTLINE;
    g.lineCap = "round";
    g.stroke();
  }
}

function bodyPath(g: CanvasRenderingContext2D, d: CritterDesign, bw: number, bh: number) {
  switch (d.shape) {
    case "tall":
      g.roundRect(-bw / 2, -bh / 2, bw, bh, bw * 0.42);
      break;
    case "wide":
    case "mound":
      g.roundRect(-bw / 2, -bh / 2, bw, bh, bw * 0.34);
      break;
    case "jelly":
    case "blob":
      g.moveTo(-bw / 2, bh / 2);
      g.quadraticCurveTo(-bw * 0.62, -bh * 0.5, 0, -bh / 2);
      g.quadraticCurveTo(bw * 0.62, -bh * 0.5, bw / 2, bh / 2);
      break;
    default:
      g.ellipse(0, 0, bw / 2, bh / 2, 0, 0, TAU);
  }
}

/* ------------------------------- the creature ------------------------------ */

function drawCritter(g: CanvasRenderingContext2D, d: CritterDesign, p: Pose) {
  const size = 0.9 + (d.size ?? 1) * 0.18;
  const bw = 62 * size * p.sx;
  const bh = 58 * size * p.sy;
  const baseY = FRAME - 10;
  const cy = baseY - 14 - bh / 2 + p.bob;

  g.save();
  g.translate(FRAME / 2, 0);

  // back layers
  g.save();
  g.translate(0, cy);
  g.rotate(p.tilt);
  drawWings(g, d, p, bw, 0);
  g.restore();

  drawLegs(g, d, p, bw, baseY);

  g.save();
  g.translate(0, cy);
  g.rotate(p.tilt);

  drawCrown(g, d, p, bw, -bh / 2);
  drawArms(g, d, p, bw, 0);

  inked(g, d.body, () => bodyPath(g, d, bw, bh), 6.5);

  // one flat shade block on the lower body — no gradients
  g.save();
  g.beginPath();
  bodyPath(g, d, bw, bh);
  g.clip();
  g.globalAlpha = 0.5;
  g.fillStyle = shadeOf(d);
  g.fillRect(-bw, bh * 0.14, bw * 2, bh);
  g.restore();

  if (d.pattern === "spots") {
    g.globalAlpha = 0.55;
    g.fillStyle = shadeOf(d);
    for (const [sx, sy, r] of [[-0.26, 0.12, 6], [0.22, 0.24, 5], [0.05, -0.3, 4]] as const) {
      g.beginPath();
      g.ellipse(bw * sx, bh * sy, r, r, 0, 0, TAU);
      g.fill();
    }
    g.globalAlpha = 1;
  }

  drawFace(g, d, p, bw, -bh * 0.06);
  g.restore();
  g.restore();
}

/* -------------------------------- strips ---------------------------------- */

function poseIdle(u: number): Pose {
  const b = Math.sin(u * TAU);
  const blinkPhase = u > 0.82 && u < 0.94 ? Math.sin(((u - 0.82) / 0.12) * Math.PI) : 0;
  return {
    bob: -b * 1.6,
    sx: 1 - b * 0.025,
    sy: 1 + b * 0.035,
    tilt: Math.sin(u * TAU) * 0.02,
    step: 0,
    blink: blinkPhase,
    flap: u,
    die: 0,
  };
}

function poseWalk(u: number): Pose {
  const g2 = u * TAU * 2;
  return {
    bob: -Math.abs(Math.sin(g2 / 2)) * 5,
    sx: 1 + Math.max(0, -Math.cos(g2)) * 0.06,
    sy: 1 - Math.max(0, -Math.cos(g2)) * 0.07,
    tilt: Math.sin(u * TAU) * 0.07,
    step: Math.sin(u * TAU),
    blink: u > 0.94 ? 1 : 0,
    flap: u * 2,
    die: 0,
  };
}

function poseDeath(u: number): Pose {
  // stagger back, tip over, squash flat and deflate
  const stagger = u < 0.18 ? Math.sin((u / 0.18) * Math.PI) : 0;
  const k = Math.max(0, (u - 0.18) / 0.82);
  return {
    bob: -stagger * 6 + k * 8,
    sx: 1 + stagger * 0.12 + k * 0.28,
    sy: 1 - stagger * 0.1 - k * 0.55,
    tilt: k * 1.1 + stagger * 0.15,
    step: 0,
    blink: 0,
    flap: 0,
    die: u,
  };
}

function strip(d: CritterDesign, frames: number, pose: (u: number) => Pose): string {
  const c = document.createElement("canvas");
  c.width = FRAME * frames;
  c.height = FRAME;
  const g = c.getContext("2d");
  if (!g) return "";
  for (let i = 0; i < frames; i++) {
    g.save();
    g.translate(i * FRAME, 0);
    g.beginPath();
    g.rect(0, 0, FRAME, FRAME);
    g.clip();
    const p = pose(i / frames);
    if (p.die > 0) g.globalAlpha = Math.max(0, 1 - Math.max(0, (p.die - 0.55) / 0.45));
    drawCritter(g, d, p);
    g.restore();
  }
  return c.toDataURL("image/png");
}

const cache = new Map<string, [string, string, string]>();

/** [idle, walk, death] data-url strips for a creature, generated once. */
export function echoStrips(d: CritterDesign): [string, string, string] {
  const hit = cache.get(d.key);
  if (hit) return hit;
  const out: [string, string, string] = [
    strip(d, IDLE_FRAMES, poseIdle),
    strip(d, WALK_FRAMES, poseWalk),
    strip(d, DEATH_FRAMES, poseDeath),
  ];
  cache.set(d.key, out);
  return out;
}
