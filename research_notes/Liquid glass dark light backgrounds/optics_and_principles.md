# Optics and principles for backgrounds under liquid glass / glassmorphism

Scope: desktop/web workspace UIs using frosted / Liquid Glass / `backdrop-filter` controls. Prefer Apple 2025–2026 Liquid Glass sources; older glassmorphism and Fluent Acrylic guidance included where still optically valid.

---

## What background properties make frosted glass readable and premium vs muddy or invisible?

### Takeaway
Premium glass needs a **visually rich but low–mid spatial-frequency** backdrop (soft color pools, gradients, media) so blur has chroma and structure to sample; flat solids make glass invisible/gray, while high-frequency busy detail makes it muddy and fights letterforms unless blur/tint are strong enough.

### Cited Findings
- Apple’s HIG states Liquid Glass is a distinct **functional layer** for controls/navigation floating above content; it should let content peek through while maintaining legibility, and must **not** be used as the content-layer background — use standard materials there instead. — [Apple HIG: Materials](https://developer.apple.com/design/human-interface-guidelines/materials) (changelog: Liquid Glass guidance added June 9, 2025; updated September 9, 2025)
- **Regular** Liquid Glass “blurs and adjusts the luminosity of background content to maintain legibility”; **Clear** is highly translucent and should be used only over **visually rich** media (photos/videos). — [Apple HIG: Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- WWDC25: Liquid Glass defines itself primarily via **lensing** (bending/concentrating light) rather than only scattering; layers continuously adapt tint, shadows, and dynamic range based on what is behind; shadows strengthen over text and weaken over solid light backgrounds. — [Meet Liquid Glass — WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)
- Apple Newsroom (June 9, 2025): Liquid Glass is translucent, reflects/refracts surroundings, and “intelligently adapts between light and dark environments”; color is informed by surrounding content. — [Apple Newsroom](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- NN/g (June 7, 2024): Glassmorphic elements “stand out when placed in front of gradients or complex backgrounds”; translucency is controlled by **opacity + background blur**; strokes/gradients help especially on simple/one-color backgrounds. — [NN/g: Glassmorphism](https://www.nngroup.com/articles/glassmorphism/)
- Practical CSS literature: frosted glass over flat white/gray reads as “a grey box”; glass over rich gradients with **separate pools of color on a deep base** glows; place a bright pool partly behind the panel so it catches color. — [Gradiently: Glassmorphism and gradients](https://gradiently.design/guide/glassmorphism) (Oct 1, 2026); [Farvist CSS guide](https://farvist.com/blog/glassmorphism-css-guide/) (July 29, 2026)
- Blur is an averaging filter that **desaturates** chroma; without `saturate(~130–160%)`, blurred gradients look washed “frosted plastic.” — [Farvist CSS guide](https://farvist.com/blog/glassmorphism-css-guide/); [Gradiently](https://gradiently.design/guide/glassmorphism)
- A glass panel needs four ingredients: interesting backdrop, translucent fill, backdrop blur, and an edge (border/rim); without a border, panels “dissolve into the image.” — [rohullah.me](https://rohullah.me/blog/glassmorphism-done-right); [Farvist](https://farvist.com/blog/glassmorphism-css-guide/)
- Fluent Acrylic recipe (Microsoft): background → blur → **exclusion blend** (legibility) → tint → **noise**; acrylic is for transient/supporting surfaces, not large opaque app backgrounds; avoid adjacent acrylic panes (visible seams). — [Microsoft Learn: Acrylic](https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic)
- visionOS glass “limits the range of background color information” so windows keep contrast while adapting brighter/darker to surroundings (no separate Dark Mode). — [Apple HIG: Materials — visionOS](https://developer.apple.com/design/human-interface-guidelines/materials)

### Inferences
- “Premium” = readable hierarchy + optical cues (edge lensing/catch-light, soft color bleed, adaptive shadow) over a backdrop with **large color masses**, not pixel-level detail.
- “Muddy” = insufficient blur/tint over high-detail content, stacked glass, or desaturated blur without chroma restore.
- “Invisible” = flat solid backdrop (blur of a constant ≈ constant) or fill alpha so low that panel edges vanish without border/shadow.

### Gaps
- No Apple-published numeric spatial-frequency cutoffs (cycles/degree) for “ideal” backdrop texture under Liquid Glass.
- Limited peer-reviewed vision-science papers specifically on frosted-UI contrast; industry guidance dominates.

---

## How do light vs dark fields differ for glass (tint, text contrast, shadow needs)?

### Takeaway
**Dark fields make translucent white glass easy** (low fill alpha still separates); **light fields need much higher white fill opacity** (or dark tint + light text) because white-on-near-white fails; Apple’s adaptive glass flips light/dark and modulates shadow opacity by backdrop luminance; Clear glass over bright media needs ~**35% dark dimming**.

### Cited Findings
- Farvist (July 29, 2026): dark-theme glass fill ≈ `rgba(255,255,255,0.06)` with border `0.14`; light theme ≈ fill `0.55` and border `0.80` — roughly **9× more white fill** on light pages; blur/saturate stay the same; light glass becomes closer to a “slightly translucent white card.” — [Farvist CSS guide](https://farvist.com/blog/glassmorphism-css-guide/)
- Gradiently starting points: fill **10–25% white** or **40–70% dark**; dark tinted glass over lightest backdrop regions keeps white text readable. — [Gradiently](https://gradiently.design/guide/glassmorphism)
- Apple HIG Clear Liquid Glass: if underlying content is bright, add a **dark dimming layer of 35% opacity**; skip if content is already dark or AVKit provides dimming. — [Apple HIG: Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- WWDC25: Clear glass “needs a dimming layer to darken the underlying content” or legibility gets “noticeably worse”; Regular adapts anywhere; small chrome flips light↔dark with backdrop; large sidebars/menus adapt but **do not flip** light/dark (too distracting). Shadows increase opacity over text, decrease over solid light backgrounds. — [Meet Liquid Glass — WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)
- Apple HIG Color — Liquid Glass: default glass has no inherent color and takes color from content behind; symbols/text on small bars are **monochromatic**, darker over light content and lighter over dark; larger elements (sidebars) appear **more opaque** for legibility; avoid similar colors overlapping between content and controls in resting state. — [Apple HIG: Color](https://developer.apple.com/design/human-interface-guidelines/color)
- Material Design imagery: dark scrims ideally **20–40%** opacity; light scrims **40–60%** depending on content (text protection over imagery). — [Material Design (legacy): Imagery / text protection](https://m1.material.io/style/imagery.html)
- Material surfaces: text on transparent/semi-transparent surfaces may need background treatment; don’t use fully transparent surfaces (unclear edges/ownership). — [Material Design: Surfaces](https://m2.material.io/guidelines/material-design/environment.html)
- WCAG/Material contrast: normal text ≥ **4.5:1**, large text ≥ **3:1** against the *effective* background. — [Material Design 3: Color contrast](https://m3.material.io/foundations/designing/color-contrast); [NN/g](https://www.nngroup.com/articles/glassmorphism/)
- Fluent Acrylic ships separate light- and dark-theme appearances; Microsoft warns against accent-colored text on acrylic at default 14px (contrast risk). — [Microsoft Learn: Acrylic](https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic)

### Inferences
- For desktop workspaces: prefer **deep/dark workspace canvases** under light frosted chrome; on light canvases, either raise fill opacity dramatically or switch to dark-tinted glass + light glyphs.
- Shadow is not optional on light fields of similar luminance to the panel — Apple and CSS authors both use shadow/edge to restore separation when blur alone fails.
- Adaptive light/dark flip (Apple) is the “correct” optical response to backdrop luminance; static CSS glass must approximate it with theme tokens or darker tint.

### Gaps
- No public Apple numeric luminance thresholds (e.g., L* or relative luminance) that trigger Regular glass light↔dark flip.
- Web CSS cannot fully replicate Liquid Glass lensing/refraction; analogies are approximate.

---

## What luminance ranges, saturation levels, and spatial frequencies work best under blur(20–40px) + translucent white/dark fills?

### Takeaway
Industry practice clusters around **blur ~12–30px** (20–40px is usable but contested), **saturate ~120–180%**, low–moderate backdrop chroma (orb opacities ~18–28% or soft gradients), and **large soft color masses** (low spatial frequency) so blur averages to a stable tint rather than noisy midtones under text.

### Cited Findings
**Blur radius**
- Gradiently: blur **16–30 px**; too little detail shows through text; heavier blur safer for text. — [Gradiently](https://gradiently.design/guide/glassmorphism) (Oct 1, 2026)
- Farvist: prefers **12–20 px**; claims **30–40 px** turns frost into fog / “gray card the slow way.” — [Farvist CSS guide](https://farvist.com/blog/glassmorphism-css-guide/) (July 29, 2026) — **conflicts with** NN/g and Gradiently’s “more blur is better / up to 30px” stance.
- NN/g: “**More background blur is better**,” especially with video/photography/animations; low blur leaves backgrounds distracting. Example cited: ~25px vs 100px blur comparison in article figures. — [NN/g](https://www.nngroup.com/articles/glassmorphism/) (June 7, 2024)
- PixCode (2025): inverse relationship blur ↔ fill alpha — heavy blur 20–30px + alpha 0.05–0.12; medium 10–16px + 0.12–0.25; light 4–8px + 0.3–0.5; suggests limiting to ~16px on most surfaces, 20–30px as desktop luxury. — [PixCode](https://pixcode.io/en/blog/css-glassmorphism-2025/)
- rohullah / Thanor: common recipes use `blur(16px)` with `saturate(1.4)`. — [rohullah.me](https://rohullah.me/blog/glassmorphism-done-right); [Thanor](https://thanor.ai/blog/glassmorphism-website-design)

**Saturation / chroma**
- Farvist: `saturate(140%)` after blur; recommends **130–150%** generally. — [Farvist](https://farvist.com/blog/glassmorphism-css-guide/)
- Gradiently: saturate **120–160%**. — [Gradiently](https://gradiently.design/guide/glassmorphism)
- PixCode example: `saturate(180%)`. — [PixCode](https://pixcode.io/en/blog/css-glassmorphism-2025/)
- Farvist dark mesh orbs: color stops at **18–28%** opacity over near-black `#060912` — chroma present but restrained. — [Farvist](https://farvist.com/blog/glassmorphism-css-guide/)

**Fill / luminance treatment**
- Apple quantitative rule: **35% dark dimming** behind Clear glass over bright media. — [Apple HIG: Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- Material scrims: dark **20–40%**, light **40–60%**. — [Material Imagery](https://m1.material.io/style/imagery.html)
- Gradiently: white fill **10–25%** or dark fill **40–70%**. — [Gradiently](https://gradiently.design/guide/glassmorphism)
- Farvist: dark glass fill **6%** white (10% “strong”); light glass fill **55%** white. — [Farvist](https://farvist.com/blog/glassmorphism-css-guide/)
- Regular Liquid Glass “adjusts the luminosity” of background content; scroll edge effects blur and reduce opacity of scrolling content under chrome. — [Apple HIG: Materials](https://developer.apple.com/design/human-interface-guidelines/materials); [WWDC25/219](https://developer.apple.com/videos/play/wwdc2025/219/)
- visionOS glass limits background color range for contrast while adapting to environmental luminance. — [Apple HIG: Materials](https://developer.apple.com/design/human-interface-guidelines/materials)

**Spatial frequency / texture scale (industry proxy language)**
- Best backgrounds described as **mesh/aurora gradients**, “strong separate areas of colour,” orbs partly off-canvas — i.e., large low-frequency color blobs, not fine grain. — [Gradiently](https://gradiently.design/guide/glassmorphism); [Farvist](https://farvist.com/blog/glassmorphism-css-guide/)
- NN/g: if you control the backdrop, prefer **simple or single-color** behind translucent components; if backdrop varies, increase blur. Intricate video/photo needs more blur. — [NN/g](https://www.nngroup.com/articles/glassmorphism/)
- Fluent Acrylic adds **fine tiled noise** on the *material* (not the backdrop) to give surface texture without relying on high-frequency wallpaper detail. — [Microsoft Learn: Acrylic](https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic)

### Inferences
- Under **blur(20–40px)**, optimal backdrops are mid-to-low spatial frequency: soft gradients, large photo regions of similar tone, or color orbs larger than the blur kernel. High-frequency detail is averaged into mottled midtones that reduce text contrast unless fill opacity rises.
- Saturation restore (~1.2–1.6×) compensates for blur-induced chroma loss; neon-high source saturation is not required if post-blur saturate is applied.
- Effective luminance under text should be pushed toward a **stable band** (via dark tint on light media, or higher white veil on light UI) so WCAG 4.5:1 holds at the *brightest* scrolled position.

### Gaps
- No widely cited academic spatial-frequency band (e.g., “prefer < X cycles/deg after blur”) for glass UIs; “spatial frequency” here is inferred from design practice.
- No consensus numeric luminance range (e.g., Y or L*) for “best” backdrop under 20–40px blur; Apple’s 35% dimming is the clearest official opacity number.
- Conflict remains: NN/g/Gradiently favor heavier blur; Farvist warns against 30–40px — treat as context-dependent (uncontrolled busy photo → more blur; designed gradient → moderate blur preserves glow).

---

## What should be avoided (flat solids, high-frequency noise, neon, busy photos)?

### Takeaway
Avoid **flat solids** (invisible glass), **high-frequency noise/busy photos under light blur** (muddy letterforms), **stacked glass**, **full-viewport heavy blur**, **neon/over-saturated chrome text**, and **glass on dense reading/data** — reserve frosted materials for floating chrome over controlled, soft, colorful fields.

### Cited Findings
- Flat solids: “Blurring a solid gives you the same solid”; glass “doesn’t work” without a rich backdrop — skip glass rather than crank blur. — [Farvist](https://farvist.com/blog/glassmorphism-css-guide/); [Gradiently](https://gradiently.design/guide/glassmorphism); [rohullah.me](https://rohullah.me/blog/glassmorphism-done-right)
- Busy / low-blur photography: NN/g shows low translucency + busy backdrop harming focus and contrast; recommends more blur or simpler controlled backgrounds. — [NN/g](https://www.nngroup.com/articles/glassmorphism/)
- Glass on glass: Apple WWDC — “always avoid glass on glass”; stacking clutters hierarchy. HIG: use Liquid Glass sparingly; don’t put it in content layer. — [WWDC25/219](https://developer.apple.com/videos/play/wwdc2025/219/); [Apple HIG: Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- Fluent: don’t layer multiple acrylics; don’t place acrylic panes edge-to-edge (seams); don’t put desktop acrylic on large app backgrounds; don’t put accent-colored text on acrylic. — [Microsoft Learn: Acrylic](https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic)
- Long reading / forms / tables: glass hurts; keep body copy off glass or use solid surfaces. — [Gradiently](https://gradiently.design/guide/glassmorphism); [Farvist](https://farvist.com/blog/glassmorphism-css-guide/); [rohullah.me](https://rohullah.me/blog/glassmorphism-done-right)
- User-uncontrolled backdrops (uploads, third-party embeds): cannot guarantee contrast — use opaque scrim. — [Farvist](https://farvist.com/blog/glassmorphism-css-guide/)
- Neon / over-tinting: Apple — apply color sparingly; tint primary actions only; avoid tinting everything; prefer monochromatic toolbars over colorful content; solid opaque fills “break” Liquid Glass character vs adaptive tint. — [Apple HIG: Color](https://developer.apple.com/design/human-interface-guidelines/color); [WWDC25/219](https://developer.apple.com/videos/play/wwdc2025/219/)
- Missing edge/highlight: without border/inset rim, panel reads as smudge. — [Farvist](https://farvist.com/blog/glassmorphism-css-guide/); [NN/g](https://www.nngroup.com/articles/glassmorphism/)
- Accessibility failure modes: missing `backdrop-filter` leaves translucent unreadable panels — ship opaque fallback; honor reduce-transparency / increase-contrast. — [Farvist a11y](https://farvist.com/blog/glassmorphism-accessibility/); [NN/g](https://www.nngroup.com/articles/glassmorphism/); [Apple Reduced Transparency / Increased Contrast behavior in WWDC25/219](https://developer.apple.com/videos/play/wwdc2025/219/)
- Performance: large blur areas and animating `backdrop-filter` are expensive; keep glass to bars/cards/menus. — [rohullah.me](https://rohullah.me/blog/glassmorphism-done-right); [Farvist](https://farvist.com/blog/glassmorphism-css-guide/); [Microsoft Acrylic GPU/battery notes](https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic)

### Inferences
- High-frequency **backdrop** noise is harmful under glass; fine **material** noise (Acrylic) can help the pane look physical without injecting detail into the text plate — don’t confuse the two.
- Neon fails less as a soft large backdrop orb and more as **high-chroma text/icons** or uncontrolled bright hotspots scrolling under low-opacity glass.
- Busy photos can work only with Clear+dimming (Apple) or heavy blur + sufficient tint (web), not with light frosted fills alone.

### Gaps
- Few sources explicitly ban “neon” by name; neon risk is inferred from contrast/saturation and Apple’s anti-overcoloring guidance.
- No quantitative HF noise PSD threshold for “too busy.”

---

## Quantitative or widely cited rules from Apple HIG, Material Design, and UI literature?

### Takeaway
The most citable **numbers** are Apple’s **35% dark dimming** for Clear glass over bright media; Material’s **20–40% / 40–60%** scrims and WCAG **4.5:1 / 3:1**; web literature’s blur/fill/saturate bands (~12–30px, ~6–55% fills by theme, ~120–180% saturate). Apple’s strongest *non-numeric* rules are layer separation, Regular vs Clear, no glass-on-glass, adaptive luminosity, and vibrancy.

### Cited Findings

**Apple (2025–2026) — primary**
| Rule | Source | Date signal |
|------|--------|-------------|
| Liquid Glass = floating controls/nav layer only; not content-layer backgrounds | [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials) | Added Jun 9, 2025; updated Sep 9, 2025 |
| Regular: blur + luminosity adjust for legibility; use for text-heavy UI | same | same |
| Clear: only over visually rich media; bright media → **35% dark dimming** | same | same |
| Clear needs dimming; Regular works anywhere; never mix variants; no glass-on-glass | [WWDC25 Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/) | WWDC 2025 |
| Small chrome flips light/dark; large sidebars don’t; shadows adapt to backdrop | same | same |
| Judicious color; monochromatic bars over colorful content; resting-state no similar-color overlap | [HIG Color — Liquid Glass](https://developer.apple.com/design/human-interface-guidelines/color) | Liquid Glass era |
| Thicker materials → better fine-feature contrast; thinner → more context | [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials) | ongoing |
| visionOS glass limits background color range; adapts to luminance; prefer translucency over opaque windows | same | visionOS guidance since ~2023, still cited |
| Reduced Transparency → frostier; Increased Contrast → B/W + border; Reduced Motion softens effects | [WWDC25/219](https://developer.apple.com/videos/play/wwdc2025/219/) | 2025 |

**Material Design**
| Rule | Source |
|------|--------|
| Semi-transparent surfaces need legibility treatment; avoid fully transparent | [Surfaces](https://m2.material.io/guidelines/material-design/environment.html) |
| Dark scrim ~20–40%; light scrim ~40–60% over imagery | [Imagery](https://m1.material.io/style/imagery.html) |
| Text contrast 4.5:1 normal / 3:1 large | [M3 Color contrast](https://m3.material.io/foundations/designing/color-contrast) |

**Fluent / Acrylic**
| Rule | Source |
|------|--------|
| Recipe: blur + exclusion + tint + noise | [Acrylic](https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic) |
| Transient surfaces yes; large backgrounds no; no adjacent acrylic seams; no accent text on acrylic | same |
| Falls back solid in high contrast / transparency off / battery saver | same |

**NN/g & web design literature**
| Rule | Source | Date |
|------|--------|------|
| More blur better on intricate BGs; meet contrast everywhere panel can appear | [NN/g](https://www.nngroup.com/articles/glassmorphism/) | Jun 7, 2024 |
| Blur 16–30px; fill 10–25% white or 40–70% dark; saturate 120–160%; border 15–30% white | [Gradiently](https://gradiently.design/guide/glassmorphism) | Oct 1, 2026 |
| Dark fill 6% / light fill 55%; saturate 140%; blur 12–20px preferred | [Farvist](https://farvist.com/blog/glassmorphism-css-guide/) | Jul 29, 2026 |
| Test worst-case (brightest/busiest) backdrop for WCAG 4.5:1 | [rohullah.me](https://rohullah.me/blog/glassmorphism-done-right); [Thanor](https://thanor.ai/blog/glassmorphism-website-design) | ~2024–2026 |

### Inferences
- For **desktop/web workspace** approximating Liquid Glass: treat the canvas as the “content layer” (solid or softly textured), put frost only on floating chrome, keep backdrop color pools large and soft, restore saturation after blur, and **budget fill opacity by theme** (much higher on light).
- When matching Apple Clear-over-media: prefer dark workspace + media, or add ~35% dim behind bright media before light frosted controls.
- Prefer Apple/Microsoft primary docs for hierarchy rules; use NN/g + CSS authors for web numeric starting points — and document the blur-radius disagreement.

### Gaps
- Apple does not publish blur radius, fill alpha, or saturation percentages for Liquid Glass (system-rendered).
- Material Design does not define a first-class “glassmorphism” material comparable to Liquid Glass/Acrylic; guidance is via surfaces/scrims/contrast.
- Academic quantitative optics (MTF, CSF under Gaussian blur for UI text) not found in this pass.

---

## Cross-cutting design checklist (synthesis for report writer)

Derived only from cited findings above:

1. **Backdrop first**: deep base + large soft color masses or media; never flat corporate solid if glass must read.
2. **Frequency**: keep backdrop detail below what survives your blur kernel; if shapes still fight glyphs, increase blur or tint before shrinking type.
3. **Theme asymmetry**: dark UI → low white veil; light UI → high white veil or dark tint + light text.
4. **Edges & lift**: 1px light border / rim + soft shadow (and adaptive shadow if possible).
5. **Chroma**: `saturate(1.2–1.6)` after blur; put brand color in content, monochrome chrome unless one primary tinted action.
6. **Hierarchy**: one glass layer; solid nested controls; no glass tables/long copy.
7. **Bright media**: ~35% dark dim (Apple Clear) or equivalent scrim.
8. **A11y**: worst-case contrast ≥4.5:1; opaque fallback; honor reduced transparency/contrast.
