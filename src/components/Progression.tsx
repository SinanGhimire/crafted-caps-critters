import { ArrowLeft, Check, Lock, Sparkles, Trophy } from "lucide-react";
import { levelFor, useProfile, XP_PER_LEVEL } from "@/game/profile";
import { ABILITIES, metaBonus, nextAbility } from "@/game/progression";

/** Rank bands give the climb a shape: each band has a name and a colour. */
const RANKS: { at: number; name: string; color: string }[] = [
  { at: 0, name: "Recruit", color: "oklch(0.78 0.09 200)" },
  { at: 6, name: "Ranger", color: "oklch(0.82 0.13 145)" },
  { at: 12, name: "Vanguard", color: "oklch(0.78 0.14 305)" },
  { at: 20, name: "Warden", color: "oklch(0.86 0.15 88)" },
  { at: 30, name: "Ascendant", color: "oklch(0.76 0.16 25)" },
];

function rankFor(level: number) {
  let r = RANKS[0]!;
  for (const cand of RANKS) if (level >= cand.at) r = cand;
  return r;
}

/** Permanent hero progression: account level, stat bonuses, milestone abilities. */
export function Progression({ onBack }: { onBack: () => void }) {
  const { profile } = useProfile();
  const level = levelFor(profile.xp);
  const into = profile.xp % XP_PER_LEVEL;
  const pct = Math.round((into / XP_PER_LEVEL) * 100);
  const bonus = metaBonus(level);
  const next = nextAbility(level);
  const rank = rankFor(level);
  const nextRank = RANKS.find((r) => r.at > level) ?? null;
  const unlocked = ABILITIES.filter((a) => a.level <= level).length;

  const stats = [
    { label: "Max health", value: `+${Math.round((bonus.hpMult - 1) * 100)}%`, icon: "❤️" },
    { label: "Damage", value: `+${Math.round((bonus.damageMult - 1) * 100)}%`, icon: "💥" },
    { label: "Move speed", value: `+${Math.round((bonus.speedMult - 1) * 100)}%`, icon: "🥾" },
    { label: "Crit chance", value: `+${Math.round(bonus.crit * 100)}%`, icon: "🎯" },
    { label: "Lifesteal", value: `+${Math.round(bonus.lifesteal * 100)}%`, icon: "🩸" },
    { label: "Start materials", value: `+${bonus.materials}`, icon: "🧰" },
  ];

  const ring = `conic-gradient(${rank.color} ${pct * 3.6}deg, oklch(1 0 0 / 8%) ${pct * 3.6}deg)`;

  return (
    <main
      className="relative h-[100dvh] w-full overflow-y-auto bg-[oklch(0.05_0.01_285)] px-3"
      style={{
        paddingTop: "max(0.75rem, env(safe-area-inset-top))",
        paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
      }}
    >
      {/* soft rank glow behind everything */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-40 blur-3xl"
        style={{ background: `radial-gradient(60% 100% at 50% 0%, ${rank.color}, transparent)` }}
      />

      <div className="relative mx-auto flex w-full max-w-2xl flex-col gap-3">
        <header className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/15 bg-[oklch(0.12_0.02_292/70%)]"
          >
            <ArrowLeft className="h-4 w-4 text-foreground" strokeWidth={3} aria-hidden />
          </button>
          <h1 className="truncate text-title text-xl leading-none sm:text-3xl">Progression</h1>
        </header>

        {/* -------------------------------------------------- rank hero card */}
        <section
          className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-4 rounded-2xl border-2 p-4"
          style={{
            borderColor: `color-mix(in oklab, ${rank.color} 45%, transparent)`,
            background: `linear-gradient(180deg, color-mix(in oklab, ${rank.color} 12%, transparent), oklch(0.1 0.02 292 / 85%))`,
          }}
        >
          <div
            className="grid h-20 w-20 shrink-0 place-items-center rounded-full"
            style={{ background: ring }}
          >
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[oklch(0.08_0.02_292)]">
              <span className="text-title text-3xl leading-none" style={{ color: rank.color }}>
                {level}
              </span>
            </div>
          </div>

          <div className="min-w-0">
            <p
              className="truncate text-title text-2xl leading-none"
              style={{ color: rank.color }}
            >
              {rank.name}
            </p>
            <p className="mt-1 text-[11px] font-black uppercase tracking-[0.2em] text-muted-foreground">
              {into.toLocaleString()} / {XP_PER_LEVEL.toLocaleString()} XP · {pct}%
            </p>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full transition-[width] duration-500"
                style={{
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, ${rank.color}, oklch(0.95 0.14 92))`,
                }}
              />
            </div>
            <p className="mt-1.5 truncate text-[11px] font-bold text-muted-foreground">
              {nextRank
                ? `${nextRank.at - level} level${nextRank.at - level === 1 ? "" : "s"} to ${nextRank.name}`
                : "Highest rank reached"}
            </p>
          </div>
        </section>

        {/* -------------------------------------------------- next unlock teaser */}
        {next && (
          <section className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border-2 border-gold/40 bg-[oklch(0.14_0.03_88/50%)] p-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[oklch(0.2_0.04_88)] text-xl">
              {next.icon}
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-black uppercase tracking-[0.25em] text-gold/80">
                Next unlock
              </p>
              <p className="truncate text-sm font-black uppercase tracking-wide text-foreground">
                {next.name}
              </p>
              <p className="truncate text-[11px] font-medium text-muted-foreground">{next.desc}</p>
            </div>
            <span className="shrink-0 rounded-full bg-gold/20 px-2 py-1 text-[10px] font-black tabular-nums text-gold">
              LV {next.level}
            </span>
          </section>
        )}

        {/* -------------------------------------------------- stat cards */}
        <section className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/12 bg-[oklch(0.1_0.02_292/70%)] p-2.5 transition-transform active:scale-[0.98]"
            >
              <p className="flex items-center gap-1 truncate text-[9px] font-black uppercase tracking-wider text-muted-foreground">
                <span aria-hidden>{s.icon}</span>
                {s.label}
              </p>
              <p className="text-lg font-black leading-tight text-foreground">{s.value}</p>
            </div>
          ))}
        </section>

        {/* -------------------------------------------------- milestone track */}
        <section className="flex flex-col gap-1">
          <h2 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.25em] text-muted-foreground">
            <Trophy className="h-3.5 w-3.5 text-gold" aria-hidden />
            Milestone track
            <span className="ml-auto tabular-nums text-gold/80">
              {unlocked}/{ABILITIES.length}
            </span>
          </h2>

          <ol className="relative flex flex-col gap-2 pl-6">
            {/* the climbing line */}
            <span
              aria-hidden
              className="absolute bottom-3 left-[0.72rem] top-3 w-0.5 rounded-full bg-white/10"
            />
            {ABILITIES.map((a) => {
              const have = level >= a.level;
              const isNext = next?.name === a.name;
              return (
                <li
                  key={a.name}
                  className="relative grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border-2 p-2.5"
                  style={{
                    borderColor: have
                      ? "oklch(0.82 0.15 88 / 45%)"
                      : isNext
                        ? `color-mix(in oklab, ${rank.color} 45%, transparent)`
                        : "oklch(1 0 0 / 8%)",
                    background: have
                      ? "oklch(0.14 0.03 88 / 45%)"
                      : "oklch(0.09 0.02 292 / 70%)",
                  }}
                >
                  {/* node on the track */}
                  <span
                    aria-hidden
                    className="absolute -left-[1.52rem] grid h-4 w-4 place-items-center rounded-full border-2"
                    style={{
                      borderColor: have ? "oklch(0.86 0.15 88)" : "oklch(1 0 0 / 20%)",
                      background: have ? "oklch(0.86 0.15 88)" : "oklch(0.08 0.02 292)",
                    }}
                  />
                  <span className={`text-xl ${have ? "" : "opacity-30 grayscale"}`} aria-hidden>
                    {a.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs font-black uppercase tracking-wide text-foreground">
                      {a.name}
                      {isNext && (
                        <span className="ml-2 rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] tracking-normal text-muted-foreground">
                          up next
                        </span>
                      )}
                    </p>
                    <p className="text-[11px] font-medium leading-snug text-muted-foreground">
                      {a.desc}
                    </p>
                  </div>
                  {have ? (
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gold/20">
                      <Check className="h-3.5 w-3.5 text-gold" strokeWidth={4} aria-hidden />
                    </span>
                  ) : (
                    <span className="flex shrink-0 items-center gap-1 text-[10px] font-black tabular-nums text-muted-foreground">
                      <Lock className="h-3 w-3" aria-hidden />
                      {a.level}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </section>

        <p className="flex items-center justify-center gap-1.5 pt-1 text-[11px] font-bold text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-gold" aria-hidden />
          Every run banks XP — win a run for a big bonus.
        </p>
      </div>
    </main>
  );
}
