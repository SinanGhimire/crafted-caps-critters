import type { CharacterKey } from "./types";
import {
  CRITTER_ENEMIES,
  CRITTER_HEROES,
  CRITTER_MAP,
  critterSrc,
  type CritterEnemyKey,
} from "./critters";
import { ENEMY_ART } from "./enemy-art";



/* ---- player skins (hand-animated vector heroes) ---- */
import hSpikeIdle from "@/assets/heroes/spike-idle.png";
import hSpikeWalk from "@/assets/heroes/spike-walk.png";
import hSpikeDeath from "@/assets/heroes/spike-death.png";
import hPunkIdle from "@/assets/heroes/punk-idle.png";
import hPunkWalk from "@/assets/heroes/punk-walk.png";
import hPunkDeath from "@/assets/heroes/punk-death.png";
import hCrownIdle from "@/assets/heroes/crown-idle.png";
import hCrownWalk from "@/assets/heroes/crown-walk.png";
import hCrownDeath from "@/assets/heroes/crown-death.png";
import hBaldIdle from "@/assets/heroes/bald-idle.png";
import hBaldWalk from "@/assets/heroes/bald-walk.png";
import hBaldDeath from "@/assets/heroes/bald-death.png";


/* ---- props & fx ---- */
import gunPistolPng from "@/assets/sprites/gun-pistol.png";
import gunRiflePng from "@/assets/sprites/gun-rifle.png";
import gunShotgunPng from "@/assets/sprites/gun-shotgun.png";
import muzzlePng from "@/assets/sprites/muzzle.png";
import bulletPng from "@/assets/sprites/bullet.png";
import crosshairPng from "@/assets/sprites2/crosshair.png";
import rock1Png from "@/assets/sprites/rockt1.png";
import rock2Png from "@/assets/sprites/rockt2.png";
import rock3Png from "@/assets/sprites/rockt3.png";
import floorTilesPng from "@/assets/sprites/floor_tiles.png";

export interface Strip {
  img: HTMLImageElement;
  frames: number;
}

export type AnimKey = "idle" | "walk" | "death";

export type ActorKey = CritterEnemyKey;

/** Hand-written sprite keys used directly by the renderer. */
export type CoreSingleKey =
  | "gun"
  | "gunRifle"
  | "gunPistol"
  | "gunShotgun"
  | "muzzle"
  | "bullet"
  | "crosshair"
  | "rock1"
  | "rock2"
  | "rock3";

/** Pack art registers extra keys dynamically (see PACK_SRC). */
export type SingleKey = CoreSingleKey | (string & {});

export type Singles = Record<CoreSingleKey, HTMLImageElement> &
  Record<string, HTMLImageElement | undefined>;

export interface Sprites {
  strips: Record<ActorKey, Record<AnimKey, Strip>>;
  playerSkins: Record<CharacterKey, Record<AnimKey, Strip>>;
  singles: Singles;
}

const IDLE_FRAMES = 6;
const WALK_FRAMES = 8;
const DEATH_FRAMES = 10;

/** [idle, walk, death] source urls per actor. Images are only created client-side. */


const ACTOR_KEYS: ActorKey[] = CRITTER_ENEMIES.map((d) => d.key) as ActorKey[];

function proceduralActorSrc(key: ActorKey): [string, string, string] {
  const design = CRITTER_MAP[key];
  return design ? critterSrc(design) : ["", "", ""];
}

/** Hand-drawn strips when the enemy has art; procedural critter renderer otherwise. */
async function actorSrc(key: ActorKey): Promise<[string, string, string]> {
  const art = ENEMY_ART[key];
  if (art) return art;
  return proceduralActorSrc(key);

}



const PLAYER_STATIC: Partial<Record<CharacterKey, [string, string, string]>> = {
  spike: [hSpikeIdle, hSpikeWalk, hSpikeDeath],
  punk: [hPunkIdle, hPunkWalk, hPunkDeath],
  crown: [hCrownIdle, hCrownWalk, hCrownDeath],
  bald: [hBaldIdle, hBaldWalk, hBaldDeath],
};

/** The four hand-animated heroes — the whole playable roster. */
const PLAYER_KEYS: CharacterKey[] = ["bald", "spike", "punk", "crown"];

function playerSrc(key: CharacterKey): [string, string, string] {
  return PLAYER_STATIC[key] ?? PLAYER_STATIC.bald!;
}



/** Every gun png shipped in the art packs, keyed by file name. */
const PACK_MODULES = import.meta.glob<{ default: string }>(
  "@/assets/sprites/guns/*.png",
  { eager: true },
) as Record<string, { default: string }>;

export const PACK_SRC: Record<string, string> = Object.fromEntries(
  Object.entries(PACK_MODULES).map(([path, mod]) => [
    path.split("/").pop()!.replace(/\.png$/, ""),
    mod.default,
  ]),
);

/** Sorted list of every pack weapon sprite key — used to build the armoury. */
export const PACK_KEYS: string[] = Object.keys(PACK_SRC).sort();

/** Ammo art, registered under a `bl_` prefix so it can't clash with gun keys. */
const BULLET_MODULES = import.meta.glob<{ default: string }>(
  "@/assets/sprites/bullets/*.png",
  { eager: true },
) as Record<string, { default: string }>;

export const BULLET_SRC: Record<string, string> = Object.fromEntries(
  Object.entries(BULLET_MODULES).map(([path, mod]) => [
    "bl_" + path.split("/").pop()!.replace(/\.png$/, ""),
    mod.default,
  ]),
);

export const SINGLE_SRC: Record<string, string> = {
  ...PACK_SRC,
  ...BULLET_SRC,
  floorTiles: floorTilesPng,
  gun: gunRiflePng,
  gunRifle: gunRiflePng,
  gunPistol: gunPistolPng,
  gunShotgun: gunShotgunPng,
  muzzle: muzzlePng,
  bullet: bulletPng,
  crosshair: crosshairPng,
  rock1: rock1Png,
  rock2: rock2Png,
  rock3: rock3Png,
};


export const PLAYER_CHARACTERS: { key: CharacterKey; portrait: string; frames: number }[] =
  PLAYER_KEYS.map((key) => ({
    key,
    get portrait() {
      return playerSrc(key)[0];
    },
    frames: 1,
  }));


function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(img);
    img.src = src;
  });
}

async function loadAnims(
  src: [string, string, string],
  counts: [number, number, number] = [IDLE_FRAMES, WALK_FRAMES, DEATH_FRAMES],
): Promise<Record<AnimKey, Strip>> {
  const [idle, walk, death] = await Promise.all(src.map(loadImage));
  return {
    idle: { img: idle!, frames: counts[0] },
    walk: { img: walk!, frames: counts[1] },
    death: { img: death!, frames: counts[2] },
  };
}

/** The vector hero pack ships a 6-frame idle, 8-frame walk and 5-frame death. */
// Idle artwork is a single frame; walk and death are sprite strips.
const PLAYER_FRAMES: [number, number, number] = [1, 8, 5];

let cache: Sprites | null = null;
let inflight: Promise<Sprites> | null = null;

export function loadSprites(): Promise<Sprites> {
  if (cache) return Promise.resolve(cache);
  if (inflight) return inflight;
  inflight = (async () => {
    const actorKeys = ACTOR_KEYS;
    const playerKeys = PLAYER_KEYS;
    const singleKeys = Object.keys(SINGLE_SRC) as SingleKey[];

    const [actorAnims, playerAnims, singleImgs] = await Promise.all([
      Promise.all(actorKeys.map(async (k) => loadAnims(await actorSrc(k)))),
      Promise.all(playerKeys.map((k) => loadAnims(playerSrc(k), PLAYER_FRAMES))),
      Promise.all(singleKeys.map((k) => loadImage(SINGLE_SRC[k] ?? ""))),
    ]);


    const strips = Object.fromEntries(
      actorKeys.map((k, i) => [k, actorAnims[i]!]),
    ) as Record<ActorKey, Record<AnimKey, Strip>>;
    const playerSkins = Object.fromEntries(
      playerKeys.map((k, i) => [k, playerAnims[i]!]),
    ) as Record<CharacterKey, Record<AnimKey, Strip>>;
    const singles = Object.fromEntries(
      singleKeys.map((k, i) => [k, singleImgs[i]!]),
    ) as Singles;

    cache = { strips, playerSkins, singles };
    return cache;
  })();
  return inflight;
}

