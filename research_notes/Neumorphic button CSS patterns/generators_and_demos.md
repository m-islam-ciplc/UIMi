# Neumorphic button CSS patterns — generators and demos

## What does neumorphism.io (and clones) emit for a raised button?

### Takeaway
Raised (flat) output is always the same three properties: `border-radius`, a solid (or optional gradient) `background` matching the page, and a dual `box-shadow` (dark offset + light opposite offset). Pressed flips both shadows to `inset`; concave/convex keep those shadows and add a `linear-gradient` fill.

### Cited Findings
- neumorphism.io default raised emission (Size 300, Radius 50, Distance 20, Intensity 0.15, Blur 60, color `#e0e0e0`):

```css
border-radius: 50px;
background: #e0e0e0;
box-shadow:  20px 20px 60px #bebebe,
             -20px -20px 60px #ffffff;
```

— [neumorphism.io](https://neumorphism.io/); confirmed in source [Configuration.js](https://raw.githubusercontent.com/adamgiebl/neumorphism/master/src/Configuration.js)
- Code string assembly in the official repo: `darkColor = colorLuminance(color, intensity * -1)`, `lightColor = colorLuminance(color, intensity)`, then `box-shadow: ${positionX}px ${positionY}px ${blur}px ${darkColor}, ${-positionX}px ${-positionY}px ${blur}px ${lightColor}` (with optional `inset` prefix when shape is pressed). — [adamgiebl/neumorphism Configuration.js](https://raw.githubusercontent.com/adamgiebl/neumorphism/master/src/Configuration.js)
- Default light source (case 1): `positionX = distance`, `positionY = distance`, gradient `angle = 145` — so raised shadows go down-right (dark) and up-left (light). — [Configuration.js](https://raw.githubusercontent.com/adamgiebl/neumorphism/master/src/Configuration.js)
- Shape modes in the same generator: shape `1` = pressed (`inset` on both shadows); shapes `2`/`3` enable gradient fills (concave/convex) while leaving dual outer shadows unchanged; pressed disables the gradient path. — [Configuration.js](https://raw.githubusercontent.com/adamgiebl/neumorphism/master/src/Configuration.js)
- Convex/concave gradient colors use fixed luminance deltas (±0.07 / ±0.1), not the Intensity slider: e.g. convex uses `linear-gradient(angle, darkened, lightened)`. — [Configuration.js](https://raw.githubusercontent.com/adamgiebl/neumorphism/master/src/Configuration.js)
- Tezmy Tools clone default raised output uses class `.neumorphic` and the same dual-shadow pattern on `#e0e5ec`:

```css
.neumorphic {
  width: 220px;
  height: 220px;
  border-radius: 40px;
  background: #e0e5ec;
  box-shadow: 14px 14px 28px #bec3c9, -14px -14px 28px #e5e9ef;
}
```

— [Tezmy Neumorphism Generator](https://tezmytools.com/neumorphism-generator)
- Alion Tech Studio clone documents the same four styles (Flat / Pressed / Concave / Convex), emits plain CSS with baked `rgb()` shadows, or CSS variables (`--nm-surface`, `--nm-shadow`, `--nm-highlight`, `--nm-x`, `--nm-y`, `--nm-blur`), or Tailwind arbitrary shadow classes. — [Alion neumorphism generator](https://tools.aliontechstudio.com/neumorphism-generator/)
- Optional hover/active emission (Alion): `:hover` at **1.3×** distance/depth; `:active` flips to `inset`; plus a `transition`. — [Alion neumorphism generator](https://tools.aliontechstudio.com/neumorphism-generator/)
- Themesberg Neumorphism UI (production kit, not a slider tool) hard-codes raised soft shadows as SCSS tokens rather than generating per-control:

```scss
$box-shadow-soft: 6px 6px 12px #b8b9be, -6px -6px 12px #ffffff;
$box-shadow-light: 3px 3px 6px #b8b9be, -3px -3px 6px #ffffff;
$shadow-inset: inset 2px 2px 5px #b8b9be, inset -3px -3px 7px #FFFFFF;
```

Primary surface color is soft gray `#e6e7ee` (not a saturated brand fill). — [themesberg neumorphism `_variables.scss`](https://github.com/themesberg/neumorphism-ui-bootstrap/blob/d17658d0fea92c140b508088f1fca8a50afdd7c4/src/scss/neumorphism/_variables.scss)

### Inferences
- A “raised button” in generator terms is just a smaller instance of the flat shape: same dual outer shadows, radius typically 8–50px, distance scaled down from the 300px demo defaults.
- Generators do not emit button-specific selectors (`button`, `:hover` by default on neumorphism.io); consumers copy the three declarations onto their own button rule.
- Opaque derived hex/rgb shadow colors (not `rgba(0,0,0,.2)`) are the canonical generator choice; the author of neumorphism.io explicitly preferred calculated opaque shadows over alpha shadows. — [GitHub issue #5](https://github.com/adamgiebl/neumorphism/issues/5)

### Gaps
- neumorphism.io’s live ShapeSwitcher UI markup did not expose shape labels in the fetched raw file (icons only); shape IDs 0–3 are inferred from Configuration.js logic, not from labeled HTML in that fetch.
- Werkly and some other clones advertise the same controls but their exact emitted CSS snippets were not captured beyond feature descriptions.


## What size/distance/intensity/blur parameters map to which CSS values?

### Takeaway
On neumorphism.io, Distance → shadow X/Y offsets (px); Blur → blur radius (px); Intensity → luminance factor for dark/light shadow hex; Size mainly drives geometry and auto-scales Distance/Blur; Radius → `border-radius` (or `50%` at max). Blur is linked to Distance at **2×** by default.

### Cited Findings
- **Distance → CSS offsets:** `positionX`/`positionY` = ±`distance` px (sign from light-source quadrant). Both shadows share the same blur. — [Configuration.js](https://raw.githubusercontent.com/adamgiebl/neumorphism/master/src/Configuration.js)
- **Blur → CSS blur:** written literally as `${blur}px` in both shadow layers. Changing Distance auto-sets `blur = distance * 2`. — [Configuration.js](https://raw.githubusercontent.com/adamgiebl/neumorphism/master/src/Configuration.js)
- **Size coupling:** changing Size sets `distance = round(size * 0.1)` and `blur = round(size * 0.2)` (again blur = 2× distance). Desktop default size 300 ⇒ distance 20, blur 60. — [Configuration.js](https://raw.githubusercontent.com/adamgiebl/neumorphism/master/src/Configuration.js); [utils.js getSizes](https://raw.githubusercontent.com/adamgiebl/neumorphism/master/src/utils.js)
- **Intensity → shadow colors** via `colorLuminance(hex, lum)`:

```js
c = Math.round(Math.min(Math.max(0, c + c * lum), 255))
```

Dark shadow uses `lum = -intensity`; light uses `+intensity`. Default intensity `0.15` on `#e0e0e0` ⇒ dark `#bebebe`, light `#ffffff` (channels clamp at 255). — [utils.js](https://raw.githubusercontent.com/adamgiebl/neumorphism/master/src/utils.js); live defaults on [neumorphism.io](https://neumorphism.io/)
- Intensity slider range on neumorphism.io: `0.01`–`0.6`, step `0.01`. — [Configuration.js](https://raw.githubusercontent.com/adamgiebl/neumorphism/master/src/Configuration.js)
- **Radius → `border-radius`:** `${radius}px`, or `50%` when radius equals `maxRadius` (half of size). — [Configuration.js](https://raw.githubusercontent.com/adamgiebl/neumorphism/master/src/Configuration.js)
- Alion clone documents the control→CSS table explicitly: Distance 0–60px → shadow offset along light axis; Blur 0–120px → shared blur (linked at 2× Distance); Intensity 2–40% → how far derived colors travel from surface; Style Pressed prefixes `inset`; Concave/Convex add gradient at **half** intensity. — [Alion neumorphism generator](https://tools.aliontechstudio.com/neumorphism-generator/)
- Alion shadow color math (clone, not identical to neumorphism.io): dark = RGB × `(1 − intensity/100)`; light = channel moves `intensity/100` of remaining distance to 255. At `#e0e5ec` / 15%: highlight `rgb(229,233,239)`, shadow `rgb(190,195,201)`. — [Alion neumorphism generator](https://tools.aliontechstudio.com/neumorphism-generator/)
- Tezmy tuning guidance for buttons: Distance **8–16 px**; cards **≥20 px**; strength **10–20%**; blur typically kept at ~2× distance (defaults: distance 14, blur 28, strength 15%). — [Tezmy Neumorphism Generator](https://tezmytools.com/neumorphism-generator)
- Scaling example: for a ~60px control under neumorphism.io’s size rule, expected distance ≈ 6px, blur ≈ 12px — close to Themesberg’s `$box-shadow-soft` / `$box-shadow-light` (6/12 and 3/6). — inferred from [Configuration.js](https://raw.githubusercontent.com/adamgiebl/neumorphism/master/src/Configuration.js) + [Themesberg variables](https://github.com/themesberg/neumorphism-ui-bootstrap/blob/d17658d0fea92c140b508088f1fca8a50afdd7c4/src/scss/neumorphism/_variables.scss)

| Parameter (neumorphism.io) | CSS mapping | Default |
| --- | --- | --- |
| Color | `background` (+ gradient stops if concave/convex) | `#e0e0e0` |
| Size | preview `width`/`height` CSS vars; auto distance/blur | `300` |
| Radius | `border-radius` | `50` → `50px` |
| Distance | shadow X/Y offsets | `20` → `20px` |
| Blur | shadow blur | `60` → `60px` (= 2× distance) |
| Intensity | luminance factor for shadow hex | `0.15` |
| Shape pressed | both shadows prefixed `inset` | off |
| Light source | signs of X/Y (+ gradient angle) | bottom-right dark |

### Inferences
- The industry “soft UI” rule of thumb **blur ≈ 2 × distance** comes directly from neumorphism.io’s linked sliders and is copied by Tezmy/Alion.
- Intensity on neumorphism.io is a **relative** channel scale (`c + c*lum`), so the same 0.15 yields different absolute RGB deltas on different base colors; Alion’s multiply/lerp formula is a clone variant, not the same algorithm.
- Button-scale raised CSS in kits clusters around **3–6px offset / 6–12px blur**, not the generator’s 20/60 demo values.

### Gaps
- No official neumorphism.io documentation page explaining Intensity as a percentage of channel value; mapping is from source code only.
- Exact live default CSS for Alion’s “Hover & active” tick was described in prose but not captured as a full copied snippet from a live export.


## What do popular CodePen soft-UI login/signup demos use for social buttons vs primary CTAs?

### Takeaway
Login demos split into three CTA patterns: (A) pure soft raised CTA matching the form surface, (B) **colored fill + gray dual shadows** (breaks monochrome neumorphism), (C) brand-flat social buttons with **no** soft shadows. Social controls are rarely pure soft-UI fills; brand color usually lands on icons or flat backgrounds.

### Cited Findings
- **Pure soft primary CTA** (widely forked Foolish Developer / `@fghty` family) — same `#dde1e7` as page; raised dual shadow; hover → inset:

```css
form button{
  background: #dde1e7;
  box-shadow: -3px -3px 7px #fffdfdb7,
              2px 2px 5px rgba(94, 104, 121, 0.288);
}
button:hover{
  box-shadow: inset 2px 2px 5px #babecc,
              inset -5px -5px 10px #ffffff73;
}
```

— [CodePen Neumorphism login form 3 (fghty/VwbgmBm)](https://codepen.io/fghty/pen/VwbgmBm); mirrored on [Learn With Arshyan](https://learnwitharshyan.com/neumorphism-login-signup-form-html-css-js/)
- Same family’s **social buttons break pure neumorphism** with flat brand fills and **no** dual soft shadows:

```css
.facebook { background: #3b5998; color: #fff; }
.google   { background: #db4437; color: #fff; }
```

— [Learn With Arshyan login/signup](https://learnwitharshyan.com/neumorphism-login-signup-form-html-css-js/)
- **Colored primary CTA + soft gray shadows** (breaks same-surface rule; keeps dual shadow for “soft” depth):

```css
.btn {
  background: #40a9c3;
  color: white;
  box-shadow: 5px 5px 15px #a3b1c6, -5px -5px 15px #ffffff;
}
.btn:hover { background: #3a97af; }
```

— [CodePen jerora98/qEbzzMY](https://codepen.io/jerora98/pen/qEbzzMY) (snippet from search/page content)
- Another colored CTA pattern from the Foolish Developer soft login:

```css
.signin-button {
  color:#fff;
  background: #1995c3;
  box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px #ffffff;
}
.signin-button:hover { background:#2f3ddb; }
```

Form shell stays soft (`#ecf0f3` + 13px dual shadows); CTA does not match the surface color. — [CodePen fghty/eYRWjwv](https://codepen.io/fghty/pen/eYRWjwv)
- **Social icon buttons that stay soft:** gray raised chip + brand-colored Font Awesome icons only:

```css
.btn{
  background: #EBECF0;
  box-shadow: -5px -5px 20px #fff, 5px 5px 20px #babecc;
}
.btn:hover{
  box-shadow: inset -2px -2px 4px #fff, inset 2px 2px 4px #babecc;
}
.fa-facebook-f{ color: #5967FF; }
.fa-google{ /* brand icon color */ }
```

— [CodePen Neumorphic Social Media Buttons (shubham-web2144/oNwBEvL)](https://codepen.io/shubham-web2144/pen/oNwBEvL)
- Codeconvey social demo: soft gray `.btn` chips; brand color only on icon `style="color: #3b5998"` etc.; `:active` mixes outer + inset layers. — [Codeconvey neumorphism social buttons](https://codeconvey.com/neumorphism-social-media-button/)
- Icon-toggle soft buttons (not login, but widely cited Soft UI Buttons pen) use CSS variables for outer vs checked inset:

```css
--btnOuterShadow: 4px 2px 16px rgba(136, 165, 191, 0.48), -4px -2px 16px #ffffff;
--btnCheckedInsetShadow: inset 3px 3px 7px rgba(136, 165, 191, 0.48), inset -3px -3px 7px #ffffff;
```

Plus a soft page gradient background — another break from “element === page solid”. — [CodePen MoustafaJazzar/MWWBPQj](https://codepen.io/MoustafaJazzar/pen/MWWBPQj)
- Themesberg kit: primary actions stay on soft gray (`btn-primary` + text color utilities); Pro social buttons use dedicated classes (`btn-facebook`, `btn-twitter`, `btn-github`, …) implying brand fills separate from the soft gray primary surface. — [Themesberg Neumorphism UI Buttons docs](https://themesberg.com/docs/neumorphism-ui/components/buttons/)
- Design-system reference that codifies the hybrid primary: `.neu-button` = surface + dual shadow; `.neu-button-primary` = `background: var(--accent); color: white` while **keeping** the same gray dual shadows. — [wigtn neomorphism.md](https://github.com/wigtn/wigtn-plugins/blob/main/plugins/wigtn-plugins/skills/design-system-reference/styles/neomorphism.md)

### Inferences
- Primary CTAs in soft-UI logins often sacrifice pure neumorphism (colored fill) for discoverability; dual shadows remain gray (not brand-tinted).
- Social buttons either (1) abandon soft shadows for flat brand colors, or (2) keep soft gray chips and color only the icon — almost never brand-colored soft shadows derived like generators do.
- Hover/active convention across demos: raised → inset (or color shift on already-colored CTAs).

### Gaps
- Fork/view counts for individual CodePens were not verified in this pass; “popular” is based on repeated cloning of the Foolish Developer / `#dde1e7` pattern across tutorial sites and CodePen search hits.
- Full CSS for Themesberg `btn-facebook` etc. was not retrieved from compiled CSS (docs show HTML classes only).


## Are there shared class naming or SCSS mixin conventions?

### Takeaway
There is no single community standard. Generators often emit a bare rule or `.neumorphic`; libraries use `neu-*`, `np-*`, Bootstrap `btn-*`, or mixin names like `neumorphism` / `emboss` / `neu`. Shared idea: parameters for base color, height/distance, intensity, and raised vs inset.

### Cited Findings
- Generator class names: Tezmy wraps output in `.neumorphic`. — [Tezmy](https://tezmytools.com/neumorphism-generator). neumorphism.io emits **no class** — only declarations. — [neumorphism.io](https://neumorphism.io/)
- Alion CSS-variable convention: `--nm-surface`, `--nm-shadow`, `--nm-highlight`, `--nm-x`, `--nm-y`, `--nm-blur`. — [Alion generator](https://tools.aliontechstudio.com/neumorphism-generator/)
- Neumorph.scss utility classes: `np-element`, `np-hover`, `np-square-$size`, `np-circle-$size`, `np-form-element`, sizes `sm`–`xxl`. — [Neumorph.scss docs](https://chemaalfonso.github.io/neumorph.scss/)
- Themesberg: Bootstrap-style `btn btn-primary`, `btn-pill`, `btn-icon-only`, plus social `btn-facebook` / `btn-twitter` / `btn-github`; shadow tokens `$box-shadow-soft`, `$box-shadow-light`, `$shadow-inset`. — [Themesberg docs](https://themesberg.com/docs/neumorphism-ui/components/buttons/); [variables](https://github.com/themesberg/neumorphism-ui-bootstrap/blob/d17658d0fea92c140b508088f1fca8a50afdd7c4/src/scss/neumorphism/_variables.scss)
- Reference naming: `.neu-subtle`, `.neu-button`, `.neu-button-primary`. — [wigtn neomorphism.md](https://github.com/wigtn/wigtn-plugins/blob/main/plugins/wigtn-plugins/skills/design-system-reference/styles/neomorphism.md)
- **SCSS mixin — wingleung** (`@mixin neumorphism($background)`): lighten/darken ±4% for gradient fill, ±9% for shadows; fixed `2em` offsets:

```scss
@mixin neumorphism($background) {
  $highlight: lighten($background, 4%);
  $lowlight: darken($background, 4%);
  $shadowhigh: lighten($background, 9%);
  $shadowlow: darken($background, 9%);
  background: linear-gradient(145deg, $highlight, $lowlight);
  box-shadow: 2em 2em 4em $shadowlow, -2em -2em 4em $shadowhigh;
}
```

— [wingleung/neumorphism-sass-mixin](https://raw.githubusercontent.com/wingleung/neumorphism-sass-mixin/master/neumorphic-mixin.scss)
- **SCSS mixin — hollandjake** (`@mixin emboss(...)`): params `$background-color`, `$height`, `$pressure`, `$intensity`, `$direction`; `blur = abs(height) * 2`; negative height ⇒ inset; uses `color.adjust` lightness. — [hollandjake/neumorphism sass/_functions.scss](https://raw.githubusercontent.com/hollandjake/neumorphism/master/sass/_functions.scss)
- **SCSS mixin — TheSonOfThomp gist** (`@mixin neu($baseColor, $height, $intensity, $roundness)`): shadow distance = `abs(height)/2`, blur = `2 * shadowDistance`; negative height → inset; positive roundness → convex gradient, negative → concave. — [gist neuMixin.scss](https://gist.github.com/TheSonOfThomp/cdf0ea316a70bd23b6bef388ab13cb73)
- CodePen demos typically use ad-hoc names: `form button`, `.signin-button`, `.btn`, `.social-login` — not library prefixes. — [fghty/VwbgmBm](https://codepen.io/fghty/pen/VwbgmBm); [fghty/eYRWjwv](https://codepen.io/fghty/pen/eYRWjwv)

### Inferences
- Mixin APIs converge on **(baseColor, distance/height, intensity, raised|inset)** even when names differ (`neumorphism`, `emboss`, `neu`).
- Class prefixes cluster by ecosystem: `np-*` (Neumorph.scss), `neu-*` (generic articles), Bootstrap `btn-*` (Themesberg) — pick one ecosystem rather than mixing.
- Production kits prefer **tokenized shadows** (`$box-shadow-soft`) over regenerating hex pairs per component.

### Gaps
- No evidence of a W3C or major framework standard for neumorphic class names.
- Themesberg’s compiled CSS for social button backgrounds was not fetched; only HTML class names and soft-shadow tokens are sourced.
- Star counts / adoption metrics for the small Sass mixin repos are low; they illustrate convention patterns more than de-facto standards.
