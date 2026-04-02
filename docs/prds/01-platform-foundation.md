# Platform Foundation

## Goal

Create the technical and design foundation for a fast-moving SvelteKit monolith that can support AI analysis, image generation, storage, auth, and credit billing without forcing an early service split.

## MVP scope

- Monorepo structure with `apps/web` and `packages/db`
- Bun-native SSR output, local Docker services, and `mise` task runners
- Environment handling, database schema ownership, and local seeding
- Shared design tokens, public shell, auth shell, consumer studio shell, and starter account and billing pages

## Requirements

- Local setup works from a fresh clone with documented commands
- Core environments exist for local, preview, and production
- Database changes are versioned and repeatable
- Local ports do not collide with sibling projects in the parent workspace
- AI defaults support local routing for development and hosted routing for later production use

## Task breakdown

- Lock workspace conventions, scripts, and package versions
- Set up Biome, strict TypeScript checks, and baseline tests
- Containerize Postgres, object storage, mail testing, Ollama, and the SSR app runtime
- Reserve a dedicated port block starting at `2201`
- Add environment variables for auth, billing, storage, and AI pricing configuration
- Seed starter credit packs and future pricing helpers
- Build the initial SvelteKit shell with landing, studio, sign-in, billing, account, and docs routes

## Acceptance criteria

- A new developer can start the app locally in under 15 minutes
- The app builds with Bun SSR output
- Schema, seeds, and local services run without manual patching
- The repo structure matches sibling apps closely enough that contributors can move between them comfortably

## Initial implementation status

- Bun workspace, SvelteKit shell, Drizzle package, Docker Compose, and `mise` workflow are scaffolded
- Dedicated local ports are reserved: `2201` through `2207`
- The `2201` block was chosen after confirming `1401` already belonged to another sibling repo in the parent workspace
- The studio, account, billing, docs, and media routes are all live in the app shell
- A deterministic file-backed local workflow now lets the core consumer product flow work without waiting on auth or hosted AI credentials

## Remaining follow-up

- Wire Better Auth fully into the app shell and account flows
- Replace the temporary file-backed workspace store with the intended database and object-storage-backed implementation
- Introduce AI provider configuration and generation orchestration once the first working local product loop is stable enough to swap internals safely

## Non-goals

- Production infrastructure provisioning
- Dedicated worker autoscaling on day one
