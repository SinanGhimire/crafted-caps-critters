/**
 * Class headwear.
 *
 * Every class owns one purpose-built cap, hat or beanie. All art is drawn in a
 * shared 200x130 "hat box" with one strict convention:
 *
 *   - the crown spans x 48 -> 152 (exactly the 104px skull width)
 *   - the hat meets the head on the fit line y = 78
 *
 * Because every silhouette obeys that convention, placement is pure maths:
 * a hat is scaled by `fit` (how tightly the crown grips the skull) and dropped
 * by `sit` (how low it rides on the forehead). No per-hat nudging, so menu
 * portraits and the arena renderer always agree.
 */

export type AccessorySlot = "hat";

export type AccessoryId =
  | "roadBeanie"
  | "scrapCap"
  | "skirmishCap"
  | "fieldCap"
  | "shadowBeanie"
  | "raiderHat"
  | "corsairTricorn"
  | "rageBeanie"
  | "sentinelBowler"
  | "championHat"
  | "trapperHat"
  | "pathfinderCap"
  | "arcaneHat"
  | "hexHat"
  | "wardenHat"
  | "spiritHat"
  | "asceticBeanie"
  | "crusaderHat"
  | "seerHat"
  | "machinistCap"
  | "apothecaryHat"
  | "toxicBucket"
  | "medicCap"
  | "lunaticBeanie"
  | "harlequinCap"
  | "carnivalHat"
  | "wraithHat"
  | "zealotHat"
  | "fiendHat"
  | "harvesterHat"
  | "gunslingerHat"
  | "sapperCap"
  | "sharpshooterCap";

type HatShape =
  | "beanie"
  | "cap"
  | "flatcap"
  | "fedora"
  | "cowboy"
  | "tricorn"
  | "bowler"
  | "wizard"
  | "bucket"
  | "top"
  | "hood";

/** Extra flourishes that make two hats of the same family read differently. */
type HatDetail =
  | "none"
  | "pompom"
  | "stripes"
  | "patch"
  | "goggles"
  | "feather"
  | "pin"
  | "stitches"
  | "fur"
  | "bullets"
  | "coin"
  | "candle"
  | "tassel"
  | "leaf"
  | "cross"
  | "veil"
  | "star"
  | "vial"
  | "gear"
  | "eye"
  | "chain"
  | "skull"
  | "flame";

interface HatSpec {
  name: string;
  shape: HatShape;
  main: string;
  shade: string;
  accent: string;
  detail: HatDetail;
  /** crown grip, 1 = exactly the skull width */
  fit?: number;
  /** how far the fit line sits below the top of the skull, in head pixels */
  sit?: number;
  /** crown height multiplier */
  tall?: number;
  /** brim width multiplier */
  brim?: number;
}

const SPECS: Record<AccessoryId, HatSpec> = {
  roadBeanie: { name: "Road Beanie", shape: "beanie", main: "#8c3546", shade: "#4b1f2a", accent: "#e0a862", detail: "stripes", sit: 20 },
  scrapCap: { name: "Scrap Cap", shape: "cap", main: "#6d803f", shade: "#3a4525", accent: "#e0b054", detail: "patch", sit: 19 },
  skirmishCap: { name: "Skirmish Flat Cap", shape: "flatcap", main: "#57706a", shade: "#2e403c", accent: "#ddcda8", detail: "stitches", sit: 21 },
  fieldCap: { name: "Field Cap", shape: "cap", main: "#4f6339", shade: "#2b3722", accent: "#c3d383", detail: "pin", fit: 1.02, sit: 20 },
  shadowBeanie: { name: "Shadow Beanie", shape: "hood", main: "#272733", shade: "#12121b", accent: "#8a72bd", detail: "none", fit: 1.06, sit: 16, tall: 1.05 },
  raiderHat: { name: "Raider Hat", shape: "cowboy", main: "#7a4b32", shade: "#3c261c", accent: "#cf6a48", detail: "bullets", sit: 18, brim: 1.05 },
  corsairTricorn: { name: "Corsair Tricorn", shape: "tricorn", main: "#243449", shade: "#0f1721", accent: "#dcae4d", detail: "coin", sit: 17 },
  rageBeanie: { name: "Rage Beanie", shape: "beanie", main: "#9c362a", shade: "#521c17", accent: "#f0803f", detail: "flame", sit: 19, tall: 0.9 },
  sentinelBowler: { name: "Sentinel Bowler", shape: "bowler", main: "#48596b", shade: "#26313c", accent: "#93b3bd", detail: "chain", sit: 18 },
  championHat: { name: "Champion Fedora", shape: "fedora", main: "#ad732a", shade: "#5d3b17", accent: "#f0cf72", detail: "star", sit: 17 },
  trapperHat: { name: "Trapper Hat", shape: "bucket", main: "#5f4b34", shade: "#31261a", accent: "#8fae6b", detail: "fur", fit: 1.08, sit: 17 },
  pathfinderCap: { name: "Pathfinder Cap", shape: "flatcap", main: "#4d7044", shade: "#294026", accent: "#b2cf72", detail: "leaf", sit: 20 },
  arcaneHat: { name: "Arcane Hat", shape: "wizard", main: "#5e4384", shade: "#2d2140", accent: "#7cc4d4", detail: "star", sit: 16, tall: 1.15 },
  hexHat: { name: "Hex Hat", shape: "wizard", main: "#3f2851", shade: "#1e1327", accent: "#bb6f9a", detail: "eye", sit: 16, tall: 1.3 },
  wardenHat: { name: "Warden Widebrim", shape: "fedora", main: "#3f5f36", shade: "#21351d", accent: "#9cc477", detail: "leaf", sit: 17, brim: 1.12 },
  spiritHat: { name: "Spirit Hat", shape: "wizard", main: "#2f5a70", shade: "#193240", accent: "#7fd6d8", detail: "candle", sit: 16, tall: 1.1 },
  asceticBeanie: { name: "Ascetic Wrap", shape: "hood", main: "#ad6230", shade: "#5e341a", accent: "#e6bd73", detail: "stripes", fit: 1.05, sit: 18 },
  crusaderHat: { name: "Crusader Fedora", shape: "fedora", main: "#cdc094", shade: "#6d6547", accent: "#a94b3a", detail: "cross", sit: 17 },
  seerHat: { name: "Seer Hat", shape: "wizard", main: "#e3d9c2", shade: "#8d846f", accent: "#79aaad", detail: "veil", sit: 15, tall: 1.2 },
  machinistCap: { name: "Machinist Cap", shape: "cap", main: "#8a5c30", shade: "#4a3019", accent: "#d9973f", detail: "goggles", sit: 19 },
  apothecaryHat: { name: "Apothecary Hat", shape: "bowler", main: "#546a43", shade: "#2d3b24", accent: "#b4c96e", detail: "vial", sit: 18 },
  toxicBucket: { name: "Toxic Bucket Hat", shape: "bucket", main: "#6b7a3b", shade: "#374122", accent: "#b3d94f", detail: "stitches", fit: 1.05, sit: 19 },
  medicCap: { name: "Medic Cap", shape: "cap", main: "#e0dac6", shade: "#7c7666", accent: "#c34741", detail: "cross", sit: 19 },
  lunaticBeanie: { name: "Lunatic Beanie", shape: "beanie", main: "#7c4a78", shade: "#3f253d", accent: "#e3736c", detail: "pompom", sit: 19, tall: 1.15 },
  harlequinCap: { name: "Harlequin Cap", shape: "flatcap", main: "#98374a", shade: "#4d1c26", accent: "#e5b452", detail: "tassel", sit: 20 },
  carnivalHat: { name: "Carnival Top Hat", shape: "top", main: "#3c6455", shade: "#1f382e", accent: "#dc6a4f", detail: "stripes", sit: 17, tall: 1.05 },
  wraithHat: { name: "Wraith Fedora", shape: "fedora", main: "#6f6b7c", shade: "#343241", accent: "#aec6c4", detail: "veil", sit: 16 },
  zealotHat: { name: "Zealot Hood", shape: "hood", main: "#503854", shade: "#271a2b", accent: "#b1544f", detail: "cross", fit: 1.06, sit: 15, tall: 1.1 },
  fiendHat: { name: "Fiend Tricorn", shape: "tricorn", main: "#6f3033", shade: "#38161a", accent: "#e5643f", detail: "skull", sit: 17 },
  harvesterHat: { name: "Harvester Widebrim", shape: "cowboy", main: "#22232b", shade: "#0e0f14", accent: "#8a6f92", detail: "skull", sit: 17, brim: 1.1 },
  gunslingerHat: { name: "Gunslinger Hat", shape: "cowboy", main: "#7d4c28", shade: "#402716", accent: "#dcaa4f", detail: "feather", sit: 18 },
  sapperCap: { name: "Sapper Work Cap", shape: "cap", main: "#5c6446", shade: "#31371f", accent: "#d19340", detail: "gear", sit: 19 },
  sharpshooterCap: { name: "Sharpshooter Cap", shape: "flatcap", main: "#31506a", shade: "#1a2c3c", accent: "#77b3bb", detail: "goggles", sit: 20 },
};

const OUTLINE = "#171218";

/** shared stroke for every silhouette part */
const EDGE = `stroke="${OUTLINE}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
const THIN = `stroke="${OUTLINE}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"`;

/* --------------------------- silhouette library ---------------------------- */
/* Every path is drawn in the 200x130 box, crown x48..152, fit line y=78.      */

function crownPath(shape: HatShape, tall: number) {
  // crown top y: 78 - height
  const h = (base: number) => 78 - base * tall;
  switch (shape) {
    case "beanie":
      return `M48 78 Q48 ${h(56)} 100 ${h(60)} Q152 ${h(56)} 152 78 Z`;
    case "hood":
      return `M46 80 Q42 ${h(52)} 100 ${h(66)} Q158 ${h(52)} 154 80 Q100 ${h(-6)} 46 80 Z`;
    case "cap":
      return `M48 78 Q49 ${h(48)} 100 ${h(52)} Q151 ${h(48)} 152 78 Z`;
    case "flatcap":
      return `M48 78 Q52 ${h(34)} 100 ${h(36)} Q150 ${h(36)} 154 78 Z`;
    case "fedora":
      return `M56 78 L62 ${h(50)} Q100 ${h(62)} 138 ${h(50)} L144 78 Z`;
    case "cowboy":
      return `M56 78 L64 ${h(46)} Q100 ${h(36)} 136 ${h(46)} L144 78 Z`;
    case "tricorn":
      return `M56 78 Q64 ${h(40)} 100 ${h(46)} Q136 ${h(40)} 144 78 Z`;
    case "bowler":
      return `M52 78 Q52 ${h(48)} 100 ${h(52)} Q148 ${h(48)} 148 78 Z`;
    case "wizard":
      return `M56 78 Q72 ${h(48)} 92 ${h(96)} Q118 ${h(56)} 144 78 Z`;
    case "bucket":
      return `M56 ${h(48)} Q100 ${h(58)} 144 ${h(48)} L152 78 L48 78 Z`;
    case "top":
      return `M60 ${h(72)} L140 ${h(72)} L146 78 L54 78 Z`;
  }
}

/**
 * The brim / peak. Drawn LAST in `makeHatUrl` so the crown and the coloured
 * band can never paint over it — that overlap is what made every peak look
 * sliced off halfway. Peaks are symmetric because both the portrait and the
 * arena are head-on views, and they reach well below the fit line so the whole
 * front of the hat is visible.
 */
function brimPath(shape: HatShape, brim: number) {
  const w = (v: number) => 100 + (v - 100) * brim;
  switch (shape) {
    case "beanie":
      return `<path d="M44 66 Q100 58 156 66 L156 88 Q100 80 44 88 Z" fill="SHADE" ${EDGE}/>`;
    case "hood":
      return `<path d="M44 66 Q100 78 156 66 L154 92 Q100 104 46 92 Z" fill="SHADE" ${EDGE}/>`;
    case "cap":
      return `<path d="M${w(26)} 74 Q100 62 ${w(174)} 74 Q100 116 ${w(26)} 74 Z" fill="SHADE" ${EDGE}/>`;
    case "flatcap":
      return `<path d="M${w(30)} 74 Q100 62 ${w(170)} 74 Q100 112 ${w(30)} 74 Z" fill="SHADE" ${EDGE}/>`;
    case "fedora":
      return `<path d="M${w(26)} 76 Q100 62 ${w(174)} 76 Q100 112 ${w(26)} 76 Z" fill="SHADE" ${EDGE}/>`;
    case "cowboy":
      return `<path d="M${w(20)} 72 Q52 92 84 80 Q100 86 116 80 Q148 92 ${w(180)} 72 Q160 112 100 104 Q40 112 ${w(20)} 72 Z" fill="SHADE" ${EDGE}/>`;
    case "tricorn":
      return `<path d="M${w(24)} 80 Q56 60 62 44 Q100 70 138 44 Q144 60 ${w(176)} 80 Q100 112 ${w(24)} 80 Z" fill="SHADE" ${EDGE}/>`;
    case "bowler":
      return `<path d="M${w(34)} 76 Q100 64 ${w(166)} 76 Q100 106 ${w(34)} 76 Z" fill="SHADE" ${EDGE}/>`;
    case "wizard":
      return `<path d="M${w(24)} 78 Q100 62 ${w(176)} 78 Q100 112 ${w(24)} 78 Z" fill="SHADE" ${EDGE}/>`;
    case "bucket":
      return `<path d="M${w(34)} 74 Q100 62 ${w(166)} 74 L${w(152)} 102 Q100 94 ${w(48)} 102 Z" fill="SHADE" ${EDGE}/>`;
    case "top":
      return `<path d="M${w(32)} 76 Q100 64 ${w(168)} 76 Q100 104 ${w(32)} 76 Z" fill="SHADE" ${EDGE}/>`;
  }
}

/** the coloured band every hat wears, kept clear of the brim below it */
function bandPath(shape: HatShape) {
  switch (shape) {
    case "beanie":
    case "hood":
      return "";
    case "wizard":
      return `<path d="M64 60 Q100 70 136 60" fill="none" stroke="ACCENT" stroke-width="8"/>`;
    case "top":
      return `<rect x="56" y="50" width="88" height="18" fill="ACCENT" ${THIN}/>`;
    default:
      return `<path d="M52 46 Q100 58 148 46 L150 64 Q100 74 50 64 Z" fill="ACCENT" ${THIN}/>`;
  }
}

/* ------------------------------ detail library ----------------------------- */

function detailArt(detail: HatDetail, spec: HatSpec) {
  const A = spec.accent;
  const S = spec.shade;
  switch (detail) {
    case "none":
      return "";
    case "pompom":
      return `<circle cx="100" cy="12" r="17" fill="${A}" ${EDGE}/><circle cx="94" cy="7" r="5" fill="#fff" opacity=".35"/>`;
    case "stripes":
      return `<path d="M58 44 Q100 34 142 44" fill="none" stroke="${A}" stroke-width="7" stroke-linecap="round"/><path d="M54 60 Q100 50 146 60" fill="none" stroke="${A}" stroke-width="5" opacity=".7" stroke-linecap="round"/>`;
    case "patch":
      return `<path d="M74 34 L104 30 L108 56 L78 60 Z" fill="${A}" ${THIN}/><path d="M78 40 L102 37 M79 48 L103 45" stroke="${OUTLINE}" stroke-width="3" opacity=".6"/>`;
    case "goggles":
      return `<path d="M40 56 H160" stroke="${OUTLINE}" stroke-width="9" stroke-linecap="round"/><circle cx="74" cy="56" r="16" fill="${A}" ${EDGE}/><circle cx="126" cy="56" r="16" fill="${A}" ${EDGE}/><circle cx="68" cy="50" r="5" fill="#fff" opacity=".55"/>`;
    case "feather":
      return `<path d="M124 62 Q150 40 168 6 Q150 34 138 64 Z" fill="${A}" ${EDGE}/>`;
    case "pin":
      return `<circle cx="100" cy="44" r="13" fill="${A}" ${THIN}/><path d="M100 36 L104 44 L100 52 L96 44 Z" fill="${OUTLINE}"/>`;
    case "stitches":
      return `<path d="M60 52 L70 46 M78 42 L88 38 M112 38 L122 42 M130 46 L140 52" stroke="${A}" stroke-width="5" stroke-linecap="round"/>`;
    case "fur":
      return `<path d="M46 68 Q100 84 154 68 L154 82 Q100 100 46 82 Z" fill="${A}" ${EDGE}/><path d="M62 74 Q100 86 138 74" stroke="${OUTLINE}" stroke-width="3" fill="none" opacity=".45"/>`;
    case "bullets":
      return `<rect x="66" y="58" width="10" height="18" rx="3" fill="${A}" ${THIN}/><rect x="84" y="56" width="10" height="18" rx="3" fill="${A}" ${THIN}/><rect x="102" y="56" width="10" height="18" rx="3" fill="${A}" ${THIN}/><rect x="120" y="58" width="10" height="18" rx="3" fill="${A}" ${THIN}/>`;
    case "coin":
      return `<circle cx="100" cy="64" r="15" fill="${A}" ${EDGE}/><path d="M100 56 V72 M94 60 H106" stroke="${OUTLINE}" stroke-width="4"/>`;
    case "candle":
      return `<rect x="92" y="-4" width="16" height="26" rx="4" fill="#f2ead2" ${THIN}/><path d="M100 -8 Q108 -20 100 -34 Q92 -20 100 -8 Z" fill="${A}" ${THIN}/>`;
    case "tassel":
      return `<path d="M140 40 Q158 56 156 78" stroke="${A}" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="156" cy="86" r="10" fill="${A}" ${EDGE}/>`;
    case "leaf":
      return `<path d="M112 52 Q140 40 156 14 Q132 24 116 46 Z" fill="${A}" ${EDGE}/><path d="M118 50 Q136 34 152 20" stroke="${OUTLINE}" stroke-width="3" fill="none" opacity=".6"/>`;
    case "cross":
      return `<path d="M94 42 H106 V56 H120 V68 H106 V82 H94 V68 H80 V56 H94 Z" fill="${A}" ${THIN}/>`;
    case "veil":
      return `<path d="M46 78 Q100 96 154 78 L150 108 Q100 122 50 108 Z" fill="${A}" opacity=".45" ${THIN}/>`;
    case "star":
      return `<path d="M100 36 L108 58 L131 58 L112 71 L119 93 L100 79 L81 93 L88 71 L69 58 L92 58 Z" fill="${A}" ${THIN}/>`;
    case "vial":
      return `<rect x="120" y="40" width="16" height="30" rx="5" fill="${A}" ${THIN}/><rect x="122" y="54" width="12" height="14" rx="4" fill="${S}"/>`;
    case "gear":
      return `<circle cx="100" cy="52" r="15" fill="${A}" ${THIN}/><circle cx="100" cy="52" r="5" fill="${OUTLINE}"/><path d="M100 33 V41 M100 63 V71 M81 52 H89 M111 52 H119" stroke="${A}" stroke-width="6" stroke-linecap="round"/>`;
    case "eye":
      return `<path d="M76 50 Q100 30 124 50 Q100 70 76 50 Z" fill="${A}" ${THIN}/><circle cx="100" cy="50" r="7" fill="${OUTLINE}"/>`;
    case "chain":
      return `<path d="M52 70 Q100 88 148 70" fill="none" stroke="${A}" stroke-width="6" stroke-dasharray="9 7" stroke-linecap="round"/>`;
    case "skull":
      return `<ellipse cx="100" cy="52" rx="16" ry="17" fill="${A}" ${THIN}/><circle cx="94" cy="50" r="4" fill="${OUTLINE}"/><circle cx="106" cy="50" r="4" fill="${OUTLINE}"/><path d="M96 62 H104" stroke="${OUTLINE}" stroke-width="3"/>`;
    case "flame":
      return `<path d="M100 28 Q116 6 100 -18 Q84 6 100 28 Z" fill="${A}" ${THIN}/>`;
  }
}

function makeHatUrl(spec: HatSpec) {
  const tall = spec.tall ?? 1;
  const brim = spec.brim ?? 1;
  const crown = crownPath(spec.shape, tall);
  const brimSvg = (brimPath(spec.shape, brim) ?? "")
    .replace(/SHADE/g, spec.shade)
    .replace(/ACCENT/g, spec.accent);
  const band = bandPath(spec.shape).replace(/ACCENT/g, spec.accent);
  // Paint order matters: crown, then band, then the brim ON TOP (a real peak
  // sits in front of the hat), then the flourish.
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -40 200 170">` +
    `<path d="${crown}" fill="${spec.main}" ${EDGE}/>` +
    // cel shade nudged to the right of the crown for volume
    `<g opacity=".22" transform="translate(16 4)"><path d="${crown}" fill="${spec.shade}"/></g>` +
    band +
    brimSvg +
    detailArt(spec.detail, spec) +
    `</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

interface Piece {
  name: string;
  slot: AccessorySlot;
  url: string;
  nw: number;
  nh: number;
  w: number;
  top: number;
}

export interface AccessoryDef extends Piece {
  id: AccessoryId;
  h: number;
  x: number;
}

export const CHAR_CX = 100;

/** Head geometry the hats are fitted to (shared with accessory-images.ts). */
const HEAD_TOP = 44;
const HEAD_CX = 100;
const HEAD_W = 104;

/** art box */
const BOX_W = 200;
const BOX_H = 170;
const BOX_Y = -40;
/** crown span inside the art box */
const ART_CROWN_W = 104;
/** the fit line */
const ART_FIT_Y = 78;

export const ACCESSORIES = Object.fromEntries(
  (Object.keys(SPECS) as AccessoryId[]).map((id) => {
    const spec = SPECS[id];
    const fit = spec.fit ?? 1;
    const sit = spec.sit ?? 18;
    // uniform scale: the art crown (104 units) becomes fit * skull width
    const s = (fit * HEAD_W) / ART_CROWN_W;
    const w = BOX_W * s;
    const h = BOX_H * s;
    const x = HEAD_CX - (BOX_W / 2) * s;
    const top = HEAD_TOP + sit - (ART_FIT_Y - BOX_Y) * s;
    return [
      id,
      {
        id,
        name: spec.name,
        slot: "hat" as const,
        url: makeHatUrl(spec),
        nw: BOX_W,
        nh: BOX_H,
        w,
        h,
        x,
        top,
      },
    ];
  }),
) as Record<AccessoryId, AccessoryDef>;

export const ACCESSORY_IDS = Object.keys(ACCESSORIES) as AccessoryId[];

export function sortAccessories(ids: readonly AccessoryId[]): AccessoryId[] {
  return [...ids];
}

export function AccessoryArt({ id }: { id: AccessoryId }) {
  const hat = ACCESSORIES[id];
  if (!hat) return null;
  return (
    <image
      href={hat.url}
      x={hat.x}
      y={hat.top}
      width={hat.w}
      height={hat.h}
      preserveAspectRatio="xMidYMid meet"
    />
  );
}
