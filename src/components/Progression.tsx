import { ArrowLeft, Lock, Star } from "lucide-react";
import { levelFor, useProfile, XP_PER_LEVEL } from "@/game/profile";
import { ABILITIES, metaBonus, nextAbility } from "@/game/progression";

/** Permanent hero progression: account level, stat bonuses, milestone abilities. */
export function Progression({ onBack }: { onBack: () => void }) {
  const { profile } = useProfile();
  const level = levelFor(profile.xp);
  const into = profile.xp % XP_PER_LEVEL;
  const pct = Math.round((into / XP_PER_LEVEL) * 100);
  const bonus = metaBonus(level);
  const next = nextAbility(level);

  const stats = [
    { label: "Max health", value: `+${Math.round((bonus.hpMult - 1) * 100)}%` },
    { label: "Damage", value: `+${Math.round((bonus.damageMult - 1) * 100)}%` },
    { label: "Move speed", value: `+${Math.round((bonus.speedMult - 1) * 100)}%` },
    { label: "Crit chance", value: `+${Math.round(bonus.crit * 100)}%` },
    { label: "Lifesteal", value: `+${Math.round(bonus.lifesteal * 100)}%` },
    { label: "Start materials", value: `+${bonus.materials}` },
  ];

  return (
    <main
      className="relative h-[100dvh] w-full overflow-y-auto bg-[oklch(0.05_0.01_285)] px-3"
      style={{
        paddingTop: "max(0.75rem, env(safe-area-inset-top))",
        paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-3">
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

        <section className="rounded-2xl border-2 border-gold/30 bg-[oklch(0.1_0.02_292/80%)] p-4">
          <div className="flex items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-muted-foreground">
                Hero level
              </p>
              <p className="text-title text-4xl leading-none text-gold">{level}</p>
            </div>
            <p className="shrink-0 text-[11px] font-black tabular-nums text-muted-foreground">
              {into.toLocaleString()} / {XP_PER_LEVEL.toLocaleString()} XP
            </p>
          </div>
          <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-linear-to-r from-[oklch(0.93_0.16_92)] to-[oklch(0.72_0.17_62)]"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] font-bold text-muted-foreground">
            Every run banks XP. Levels make your hero permanently stronger in every mode.
          </p>
        </section>

        <section className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-white/12 bg-[oklch(0.1_0.02_292/70%)] p-2.5"
            >
              <p className="truncate text-[9px] font-black uppercase tracking-wider text-muted-foreground">
                {s.label}
              </p>
              <p className="text-lg font-black leading-tight text-foreground">{s.value}</p>
            </div>
          ))}
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="text-[11px] font-black uppercase tracking-[0.25em] text-muted-foreground">
            Abilities
            {next && (
              <span className="ml-2 text-gold/80">next at level {next.level}</span>
            )}
          </h2>
          {ABILITIES.map((a) => {
            const have = level >= a.level;
            return (
              <div
                key={a.name}
                className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-xl border-2 p-2.5"
                style={{
                  borderColor: have ? "oklch(0.82 0.15 88 / 45%)" : "oklch(1 0 0 / 8%)",
                  background: have ? "oklch(0.14 0.03 88 / 45%)" : "oklch(0.09 0.02 292 / 70%)",
                }}
              >
                <span className={`text-xl ${have ? "" : "opacity-30 grayscale"}`} aria-hidden>
                  {a.icon}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-black uppercase tracking-wide text-foreground">
                    {a.name}
                  </p>
                  <p className="text-[11px] font-medium leading-snug text-muted-foreground">
                    {a.desc}
                  </p>
                </div>
                {have ? (
                  <Star className="h-4 w-4 shrink-0 text-gold" strokeWidth={3} aria-hidden />
                ) : (
                  <span className="flex shrink-0 items-center gap-1 text-[10px] font-black text-muted-foreground">
                    <Lock className="h-3 w-3" aria-hidden />
                    {a.level}
                  </span>
                )}
              </div>
            );
          })}
        </section>
      </div>
    </main>
  );
}
