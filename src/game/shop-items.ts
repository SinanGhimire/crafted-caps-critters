import type { GameState } from "./types";

export type ItemRarity = "common" | "uncommon" | "rare" | "epic" | "legendary";

export interface ShopItem {
  id: string;
  name: string;
  desc: string;
  icon: string;
  rarity: ItemRarity;
  /** base price in materials; scales with wave and copies owned */
  cost: number;
  /** how many copies one run may hold */
  maxStacks: number;
  apply: (s: GameState) => void;
}

export const ITEM_RARITY_COLOR: Record<ItemRarity, string> = {
  common: "#9fd8ff",
  uncommon: "#7bf2a8",
  rare: "#c77dff",
  epic: "#ffd166",
  legendary: "#ff7b4d",
};

const RARITY_WEIGHT: Record<ItemRarity, number> = {
  common: 6,
  uncommon: 4,
  rare: 2.4,
  epic: 1.2,
  legendary: 0.5,
};

/** Brotato-style permanent run items, bought between waves alongside guns. */
export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "medkit",
    name: "Field Medkit",
    desc: "Heal 40% of max HP right now",
    icon: "✚",
    rarity: "common",
    cost: 22,
    maxStacks: 99,
    apply: (s) => {
      s.player.hp = Math.min(s.player.maxHp, s.player.hp + Math.round(s.player.maxHp * 0.4));
    },
  },
  {
    id: "plating",
    name: "Scrap Plating",
    desc: "+20 max HP, healed instantly",
    icon: "▣",
    rarity: "common",
    cost: 30,
    maxStacks: 12,
    apply: (s) => {
      s.player.maxHp += 20;
      s.player.hp += 20;
    },
  },
  {
    id: "boots",
    name: "Runner Boots",
    desc: "+8% movement speed",
    icon: "»",
    rarity: "common",
    cost: 28,
    maxStacks: 10,
    apply: (s) => {
      s.player.baseSpeed *= 1.08;
      s.player.speed = s.player.baseSpeed;
    },
  },
  {
    id: "powder",
    name: "Hot Powder",
    desc: "+12% bullet damage",
    icon: "◈",
    rarity: "common",
    cost: 34,
    maxStacks: 12,
    apply: (s) => {
      s.player.damageMult *= 1.12;
    },
  },
  {
    id: "spring",
    name: "Trigger Spring",
    desc: "+10% fire rate",
    icon: "⟶",
    rarity: "uncommon",
    cost: 38,
    maxStacks: 10,
    apply: (s) => {
      s.player.rateMult = Math.min(4, s.player.rateMult * 1.1);
    },
  },
  {
    id: "scope",
    name: "Etched Scope",
    desc: "+8% crit chance, tighter spread",
    icon: "✦",
    rarity: "uncommon",
    cost: 42,
    maxStacks: 8,
    apply: (s) => {
      s.player.mods.crit = Math.min(0.85, s.player.mods.crit + 0.08);
      s.player.mods.spreadMult *= 0.92;
    },
  },
  {
    id: "sabot",
    name: "Sabot Rounds",
    desc: "+25% projectile speed",
    icon: "↯",
    rarity: "uncommon",
    cost: 36,
    maxStacks: 6,
    apply: (s) => {
      s.player.mods.projSpeedMult *= 1.25;
    },
  },
  {
    id: "hammer",
    name: "Recoil Hammer",
    desc: "+45% knockback",
    icon: "⇴",
    rarity: "uncommon",
    cost: 32,
    maxStacks: 6,
    apply: (s) => {
      s.player.mods.knockMult += 0.45;
    },
  },
  {
    id: "railcore",
    name: "Rail Core",
    desc: "Bullets pierce 1 extra enemy",
    icon: "⌁",
    rarity: "rare",
    cost: 58,
    maxStacks: 5,
    apply: (s) => {
      s.player.mods.pierce += 1;
    },
  },
  {
    id: "splitter",
    name: "Split Barrel",
    desc: "+1 projectile per shot",
    icon: "⁙",
    rarity: "rare",
    cost: 72,
    maxStacks: 4,
    apply: (s) => {
      s.player.mods.extraProjectiles += 1;
      s.player.mods.spreadMult += 0.3;
    },
  },
  {
    id: "guillotine",
    name: "Guillotine",
    desc: "+0.6x critical damage",
    icon: "☠",
    rarity: "rare",
    cost: 64,
    maxStacks: 5,
    apply: (s) => {
      s.player.mods.critMult += 0.6;
    },
  },
  {
    id: "vampfang",
    name: "Vampire Fang",
    desc: "Steal life on every hit",
    icon: "❥",
    rarity: "epic",
    cost: 95,
    maxStacks: 4,
    apply: (s) => {
      s.player.mods.lifesteal += 0.07;
    },
  },
  {
    id: "volatile",
    name: "Volatile Shells",
    desc: "Bullets explode on impact",
    icon: "✺",
    rarity: "epic",
    cost: 110,
    maxStacks: 3,
    apply: (s) => {
      s.player.mods.explosive += 1;
    },
  },
  {
    id: "warcore",
    name: "War Core",
    desc: "+25% damage, +15% fire rate, -10 max HP",
    icon: "★",
    rarity: "legendary",
    cost: 150,
    maxStacks: 3,
    apply: (s) => {
      s.player.damageMult *= 1.25;
      s.player.rateMult = Math.min(4, s.player.rateMult * 1.15);
      s.player.maxHp = Math.max(20, s.player.maxHp - 10);
      s.player.hp = Math.min(s.player.hp, s.player.maxHp);
    },
  },
];

export const ITEM_MAP: Record<string, ShopItem> = Object.fromEntries(
  SHOP_ITEMS.map((i) => [i.id, i]),
);

/** Price grows with the wave and with each copy already owned. */
export function itemPrice(id: string, wave: number, owned: number) {
  const item = ITEM_MAP[id];
  if (!item) return 0;
  return Math.round(item.cost * (1 + wave * 0.05) * (1 + owned * 0.35));
}

/** Roll a shelf of distinct items, respecting stack caps and rarity weight. */
export function rollItems(owned: Record<string, number>, count = 4): string[] {
  const bag = SHOP_ITEMS.filter((i) => (owned[i.id] ?? 0) < i.maxStacks);
  const out: string[] = [];
  while (out.length < count && bag.length) {
    const total = bag.reduce((n, i) => n + RARITY_WEIGHT[i.rarity], 0);
    let r = Math.random() * total;
    let idx = 0;
    for (let i = 0; i < bag.length; i++) {
      r -= RARITY_WEIGHT[bag[i]!.rarity];
      if (r <= 0) {
        idx = i;
        break;
      }
    }
    out.push(bag.splice(idx, 1)[0]!.id);
  }
  return out;
}
