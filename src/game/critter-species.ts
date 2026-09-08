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

  // ---- crawlers
  e_spider: { tier: 1, radius: 24, speed: [126, 168], hp: 13, score: 26, height: 104, damage: 10, minWave: 1, weight: 3.4 },
  e_worm: { tier: 2, radius: 26, speed: [88, 118], hp: 22, score: 38, height: 116, damage: 14, minWave: 5, weight: 2.2 },

  // ---- specialists
  e_bomber: { tier: 3, radius: 26, speed: [150, 190], hp: 20, score: 60, height: 118, damage: 26, minWave: 6, weight: 1.6 },
  e_caster: { tier: 3, radius: 26, speed: [84, 110], hp: 28, score: 66, height: 124, damage: 14, minWave: 8, weight: 1.5 },
  e_brute: { tier: 4, radius: 38, speed: [70, 92], hp: 82, score: 140, height: 176, damage: 24, minWave: 9, weight: 1.1 },

  // ---- slimes & fungus
  e_slime_skull: { tier: 3, radius: 32, speed: [104, 136], hp: 34, score: 58, height: 132, damage: 17, minWave: 6, weight: 2.0 },
  e_mushroom: { tier: 2, radius: 25, speed: [96, 126], hp: 16, score: 34, height: 114, damage: 12, minWave: 2, weight: 3.0 },

  // ---- undead
  e_skel_white: { tier: 2, radius: 25, speed: [94, 124], hp: 18, score: 30, height: 132, damage: 13, minWave: 4, weight: 2.6 },
  e_skel_gold: { tier: 3, radius: 28, speed: [112, 152], hp: 32, score: 54, height: 144, damage: 17, minWave: 7, weight: 1.9 },

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
