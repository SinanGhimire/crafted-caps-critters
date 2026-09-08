/**
 * Accessory art for the arena.
 *
 * The menu portraits draw the same painted PNGs as SVG <image> nodes (see
 * components/ClassPortrait). In the fight everything is canvas, so each PNG is
 * cached as an <img> and drawn with the exact placement the portrait uses.
 *
 * Accessory space is the shared 200x240 portrait box:
 *   head ellipse  cx 100  cy 104  rx 52  ry 60   -> head top y = 44, width 104
 */
import { ACCESSORIES, sortAccessories, type AccessoryId } from "./accessories";
import { HERO_ANCHORS, HERO_HEAD_FITS, type HeadAnchor, type HeadFit } from "./hero-anchors";

export const ACC_W = 200;
export const ACC_H = 240;
/** Where the base head sits inside accessory space. */
export const HEAD_TOP = 44;
export const HEAD_CX = 100;
export const HEAD_W = 104;
/** Head ellipse height in accessory space (ry 60 -> 120). */
export const HEAD_H = 120;

/** Only a single clean hat silhouette is allowed in the arena. */
const WORN_SLOTS = new Set(["hat"]);

const cache = new Map<AccessoryId, HTMLImageElement>();

/** Cached raster for one accessory (client only; returns null during SSR). */
export function accessoryImage(id: AccessoryId): HTMLImageElement | null {
  if (typeof window === "undefined") return null;
  const hit = cache.get(id);
  if (hit) return hit;
  const img = new Image();
  img.decoding = "async";
  img.src = ACCESSORIES[id].url;
  cache.set(id, img);
  return img;
}

/**
 * Head/face pieces of a stack, in paint order, with at most one piece per slot
 * so two hats (or two face pieces) can never stack on the same skull.
 */
export function wornAccessories(ids: readonly AccessoryId[]): AccessoryId[] {
  const taken = new Set<string>();
  const kept: AccessoryId[] = [];
  for (const id of ids) {
    const def = ACCESSORIES[id];
    if (!def || !WORN_SLOTS.has(def.slot)) continue;
    if (taken.has(def.slot)) continue;
    taken.add(def.slot);
    kept.push(id);
  }
  return sortAccessories(kept);
}


/** Kick off decoding before a run starts so nothing pops in mid-fight. */
export function warmAccessories(ids: readonly AccessoryId[]) {
  for (const id of wornAccessories(ids)) accessoryImage(id);
}

const FALLBACK: HeadAnchor = { cx: 0.5, top: 0.05, w: 0.88, rot: 0 };
const FALLBACK_FIT: HeadFit = { scale: 1, x: 0, y: 0 };

/** Baked head anchor for a hero frame, with a sane default for unknown skins. */
export function headAnchor(skin: string, anim: "idle" | "walk" | "death", frame: number) {
  const set = HERO_ANCHORS[skin];
  if (!set) return FALLBACK;
  const list = anim === "walk" ? set.walk : anim === "death" ? set.death : set.idle;
  if (!list.length) return FALLBACK;
  const i = Math.max(0, Math.min(list.length - 1, Math.floor(frame)));
  return list[i] ?? FALLBACK;
}

/**
 * Draws a worn accessory stack onto a sprite that was rendered bottom-anchored
 * at (x, y) with the given height.
 */
export function drawWorn(
  ctx: CanvasRenderingContext2D,
  ids: readonly AccessoryId[],
  opts: {
    skin: string;
    anim: "idle" | "walk" | "death";
    frame: number;
    /** sprite frame aspect (frameWidth / frameHeight) */
    aspect: number;
    x: number;
    y: number;
    height: number;
    flip?: boolean;
    alpha?: number;
  },
) {
  const worn = wornAccessories(ids);
  if (!worn.length) return;
  const h = opts.height;
  const w = h * opts.aspect;
  const a = headAnchor(opts.skin, opts.anim, opts.frame);
  const fit = HERO_HEAD_FITS[opts.skin] ?? FALLBACK_FIT;

  const cxFrac = opts.flip ? 1 - a.cx : a.cx;
  const fitX = (opts.flip ? -fit.x : fit.x) * w;
  const headCx = opts.x - w / 2 + cxFrac * w + fitX;
  const headTop = opts.y - h + (a.top + fit.y) * h;
  const headW = a.w * w * fit.scale;

  // One uniform scale for both axes: the art keeps its painted aspect ratio
  // (a squashed hat reads as broken) and the whole accessory space is mapped
  // onto the measured skull by matching widths.
  const scale = headW / HEAD_W;
  const scaleY = scale;
  const originX = headCx - HEAD_CX * scale;
  const originY = headTop - HEAD_TOP * scaleY;


  ctx.save();
  if (opts.alpha !== undefined) ctx.globalAlpha *= opts.alpha;
  if (opts.flip) {
    ctx.translate(headCx, 0);
    ctx.scale(-1, 1);
    ctx.translate(-headCx, 0);
  }
  // Tumbling death frames: spin the gear with the skull, around its centre.
  const rot = a.rot ?? 0;
  if (rot) {
    const pivotY = headTop + (a.w * h) / 2;
    ctx.translate(headCx, pivotY);
    ctx.rotate(rot);
    ctx.translate(-headCx, -pivotY);
  }
  for (const id of worn) {
    const img = accessoryImage(id);
    if (!img || !img.complete || !img.naturalWidth) continue;
    const def = ACCESSORIES[id];
    if (!def) continue;
    ctx.drawImage(
      img,
      originX + def.x * scale,
      originY + def.top * scaleY,
      def.w * scale,
      def.h * scaleY,
    );
  }
  ctx.restore();
}
