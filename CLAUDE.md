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
| `use-in-view.ts` | the site's single IntersectionObserver; `useInView()` |
| `primary-button.tsx` | the only button; variants `primary`/`secondary`/`ghost` |
| `icon-registry.ts` | name → Lucide component map (**read the note in it**) |
| `ambient-background.tsx` | fixed CSS backdrop |
| `use-spotlight.ts` | cursor-tracked card glow, pairs with `.spotlight` |
| `youtube-embed.tsx` | click-to-load YouTube facade (**read note 11**) |

Use these rather than re-implementing. If a section needs a one-off entrance,
extend `Reveal` instead of adding another IntersectionObserver - and if it
needs its own observer for something else, take it from `use-in-view.ts`
rather than constructing one.

**There is no animation library.** Framer Motion was removed; see note 12.
Do not reintroduce it, or any other JS animation runtime, for an effect CSS
can perform.

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

### 4. The ambient background is static, and carries no `filter: blur()`

Two separate rules, both about the same layer.

`.ambient__waves` is a full-viewport `repeating-radial-gradient`. Animating a
transform on it forces a whole-layer re-raster every frame and visibly freezes
scrolling. It is static on purpose.

The two `.ambient__glow` blooms used to carry `filter: blur(100px)`. A blur
allocates an offscreen buffer the size of the element plus the blur radius and
runs a two-pass convolution over it on every paint - and these are ~1400x760
elements. Their fill is already a `radial-gradient`, i.e. a smooth falloff the
GPU paints directly, so the blur was buying almost nothing for the most
expensive paint on the page. Extending the gradient's own falloff to the full
radius replaces it for free.

This matters twice over: **every `backdrop-filter` on the site samples this
layer**, so an expensive ambient layer makes every frosted surface expensive
too. The same rule applies to the accent blooms in the hero and the contact
panel - use `.bloom`, never `blur-3xl` on a solid block.

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

### 6. The project deck is a CSS transition, and cheap on phones

`projects-postcards` moves five large, transformed cards at once.

The rotation is a **CSS transition on `transform` and `opacity`**, which the
compositor runs on its own thread. It used to be a JS physics spring, which
woke the main thread every frame to recompute five cards and write five inline
styles. Don't put that back: the spring it replaced was overdamped (no
overshoot at all), so `var(--ease-out)` at 380ms is a faithful match, and
`SETTLE_MS` in the component must stay in step with that duration.

Three things dominate what is left of its cost, and all three are throttled on
touch devices by the `.deck-card` rules in `globals.css`:

- **`filter: blur()`** puts each card on its own layer and re-rasterises it
  whenever the radius changes. Disabled entirely on phones (`!important`,
  because the value arrives as an inline style).
- **The two-layer `--shadow-xl`** is reduced to `--shadow-md`.
- **The two outermost cards** get `display: none` via `.deck-card--far`. They
  are mostly off-screen on a phone but still cost a layer and a paint;
  `visibility`/`opacity` would not reclaim that.

Also: don't put `transition-shadow`, a `hover:scale-*` or a standing
`will-change` on these cards. The shadow never changes, a CSS scale would
fight the inline transform, and `will-change` would keep five compositor
layers alive for as long as the page is open - the browser already promotes
each card for the duration of its transition.

### 7. The navbar needs its own opacity

It uses `--surface-nav` (~95-97% opaque), not the `--surface` cards use. At
card opacity, page headings are legible straight through the bar.

### 8. Anything clipped to the navbar pill needs a rounded clip parent

The pill is `rounded-full`, but a child like the progress bar is a rectangle.
Without a `rounded-full overflow-hidden` wrapper it draws across the full
bounding box and the whole thing reads as a square. Clip inside the child
component, not by putting `overflow-hidden` on the navbar - that would also
clip the logo's intentional hover glow.

### 9. Every backdrop filter goes through `--glass`

`backdrop-filter` is the most expensive thing any surface here paints: it
re-samples and re-blurs everything behind the element. So **no component
declares one.** They all read a single token:

```css
backdrop-filter: var(--glass);
```

`:root` sets `--glass: blur(12px) saturate(145%)`, and one media query -
`@media (max-width: 639px), (hover: none)` - sets it to `none`. That single
declaration switches off the navbar, the cards, the drawer, the contact panel,
the carousel controls, the team tiles and the secondary buttons on every touch
device. Never write `backdrop-blur-*` (the Tailwind utility) or a literal
`backdrop-filter` in a component: it escapes the switch. Use the `.glass`
class, or `.card`/`.surface`, which already do this.

`(hover: none)` rather than a width alone, because a phone in landscape or a
tablet is just as unable to afford the effect as a narrow viewport.

A card whose **own geometry animates** must opt out on desktop too: it would
otherwise re-sample and re-blur the whole backdrop on every frame of the size
change. The skills accordion is the only such card, and it carries
`.card--resizes`, which sets `--glass: none` on itself. Don't remove the
modifier, and add it to any new card that animates its own size.

### 10. Accordion easing must be pure ease-out

`.accordion-panel` transitions `grid-template-rows: 0fr -> 1fr`. It previously
used `cubic-bezier(0.4, 0, 0.2, 1)`, whose first control point puts an
**ease-in** ramp at the start - so there is a measurable pause between the tap
and any visible movement, which reads as lag rather than as slowness.

Measured cost of the open/close is ~0.3 ms of style+layout on a 269-node
subtree, i.e. nothing. Any "it feels slow" here is the curve, not the work.
Keep it on `var(--ease-out)` (`cubic-bezier(0.22, 1, 0.36, 1)`), which leaves
at full speed and decelerates into place.

### 11. Third-party embeds are facades until clicked

`youtube-embed.tsx` renders a thumbnail and a play button. The `<iframe>` is
created on the first click, and only then.

The player used to be mounted for every video slide as soon as the CTF section
rendered. Each one pulls YouTube's iframe API and a full embedded player -
hundreds of kilobytes of third-party JavaScript, several network round trips
and a live iframe with its own event loop - for a slide most readers scroll
straight past. There are two of them.

Consequences to preserve:

- The embed host is `youtube-nocookie.com`, and nothing contacts Google until
  the reader asks for the video (the thumbnail is `loading="lazy"`).
- `enablejsapi=1` plus the `origin` parameter is what lets the carousel pause
  a playing video by `postMessage` when the reader swipes away. Both are
  required; dropping either silently breaks the pause.
- There is no `react-youtube` dependency any more. Don't add one back for
  this - the wrapper was ~35 KB to do what four lines of `postMessage` do.

Apply the same shape to any embed added later (maps, gists, tweets).

### 12. Motion is CSS; there is no animation library

Every entrance, transition and decorative loop on the site is a CSS
transition or keyframe. Framer Motion used to drive all of it and was removed.
Two reasons:

- **Per frame.** A JS animation library computes values on the main thread and
  writes inline styles every frame. CSS transitions on `opacity` and
  `transform` run on the compositor, so they stay smooth while the main thread
  is busy - which on a phone it usually is.
- **Per byte.** It was ~130 KB in the first load of *every* page, for effects
  the browser performs natively.

The pieces, all in the MOTION section of `globals.css`:

| Class | For |
| --- | --- |
| `.reveal` | scroll entrance; `--rv-x/y/scale/delay` |
| `.reveal-group` / `.reveal-item` | staggered list; `--rv-stagger`, `--rv-i` |
| `.enter` | load-time entrance, hero only |
| `.rail` | the work timeline's rail |

The trigger is `use-in-view.ts`: **one** IntersectionObserver for the whole
site, whose callback only adds a class. It never sets React state, so
scrolling the page never renders a component. A group is observed as a single
target rather than one per card.

Two rules that are easy to break:

- **The hidden states are gated on `html.js`**, which the inline boot script
  adds before first paint. Without it a client that does not run JS gets a
  wall of `opacity: 0`. This is also why the exported HTML now contains no
  hidden content at all - keep it that way.
- **Tailwind v4 compiles `translate-*`, `scale-*` and `rotate-*` to the
  standalone `translate` / `scale` / `rotate` properties, not to `transform`.**
  So a hand-written `transition-[...]` list must name `translate`, not
  `transform`, or the utility simply will not animate. (This is also why
  `.rail`'s `transform: scaleY()` composes cleanly with `-translate-x-1/2`.)

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
- **No JS animation library.** See note 12. This also resolved the old
  "rendered content" audit finding: the exported HTML no longer contains a
  single `opacity: 0` block, because the hidden state is gated on `html.js`
  and applied before first paint rather than baked into the markup.

---

## Deployment

`main` auto-deploys to GitHub Pages via `.github/workflows/pages.yml`.
Pushing to `main` publishes. Commit and push only when explicitly asked.
