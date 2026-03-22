# showmethetitle.ru Modernization Design

**Date:** 2026-03-22
**Status:** Approved

## Goal

Preserve the visual character of `showmethetitle.ru` while replacing the legacy runtime and build pipeline with a maintainable static-site setup that produces a plain deployable folder.

## Current Problems

- The project still relies on `Node 10 + Gulp 3.9`.
- The shipped runtime includes legacy jQuery, UA sniffing, Hyphenator, and dead mobile footer requests.
- Responsive behavior depends on a loop that repeatedly shrinks text until it fits.
- Google Analytics is embedded directly in the template and is no longer wanted.
- The project ships prebuilt minified artifacts as the primary source of truth, which makes safe changes harder.

## Product Constraints

- The result must remain a static site.
- The visual language should stay close to the current project.
- Mobile must become first-class, not a bolted-on special path.
- A build step is acceptable, but the final output must be a simple static folder that can be copied elsewhere manually.

## Architecture Decisions

### 1. Keep it static and simple

The site will remain a plain static website built from:

- `index.html`
- modern CSS
- vanilla JavaScript
- static assets

No framework runtime will be introduced.

### 2. Replace Gulp with Vite

Use Vite as the development and build tool only. It gives:

- a modern local dev server
- a predictable static production build
- simple asset handling
- no runtime framework lock-in

The deployable result will be `dist/`.

### 3. Make source files readable again

The repo should move back to human-maintainable source files instead of treating minified root artifacts as the main editable surface.

Planned working structure:

- `index.html`
- `src/main.js`
- `src/styles.css`
- `src/lib/generator.js`
- `src/lib/fitTitle.js`
- `src/data/titles.json`
- `public/...` for favicons, social image, and font assets that should be copied as-is

## Responsive Typography Strategy

### 1. CSS-first adaptation

Responsive typography will be driven primarily by CSS:

- `clamp(...)` for fluid font sizing
- CSS custom properties for spacing and controls
- media queries instead of UA sniffing
- `hyphens: auto` and other modern wrapping rules as the first line of defense

### 2. JS fallback only for real overflow

Because generated titles vary in length, CSS alone is not enough to guarantee fit in every case. A small JavaScript fallback will:

- measure the title after generation and on resize
- reduce only a scale variable when overflow is detected
- stop after the content fits or a defined minimum scale is reached

This replaces the current brute-force resize loop with predictable container-based fitting.

### 3. No separate “mobile mode”

The new version will not have:

- `window.mobilecheck()`
- a `.mobile` root class
- separate mobile footer fetches

Desktop and mobile will share one layout system with responsive rules.

## Data Format Decision

The phrase sources will move from three text files to one JSON file.

Proposed structure:

```json
{
  "part1": ["..."],
  "part2": ["..."],
  "part3": ["..."]
}
```

Reasons:

- one request instead of three
- easier validation
- easier editing and extension
- easier test coverage

During migration, the old `01.txt`, `02.txt`, and `03.txt` files can remain temporarily until parity is verified, then be removed.

## Cleanup Scope

The modernization includes removing:

- Google Analytics snippet
- `ga(...)` event calls
- legacy Gulp builder files
- jQuery runtime dependency
- `jquery.isonscreen`
- dead footer-loading code
- stale HTTP metadata where modern HTTPS/static paths are expected

## Testing Strategy

This project does not need heavy end-to-end infrastructure. The testing plan is intentionally lightweight:

- unit tests for phrase generation
- unit tests for overflow-fit helper math
- static build verification with `vite build`
- manual browser verification for desktop and mobile breakpoints

## Success Criteria

- The site builds into a plain static `dist/` folder.
- The desktop look stays recognizably close to the current site.
- Mobile no longer depends on UA detection.
- Long generated titles fit without collapsing into unreadably tiny text.
- No 404 requests remain for nonexistent footer files.
- No Google Analytics or other external trackers are loaded.
- The source of truth is readable project code, not legacy minified output.

## Out of Scope

- changing the core idea of the generator
- redesigning the brand or visual language from scratch
- adding a backend or CMS
- turning the project into a framework-driven app
