export const WAVE_RULES = {
  earlyCounts: [3, 4, 5, 6, 8],
  preparationSeconds: 6,
  bossInterval: 10,
  upgradeInterval: 3,
  maxEnemiesAlive: 14,
  rewardBase: 25,
  rewardPerWave: 10,
  bossRewardBase: 250,
  bossRewardPerWave: 25,
};

export function waveConfig(waveNumber: number) {
  const wave = Math.max(1, Math.floor(waveNumber));
  const age = wave - 1;
  const softened = age <= 19 ? age : 19 + Math.sqrt(age - 19) * 2;
  const boss = wave % WAVE_RULES.bossInterval === 0;
  return {
    waveNumber: wave,
    enemiesToSpawn: WAVE_RULES.earlyCounts[age] ?? Math.min(42, 8 + Math.floor((wave - 5) * 1.5)),
    maximumEnemiesAlive: Math.min(WAVE_RULES.maxEnemiesAlive, 3 + Math.floor(wave * 0.6)),
    spawnDelay: Math.max(0.55, 1.8 - wave * 0.065),
    healthMultiplier: 1 + softened * 0.12,
    damageMultiplier: 1 + softened * 0.08,
    speedMultiplier: 1 + Math.min(age * 0.025, 0.25),
    rewardAmount: boss ? WAVE_RULES.bossRewardBase + wave * WAVE_RULES.bossRewardPerWave : WAVE_RULES.rewardBase + wave * WAVE_RULES.rewardPerWave,
    boss,
    upgrade: wave % WAVE_RULES.upgradeInterval === 0,
  };
}

export function waveComplete(remainingToSpawn: number, enemies: { dying: boolean }[]) {
  return remainingToSpawn === 0 && enemies.every((enemy) => enemy.dying);
}