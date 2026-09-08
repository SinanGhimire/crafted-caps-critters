import type { CritterEnemyKey } from "./critters";

/**
 * Enemy artwork.
 *
 * Two families live here:
 *  - the painted foes: one high-res illustration each, animated procedurally
 *    by the renderer (bounce, lean, squash, hover, death tumble).
 *  - the slime line and the cultist: true hand-drawn sprite strips, so the
 *    renderer plays their real frames (hop, wobble, dissolve).
 */

import impVioletIdle from "@/assets/foes/imp_violet-idle.png";
import impVioletWalk from "@/assets/foes/imp_violet-walk.png";
import impVioletDeath from "@/assets/foes/imp_violet-death.png";
import impBileIdle from "@/assets/foes/imp_bile-idle.png";
import impBileWalk from "@/assets/foes/imp_bile-walk.png";
import impBileDeath from "@/assets/foes/imp_bile-death.png";
import impCrimsonIdle from "@/assets/foes/imp_crimson-idle.png";
import impCrimsonWalk from "@/assets/foes/imp_crimson-walk.png";
import impCrimsonDeath from "@/assets/foes/imp_crimson-death.png";
import gnatIdle from "@/assets/foes/gnat-idle.png";
import gnatWalk from "@/assets/foes/gnat-walk.png";
import gnatDeath from "@/assets/foes/gnat-death.png";
import ratIdle from "@/assets/foes/rat-idle.png";
import ratWalk from "@/assets/foes/rat-walk.png";
import ratDeath from "@/assets/foes/rat-death.png";
import batIdle from "@/assets/foes/bat-idle.png";
import batWalk from "@/assets/foes/bat-walk.png";
import batDeath from "@/assets/foes/bat-death.png";
import flyerIdle from "@/assets/foes/flyer-idle.png";
import flyerWalk from "@/assets/foes/flyer-walk.png";
import flyerDeath from "@/assets/foes/flyer-death.png";
import sticklooterIdle from "@/assets/foes/sticklooter-idle.png";
import sticklooterWalk from "@/assets/foes/sticklooter-walk.png";
import sticklooterDeath from "@/assets/foes/sticklooter-death.png";
import slimeSkullIdle from "@/assets/foes/slime_skull-idle.png";
import slimeSkullWalk from "@/assets/foes/slime_skull-walk.png";
import slimeSkullDeath from "@/assets/foes/slime_skull-death.png";
import mushroomIdle from "@/assets/foes/mushroom-idle.png";
import mushroomWalk from "@/assets/foes/mushroom-walk.png";
import mushroomDeath from "@/assets/foes/mushroom-death.png";

import e_skel_white from "@/assets/foes2/e_skel_white.png";
import e_skel_gold from "@/assets/foes2/e_skel_gold.png";
import e_boss_bone from "@/assets/foes2/e_boss_bone.png";

import sGreenI from "@/assets/foes3/slime_green-idle.png";
import sGreenW from "@/assets/foes3/slime_green-walk.png";
import sGreenD from "@/assets/foes3/slime_green-death.png";
import sBlueI from "@/assets/foes3/slime_blue-idle.png";
import sBlueW from "@/assets/foes3/slime_blue-walk.png";
import sBlueD from "@/assets/foes3/slime_blue-death.png";
import sYellowI from "@/assets/foes3/slime_yellow-idle.png";
import sYellowW from "@/assets/foes3/slime_yellow-walk.png";
import sYellowD from "@/assets/foes3/slime_yellow-death.png";
import sRedI from "@/assets/foes3/slime_red-idle.png";
import sRedW from "@/assets/foes3/slime_red-walk.png";
import sRedD from "@/assets/foes3/slime_red-death.png";
import sPurpleI from "@/assets/foes3/slime_purple-idle.png";
import sPurpleW from "@/assets/foes3/slime_purple-walk.png";
import sPurpleD from "@/assets/foes3/slime_purple-death.png";
import sBlackI from "@/assets/foes3/slime_black-idle.png";
import sBlackW from "@/assets/foes3/slime_black-walk.png";
import sBlackD from "@/assets/foes3/slime_black-death.png";
import tGreenI from "@/assets/foes3/slimelet_green-idle.png";
import tGreenW from "@/assets/foes3/slimelet_green-walk.png";
import tGreenD from "@/assets/foes3/slimelet_green-death.png";
import tBlueI from "@/assets/foes3/slimelet_blue-idle.png";
import tBlueW from "@/assets/foes3/slimelet_blue-walk.png";
import tBlueD from "@/assets/foes3/slimelet_blue-death.png";
import cultI from "@/assets/foes3/cultist-idle.png";
import cultW from "@/assets/foes3/cultist-walk.png";
import cultD from "@/assets/foes3/cultist-death.png";

/** [idle, walk, death] urls — one drawing serves all three, animated in code. */
export type ArtStrips = [string, string, string];

export const ENEMY_ART: Record<CritterEnemyKey, ArtStrips> = {
  e_imp_violet: [impVioletIdle, impVioletWalk, impVioletDeath],
  e_imp_bile: [impBileIdle, impBileWalk, impBileDeath],
  e_imp_crimson: [impCrimsonIdle, impCrimsonWalk, impCrimsonDeath],
  e_gnat: [gnatIdle, gnatWalk, gnatDeath],
  e_rat: [ratIdle, ratWalk, ratDeath],
  e_bat: [batIdle, batWalk, batDeath],
  e_flyer: [flyerIdle, flyerWalk, flyerDeath],
  e_sticklooter: [sticklooterIdle, sticklooterWalk, sticklooterDeath],
  e_slime_skull: [slimeSkullIdle, slimeSkullWalk, slimeSkullDeath],
  e_mushroom: [mushroomIdle, mushroomWalk, mushroomDeath],
  e_skel_white: [e_skel_white, e_skel_white, e_skel_white],
  e_skel_gold: [e_skel_gold, e_skel_gold, e_skel_gold],
  e_boss_bone: [e_boss_bone, e_boss_bone, e_boss_bone],

  e_slimelet_green: [tGreenI, tGreenW, tGreenD],
  e_slimelet_blue: [tBlueI, tBlueW, tBlueD],
  e_slime_green: [sGreenI, sGreenW, sGreenD],
  e_slime_blue: [sBlueI, sBlueW, sBlueD],
  e_slime_yellow: [sYellowI, sYellowW, sYellowD],
  e_slime_red: [sRedI, sRedW, sRedD],
  e_slime_purple: [sPurpleI, sPurpleW, sPurpleD],
  e_slime_black: [sBlackI, sBlackW, sBlackD],
  e_cultist: [cultI, cultW, cultD],
};

/**
 * Frame counts per strip: painted foes are a single drawing the renderer
 * animates, the slime line and the cultist carry real animation frames.
 */
export const ENEMY_FRAMES: Record<CritterEnemyKey, [number, number, number]> = {
  e_imp_violet: [6, 8, 10],
  e_imp_bile: [6, 8, 10],
  e_imp_crimson: [6, 8, 10],
  e_gnat: [6, 8, 10],
  e_rat: [6, 8, 10],
  e_bat: [6, 8, 10],
  e_flyer: [6, 8, 10],
  e_sticklooter: [6, 8, 10],
  e_slime_skull: [6, 8, 10],
  e_mushroom: [6, 8, 10],
  e_skel_white: [1, 1, 1],
  e_skel_gold: [1, 1, 1],
  e_boss_bone: [1, 1, 1],

  e_slimelet_green: [6, 3, 3],
  e_slimelet_blue: [6, 3, 3],
  e_slime_green: [6, 4, 6],
  e_slime_blue: [6, 4, 6],
  e_slime_yellow: [6, 4, 6],
  e_slime_red: [6, 4, 6],
  e_slime_purple: [6, 4, 6],
  e_slime_black: [6, 4, 6],
  e_cultist: [15, 9, 9],
};

/** Foes that stay airborne: they hover instead of stepping. */

/** Foes that stay airborne: they hover instead of stepping. */
export const FLYING_FOES = new Set<CritterEnemyKey>(["e_gnat", "e_bat", "e_flyer"]);
