import { createFileRoute } from "@tanstack/react-router";
import { ENEMY_ART } from "@/game/enemy-art";
import { CRITTER_ENEMIES } from "@/game/critters";
import { ClassPortrait } from "@/components/ClassPortrait";
import { CLASSES, type ClassKey } from "@/game/classes";

export const Route = createFileRoute("/sheet")({
  component: Sheet,
  head: () => ({
    meta: [
      { title: "Echo art sheet" },
      { name: "description", content: "Internal art review sheet." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function Sheet() {
  const keys = Object.keys(CLASSES) as ClassKey[];
  return (
    <div style={{ background: "#14121a", padding: 16, color: "#fff", fontFamily: "sans-serif" }}>
      <div id="foes" style={{ display: "grid", gridTemplateColumns: "repeat(6, 190px)", gap: 8 }}>
        {CRITTER_ENEMIES.map((d) => (
          <div key={d.key} style={{ textAlign: "center", fontSize: 11 }}>
            <div
              style={{
                width: 190,
                height: 150,
                backgroundImage: `url(${ENEMY_ART[d.key as keyof typeof ENEMY_ART][0]})`,
                backgroundSize: "600% 100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "left top",
              }}
            />
            {d.name}
          </div>
        ))}
      </div>
      <div id="cls" style={{ display: "grid", gridTemplateColumns: "repeat(8, 150px)", gap: 8, marginTop: 24 }}>
        {keys.map((k) => (
          <div key={k} style={{ height: 170, position: "relative" }}>
            <ClassPortrait cls={k} className="h-full w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
