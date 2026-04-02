# History, Saves, And Regeneration

## Goal

Make the app feel cumulative so homeowners can build confidence across multiple tries instead of treating every session as disposable.

## MVP scope

- Project history by yard
- Saved concepts
- Saved recommendations
- Regeneration from an existing project brief

## Requirements

- Users can reopen earlier projects without losing the original objective
- Saved concepts remain easy to scan visually
- Recommendations can be revisited later without making the account page feel like an e-commerce app
- Regeneration should preserve the surrounding project context

## UX principles

- Organize history by project, not just by timestamp
- Keep the studio as the primary place for detailed iteration
- Use the account area for archive, revisit, and compare behaviors

## Acceptance criteria

- A returning user can find a previous yard project quickly
- Saved ideas remain attached to the project that created them
- Regeneration produces new concept variants without breaking the project timeline

## Current implementation status

- Project history, regeneration, saved concepts, and saved recommendations now persist inside the local guest workspace
- The account page reads from the same workspace data as the studio so save states are already flowing across surfaces
- This persistence is file-backed for now, which keeps the product loop dependable while the long-term database-backed implementation is still pending

## Future follow-up

- Named collections or moodboards
- Shared family review links
- Notes attached to saved concepts
