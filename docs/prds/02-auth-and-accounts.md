# Auth And Accounts

## Goal

Let new homeowners experience value before sign-in, then convert them into accounts when they want history, saved ideas, or paid usage.

## Product stance

- The app should feel usable before account creation
- Sign-in should happen after value is demonstrated, not before
- Account pages should feel calm and practical rather than admin-heavy

## MVP scope

- One guest project with one complimentary concept
- Better Auth session model with local email/password available immediately
- Google should be environment-driven when credentials are present
- Apple remains a follow-up once the HTTPS Tailscale path is being exercised end to end
- Account area for profile, saved concepts, saved recommendations, and credit activity
- Clear migration path from guest state to signed-in state

## Current shipped checkpoint

- Guest mode is limited to one complimentary project/concept path before account conversion
- Email/password auth is live in local development
- Guest workspaces migrate into the signed-in account on the same device
- Account and billing pages now redirect guests into sign-in with clear reasons

## Requirements

- Guests can complete the first concept flow without an account
- Paid generations require sign-in
- Saved concepts and recommendations require sign-in
- Account UI clearly explains what becomes available after sign-in

## Functional details

- Guest users receive a short-lived anonymous workspace identifier or equivalent lightweight session state
- When the guest signs in, project history and the complimentary flow state should migrate cleanly into the new user account
- Google and Apple provider configuration should be environment-driven and hidden cleanly if not configured
- Local email/password should remain available in development so auth wiring can be tested without external provider setup
- Account pages should prioritize project context, not just identity management

## Acceptance criteria

- A first-time user can experience one full concept result before authentication is required
- Returning users can reopen their saved concepts and billing history after signing in
- The sign-in route clearly explains why login is being requested

## Future follow-up

- Apple sign-in once the HTTPS local/tailnet path is verified end to end
- Magic-link fallback if social login conversion proves too limiting
- Project sharing links for family decision-making
