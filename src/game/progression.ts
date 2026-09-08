/**
 * Permanent hero progression.
 *
 * Every run feeds XP into the profile. XP becomes account levels, levels give
 * small permanent stat bonuses, and milestone levels unlock abilities that are
 * applied to every future run.
 */

export interface MetaBonus {
  /** Max-HP multiplier, 1 = no bonus. */
  hpMult: number;
  /** Damage multiplier, 1 = no bonus. */
  damageMult: number;
  /** Move-speed multiplier, 1 = no bonus. */
  speedMult: number;
  /** Extra crit chance (0-1). */
  crit: number;
  /** Extra lifesteal (0-1). */
  lifesteal: number;
  /** Extra starting shop materials. */
  materials: number;
}

export const NO_BONUS: MetaBonus = {
  hpMult: 1,
  damageMult: 1,
  speedMult: 1,
  crit: 0,
  lifesteal: 0,
  materials: 0,
};

export interface Ability {
  level: number;
  name: string;
  desc: string;
  icon: string;
}

/** Milestone abilities, in unlock order. */
export const ABILITIES: Ability[] = [
  { level: 2, name: "Steady Hands", desc: "Reload and fire recovery is 8% quicker.", icon: "✋" },
  { level: 4, name: "Field Dressing", desc: "Start every run with a free 25% heal charge.", icon: "🩹" },
  { level: 6, name: "Scavenger", desc: "+15 starting materials for the wave shop.", icon: "🧰" },
  { level: 8, name: "Marked Shot", desc: "+5% critical chance on every weapon.", icon: "🎯" },
  { level: 11, name: "Second Wind", desc: "Survive one lethal hit per run at 20% HP.", icon: "💨" },
  { level: 14, name: "Bloodlink", desc: "+4% lifesteal on all damage dealt.", icon: "🩸" },
  { level: 18, name: "Echo Surge", desc: "+10% damage while below half health.", icon: "⚡" },
  { level: 22, name: "Vanguard", desc: "+12% max health and +6% move speed.", icon: "🛡" },
  { level: 26, name: "Overcharge", desc: "+15% damage on the first three waves.", icon: "🔥" },
  { level: 30, name: "Echo Ascendant", desc: "All permanent bonuses are doubled.", icon: "👑" },
];

/** Permanent stat bonus for an account level. */
export function metaBonus(level: number): MetaBonus {
  const n = Math.max(0, level - 1);
  const doubled = level >= 30 ? 2 : 1;
  const b: MetaBonus = {
    hpMult: 1 + n * 0.02 * doubled,
    damageMult: 1 + n * 0.02 * doubled,
    speedMult: 1 + Math.min(n * 0.006, 0.3) * doubled,
    crit: (level >= 8 ? 0.05 : 0) + Math.min(n * 0.004, 0.15),
    lifesteal: level >= 14 ? 0.04 : 0,
    materials: level >= 6 ? 15 : 0,
  };
  if (level >= 22) {
    b.hpMult += 0.12;
    b.speedMult += 0.06;
  }
  return b;
}

/** Abilities available at a given level. */
export function unlockedAbilities(level: number) {
  return ABILITIES.filter((a) => a.level <= level);
}

export function nextAbility(level: number) {
  return ABILITIES.find((a) => a.level > level) ?? null;
}

/** XP earned by a finished run. */
export function xpForRun(opts: {
  score: number;
  wave: number;
  kills: number;
  won: boolean;
}) {
  const base = Math.round(opts.score * 0.25 + opts.wave * 120 + opts.kills * 4);
  return Math.max(60, opts.won ? Math.round(base * 1.5) + 1500 : base);
}
