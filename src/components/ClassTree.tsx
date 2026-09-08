import { useState } from "react";
import { ArrowLeft, Check, Coins, Lock } from "lucide-react";
import { CLASSES, type ClassKey } from "@/game/classes";
import {
  CLASS_TREE,
  canUnlock,
  isClassUnlocked,
  type TreeBranch,
  type TreeNode,
} from "@/game/class-tree";
import { levelFor, useProfile } from "@/game/profile";
import { ClassPortrait } from "@/components/ClassPortrait";

/**
 * The class tree: pick a story path, walk it node by node, unlock the class at
 * each step with coins once your account level is high enough.
 */
export function ClassTree({
  cls,
  onSelectClass,
  onBack,
  onSfx,
}: {
  cls: ClassKey;
  onSelectClass: (k: ClassKey) => void;
  onBack: () => void;
  onSfx?: () => void;
}) {
  const { profile, patch } = useProfile();
  const level = levelFor(profile.xp);
  const [branchId, setBranchId] = useState(CLASS_TREE[0]!.id);
  const branch: TreeBranch = CLASS_TREE.find((b) => b.id === branchId) ?? CLASS_TREE[0]!;
  const [note, setNote] = useState<string | null>(null);

  const unlock = (node: TreeNode) => {
    const gate = canUnlock(node, { owned: profile.owned, coins: profile.coins, level });
    if (!gate.ok) {
      setNote(gate.reason);
      return;
    }
    onSfx?.();
    patch((p) => ({
      ...p,
      coins: p.coins - node.cost,
      owned: [...p.owned, `class:${node.key}`],
    }));
    onSelectClass(node.key);
    setNote(`${CLASSES[node.key].name} unlocked`);
  };

  return (
    <main
      className="relative h-[100dvh] w-full overflow-y-auto bg-[oklch(0.05_0.01_285)] px-3 pb-6"
      style={{
        paddingTop: "max(0.75rem, env(safe-area-inset-top))",
        paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
      }}
    >
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-3">
        <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/15 bg-[oklch(0.12_0.02_292/70%)]"
          >
            <ArrowLeft className="h-4 w-4 text-foreground" strokeWidth={3} aria-hidden />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-title text-xl leading-none sm:text-3xl">Class Tree</h1>
            <p className="truncate text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
              Level {level}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-1 rounded-full border border-white/12 bg-[oklch(0.13_0.02_292/70%)] px-2 py-1">
            <Coins className="h-3.5 w-3.5 text-gold" strokeWidth={2.5} aria-hidden />
            <span className="text-[11px] font-black tabular-nums text-foreground">
              {profile.coins.toLocaleString()}
            </span>
          </span>
        </header>

        {/* path picker */}
        <div className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {CLASS_TREE.map((b) => {
            const active = b.id === branch.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  onSfx?.();
                  setBranchId(b.id);
                  setNote(null);
                }}
                className="shrink-0 rounded-xl border-2 px-3 py-1.5 text-[11px] font-black uppercase tracking-wide transition-colors"
                style={{
                  borderColor: active ? b.color : "oklch(1 0 0 / 12%)",
                  background: active ? `${b.color}22` : "oklch(0.11 0.02 292 / 70%)",
                  color: active ? b.color : "oklch(0.72 0.02 292)",
                }}
              >
                {b.name}
              </button>
            );
          })}
        </div>

        <p className="text-[11px] font-bold italic text-muted-foreground">{branch.intro}</p>
        {note && (
          <p
            className="rounded-xl border px-3 py-2 text-[11px] font-black uppercase tracking-wide"
            style={{ borderColor: `${branch.color}55`, color: branch.color }}
          >
            {note}
          </p>
        )}

        {/* the path */}
        <ol className="flex flex-col gap-2">
          {branch.nodes.map((node, i) => {
            const def = CLASSES[node.key];
            const owned = isClassUnlocked(node.key, profile.owned);
            const gate = canUnlock(node, {
              owned: profile.owned,
              coins: profile.coins,
              level,
            });
            const selected = cls === node.key;
            return (
              <li key={node.key} className="relative pl-6">
                {/* connector */}
                <span
                  className="absolute left-2 top-0 h-full w-0.5"
                  style={{
                    background: owned ? branch.color : "oklch(1 0 0 / 10%)",
                    opacity: i === branch.nodes.length - 1 ? 0.35 : 1,
                  }}
                  aria-hidden
                />
                <span
                  className="absolute left-0.5 top-5 grid h-4 w-4 place-items-center rounded-full border-2"
                  style={{
                    borderColor: owned ? branch.color : "oklch(1 0 0 / 20%)",
                    background: owned ? branch.color : "oklch(0.08 0.02 292)",
                  }}
                  aria-hidden
                >
                  {owned && <Check className="h-2.5 w-2.5 text-ink" strokeWidth={4} />}
                </span>

                <div
                  className="grid grid-cols-[auto_minmax(0,1fr)] gap-3 rounded-2xl border-2 p-3"
                  style={{
                    borderColor: selected
                      ? branch.color
                      : owned
                        ? "oklch(1 0 0 / 14%)"
                        : "oklch(1 0 0 / 8%)",
                    background: selected
                      ? `${branch.color}18`
                      : "oklch(0.1 0.02 292 / 70%)",
                  }}
                >
                  <div className={`h-16 w-12 shrink-0 ${owned ? "" : "opacity-40 grayscale"}`}>
                    <ClassPortrait cls={node.key} className="h-full w-full" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h2 className="truncate text-sm font-black uppercase tracking-wide text-foreground">
                        {def.name}
                      </h2>
                      {!owned && (
                        <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] font-medium leading-snug text-muted-foreground">
                      {node.story}
                    </p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[9px] font-black uppercase tracking-wider">
                      <span className="text-rose-300/80">HP {def.hp}</span>
                      <span className="text-amber-300/80">DMG {def.damage}x</span>
                      <span className="text-sky-300/80">SPD {def.speed}</span>
                    </div>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {owned ? (
                        <button
                          type="button"
                          onClick={() => {
                            onSfx?.();
                            onSelectClass(node.key);
                          }}
                          disabled={selected}
                          className="rounded-xl border-2 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] disabled:opacity-60"
                          style={{ borderColor: branch.color, color: branch.color }}
                        >
                          {selected ? "Equipped" : "Equip"}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => unlock(node)}
                          className="flex items-center gap-1 rounded-xl border-2 border-ink bg-linear-to-b from-[oklch(0.93_0.16_92)] to-[oklch(0.72_0.17_62)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-ink disabled:grayscale"
                          disabled={!gate.ok}
                        >
                          <Coins className="h-3 w-3" strokeWidth={3} aria-hidden />
                          {node.cost.toLocaleString()}
                        </button>
                      )}
                      {!owned && !gate.ok && (
                        <span className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">
                          {gate.reason}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </main>
  );
}
