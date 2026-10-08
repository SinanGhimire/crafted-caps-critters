import content from '@/assets/side-content.json';

export interface EnemyAsset {
  key: string; name: string; flying: boolean; boss: boolean;
  idle: string; walk: string; attack: string; death: string;
  frames: { idle: number; walk: number; attack: number; death: number };
}
export interface BackgroundAsset { key: string; name: string; layers: string[]; tile?: string; palette?: { body: string; edge: string; detail: string } }
export const SIDE_ENEMIES = content.enemies as EnemyAsset[];
export const ENVIRONMENTS = content.backgrounds as BackgroundAsset[];
const images = new Map<string, HTMLImageElement>();

/** Lazy loading keeps the entire collection off the startup memory budget. */
export function contentImage(url: string) {
  if (!url || typeof Image === 'undefined') return undefined;
  let image = images.get(url);
  if (!image) {
    image = new Image();
    image.src = url;
    images.set(url, image);
    if (images.size > 100) {
      const oldest = images.keys().next().value;
      if (oldest) images.delete(oldest);
    }
  }
  return image.complete && image.naturalWidth > 0 ? image : undefined;
}

export function enemyAsset(key?: string) { return SIDE_ENEMIES.find((e) => e.key === key); }
export function isAirborne(species: string, packKey?: string) {
  return enemyAsset(packKey)?.flying ?? ['e_gnat', 'e_bat', 'e_flyer'].includes(species);
}

export function encounterAsset(wave: number, index: number, boss = false) {
  const pool = SIDE_ENEMIES.filter((e) => e.boss === boss);
  if (!pool.length) return undefined;
  // Rotating chapters introduce fresh foes without hiding the later packs.
  return pool[(boss ? Math.floor(wave / 10) - 1 : (wave - 1) * 3 + index) % pool.length];
}

export function environmentAt(index: number) {
  return ENVIRONMENTS[((index % ENVIRONMENTS.length) + ENVIRONMENTS.length) % ENVIRONMENTS.length];
}