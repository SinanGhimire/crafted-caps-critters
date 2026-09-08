import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CRITTER_ENEMIES, critterSrc, FRAME } from "@/game/critters";
import { CLASSES, type ClassKey } from "@/game/classes";
import { ClassPortrait } from "@/components/ClassPortrait";

export const Route = createFileRoute("/sheet")({
  component: Sheet,
  head: () => ({
    meta: [
      { title: "Echo Vanguards — art sheet" },
      { name: "description", content: "Internal art sheet." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

function Sheet() {
  const [urls, setUrls] = useState<Record<string, string>>({});
  useEffect(() => {
    const out: Record<string, string> = {};
    for (const d of CRITTER_ENEMIES) out[d.key] = critterSrc(d)[0];
    setUrls(out);
  }, []);
  const keys = Object.keys(CLASSES) as ClassKey[];
  return (
    <div style={{ background: "#12100f", color: "#f4ead6", padding: 24, fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 22, marginBottom: 12 }}>ENEMIES</h1>
      <div id="foes" style={{ display: "grid", gridTemplateColumns: "repeat(7, 168px)", gap: 8 }}>
        {CRITTER_ENEMIES.map((d) => (
          <div key={d.key} style={{ textAlign: "center" }}>
            <div
              style={{
                width: FRAME,
                height: FRAME,
                margin: "0 auto",
                background: urls[d.key] ? `url(${urls[d.key]}) 0 0 / auto 100% no-repeat` : "none",
              }}
            />
            <div style={{ fontSize: 12, opacity: 0.85 }}>{d.name}</div>
          </div>
        ))}
      </div>
      <h1 style={{ fontSize: 22, margin: "24px 0 12px" }}>CLASSES</h1>
      <div id="cls" style={{ display: "grid", gridTemplateColumns: "repeat(7, 168px)", gap: 8 }}>
        {keys.map((k) => (
          <div key={k} style={{ textAlign: "center" }}>
            <div style={{ width: 160, height: 160, margin: "0 auto", position: "relative" }}>
              <ClassPortrait cls={k} className="h-full w-full" />
            </div>
            <div style={{ fontSize: 12, opacity: 0.85 }}>{CLASSES[k].name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
