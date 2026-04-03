# Landscape It

Landscape It is a consumer self-serve AI landscaping app. Homeowners upload a photo of their yard, describe the result they want, choose how many concepts to generate, and get visual directions, planting ideas, and phased outdoor improvement guidance.

This repo is intentionally scaffolded in the same family as `upstage` and `tidy`: a Bun workspace with a SvelteKit web app, a shared Drizzle/Postgres database package, Docker-managed local infrastructure, and `mise` task runners.

## Current implementation status

- The consumer studio flow now works locally end to end without external AI credentials.
- Guests can upload a yard photo, generate a landscaping brief, create concept passes, save concepts and recommendations, and revisit them in account and billing views.
- Better Auth is now wired for local email/password sign-in, and guest workspaces migrate into the signed-in account on the same device.
- The current generation path is deterministic and file-backed under `.data/` so the workflow stays reliable while real storage backends, hosted AI providers, and checkout are still being wired.
- This repo now uses the `2201` through `2207` project block because `1401` was already occupied by another sibling app in the parent workspace.

## Requirements

- `mise`
- `Docker` with `docker compose`
- `Tailscale` for tailnet access

## Locked stack

- `SvelteKit` + `Svelte 5`
- `Tailwind CSS v4`
- `Drizzle ORM`
- `Postgres`
- `Better Auth`
- `Polar`
- `AI SDK` + Google Gemini
- `Ollama` for local AI routing
- `Bun workspaces`
- `Biome`
- `Docker Compose`
- `mise`

## Workspace layout

- `apps/web` - landing page, auth shell, consumer studio, account, and billing UI
- `apps/web/Dockerfile` - Bun SSR image for local dev and production-style builds
- `packages/db` - Drizzle schema, migrations, pricing helpers, and seeding
- `docs/prds` - product and implementation planning docs
- `AGENTS.md` and `.agents/` - agent-facing workflow guidance and references

## Getting started

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Update `.env` for your machine:

```dotenv
BETTER_AUTH_URL=https://<device>.<tailnet>.ts.net:2201
BETTER_AUTH_TRUSTED_ORIGINS=http://localhost:2201,https://<device>.<tailnet>.ts.net:2201
```

3. Install the toolchain and dependencies:

```bash
mise install
mise run install
```

4. Choose a development workflow:

- `mise run dev` for the web app on your host machine with Docker-managed support services
- `mise run dev:docker` for the entire stack in Docker with hot reload

Optional local AI model setup:

```bash
mise run ai:pull:analysis
mise run ai:pull:image
```

## Local development

Start:

```bash
mise run docker:up
mise run db:push
mise run seed
mise run dev
```

If you only want to exercise the current guest workflow, `mise run dev` is enough. The studio writes local workspace data and generated SVG concepts into `.data/`.

App URLs:

- Web app: `http://localhost:2201`
- Mailpit: `http://localhost:2204`
- MinIO console: `http://localhost:2206`
- Ollama API: `http://localhost:2207`

Stop:

```bash
mise run docker:down
```

Reset local Docker data:

```bash
docker compose down -v
```

## Tailscale access

This repo uses a dedicated app port so sibling projects can share the same tailnet node without colliding.

Start:

```bash
mise run tailscale:up
```

Open from another device:

```text
https://<device>.<tailnet>.ts.net:2201
```

## AI setup

- Local development defaults to `AI_EXECUTION_MODE=local`, which routes analysis and generation through Ollama.
- Hosted environments should use Gemini for higher fidelity analysis and image generation.
- Pricing defaults are controlled with `LANDSCAPE_ANALYSIS_MODEL_COST_USD`, `LANDSCAPE_CONCEPT_MODEL_COST_USD`, `LANDSCAPE_TARGET_MARGIN_PERCENT`, and `LANDSCAPE_CREDIT_VALUE_CENTS`.
- The currently implemented studio flow does not require live model calls yet; it uses deterministic local generation so product and UX work can move ahead reliably.

## Billing setup

- `POLAR_ACCESS_TOKEN` is used for Polar API access.
- `POLAR_WEBHOOK_SECRET` validates webhook deliveries.
- `POLAR_SERVER` should stay on `sandbox` until checkout and webhook handling are verified end-to-end.
- `POLAR_PRODUCT_STARTER`, `POLAR_PRODUCT_CURB_APPEAL`, and `POLAR_PRODUCT_BACKYARD_VISION` should point at the sandbox product IDs for each credit pack.

## Common commands

```bash
mise run check
mise run lint
mise run test
mise run build
mise run db:generate
mise run db:migrate
mise run db:studio
```
