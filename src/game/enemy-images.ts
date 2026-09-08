/**
 * Foe artwork comes from two sources:
 *
 * 1. `foes4/` — one flat hand-drawn illustration per species. The renderer
 *    animates those procedurally (bob, squash, lean, death tip).
 * 2. The original animation packs (`sprites/`, `sprites2/`) — real sprite
 *    strips with idle / walk / death cycles baked in.
 */
const MODULES = import.meta.glob<{ default: string }>("@/assets/foes4/*.png", {
  eager: true,
}) as Record<string, { default: string }>;

export const ENEMY_IMG: Record<string, string> = Object.fromEntries(
  Object.entries(MODULES).map(([path, mod]) => [
    path.split("/").pop()!.replace(/\.png$/, ""),
    mod.default,
  ]),
);

const PACK = import.meta.glob<{ default: string }>(
  ["@/assets/sprites/*.png", "@/assets/sprites2/*.png"],
  { eager: true },
) as Record<string, { default: string }>;

function pack(name: string): string {
  const hit = Object.entries(PACK).find(([p]) => p.endsWith("/" + name + ".png"));
  return hit ? hit[1].default : "";
}

/** Classic packs: every strip is 6 idle / 8 walk / 10 death frames. */
const CLASSIC_FRAMES: [number, number, number] = [6, 8, 10];

/** key -> file stem in the original packs. */
const CLASSIC: Record<string, [string, string, string]> = {
  e_scarlet: ["grunt-idle", "grunt-walk", "grunt-death"],
  e_moss: ["spiker-idle", "spiker-walk", "spiker-death"],
  e_amber: ["brute-idle", "brute-walk", "brute-death"],
  e_wisp: ["flyer-idle", "flyer-walk", "flyer-death"],
  e_violet: ["e1-idle", "e1-walk", "e1-death"],
  e_toxin: ["e2-idle", "e2-walk", "e2-death"],
  e_furbat: ["e3-fly", "e3-fly", "e3-fly"],
  e_crimson: ["e4-idle", "e4-walk", "e4-death"],
};

export const CLASSIC_KEYS = Object.keys(CLASSIC);

/** Preview image (first frame source) + how many frames it holds. */
export function enemyPreview(key: string): { src: string; frames: number } | null {
  if (ENEMY_IMG[key]) return { src: ENEMY_IMG[key]!, frames: 1 };
  const c = CLASSIC[key];
  return c ? { src: pack(c[0]), frames: CLASSIC_FRAMES[0] } : null;
}

/** [idle, walk, death] urls for a foe, or null when it has no artwork. */
export function enemyImageSrc(key: string): [string, string, string] | null {
  const src = ENEMY_IMG[key];
  if (src) return [src, src, src];
  const c = CLASSIC[key];
  return c ? [pack(c[0]), pack(c[1]), pack(c[2])] : null;
}

/** Frame counts matching `enemyImageSrc`. */
export function enemyFrames(key: string): [number, number, number] {
  return CLASSIC[key] ? [...CLASSIC_FRAMES] : [1, 1, 1];
}
