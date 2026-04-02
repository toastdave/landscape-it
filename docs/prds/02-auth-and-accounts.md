# Auth And Accounts

## Goal

Let new homeowners experience value before sign-in, then convert them into accounts when they want history, saved ideas, or paid usage.

## Product stance

- The app should feel usable before account creation
- Sign-in should happen after value is demonstrated, not before
- Account pages should feel calm and practical rather than admin-heavy

## MVP scope

- One guest project with one complimentary concept
- Better Auth session model using Google and Apple as the required social providers
- Account area for profile, saved concepts, saved recommendations, and credit activity
- Clear migration path from guest state to signed-in state

## Requirements

- Guests can complete the first concept flow without an account
- Paid generations require sign-in
- Saved concepts and recommendations require sign-in
- Account UI clearly explains what becomes available after sign-in

## Functional details

- Guest users receive a short-lived anonymous workspace identifier or equivalent lightweight session state
- When the guest signs in, project history and the complimentary flow state should migrate cleanly into the new user account
- Google and Apple provider configuration should be environment-driven and hidden cleanly if not configured
- Account pages should prioritize project context, not just identity management

## Acceptance criteria

- A first-time user can experience one full concept result before authentication is required
- Returning users can reopen their saved concepts and billing history after signing in
- The sign-in route clearly explains why login is being requested

## Future follow-up

- Email or magic-link fallback if social login conversion proves too limiting
- Project sharing links for family decision-making
