import { contentImage, environmentAt } from './side-content';
import { PLATFORMS, GROUND_Y } from './platform';

/** Paint each supplied layer at its own travel speed; keep foreground gameplay unobscured. */
export function drawParallax(ctx: CanvasRenderingContext2D, index: number, camX: number, width: number, height: number) {
  const environment = environmentAt(index);
  ctx.fillStyle = '#11151f';
  ctx.fillRect(0, 0, width, height);
  if (!environment) return;
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  environment.layers.forEach((url, i) => {
    const image = contentImage(url);
    if (!image) return;
    const layerHeight = height;
    const layerWidth = Math.max(width, layerHeight * image.width / image.height);
    const speed = 0.08 + (i / Math.max(1, environment.layers.length - 1)) * 0.65;
    const offset = -((camX * speed % layerWidth) + layerWidth) % layerWidth;
    for (let x = offset; x < width; x += layerWidth) ctx.drawImage(image, x, 0, layerWidth + 1, layerHeight);
  });
  ctx.restore();
}

export function drawPlatforms(ctx: CanvasRenderingContext2D, index: number, camX: number, width: number) {
  const environment = environmentAt(index);
  const palette = environment?.palette ?? { body: '#202632', edge: '#748b86', detail: '#3b4c4a' };
  ctx.save();
  ctx.imageSmoothingEnabled = false;
  for (const platform of PLATFORMS) {
    if (platform.x + platform.width < camX || platform.x > camX + width) continue;
    ctx.fillStyle = palette.body;
    ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    ctx.fillStyle = palette.edge;
    ctx.fillRect(platform.x, platform.y, platform.width, 6);
    ctx.fillStyle = palette.detail;
    ctx.fillRect(platform.x, platform.y + 6, platform.width, 10);
    const start = Math.max(platform.x, Math.floor(camX / 48) * 48);
    const end = Math.min(platform.x + platform.width, camX + width + 48);
    for (let x = start; x < end; x += 48) {
      const variant = Math.abs(Math.floor(x / 48)) % 4;
      ctx.fillStyle = palette.body;
      ctx.fillRect(x + 12 + variant * 3, platform.y + 6, 7, 5);
      ctx.fillStyle = palette.detail;
      for (let y = platform.y + 28; y < platform.y + Math.min(platform.height, 400); y += 36) {
        ctx.fillRect(x + ((y / 36) % 2 ? 8 : 24), y, 19, 3);
        ctx.fillRect(x + variant * 9, y + 7, 3, 8);
      }
    }
    if (platform.y !== GROUND_Y) {
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.fillRect(platform.x + 8, platform.y + platform.height, platform.width - 16, 5);
    }
  }
  ctx.restore();
}