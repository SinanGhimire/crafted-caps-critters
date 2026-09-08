/**
 * The class tree: five story paths, each a chain of classes you unlock in order.
 * Unlocking is permanent and stored on the profile as `class:<key>`.
 */
import { CLASSES, type ClassKey } from "./classes";

export interface TreeNode {
  key: ClassKey;
  /** Coins needed to unlock. */
  cost: number;
  /** Account level needed. */
  reqLevel: number;
  /** One or two lines of lore for this step of the path. */
  story: string;
}

export interface TreeBranch {
  id: string;
  name: string;
  intro: string;
  color: string;
  nodes: TreeNode[];
}

function chain(
  keys: ClassKey[],
  stories: string[],
  costStep: number,
  levelStep: number,
): TreeNode[] {
  return keys.map((key, i) => ({
    key,
    cost: i === 0 ? 0 : Math.round(costStep * i * (1 + i * 0.35)),
    reqLevel: i === 0 ? 1 : 1 + i * levelStep,
    story: stories[i] ?? CLASSES[key].blurb,
  }));
}

export const CLASS_TREE: TreeBranch[] = [
  {
    id: "iron",
    name: "The Iron Line",
    intro: "Those who stood in the breach when the first echo broke open.",
    color: "#e8b84d",
    nodes: chain(
      ["vagrant", "grunt", "sentinel", "crusader", "champion", "berserker", "marauder"],
      [
        "You woke in the ash with a scavenged shotgun and no name worth keeping.",
        "The remnant militia took you in. Drill, dig, hold the line, repeat.",
        "You held a gate alone for nine waves. They started calling you the wall.",
        "A banner was pressed into your hands. You have not lowered it since.",
        "The arena crowds learned your name before the enemy did.",
        "Somewhere in the noise you stopped feeling the wounds. That worried the medics.",
        "Now you charge first, laughing, into whatever the echo throws out.",
      ],
      900,
      2,
    ),
  },
  {
    id: "shadow",
    name: "The Quiet Path",
    intro: "Killers who learned that being seen is the only real wound.",
    color: "#c77dff",
    nodes: chain(
      ["scrapper", "skirmisher", "shadowblade", "wraith", "harvester", "lunatic", "harlequin"],
      [
        "Junkyard childhood. Fast hands, faster exits.",
        "You learned to throw, duck, and be gone before the echo answered.",
        "A blade taught in silence. Enormous damage, nothing to hide behind.",
        "You spent too long between the echoes and came back only half here.",
        "Death gave you a quota and a scythe of muzzle flash.",
        "The quota broke something. Now you move faster than sense allows.",
        "Chaos found a rhythm in you, and it crits in threes.",
      ],
      1100,
      2,
    ),
  },
  {
    id: "arcane",
    name: "The Arcane Choir",
    intro: "Voices that bend the echo instead of shooting at it.",
    color: "#7ce7ff",
    nodes: chain(
      ["arcanist", "hexer", "spiritcaller", "seer", "warden", "zealot", "fiend"],
      [
        "You bent plasma into a shape it should not hold, and it held.",
        "Curse first, aim second. The rot does the rest.",
        "You borrowed strength from something long gone. It wants it back.",
        "You began to see waves before they spawned.",
        "The grove answered: roots, antlers and artillery.",
        "The rituals turned dark and the minigun turned cursed.",
        "Now you set the field alight and walk through it unbothered.",
      ],
      1300,
      3,
    ),
  },
  {
    id: "lab",
    name: "The Field Lab",
    intro: "Engineers and chemists keeping the survivors upright.",
    color: "#7bf2a8",
    nodes: chain(
      ["medic", "apothecary", "toxicologist", "machinist", "sapper", "ascetic"],
      [
        "You patched up mid-fight and kept the SMG warm.",
        "Every brew is a gamble. Most of them pay out.",
        "The cloud you leave behind kills slower and surer.",
        "You built friends. Two of them shoot on their own.",
        "Dig in, wire up, let the turrets do the talking.",
        "In the end you gave the gear away and dodged everything instead.",
      ],
      1000,
      3,
    ),
  },
  {
    id: "longshot",
    name: "The Long Shot",
    intro: "Marksmen and opportunists who never let it get close.",
    color: "#ff9f6b",
    nodes: chain(
      ["gunslinger", "sharpshooter", "trapper", "pathfinder", "corsair", "carnival"],
      [
        "One hat, two revolvers, zero patience for a fair draw.",
        "Calm cap, steady scope, every shot measured twice.",
        "You stopped chasing and started waiting. Already aiming.",
        "The wilds outside the arena became a map only you can read.",
        "You take what floats and leave the wreck behind.",
        "Loud, bright, and somehow always richer after a wave.",
      ],
      1200,
      2,
    ),
  },
];

export const TREE_NODES: TreeNode[] = CLASS_TREE.flatMap((b) => b.nodes);

/** Classes available from the very start (first node of each path). */
export const STARTER_CLASSES: ClassKey[] = CLASS_TREE.map((b) => b.nodes[0]!.key);

export function isClassUnlocked(key: ClassKey, owned: string[]) {
  return STARTER_CLASSES.includes(key) || owned.includes(`class:${key}`);
}

/** The node right before `key` in its path, or null when it is a path start. */
export function previousNode(key: ClassKey): TreeNode | null {
  for (const b of CLASS_TREE) {
    const i = b.nodes.findIndex((n) => n.key === key);
    if (i > 0) return b.nodes[i - 1]!;
    if (i === 0) return null;
  }
  return null;
}

export function canUnlock(
  node: TreeNode,
  opts: { owned: string[]; coins: number; level: number },
) {
  if (isClassUnlocked(node.key, opts.owned)) return { ok: false, reason: "Unlocked" };
  const prev = previousNode(node.key);
  if (prev && !isClassUnlocked(prev.key, opts.owned))
    return { ok: false, reason: `Unlock ${CLASSES[prev.key].name} first` };
  if (opts.level < node.reqLevel) return { ok: false, reason: `Needs level ${node.reqLevel}` };
  if (opts.coins < node.cost) return { ok: false, reason: "Not enough coins" };
  return { ok: true, reason: "" };
}
