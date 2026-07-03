# Sonder Studio — working agreement

## Git workflow (owner's standing instruction)

- **Work directly on `main`.** Do NOT create feature branches for routine work.
- Commit and **push to `main`** when changes are complete and the build passes.
- This is standing, explicit permission from the repo owner to commit and push
  to `main` in every session — you do not need to ask again.
- Note: Claude Code on the web may still *assign* a `claude/…` working branch at
  session start (that comes from the environment/session config, not this file).
  If that happens, still land the final work on `main` per this instruction —
  e.g. fast-forward/merge the assigned branch into `main` and push `main`.

## Before pushing

- Run `npm run build` and make sure it compiles (it also runs lint + type-check).

## Project shape

- Next.js 15 (App Router) + Tailwind. All homepage/core-page copy, pricing,
  pills, feature blocks, and FAQ live in `src/config/site.ts` (single source of
  truth) — edit copy there, not in the components.
- The business is **one package, one price**: a $1,497 per-property "Property
  Experience" (premium scroll-animated property website + cinematic video
  walkthrough + interactive virtual tour + professional photos & information).
  We do not build agent/brokerage websites and do not sell à la carte services.
