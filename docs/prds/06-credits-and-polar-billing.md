# Credits And Polar Billing

## Goal

Charge for ongoing usage in a way that feels transparent, consumer-friendly, and easy to trust.

## Monetization model

- One complimentary guest concept
- One-time credit packs purchased through Polar
- Credit usage based on a base analysis cost plus per-image generation cost

## MVP credit packs

- Starter Pack
- Curb Appeal Pack
- Backyard Vision Pack

## Requirements

- Show estimated credit usage before the user confirms generation
- Keep current balance visible in the studio and billing areas
- Keep billing language plain-English and non-technical
- Use Polar sandbox until purchase flow and webhook handling are confirmed end-to-end

## Operator controls

- Configure analysis model cost
- Configure concept image cost
- Configure target margin percent
- Configure credit value in cents

## User-facing principles

- Never hide the cost of a generation behind vague copy
- Explain what a credit pack is good for in practical terms
- Surface billing history alongside project usage when helpful

## Acceptance criteria

- Developers can seed and display starter credit packs locally
- Pricing helpers can derive credits from configurable cost inputs
- The app can later support checkout handoff and webhook-based credit grants without changing the core data model

## Current implementation status

- The studio now debits local sandbox credits for non-complimentary concept passes and surfaces the resulting ledger in billing and account views
- Developers can top up demo credits from the studio so the generation loop stays easy to test
- Polar environment variables and seeded credit packs remain in place, but checkout and webhook wiring are still future work

## Future follow-up

- Promotional grants or referral credits
- Subscription plans only if repeat usage behavior justifies them
