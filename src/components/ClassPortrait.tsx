import { ACCESSORIES, sortAccessories, type AccessoryId } from "@/game/accessories";
import { CLASSES, type ClassKey } from "@/game/classes";
import { HERO_ANCHORS, HERO_HEAD_FITS } from "@/game/hero-anchors";
import type { CharacterKey } from "@/game/types";

import baldIdle from "@/assets/heroes/bald-idle.png";
import spikeIdle from "@/assets/heroes/spike-idle.png";
import punkIdle from "@/assets/heroes/punk-idle.png";
import crownIdle from "@/assets/heroes/crown-idle.png";

/**
 * Menu portraits use the EXACT in-game hero sprite (the same idle frame the
 * arena renders) with the class hat placed through the same head-anchor maths
 * the canvas renderer uses. Menu and fight can never drift apart.
 */
const SKIN_ART: Record<string, { src: string; w: number; h: number }> = {
  bald: { src: baldIdle, w: 177, h: 256 },
  spike: { src: spikeIdle, w: 192, h: 256 },
  punk: { src: punkIdle, w: 177, h: 256 },
  crown: { src: crownIdle, w: 195, h: 256 },
};

/** accessory space geometry (mirrors game/accessory-images.ts) */
const HEAD_TOP = 44;
const HEAD_CX = 100;
const HEAD_W = 104;

export function CharacterFigure({
  accessories,
  skin = "bald",
  className,
}: {
  accessories: readonly AccessoryId[];
  skin?: CharacterKey;
  /** kept for callers; the sprite carries its own colours now */
  shirt?: string;
  className?: string;
}) {
  const art = SKIN_ART[skin] ?? SKIN_ART["bald"]!;
  const anchors = HERO_ANCHORS[skin] ?? HERO_ANCHORS["bald"]!;
  const a = anchors.idle[0]!;
  const fit = HERO_HEAD_FITS[skin] ?? { scale: 1, x: 0, y: 0 };

  const headCx = a.cx * art.w + fit.x * art.w;
  const headTop = (a.top + fit.y) * art.h;
  const headW = a.w * art.w * fit.scale;
  const s = headW / HEAD_W;
  const originX = headCx - HEAD_CX * s;
  const originY = headTop - HEAD_TOP * s;

  const worn = sortAccessories(accessories).slice(0, 1);

  // The hat art box is wider and taller than the hero frame (horns, feathers,
  // candles, ear flaps all live outside the skull), so the viewBox is the union
  // of the sprite box and the placed hat box — nothing can be clipped.
  let minX = 0;
  let minY = 0;
  let maxX = art.w;
  let maxY = art.h;
  for (const id of worn) {
    const hat = ACCESSORIES[id];
    if (!hat) continue;
    const hx = originX + hat.x * s;
    const hy = originY + hat.top * s;
    minX = Math.min(minX, hx);
    minY = Math.min(minY, hy);
    maxX = Math.max(maxX, hx + hat.w * s);
    maxY = Math.max(maxY, hy + hat.h * s);
  }
  const m = art.w * 0.06;
  minX -= m;
  minY -= m;
  maxX += m;
  maxY += m * 1.4;

  return (
    <svg
      viewBox={`${minX} ${minY} ${maxX - minX} ${maxY - minY}`}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ position: "absolute", inset: 0, height: "100%", width: "100%" }}
      aria-hidden
      role="presentation"
    >
      <ellipse
        cx={art.w / 2}
        cy={art.h - 6}
        rx={art.w * 0.28}
        ry={art.w * 0.06}
        fill="#000"
        opacity="0.28"
      />
      <image href={art.src} x={0} y={0} width={art.w} height={art.h} />
      {worn.map((id) => {
        const hat = ACCESSORIES[id];
        if (!hat) return null;
        return (
          <image
            key={id}
            href={hat.url}
            x={originX + hat.x * s}
            y={originY + hat.top * s}
            width={hat.w * s}
            height={hat.h * s}
            preserveAspectRatio="xMidYMid meet"
          />
        );
      })}
    </svg>
  );
}

/** Class portrait: the in-game hero sprite wearing that class's hat. */
export function ClassPortrait({
  cls,
  skin,
  className,
}: {
  cls: ClassKey;
  skin?: CharacterKey;
  className?: string;
}) {
  const def = CLASSES[cls];
  return (
    <div
      className={className}
      style={{ position: "relative", alignSelf: "stretch", justifySelf: "stretch" }}
    >
      <CharacterFigure
        accessories={def.accessories}
        skin={skin ?? def.skin}
        className="h-full w-full"
      />
    </div>
  );
}
