# Convert Echo into platform survival

## Goal
Turn the current top-down arena into a polished side-scrolling survival game while preserving the existing menu artwork, class system, progression, waves, bosses, shop, weapons, hats, and turrets.

## Gameplay
- Replace free four-direction movement with left/right running, jumping, gravity, grounded checks, and stable platform collision.
- Build a horizontally scrolling combat stage with a grounded main path and a small number of readable elevated platforms.
- Keep manual aiming and auto-aim, but constrain targeting and projectile behavior for side-view combat.
- Spawn ground enemies from the left and right; flying enemies may approach through the air. Prevent walking enemies from gliding by grounding their movement and matching animation speed to travel speed.
- Adapt enemy contact, knockback, hazards, pickups, turrets, echoes, and camera shake to the new side-view coordinates.

## Waves and progression
- Preserve survival bosses on waves 5, 10, 16, and 20, with wave 20 completing the run; keep Endless endless.
- Keep the weighted enemy variety system and ensure each unlocked enemy type visibly appears before repeats dominate.
- Preserve between-wave shopping, run XP, permanent progression, class unlocks, and rewards.

## Supplied assets
- Keep the current home/menu artwork unchanged.
- Use the supplied pirate/profile interface artwork as decorative HUD frames and controls, cropped into practical transparent pieces while retaining the current screen structure.
- Use the previously supplied side-view monster and skeleton animation strips for in-game enemies.
- Do not force the newly supplied top-down slime sprites into the side-scroller because their viewing angle will look incorrect; retain the existing compatible side-view slime animation instead.
- Preserve the exclusive turret artwork already supplied and expand turret availability through compatible classes and shop items.

## Mobile controls and layout
- Replace the movement stick with compact left/right and jump controls; retain a right-side aiming control.
- Keep the centered timer and pause-only top control, with sound inside pause.
- Scale the play view and HUD for small Android phones, tall phones, landscape phones, and tablets without hiding controls.

## Stability and verification
- Finish the invalid-color shop-freeze fix and exercise buying, rerolling, leaving the shop, pausing, restarting, and advancing waves.
- Verify enemy animation, grounded movement, jumping, projectiles, turrets, boss waves, and game-over/win flow.
- Test representative phone, tablet, and desktop sizes and confirm a clean build.
- Keep APK generation listed as blocked in this environment unless Android build tools become available.

## Technical details
- Extend player and enemy state with vertical velocity and grounded/platform state rather than maintaining separate game modes.
- Replace radial arena bounds and circular distance cleanup with horizontal stage bounds and side-view world limits.
- Use camera smoothing on the horizontal axis with restrained vertical tracking so jumping remains readable.
- Continue using the existing canvas renderer and sprite-strip loader; update animation selection for idle, run, jump/fall, attack, hurt, and death where supplied frames support it.
