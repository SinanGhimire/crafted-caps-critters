import type { AccessoryId } from "./accessories";
import type { CharacterKey, WeaponKey } from "./types";

/**
 * The class roster.
 *
 * Classes are no longer slices of a drawn sheet: every class is the shared base
 * character plus a stack of layered accessories (see game/accessories.tsx).
 */
export type ClassKey =
  | "vagrant"
  | "scrapper"
  | "skirmisher"
  | "grunt"
  | "shadowblade"
  | "marauder"
  | "corsair"
  | "berserker"
  | "sentinel"
  | "champion"
  | "trapper"
  | "pathfinder"
  | "arcanist"
  | "hexer"
  | "warden"
  | "spiritcaller"
  | "ascetic"
  | "crusader"
  | "seer"
  | "machinist"
  | "apothecary"
  | "toxicologist"
  | "medic"
  | "lunatic"
  | "harlequin"
  | "carnival"
  | "wraith"
  | "zealot"
  | "fiend"
  | "harvester"
  | "gunslinger"
  | "sapper"
  | "sharpshooter";

export interface ClassBuff {
  label: string;
  value: string;
  tone?: "good" | "bad" | "neutral";
}

export interface ClassDef {
  key: ClassKey;
  name: string;
  blurb: string;
  /** Visual skin borrowed from the hero roster. */
  skin: CharacterKey;
  weapon: WeaponKey;
  hp: number;
  speed: number;
  damage: number;
  /** Starting turrets deployed around the player. */
  turrets: number;
  /** Turret weapon when turrets > 0. */
  turretWeapon: WeaponKey;
  /** Extra crit chance added on top of base 5%. */
  crit: number;
  /** Lifesteal added on top of base 0. */
  lifesteal: number;
  /** Extra starting max HP multiplier (1 = none). */
  hpMult: number;
  /** Movement speed multiplier (1 = none). */
  speedMult: number;
  /** Damage multiplier (1 = none). */
  damageMult: number;
  /** Starting shop materials bonus. */
  startingMaterials: number;
  color: string;
  /** Shirt colour of the base figure. */
  shirt: string;
  /** Layered accessory stack that makes up the look. */
  accessories: AccessoryId[];
  buffs: ClassBuff[];
}

type Row = {
  key: ClassKey;
  name: string;
  blurb: string;
  skin: CharacterKey;
  weapon: WeaponKey;
  hp: number;
  speed: number;
  crit?: number;
  lifesteal?: number;
  hpMult?: number;
  speedMult?: number;
  damageMult?: number;
  mats?: number;
  turrets?: number;
  turretWeapon?: WeaponKey;
  color: string;
  shirt: string;
  wear: AccessoryId[];
  buffs: ClassBuff[];
};

const ROWS: Row[] = [
  {
    key: "vagrant",
    name: "Vagrant",
    blurb: "No gear, no rules. Pure fists and a scavenged shotgun.",
    skin: "bald",
    weapon: "shotgun",
    hp: 130,
    speed: 245,
    hpMult: 1.15,
    speedMult: 0.95,
    damageMult: 1.15,
    color: "#ff7b4d",
    shirt: "#b8483f",
    wear: ["roadBeanie"],
    buffs: [
      { label: "HP", value: "+15%", tone: "good" },
      { label: "Damage", value: "+15%", tone: "good" },
      { label: "Speed", value: "-5%", tone: "bad" },
    ],
  },
  {
    key: "scrapper",
    name: "Scrapper",
    blurb: "Junkyard survivor. Fast hands, faster looting.",
    skin: "bald",
    weapon: "smg",
    hp: 92,
    speed: 300,
    crit: 0.05,
    speedMult: 1.08,
    mats: 20,
    color: "#7bf2a8",
    shirt: "#8a5a30",
    wear: ["scrapCap"],
    buffs: [
      { label: "Speed", value: "+8%", tone: "good" },
      { label: "Crit", value: "+5%", tone: "good" },
      { label: "Materials", value: "+20", tone: "good" },
    ],
  },
  {
    key: "skirmisher",
    name: "Skirmisher",
    blurb: "Throws, ducks, throws again. Every shot comes back.",
    skin: "bald",
    weapon: "crossbow",
    hp: 95,
    speed: 285,
    speedMult: 1.05,
    damageMult: 1.1,
    color: "#c77dff",
    shirt: "#4f9d4f",
    wear: ["skirmishCap"],
    buffs: [
      { label: "Pierce", value: "+2", tone: "good" },
      { label: "Speed", value: "+5%", tone: "good" },
    ],
  },
  {
    key: "grunt",
    name: "Grunt",
    blurb: "Drilled, dug in, and never out of ammo.",
    skin: "bald",
    weapon: "rifle",
    hp: 110,
    speed: 270,
    hpMult: 1.05,
    damageMult: 1.1,
    mats: 10,
    color: "#5ec8ff",
    shirt: "#5a6a3a",
    wear: ["fieldCap"],
    buffs: [
      { label: "HP", value: "+5%", tone: "good" },
      { label: "Damage", value: "+10%", tone: "good" },
      { label: "Materials", value: "+10", tone: "good" },
    ],
  },
  {
    key: "shadowblade",
    name: "Shadowblade",
    blurb: "Strikes from nowhere. Enormous crit, paper frame.",
    skin: "bald",
    weapon: "pistol",
    hp: 76,
    speed: 322,
    crit: 0.2,
    hpMult: 0.85,
    speedMult: 1.15,
    color: "#8f9bff",
    shirt: "#1b1c22",
    wear: ["shadowBeanie"],
    buffs: [
      { label: "Crit", value: "+20%", tone: "good" },
      { label: "Speed", value: "+15%", tone: "good" },
      { label: "HP", value: "-15%", tone: "bad" },
    ],
  },
  {
    key: "marauder",
    name: "Marauder",
    blurb: "Charges in screaming with a jammed auto-shotgun.",
    skin: "bald",
    weapon: "autoshotgun",
    hp: 118,
    speed: 288,
    lifesteal: 0.06,
    hpMult: 1.08,
    damageMult: 1.12,
    color: "#ff9d4d",
    shirt: "#7b3fb5",
    wear: ["raiderHat"],
    buffs: [
      { label: "Lifesteal", value: "+6%", tone: "good" },
      { label: "Damage", value: "+12%", tone: "good" },
    ],
  },
  {
    key: "corsair",
    name: "Corsair",
    blurb: "Takes what floats. Extra loot from every wave.",
    skin: "bald",
    weapon: "revolver",
    hp: 100,
    speed: 280,
    crit: 0.08,
    mats: 40,
    color: "#f2c33c",
    shirt: "#b8483f",
    wear: ["corsairTricorn"],
    buffs: [
      { label: "Materials", value: "+40", tone: "good" },
      { label: "Crit", value: "+8%", tone: "good" },
    ],
  },
  {
    key: "berserker",
    name: "Berserker",
    blurb: "The more it hurts, the harder it hits.",
    skin: "bald",
    weapon: "chain",
    hp: 145,
    speed: 258,
    lifesteal: 0.08,
    hpMult: 1.25,
    speedMult: 0.94,
    damageMult: 1.2,
    color: "#e8623c",
    shirt: "#4f7d3f",
    wear: ["rageBeanie"],
    buffs: [
      { label: "HP", value: "+25%", tone: "good" },
      { label: "Lifesteal", value: "+8%", tone: "good" },
      { label: "Speed", value: "-6%", tone: "bad" },
    ],
  },
  {
    key: "sentinel",
    name: "Sentinel",
    blurb: "A wall with a carbine. Nothing gets past.",
    skin: "bald",
    weapon: "carbine",
    hp: 155,
    speed: 240,
    hpMult: 1.35,
    speedMult: 0.9,
    color: "#9fd8e8",
    shirt: "#3f5fc0",
    wear: ["sentinelBowler"],
    buffs: [
      { label: "HP", value: "+35%", tone: "good" },
      { label: "Speed", value: "-10%", tone: "bad" },
    ],
  },
  {
    key: "champion",
    name: "Champion",
    blurb: "Arena royalty. Balanced, brutal, adored.",
    skin: "bald",
    weapon: "vulcan",
    hp: 125,
    speed: 275,
    crit: 0.06,
    hpMult: 1.12,
    damageMult: 1.14,
    color: "#e6b32e",
    shirt: "#c8402f",
    wear: ["championHat"],
    buffs: [
      { label: "HP", value: "+12%", tone: "good" },
      { label: "Damage", value: "+14%", tone: "good" },
      { label: "Crit", value: "+6%", tone: "good" },
    ],
  },
  {
    key: "trapper",
    name: "Trapper",
    blurb: "Patient, quiet, and always already aiming.",
    skin: "bald",
    weapon: "sniper",
    hp: 90,
    speed: 268,
    crit: 0.16,
    damageMult: 1.18,
    color: "#bfe8a8",
    shirt: "#8a5a30",
    wear: ["trapperHat"],
    buffs: [
      { label: "Crit", value: "+16%", tone: "good" },
      { label: "Damage", value: "+18%", tone: "good" },
    ],
  },
  {
    key: "pathfinder",
    name: "Pathfinder",
    blurb: "Reads the woods and never stops moving.",
    skin: "bald",
    weapon: "crossbow",
    hp: 98,
    speed: 305,
    speedMult: 1.12,
    damageMult: 1.05,
    mats: 15,
    color: "#7fd07f",
    shirt: "#3a4a2e",
    wear: ["pathfinderCap"],
    buffs: [
      { label: "Speed", value: "+12%", tone: "good" },
      { label: "Materials", value: "+15", tone: "good" },
    ],
  },
  {
    key: "arcanist",
    name: "Arcanist",
    blurb: "Bends plasma into shapes it should not take.",
    skin: "bald",
    weapon: "plasma",
    hp: 86,
    speed: 268,
    damageMult: 1.3,
    hpMult: 0.92,
    color: "#9f7ce8",
    shirt: "#5a3fa8",
    wear: ["arcaneHat"],
    buffs: [
      { label: "Damage", value: "+30%", tone: "good" },
      { label: "HP", value: "-8%", tone: "bad" },
    ],
  },
  {
    key: "hexer",
    name: "Hexer",
    blurb: "Curses first, aims second. Enemies rot as they run.",
    skin: "bald",
    weapon: "laser",
    hp: 88,
    speed: 272,
    lifesteal: 0.12,
    damageMult: 1.12,
    color: "#b98bff",
    shirt: "#20222b",
    wear: ["hexHat"],
    buffs: [
      { label: "Lifesteal", value: "+12%", tone: "good" },
      { label: "Damage", value: "+12%", tone: "good" },
    ],
  },
  {
    key: "warden",
    name: "Warden",
    blurb: "Grown from the grove. Roots, antlers, artillery.",
    skin: "bald",
    weapon: "grenadier",
    hp: 128,
    speed: 262,
    hpMult: 1.2,
    damageMult: 1.08,
    color: "#7dbd63",
    shirt: "#4f7d3f",
    wear: ["wardenHat"],
    buffs: [
      { label: "HP", value: "+20%", tone: "good" },
      { label: "Damage", value: "+8%", tone: "good" },
    ],
  },
  {
    key: "spiritcaller",
    name: "Spiritcaller",
    blurb: "Borrows strength from things long gone.",
    skin: "bald",
    weapon: "tempest",
    hp: 104,
    speed: 282,
    crit: 0.1,
    lifesteal: 0.05,
    speedMult: 1.04,
    color: "#68c7e8",
    shirt: "#3f6fb5",
    wear: ["spiritHat"],
    buffs: [
      { label: "Crit", value: "+10%", tone: "good" },
      { label: "Lifesteal", value: "+5%", tone: "good" },
    ],
  },
  {
    key: "ascetic",
    name: "Ascetic",
    blurb: "Owns nothing, dodges everything.",
    skin: "bald",
    weapon: "hushpuppy",
    hp: 96,
    speed: 330,
    speedMult: 1.2,
    crit: 0.08,
    color: "#f0a63c",
    shirt: "#e08a2c",
    wear: ["asceticBeanie"],
    buffs: [
      { label: "Speed", value: "+20%", tone: "good" },
      { label: "Crit", value: "+8%", tone: "good" },
    ],
  },
  {
    key: "crusader",
    name: "Crusader",
    blurb: "Marches under a banner and never breaks step.",
    skin: "bald",
    weapon: "rocket",
    hp: 138,
    speed: 255,
    hpMult: 1.28,
    damageMult: 1.1,
    speedMult: 0.96,
    color: "#f4d24a",
    shirt: "#3f5fc0",
    wear: ["crusaderHat"],
    buffs: [
      { label: "HP", value: "+28%", tone: "good" },
      { label: "Damage", value: "+10%", tone: "good" },
    ],
  },
  {
    key: "seer",
    name: "Seer",
    blurb: "Sees the wave before it spawns. Heals as it burns.",
    skin: "bald",
    weapon: "laser",
    hp: 102,
    speed: 274,
    lifesteal: 0.15,
    hpMult: 1.05,
    color: "#f5f1e4",
    shirt: "#dcd6c6",
    wear: ["seerHat"],
    buffs: [
      { label: "Lifesteal", value: "+15%", tone: "good" },
      { label: "HP", value: "+5%", tone: "good" },
    ],
  },
  {
    key: "machinist",
    name: "Machinist",
    blurb: "Brings friends. Two of them shoot on their own.",
    skin: "bald",
    weapon: "minigun",
    hp: 106,
    speed: 262,
    turrets: 2,
    turretWeapon: "rifle",
    mats: 25,
    color: "#e8a726",
    shirt: "#5a6470",
    wear: ["machinistCap"],
    buffs: [
      { label: "Turrets", value: "+2", tone: "good" },
      { label: "Materials", value: "+25", tone: "good" },
    ],
  },
  {
    key: "apothecary",
    name: "Apothecary",
    blurb: "Every brew is a gamble that mostly pays off.",
    skin: "bald",
    weapon: "flak",
    hp: 100,
    speed: 278,
    lifesteal: 0.1,
    mats: 30,
    color: "#bfe8a8",
    shirt: "#5f9c3f",
    wear: ["apothecaryHat"],
    buffs: [
      { label: "Lifesteal", value: "+10%", tone: "good" },
      { label: "Materials", value: "+30", tone: "good" },
    ],
  },
  {
    key: "toxicologist",
    name: "Toxicologist",
    blurb: "Leaves a cloud behind. Breathes fine, thanks.",
    skin: "bald",
    weapon: "spitfire",
    hp: 108,
    speed: 266,
    damageMult: 1.16,
    hpMult: 1.06,
    color: "#9fbf5f",
    shirt: "#6f7c52",
    wear: ["toxicBucket"],
    buffs: [
      { label: "Damage", value: "+16%", tone: "good" },
      { label: "HP", value: "+6%", tone: "good" },
    ],
  },
  {
    key: "medic",
    name: "Medic",
    blurb: "Patches up mid-fight and keeps the SMG warm.",
    skin: "bald",
    weapon: "smg",
    hp: 112,
    speed: 285,
    lifesteal: 0.14,
    hpMult: 1.1,
    color: "#e6e2d6",
    shirt: "#f3f2ee",
    wear: ["medicCap"],
    buffs: [
      { label: "Lifesteal", value: "+14%", tone: "good" },
      { label: "HP", value: "+10%", tone: "good" },
    ],
  },
  {
    key: "lunatic",
    name: "Lunatic",
    blurb: "Faster than sense. Hits like a dropped anvil.",
    skin: "bald",
    weapon: "ripper",
    hp: 82,
    speed: 315,
    crit: 0.14,
    speedMult: 1.14,
    damageMult: 1.22,
    hpMult: 0.88,
    color: "#c77dff",
    shirt: "#7b3fb5",
    wear: ["lunaticBeanie"],
    buffs: [
      { label: "Damage", value: "+22%", tone: "good" },
      { label: "Speed", value: "+14%", tone: "good" },
      { label: "HP", value: "-12%", tone: "bad" },
    ],
  },
  {
    key: "harlequin",
    name: "Harlequin",
    blurb: "Chaos with a rhythm. Crits come in threes.",
    skin: "bald",
    weapon: "buzzsaw",
    hp: 94,
    speed: 292,
    crit: 0.18,
    damageMult: 1.06,
    color: "#e14b4b",
    shirt: "#c8402f",
    wear: ["harlequinCap"],
    buffs: [
      { label: "Crit", value: "+18%", tone: "good" },
      { label: "Damage", value: "+6%", tone: "good" },
    ],
  },
  {
    key: "carnival",
    name: "Carnival",
    blurb: "Loud, bright, and somehow always richer after a wave.",
    skin: "bald",
    weapon: "flak",
    hp: 98,
    speed: 286,
    mats: 60,
    speedMult: 1.04,
    color: "#f0a63c",
    shirt: "#4bb45f",
    wear: ["carnivalHat"],
    buffs: [
      { label: "Materials", value: "+60", tone: "good" },
      { label: "Speed", value: "+4%", tone: "good" },
    ],
  },
  {
    key: "wraith",
    name: "Wraith",
    blurb: "Half here. Hard to hit, hard to stop.",
    skin: "bald",
    weapon: "wraith",
    hp: 84,
    speed: 312,
    speedMult: 1.16,
    crit: 0.1,
    hpMult: 0.9,
    color: "#f3f2ee",
    shirt: "#e6e2d6",
    wear: ["wraithHat"],
    buffs: [
      { label: "Speed", value: "+16%", tone: "good" },
      { label: "Crit", value: "+10%", tone: "good" },
      { label: "HP", value: "-10%", tone: "bad" },
    ],
  },
  {
    key: "zealot",
    name: "Zealot",
    blurb: "Dark rituals, cursed minigun, no second thoughts.",
    skin: "bald",
    weapon: "gatling",
    hp: 96,
    speed: 276,
    lifesteal: 0.12,
    damageMult: 1.08,
    color: "#b98bff",
    shirt: "#191a20",
    wear: ["zealotHat"],
    buffs: [
      { label: "Lifesteal", value: "+12%", tone: "good" },
      { label: "Damage", value: "+8%", tone: "good" },
    ],
  },
  {
    key: "fiend",
    name: "Fiend",
    blurb: "Sets the field alight and walks through it.",
    skin: "bald",
    weapon: "havoc",
    hp: 118,
    speed: 272,
    hpMult: 1.12,
    damageMult: 1.26,
    color: "#ff6b5c",
    shirt: "#8a2b3a",
    wear: ["fiendHat"],
    buffs: [
      { label: "Damage", value: "+26%", tone: "good" },
      { label: "HP", value: "+12%", tone: "good" },
    ],
  },
  {
    key: "harvester",
    name: "Harvester",
    blurb: "Death with a quota. Massive damage, massive crit.",
    skin: "bald",
    weapon: "railgun",
    hp: 90,
    speed: 286,
    crit: 0.16,
    damageMult: 1.45,
    speedMult: 1.02,
    color: "#c77dff",
    shirt: "#191a20",
    wear: ["harvesterHat"],
    buffs: [
      { label: "Damage", value: "+45%", tone: "good" },
      { label: "Crit", value: "+16%", tone: "good" },
      { label: "Speed", value: "+2%", tone: "good" },
    ],
  },
  {
    key: "gunslinger",
    name: "Gunslinger",
    blurb: "One hat, two revolvers, zero patience for a fair draw.",
    skin: "bald",
    weapon: "revolver",
    hp: 98,
    speed: 292,
    crit: 0.14,
    damageMult: 1.18,
    speedMult: 1.04,
    color: "#ffc861",
    shirt: "#7a4326",
    wear: ["gunslingerHat"],
    buffs: [
      { label: "Crit", value: "+14%", tone: "good" },
      { label: "Damage", value: "+18%", tone: "good" },
      { label: "Speed", value: "+4%", tone: "good" },
    ],
  },
  {
    key: "sapper",
    name: "Sapper",
    blurb: "Digs in, wires up, and lets the turrets do the talking.",
    skin: "bald",
    weapon: "grenadier",
    hp: 124,
    speed: 252,
    hpMult: 1.2,
    speedMult: 0.92,
    mats: 30,
    turrets: 2,
    turretWeapon: "carbine",
    color: "#8fd47a",
    shirt: "#4a5544",
    wear: ["sapperCap"],
    buffs: [
      { label: "Turrets", value: "+2", tone: "good" },
      { label: "HP", value: "+20%", tone: "good" },
      { label: "Materials", value: "+30", tone: "good" },
      { label: "Speed", value: "-8%", tone: "bad" },
    ],
  },
  {
    key: "sharpshooter",
    name: "Sharpshooter",
    blurb: "Calm cap, steady scope. Every shot is measured twice.",
    skin: "bald",
    weapon: "sniper",
    hp: 86,
    speed: 268,
    crit: 0.22,
    damageMult: 1.35,
    hpMult: 0.92,
    color: "#5ec8ff",
    shirt: "#2f4a6b",
    wear: ["sharpshooterCap"],
    buffs: [
      { label: "Crit", value: "+22%", tone: "good" },
      { label: "Damage", value: "+35%", tone: "good" },
      { label: "HP", value: "-8%", tone: "bad" },
    ],
  },
];

function build(r: Row): ClassDef {
  return {
    key: r.key,
    name: r.name,
    blurb: r.blurb,
    skin: r.skin,
    weapon: r.weapon,
    hp: r.hp,
    speed: r.speed,
    damage: r.damageMult ?? 1,
    turrets: r.turrets ?? 0,
    turretWeapon: r.turretWeapon ?? "pistol",
    crit: r.crit ?? 0,
    lifesteal: r.lifesteal ?? 0,
    hpMult: r.hpMult ?? 1,
    speedMult: r.speedMult ?? 1,
    damageMult: r.damageMult ?? 1,
    startingMaterials: r.mats ?? 0,
    color: r.color,
    shirt: r.shirt,
    accessories: r.wear,
    buffs: r.buffs,
  };
}

export const CLASSES: Record<ClassKey, ClassDef> = Object.fromEntries(
  ROWS.map((r) => [r.key, build(r)]),
) as Record<ClassKey, ClassDef>;

export const CLASS_KEYS: ClassKey[] = ROWS.map((r) => r.key);

export function classForSkin(skin: CharacterKey): ClassKey {
  const match = CLASS_KEYS.find((k) => CLASSES[k].skin === skin);
  return match ?? "grunt";
}
