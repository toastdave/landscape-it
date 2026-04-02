# Yard Analysis And Style Briefs

## Goal

Turn an uploaded yard photo plus user intent into a grounded outdoor brief that makes the concept images more useful and trustworthy.

## Why this matters

- Consumers need more than pretty outputs; they need guidance they can act on
- The same photo can support many valid directions, so the app should explain what it thinks it is optimizing for
- A good brief helps users understand tradeoffs like maintenance, privacy, and focal points

## MVP outputs

- Site summary in plain language
- Style direction summary
- Identified opportunities or problem areas
- Suggested design principles
- Phased plan for how to approach the yard

## Example analysis dimensions

- Apparent sun or shade conditions
- Privacy gaps or screening opportunities
- Hardscape constraints and circulation
- Planting opportunities by zone
- Maintenance risk areas
- Visual focal points near entries, seating, or boundaries

## Requirements

- The brief must sound like practical homeowner guidance, not internal model output
- The language should stay humble when the app is inferring from limited visual data
- The brief should influence concept generation prompts and recommendation buckets

## Acceptance criteria

- Users receive a readable brief before or alongside the concept images
- The brief clearly connects to the visual concepts that follow
- The app avoids pretending to know exact soil, irrigation, or code constraints from a single photo

## Future follow-up

- Climate-aware plant filtering
- Region-specific style presets
- Stronger multi-zone analysis for larger backyards
