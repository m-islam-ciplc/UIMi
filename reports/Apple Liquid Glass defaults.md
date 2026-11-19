# Web kits approximate Liquid Glass, not clone it

Apple never published optical constants for Liquid Glass—no IOR, blur radius in points, specular curves, thickness, bezel width, or shadow formulas appear in HIG, WWDC, or the public Glass APIs—so any CSS control set that aims at iPhone Liquid Glass must ship labeled **approximations**, not Apple defaults. The only widely cited Apple numeric opacity guidance tied to Liquid Glass itself is a **~35% dark dimming layer** under **clear** glass over bright media (HIG), with sample code using **0.3**. Developer-facing Apple controls are semantic and sparse (`Glass.regular` / `.clear` / `.identity`, tint, interactive, shape/corner radius, container morph spacing)—**fewer and different** from a typical web tuner’s radius, thickness, bezel, IOR, scale, lens/refract, blur, specular opacity/saturation, depth, and inner/outer shadow knobs. For UIMi and similar CSS `backdrop-filter` kits, the closest Apple-like look comes from appearance tokens (blur, tint, specular rim, outer shadow, radius) with size-adaptive “thickness” proxied by stronger blur/shadow on panels than on buttons, while dropping physics-demo knobs (IOR, bezel, thickness, scale) from the default kit. Measured [Archis](https://github.com/archisvaze/liquid-glass) factory defaults remain the best open numeric reference for refraction demos, but their filter/shader blur units are **not** CSS pixels and should not be copied 1:1 onto UI chrome.

## Apple withholds optics and exposes recipes instead

Apple defines Liquid Glass as a digital meta-material that **lenses** (bends and concentrates light) rather than only scattering like older materials, while also blurring, reflecting/refracting surroundings, showing motion- and geometry-responsive specular highlights, casting adaptive shadows, and tinting from underlying content brightness ([Meet Liquid Glass – WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/); [Apple Newsroom, 9 Jun 2025](https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/)). When glass morphs larger, the system **simulates thicker material**—deeper shadows, stronger lensing, softer scatter—without exposing a thickness float ([WWDC25 219](https://developer.apple.com/videos/play/wwdc2025/219/)). Placement rules matter as much as look: Liquid Glass belongs on the **functional layer** (controls, navigation, floating chrome), not as a content-layer background ([HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)).

**Official Apple optical constants (IOR, blur px/pt, specular intensity curves, thickness/bezel in points, inner/outer shadow recipes) were not found** in Apple developer documentation, HIG, WWDC sessions, or Newsroom materials reviewed for this report. Public APIs confirm the gap: SwiftUI `glassEffect(_:in:)` takes only a `Glass` configuration (default `.regular`) and a shape; `Glass` documents variants plus `tint(_:)` and `interactive(_:)`, not blur, IOR, or specular ([glassEffect(_:in:)](https://developer.apple.com/documentation/swiftui/view/glasseffect(_:in:)); [Glass](https://developer.apple.com/documentation/swiftui/glass)). UIKit `UIGlassEffect` and AppKit `NSGlassEffectView` mirror that narrow surface: style (regular/clear), tint, interactive, and (on AppKit) corner radius ([UIGlassEffect](https://developer.apple.com/documentation/uikit/uiglasseffect); [NSGlassEffectView](https://developer.apple.com/documentation/appkit/nsglasseffectview); [Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass)). Named variants matter: **regular** blurs and adjusts luminosity for legibility; **clear** stays more translucent for media immersion and needs a separate dimming layer when labels sit over bright content—HIG cites **35%** dark dimming; `Glass.clear` sample uses `.black.opacity(0.3)` ([HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials); [Glass.clear](https://developer.apple.com/documentation/swiftui/glass/clear)). Default silhouette is optical (lensing + specular + adaptive shadow), not a documented hard 1pt stroke; contrasting borders show up under Increase Contrast and in “glass border artwork” button-style language ([WWDC25 219](https://developer.apple.com/videos/play/wwdc2025/219/); [GlassButtonStyle](https://developer.apple.com/documentation/swiftui/glassbuttonstyle)).

## Our sliders map poorly; Apple’s extras are structural

Compared with a web liquid-glass control set, Apple exposes **less on optics and more on structure**: containers, morph/union/transition helpers, automatic accessibility adaptation (Reduce Transparency, Increase Contrast, Reduce Motion), vibrant adaptive text, and user preferred-look settings that developers generally cannot read via a public API ([Applying Liquid Glass to custom views](https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views); [WWDC25 219](https://developer.apple.com/videos/play/wwdc2025/219/); [Stack Overflow / DTS summary](https://stackoverflow.com/questions/79834608/how-can-i-read-the-setting-of-the-liquid-glass-design-mode)). Tint maps; radius maps only as shape/cornerRadius; almost every optical slider has no Apple app-developer equivalent.

| Our slider | Apple API equivalent | Keep / drop / optional for Apple-like CSS |
| --- | --- | --- |
| Radius | Partial — SwiftUI `Shape` / `.rect(cornerRadius:)`; AppKit `cornerRadius` ([Applying Liquid Glass…](https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views); [NSGlassEffectView](https://developer.apple.com/documentation/appkit/nsglasseffectview)) | **Keep** — essential shape language |
| Thickness | None — system size-adaptive “thicker” simulation only ([WWDC25 219](https://developer.apple.com/videos/play/wwdc2025/219/)) | **Drop** as slider; proxy via size mode (more blur/shadow on panels) |
| Bezel | None | **Drop**; fake rim with 1–3px inset highlight width |
| IOR | None — built-in lensing | **Drop** for CSS kits |
| Scale | None as material uniform (press scale is interaction, not a static optic) | **Drop** by default; optional low SVG displacement ≤18 |
| Lens / refract | None — system lensing | **Optional** progressive enhancement only |
| Blur | None — material-owned | **Keep** — primary frost cue in CSS |
| Specular opacity | None | **Keep** — inset white rim / highlight |
| Specular saturation | None | **Optional** — prefer `saturate()` on backdrop; skip separate SVG sat slider unless using specular maps |
| Depth | None — adaptive perceived depth | **Keep** as outer-shadow strength / size mode, not a physics depth slider |
| Inner shadow color / blur / spread | None | **Keep** — edge definition via inset `box-shadow` |
| Tint color | Yes — `Glass.tint`, `UIGlassEffect.tintColor`, `NSGlassEffectView.tintColor` | **Keep** |
| Tint opacity | Partial / indirect via tint color alpha; no dedicated Glass property | **Keep** as explicit α token for CSS |
| Outer shadow blur | None — adaptive material shadows | **Keep** — floating separation |

Third-party CSS kits that already feel “glass” without WebGL center on **blur + saturate + tint + inset specular + outer shadow**, matching the “keep” column above rather than Archis-style refraction panels ([dpawlikowski/liquid-glass](https://github.com/dpawlikowski/liquid-glass); [chakachuk CodePen QwbaYGO](https://codepen.io/chakachuk/pen/QwbaYGO)).

## Archis factory numbers are demo optics, not CSS tokens

The open demo at [liquidglass.archisvaze.com](https://liquidglass.archisvaze.com/) (source: [archisvaze/liquid-glass](https://github.com/archisvaze/liquid-glass)) is the strongest measured public slider set. SVG and WebGL share default **card geometry** (300×200, radius 60) and shape presets (pill 280×80 r40; button 140×52 r26; circle 200×200 r100), but diverge on look knobs ([index.html](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/index.html); [webgl.html](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/webgl.html)).

| Control | Archis SVG default | Archis WebGL default | Notes |
| --- | --- | --- | --- |
| Width / height / radius | 300 / 200 / **60** | 300 / 200 / **60** | Hero pane, not toolbar chrome |
| Thickness | **80** | **50** | Engine calibration, not two Apple looks |
| Bezel | **60** | **60** | Rim width for lensing, not CSS border |
| IOR | **3.0** | **3.0** | Demo max; exaggerated for web refraction |
| Scale / surface | scale **1.0**, convex_squircle | Shader displacement | Physics path |
| Blur | **0.3** (SVG filter units) | **1.5** (shader radius) | **Not CSS px** — recalibrate for `backdrop-filter` |
| Specular opacity | **0.5** | **0.55** | Appearance |
| Specular saturation | **4** | Bundled in specular | SVG filter-specific |
| Inner shadow | blur **20**, spread **−5**, `#ffffff` | Baked in shader | Maps to inset `box-shadow` |
| Tint | **6%** white | **8%** white | CSS `0.06` / `0.08` |
| Outer shadow | blur **24** @ `rgba(0,0,0,0.18)` | shadow strength **0.5** | Export: `0 4px 24px …` |

Archis groups **Refraction** (thickness, bezel, IOR, scale) separately from **Appearance** (blur, specular, tint, shadows); only appearance exports cleanly to CSS custom properties ([index.html](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/index.html); [index.css](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/index.css)). Preset chips change width/height/radius only—they do **not** auto-scale thickness with size the way Apple describes ([ui.js](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/ui.js)). Other web references for cross-check: chakachuk button tint ~10% with white inset rims and displacement scale 77 ([QwbaYGO](https://codepen.io/chakachuk/pen/QwbaYGO)); dpawlikowski `--lg-blur: 8px`, saturate 180%, radius 24, heavy outer shadow, filter scale 18 ([README](https://raw.githubusercontent.com/dpawlikowski/liquid-glass/main/README.md)).

## Recommended CSS preset (approximation) for cards and buttons

Label everything below as a **web approximation for CSS `backdrop-filter` UI**, not Apple constants. Follow Apple’s qualitative size rule: **controls lighter, panels thicker**—more blur and deeper shadow as surfaces grow ([WWDC25 219](https://developer.apple.com/videos/play/wwdc2025/219/)). Prefer Archis SVG **appearance** anchors (tint ~6–8%, inner white rim ~20/−5, outer ~24 @ 0.18) with practical CSS blur from CSS-first kits (~8–24px), and omit IOR/bezel/thickness/scale from the default kit ([index.html export recipe](https://raw.githubusercontent.com/archisvaze/liquid-glass/main/index.html); [dpawlikowski](https://github.com/dpawlikowski/liquid-glass)).

| Slider name | Control preset (buttons, pills, tabs) | Panel preset (cards, sheets, side panels) |
| --- | --- | --- |
| Radius | Pill `9999` or rounded rect **12–16** px | Card **24–32** px (hero soft panes may use ~60) |
| Thickness | Omit (soft proxy: light outer shadow) | Proxy higher via deeper shadow + more blur |
| Bezel | Omit; rim ≈ **1–2** px inset highlight | Soft rim ≈ **2–3** px equivalent |
| IOR | Omit | Omit |
| Scale / lens / refract | Off; optional SVG scale **12–18** | Optional SVG scale **8–14** if enabled |
| Blur | **8–12** px `backdrop-filter: blur()` | **16–24** px |
| Specular opacity | **0.45–0.55** | **0.35–0.5** (softer, broader) |
| Specular saturation | Backdrop `saturate(160%)`; skip SVG sat=4 unless using specular maps | `saturate(160–180%)` on backdrop |
| Depth | Low (short Y-offset) | Medium–high |
| Inner shadow | Blur **16–20**, spread **−4 to −6**, `rgba(255,255,255,0.45–0.7)` | Blur **20–28**, spread **−5**, white ~0.35–0.45 |
| Tint color / opacity | White **6–10%** (`0.06–0.10`) | Text-heavy **8–14%**; over media **4–8%** (clear-like) |
| Outer shadow | `0 4px 16–24px rgba(0,0,0,0.14–0.18)` | `0 8–22px 32–70px rgba(0,0,0,0.18–0.24)` |

Starter tokens for a control chrome approximation: radius 14px (or pill), blur 10px, saturate 160%, tint opacity 0.08, inner blur 18 / spread −5 / white ~0.5, combined thin specular insets, outer `0 4px 18px rgba(0,0,0,0.16)`. Panel approximation: radius 28px, blur 20px, saturate 170%, tint 0.10, softer inner rim, outer `0 10px 40px rgba(0,0,0,0.2)`, with optional clear-on-media dimmer `rgba(0,0,0,0.35)` behind glass per HIG ([HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)).

## Conclusion

UIMi should treat Liquid Glass parity as **semantic and visual approximation**, not optical reverse-engineering: ship a dual **Control / Panel** default preset built from CSS-mappable appearance knobs, explicitly document that Apple published **no** IOR/blur-px/specular-curve defaults, and keep refraction sliders behind an advanced/demo mode so everyday UI chrome does not inherit Archis hero-pane physics (IOR 3.0, bezel 60, thickness 50–80). The actionable default stack for production is blur + tint + specular rim + outer shadow + radius + size mode, with reduced-transparency fallbacks that raise tint opacity, optional low-scale SVG edge refraction, and a clear-media dimmer near Apple’s **35%** guidance—accepting that static CSS cannot reproduce Apple’s adaptive luminance, morph containers, or accessibility-owned material modulation without additional runtime behavior.
