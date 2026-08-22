# Working on this repo

Personal portfolio for Alessio Maiola. Next.js 15 App Router, TypeScript,
Tailwind CSS 4, statically exported to GitHub Pages.

This file is the contract for anyone - human or agent - changing this site.
Read the **Non-obvious constraints** section before touching CSS, icons or
images; several rules here exist because the obvious approach is actively
wrong and the failure is silent.

---

## Commands

```bash
npm run dev            # dev server on :3000
npm run build          # static export into out/
npx tsc --noEmit       # type check
npx eslint .           # lint
npx serve@latest out   # serve the built export
```

**Never run `npm run build` while `npm run dev` is running.** Both write to
`.next/`, and the dev server then serves a blank page with
`TypeError: __webpack_modules__[moduleId] is not a function`. It looks like a
code bug and is not. Stop the dev server, build, then `rm -rf .next` before
restarting dev.

Always run `npx tsc --noEmit` and `npx eslint .` before committing.

---

## Architecture

```
app/
  layout.tsx              root shell: fonts, metadata, ambient bg, nav, footer
  page.tsx                home - composes the seven home sections in order
  globals.css             THE design system (tokens + component classes)
  projects/, contacts/    sub-pages; each layout.tsx owns its SEO metadata
  components/
    home-sections/        one folder/file per home section
    navbar/  footer/      site chrome
    ui/                   shared primitives (see below)
    *-data.ts(x)          content, separated from presentation
```

Content lives in the `*-data` files (`projects-data.ts`, `skills-data.tsx`,
`contact-data.tsx`, `education-data.ts`, `work-data.ts`). Prefer editing those
over hardcoding strings into components.

### Shared primitives (`app/components/ui/`)

| Module | Purpose |
| --- | --- |
| `section.tsx` | `<Section>` + `<SectionHeader>` - the shell every section uses |
| `reveal.tsx` | `<Reveal>`, `<RevealGroup>`/`<RevealItem>` - scroll entrances |
| `primary-button.tsx` | the only button; variants `primary`/`secondary`/`ghost` |
| `icon-registry.ts` | name → Lucide component map (**read the note in it**) |
| `ambient-background.tsx` | fixed CSS backdrop |
| `use-spotlight.ts` | cursor-tracked card glow, pairs with `.spotlight` |
| `scroll-progress.tsx` | navbar reading-progress bar |

Use these rather than re-implementing. If a section needs a one-off entrance,
extend `Reveal` instead of adding another IntersectionObserver.

---

## Design system

`app/globals.css` is the single source of truth. Components must style
themselves from **tokens** (`var(--fg)`, `var(--line)`, `var(--r-lg)`,
`var(--shadow-md)`, `var(--ease-out)`) and **shared classes** (`.card`,
`.btn`, `.chip`, `.title`, `.lead`, `.rule`, `.eyebrow`).

Do not introduce raw hex values or Tailwind palette utilities
(`bg-neutral-800`, `text-zinc-400`). They break the light/dark swap, which
works by re-pointing one set of variables.

### Palette is deliberately monochrome

Black, white and greys only. "Accent" in the token names means *ink*, not a
hue. Emphasis comes from contrast, weight and light. **Company logos are the
only colour on the site** - they are content, and recolouring someone's mark
is not ours to do. Everything else, icons included, is monochrome.

Solid fills intentionally stop short of `#000`/`#fff`. A maximum-luminance
block against the opposite-extreme canvas is physically glaring; `--accent`
is `#1c1c20` / `#dededf`. Don't "fix" these back to pure values.

### Typography: three faces

| Role | Face | Used by |
| --- | --- | --- |
| Headings | **Ubuntu Mono** 700 | `.display`, `.title-xl`, `.title` |
| Body / UI | **Geist Sans** | running text, `.title-sm`, controls |
| Data | **Geist Mono** | dates, counters, `.eyebrow`, `.chip-mono` |

Headings use **Ubuntu Mono** - the font Ubuntu ships as its terminal default -
chosen by the owner by name, for its letterforms. Only the 700 weight is
loaded; every heading class uses it and the 400 would be dead payload.

The heading face has been through several rounds. Do not change it again
without being asked: a serif (Fraunces) was rejected, and Space Grotesk was
rejected specifically over the shapes of its `g` and `y`.

Two consequences of a monospace heading, easy to undo by accident:

- **Display sizes are smaller than a proportional face would need** (`4rem`
  max, not `4.75rem`). Monospace advance widths are wide; the larger sizes
  pushed the long headline past its column.
- **Tracking is negative but modest** (`-0.03em` at display size). Ubuntu Mono
  is narrower than Geist Mono, so the tighter `-0.045em` tuned for Geist made
  it look cramped.

**Card headings (`.title-sm`) stay on the sans.** The mono/sans split is what
separates section-level headings from card-level ones; setting both in mono
collapses that distinction.

Data-bearing type uses `font-variant-numeric: tabular-nums` so columns of
years and counters don't wobble.

### Section headers are left-aligned

`SectionHeader` defaults to `align="left"` on purpose. Centring every header
flattens hierarchy, drags the eye back to the middle on each line, and
detaches the heading from the grid it introduces. Headers sit on the same
left spine as the content beneath them.

Centre is reserved for the one place it argues for itself: the closing call
to action.

**Section headings carry no rule under them.** Each `.section` already draws a
full-width hairline across the top of its content column, which is the real
boundary; a second short hairline under the heading repeated that signal
without encoding anything, since it was the same width regardless of content.
Spacing separates heading from lead perfectly well.

A short `.rule` under a heading survives in exactly two places - the home
contact panel and the `/contacts` page - where the heading is centred, has no
left edge to anchor to, and the rule marks a deliberate closing moment. Don't
reintroduce it elsewhere.

---

## Non-obvious constraints

These are the traps. Each one has bitten this codebase.

### 1. Custom CSS must live in a `@layer`

`globals.css` wraps its rules in `@layer base` and `@layer components`.
Unlayered CSS outranks **every** Tailwind utility, so an unlayered
`.card { border-color: … }` silently beats `border-transparent` in the markup.
New global rules go inside the existing layers.

### 2. Never `import * as Icons from "lucide-react"`

A namespace import plus a dynamic `Icons[name]` lookup cannot be tree-shaken,
so the whole ~1,500-icon library ships - it was **549 KB** on the home page.
Register icons explicitly in `ui/icon-registry.ts`. `IconName` is derived from
that object, so an unregistered name in a data file is a compile error.

### 3. Component z-index must be contained

The navbar and mobile drawer use `--z-nav` / `--z-overlay` from the scale in
`globals.css`. Any component with an internal z-index range (the project deck
stacks cards up to 100) must sit inside a stacking context, via the
`.stack-local` helper (`isolation: isolate`). Otherwise those values compete
in the **root** stacking context and cover the navbar and the drawer.
`position: relative` alone does *not* contain them - only a stacking context
does.

### 4. Don't animate the ambient background

`.ambient__waves` is a full-viewport `repeating-radial-gradient`. Animating a
transform on it forces a whole-layer re-raster every frame and visibly freezes
scrolling. It is static on purpose; the drifting blooms supply the motion.

### 5. Project media must never use `object-cover`

Source screenshots range from 1.50 to 2.25 aspect against frames near 1.6-1.86,
so `cover` crops up to a quarter off an image - it was cutting the first word
off a thesis figure. Never reach for it on project media.

Both surfaces - the `/projects` cards and the home deck
(`projects-postcards`) - use **`object-fill`**. The media block fills edge to
edge with no letterbox bars and every card matches, at the cost of some aspect
distortion. This is the owner's explicit preference on both; don't "correct"
it back to `contain`.

The `/projects` cards also have **no hover zoom** on the media - removed at the
owner's request. Hover still lifts the card and lights its border.

### 6. The navbar needs its own opacity

It uses `--surface-nav` (~95-97% opaque), not the `--surface` cards use. At
card opacity, page headings are legible straight through the bar.

### 7. Anything clipped to the navbar pill needs a rounded clip parent

The pill is `rounded-full`, but a child like the progress bar is a rectangle.
Without a `rounded-full overflow-hidden` wrapper it draws across the full
bounding box and the whole thing reads as a square. Clip inside the child
component, not by putting `overflow-hidden` on the navbar - that would also
clip the logo's intentional hover glow.

---

## Writing style

**Never use em-dashes or en-dashes.** Use a plain hyphen `-`. This applies to
UI copy, code comments, commit messages and docs.

---

## SEO / GEO

Handled in code, keep it that way:

- Per-page `title`, `description`, `canonical`, Open Graph and Twitter tags
  live in each route's `layout.tsx`. Keep titles in the **50-60 character**
  band and lead with keywords, not the name.
- `components/ui/structured-data.tsx` builds JSON-LD from the same data files
  the page renders, so schema cannot drift from visible content. If you add a
  job or a degree, the schema updates itself - don't hand-maintain a copy.
- `public/llms.txt` is a plain-text summary for LLM crawlers. Update it when
  roles, awards or focus areas change.
- `app/sitemap.ts` and `app/robots.ts` generate their files at build time. Add
  new routes to the sitemap.

Performance rules of thumb: keep total exported JS under ~1.1 MB (check with
`find out/_next/static -name '*.js' -printf '%s\n' | awk '{s+=$1} END {print s/1024" KB"}'`),
prefer `loading="lazy"` for anything below the fold, and only mark genuinely
above-the-fold images `priority`.

### Deliberately not done

- **No analytics or tracking pixels.** Adding Google Analytics / Meta Pixel is
  a privacy decision for the site owner, not a technical default. Ask first.
- **No street address or phone number**, and therefore no LocalBusiness
  schema. This is a personal site; that is a privacy call.
- **Reveal animations still use Framer Motion**, so scroll-animated blocks are
  server-rendered with `opacity: 0`. Auditors flag this as "rendered content".
  The text *is* in the static HTML and is crawlable - verified - and rewriting
  the reveals to be visible-by-default risks a visible flash on hydration for
  a low-priority metric. Revisit only with a no-flash approach.

---

## Deployment

`main` auto-deploys to GitHub Pages via `.github/workflows/pages.yml`.
Pushing to `main` publishes. Commit and push only when explicitly asked.
