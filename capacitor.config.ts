import type { CapacitorConfig } from "@capacitor/cli";

/**
 * Android wrapper for Echo Vanguards.
 *
 * The game itself is the web build; Capacitor packages it as a native app.
 * `server.url` points at the live preview so the phone always runs the newest
 * build — remove that block to ship a fully offline APK from `dist/`.
 */
const config: CapacitorConfig = {
  appId: "app.lovable.echovanguards",
  appName: "Echo Vanguards",
  webDir: "dist",
  server: {
    url: "https://id-preview--68da4adf-0d05-418a-a496-5421f53b5bad.lovable.app?forceHideBadge=true",
    cleartext: true,
  },
  android: {
    backgroundColor: "#0a0812",
  },
};

export default config;
