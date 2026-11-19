# Curated glass backgrounds and picker UX

**Scope:** Product patterns for choosing what sits *behind* translucent / frosted UI (Liquid Glass–style settings), plus a minimal curated light/dark set for UIMi’s glass mode (currently a single `assets/glass-bg.jpg` on `.uimi-main`). Prior notes on Liquid Glass optics/defaults are background only; this file focuses on *background selection*, not glass blur/tint knobs.

**Prior related notes (not re-invented):** [`Apple Liquid Glass defaults/apple_visual_parameters.md`](../Apple%20Liquid%20Glass%20defaults/apple_visual_parameters.md) (HIG materials, Reduce Transparency qualitative behavior, clear-glass dimming); [`web_defaults_mapping.md`](../Apple%20Liquid%20Glass%20defaults/web_defaults_mapping.md) (CSS glass chrome knobs). Current app hook: `html[data-uimi-has-glass="on"] .uimi-main { background-image: url("assets/glass-bg.jpg"); ... }` in `uimi.css`.

---

## What is the smallest high-quality set (names + why each) that covers light and dark well?

### Takeaway
For a workspace design console, ship **four ambient fields**—two light, two dark—as soft multi-stop CSS gradients (not a wallpaper gallery). That size matches how productivity apps keep appearance choices small (Discord’s handful of default themes; Slack’s curated palettes) while giving enough luminance/hue variety for glass blur to read as glass.

### Cited Findings
- Discord documents a **small default theme set** (desktop: Light, Ash, Dark, Onyx, Sync; mobile: Light, Dark, Midnight, Automatic)—not an open-ended wallpaper library for the main UI. — [Discord Appearance settings](https://support.discord.com/hc/en-us/articles/207260127-How-to-Change-Discord-Color-Themes-and-Customize-Appearance-Settings)
- Slack Design reduced custom theming from nine freeform inputs to **four constrained palette controls** mapped to ~20 predetermined palettes so combinations stay predictable and contrast-safe. — [Slack Design: A new visual language for Slack](https://slack.design/articles/a-new-visual-language-for-slack/)
- Windows **Mica** is explicitly an opaque material that **samples desktop wallpaper once** and tints with theme; it is meant as a subtle personalized base layer for long-lived windows, not a photo showcase. — [Mica material – Microsoft Learn](https://learn.microsoft.com/en-us/windows/apps/design/style/mica)
- Windows **Acrylic** celebrates personalization by revealing wallpaper *through* transient frosted surfaces, but Microsoft warns against acrylic on large long-lived backgrounds and against stacking multiple acrylic panes. — [Acrylic material – Microsoft Learn](https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic)
- Apple Wallpaper settings group options into **Dynamic Wallpapers** (light/dark/automatic variants), aerials, pictures, and **solid Colors**—i.e. curated families plus simple color fields, not infinite uncurated uploads as the primary path. — [Wallpaper settings on Mac – Apple Support](https://support.apple.com/guide/mac-help/wallpaper-settings-mchlp1103/mac)
- Apple HIG (via prior research notes): for clear glass over bright content, consider a **~35% dark dimming layer** so content remains legible. — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials) (summarized in prior notes)

### Inferences
- Smallest *high-quality* set for UIMi glass = **2 light + 2 dark** ambient gradients that differ on **luminance band** (cool vs warm) more than on photographic subject matter.
- Soft, low-frequency gradients outperform busy photos behind glass: blur has something to refract, but text contrast stays manageable (aligned with Mica’s “muted wallpaper tint” philosophy).
- Naming should sound like materials / fields (Mist, Porcelain, Slate, Graphite), not consumer wallpaper titles.

### Gaps
- No public Apple/Microsoft “official four-pack” of recommended glass backdrop hex values; the shipping names/CSS below are a product recommendation synthesized from patterns above, not a vendor preset list.
- Exact visual quality of the current `assets/glass-bg.jpg` was not characterized (histogram / busy-ness) in this pass.

---

## How do Figma, Apple, Windows Acrylic, or design tools let users pick wallpapers/materials behind translucent UI?

### Takeaway
Platforms separate **material** (system acrylic/mica/glass) from **what is sampled** (wallpaper / solid color). Pickers are thumbnail grids with live preview; materials usually auto-tint to light/dark and fall back to solids when transparency is off. Workspace apps favor **swatch grids of curated themes**, not full wallpaper browsers.

### Cited Findings

**Apple**
- Wallpaper is chosen in **System Settings → Wallpaper** with a **current wallpaper thumbnail**, category rows (Dynamic, Photos, Aerials, Pictures, Colors), and for Dynamic Wallpapers a menu: Automatic / Dynamic / Light (Still) / Dark (Still). — [Wallpaper settings on Mac](https://support.apple.com/guide/mac-help/wallpaper-settings-mchlp1103/mac)
- Liquid Glass / materials sit *above* content and wallpaper; Apple documents Regular vs Clear glass and accessibility modifiers, not an in-app “pick wallpaper for glass” developer API. — [HIG Materials](https://developer.apple.com/design/human-interface-guidelines/materials); prior notes in `apple_visual_parameters.md`
- Reduce Transparency replaces transparent/blurred backgrounds with more **opaque solid** treatment. — [iPhone display colors – Reduce Transparency](https://support.apple.com/guide/iphone/change-display-colors-iph3e2e1fb0/ios); [Mac Accessibility Display](https://support.apple.com/guide/mac-help/change-display-settings-for-accessibility-unac089/mac)

**Windows (Acrylic / Mica)**
- **Mica**: opaque app backdrop that incorporates **theme + desktop wallpaper**; samples wallpaper once; falls back to solid theme colors when transparency off, Battery Saver, low-end hardware, inactive window, or High Contrast. — [Mica](https://learn.microsoft.com/en-us/windows/apps/design/style/mica)
- **Acrylic**: frosted translucency; **background acrylic** reveals desktop wallpaper and other windows (best for transient UI); **in-app acrylic** blurs content inside the window. Optimized acrylic resources aim for text contrast; accent-colored text on acrylic is discouraged. — [Acrylic](https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic)
- Users pick wallpaper separately under **Settings → Personalization → Background**: Picture / Solid color / Slideshow / Spotlight, with **live preview**, recent-image thumbnails, Browse, and fit modes. Transparency is a separate Colors setting. — [Change the desktop background in Windows](https://support.microsoft.com/en-us/windows/experience/personalization/change-the-desktop-background-in-windows); [The Verge Windows 11 personalization](https://www.theverge.com/23044926/windows-11-customize-display-microsoft-how-to)

**Workspace / design-tool adjacent products**
- **Slack**: Preferences → Themes / Appearance; pick a curated theme swatch or constrained custom colors; Color Mode (Light/Dark/System) is separate; optional window gradient. — [Change your Slack theme](https://slack.com/help/articles/205166337-Change-your-Slack-theme); [Use dark mode in Slack](https://slack.com/help/articles/360019434914-Use-dark-mode-in-Slack)
- **Discord**: Appearance → small set of named themes + optional Nitro custom **color gradients** (up to 5 colors, direction, intensity, Apply)—documented path is palette/gradient, not app-wide photo wallpaper. — [Discord Appearance](https://support.discord.com/hc/en-us/articles/207260127-How-to-Change-Discord-Color-Themes-and-Customize-Appearance-Settings)
- **VS Code**: Color Theme picker is a searchable list with keyboard preview; wallpaper is **not** first-party—extensions add wallpaper independently of `workbench.colorTheme`. — [VS Code Themes](https://code.visualstudio.com/docs/configure/themes); [Doki Wallpaper Carousel](https://marketplace.visualstudio.com/items?itemName=MidSix.doki-wallpaper-carousel)
- **Figma Community** pattern examples (not Figma product chrome): theme selectors as **selectable cards with gradient previews, names, selected states**—useful as UX reference, not as Figma’s own Appearance API. — [Settings – Modern Theme Selector Component](https://www.figma.com/community/file/1654236922786058953/settings-modern-theme-selector-component)
- **GNOME redesign notes** for background settings emphasize fewer clicks, thumbnail preview, and avoiding hover-only actions. — [GNOME Background RedesignNotes](https://wiki.gnome.org/Design/SystemSettings/Background/RedesignNotes)

### Inferences
- For UIMi’s **glass settings modal**, mirror Slack/Discord more than Windows desktop wallpaper: a **section “Background”** with 4 labeled preview swatches, selected ring, and instant apply to the live workspace behind the modal.
- Labels should name the **field** (“Mist”, “Slate”), not “Wallpaper 1”. Optional grouping: Light / Dark rows.
- Persistence: store a key (e.g. `uimi-glass-bg: mist`) in localStorage / profile, same class of persistence as glass blur params—apply on load when `data-uimi-has-glass="on"`.
- Do not expose Browse/upload in v1 for a design console; curated CSS fields keep contrast predictable.

### Gaps
- No official Figma desktop “wallpaper behind glass” product documentation was found; community files are design inspiration only.
- Live interaction details of UIMi’s glass modal picker (ARIA radio group vs buttons) are implementation choices not prescribed by vendor docs.

---

## Should backgrounds be tied to theme palette (light/dark) or independently selectable?

### Takeaway
**Pair by default, allow independent override.** Platforms treat wallpaper and appearance as related but separate settings; Dynamic Wallpapers *can* follow appearance, while arbitrary photos often stay fixed. For glass UIs, luminance mismatch (light glass chrome over a dark field or reverse) is the main failure mode—so recommend light backgrounds with light theme and dark with dark, with an optional “keep background when theme flips” advanced behavior only if needed.

### Cited Findings
- macOS **Appearance** (Light/Dark/Auto) and **Wallpaper** are separate System Settings panes; Dynamic Wallpapers offer Automatic (follow Appearance when Appearance is Auto), Light (Still), and Dark (Still). User-chosen photos are a single wallpaper for both appearances unless third-party tools intervene. — [Wallpaper settings on Mac](https://support.apple.com/guide/mac-help/wallpaper-settings-mchlp1103/mac); [Wallper blog on light/dark wallpapers](https://www.wallper.app/blog/2026/10/light-and-dark-mode-wallpaper-mac)
- Windows Mica/Acrylic are **mode aware** (light and dark) and incorporate theme plus wallpaper; turning off transparency falls back to solid theme colors. — [Mica](https://learn.microsoft.com/en-us/windows/apps/design/style/mica); [Acrylic](https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic); [Materials overview](https://learn.microsoft.com/en-us/windows/apps/develop/ui/materials)
- Slack separates **Color Mode** (Light / Dark / System) from **theme/sidebar colors**. — [Slack dark mode](https://slack.com/help/articles/360019434914-Use-dark-mode-in-Slack); [Slack themes](https://slack.com/help/articles/205166337-Change-your-Slack-theme)
- Discord custom themes still start from a **Dark or Light mode color palette** before gradient colors. — [Discord Appearance](https://support.discord.com/hc/en-us/articles/207260127-How-to-Change-Discord-Color-Themes-and-Customize-Appearance-Settings)
- VS Code first-party themes are color themes; wallpaper extensions treat background as optional/independent (theme-from-wallpaper is an explicit opt-in). — [VS Code Themes](https://code.visualstudio.com/docs/configure/themes); [Doki Wallpaper Carousel](https://marketplace.visualstudio.com/items?itemName=MidSix.doki-wallpaper-carousel)

### Inferences
- **Recommended UX for UIMi:**
  1. Store `glassBackgroundId` separately from theme.
  2. On theme change, if background is still the “default for previous theme,” auto-switch to the matching default in the new theme (Mist ↔ Slate, Porcelain ↔ Graphite).
  3. If the user explicitly picked a non-default background, keep it until they change it (independence after deliberate choice).
- Filter the swatch grid by active theme **or** show all four with Light/Dark section headers and disable/warn on cross-luminance picks—prefer filtering to reduce contrast footguns in a console tool.

### Gaps
- No usability study specifically measuring glass legibility for cross-theme backgrounds was found; recommendation is pattern-based.

---

## Any accessibility notes (text contrast over glass, reduced transparency preferences)?

### Takeaway
Treat glass as a **composited** background: WCAG contrast is against the *effective* color behind glyphs, not the glass fill alone. Ship opaque fallbacks for Reduce Transparency / `prefers-reduced-transparency`, keep body text fully opaque, and bias curated backgrounds toward mid-low frequency soft fields so worst-case samples still pass AA with adequate glass tint.

### Cited Findings
- WCAG 2.2 SC **1.4.3 Contrast (Minimum)**: normal text ≥ **4.5:1**, large text ≥ **3:1**, measured against the background behind the text. Patterned/varying backgrounds require the letters to maintain ratio against the local background. — [Understanding 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum); [Technique G18](https://www.w3.org/WAI/WCAG22/Techniques/general/G18)
- Alpha compositing: translucent panels must be flattened over the backdrop before contrast is meaningful; comparing uncomposited “black” to white overstates contrast. — [AllColorTools: Alpha compositing and contrast](https://allcolortools.com/guides/alpha-compositing-contrast)
- Glassmorphism analysis: opacity of the glass panel must be high enough that text still meets 4.5:1 against **worst-case** backdrop regions; semi-transparent *text* fails faster than opaque text on translucent panels. — [Lucky Graphics: Glassmorphism Text Contrast](https://lucky.graphics/learn/glassmorphism-text-contrast-backdrop-filter-support-2026/)
- Apple **Reduce Transparency**: makes transparent/blurred backgrounds more opaque/solid for readability. — [iPhone](https://support.apple.com/guide/iphone/change-display-colors-iph3e2e1fb0/ios); [Mac](https://support.apple.com/guide/mac-help/adjust-the-display-colors-mchl11ddd4b3/mac)
- WWDC25 Liquid Glass (prior notes): Reduce Transparency → “frostier” / more obscuring; Increase Contrast → predominantly black/white + contrasting border. — [Meet Liquid Glass – WWDC25](https://developer.apple.com/videos/play/wwdc2025/219/)
- CSS **`prefers-reduced-transparency`**: `reduce` vs `no-preference`; maps to OS settings (Windows Transparency effects; macOS/iOS Reduce Transparency). — [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-transparency)
- Chrome guidance: raise overlay opacity under `prefers-reduced-transparency: reduce`; additive pattern of only enabling translucency when `no-preference`. — [Chrome Developers blog](https://developer.chrome.com/blog/css-prefers-reduced-transparency)
- Browser support is **not Baseline**: Chrome/Edge 119+; Firefox and Safari lack support (Can I Use / web-features explorer as of research date). — [Can I Use](https://caniuse.com/wf-prefers-reduced-transparency); [web-features explorer](https://web-platform-dx.github.io/web-features-explorer/features/prefers-reduced-transparency/)
- Windows Acrylic: Microsoft states acrylic resources are optimized so text meets contrast; avoid accent-colored text and hyperlinks on acrylic; materials fall back to solids when transparency is disabled. — [Acrylic](https://learn.microsoft.com/en-us/windows/apps/design/style/acrylic)
- Slack tip: on certain Mac devices, window transparency can be turned off from Accessibility preferences. — [Slack themes](https://slack.com/help/articles/205166337-Change-your-Slack-theme)

### Inferences
- For UIMi glass mode: under reduced transparency, **disable backdrop-filter**, raise `--uimi-glass-tint-opacity`, and optionally **hide decorative background image/gradient** in favor of solid `--uimi-bg`.
- Curated backgrounds should avoid high-frequency photographic detail (current single JPG risk) so contrast sampling is stable.
- Provide an in-app “Reduce glass transparency” toggle that does not rely solely on `prefers-reduced-transparency` (Safari/Firefox gap).

### Gaps
- Exact WCAG ratios for UIMi’s current glass tint variables over `glass-bg.jpg` were not measured in-browser in this research pass.
- Safari/Firefox may never expose the media query for privacy reasons (noted in engine trackers); treat as progressive enhancement only.

---

## Recommend exact pair names and CSS suitable for embedding (replace single `glass-bg.jpg`)

### Takeaway
Ship these four IDs as CSS custom properties / data attributes on `html` or `.uimi-main`, replacing the hard-coded `url("assets/glass-bg.jpg")`. Keep JPG as optional legacy fallback only. Pair **Mist ↔ Slate** and **Porcelain ↔ Graphite** as the light/dark defaults.

### Cited Findings
- UIMi currently applies one fixed image when glass is on: `background-image: url("assets/glass-bg.jpg")` on `.uimi-main`. — codebase `uimi.css` (local)
- Windows personalization supports **Picture** and **Solid color** as first-class background types; solid/simple fields are valid production choices, not only photos. — [Microsoft Support: Change desktop background](https://support.microsoft.com/en-us/windows/experience/personalization/change-the-desktop-background-in-windows)
- Mica’s design goal is a **muted, wallpaper-tinted** base that aids hierarchy without competing with content. — [Mica](https://learn.microsoft.com/en-us/windows/apps/design/style/mica)
- Discord/Slack ship **named, small** appearance sets rather than large image catalogs for core UI. — [Discord](https://support.discord.com/hc/en-us/articles/207260127-How-to-Change-Discord-Color-Themes-and-Customize-Appearance-Settings); [Slack](https://slack.com/help/articles/205166337-Change-your-Slack-theme)

### Inferences
- CSS gradients embed with zero asset weight, scale cleanly, and give glass blur a continuous color field (closer to Mica sampling than a busy photo).
- Cool vs warm pairs cover temperature preference without purple-on-white cliché themes.

### Gaps
- Hex stops below are design recommendations for a console product; they should be visually QA’d against UIMi glass tint/blur tokens before lock.

---

## Recommended shipping set (2 light + 2 dark) with CSS

### Picker UX (concise)
| Element | Recommendation |
| --- | --- |
| Placement | Glass settings modal → section **Background** under Appearance |
| Control | 2×2 (or two rows: Light / Dark) **radio** swatches, 48–64px, showing the gradient |
| Labels | Short material names + one-word hint (e.g. “Mist · cool”) |
| Preview | Selection applies live to `.uimi-main` behind the modal |
| Persistence | `localStorage` / user prefs key `uimi.glassBackground` = `mist` \| `porcelain` \| `slate` \| `graphite` |
| Theme link | Default: auto-pick Mist (light) or Slate (dark); remember explicit user choice |
| a11y | `role="radiogroup"`, selected `aria-checked`, visible focus; honor Reduce Transparency with solid fills |

### Names and why

| ID | Mode | Name | Why |
| --- | --- | --- | --- |
| `mist` | Light | **Mist** | Cool neutral wash; default light field; calm sampling for glass; console-safe |
| `porcelain` | Light | **Porcelain** | Warm neutral alternate; same luminance band as Mist, different temperature |
| `slate` | Dark | **Slate** | Cool deep blue-gray; default dark field; professional workspace tone |
| `graphite` | Dark | **Graphite** | Warm near-black with soft ember undertone; dark pair to Porcelain |

### CSS (drop-in)

```css
/* Replace hard-coded assets/glass-bg.jpg when glass is on */
html[data-uimi-has-glass="on"] .uimi-main {
  background-color: var(--uimi-bg);
  background-image: var(--uimi-glass-scene);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/* —— Light —— */
html[data-uimi-glass-bg="mist"] {
  --uimi-glass-scene:
    radial-gradient(120% 80% at 12% 18%, #dfe8f4 0%, transparent 55%),
    radial-gradient(90% 70% at 88% 12%, #c9d7ea 0%, transparent 50%),
    linear-gradient(165deg, #f4f7fb 0%, #e2ebf5 42%, #d5e0ec 100%);
}

html[data-uimi-glass-bg="porcelain"] {
  --uimi-glass-scene:
    radial-gradient(110% 75% at 18% 20%, #f3e6d8 0%, transparent 52%),
    radial-gradient(85% 65% at 92% 16%, #e8d2c4 0%, transparent 48%),
    linear-gradient(165deg, #fbf7f2 0%, #efe4d8 45%, #e5d5c6 100%);
}

/* —— Dark —— */
html[data-uimi-glass-bg="slate"] {
  --uimi-glass-scene:
    radial-gradient(100% 80% at 10% 0%, #2a3a52 0%, transparent 55%),
    radial-gradient(80% 60% at 100% 20%, #1a2838 0%, transparent 50%),
    linear-gradient(165deg, #121820 0%, #1a2430 48%, #0e141c 100%);
}

html[data-uimi-glass-bg="graphite"] {
  --uimi-glass-scene:
    radial-gradient(100% 80% at 8% 8%, #3a2e28 0%, transparent 52%),
    radial-gradient(75% 55% at 95% 18%, #2a2220 0%, transparent 48%),
    linear-gradient(165deg, #141210 0%, #1c1816 46%, #0c0b0a 100%);
}

/* Defaults when glass on but no explicit bg yet */
html[data-uimi-has-glass="on"]:not([data-uimi-glass-bg]) {
  --uimi-glass-scene:
    radial-gradient(120% 80% at 12% 18%, #dfe8f4 0%, transparent 55%),
    radial-gradient(90% 70% at 88% 12%, #c9d7ea 0%, transparent 50%),
    linear-gradient(165deg, #f4f7fb 0%, #e2ebf5 42%, #d5e0ec 100%); /* mist */
}
html[data-uimi-theme="dark"][data-uimi-has-glass="on"]:not([data-uimi-glass-bg]),
html[data-theme="dark"][data-uimi-has-glass="on"]:not([data-uimi-glass-bg]) {
  --uimi-glass-scene:
    radial-gradient(100% 80% at 10% 0%, #2a3a52 0%, transparent 55%),
    radial-gradient(80% 60% at 100% 20%, #1a2838 0%, transparent 50%),
    linear-gradient(165deg, #121820 0%, #1a2430 48%, #0e141c 100%); /* slate */
}

/* Reduced transparency: opaque surfaces, scene optional/solid */
@media (prefers-reduced-transparency: reduce) {
  html[data-uimi-has-glass="on"] .uimi-main {
    background-image: none;
    background-color: var(--uimi-bg);
  }
  .uimi-glass {
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
    --_uimi-glass-fill: rgba(var(--uimi-glass-tint), 0.92);
  }
}
```

**Default pairs:** light theme → **Mist**; dark theme → **Slate**. Alternates: **Porcelain** (light), **Graphite** (dark).
