import { CRITTER_ENEMIES, type CritterEnemyKey } from "./critters";

export interface HordeStat {
  sprite: CritterEnemyKey;
  radius: number;
  speed: [number, number];
  hp: number;
  score: number;
  height: number;
  color: string;
  damage: number;
  minWave: number;
  weight: number;
}

/** Gameplay tuning for the hand-designed chibi horde (tier 1 fodder -> tier 5 nightmares). */
/** Global silhouette scale — the horde is drawn chunky so it reads at a glance. */
const SIZE_BOOST = 1.3;

interface CritterTuning {
  tier: 1 | 2 | 3 | 4 | 5;
  radius: number;
  speed: [number, number];
  hp: number;
  score: number;
  height: number;
  damage: number;
  minWave: number;
  weight: number;
}

const TUNING: Record<CritterEnemyKey, CritterTuning> = {
  // ---- imp line (tier 1 -> 4): the backbone of every wave
  e_imp_violet: { tier: 1, radius: 24, speed: [132, 170], hp: 8, score: 13, height: 116, damage: 9, minWave: 1, weight: 3.4 },
  e_imp_bile: { tier: 2, radius: 27, speed: [118, 152], hp: 15, score: 26, height: 128, damage: 12, minWave: 3, weight: 2.8 },
  e_imp_crimson: { tier: 3, radius: 30, speed: [126, 162], hp: 26, score: 48, height: 142, damage: 16, minWave: 6, weight: 2.2 },
  e_imp_infernal: { tier: 4, radius: 34, speed: [112, 144], hp: 48, score: 96, height: 162, damage: 21, minWave: 10, weight: 1.5 },

  // ---- ooze line (tier 1 -> 5)
  e_blob_pup: { tier: 1, radius: 17, speed: [120, 158], hp: 5, score: 10, height: 78, damage: 7, minWave: 2, weight: 0.6 },
  e_sticklooter: { tier: 1, radius: 22, speed: [112, 146], hp: 10, score: 16, height: 100, damage: 9, minWave: 1, weight: 3.0 },
  e_blob_gray: { tier: 2, radius: 29, speed: [80, 102], hp: 22, score: 38, height: 120, damage: 12, minWave: 4, weight: 2.2 },
  e_slime_skull: { tier: 3, radius: 32, speed: [104, 136], hp: 34, score: 58, height: 132, damage: 17, minWave: 7, weight: 1.8 },
  e_demon_slime: { tier: 5, radius: 46, speed: [70, 92], hp: 175, score: 600, height: 226, damage: 32, minWave: 999, weight: 0 },

  // ---- winged line (tier 1 -> 3)
  e_gnat: { tier: 1, radius: 18, speed: [136, 176], hp: 6, score: 15, height: 92, damage: 8, minWave: 1, weight: 2.8 },
  e_bat: { tier: 2, radius: 22, speed: [146, 188], hp: 13, score: 28, height: 106, damage: 11, minWave: 4, weight: 2.4 },
  e_wraithwing: { tier: 3, radius: 26, speed: [152, 196], hp: 24, score: 62, height: 124, damage: 15, minWave: 8, weight: 1.6 },

  // ---- bone line (tier 2 -> 4)
  e_skel_white: { tier: 2, radius: 25, speed: [94, 124], hp: 18, score: 30, height: 132, damage: 13, minWave: 5, weight: 2.2 },
  e_skel_gold: { tier: 3, radius: 28, speed: [112, 152], hp: 32, score: 54, height: 144, damage: 17, minWave: 8, weight: 1.7 },
  e_bonelord: { tier: 4, radius: 33, speed: [100, 130], hp: 58, score: 110, height: 168, damage: 22, minWave: 12, weight: 1.2 },

  // ---- rot line
  e_mushroom: { tier: 2, radius: 25, speed: [96, 126], hp: 16, score: 34, height: 114, damage: 12, minWave: 3, weight: 2.2 },
  e_zombie: { tier: 2, radius: 27, speed: [74, 98], hp: 26, score: 36, height: 138, damage: 15, minWave: 3, weight: 2.4 },
  e_hound: { tier: 3, radius: 26, speed: [152, 192], hp: 24, score: 56, height: 114, damage: 16, minWave: 6, weight: 1.6 },
  e_ghost: { tier: 3, radius: 25, speed: [106, 136], hp: 22, score: 60, height: 128, damage: 15, minWave: 9, weight: 1.4 },
  e_nightborne: { tier: 5, radius: 42, speed: [86, 112], hp: 165, score: 560, height: 220, damage: 30, minWave: 999, weight: 0 },
};


export const CRITTER_KEYS = CRITTER_ENEMIES.map((d) => d.key) as CritterEnemyKey[];

export const CRITTER_NAME: Record<CritterEnemyKey, string> = Object.fromEntries(
  CRITTER_ENEMIES.map((d) => [d.key, d.name]),
) as Record<CritterEnemyKey, string>;

export const CRITTER_TIER: Record<CritterEnemyKey, number> = Object.fromEntries(
  CRITTER_KEYS.map((k) => [k, TUNING[k].tier]),
) as Record<CritterEnemyKey, number>;

export const CRITTER_STATS: Record<CritterEnemyKey, HordeStat> = Object.fromEntries(
  CRITTER_ENEMIES.map((d) => {
    const t = TUNING[d.key as CritterEnemyKey];
    // Brotato-style readability: everything is drawn chunkier, and the nastier
    // the tier the more screen space it owns so threats read at a glance.
    const bulk = SIZE_BOOST * (1 + (t.tier - 1) * 0.06);
    return [
      d.key,
      {
        sprite: d.key as CritterEnemyKey,
        radius: Math.round(t.radius * bulk),
        speed: t.speed,
        hp: t.hp,
        score: t.score,
        height: Math.round(t.height * bulk),
        color: d.body,
        damage: t.damage,
        minWave: t.minWave,
        weight: t.weight,
      } satisfies HordeStat,
    ];
  }),
) as Record<CritterEnemyKey, HordeStat>;
