/**
 * Hand-illustrated foe artwork: one flat drawing per species.
 * The renderer animates them procedurally (bob, squash, lean, death tip),
 * so a single frame per state is all the art needs to ship.
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

/** [idle, walk, death] — the same drawing; motion is generated at runtime. */
export function enemyImageSrc(key: string): [string, string, string] | null {
  const src = ENEMY_IMG[key];
  return src ? [src, src, src] : null;
}
