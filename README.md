# Landscape It

Landscape It is a consumer self-serve AI landscaping app. Homeowners upload a photo of their yard, describe the result they want, choose how many concepts to generate, and get visual directions, planting ideas, and phased outdoor improvement guidance.

This repo is intentionally scaffolded in the same family as `upstage` and `tidy`: a Bun workspace with a SvelteKit web app, a shared Drizzle/Postgres database package, Docker-managed local infrastructure, and `mise` task runners.

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
BETTER_AUTH_URL=https://<device>.<tailnet>.ts.net:1401
BETTER_AUTH_TRUSTED_ORIGINS=http://localhost:1401,https://<device>.<tailnet>.ts.net:1401
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

App URLs:

- Web app: `http://localhost:1401`
- Mailpit: `http://localhost:1404`
- MinIO console: `http://localhost:1406`
- Ollama API: `http://localhost:1407`

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
https://<device>.<tailnet>.ts.net:1401
```

## AI setup

- Local development defaults to `AI_EXECUTION_MODE=local`, which routes analysis and generation through Ollama.
- Hosted environments should use Gemini for higher fidelity analysis and image generation.
- Pricing defaults are controlled with `LANDSCAPE_ANALYSIS_MODEL_COST_USD`, `LANDSCAPE_CONCEPT_MODEL_COST_USD`, `LANDSCAPE_TARGET_MARGIN_PERCENT`, and `LANDSCAPE_CREDIT_VALUE_CENTS`.

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
