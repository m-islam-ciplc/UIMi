# Web Liquid Glass defaults → CSS-mappable UI kit preset

**Scope note:** All recommended values below are **web approximations** for CSS `backdrop-filter` / `box-shadow` / tint on interactive UI chrome (buttons, cards, panels). They are **not** official Apple constants. Apple publishes qualitative HIG guidance only; no public numeric blur/IOR/tint constants were found.

**Primary measured sources:** [archisvaze/liquid-glass](https://github.com/archisvaze/liquid-glass) (`index.html`, `webgl.html`, `index.css`), live demo [liquidglass.archisvaze.com](https://liquidglass.archisvaze.com/), [chakachuk CodePen QwbaYGO](https://codepen.io/chakachuk/pen/QwbaYGO), [@dpawlikowski/liquid-glass](https://github.com/dpawlikowski/liquid-glass), Apple [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials) / [WWDC25 Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/).

---

## What are the exact default values on liquidglass.archisvaze.com (SVG and WebGL)?

### Takeaway
SVG and WebGL share the same default **card geometry** (300×200, radius 60) and shape presets, but diverge on refraction/look knobs: SVG defaults to thicker glass (80), very low blur (0.3), 6% tint; WebGL defaults to thickness 50, blur 1.5, 8% tint, specular 0.55, shadow 0.5.

### Cited Findings

**Shared shape presets** (both `index.html` and `webgl.html` chip buttons):

| Preset | Width | Height | Radius |
| --- | --- | --- | --- |
| Card (default) | 300 | 200 | 60 |
| Pill | 280 | 80 | 40 |
| Button | 140 | 52 | 26 |
| Circle | 200 | 200 | 100 |

— [archisvaze/liquid-glass `index.html`](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/index.html); [webgl.html](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/webgl.html)

**SVG version defaults** (`index.html` input `value=` attributes + `:root` in `index.css`):

| Control ID | Default | Range | Unit / notes |
| --- | --- | --- | --- |
| `glass-width` | **300** | 60–700 | px |
| `glass-height` | **200** | 40–800 | px |
| `border-radius` | **60** | 20–350 | px |
| `surface-fn` | **convex_squircle** | convex_squircle / lip | height profile for refraction |
| `glass-thickness` | **80** | 10–200 | demo units (lens thickness) |
| `bezel-width` | **60** | 2–60 | px rim width |
| `refractive-index` | **3.0** | 1.0–3.0 step 0.05 | IOR |
| `scale-ratio` | **1.0** | 0–2.0 step 0.05 | multiplies max displacement |
| `blur-amount` | **0.3** | 0–8 step 0.1 | SVG filter blur (not CSS px blur) |
| `specular-opacity` | **0.5** | 0–1 step 0.05 | specular map opacity |
| `specular-saturation` | **4** | 0–12 | specular color saturation |
| `shadow-color` | **#ffffff** | color | inner edge light |
| `shadow-blur` | **20** | 0–40 | px inset shadow blur |
| `shadow-spread` | **-5** | −15–10 | px inset spread |
| `tint-color` | **#ffffff** | color | |
| `tint-opacity` | **6** | 0–40 | % → CSS `0.06` |
| `outer-shadow-blur` | **24** | 0–50 | px; export uses `0 4px 24px rgba(0,0,0,0.18)` |

— [index.html input defaults](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/index.html); [index.css `:root`](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/index.css) (`--tint-opacity: 0.06`, `--shadow-blur: 20px`, `--shadow-spread: -5px`, `--shadow-color: rgba(255,255,255,0.45)`, `--outer-shadow-blur: 24px`, `--glass-radius: 60px`)

**WebGL version defaults** (`webgl.html` `state` object + matching input `value=`):

```js
const state = {
  gw: 300, gh: 200, gr: 60,
  thick: 50, bezel: 60, ior: 3.0,
  blur: 1.5, spec: 0.55, tint: 0.08, shadow: 0.5,
};
```

| Control | Default | Range | Notes |
| --- | --- | --- | --- |
| Width / Height / Radius | 300 / 200 / 60 | 60–700 / 40–800 / 20–350 | same card default |
| Thickness | **50** | 10–200 | lower than SVG’s 80 |
| Bezel | **60** | 2–60 | |
| IOR | **3.0** | 1.0–3.0 | |
| Blur | **1.5** | 0–12 step 0.5 | shader multi-sample radius (not CSS px) |
| Specular | **0.55** | 0–1 | |
| Tint | **8%** → `0.08` | 0–40 | slider stores `/100` |
| Shadow | **0.5** | 0–1 | drop-shadow strength |

— [webgl.html state + inputs](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/webgl.html); also documented in [DeepWiki WebGL page](https://deepwiki.com/archisvaze/liquid-glass/3-webgl-version-(webgl.html)) and [context7 llms.txt](https://context7.com/archisvaze/liquid-glass/llms.txt)

**Caveat on older secondary docs:** Some DeepWiki / early writeups still list SVG noise-turbulence defaults (`--frost-blur: 2px`, `--tint-opacity: 0.4`, `--noise-frequency: 0.008`, `--distortion-strength: 77`). Those match the **older turbulence-based SVG path** (and chakachuk’s filter), **not** the current physics-based SVG `index.html` on main. Prefer the raw HTML `value=` attributes above. — contradicted older table in [DeepWiki SVG page](https://deepwiki.com/archisvaze/liquid-glass/2-svg-version-(index.html)) vs current [index.html](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/index.html)

### Inferences
- The demo’s “Defaults” button resets to HTML `defaultValue` (the `value=` attributes), so these numbers are the intentional author defaults, not just first-paint CSS.
- WebGL thickness 50 vs SVG 80 is an engine calibration difference, not two Apple looks; both keep IOR 3.0 and bezel 60.

### Gaps
- Exact SVG filter markup for `blur-amount` / specular saturation wiring was truncated in the fetched HTML (template string collapsed); numeric defaults are confirmed from inputs, but GLSL/SVG internal scaling of `0.3` blur → screen pixels is not independently re-measured in-browser here.
- Live site may restore `localStorage` (`liquid-glass-settings-svg` / `-webgl`), so a returning visitor may not see factory defaults until clicking **Defaults**.

---

## Which parameters are physics-demo knobs vs Apple-like appearance knobs?

### Takeaway
Thickness, bezel, IOR, scale/surface profile, and displacement strength are **physics/demo refraction knobs**; blur, tint, specular, inner/outer shadow, and radius are the **appearance knobs** that map cleanly to CSS and drive most of the Apple-like read on real UI chrome.

### Cited Findings
- Archis groups controls into **Glass Shape**, **Refraction** (thickness / bezel / IOR [/ scale]), and **Appearance** (blur / specular [/ tint / shadows]) in both demos. — [index.html](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/index.html); [webgl.html](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/webgl.html)
- SVG refraction builds a displacement map from glass thickness, bezel width, surface height function, and IOR (`calculateRefractionProfile` / `generateDisplacementMap`). — [index.html](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/index.html)
- WebGL fragment shader uses `uThickness`, `uBezel`, `uIOR` for edge lensing; `uBlur`, `uSpecular`, `uTint`, `uShadow` for look. — [webgl.html fragment shader](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/webgl.html)
- Apple describes Liquid Glass as **lensing** (bending/concentrating light), multi-layer adaptivity (tint, shadow, dynamic range), and size-adaptive thickness — qualitatively, not as exposed IOR sliders. — [WWDC25 Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/); [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- Pure CSS approximations that feel “glass” without WebGL still center on **blur + saturate + tint + inset specular rim + outer shadow**, with optional SVG displacement. — [chakachuk QwbaYGO](https://codepen.io/chakachuk/pen/QwbaYGO); [dpawlikowski liquid-glass CSS vars](https://github.com/dpawlikowski/liquid-glass)

### Inferences

| Knob | Class | CSS-mappable? | Role |
| --- | --- | --- | --- |
| Thickness | Physics-demo | Weak (proxy via blur + shadow depth) | Edge bend magnitude |
| Bezel | Physics-demo | Weak (proxy via inset highlight width) | Rim width of lens |
| IOR | Physics-demo | No direct CSS | Snell’s-law strength; demo maxes at 3.0 (glass-like exaggeration) |
| Scale / lens / surface fn | Physics-demo | Weak | Displacement gain / profile shape |
| Blur | Appearance | **Yes** `backdrop-filter: blur()` | Frost / soft scatter |
| Specular opacity / sat | Appearance | **Yes** inset `box-shadow` / gradient rim | Lit edge |
| Tint | Appearance | **Yes** `background: rgb(... / α)` | Legibility fill |
| Inner shadow | Appearance | **Yes** inset `box-shadow` | Edge definition |
| Outer shadow | Appearance | **Yes** drop `box-shadow` | Elevation / separation |
| Radius | Shape + appearance | **Yes** `border-radius` | Continuity / pill vs card |

### Gaps
- No Apple-published mapping of “IOR” or “bezel width” to UIKit/SwiftUI APIs; SwiftUI exposes `Glass.regular` / `Glass.clear`, not numeric optics. — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)

---

## What defaults work better for small UI chrome (buttons/cards) vs large panes?

### Takeaway
Apple’s own guidance: **larger glass = thicker material** — deeper shadows, stronger lensing, softer scatter. For web UI kits, use **lighter tint + tighter specular + shallower outer shadow** on buttons; **more blur + slightly higher tint + deeper shadow** on panels/cards — do not copy the free-floating 300×200 demo pane 1:1 onto every control.

### Cited Findings
- WWDC25: when glass morphs to larger sizes (e.g. toolbar button → menu), it simulates a **thicker** material: deeper/richer shadows, more pronounced lensing/refraction, softer light scattering. — [WWDC25 Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/); secondary paraphrase [MobileSyrup](https://mobilesyrup.com/2025/06/10/how-apple-is-making-sure-liquid-glass-as-legible-as-possible/)
- HIG: Liquid Glass is for **controls and navigation floating above content**, not content-layer backgrounds; use **sparingly**; regular vs clear variants for legibility vs media immersion; clear over bright media may need ~**35% dark dimming**. — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- Archis shape presets already size chrome differently: Button 140×52 r26 vs Card 300×200 r60 vs Pill 280×80 r40 — but **do not** change thickness/IOR when switching presets (only w/h/r). — [ui.js `applyPreset`](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/ui.js); [index.html chips](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/index.html)
- Chakachuk separates **container** (300×200, r30) vs **button** (70×70 pill): button uses `rgb(255 255 255 / 10%)` fill + same inset rim; container uses blur(0) + SVG displacement scale 77. — [CodePen QwbaYGO](https://codepen.io/chakachuk/pen/QwbaYGO)
- Firefox Acorn notes Apple’s “Controls” (compact) vs “Standard” (larger/thicker) glass distinction. — [Acorn iOS 26 Liquid Glass](https://acorn.firefox.com/latest/mobile/patterns/i-os-26-and-liquid-glass-w2oH48nk)

### Inferences
- For **buttons / chips**: prefer Archis Button geometry as a size cue; keep refraction subtle or omit (CSS rim + blur 8–12px); tint ~6–10%; outer shadow soft and short.
- For **cards / sheets / side panels**: allow more blur (16–24px+), slightly higher tint if text-heavy (regular-like), deeper outer shadow — mirroring Apple’s “thicker when larger” rule without needing IOR.
- Demo defaults (IOR 3.0, bezel 60 on a 300×200 pane) are tuned for a **hero floating glass**, overfit for dense toolbars if applied unchanged.

### Gaps
- No measured Apple pixel values for button vs sidebar blur radii; size guidance is qualitative only.
- Archis presets do not auto-scale thickness with size, so they are a **shape** reference, not a full Apple size-adaptive material model.

---

## Recommended default set (CSS-mappable UI kit approximation)

### Takeaway
Recommend a dual preset — **Control** (small chrome) and **Panel** (cards/sheets) — anchored to Archis SVG appearance defaults (tint 6%, inner white rim, outer 24px) plus practical CSS blur/saturate from CSS libraries, with physics knobs either omitted or lightly faked. Label: **approximation for web UI kits, not Apple constants**.

### Cited Findings
- Archis SVG export recipe: `box-shadow: 0 4px {outer}px rgba(0,0,0,0.18)`; inset `0 0 {blur}px {spread}px {color}`; `background-color: rgba(tint, opacity)`; `backdrop-filter: url(#filter)`. — [index.html `buildExportCode`](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/index.html)
- Chakachuk button: inset `2px 2px 0 -2px` + `0 0 3px 1px` white 0.7; fill `rgb(255 255 255 / 10%)`; filter displacement scale **77**, turbulence `baseFrequency 0.008`. — [QwbaYGO](https://codepen.io/chakachuk/pen/QwbaYGO)
- dpawlikowski defaults: `--lg-blur: 8px`, `--lg-saturate: 180%`, `--lg-opacity: 0.58`, `--lg-radius: 24px`, `--lg-shadow: 0 22px 70px rgb(0 0 0 / 0.24)`, filter `scale: 18`, `baseFrequency: 0.008`. — [README](https://raw.githubusercontent.com/dpawlikowski/liquid-glass/main/README.md); [liquid-glass.css](https://raw.githubusercontent.com/dpawlikowski/liquid-glass/main/src/core/liquid-glass.css)
- marknotton custom element defaults: `edgeSize: 10`, `displacementScale: 55`, `blurAmount: 1.4`, `saturation: 1.2`, `specularOpacity: 0.3`, `specularEdgeSize: '1.5px'`. — [gist](https://gist.github.com/marknotton/8dc7ca677cf5aafda9a2ed5c9498a880)
- Sachin CodePen: frost layer `blur(3px) saturate(180%) brightness(1.08)`, tint `rgba(255,255,255,0.04)`, outer `0 24px 48px rgba(0,0,0,0.35)`, inset specular whites. — [CodePen VYPpWvB](https://codepen.io/Sachin-Kizhakkepurath/pen/VYPpWvB)
- Apple: regular glass prioritizes legibility; clear needs optional **35%** dark dim behind bright media; don’t put Liquid Glass in content layer. — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)

### Inferences — recommended **web UI kit** defaults

**Disclaimer:** Approximation only. Prefer CSS tokens below for production controls; keep Archis physics numbers only if you ship SVG/WebGL refraction.

#### A. Control preset (buttons, pills, tab items, FABs)

| Parameter | Recommended | Unit | Maps to CSS | Rationale |
| --- | --- | --- | --- | --- |
| **radius** | **9999** (pill) or **12–16** (rounded rect) | px | `border-radius` | Matches Archis Button r≈26 on 52h (~50% height); pills read more “iOS control” |
| **thickness** | **omit** / soft proxy only | — | slightly stronger outer shadow | Physics knob; Apple size cue without IOR |
| **bezel** | **omit**; rim ≈ **1–2** | px | inset highlight width | Chakachuk / Archis inner rim, not 60px bezel |
| **IOR** | **omit** | — | — | No CSS equivalent; demo 3.0 is engine-maxed |
| **scale / refract / lens** | **off** by default; optional SVG scale **12–18** | filter units | `backdrop-filter: url()` or omit | dpawlikowski recommends ≤18 for Safari; full 55–77 is demo-hero |
| **blur** | **8–12** | px | `backdrop-filter: blur()` | Between Archis shader “look” and dpawlikowski 8px; readable on small chrome |
| **specular opacity** | **0.45–0.55** | 0–1 | inset white shadow alpha | Aligns Archis SVG 0.5 / WebGL 0.55 |
| **specular saturation** | **1.0–1.2** (CSS) or keep filter sat **~4** only with SVG specular map | — | `saturate()` on backdrop, not rim | CSS saturate 180% is common; SVG sat=4 is filter-specific |
| **depth** | **low** | — | short Y-offset shadow | Small chrome should float lightly |
| **inner shadow** | blur **16–20**, spread **−4 to −6**, color `rgba(255,255,255,0.45–0.7)` | px | `box-shadow: inset …` | Archis defaults 20 / −5 / white |
| **tint** | **6–10%** white (`rgba(255,255,255,0.06–0.10)`) | α | `background` | Archis SVG 6%, WebGL 8%, chakachuk button 10% |
| **outer shadow** | `0 4px 16px rgba(0,0,0,0.14)` to `0 4px 24px rgba(0,0,0,0.18)` | px | `box-shadow` | Archis export pattern, slightly reduced for density |

**Starter CSS token set (Control) — approximation:**

```css
--lg-radius: 14px;              /* or 9999px for pill */
--lg-blur: 10px;
--lg-saturate: 160%;
--lg-tint: 255 255 255;
--lg-tint-opacity: 0.08;
--lg-inner-blur: 18px;
--lg-inner-spread: -5px;
--lg-inner-color: rgba(255, 255, 255, 0.5);
--lg-specular: inset 1px 1px 0 -1px rgba(255,255,255,0.55),
               inset 0 0 2px 0.5px rgba(255,255,255,0.35);
--lg-outer: 0 4px 18px rgba(0, 0, 0, 0.16);
/* thickness / bezel / IOR / scale: not used */
```

#### B. Panel / card preset (cards, sheets, side panels)

| Parameter | Recommended | Unit | Maps to CSS | Rationale |
| --- | --- | --- | --- | --- |
| **radius** | **24–32** (card) / **60** only for large soft panes | px | `border-radius` | dpawlikowski 24–32; Archis card demo uses 60 (hero) |
| **thickness** | **proxy: higher** | — | deeper shadow + more blur | Apple: larger → thicker |
| **bezel** | soft rim **2–3** px equivalent | px | inset lights | Don’t use demo bezel=60 on UI cards |
| **IOR** | omit | — | — | |
| **scale / refract** | optional **8–14** if SVG enabled | filter | edge-only displacement preferred | Keep weaker than floating-pane demos |
| **blur** | **16–24** | px | `backdrop-filter: blur()` | Softer scatter for larger surfaces (WWDC) |
| **specular opacity** | **0.35–0.5** | 0–1 | broader, softer inset | Soften vs button rim |
| **specular saturation** | `saturate(160–180%)` on backdrop | % | `backdrop-filter` | Common CSS glass recipe |
| **depth** | **medium–high** | — | larger blur + Y offset | |
| **inner shadow** | blur **20–28**, spread **−5**, white ~0.35–0.45 | px | inset | Slightly softer than controls |
| **tint** | **8–14%** for text-heavy (regular-like); **4–8%** over media (clear-like) | α | background | HIG regular vs clear; Archis sits ~6–8% |
| **outer shadow** | `0 8px 32px rgba(0,0,0,0.18)` to `0 22px 70px rgba(0,0,0,0.24)` | px | box-shadow | Archis 24px blur ↔ dpawlikowski 70px for “vision” |

**Starter CSS token set (Panel) — approximation:**

```css
--lg-radius: 28px;
--lg-blur: 20px;
--lg-saturate: 170%;
--lg-tint-opacity: 0.10;        /* raise if labels wash out */
--lg-inner-blur: 22px;
--lg-inner-spread: -5px;
--lg-inner-color: rgba(255, 255, 255, 0.4);
--lg-specular: inset 0 1px 0 rgba(255,255,255,0.45),
               inset 0 -1px 0 rgba(255,255,255,0.12);
--lg-outer: 0 10px 40px rgba(0, 0, 0, 0.2);
/* optional clear-on-media dimmer behind glass: rgba(0,0,0,0.35) — HIG */
```

#### C. Mapping table: demo → CSS

| Demo param | Archis SVG default | Archis WebGL default | CSS equivalent |
| --- | --- | --- | --- |
| radius | 60 | 60 | `border-radius` (scale down for controls) |
| thickness | 80 | 50 | No direct; ↑ blur + outer shadow for “thicker” |
| bezel | 60 | 60 | Inset highlight width ~1–3px, not 60 |
| IOR | 3.0 | 3.0 | None — skip in CSS kit |
| scale / refract | 1.0 (+ displacement) | shader displacement | Optional `url(#filter)`; else skip |
| blur | 0.3 (filter units) | 1.5 (shader) | `backdrop-filter: blur(Npx)` — **recalibrate in px** |
| specular opacity | 0.5 | 0.55 | Inset white `box-shadow` alpha |
| specular saturation | 4 | (bundled in spec) | Prefer `saturate()` on backdrop |
| depth | via outer blur 24 | shadow 0.5 | Outer `box-shadow` Y + blur |
| inner shadow | 20 / −5 / #fff | baked in shader | `box-shadow: inset 0 0 20px -5px …` |
| tint | 6% white | 8% white | `background: rgb(255 255 255 / 0.06–0.08)` |
| outer shadow | 24px @ 0.18 α | uShadow 0.5 | `0 4px 24px rgb(0 0 0 / 0.18)` |

### Gaps
- Cannot claim px-perfect parity with iPhone Liquid Glass; Apple does not publish numeric material constants.
- Archis blur units ≠ CSS px; any CSS blur recommendation is a **recalibration**, not a unit conversion formula from source.
- Real Apple glass also adapts to underlying luminance (shadow/tint shifts); static CSS presets cannot fully replicate that without JS/sampling.

---

## Which sliders are essential for Apple-likeness vs optional/overfit to the web demo?

### Takeaway
**Essential for Apple-like UI chrome:** blur, tint, specular/edge highlight, outer shadow (separation), radius, and (qualitatively) size-adaptive “thickness.” **Optional / demo-overfit:** IOR, bezel width, glass thickness, scale ratio, surface function, specular saturation (SVG), high displacement scales (55–150), chromatic fringe, turbulence animation.

### Cited Findings
- Apple emphasizes lensing, adaptive tint/shadow, legibility variants, size-adaptive thickness, and **sparing use on functional layers** — not a 10-slider optics panel. — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials); [WWDC25 219](https://developer.apple.com/videos/play/wwdc2025/219/); [Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass)
- CSS-first kits that document defaults (dpawlikowski) expose blur, saturate, opacity, radius, border, shadow — **not** IOR/bezel/thickness. — [dpawlikowski README](https://github.com/dpawlikowski/liquid-glass)
- Archis itself splits Refraction vs Appearance; refraction requires SVG/WebGL; appearance maps to CSS custom properties already used in export. — [index.html](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/index.html)
- High displacement (`scale="150"` / `77`) and specularLighting stacks appear in macOS dock-style demos; impressive for hero panes, costly and brittle for dense UI. — [lucasromerodb-derived CodePen embed](https://codepen.io/anon/embed/vEOpqMa); [chakachuk QwbaYGO](https://codepen.io/chakachuk/pen/QwbaYGO)

### Inferences

**Essential (ship in a UI kit):**
1. **Blur** — frost / soft scatter  
2. **Tint opacity** (+ optional color) — legibility  
3. **Specular / edge highlight** — glass rim read  
4. **Outer shadow** — floating separation (Apple stresses shadow adaptivity)  
5. **Radius** — shape language  
6. **Size mode** (control vs panel) — proxies Apple thickness adaptivity  

**Nice-to-have (progressive enhancement):**
- SVG/WebGL **edge refraction** at low scale (≤18)  
- Backdrop **saturate** ~160–180%  
- Scroll-edge / dimmer layer for clear glass on bright media (~35% dark)  

**Optional / overfit to demos (omit from default kit):**
- IOR, thickness, bezel, scale-ratio, surface-fn (lip/squircle)  
- Specular saturation as a separate slider (unless using Archis specular maps)  
- Noise frequency / displacement 55–150 as always-on  
- Full chromatic aberration fringes  
- Matching demo max IOR 3.0 on every control  

### Gaps
- “Essential Apple-likeness” for motion (flex, materialize via modulating lensing) is largely **unmapped** in static CSS; no reliable open numeric defaults found for those transitions.
- Accessibility (Reduce Transparency / Increase Contrast) changes Apple glass; web kits need reduced-transparency fallbacks (higher tint), but no official α values published.

---

## Cross-demo measured defaults (quick reference)

| Source | Blur | Tint | Radius | Specular / rim | Outer shadow | Refraction |
| --- | --- | --- | --- | --- | --- | --- |
| Archis SVG | 0.3 (filter) | 6% | 60 | opac 0.5, sat 4; inset 20/−5 | 24px @ 0.18 | thick 80, bezel 60, IOR 3, scale 1 |
| Archis WebGL | 1.5 (shader) | 8% | 60 | 0.55 | strength 0.5 | thick 50, bezel 60, IOR 3 |
| chakachuk | blur(0) + SVG | button 10% | container 30 / btn pill | inset white 0.7 | (container shadow via filter) | turbulence 0.008, scale 77 |
| dpawlikowski | 8px + sat 180% | 58% fill | 24 | border 0.45 + inset sheen | 0 22px 70px / 0.24 | filter scale 18, freq 0.008 |
| marknotton | blurAmount 1.4 | — | — | specularOpacity 0.3 | — | displacementScale 55, edgeSize 10 |

— Sources linked in sections above.

---

## Research stop conditions
- Exact Archis SVG/WebGL factory defaults measured from primary HTML/JS/CSS.
- Physics vs appearance classification grounded in demo UI grouping + Apple qualitative HIG.
- Practical Control/Panel CSS recommendations proposed with explicit approximation labeling.
- Tool-call budget respected; remaining uncertainty (Apple numeric constants, blur unit conversion) recorded as gaps rather than invented figures.
