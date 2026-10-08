import { ArrowUp, ChevronLeft, ChevronRight, FastForward } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UPGRADE_MAP, applyUpgrade } from '@/game/upgrades';
import { openShop } from '@/game/engine';
import type { GameState } from '@/game/types';

export function RunProgress({ state, refresh }: { state: GameState; refresh: () => void }) {
  if (state.phase !== 'transition' && state.phase !== 'upgrade') return null;
  return <div className="absolute inset-0 z-30 grid place-items-center bg-background/75 p-4 backdrop-blur-sm">
    <div className="w-full max-w-xl text-center">
      <p className="font-display text-sm text-gold">WAVE {state.wave} CLEARED</p>
      <h2 className="mt-2 font-display text-3xl text-foreground">{state.phase === 'upgrade' ? 'Choose your power' : 'Take a breath'}</h2>
      <p className="mt-3 font-display text-lg text-gold">+{state.waveReward} coins</p>
      {state.phase === 'upgrade' ? <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {state.upgradeOffers.map((id) => {
          const upgrade = UPGRADE_MAP[id];
          if (!upgrade) return null;
          return <Button key={id} variant="outline" className="pop-card h-auto min-h-28 flex-col whitespace-normal p-4" onClick={() => {
            applyUpgrade(state, id);
            state.upgradeOffers = [];
            state.phase = 'transition';
            refresh();
          }}>
            <span className="text-2xl text-gold">{upgrade.icon}</span>
            <span className="font-display text-xs text-foreground">{upgrade.name}</span>
            <span className="text-xs text-muted-foreground">{upgrade.desc}</span>
          </Button>;
        })}
      </div> : <>
        <p className="mt-5 font-display text-5xl text-foreground">{Math.ceil(state.transitionTimer)}</p>
        <Button className="pop-buy mt-5" onClick={() => { openShop(state); refresh(); }}><FastForward /> Continue to armoury</Button>
      </>}
    </div>
  </div>;
}

export function PlatformControls({ move, jump }: { move: (value: number) => void; jump: (held: boolean) => void }) {
  return <div className="pointer-events-none absolute bottom-6 left-4 z-10 flex items-end gap-3">
    {[-1, 1].map((direction) => <Button key={direction} variant="outline" size="icon" aria-label={direction === -1 ? 'Run left' : 'Run right'}
      className="pointer-events-auto h-14 w-14 touch-none border-2 border-pop-edge bg-background/75 text-foreground"
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); move(direction); }}
      onPointerUp={() => move(0)} onPointerCancel={() => move(0)}>
      {direction === -1 ? <ChevronLeft /> : <ChevronRight />}
    </Button>)}
    <Button variant="outline" size="icon" aria-label="Jump" className="pointer-events-auto mb-12 h-14 w-14 touch-none border-2 border-gold bg-background/75 text-gold"
      onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); jump(true); }} onPointerUp={() => jump(false)} onPointerCancel={() => jump(false)}><ArrowUp /></Button>
  </div>;
}