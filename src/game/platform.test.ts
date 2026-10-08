import { describe, it as test } from 'node:test';
import assert from 'node:assert/strict';
function expect<T>(actual: T) {
  return {
    toBe: (value: T) => assert.equal(actual, value),
    toEqual: (value: T) => assert.deepEqual(actual, value),
    toBeLessThan: (value: number) => assert.ok(Number(actual) < value),
  };
}
import { GROUND_Y, JUMP_SPEED, stepPlatformBody, PLATFORMS } from './platform';
import { waveConfig, waveComplete } from './waves';

describe('side-scroller rules', () => {
  test('waves 1–5 schedule exactly 3, 4, 5, 6, 8 enemies', () => {
    expect([1, 2, 3, 4, 5].map((w) => waveConfig(w).enemiesToSpawn)).toEqual([3, 4, 5, 6, 8]);
  });
  test('only every tenth wave is a boss wave', () => {
    expect([5, 10, 16, 20, 30].map((w) => waveConfig(w).boss)).toEqual([false, true, false, true, true]);
  });
  test('every third completed wave offers an upgrade', () => {
    expect([1, 2, 3, 6, 7].map((w) => waveConfig(w).upgrade)).toEqual([false, false, true, true, false]);
  });
  test('wave rewards use the supplied coin formula', () => {
    expect(waveConfig(1).rewardAmount).toBe(35);
    expect(waveConfig(10).rewardAmount).toBe(500);
  });
  test('an empty spawn queue is not sufficient to clear a wave', () => {
    expect(waveComplete(0, [{ dying: false }])).toBe(false);
    expect(waveComplete(1, [])).toBe(false);
    expect(waveComplete(0, [{ dying: true }])).toBe(true);
  });
  test('endless enemy count and speed remain bounded', () => {
    expect(waveConfig(1000).enemiesToSpawn).toBe(42);
    expect(waveConfig(1000).speedMultiplier).toBe(1.25);
    expect(waveConfig(1000).maximumEnemiesAlive).toBe(14);
  });
  test('jump rises then lands exactly on the ground', () => {
    const body = { x: 0, y: GROUND_Y, vy: -JUMP_SPEED, grounded: false, radius: 22 };
    stepPlatformBody(body, 1 / 60);
    expect(body.y).toBeLessThan(GROUND_Y);
    for (let i = 0; i < 100; i++) stepPlatformBody(body, 1 / 60);
    expect(body.y).toBe(GROUND_Y);
    expect(body.grounded).toBe(true);
  });
  test('falling bodies land on an elevated platform', () => {
    const p = PLATFORMS[1];
    if (!p) throw new Error('Missing platform');
    const body = { x: p.x + 80, y: p.y - 10, vy: 400, grounded: false, radius: 22 };
    stepPlatformBody(body, 0.05);
    expect(body.y).toBe(p.y);
    expect(body.grounded).toBe(true);
  });
});