# Apple Liquid Glass visual material parameters (iOS 26 / macOS Tahoe era)

**Scope:** Apple-public documentation and demos of Liquid Glass look parameters (refraction/lensing, blur, tint, specular, thickness, shadows, borders/rims, opacity). Pre–Liquid Glass materials (`UIBlurEffect`, SwiftUI `.ultraThinMaterial` / `.thin` / `.regular` / `.thick`) are labeled as such when used for contrast.

**Primary sources used:** Apple HIG Materials; WWDC25 “Meet Liquid Glass” (219); WWDC25 “Build a SwiftUI app with the new design” (323); Apple Newsroom (9 Jun 2025); SwiftUI `Glass` / `glassEffect` / `Glass.clear` / `GlassButtonStyle`; Adopting Liquid Glass tech overview.

**Source-class rule:** Values labeled **Apple-official** come from Apple docs/WWDC/Newsroom. Values labeled **third-party / reverse engineering** are not Apple defaults and must not be treated as documented API parameters.

---

## Does Apple publish exact defaults (IOR, blur radius, tint opacity, specular, etc.)?

### Takeaway
Apple does **not** publish optical defaults such as IOR, blur radius in points, tint opacity curves, specular intensity, chromatic dispersion, or shadow hex/alpha formulas. The public API exposes **style variants** (`.regular` / `.clear` / `.identity`), optional **tint**, **interactive**, and **shape**—not tunable refraction/blur knobs. The only widely cited Apple numeric opacity guidance for Liquid Glass itself is a **35% dark dimming layer** under **clear** glass over bright content (HIG); sample code on `Glass.clear` uses **30%** (`.black.opacity(0.3)`), a mild inconsistency.

### Cited Findings
- SwiftUI `glassEffect(_:in:)` signature exposes only `_ glass: Glass = .regular` and `in shape: some Shape = DefaultGlassEffectShape()`—no blur radius, IOR, specular, or opacity parameters. — [glassEffect(_:in:)](https://developer.apple.com/documentation/swiftui/view/glasseffect(_:in:))
- `Glass` configuration surface documented as variants plus instance methods `tint(_:)` and `interactive(_:)`—not optical constants. — [Glass](https://developer.apple.com/documentation/swiftui/glass)
- HIG: for clear Liquid Glass over bright content, “consider adding a dark dimming layer of **35% opacity**.” — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- `Glass.clear` sample uses `.background(.black.opacity(0.3))` (30%), with prose only saying to add a dimming layer—**not** restating 35%. — [Glass.clear](https://developer.apple.com/documentation/swiftui/glass/clear)
- WWDC25 219 describes lensing, refraction, thicker-glass simulation, adaptive shadow opacity, tint tone ranges, and specular/highlight motion **qualitatively**—no numeric IOR/blur/specular defaults in the session transcript. — [Meet Liquid Glass – WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)
- Apple Newsroom: Liquid Glass “reflects and refracts,” “dynamically reacts to movement with **specular highlights**,” real-time rendering—no numeric optical parameters. — [Apple Newsroom, 9 Jun 2025](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- Adopting Liquid Glass: system applies effects (reflection, refraction, shadow, blur, highlights) to icon layers; developers supply layers/opacity in Icon Composer—system effects are not documented as numeric defaults for UI glass. — [Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass)
- **Third-party (not Apple):** Secondary writeups claim approximate reverse-engineered numbers (e.g. edge refraction ~9–11 dp, press luminance lift ~6%, chromatic dispersion ~0.018, CSS recreations with `blur(8px)`, 1px white borders, inset speculars). These are reconstructions, not published Apple defaults. — [liquidglass.shayxo.dev confidence notes](https://liquidglass.shayxo.dev/research/confidence/); [WebTricks CSS recreation](https://webtricks.dev/blog/liquid-glass-css); [Meniscus specular notes](https://meniscus.site/effects/specular)

### Inferences
- Liquid Glass is intentionally an **opaque system material**: developers pick semantic variants and tint; the renderer owns optics.
- The **35% vs 0.3** dimming figures both come from Apple pages; treat **35% as HIG design guidance** and **0.3 as an illustrative code sample**, not as competing “true defaults” of the glass shader itself.
- Absence of IOR/blur in docs + absence in the public SwiftUI Glass API strongly indicates these are **not** meant to be app-tunable.

### Gaps
- No Apple-published IOR, blur radius (px/pt), specular exponent/intensity, edge bevel thickness, shadow blur/offset/alpha tables, or tint opacity lookup tables.
- No public Metal/shader parameter sheet for Liquid Glass.
- UIKit `UIGlassEffect` / AppKit `NSGlassEffectView` exist per Adopting Liquid Glass, but this pass did not retrieve full UIKit/AppKit property lists confirming whether they expose more knobs than SwiftUI (unlikely given HIG/WWDC framing).

---

## What visual properties define Liquid Glass according to Apple HIG / WWDC / developer docs?

### Takeaway
Apple defines Liquid Glass as a **digital meta-material** that **lenses/bends and concentrates light** (vs older materials that primarily **scattered**), **blurs** and **reflects/refracts** surroundings, shows **specular highlights**, casts **adaptive shadows**, **tints** adaptively from content brightness, can simulate **greater thickness** when larger, and responds to touch with **illumination / flex**. It is a **functional layer above content**, not a general content-background material.

### Cited Findings
- **Lensing vs prior materials:** WWDC25 219: previous materials “scattered light”; Liquid Glass “dynamically bends, shapes, and concentrates light in real time” (“Lensing”) to define silhouette while staying transparent. — [Meet Liquid Glass – WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)
- **Blur + reflection + interactivity:** SwiftUI applying doc: “blurs content behind it, reflects color and light of surrounding content, and reacts to touch and pointer interactions in real time.” — [Applying Liquid Glass to custom views](https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views)
- **Reflect / refract / specular:** Newsroom: translucent material that “reflects and refracts its surroundings”; “dynamically reacts to movement with specular highlights.” Sidebars “refract the content behind them — while reflecting content and the user’s wallpaper.” — [Apple Newsroom](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- **Layered adaptation:** WWDC25 219: composed of multiple layers that continuously adapt; as content scrolls, “shadows become more prominent”; “amount of tint and the dynamic range shift” for legibility; can independently switch light/dark. — [Meet Liquid Glass – WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)
- **Thickness / bezel (qualitative):** When glass morphs larger (e.g. menu from toolbar), material “simulate[s] a thicker, more substantial material”: “deeper, richer shadows,” “more pronounced lensing and refraction,” “softer scattering of light.” — [Meet Liquid Glass – WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)
- **Highlights / specular motion:** Light sources produce highlights that respond to geometry; on some interactions lights move so light “travel[s] around the material, defining its silhouette”; sometimes responds to device motion. — [Meet Liquid Glass – WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)
- **Shadows:** Shadow opacity **increases over text**, **decreases over solid light backgrounds**—adaptive separation, not a fixed drop-shadow recipe. — [Meet Liquid Glass – WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)
- **Interaction illumination:** On touch, material “illuminates from within”; glow starts under fingertip and can spread to nearby glass. — [Meet Liquid Glass – WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)
- **Tint model:** Selecting a tint color “generates a range of tones… mapped to content brightness underneath”; inspired by colored glass (hue/brightness/saturation shift without leaving intended color). Solid opaque fills “break” the material character. — [Meet Liquid Glass – WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)
- **Hierarchy / placement:** HIG: Liquid Glass = floating functional layer (tab bars, sidebars, controls); **don’t** use in content layer (use **standard materials** there). Exception: transient interactive knobs (sliders/toggles) may take on glass when activated. — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- **Scroll edge effects (companion, not glass itself):** Soft style gently dissolves/blurs/fades content under bars; may switch to subtle dimming when glass goes dark; “hard style” applies more uniformly for pinned accessories. — [Meet Liquid Glass – WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/); [WWDC25 323](https://developer.apple.com/videos/play/wwdc2025/323/)
- **Accessibility modifiers (qualitative):** Reduce Transparency → “frostier,” obscures more; Increase Contrast → predominantly black/white + “contrasting border”; Reduce Motion → less intensity, disables elastic properties. — [Meet Liquid Glass – WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)
- **Pre–Liquid Glass contrast:** HIG still documents standard materials (iOS: ultra-thin, thin, regular, thick) for **content-layer** differentiation with blur/vibrancy—explicitly separate from Liquid Glass. — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- **visionOS note:** HIG visionOS section still describes the older system **glass** window material and thin/regular/thick materials; Liquid Glass is framed as inspired by visionOS depth, but visionOS “glass” guidance in HIG is the platform window material, not the iOS 26 `Glass.regular`/`clear` API. — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials); [Apple Newsroom](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)

### Inferences
- Apple’s primary silhouette cue is **optical lensing + highlights + adaptive shadow**, not a painted hard stroke (see borders question).
- “Thickness” is a **size-dependent simulation** (deeper shadows, stronger lensing, softer scatter), not a documented bezel width in points.
- Opacity is **content- and accessibility-adaptive**, not a single published alpha.

### Gaps
- No official breakdown of internal layer stack with blend modes/opacities (WWDC shows layers conceptually only).
- No numeric mapping for how much blur vs lensing vs tint each size class uses.
- visionOS-era “glass” vs iOS 26 Liquid Glass relationship is conceptual (inspiration), not a shared published parameter set.

---

## Are there named glass variants (e.g. regular vs clear) and how do they differ?

### Takeaway
Yes. Apple documents **`Glass.regular`** (default, adaptive, most system UI) and **`Glass.clear`** (highly translucent, non-adaptive / permanently more transparent, media-only use cases, needs dimming). A third API variant **`Glass.identity`** applies no glass effect (conditional off). WWDC says Regular and Clear **should never be mixed**.

### Cited Findings
- HIG: two variants—**regular** and **clear**; appearance can change with preferred Liquid Glass look and accessibility (reduce transparency / increase contrast). — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- **Regular:** “blurs and adjusts the luminosity of background content” for legibility; scroll edge effects help; most system components; use when content may hurt legibility or when there’s significant text (alerts, sidebars, popovers). — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- **Clear:** “highly translucent”; prioritize underlying media (photos/videos); immersive. — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- Clear dimming: bright content → dark dimming **35%** opacity (HIG); dark content or AVKit media controls may need none. — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- WWDC25 219: Regular = most versatile, full visual/adaptive effects, works any size/content; Clear = “does not have adaptive behaviors,” “permanently more transparent,” needs dimming for symbols/labels; three conditions for Clear: over media-rich content; content layer OK with dimming; content on glass is bold and bright. “Should never be mixed.” — [Meet Liquid Glass – WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)
- Size-based adaptivity (Regular family): small elements (nav/tab bars) flip light↔dark with backdrop; larger (menus/sidebars) adapt but **don’t flip**; glyphs/symbols flip with glass. — [Meet Liquid Glass – WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)
- API: `Glass.regular`, `Glass.clear`, `Glass.identity` (“content remains unaffected as if no glass effect was applied”). Default for `glassEffect()` is `.regular` + Capsule. — [Glass](https://developer.apple.com/documentation/swiftui/glass); [glassEffect(_:in:)](https://developer.apple.com/documentation/swiftui/view/glasseffect(_:in:))
- Sample: `.glassEffect(.regular.tint(.orange).interactive())`. — [Applying Liquid Glass to custom views](https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views)
- Button styles: `GlassButtonStyle` / `.glass` and `GlassProminentButtonStyle` / `.glassProminent` (“prominent glass border artwork”). — [GlassButtonStyle](https://developer.apple.com/documentation/swiftui/glassbuttonstyle); [Applying Liquid Glass…](https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views)
- Newsroom / macOS: icons/widgets have personalization looks including “elegant new **clear** look” (icon appearance variant)—related branding, not the same as `Glass.clear` control material, but same naming language. — [Apple Newsroom](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)

### Inferences
- **Regular ≈ legibility-first adaptive frost + luminosity remap;** **Clear ≈ see-through showcase over media,** with legibility shifted to dimming + bold foreground.
- Developer-facing “opacity” for Clear is mostly the **separate dimming layer**, not a glass alpha slider in the API.
- Prefer system components so Regular/Clear choice is largely automatic.

### Gaps
- Apple does not publish side-by-side numeric opacity/blur deltas between Regular and Clear.
- Exact meaning of user “preferred look for Liquid Glass” in Settings is mentioned but not parameterized in HIG.
- Whether `.glassProminent` is optically different from tinted Regular (vs just opaque CTA treatment) is only partly described (“prominent glass border artwork”).

---

## Does Apple use hard borders on Liquid Glass, or light/rim only?

### Takeaway
Default Liquid Glass is defined by **lensing, specular highlights, and adaptive shadows**—not by a documented hard border stroke. Hard/contrasting **borders appear as an accessibility adaptation** (Increase Contrast) and in API wording for button styles (“glass **border artwork**”). Day-to-day silhouette is light-rim / optical, not a fixed 1pt outline.

### Cited Findings
- WWDC25 219: primary definition is **Lensing** (bending/concentrating light) for separation; highlights “defining its silhouette”; shadows provide lightweight separation—no statement that default glass uses a hard stroked border. — [Meet Liquid Glass – WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)
- Increase Contrast: makes elements “predominantly black or white and **highlights them with a contrasting border**.” — [Meet Liquid Glass – WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)
- `GlassButtonStyle`: “applies **glass border artwork** based on the button’s context”; prominent variant similarly. Wording implies edge/artwork treatment, not exposing stroke width/color APIs. — [GlassButtonStyle](https://developer.apple.com/documentation/swiftui/glassbuttonstyle)
- Newsroom emphasizes refraction, reflection, specular highlights on icons/widgets—not stroke borders. — [Apple Newsroom](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)
- HIG Materials Liquid Glass sections discuss blur, luminosity, translucency, dimming—**no** hard-border default guidance. — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- **Third-party CSS recreations** often add `1px solid rgba(255,255,255,…)` plus inset speculars; these are approximations, not Apple specs. — [WebTricks](https://webtricks.dev/blog/liquid-glass-css)

### Inferences
- For faithful recreation: prefer **asymmetric specular rim + lensing + soft adaptive shadow**; reserve **hard contrasting borders** for Increase Contrast–like states.
- “Border artwork” in button styles likely means system-drawn edge treatment tied to glass context, not a developer-set `borderWidth`.

### Gaps
- Apple never publishes default rim width, highlight gradient stops, or whether a sub-pixel hairline exists under the hood.
- No official “do not use 1px white borders” vs “system uses invisible hairline” statement—only optical language + a11y border.

---

## Any sample code, SF Symbols, or system components that reveal parameters?

### Takeaway
Official samples reveal **API shape and a few layout numbers** (corner radius 16, container 20/40, dimming 0.3), not optical constants. System components (bars, sheets, buttons, SF Symbol toolbars) adopt glass automatically. SF Symbols in samples are ordinary symbol names; no “Liquid Glass SF Symbol set” with material parameters. UIKit/AppKit counterparts (`UIGlassEffect`, `NSGlassEffectView`) are named for adoption.

### Cited Findings
- Default apply: `.glassEffect()` → `.regular` + Capsule; custom shape `.glassEffect(in: .rect(cornerRadius: 16.0))`; tinted interactive `.glassEffect(.regular.tint(.orange).interactive())`. — [Applying Liquid Glass to custom views](https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views)
- `GlassEffectContainer(spacing: 40.0)` / `20.0` with `HStack` spacing matching; larger container spacing → earlier blend/morph. Symbols used: `scribble.variable`, `eraser.fill`, weather set (`cloud.bolt.rain.fill`, etc.)—decorative, not parameter carriers. — [Applying Liquid Glass…](https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views)
- Clear sample: `Label(…).glassEffect(.clear).background(.black.opacity(0.3))`. — [Glass.clear](https://developer.apple.com/documentation/swiftui/glass/clear)
- Morphing: `glassEffectID`, `glassEffectUnion`, transitions `matchedGeometry` / `materialize`; button `.buttonStyle(.glass)`. — [Applying Liquid Glass…](https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views)
- WWDC25 323: scroll edge via system toolbars; `scrollEdgeEffectStyle` to tune sharpness; `GlassEffectContainer` because glass samples an area larger than itself and **cannot sample other glass** without shared container. — [Build a SwiftUI app with the new design](https://developer.apple.com/videos/play/wwdc2025/323/)
- Adopting Liquid Glass lists auto-adopting components (NavigationStack/SplitView, toolbars, UINavigationBar/UITabBar/UIToolbar, NSToolbar, etc.) and custom APIs: SwiftUI `glassEffect`, UIKit `UIGlassEffect`, AppKit `NSGlassEffectView`. — [Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass)
- Icon Composer: system applies reflection, refraction, shadow, blur, highlights to icon layers; developers adjust **layer opacity** in the tool—closest “numeric” workflow, but for icons, not UI glass controls. — [Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass)
- HIG change log: Liquid Glass guidance added 9 Jun 2025; updated 9 Sep 2025. — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)

### Inferences
- Replicable “parameters” from Apple samples are: **variant**, **tint Color**, **interactive Bool**, **Shape** (incl. corner radius), **container spacing**, optional **dimming Color.opacity**, button style **`.glass` / `.glassProminent`**.
- Optical look must be taken as **system-rendered**; recreation requires reverse engineering or approximation.

### Gaps
- Full property lists for `UIGlassEffect` / `NSGlassEffectView` not fetched in this research pass.
- No Apple sample publishing Metal constants or Core Animation filter radii for Liquid Glass.
- Third-party “Ultimate references” (e.g. GitHub LiquidGlassReference) mix Apple API facts with inferred opacity percentages—treat non-linked Apple claims as unverified.

---

## Quick reference: Apple-published numbers vs qualitative-only

| Property | Apple-published numeric? | What Apple says |
| --- | --- | --- |
| IOR / refraction index | **No** | Lensing / bend / concentrate light (qualitative) |
| Blur radius | **No** | Regular “blurs”; Clear more translucent; Reduce Transparency frostier |
| Tint opacity curve | **No** | Tone range mapped to backdrop brightness |
| Specular intensity | **No** | Specular highlights; geometry- and motion-responsive |
| Thickness / bezel | **No** | Larger glass → thicker simulation (deeper shadows, stronger lensing) |
| Shadow opacity | **No** (adaptive only) | Higher over text; lower over solid light |
| Clear dimming | **Yes (guidance)** | HIG **35%** dark; sample **0.3** |
| Corner radius (sample) | Example only | `16.0` in docs |
| Container spacing (sample) | Example only | `20.0`, `40.0` |
| Hard border | A11y / style wording only | Increase Contrast → contrasting border; button “border artwork” |
| Named styles | **Yes** | `.regular`, `.clear`, `.identity`; `.glass` / `.glassProminent` buttons |

**Pre–Liquid Glass (contrast):** SwiftUI/UIKit materials `.ultraThin` / `.thin` / `.regular` / `.thick` remain for **content-layer** structure per HIG—not Liquid Glass variants.
