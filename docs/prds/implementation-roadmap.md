# Implementation Roadmap

## Phase 1 - Foundation

- Finalize the Bun workspace scaffold, app shell, database package, local infrastructure, and PRDs
- Keep port allocation unique to this repo: `2201` through `2207`
- Preserve consistency with sibling repos so contributors can move between projects easily

## Phase 2 - Auth, uploads, and project creation

- Ship Better Auth with local email/password first so the guest-to-account path works during development
- Add Google when env credentials are available and keep Apple queued behind verified HTTPS/Tailscale setup
- Add guest-first session handling and complimentary first-run limits
- Implement yard project creation and photo upload to S3-compatible storage

### Phase 2 status update

- Guest-first limits and sign-in gating are now live in the app shell
- Local email/password auth and guest-workspace migration are shipped
- Account and billing routes are now protected behind sign-in
- S3-backed media persistence is still outstanding; uploads remain local file-backed for now

## Phase 3 - Analysis and generation

- Add yard analysis orchestration and stored briefs
- Generate landscaping concepts from the user brief and source photo
- Build studio interactions for save, compare, and regenerate

## Phase 4 - Billing and persistence

- Integrate Polar checkout and webhook processing
- Debit and credit the ledger around generation activity
- Persist saved concepts, saved recommendations, and account history

## Phase 5 - Quality and trust improvements

- Improve prompt templates and generation quality
- Add safety reviews, better privacy controls, and clearer recommendation explanations
- Tune pricing inputs and conversion points based on real usage

## Delivery notes

- Keep the studio as the center of product value
- Avoid drifting into pro landscaping workflows unless a later roadmap update explicitly changes direction
- Prefer incremental, consumer-visible wins over heavy backend expansion early
