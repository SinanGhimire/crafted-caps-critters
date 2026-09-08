import type { CritterEnemyKey } from "./critters";

/**
 * Foe artwork lives in `enemy-images.ts` (one flat drawing per creature).
 * This module only keeps the movement traits the renderer needs.
 */

/** Foes that stay airborne: they hover instead of stepping. */
export const FLYING_FOES = new Set<CritterEnemyKey>(["e_flyer"]);
