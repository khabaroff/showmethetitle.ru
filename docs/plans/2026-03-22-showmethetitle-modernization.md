# Showmethetitle Modernization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the legacy Gulp/jQuery/Hyphenator/GA stack with a maintainable Vite-powered static site that preserves the current visual character and delivers reliable responsive typography on desktop and mobile.

**Architecture:** Keep the site as a plain static app with `index.html`, vanilla JS, and one modern stylesheet. Use Vite only as the build/dev tool, move title fragments into a single JSON file, and drive typography with CSS-first responsiveness plus a small overflow-fit fallback.

**Tech Stack:** Vite, vanilla JavaScript, modern CSS, JSON data, Vitest

---

### Task 1: Bootstrap the Modern Static Toolchain

**Files:**
- Create: `package.json`
- Create: `.gitignore`
- Create: `src/main.js`
- Create: `src/styles.css`
- Create: `tests/generator.test.js`
- Modify: `index.html`

**Step 1: Write the failing test**

Create `tests/generator.test.js` with a failing import for the not-yet-existing generator module.

```js
import { describe, expect, it } from "vitest";
import { buildTitle } from "../src/lib/generator.js";

describe("buildTitle", () => {
  it("joins the three title parts into the legacy sentence shape", () => {
    expect(buildTitle("Тридцать", "крутых бутербродов", "которые заставляют задуматься"))
      .toBe("Тридцать крутых бутербродов, которые заставляют задуматься");
  });
});
```

**Step 2: Add the minimal toolchain files**

Create `package.json` with scripts:

```json
{
  "name": "showmethetitle-modernized",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "devDependencies": {
    "vite": "^7.1.4",
    "vitest": "^3.2.4"
  }
}
```

Create `.gitignore` with:

```gitignore
node_modules
dist
.DS_Store
```

Create minimal placeholders:

```js
// src/main.js
console.log("bootstrap");
```

```css
/* src/styles.css */
:root {}
```

Update `index.html` to load Vite entrypoints instead of the old minified bundle.

**Step 3: Install dependencies**

Run: `npm install`

Expected: install succeeds and `node_modules/` is created.

**Step 4: Run the test to verify it fails**

Run: `npm test`

Expected: FAIL because `src/lib/generator.js` does not exist yet.

**Step 5: Write the minimal implementation**

Create `src/lib/generator.js`:

```js
export function buildTitle(part1, part2, part3) {
  return `${part1} ${part2}, ${part3}`;
}
```

**Step 6: Run the test to verify it passes**

Run: `npm test`

Expected: PASS for `tests/generator.test.js`.

**Step 7: Commit**

```bash
git add package.json .gitignore index.html src/main.js src/styles.css src/lib/generator.js tests/generator.test.js
git commit -m "chore: bootstrap modern static toolchain"
```

### Task 2: Convert Phrase Sources to JSON and Remove Legacy Fetch Shape

**Files:**
- Create: `src/data/titles.json`
- Modify: `src/lib/generator.js`
- Modify: `src/main.js`
- Test: `tests/generator.test.js`

**Step 1: Write the failing test**

Extend `tests/generator.test.js`:

```js
import { describe, expect, it } from "vitest";
import { createTitleFromData } from "../src/lib/generator.js";
import data from "../src/data/titles.json";

describe("createTitleFromData", () => {
  it("uses exactly one random item from each array", () => {
    const fakeRandom = () => 0;
    expect(createTitleFromData(data, fakeRandom))
      .toBe(`${data.part1[0]} ${data.part2[0]}, ${data.part3[0]}`);
  });
});
```

**Step 2: Run the test to verify it fails**

Run: `npm test`

Expected: FAIL because `titles.json` and `createTitleFromData` do not exist yet.

**Step 3: Write the minimal implementation**

Create `src/data/titles.json` by converting `01.txt`, `02.txt`, and `03.txt` into:

```json
{
  "part1": [],
  "part2": [],
  "part3": []
}
```

Expand `src/lib/generator.js`:

```js
export function pickRandom(items, random = Math.random) {
  return items[Math.floor(random() * items.length)];
}

export function buildTitle(part1, part2, part3) {
  return `${part1} ${part2}, ${part3}`;
}

export function createTitleFromData(data, random = Math.random) {
  return buildTitle(
    pickRandom(data.part1, random),
    pickRandom(data.part2, random),
    pickRandom(data.part3, random)
  );
}
```

Update `src/main.js` to import the JSON source and stop depending on three text-file requests.

**Step 4: Run the test to verify it passes**

Run: `npm test`

Expected: PASS for all generator tests.

**Step 5: Commit**

```bash
git add src/data/titles.json src/lib/generator.js src/main.js tests/generator.test.js
git commit -m "feat: load title fragments from json"
```

### Task 3: Rebuild the HTML Shell and Remove Tracking

**Files:**
- Modify: `index.html`
- Modify: `src/main.js`
- Modify: `README.md`

**Step 1: Write the failing verification**

Define the acceptance condition before editing:

- `index.html` must contain no GA snippet
- the app must load `src/main.js`
- the page must still expose:
  - a title container
  - a refresh button
  - a project link

Run:

```bash
rg -n "GoogleAnalyticsObject|analytics\\.js|ga\\(|UA-" index.html src README.md
```

Expected: legacy matches still exist before the cleanup.

**Step 2: Implement the new shell**

Update `index.html` so it:

- keeps the existing semantic structure of content + refresh + footer link
- removes inline analytics completely
- references the Vite JS/CSS entrypoints
- keeps `lang="ru"` and the project metadata

Update `src/main.js` so it:

- renders the initial title on load
- regenerates on refresh button click
- regenerates on Space
- contains no `ga(...)` calls

**Step 3: Verify the cleanup**

Run:

```bash
rg -n "GoogleAnalyticsObject|analytics\\.js|ga\\(|UA-" index.html src README.md
```

Expected: no matches.

**Step 4: Commit**

```bash
git add index.html src/main.js README.md
git commit -m "feat: remove analytics and rebuild app shell"
```

### Task 4: Implement Responsive Typography with a Predictable Fit Fallback

**Files:**
- Create: `src/lib/fitTitle.js`
- Create: `tests/fitTitle.test.js`
- Modify: `src/styles.css`
- Modify: `src/main.js`

**Step 1: Write the failing test**

Create `tests/fitTitle.test.js`:

```js
import { describe, expect, it } from "vitest";
import { getNextScale } from "../src/lib/fitTitle.js";

describe("getNextScale", () => {
  it("keeps the scale unchanged when content fits", () => {
    expect(getNextScale({ fits: true, currentScale: 1 })).toBe(1);
  });

  it("reduces the scale by one step when content overflows", () => {
    expect(getNextScale({ fits: false, currentScale: 1 })).toBe(0.96);
  });

  it("never goes below the floor", () => {
    expect(getNextScale({ fits: false, currentScale: 0.62 })).toBe(0.62);
  });
});
```

**Step 2: Run the test to verify it fails**

Run: `npm test`

Expected: FAIL because `src/lib/fitTitle.js` does not exist yet.

**Step 3: Write the minimal implementation**

Create `src/lib/fitTitle.js`:

```js
const MIN_SCALE = 0.62;
const STEP = 0.04;

export function getNextScale({ fits, currentScale }) {
  if (fits) return currentScale;
  return Math.max(MIN_SCALE, Number((currentScale - STEP).toFixed(2)));
}
```

Update `src/main.js` with a DOM wrapper that:

- resets scale before rendering a new title
- checks whether the title container overflows
- lowers a CSS custom property only when needed
- re-runs on resize and after refresh

Update `src/styles.css` so typography uses:

- CSS variables
- `clamp(...)`
- media queries
- `hyphens: auto`
- button/footer spacing that works on small screens

**Step 4: Run the test to verify it passes**

Run: `npm test`

Expected: PASS for generator and fit helper tests.

**Step 5: Commit**

```bash
git add src/lib/fitTitle.js src/main.js src/styles.css tests/fitTitle.test.js
git commit -m "feat: add responsive title fitting"
```

### Task 5: Migrate Static Assets and Remove Dead Legacy Files

**Files:**
- Create: `public/parts/img/...`
- Create: `public/fonts/...`
- Modify: `index.html`
- Modify: `README.md`
- Delete: `builder/gulpfile.js`
- Delete: `builder/package.json`
- Delete: `parts/js/app.js`
- Delete: `parts/js/index.js`
- Delete: `parts/js/jquery-2.1.1.min.js`
- Delete: `parts/js/jquery.isonscreen.js`
- Delete: `parts/js/hyphenator-min.js`
- Delete: `index.js`
- Delete: `index.css`
- Optional delete after parity check: `01.txt`, `02.txt`, `03.txt`

**Step 1: Write the failing verification**

Run:

```bash
rg -n "gulp|jquery|Hyphenator|mobilefooter|footer\\.html" .
```

Expected: multiple legacy matches are still present.

**Step 2: Perform the cleanup**

- Move only the still-used static assets into `public/`
- update references in `index.html`
- delete the legacy builder and runtime files once the Vite version is the source of truth
- keep the old text files only until JSON parity has been visually verified

**Step 3: Verify the cleanup**

Run:

```bash
rg -n "gulp|jquery|Hyphenator|mobilefooter|footer\\.html" .
```

Expected: no matches in active app files.

**Step 4: Commit**

```bash
git add public index.html README.md
git add -u
git commit -m "refactor: remove legacy runtime and builder"
```

### Task 6: Verify the Static Output and Document Usage

**Files:**
- Modify: `README.md`

**Step 1: Build the site**

Run: `npm run build`

Expected: PASS and `dist/` is created.

**Step 2: Preview the build**

Run: `npm run preview -- --host 127.0.0.1 --port 4173`

Expected: local preview starts successfully.

**Step 3: Perform manual checks**

Verify in browser:

- desktop at approximately `1440x900`
- mobile at approximately `390x844`
- repeated refresh clicks
- Space key regeneration
- no external tracker requests
- no overflow on long titles

**Step 4: Update the README**

Document:

- `npm install`
- `npm run dev`
- `npm run test`
- `npm run build`
- where to find static output (`dist/`)

**Step 5: Commit**

```bash
git add README.md
git commit -m "docs: document static build workflow"
```

### Final Verification

Run the full verification sequence:

```bash
npm test
npm run build
```

Expected:

- all tests pass
- production build succeeds
- `dist/` is ready to copy to static hosting
