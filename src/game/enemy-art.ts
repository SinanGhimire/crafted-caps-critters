import type { CritterEnemyKey } from "./critters";

/**
 * Hand-drawn enemy artwork — the original animated sprite strips.
 * Each entry is [idle 6, walk 8, death 10] frames, fed straight to the renderer.
 */

import skelWhiteIdle from "@/assets/foes/skel_white-idle.png";
import skelWhiteWalk from "@/assets/foes/skel_white-walk.png";
import skelWhiteDeath from "@/assets/foes/skel_white-death.png";
import skelGoldIdle from "@/assets/foes/skel_gold-idle.png";
import skelGoldWalk from "@/assets/foes/skel_gold-walk.png";
import skelGoldDeath from "@/assets/foes/skel_gold-death.png";

import mushroomIdle from "@/assets/foes/mushroom-idle.png";
import mushroomWalk from "@/assets/foes/mushroom-walk.png";
import mushroomDeath from "@/assets/foes/mushroom-death.png";

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

import slimeBossIdle from "@/assets/foes/slime_boss-idle.png";
import slimeBossWalk from "@/assets/foes/slime_boss-walk.png";
import slimeBossDeath from "@/assets/foes/slime_boss-death.png";

/** [idle, walk, death] strip urls. */
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

  e_skel_white: [skelWhiteIdle, skelWhiteWalk, skelWhiteDeath],
  e_skel_gold: [skelGoldIdle, skelGoldWalk, skelGoldDeath],

  // bosses: grown-up versions of families the player already knows
  e_slime_boss: [slimeBossIdle, slimeBossWalk, slimeBossDeath],
  e_boss_spore: [mushroomIdle, mushroomWalk, mushroomDeath],
  e_boss_bone: [skelGoldIdle, skelGoldWalk, skelGoldDeath],
  e_boss_imp: [impCrimsonIdle, impCrimsonWalk, impCrimsonDeath],
};
