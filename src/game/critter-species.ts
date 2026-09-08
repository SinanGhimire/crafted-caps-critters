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
  // ---- vermin & fliers

  // ---- slimes & fungus

  // ---- undead
  e_skel_white: { tier: 2, radius: 25, speed: [94, 124], hp: 18, score: 30, height: 132, damage: 13, minWave: 4, weight: 2.6 },
  e_skel_gold: { tier: 3, radius: 28, speed: [112, 152], hp: 32, score: 54, height: 144, damage: 17, minWave: 7, weight: 1.9 },

  // ---- imps
  e_imp_violet: { tier: 1, radius: 24, speed: [132, 170], hp: 8, score: 13, height: 116, damage: 9, minWave: 1, weight: 3.4 },
  e_imp_bile: { tier: 2, radius: 27, speed: [118, 152], hp: 15, score: 26, height: 128, damage: 12, minWave: 3, weight: 2.8 },
  e_imp_crimson: { tier: 3, radius: 30, speed: [126, 162], hp: 26, score: 48, height: 142, damage: 16, minWave: 6, weight: 2.2 },

  // ---- vermin & fliers
  e_gnat: { tier: 1, radius: 18, speed: [136, 176], hp: 6, score: 15, height: 92, damage: 8, minWave: 1, weight: 2.8 },
  e_rat: { tier: 1, radius: 20, speed: [150, 190], hp: 7, score: 14, height: 90, damage: 8, minWave: 1, weight: 2.6 },
  e_bat: { tier: 2, radius: 22, speed: [146, 188], hp: 13, score: 28, height: 106, damage: 11, minWave: 4, weight: 2.4 },
  e_flyer: { tier: 3, radius: 26, speed: [140, 180], hp: 26, score: 62, height: 126, damage: 15, minWave: 8, weight: 1.6 },

  // ---- ooze & fungus
  e_sticklooter: { tier: 1, radius: 22, speed: [112, 146], hp: 10, score: 16, height: 100, damage: 9, minWave: 1, weight: 3.0 },
  e_slime_skull: { tier: 3, radius: 32, speed: [104, 136], hp: 34, score: 58, height: 132, damage: 17, minWave: 7, weight: 1.8 },
  e_mushroom: { tier: 2, radius: 25, speed: [96, 126], hp: 16, score: 34, height: 114, damage: 12, minWave: 3, weight: 2.2 },

  // ---- the slime line (each step up is a beefier slime)
  e_slimelet_green: { tier: 1, radius: 16, speed: [120, 158], hp: 5, score: 12, height: 74, damage: 7, minWave: 1, weight: 3.2 },
  e_slimelet_blue: { tier: 1, radius: 17, speed: [130, 168], hp: 8, score: 18, height: 78, damage: 9, minWave: 2, weight: 2.8 },
  e_slime_green: { tier: 1, radius: 24, speed: [104, 136], hp: 12, score: 20, height: 104, damage: 10, minWave: 1, weight: 3.4 },
  e_slime_blue: { tier: 2, radius: 27, speed: [110, 146], hp: 22, score: 36, height: 116, damage: 13, minWave: 3, weight: 2.8 },
  e_slime_yellow: { tier: 2, radius: 28, speed: [118, 156], hp: 26, score: 42, height: 120, damage: 14, minWave: 4, weight: 2.4 },
  e_slime_red: { tier: 3, radius: 31, speed: [116, 152], hp: 44, score: 68, height: 132, damage: 18, minWave: 7, weight: 1.9 },
  e_slime_purple: { tier: 4, radius: 34, speed: [110, 148], hp: 68, score: 104, height: 144, damage: 22, minWave: 10, weight: 1.4 },
  e_slime_black: { tier: 4, radius: 38, speed: [100, 132], hp: 96, score: 148, height: 158, damage: 26, minWave: 13, weight: 1.0 },

  // ---- cult
  e_cultist: { tier: 3, radius: 26, speed: [98, 128], hp: 38, score: 72, height: 138, damage: 16, minWave: 6, weight: 1.8 },

  // ---- boss (never rolled by the wave pool)
  e_boss_bone: { tier: 5, radius: 44, speed: [88, 116], hp: 340, score: 840, height: 228, damage: 35, minWave: 999, weight: 0 },
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
