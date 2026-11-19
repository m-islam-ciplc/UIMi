# Classic neumorphism (soft UI) dual box-shadow buttons

## What is the canonical box-shadow pattern for raised vs inset neumorphic elements?

### Takeaway
Raised neumorphism is almost always two matching outer `box-shadow` layers—dark at positive offsets (bottom-right) and light at negative offsets (top-left)—on a shared surface color; inset/pressed neumorphism reuses the same pair with the `inset` keyword on both layers.

### Cited Findings
- CSS-Tricks defines the technique as multiple shadows plus matching backgrounds: “a core part of neumorphic elements is the use of two shadows: a light shadow and a dark shadow” for the raised look; `inset` moves those shadows inside so the element reads as pressed into the surface. — [CSS-Tricks: Neumorphism and CSS (Adrian Bece, Mar 2020)](https://css-tricks.com/neumorphism-and-css/)
- Smashing Magazine restates the same mechanism when contrasting later claymorphism: extrusion comes from “a light and a dark shadow” with element background matching the parent. — [Smashing Magazine: Claymorphism (Adrian Bece, Mar 2022)](https://www.smashingmagazine.com/2022/03/claymorphism-css-ui-design-trend/)
- Canonical raised pattern in tutorials (top-left light source): dark shadow `+offset +offset blur darkColor`, light highlight `-offset -offset blur lightColor`. Example: `box-shadow: 8px 8px 16px #b8bec9, -8px -8px 16px #ffffff;` — [Vinish.Dev: Neumorphism with Pure CSS](https://vinish.dev/add-neumorphism-effect-pure-css); same structure with `#bebebe` / `#ffffff` — [Frontend Hero: Neumorphism Buttons](https://frontend-hero.com/how-to-make-neumorphism-button)
- Canonical inset/pressed pattern: prefix both layers with `inset`, keeping opposing offsets: `box-shadow: inset 8px 8px 16px #b8bec9, inset -8px -8px 16px #ffffff;` — [Vinish.Dev](https://vinish.dev/add-neumorphism-effect-pure-css); smaller inset for `:active`: `inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff` — [Frontend Hero](https://frontend-hero.com/how-to-make-neumorphism-button)
- Light-source convention: assume light from top-left; dark cast shadow goes down-right (positive X/Y); highlight goes up-left (negative X/Y). CSS-Tricks also documents four light-source variants by swapping which offset pair is positive vs negative. — [CSS-Tricks](https://css-tricks.com/neumorphism-and-css/); [Vinish.Dev](https://vinish.dev/add-neumorphism-effect-pure-css); [Frontend Hero](https://frontend-hero.com/how-to-make-neumorphism-button)
- Shadow order in declarations varies (dark-first vs light-first) but both layers are required; e.g. CSS-Tricks uses abstract `var(--color-dark)` then `var(--color-light)`, while some demos list light first: `-6px -6px 12px #fff, 6px 6px 12px #c8ccd4`. — [CSS-Tricks](https://css-tricks.com/neumorphism-and-css/); [Design for AI neumorphic buttons](https://designforai.dev/buttons/neumorphic)
- Optional convex/concave surfaces keep the same dual outer shadows and add a subtle `linear-gradient` aligned or reversed vs the light source (e.g. convex `linear-gradient(145deg, #f0f0f0, #cacaca)`). — [Frontend Hero](https://frontend-hero.com/how-to-make-neumorphism-button); [CSS-Tricks](https://css-tricks.com/neumorphism-and-css/)
- Inputs/fields are often coded as permanently inset (not raised): `box-shadow: inset 6px 6px 10px #a3b1c6, inset -6px -6px 10px #ffffff` — [DEV.to: Joan Peramás](https://dev.to/joanperamas/neumorphism-what-it-is-and-css-examples-l04); similar inset field recipe — [Vinish.Dev](https://vinish.dev/add-neumorphism-effect-pure-css)

### Inferences
- The “classic” button recipe is: raised = two outer opposing shadows; pressed = those same two shadows with `inset`. No third outer shadow is required for classic soft UI (that three-shadow pattern belongs more to claymorphism).
- Positive vertical offset means downward in actual CSS/`box-shadow` usage across recipes, even though CSS-Tricks’ prose briefly misstates vertical offset direction; all concrete snippets place the dark cast shadow at `+Y`.

### Gaps
- No single W3C/MDN “neumorphism” spec exists; the pattern is community convention from ~2019–2024 tutorials and generators (e.g. neumorphism.io referenced by CSS-Tricks/DEV), not a standards document.
- A minority of demos reverse inset offset signs or flip highlight/dark placement for “pressed”; majority keep the same offset signs and only add `inset`.

## Why must background color match the parent surface?

### Takeaway
The soft-UI illusion is that the control is molded from the same material as the page; if the element fill differs from the parent, dual shadows read as ordinary drop shadows on a floating chip instead of extrusion from the surface.

### Cited Findings
- CSS-Tricks comparison table: Material allows different element backgrounds; neumorphism requires “Background colors must be the same (or very similar) as the background color of the parent element.” — [CSS-Tricks](https://css-tricks.com/neumorphism-and-css/)
- CSS-Tricks elaborates that solid matching backgrounds create a flat extruded surface, and that background constraints make primary CTAs hard because you cannot recolor the button independently of the page. — [CSS-Tricks](https://css-tricks.com/neumorphism-and-css/)
- Smashing Magazine: extrusion is achieved with light+dark shadows “and a background color that needs to be the same as the color of the element behind it.” That matching requirement is called out as a major drawback vs claymorphism. — [Smashing Magazine](https://www.smashingmagazine.com/2022/03/claymorphism-css-ui-design-trend/)
- Frontend Hero FAQ: “If the button and background colors differ, the shadows won't create the characteristic 'extruded' or 'pressed' look.” Practical step 1 is always set button `background` equal to container. — [Frontend Hero](https://frontend-hero.com/how-to-make-neumorphism-button)
- Vinish.Dev lists “Same background color on the page and on the component” as one of three required ingredients alongside dual shadows and rounded corners. — [Vinish.Dev](https://vinish.dev/add-neumorphism-effect-pure-css)
- DEV.to button example hard-codes `background: #e0e0e0` with comment “Same as body color” while `body { background-color: #e0e0e0 }`. — [DEV.to: Joan Peramás](https://dev.to/joanperamas/neumorphism-what-it-is-and-css-examples-l04)
- Accessibility consequence of matching fills: soft shadows alone often fail non-text contrast; CSS-Tricks and later pieces warn that contrast checkers ignore shadows and edges can disappear. — [CSS-Tricks](https://css-tricks.com/neumorphism-and-css/); [Xerobit neumorphism CSS](https://xerobit.dev/blog/neumorphism-css/)
- Base should not sit at pure white/black extremes so light and dark shadows have room to differ; LogRocket lists “Make sure the background is never fully white or black.” — [LogRocket: Understanding neumorphism in CSS (Jan 2023)](https://blog.logrocket.com/understanding-neumorphism-css/); CSS-Tricks similarly warns against RGB extremes. — [CSS-Tricks](https://css-tricks.com/neumorphism-and-css/)

### Inferences
- Matching background is a mechanical requirement of the illusion, not just an aesthetic preference: without it, you lose the “same material / extruded” reading that distinguishes soft UI from Material-style elevation.
- Practical coding pattern is one shared token (`--bg` / `--neu-background-color`) applied to `body`/`container` and the button.

### Gaps
- Sources say “same or very similar” but rarely quantify how close (ΔE / luminance delta) is still acceptable before the effect breaks.

## Typical offset, blur, and color values people use?

### Takeaway
Most button recipes use equal X/Y offsets in the ~3–12px range with blur ≈ 1.5–2× the offset, mid-gray bases around `#e0e0e0`–`#e0e5ec`, near-white highlights, and darker gray (or semi-transparent cool gray) shadows; radius is usually soft (≈10–20px for buttons, larger for cards).

### Cited Findings
- Common raised triples (offset / blur / colors):
  - `8px 8px 16px #bebebe, -8px -8px 16px #ffffff` on `#e0e0e0` — [Frontend Hero](https://frontend-hero.com/how-to-make-neumorphism-button)
  - `8px 8px 16px #b8bec9, -8px -8px 16px #ffffff` on `#e6e9ef` — [Vinish.Dev](https://vinish.dev/add-neumorphism-effect-pure-css)
  - `8px 8px 15px #a3b1c6, -8px -8px 15px #ffffff` on `#e0e0e0` — [DEV.to: Joan Peramás](https://dev.to/joanperamas/neumorphism-what-it-is-and-css-examples-l04)
  - `6px 6px 12px #b8b9be, -6px -6px 12px #ffffff` on `#e0e5ec` — [FreeCsStyles neumorphism button](https://freecsstyles.com/design/neumorphism-button)
  - `8px 8px 16px var(--lo), -8px -8px 16px var(--hi)` with `--bg:#e0e5ec; --hi:#ffffff; --lo:#b3b7bd` — [Xerobit](https://xerobit.dev/blog/neumorphism-css/)
  - Smaller: `-3px -3px 7px #ffffffb2, 3px 3px 7px rgba(94, 104, 121, 0.945)` — [LogRocket](https://blog.logrocket.com/understanding-neumorphism-css/)
  - Larger surface demo: `-12px -12px 24px rgba(255,255,255,0.9), 12px 12px 24px rgba(163,177,198,0.6)` with `border-radius: 32px` — [Box Shadow Generator neumorphism example](https://boxshadowgenerator.co.uk/examples/neumorphism/)
- Vinish.Dev tuning advice: if too strong, drop to `6px 6px 12px`; if flat, raise to `10px 10px 20px`. — [Vinish.Dev](https://vinish.dev/add-neumorphism-effect-pure-css)
- CSS-Tricks: keep shadows “soft and low contrast”; scale offset/blur/opacity to element size and desired intensity. — [CSS-Tricks](https://css-tricks.com/neumorphism-and-css/)
- Border-radius norms: Frontend Hero recommends **10–20px** for buttons (example `12px`); Vinish uses `--radius: 16px` for surfaces and `12px` for buttons; CSS-Tricks lists rounded edges as a defining quality; card demos often use `15–32px`. — [Frontend Hero](https://frontend-hero.com/how-to-make-neumorphism-button); [Vinish.Dev](https://vinish.dev/add-neumorphism-effect-pure-css); [CSS-Tricks](https://css-tricks.com/neumorphism-and-css/); [DEV.to](https://dev.to/joanperamas/neumorphism-what-it-is-and-css-examples-l04)
- Borders: usually `border: none` on buttons; optional subtle border for edge crispness / contrast (e.g. `1px solid #ffffff40`, or accessibility-focused solid edges). — [Frontend Hero](https://frontend-hero.com/how-to-make-neumorphism-button); [Vinish.Dev](https://vinish.dev/add-neumorphism-effect-pure-css); [CSS-Tricks](https://css-tricks.com/neumorphism-and-css/); [Xerobit](https://xerobit.dev/blog/neumorphism-css/)
- Dark theme value example: base `#2d2d2d`, dark shadow `#262626`, light highlight `#343434` — [Frontend Hero](https://frontend-hero.com/how-to-make-neumorphism-button); Xerobit dark: `--bg:#2a2d35; --hi:#393c43; --lo:#17191d` — [Xerobit](https://xerobit.dev/blog/neumorphism-css/)
- Shadow colors are derived from the base (lighter and darker relatives), not arbitrary unrelated hues. — [Vinish.Dev](https://vinish.dev/add-neumorphism-effect-pure-css); [Frontend Hero](https://frontend-hero.com/how-to-make-neumorphism-button)

### Inferences
- A practical “default button” starting point across sources is roughly: base `#e0e5ec` / `#e0e0e0`, offset `6–8px`, blur `12–16px`, radius `12px`, dark ≈ `#b8b9be`–`#a3b1c6` or `#bebebe`, light `#ffffff` (or soft white rgba).
- Blur commonly ≈ 2× offset when offsets are equal on both axes.

### Gaps
- Few sources publish measured contrast ratios for shadow-only edges; Xerobit is an outlier with measured border ratios for accessibility fixes.
- Spread radius is usually omitted (0); recipes that mention spread are uncommon for classic soft UI buttons.

## How are hover/active/pressed states coded?

### Takeaway
Pressed is coded by switching to dual `inset` shadows (usually on `:active`); hover typically stays raised but scales offset/blur up or down; transitions are short (~0.15–0.3s), and animating outer→inset cleanly often needs matching layer counts (including transparent placeholders).

### Cited Findings
- Pressed on `:active` with inset pair (smaller offsets than rest): Frontend Hero and FreeCsStyles both use `inset 4px 4px 8px …, inset -4px -4px 8px …`. — [Frontend Hero](https://frontend-hero.com/how-to-make-neumorphism-button); [FreeCsStyles](https://freecsstyles.com/design/neumorphism-button)
- Vinish buttons: raised `6px 6px 12px` / `-6px -6px 12px`; `:active` becomes inset with same distances plus optional `transform: translateY(1px)`. — [Vinish.Dev](https://vinish.dev/add-neumorphism-effect-pure-css)
- Quackit template: `:active` applies `inset` to both shadows at the same `--neu-shadow-offset`; adds `:focus-visible { outline: 2px solid …; outline-offset: 4px }`. — [Quackit Neumorphic Button](https://www.quackit.com/html/templates/buttons/neumorphic_button.cfm)
- Hover while remaining raised (reduce depth): DEV.to reduces `8px/15px` → `4px/10px` on `:hover`; Frontend Hero reduces `8px/16px` → `6px/12px` on `:hover`. — [DEV.to](https://dev.to/joanperamas/neumorphism-what-it-is-and-css-examples-l04); [Frontend Hero](https://frontend-hero.com/how-to-make-neumorphism-button)
- Hover that increases depth: FreeCsStyles raises `6px/12px` → `8px/16px` on `:hover`. — [FreeCsStyles](https://freecsstyles.com/design/neumorphism-button)
- Alternate pattern: LogRocket applies the inset “pushed” effect on `:hover` instead of `:active` (`inset -3px -3px …, inset 3px 3px …`). — [LogRocket](https://blog.logrocket.com/understanding-neumorphism-css/)
- Toggle/checked states often mirror pressed by flipping a track to inset when on: `input:checked + label { box-shadow: inset 6px 6px 12px … }` — [DEV.to](https://dev.to/joanperamas/neumorphism-what-it-is-and-css-examples-l04)
- Transition caveat: switching between two outer layers and two inset layers does not interpolate smoothly; Xerobit documents keeping **four layers** in both states (outer pair + inset pair, unused pair transparent) so `transition: box-shadow` blends. Example rest state includes `inset 0 0 0 transparent` placeholders; `:active` zeroes outer layers and activates inset pair. — [Xerobit](https://xerobit.dev/blog/neumorphism-css/)
- Typical timing: `transition: all 0.2s ease` / `box-shadow 0.15s ease` / `all 0.3s ease`. — [Frontend Hero](https://frontend-hero.com/how-to-make-neumorphism-button); [Vinish.Dev](https://vinish.dev/add-neumorphism-effect-pure-css); [DEV.to](https://dev.to/joanperamas/neumorphism-what-it-is-and-css-examples-l04)
- Accessibility state advice: keep a visible focus ring separate from soft shadows; CSS-Tricks notes interactive/validation states are hard to express with soft UI alone. — [CSS-Tricks](https://css-tricks.com/neumorphism-and-css/); [Quackit](https://www.quackit.com/html/templates/buttons/neumorphic_button.cfm); [Neumo UI accessibility notes citing CSS-Tricks](https://neumoui.com/do-it-accessibly.html)

### Inferences
- Community default for buttons: **raised rest → softer or stronger raised hover → inset `:active`**. Using inset on hover (LogRocket) is a minority teaching choice.
- For production-feel press animation, prefer the four-layer transparent-placeholder trick if you need `transition: box-shadow` between raised and inset.

### Gaps
- No broad consensus on whether hover should deepen or soften the raised shadow; both appear frequently.
- Few recipes document `:disabled` neumorphic styling in detail.

## What CSS custom properties / variables do common recipes use?

### Takeaway
Recipes commonly tokenise surface fill, light shadow, dark shadow, text, radius, and sometimes offset/blur; dark mode is done by redefining those tokens; a few templates also expose focus/edge colors and use `calc()` to negate offset for the highlight side.

### Cited Findings
- CSS-Tricks abstract shadow variables for light-source math: `--h1`, `--v1`, `--blur1`, `--color-dark`, `--h2`, `--v2`, `--blur2`, `--color-light`, plus gradient tokens `--bg-angle`, `--bg-start`, `--bg-end`. — [CSS-Tricks](https://css-tricks.com/neumorphism-and-css/)
- Vinish.Dev core set: `--bg`, `--shadow`, `--highlight`, `--text`, `--radius` (demo also `--muted`, `--gap`). Raised uses `var(--shadow)` / `var(--highlight)`; theme switch reassigns `--bg/--shadow/--highlight/--text`. — [Vinish.Dev](https://vinish.dev/add-neumorphism-effect-pure-css)
- Xerobit: `--bg`, `--hi`, `--lo` (plus `--edge`, `--ink`, `--focus` for accessible borders/focus). Dark scheme overrides the same names under `prefers-color-scheme: dark`. — [Xerobit](https://xerobit.dev/blog/neumorphism-css/)
- Quackit button tokens: `--neu-background-color`, `--neu-text-color`, `--neu-text-color-active`, `--neu-shadow-offset`, `--neu-light-shadow-color`, `--neu-dark-shadow-color`, `--neu-focus-outline`; highlight offset via `calc(-1 * var(--neu-shadow-offset))`, blur via `calc(var(--neu-shadow-offset) * 2)`. — [Quackit](https://www.quackit.com/html/templates/buttons/neumorphic_button.cfm)
- “How To Learn” / Mastering Neumorphism recipe: `--bg-color`, `--light-shadow`, `--dark-shadow`, `--text-color`, `--shadow-distance`, `--shadow-blur` with `calc(var(--shadow-distance) * -1)` for the light side; dark mode redefines the color tokens. — [Mastering Neumorphism in CSS](https://learnhowto.vercel.app/blog/css/mastering-neumorphism-in-css-a-deep-dive-into-soft-ui-design)
- ICS Creative button recipe uses component-scoped custom props: `--button-color`, `--button-surface`, `--button-surface-active`, `--button-shadow-highlight`, with dark shadow as `rgb(0 0 0 / 24%)` and a simpler single inset on active. — [ics-creative neumorphic.html](https://github.com/ics-creative/230629_css-button-recipes/blob/main/docs/neumorphic.html)
- Smashing Magazine’s related clay utility (not classic dual-outer soft UI, but same author lineage) shows the variable pattern for shadow recipes: `--clay-background`, `--clay-border-radius`, `--clay-shadow-outset`, `--clay-shadow-inset-primary`, `--clay-shadow-inset-secondary`. Useful as contrast: clay uses **one outer + two inset**, not two outer. — [Smashing Magazine](https://www.smashingmagazine.com/2022/03/claymorphism-css-ui-design-trend/)

### Inferences
- Most reusable classic soft-UI systems need at least: surface (`--bg`), highlight (`--hi`/`--light-shadow`), shade (`--lo`/`--dark-shadow`), and either fixed px shadows or `--distance` + `--blur`.
- Naming is inconsistent (`--shadow` vs `--lo` vs `--neu-dark-shadow-color`), but the roles map 1:1 across tutorials.

### Gaps
- No shared community naming standard or official design-token taxonomy for neumorphism.
- Generators (e.g. neumorphism.io cited by CSS-Tricks/DEV) are widely used, but this research did not capture a single exported variable schema from the generator itself beyond what articles reproduce.

## Composite reference snippets (sourced patterns)

### Raised button (canonical shape)
```css
/* Pattern synthesized from Frontend Hero + Vinish + DEV examples */
.neu-button {
  background: #e0e0e0; /* must match parent/page */
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  box-shadow:
    8px 8px 16px #bebebe,   /* dark, bottom-right */
    -8px -8px 16px #ffffff; /* light, top-left */
  transition: box-shadow 0.2s ease;
}
```
Sources: [Frontend Hero](https://frontend-hero.com/how-to-make-neumorphism-button), [Vinish.Dev](https://vinish.dev/add-neumorphism-effect-pure-css), [DEV.to](https://dev.to/joanperamas/neumorphism-what-it-is-and-css-examples-l04)

### Pressed / active
```css
.neu-button:active {
  box-shadow:
    inset 4px 4px 8px #bebebe,
    inset -4px -4px 8px #ffffff;
}
```
Sources: [Frontend Hero](https://frontend-hero.com/how-to-make-neumorphism-button), [FreeCsStyles](https://freecsstyles.com/design/neumorphism-button)

### Variable-driven recipe
```css
:root {
  --bg: #e6e9ef;
  --shadow: #b8bec9;
  --highlight: #ffffff;
  --text: #1f2937;
  --radius: 16px;
}
.neo {
  background: var(--bg);
  color: var(--text);
  border-radius: var(--radius);
  box-shadow:
    8px 8px 16px var(--shadow),
    -8px -8px 16px var(--highlight);
}
.neo--pressed {
  box-shadow:
    inset 8px 8px 16px var(--shadow),
    inset -8px -8px 16px var(--highlight);
}
```
Source: [Vinish.Dev](https://vinish.dev/add-neumorphism-effect-pure-css)
