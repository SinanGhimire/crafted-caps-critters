/**
 * Baked head anchors for the hero strips (normalised to frame size).
 *
 * Measured from the SKULL only - the face disc, with hair excluded - so gear
 * is sized to the head instead of the whole hairy silhouette. Every frame of
 * idle / walk / death carries its own centre, top, width and tilt; the death
 * strip is a tumbling head, so `rot` (radians, clockwise) is read from the
 * eye axis and applied around the skull centre.
 */
export interface HeadAnchor { cx: number; top: number; w: number; rot?: number }

/**
 * Tiny per-hero corrections applied after the measured anchor. The skull
 * measurement is exact, so these stay neutral unless a hero needs a nudge.
 */
export interface HeadFit { scale: number; x: number; y: number }

export const HERO_HEAD_FITS: Record<string, HeadFit> = {
  spike: { scale: 1, x: 0, y: 0 },
  punk: { scale: 1, x: 0, y: 0 },
  crown: { scale: 1, x: 0, y: 0 },
  bald: { scale: 1, x: 0, y: 0 },
};

export const HERO_ANCHORS: Record<string, { walk: HeadAnchor[]; idle: HeadAnchor[]; death: HeadAnchor[] }> = {
  spike: { idle: [{cx:0.5157,top:0.0676,w:0.8021,rot:0.0},{cx:0.5157,top:0.0676,w:0.8021,rot:0.0},{cx:0.5157,top:0.0676,w:0.8021,rot:0.0},{cx:0.5157,top:0.0676,w:0.8021,rot:0.0},{cx:0.5157,top:0.0676,w:0.8021,rot:0.0},{cx:0.5157,top:0.0676,w:0.8021,rot:0.0}], walk: [{cx:0.5157,top:0.0676,w:0.8021,rot:0.0},{cx:0.5084,top:0.025,w:0.8021,rot:0.0},{cx:0.4574,top:-0.0455,w:0.8021,rot:0.0},{cx:0.4409,top:0.0503,w:0.8021,rot:0.0},{cx:0.45,top:0.0526,w:0.8021,rot:0.0},{cx:0.4363,top:0.0485,w:0.8021,rot:0.0},{cx:0.4575,top:-0.0451,w:0.8021,rot:0.0},{cx:0.5083,top:0.0027,w:0.8021,rot:0.0}], death: [{cx:0.4887,top:0.2545,w:0.8021,rot:0.0715},{cx:0.5098,top:0.3098,w:0.8021,rot:1.1505},{cx:0.4213,top:0.3753,w:0.8021,rot:3.0906},{cx:0.4308,top:0.2676,w:0.8021,rot:-1.2539},{cx:0.4737,top:0.1095,w:0.8021,rot:-0.0511}] },
  punk: { idle: [{cx:0.5,top:0.067,w:0.8701,rot:0.0},{cx:0.5,top:0.067,w:0.8701,rot:0.0},{cx:0.5,top:0.067,w:0.8701,rot:0.0},{cx:0.5,top:0.067,w:0.8701,rot:0.0},{cx:0.5,top:0.067,w:0.8701,rot:0.0},{cx:0.5,top:0.067,w:0.8701,rot:0.0}], walk: [{cx:0.5,top:0.067,w:0.8701,rot:0.0},{cx:0.4907,top:0.0232,w:0.8701,rot:0.0},{cx:0.4617,top:-0.0166,w:0.8701,rot:0.0},{cx:0.4411,top:0.0275,w:0.8701,rot:0.0},{cx:0.4139,top:0.0942,w:0.8701,rot:0.0},{cx:0.4411,top:0.0313,w:0.8701,rot:0.0},{cx:0.4613,top:-0.0165,w:0.8701,rot:0.0},{cx:0.4912,top:0.0003,w:0.8701,rot:0.0}], death: [{cx:0.4989,top:0.2849,w:0.8701,rot:0.0821},{cx:0.5527,top:0.3073,w:0.8701,rot:1.1286},{cx:0.4956,top:0.3701,w:0.8701,rot:3.1272},{cx:0.5133,top:0.3127,w:0.8701,rot:-1.2119},{cx:0.4702,top:0.1416,w:0.8701,rot:-0.0081}] },
  crown: { idle: [{cx:0.5009,top:0.0862,w:0.7897,rot:0.0},{cx:0.5009,top:0.0862,w:0.7897,rot:0.0},{cx:0.5009,top:0.0862,w:0.7897,rot:0.0},{cx:0.5009,top:0.0862,w:0.7897,rot:0.0},{cx:0.5009,top:0.0862,w:0.7897,rot:0.0},{cx:0.5009,top:0.0862,w:0.7897,rot:0.0}], walk: [{cx:0.5009,top:0.0862,w:0.7897,rot:0.0},{cx:0.4819,top:0.0553,w:0.7897,rot:0.0},{cx:0.4319,top:-0.0868,w:0.7897,rot:0.0},{cx:0.4615,top:0.0707,w:0.7897,rot:0.0},{cx:0.3028,top:0.0814,w:0.7897,rot:0.0},{cx:0.4564,top:0.0757,w:0.7897,rot:0.0},{cx:0.4323,top:-0.0868,w:0.7897,rot:0.0},{cx:0.4353,top:-0.062,w:0.7897,rot:0.0}], death: [{cx:0.4772,top:0.2196,w:0.7897,rot:0.0701},{cx:0.5152,top:0.2931,w:0.7897,rot:1.1416},{cx:0.2996,top:0.363,w:0.7897,rot:3.1001},{cx:0.3103,top:0.2674,w:0.7897,rot:-1.2143},{cx:0.4709,top:0.0965,w:0.7897,rot:-0.0176}] },
  bald: { idle: [{cx:0.4891,top:0.0859,w:0.8701,rot:0.0},{cx:0.4891,top:0.0859,w:0.8701,rot:0.0},{cx:0.4891,top:0.0859,w:0.8701,rot:0.0},{cx:0.4891,top:0.0859,w:0.8701,rot:0.0},{cx:0.4891,top:0.0859,w:0.8701,rot:0.0},{cx:0.4891,top:0.0859,w:0.8701,rot:0.0}], walk: [{cx:0.4891,top:0.0859,w:0.8701,rot:0.0},{cx:0.4787,top:0.0339,w:0.8701,rot:0.0},{cx:0.4768,top:-0.0006,w:0.8701,rot:0.0},{cx:0.4847,top:0.0459,w:0.8701,rot:0.0},{cx:0.4845,top:0.0863,w:0.8701,rot:0.0},{cx:0.4854,top:0.0529,w:0.8701,rot:0.0},{cx:0.4771,top:-0.0004,w:0.8701,rot:0.0},{cx:0.4845,top:0.0222,w:0.8701,rot:0.0}], death: [{cx:0.4763,top:0.3198,w:0.8701,rot:0.0876},{cx:0.459,top:0.3204,w:0.8701,rot:1.1651},{cx:0.4783,top:0.3532,w:0.8701,rot:3.1214},{cx:0.5179,top:0.3268,w:0.8701,rot:-1.202},{cx:0.4688,top:0.1458,w:0.8701,rot:-0.019}] },
};
