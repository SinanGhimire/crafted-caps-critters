import type { CritterEnemyKey } from "./critters";

/**
 * Enemy artwork — one hand-painted illustration per creature.
 *
 * The old pixel strips are gone. Each foe is a single clean, high-resolution
 * drawing; the renderer gives it life procedurally (walk bounce, body lean,
 * squash on foot-plant, idle breathing, hover for fliers and a tumble on
 * death), so nothing ever slides across the floor.
 */

import e_gnat from "@/assets/foes2/e_gnat.png";
import e_bat from "@/assets/foes2/e_bat.png";
import e_flyer from "@/assets/foes2/e_flyer.png";
import e_sticklooter from "@/assets/foes2/e_sticklooter.png";
import e_slime_skull from "@/assets/foes2/e_slime_skull.png";
import e_mushroom from "@/assets/foes2/e_mushroom.png";
import e_skel_white from "@/assets/foes2/e_skel_white.png";
import e_skel_gold from "@/assets/foes2/e_skel_gold.png";
import e_boss_bone from "@/assets/foes2/e_boss_bone.png";

/** [idle, walk, death] urls — one drawing serves all three, animated in code. */
export type ArtStrips = [string, string, string];

export const ENEMY_ART: Record<CritterEnemyKey, ArtStrips> = {
  e_gnat: [e_gnat, e_gnat, e_gnat],
  e_bat: [e_bat, e_bat, e_bat],
  e_flyer: [e_flyer, e_flyer, e_flyer],
  e_sticklooter: [e_sticklooter, e_sticklooter, e_sticklooter],
  e_slime_skull: [e_slime_skull, e_slime_skull, e_slime_skull],
  e_mushroom: [e_mushroom, e_mushroom, e_mushroom],
  e_skel_white: [e_skel_white, e_skel_white, e_skel_white],
  e_skel_gold: [e_skel_gold, e_skel_gold, e_skel_gold],
  e_boss_bone: [e_boss_bone, e_boss_bone, e_boss_bone],
};

/** Foes that stay airborne: they hover instead of stepping. */
export const FLYING_FOES = new Set<CritterEnemyKey>(["e_gnat", "e_bat", "e_flyer"]);
