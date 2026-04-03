# Trust, Safety, And Image Privacy

## Goal

Make homeowners feel safe uploading real photos of their property and paying for results.

## Principles

- Respect that yard photos may reveal home layout, valuables, or neighborhood context
- Explain clearly what the app does and does not know
- Set expectations that concepts are inspiration and planning support, not engineering drawings

## MVP scope

- Clear upload and storage messaging
- Sensible retention and deletion posture
- Plain-language billing and refund expectations
- Moderation hooks or safety review points for obviously problematic uploads or outputs

## Current shipped checkpoint

- The app now includes a dedicated privacy and trust page in the product shell
- Studio copy explains the complimentary guest limit and account conversion path in plain language
- Deleting workspace data removes the workspace record and its related media files from the active storage backend

## Requirements

- Avoid overclaiming accuracy for climate, code, irrigation, or structural feasibility
- Allow users to understand when an image is stored, generated, saved, or deleted
- Keep billing and checkout flows inside a trust-preserving consumer tone

## Acceptance criteria

- The product UI explains what happens to uploaded photos at a high level
- The app avoids presenting generated outputs as guaranteed-realistic construction plans
- The user can understand how credits are spent and what happens after purchase

## Future follow-up

- User-managed account deletion beyond the current workspace reset flow
- Safety review queue for flagged generations
- More explicit privacy settings for saved project history
