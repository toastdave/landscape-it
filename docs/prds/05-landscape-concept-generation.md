# Landscape Concept Generation

## Goal

Help users explore plausible landscaping directions quickly while keeping the experience anchored in the original yard and brief.

## MVP scope

- Generate one or more concept images from a yard project
- Support regeneration and alternate direction creation
- Present concepts with captions, budget posture, and planning context
- Allow users to save favorite concepts for later comparison

## User controls

- Number of concepts to generate
- Style direction
- Budget level
- Maintenance preference
- Project type
- Optional kid-friendly or pet-friendly preference

## Output expectations

- Concepts should read as realistic homeowner-facing ideas, not fantasy renders
- Captions should explain what changed and why it helps
- Each concept should remain recognizably tied to the original yard layout

## UX notes

- Keep comparison lightweight and visual
- Show credit cost before submission
- Explain when a concept is a variation versus a full alternate direction
- Save states should be available from the main studio view

## Acceptance criteria

- A homeowner can compare multiple directions for one project without losing the original context
- Saved concepts remain attached to the project and account
- Regeneration is possible without forcing users to start over

## Current implementation status

- The app now generates deterministic concept passes immediately after upload and supports additional regenerate passes from the same project page
- Each pass includes a practical brief, concept imagery, and recommendation cards so the full studio loop is working in local development
- The current concept renderer uses generated SVGs as a dependable placeholder for future Gemini or Ollama-backed image generation

## Future follow-up

- Localized edit instructions on a concept
- Before and after slider views
- Side-by-side comparison mode for top concepts
