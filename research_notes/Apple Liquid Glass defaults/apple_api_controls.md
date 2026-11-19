# Apple developer Liquid Glass API controls vs system-fixed properties

Research date context: November 2026. Liquid Glass APIs shipped with iOS 26 / iPadOS 26 / macOS 26 (Tahoe) / tvOS 26 / watchOS 26 SDKs. Control surface documented below is what Apple exposes to app developers in SwiftUI, UIKit, and AppKit; optical “tuner” parameters (IOR, thickness, specular saturation, etc.) appear system-owned.

## What APIs exist for Liquid Glass or glassEffect / GlassEffectContainer / materials?

### Takeaway
Apple exposes a small, semantic Liquid Glass API surface across SwiftUI (`glassEffect`, `Glass`, `GlassEffectContainer`), UIKit (`UIGlassEffect`, `UIGlassContainerEffect`), and AppKit (`NSGlassEffectView`, `NSGlassEffectContainerView`), plus automatic adoption on standard system components—not a low-level material shader parameter kit.

### Cited Findings
- SwiftUI `glassEffect(_:in:)` “Applies the Liquid Glass effect to a view” and is available on iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, watchOS 26.0+; signature takes `_ glass: Glass = .regular` and `in shape: some Shape = DefaultGlassEffectShape()`. — [glassEffect(_:in:) – Apple Developer Documentation](https://developer.apple.com/documentation/swiftui/view/glasseffect(_:in:))
- SwiftUI `Glass` is “A structure that defines the configuration of the Liquid Glass material,” with type properties `regular`, `clear`, and `identity`, plus instance methods for tint and interactive configuration. — [Glass – Apple Developer Documentation](https://developer.apple.com/documentation/swiftui/glass)
- SwiftUI `GlassEffectContainer` “combines multiple Liquid Glass shapes into a single shape that can morph individual shapes into one another”; spacing controls how soon nearby shapes begin blending. — [GlassEffectContainer – Apple Developer Documentation](https://developer.apple.com/documentation/swiftui/glasseffectcontainer)
- Apple’s “Applying Liquid Glass to custom views” documents related modifiers: `glassEffectID(_:in:)`, `glassEffectUnion(id:namespace:)`, and `glassEffectTransition` / `GlassEffectTransition` (`matchedGeometry`, `materialize`) for morphing and transitions inside a container. — [Applying Liquid Glass to custom views](https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views); [glassEffectUnion(id:namespace:)](https://developer.apple.com/documentation/swiftui/view/glasseffectunion(id:namespace:))
- SwiftUI also provides glass button styles: `GlassButtonStyle` / `.glass` and `GlassProminentButtonStyle` / `.glassProminent`. — [Applying Liquid Glass to custom views](https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views)
- UIKit: `UIGlassEffect` (“A visual effect that renders a glass material”) subclasses `UIVisualEffect`; creation via `init(style:)`; configuration topics list `isInteractive` and `tintColor`. — [UIGlassEffect](https://developer.apple.com/documentation/uikit/uiglasseffect); [isInteractive](https://developer.apple.com/documentation/uikit/uiglasseffect/isinteractive)
- UIKit: `UIGlassEffect.Style` enumeration cases include clear and `regular`. — [UIGlassEffect.Style](https://developer.apple.com/documentation/uikit/uiglasseffect/style)
- UIKit: `UIGlassContainerEffect` “renders multiple glass elements into a combined effect” when nested `UIVisualEffectView`s with `UIGlassEffect` are added to a container visual effect view’s `contentView`; exposes `spacing` (“The spacing specifies the distance between elements at which they begin to merge”). — [UIGlassContainerEffect](https://developer.apple.com/documentation/UIKit/UIGlassContainerEffect)
- AppKit: `NSGlassEffectView` “embeds its content view in a dynamic glass effect” (macOS 26.0+) with properties `contentView`, `cornerRadius`, `effectIsInteractive`, `style`, `tintColor`. — [NSGlassEffectView](https://developer.apple.com/documentation/appkit/nsglasseffectview)
- AppKit: `NSGlassEffectContainerView` merges descendant glass effect views when within proximity; properties include `contentView` and spacing/proximity for merge threshold. — [NSGlassEffectContainerView](https://developer.apple.com/documentation/appkit/nsglasseffectcontainerview)
- “Adopting Liquid Glass” states standard components (bars, sheets, popovers, controls) automatically adopt Liquid Glass when built with latest SDKs; custom adoption points developers to SwiftUI `glassEffect`, UIKit `UIGlassEffect`, and AppKit `NSGlassEffectView`. — [Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass)
- WWDC25 session “Build a SwiftUI app with the new design” describes Liquid Glass as the adaptive material for controls/navigation in iOS 26 and macOS Tahoe, and demos `glassEffect`, tint, interactive, and `GlassEffectContainer`. — [WWDC25 323 transcript/page](https://developer.apple.com/videos/play/wwdc2025/323/)
- WWDC25 “Build an AppKit app with the new design” demos `NSGlassEffectView` / `NSGlassEffectContainerView` and notes customizing appearance via corner radius and tint color. — [WWDC25 310](https://developer.apple.com/videos/play/wwdc2025/310/)
- HIG Materials distinguishes Liquid Glass (controls/navigation functional layer) from older content-layer materials; developers should not put Liquid Glass in the content layer except for transient interactive control chrome. — [Human Interface Guidelines: Materials](https://developer.apple.com/design/human-interface-guidelines/materials)

### Inferences
- The developer-facing “material” API is intentionally high-level (variant + tint + interactivity + shape/container morphing), while blur, refraction/lensing, specular response, and adaptive luminance are described as system behaviors of the material, not tunable shader uniforms.
- Older SwiftUI/UIKit “materials” (e.g. `.ultraThinMaterial`) remain a separate content-layer concept; Liquid Glass is a distinct 26+ API family.

### Gaps
- Exact default numeric values for system-internal optical parameters (blur sigma, IOR, specular strength) are not published in Apple developer docs reviewed here.
- No official exhaustive SDK “changelog” page listing every Liquid Glass symbol evolution after initial iOS 26 ship was fetched; post-26.0 additions (e.g. user Clear/Tinted preference) appear in forums/release behavior rather than a single parameter-reference page.

## Which parameters can developers set (tint, shape, interactive, clear/regular)?

### Takeaway
Developers can set glass **variant** (regular / clear / identity), **tint**, **interactive** on/off, **shape** (including corner radius via shape or AppKit `cornerRadius`), and **container morph/merge spacing**—plus transition/union/ID helpers—not continuous optical sliders.

### Cited Findings
- Official customization list for custom SwiftUI glass: different shapes; tint color “to suggest prominence”; `interactive(_:)` for touch/pointer reactions matching standard glass buttons. Examples: `.glassEffect()`, `.glassEffect(in: .rect(cornerRadius: 16.0))`, `.glassEffect(.regular.tint(.orange).interactive())`. — [Applying Liquid Glass to custom views](https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views)
- `Glass` documents instance methods: interactive configuration and tint color; type properties: `clear`, `identity` (“content remains unaffected as if no glass effect was applied”), `regular`. — [Glass](https://developer.apple.com/documentation/swiftui/glass)
- `Glass.clear` discussion: when using clear glass, ensure legibility with a dimming layer or other treatment beneath; sample uses `.background(.black.opacity(0.3))` under `.glassEffect(.clear)`. — [Glass.clear](https://developer.apple.com/documentation/swiftui/glass/clear)
- HIG Materials: two variants for custom components—`regular` (blurs/adjusts luminosity for legibility; most system components) and `clear` (highly translucent; for floating over rich media); clear may need ~35% dark dimming on bright content. Appearance of variants can differ under user preferred Liquid Glass look and accessibility settings. — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- WWDC25 “Meet Liquid Glass”: Regular is the versatile adaptive variant; Clear is permanently more transparent, lacks Regular’s adaptive behaviors, and needs a dimming layer for label/symbol legibility; Clear should only be used when specific conditions are met. — [WWDC25 219 Meet Liquid Glass](https://developer.apple.com/videos/play/wwdc2025/219/)
- UIKit mirrors SwiftUI: `UIGlassEffect` style (clear / regular), `tintColor`, `isInteractive`. — [UIGlassEffect](https://developer.apple.com/documentation/uikit/uiglasseffect); [UIGlassEffect.Style](https://developer.apple.com/documentation/uikit/uiglasseffect/style)
- AppKit: `cornerRadius`, `style`, `tintColor`, `effectIsInteractive` (default `NO`; enable for interactive controls/containers), plus `contentView` embedding. — [NSGlassEffectView](https://developer.apple.com/documentation/appkit/nsglasseffectview); [effectIsInteractive (mirror docs)](https://apple-docs.everest.mt/docs/appkit/nsglasseffectview/effectisinteractive/)
- Container spacing is a developer control over morph/merge proximity, not glass optics: larger spacing → blending begins sooner as shapes approach. — [GlassEffectContainer](https://developer.apple.com/documentation/swiftui/glasseffectcontainer); [UIGlassContainerEffect](https://developer.apple.com/documentation/UIKit/UIGlassContainerEffect)
- `glassEffectUnion` combines effects with the same shape and Liquid Glass variant into a single shape; third-party write-ups also report same tint/effect type as practical requirements for unions to group. — [glassEffectUnion](https://developer.apple.com/documentation/swiftui/view/glasseffectunion(id:namespace:)); [Donny Wals on glassEffectUnion](https://www.donnywals.com/grouping-liquid-glass-components-using-glasseffectunion-on-ios-26/)
- WWDC25 SwiftUI session: glass uses vibrant adaptive text/tint for legibility; interactive glass scales, bounces, and shimmers; containers share sampling regions because glass cannot sample other glass. — [WWDC25 323](https://developer.apple.com/videos/play/wwdc2025/323/)

### Inferences
- “Radius” in a web tuner maps roughly to Apple **shape / cornerRadius**, not a glass-material radius slider.
- Tint opacity is not a separate Glass API property; developers can pass a tint `Color`/`UIColor` that itself has alpha (community examples use `.tint(.pink.opacity(0.4))`), which is a color-channel choice rather than a documented specular/tint-layer slider.
- `identity` glass is an opt-out / no-op variant, useful for conditional disabling without removing modifiers—not an optical style.

### Gaps
- Official docs do not document a continuous “tint opacity” property separate from the tint color’s alpha.
- Exact `Glass.interactive(_:)` Bool default and full `GlassEffectTransition` case list beyond `matchedGeometry` / `materialize` (and community-noted `identity`) should be verified against the installed SDK headers if a complete enum dump is required.

## Which web-style tuner sliders have NO Apple app-developer equivalent?

### Takeaway
Nearly all optical “liquid glass tuner” sliders—IOR, thickness, bezel, lens/refract strength, blur radius, specular opacity/saturation, depth, inner-shadow color/blur/spread, outer-shadow blur—have **no** documented Apple app API; Apple keeps those as system-fixed / adaptive material behavior.

### Cited Findings
- Apple’s documented developer-facing Glass configuration is limited to variants, tint, and interactive (plus shape via `glassEffect`’s `in:` parameter)—not IOR, thickness, bezel, specular, blur radius, or shadow spread. — [Glass](https://developer.apple.com/documentation/swiftui/glass); [Applying Liquid Glass to custom views](https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views)
- UIKit `UIGlassEffect` configuration topics list only `isInteractive` and `tintColor` (plus style at init). — [UIGlassEffect](https://developer.apple.com/documentation/uikit/uiglasseffect)
- AppKit documented customizations emphasized in WWDC: corner radius and tint color; properties list does not include blur, IOR, specular, or shadow parameters. — [WWDC25 310](https://developer.apple.com/videos/play/wwdc2025/310/); [NSGlassEffectView](https://developer.apple.com/documentation/appkit/nsglasseffectview)
- WWDC25 “Meet Liquid Glass” describes lensing, light bending, flexing, thicker material simulation when morphing to larger sizes (deeper shadows, more pronounced lensing/refraction, softer light scatter) as inherent material behavior that adapts with size/context—not as developer-set floats. — [WWDC25 219](https://developer.apple.com/videos/play/wwdc2025/219/)
- Docs describe Liquid Glass as a material that “blurs content behind it, reflects color and light… and reacts to touch… in real time” without exposing blur amount APIs on `Glass` / `UIGlassEffect`. — [Applying Liquid Glass to custom views](https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views)

### Mapping table (web tuner → Apple app API)

| Web-style control | Apple developer equivalent? | Notes |
|---|---|---|
| Radius | **Partial** | SwiftUI `Shape` / `.rect(cornerRadius:)`; AppKit `cornerRadius`. Not a glass-shader radius. |
| Thickness | **No** | System may simulate thicker glass when element grows (WWDC design talk); no thickness API. |
| Bezel | **No** | No bezel/rim width API on Glass types. |
| IOR | **No** | Refraction/lensing described as built-in optical behavior. |
| Scale | **No continuous material scale** | Interactive reaction includes scaling on press (WWDC); not a static material scale slider. View transforms are separate from Glass config. |
| Lens / refract | **No** | System lensing; not tunable. |
| Blur | **No** | Blur is part of material; no blur-radius property on Liquid Glass APIs. |
| Specular opacity | **No** | Not exposed. |
| Specular saturation | **No** | Not exposed. |
| Depth | **No** | Perceived depth/shadowing adapts with size/context (WWDC); no depth slider. |
| Inner shadow color / blur / spread | **No** | Not exposed on Glass APIs. |
| Tint color | **Yes** | `Glass.tint`, `UIGlassEffect.tintColor`, `NSGlassEffectView.tintColor`. |
| Tint opacity | **Partial / indirect** | Via tint color alpha in practice; not a dedicated Glass property in docs. |
| Outer shadow blur | **No** | Shadows discussed as adaptive material layers in design sessions; no developer shadow blur on Glass. |

### Inferences
- A typical web CSS/`backdrop-filter` liquid-glass demo exposes low-level compositing knobs; Apple’s model is “pick a semantic glass recipe and let the system render,” closer to choosing Material Design tokens than editing a shader.
- Attempting to recreate web-tuner parity inside an App Store app would require abandoning system Liquid Glass APIs and rolling a custom Metal/SceneKit/SwiftUI effect—which would not automatically match system accessibility adaptations or sampling rules.

### Gaps
- Whether private/undocumented CALayer or render-server parameters exist for glass optics is out of scope for official developer-facing controls; no public API was found.
- Design tools (e.g. Figma community kits, Icon Composer) may expose visual knobs that do not map 1:1 to app APIs; this research focused on developer SDKs, not design-tool plugins.

## Are there more Apple controls we are missing (morphing, adaptive variants, vibrancy, Reduce Transparency)?

### Takeaway
Yes—beyond tint/shape/interactive/variant, Apple’s real control surface includes **containers + morphing/transitions/unions**, **automatic environmental/accessibility adaptation**, **system button/glass styles**, and **user Settings preferences**—most of which are system-driven rather than developer-tunable floats.

### Cited Findings
- Morphing/combining: `GlassEffectContainer(spacing:)`, `glassEffectID`, `glassEffectUnion`, `glassEffectTransition` (`matchedGeometry` default within spacing; `materialize` for farther effects). — [Applying Liquid Glass to custom views](https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views)
- UIKit/AppKit equivalents: `UIGlassContainerEffect.spacing`, `NSGlassEffectContainerView` proximity/spacing. — [UIGlassContainerEffect](https://developer.apple.com/documentation/UIKit/UIGlassContainerEffect); [NSGlassEffectContainerView](https://developer.apple.com/documentation/appkit/nsglasseffectcontainerview)
- Adaptive behavior (system-owned): continuous adaptation of layers to content underneath; independent light/dark; shadows strengthen as content scrolls under; tint/dynamic range shift for legibility; larger morph sizes get thicker-material simulation. — [WWDC25 219](https://developer.apple.com/videos/play/wwdc2025/219/)
- Accessibility adaptations called out in Meet Liquid Glass: **Reduced Transparency** makes glass frostier/more opaque; **Increased Contrast** makes elements predominantly black/white with contrasting border; **Reduced Motion** decreases effect intensity and disables elastic properties—applied automatically when using the material. — [WWDC25 219](https://developer.apple.com/videos/play/wwdc2025/219/)
- Adopting Liquid Glass: people can choose a preferred look for Liquid Glass in device settings, or enable accessibility settings that reduce transparency or motion; these can remove or modify effects; standard components adapt automatically—test custom elements. — [Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass)
- HIG Materials: variant appearance can differ when users choose a preferred Liquid Glass look or enable reduce transparency / increase contrast. — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- Stack Overflow + Apple Developer Forums report (citing Apple DTS): **no API** to read the user’s Liquid Glass Clear vs Tinted (preferred look) setting; Apple advises not adapting custom UI based on it—prefer standard components so AppKit/UIKit/SwiftUI apply the theme. — [Stack Overflow: read Liquid Glass design mode](https://stackoverflow.com/questions/79834608/how-can-i-read-the-setting-of-the-liquid-glass-design-mode)
- Vibrancy / legibility: WWDC SwiftUI session notes SwiftUI automatically uses vibrant text (and tint) that adapts for legibility against colorful backgrounds under glass. — [WWDC25 323](https://developer.apple.com/videos/play/wwdc2025/323/)
- Design constraints that act as soft “controls”: avoid glass-on-glass; avoid Liquid Glass in content layer; use sparingly; Clear only over rich media with dimming as needed. — [Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass); [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials); [WWDC25 219](https://developer.apple.com/videos/play/wwdc2025/219/)
- Performance guidance: too many containers/effects outside containers degrades performance; containers share sampling and improve correctness because glass cannot sample other glass. — [Applying Liquid Glass to custom views](https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views); [WWDC25 323](https://developer.apple.com/videos/play/wwdc2025/323/)

### Inferences
- The richest “extra” developer controls are **structural** (container spacing, IDs, unions, transitions, button styles), not optical.
- Accessibility and preferred-look settings are **user/system controls that override or modulate** glass; developers mainly ensure contrast/legibility and use standard components rather than reading preference APIs.
- `@Environment(\.accessibilityReduceTransparency)` remains relevant for **custom** non-system glass approximations; for true `glassEffect` / `UIGlassEffect`, Apple states the material adapts automatically.

### Gaps
- No official public API symbol was found for reading the user’s preferred Liquid Glass look (Clear/Tinted); confirmation relies on Apple DTS forum reply via secondary report.
- Exact interaction between iOS 26.1+ preferred-look slider and Reduce Transparency / Increase Contrast is described inconsistently in third-party accessibility blogs; treat stacking order as incompletely documented for developers.
- Whether developers can selectively disable automatic accessibility glass adaptations was not found in official docs (likely not).

## Any Interface Builder / Xcode inspector fields that list adjustable glass properties?

### Takeaway
Official Apple documentation emphasizes **code** APIs for Liquid Glass; no primary Apple page was found that publishes an Interface Builder Attributes Inspector field list for Liquid Glass. Adjustable properties are the same code-facing ones (`style`/`variant`, `tint`, interactive, corner radius/shape, container spacing).

### Cited Findings
- Apple’s “Adopting Liquid Glass” and framework reference pages document programmatic APIs (`glassEffect`, `UIGlassEffect`, `NSGlassEffectView`) rather than IB inspector panes. — [Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass); [NSGlassEffectView](https://developer.apple.com/documentation/appkit/nsglasseffectview); [UIGlassEffect](https://developer.apple.com/documentation/uikit/uiglasseffect)
- WWDC25 AppKit session demonstrates creating `NSGlassEffectView` / `NSGlassEffectContainerView` in code and setting `contentView`, `cornerRadius`, and grouping—not an IB walkthrough of glass inspector fields. — [WWDC25 310](https://developer.apple.com/videos/play/wwdc2025/310/)
- Archived Interface Builder User Guide describes a general Effects inspector (transparency, shadows, Core Image filters) for older macOS layer effects; that guide is for historical IB and does **not** document Liquid Glass (iOS/macOS 26) properties. — [IB User Guide: Object Attributes (archive)](https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/IB_UserGuide/ObjectAttributes/ObjectAttributes.html)
- UIKit pattern for containers: assign `UIGlassContainerEffect` / `UIGlassEffect` on `UIVisualEffectView` in code (nest glass visual effect views in the container’s `contentView`). — [UIGlassContainerEffect](https://developer.apple.com/documentation/UIKit/UIGlassContainerEffect)

### Inferences
- **Speculation:** If Xcode’s IB object library includes `NSGlassEffectView`, the Attributes Inspector would likely surface the public properties (`cornerRadius`, `style`, `tintColor`, `effectIsInteractive`) via standard KVC/IBInspectable-style exposure—but this was **not verified** against a current Xcode 26 IB screenshot or Apple IB release note in this research pass.
- SwiftUI Previews/canvas remain the primary visual authoring path for `glassEffect`; storyboard glass is secondary and UIKit-effect based.

### Gaps
- No official Apple document was located that lists Interface Builder inspector field names specifically for Liquid Glass.
- No WWDC session transcript reviewed here shows an IB Attributes Inspector for `NSGlassEffectView` or `UIGlassEffect`.
- Confirming IB exposure requires checking Xcode 26 Object Library / Attributes Inspector directly (not done in this text-only research pass).

## Cross-cutting: API maturity as of 2026

### Takeaway
Liquid Glass is a first-class platform material in the 26 SDKs, but the developer control surface is intentionally narrow and still evolving around system Settings/accessibility rather than expanding into optical parameter APIs.

### Cited Findings
- Availability annotations consistently start at platform version **26.0** across SwiftUI/UIKit/AppKit glass symbols. — [glassEffect](https://developer.apple.com/documentation/swiftui/view/glasseffect(_:in:)); [UIGlassEffect](https://developer.apple.com/documentation/uikit/uiglasseffect); [NSGlassEffectView](https://developer.apple.com/documentation/appkit/nsglasseffectview)
- Post-ship user preference for Liquid Glass look (reported around iOS 26.1) exists in Settings, yet Apple DTS reportedly states there is no developer read API and recommends not branching UI on it. — [Stack Overflow / DTS summary](https://stackoverflow.com/questions/79834608/how-can-i-read-the-setting-of-the-liquid-glass-design-mode); [Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass)
- Third-party SDK wrappers (e.g. Expo) document runtime fragility in early iOS 26 betas (initializer crashes, layout timing quirks)—signal that implementation details were still settling after announcement. — [expo-glass-effect GlassView.swift](https://github.com/expo/expo/blob/main/packages/expo-glass-effect/ios/GlassView.swift)

### Inferences
- For product/design teams comparing a web liquid-glass tuner to Apple apps: expect **semantic** parity (tint, shape, interactive, clear/regular, morph grouping), not **physical** parity (IOR, bezel, specular saturation, inner shadow spread).
- Treat any future private or undocumented optical hooks as non-App-Store-safe unless Apple publishes them.

### Gaps
- Full header dump / `.swiftinterface` listing for every Glass-related symbol in Xcode 26.x was not performed.
- Sample code project “Landmarks: Building an app with Liquid Glass” is referenced by Apple but was not downloaded/inspected for additional undocumented parameters. — mentioned in [Applying Liquid Glass to custom views](https://developer.apple.com/documentation/swiftui/applying-liquid-glass-to-custom-views)
