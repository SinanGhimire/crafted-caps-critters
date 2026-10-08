export const STAGE_HALF_WIDTH = 2600;
export const GROUND_Y = 240;
export const GRAVITY = 1750;
export const JUMP_SPEED = 710;

export interface Platform { x: number; y: number; width: number; height: number }
export const PLATFORMS: Platform[] = [
  { x: -2600, y: GROUND_Y, width: 5200, height: 640 },
  ...[-2100, -1400, -700, 350, 1050, 1750].map((x, i) => ({
    x, y: GROUND_Y - (i % 2 ? 240 : 130), width: 260, height: 32,
  })),
];

export interface PlatformBody {
  x: number; y: number; vy: number; grounded: boolean; radius: number;
}

/** One-way ledges: rise through them, land on their top while falling. */
export function stepPlatformBody(body: PlatformBody, dt: number, drop = false) {
  const previousY = body.y;
  body.vy = Math.min(1100, body.vy + GRAVITY * dt);
  body.y += body.vy * dt;
  body.grounded = false;
  if (body.vy >= 0) {
    for (const platform of PLATFORMS) {
      if (drop && platform.y !== GROUND_Y) continue;
      if (body.x + body.radius * 0.5 < platform.x || body.x - body.radius * 0.5 > platform.x + platform.width) continue;
      if (previousY <= platform.y + 1 && body.y >= platform.y) {
        body.y = platform.y;
        body.vy = 0;
        body.grounded = true;
        break;
      }
    }
  }
  body.x = Math.max(-STAGE_HALF_WIDTH + body.radius, Math.min(STAGE_HALF_WIDTH - body.radius, body.x));
}

export function groundAt(x: number, y = GROUND_Y) {
  return PLATFORMS.filter((p) => x >= p.x && x <= p.x + p.width && p.y >= y - 1)
    .reduce((top, p) => Math.min(top, p.y), GROUND_Y);
}