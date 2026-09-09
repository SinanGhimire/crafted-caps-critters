import type { WeaponKey } from "./types";

import t1 from "@/assets/turrets/t1.png";
import t5 from "@/assets/turrets/t5.png";
import t9 from "@/assets/turrets/t9.png";
import t14 from "@/assets/turrets/t14.png";
import t20 from "@/assets/turrets/t20.png";

/** Every turret strip is a 15-frame shoot cycle laid out left to right. */
export const TURRET_FRAMES = 15;

export interface TurretTier {
  /** 1-5, also the sprite key suffix */
  tier: number;
  name: string;
  desc: string;
  src: string;
  weapon: WeaponKey;
  hp: number;
  /** damage share of the player's own damage */
  power: number;
  /** shots per second multiplier (higher = faster) */
  rate: number;
  cost: number;
}

export const TURRET_TIERS: TurretTier[] = [
  {
    tier: 1,
    name: "Scout Emplacement",
    desc: "Light auto turret, fires steadily at the nearest foe",
    src: t1,
    weapon: "pistol",
    hp: 70,
    power: 0.55,
    rate: 1,
    cost: 45,
  },
  {
    tier: 2,
    name: "Repeater Nest",
    desc: "Faster turret with a rifle barrel",
    src: t5,
    weapon: "rifle",
    hp: 95,
    power: 0.7,
    rate: 1.25,
    cost: 70,
  },
  {
    tier: 3,
    name: "Scatter Battery",
    desc: "Shotgun turret that shreds anything close",
    src: t9,
    weapon: "shotgun",
    hp: 120,
    power: 0.85,
    rate: 1.1,
    cost: 100,
  },
  {
    tier: 4,
    name: "Siege Cannon",
    desc: "Heavy turret with long reach and big hits",
    src: t14,
    weapon: "sniper",
    hp: 150,
    power: 1.05,
    rate: 0.95,
    cost: 140,
  },
  {
    tier: 5,
    name: "Warden Prime",
    desc: "Top-tier turret: fast, tough and brutal",
    src: t20,
    weapon: "minigun",
    hp: 200,
    power: 1.25,
    rate: 1.5,
    cost: 190,
  },
];

export const TURRET_BY_TIER: Record<number, TurretTier> = Object.fromEntries(
  TURRET_TIERS.map((t) => [t.tier, t]),
);

/** Sprite keys registered in the global singles table. */
export const TURRET_SRC: Record<string, string> = Object.fromEntries(
  TURRET_TIERS.map((t) => [`tr_${t.tier}`, t.src]),
);
