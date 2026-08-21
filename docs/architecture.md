# Cinematic Portfolio Architecture

## Current Phase

This foundation builds the opening world only: a persistent WebGL stage, cinematic boot UI, particle field, neural lattice, central digital core, editable portfolio data, and accessibility/performance hooks.

## Technical Structure

- `src/components`: application-level composition.
- `src/scenes`: React Three Fiber scene orchestration.
- `src/scenes/objects`: reusable 3D objects with isolated animation logic.
- `src/sections`: HTML interface layers that sit over the world.
- `src/shaders`: GLSL programs for procedural rendering.
- `src/animations`: GSAP timelines and scroll choreography.
- `src/hooks`: browser and interaction hooks.
- `src/data`: editable content and design tokens.
- `src/utils`: small shared math helpers.

## Visual System

- Base environment: deep void black with graphite depth, sparse cold signal blue, and restrained warm amber accents.
- UI language: low-density technical annotations, thin structural lines, compact metadata, no generic card grid.
- Motion: damped camera, pointer parallax, slow orbital structures, and reduced-motion fallbacks.
- 3D language: purposeful digital core, neural connections, and particles that imply the later AI/project/research universe.

## Next Phase

Add scroll-controlled transformations where the particle field reorganizes into the AI neural network, then branches into project-case-study orbits.
