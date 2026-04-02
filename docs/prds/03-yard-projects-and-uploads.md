# Yard Projects And Uploads

## Goal

Make it easy for consumers to start with a real outdoor problem area and give the model enough context to return plausible landscaping ideas.

## MVP scope

- Create a yard project tied to one main photo
- Support project types like front yard refresh, backyard makeover, patio upgrade, curb appeal, and garden bed redesign
- Collect lightweight user intent fields such as outcome, budget band, maintenance preference, and optional climate context

## Requirements

- Mobile upload must feel first-class
- Users can start from a single photo and a simple written goal
- Input fields should use plain-language labels rather than landscaping jargon
- The app should preserve the original project intent so concepts stay traceable later

## Recommended fields

- Project title
- Project type
- Freeform objective
- Budget band
- Maintenance preference
- Sun exposure guess or uncertainty
- Kid-friendly or pet-friendly preference
- Climate zone or region if known

## UX notes

- Use one clear upload step rather than a complicated form wall
- Explain how better inputs improve results without intimidating the user
- If climate or sun information is unknown, allow the user to skip it

## Acceptance criteria

- A new user can create a project and upload a source photo in under two minutes
- The project page can show the original brief next to generated outputs later
- Project setup works equally well for front-yard and backyard use cases

## Future follow-up

- Multiple source photos per project
- Zone tagging for larger yards
- Photo annotation and mask-based editing
