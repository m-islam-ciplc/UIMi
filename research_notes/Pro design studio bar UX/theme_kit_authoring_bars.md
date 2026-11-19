# Theme + variant + export controls in pro UI kits (authoring chrome vs shippable tokens)

Scope: how Storybook, shadcn, Radix Themes, DaisyUI, MUI, Tokens Studio, Style Dictionary, and open design-system demos (Polaris, Atlassian, Carbon) place theme/mode/export controls, and how that maps to a catalog like UIMi (`palette` / fonts / shell / glass on-off / paint·move tools / HTML·React·Vue·Svelte usage).

## Where do theme pickers live relative to canvas preview?

### Takeaway
Professional kits put **theme/mode controls in chrome outside the preview canvas** (Storybook toolbar/manager, docs site chrome, plugin panels), while **token values** apply only inside the preview root—so the picker never ships as product UI.

### Cited Findings
- Storybook theme (and other “globals”) are configured as `globalTypes` with a `toolbar` annotation in `.storybook/preview.*`; the dropdown lives in the **Storybook manager toolbar above the canvas**, not inside the story iframe. Decorators read `context.globals.theme` and wrap the story. — [Toolbars & globals | Storybook docs](https://storybook.js.org/docs/essentials/toolbars-and-globals)
- Story-level `globals` can lock a theme and **disable the toolbar control** for that story, with a tooltip explaining the lock—reinforcing that the control is playground chrome, not part of the component. — [Toolbars & globals | Storybook docs](https://storybook.js.org/docs/essentials/toolbars-and-globals)
- Official `@storybook/addon-themes` and community `storybook-addon-themes` likewise switch themes from the **toolbar** and apply classes/providers to the preview; selection is stored in `globals.theme` and can be URL-encoded (`?globals=theme:dark`) without embedding a picker in the story. — [Themes | Storybook integrations](https://storybook.js.org/addons/@storybook/addon-themes); [Theme switcher | storybook-addon-themes](https://storybook.js.org/addons/storybook-addon-themes)
- Atlassian’s Storybook addon registers theme switching in Storybook (v7 via `globalTypes.adsTheme` + decorator; v8 via addon + `parameters.adsTheme`) and explicitly **disables Storybook’s built-in backgrounds addon** so it does not fight ADS theming—picker stays in manager chrome. — [Storybook addon – Code | Atlassian Design](https://atlassian.design/components/storybook-addon-design-system/code); [Usage](https://atlassian.design/components/storybook-addon-design-system/usage)
- Carbon’s early React Storybook theme switcher applied tokens via a `storybook-carbon-theme` attribute on the **component container** driven by an addon dropdown; a later community Carbon-theme addon themes the **whole Storybook UI** via `data-carbon-theme` on `<html>` of manager + preview, and deliberately keeps theme **out of Storybook globals** so docs scroll position is preserved—still chrome-adjacent, not in-story. — [feat: add Carbon theme switcher · PR #3989](https://github.com/carbon-design-system/carbon/pull/3989); [Carbon theme | Storybook integrations](https://storybook.js.org/addons/storybook-carbon-theme)
- Radix Themes documents a **Playground** for accent/gray/radius/scaling/panelBackground and applies configuration via the product `Theme` wrapper; docs demos nest `Theme` around examples, but the interactive playground controls are docs chrome, not a required app chrome. — [Theme overview | Radix Themes](https://www.radix-ui.com/themes/docs/theme/overview); [Theme component API](https://www.radix-ui.com/themes/docs/components/theme)
- shadcn’s theme customizer lives on a dedicated **docs/themes page** (`ui.shadcn.com/themes`): pick style/color, preview components, then **Copy code**—controls sit beside a live preview of kit components, not inside an app shell meant for shipping. — [shadcn/ui Discussion #9353](https://github.com/shadcn-ui/ui/discussions/9353); [Theming – shadcn/ui](https://ui.shadcn.com/docs/theming)
- DaisyUI’s site theme list and **theme generator** preview components; runtime switching uses either `data-theme` on `<html>` or optional in-page `theme-controller` inputs (which *are* shippable product controls if the app wants them). — [daisyUI themes docs](https://daisyui.com/docs/themes/); [Theme Controller](https://daisyui.com/components/theme-controller/)
- Tokens Studio export/theme UI lives in the **Figma plugin panel** (Styles & Variables → Export → Themes checklist), completely separate from the design canvas content. — [Export Using Themes (pro) | Tokens Studio](https://docs.tokens.studio/figma/export/themes)
- UIMi’s design bar is an `<aside class="uimi-studio" data-uimi-kit="authoring">` beside `.uimi-app` catalog chrome; kit rules already classify it as authoring-only. — UIMi `.cursor/rules/uimi-kit-vs-product.mdc`; `index.html` studio markup

### Inferences
- Dominant pattern: **chrome around canvas** (toolbar / aside / docs header / plugin) vs **attributes/providers on preview root**. UIMi’s `.uimi-studio` aside matches Storybook/Atlassian “outside the story” placement better than DaisyUI’s optional in-canvas theme-controller.
- For UIMi: keep palette/font/shell/glass **selects in the studio bar**; apply results only as `data-uimi-*` on `<html>` (and `.uimi-glass` on surfaces). Never nest the studio bar inside copied page markup.
- Catalog navigation (Login 1/2, Dashboard 1–3) is a second chrome layer—analogous to Storybook’s sidebar story tree—also non-product.

### Gaps
- No single public spec was found documenting exact pixel layout of shadcn.com/themes or Radix Themes Playground chrome (aside vs floating panel); descriptions rely on docs copy and community write-ups rather than a layout API doc.
- Shopify Polaris public docs emphasize tokens/admin palette more than a live “theme picker relative to canvas” playground; multi-theme CSS class patterns appear mainly in engineering PRs, not a Storybook-style control map. — [Polaris v9→v10 migration](https://github.com/Shopify/polaris/blob/main/documentation/guides/migrating-from-v9-to-v10.md); [Add multi-theme support · PR #10103](https://github.com/Shopify/polaris/pull/10103)

## How are "modes" (dark/light, density, glass/transparency) exposed without multiplying themes?

### Takeaway
Mature systems treat **palette/brand as one axis** and **appearance modes (light/dark, density, translucent panels) as orthogonal axes**—either separate Theme props, CSS selectors (`.dark`, `data-color-mode`), token modes in a collection, or density props—rather than inventing “Apricot Dark LG” as a new theme name.

### Cited Findings
- **Radix Themes** exposes orthogonal props on one `Theme`: `appearance` (light/dark/inherit), `accentColor`, `grayColor`, `radius`, `scaling` (size density-ish), and `panelBackground` (`solid` | `translucent`) for glass-like panels—**not** separate theme packages per combination. — [Theme API](https://www.radix-ui.com/themes/docs/components/theme); [Dark mode](https://www.radix-ui.com/themes/docs/theme/dark-mode); [Color – panel background](https://www.radix-ui.com/themes/docs/theme/color)
- **shadcn/ui** uses semantic CSS variables under `:root` (light) and `.dark` (dark); dark mode overrides the **same token names**—components stay `bg-primary`, etc. Radius/fonts are additional variables, not new themes. — [Theming – shadcn/ui](https://ui.shadcn.com/docs/theming)
- **MUI** `colorSchemes: { light: true, dark: true }` with `ThemeProvider` / CSS variables keeps one theme object with multiple schemes; `useColorScheme` / `defaultMode` switches mode. Density is **not** a second color theme: docs apply density via component `defaultProps` (`size: 'small'`, `margin: 'dense'`, `dense: true`) and warn that the docs density theme is **demonstration-only**. — [Dark mode – MUI](https://mui.com/material-ui/customization/dark-mode/); [CSS theme variables – Configuration](https://mui.com/material-ui/customization/css-theme-variables/configuration/); [Density – MUI](https://mui.com/material-ui/customization/density/)
- MUI X Data Grid exposes `density` as `'comfortable' | 'compact' | 'standard'` **independently** of color theme. — [DataGrid API – density](https://mui.com/x/api/data-grid/data-grid)
- **Atlassian Design System** defines themes as collections of token values; docs explicitly list light/dark/high-contrast **and** non-color themes (cozy/comfortable/compact, reduced motion, custom typography) as theming dimensions. Runtime uses `setGlobalTheme` with `colorMode: 'auto'|'light'|'dark'` and HTML attrs like `data-color-mode` / `data-theme`. — [Design tokens overview | Atlassian](https://atlassian.design/foundations/tokens/design-tokens); [Use tokens in code](https://atlassian.design/foundations/tokens/use-tokens-in-code)
- **Tokens Studio → Figma Variables**: a **Theme Group** maps to a Variable **Collection**; each **Theme** in the group maps to a Variable **Mode** (e.g. Light/Dark)—modes share token names, values differ. Exporting from Token Sets alone does **not** support multiple modes. — [Export Using Themes (pro)](https://docs.tokens.studio/figma/export/themes); [Export to Figma Guide](https://docs.tokens.studio/figma/export/)
- **Style Dictionary** multi-brand example separates **brand** token folders from **global** and **platform** folders and builds brand × platform combinations; maintainers recommend scoping light/dark as **token sets** (load only the active mode) rather than inlining all modes into one token when combining many dimensions (brand × contrast × density). — [multi-brand-multi-platform example](https://github.com/style-dictionary/style-dictionary/tree/main/examples/advanced/multi-brand-multi-platform); [Using the NPM Module](https://styledictionary.com/getting-started/using_the_npm_module/); [Issue #1484 discussion](https://github.com/style-dictionary/style-dictionary/issues/1484)
- **Carbon** ships named color themes (`white`, `g10`, `g90`, `g100`) as theme maps, while **layout density** (`condensed` / `normal`) is a separate layout-context API (`--cds-layout-density-padding-inline`, etc.)—orthogonal to picking g10 vs g100. Historic Storybook work added a layout-token switcher beside color theme switching. — [packages/styles/docs/sass.md](https://github.com/carbon-design-system/carbon/blob/main/packages/styles/docs/sass.md); [Issue #4661](https://github.com/carbon-design-system/carbon/issues/4661)
- **DaisyUI** is the counter-example on naming: light and dark (and 35 named looks) are each a full **`data-theme` theme**; dark preference is wired via `--prefersdark` on a theme name, not a separate “mode” prop. Custom themes can also set effect tokens (`--depth`, `--noise`) inside the theme definition. — [daisyUI themes](https://daisyui.com/docs/themes/)
- **Shopify Polaris** removed full dual color-scheme theming in v10 (consolidated palette + dark-* tokens for localized dark surfaces); later token work reintroduced **variant themes** as CSS class overlays (`html.p-theme-dark`, high-contrast, etc.) extending a base—variants override a subset of tokens rather than duplicating the whole system. — [Migrating v9→v10](https://github.com/Shopify/polaris/blob/main/documentation/guides/migrating-from-v9-to-v10.md); [PR #10103 multi-theme](https://github.com/Shopify/polaris/pull/10103)
- UIMi already separates **palette** (`data-uimi-palette`) from **glass** (`data-uimi-glass` on/off + `.uimi-glass`) and fonts/shell/display attrs—aligned with Radix `appearance`/`panelBackground` and Atlassian colorMode vs non-color themes. — UIMi `AGENTS.md`; `.cursor/rules/uimi-kit-vs-product.mdc`

### Inferences
- Best practice for UIMi: **palette = theme**; **glass = mode/preference**; do not mint “Apricot LG” themes. Same for any future density/shell: separate attrs/controls, same token names where possible.
- Map Radix `panelBackground` ↔ UIMi glass on/off; Radix `scaling` / MUI density / Carbon layout density ↔ potential future density control **beside** palette, not inside it.
- DaisyUI-style “every look is a named theme” works for Tailwind class kits but fights UIMi’s stated model; prefer Radix/shadcn/ADS orthogonal axes when designing the studio bar groups.

### Gaps
- Few public docs describe a first-class **“glass / liquid glass / reduce transparency”** product preference beyond Radix `panelBackground` and DaisyUI `--depth`/`--noise`; Apple-like Liquid Glass as a system toggle is under-documented in web kit sources (2023–2026).
- Carbon’s current production Storybook control layout (whether layout density still has a dedicated addon panel) is only weakly evidenced by older PRs/issues; live Carbon Storybook UI was not inspected in-browser for this note set.

## How do export/copy-to-framework controls sit next to theme without confusing product UI?

### Takeaway
Export/copy lives in **authoring surfaces** (docs Copy buttons, CLI preset commands, token-plugin Export flows, Storybook Source panels)—adjacent to theme pickers in the playground, but always producing **token CSS / commands / markup**, never embedding the picker into the exported artifact.

### Cited Findings
- shadcn themes flow: customize on the themes page → **Copy code** (CSS `:root` / `.dark`) into `globals.css`; Pro docs add **Export theme** with framework init commands (`npx shadcn@latest init --preset …`), “Theme only / Fonts only”, and a Theme tab of CSS variables—export is a dialog/command, not a component in the preview. — [Discussion #9353](https://github.com/shadcn-ui/ui/discussions/9353); [shadcn/ui Pro – Themes](https://pro.shadcn.co/docs/themes); [shadcn.io theme presets](https://www.shadcn.io/theme)
- DaisyUI: theme generator → **copy CSS** into `@plugin "daisyui/theme" { … }`; optional `themecontroller: false` strips in-page controller selectors from the theme CSS so shipping themes need not include playground controller hooks. — [daisyUI themes](https://daisyui.com/docs/themes/); [Config – exclude themecontroller](https://daisyui.com/docs/config/)
- Tokens Studio: theme selection checkboxes sit in the **Export** step after Options (Variables vs Styles); export targets Figma Variables/Styles or (via Style Dictionary + `@tokens-studio/sd-transforms`) platform code—plugin UI is not part of the design file’s product frames. — [Export Using Themes](https://docs.tokens.studio/figma/export/themes); [Style Dictionary + SD Transforms](https://docs.tokens.studio/transform-tokens/style-dictionary)
- Style Dictionary itself is a **build-time** exporter (CSS, iOS, Android, etc.) with no runtime theme bar; “playground” is config + token JSON. — [Style Dictionary config](https://styledictionary.com/reference/config/); [multi-brand example](https://github.com/style-dictionary/style-dictionary/tree/main/examples/advanced/multi-brand-multi-platform)
- Storybook’s addon panel example shows theme object as **copyable Source** in a manager panel (`Source` with `copyable`), separate from the canvas. — [Toolbars & globals](https://storybook.js.org/docs/essentials/toolbars-and-globals)
- Atlassian docs separate **token usage in product code** (`token()`, `setGlobalTheme`) from the Storybook addon used to **test** themes—product apps initialize themes; Storybook only visualizes them. — [Use tokens in code](https://atlassian.design/foundations/tokens/use-tokens-in-code); [Storybook addon usage](https://atlassian.design/components/storybook-addon-design-system/usage)
- UIMi already places copy behind `data-uimi-kit="authoring"` (`.uimi-copy-fab`, `[data-uimi-copy-page]`, `.uimi-snippet`) and documents Usage/Copy as the preferred extract path vs cloning `index.html`. — `.cursor/rules/uimi-kit-vs-product.mdc`

### Inferences
- Organize UIMi studio bar as **two bands**: (1) **shippable preferences**—palette, font, shell, glass on/off; (2) **authoring actions**—Paint, Move, Glass paint/clear, Usage (HTML/React/Vue/Svelte), Copy. Band (2) must never appear in exported snippets.
- Framework Usage tabs should switch **snippet dialect** only; they must not change which theme tokens are considered “product.” Same tokens, different markup wrapper—mirrors shadcn “CSS variables vs CLI preset” dual export.
- Prefer exporting **attrs + CSS variables + one page pattern**, not the studio aside—same as shadcn copying variables without the themes-page chrome.

### Gaps
- Limited primary documentation on how Carbon/Polaris/Atlassian docs sites place “copy React snippet” relative to their theme switchers (layout conventions inferred from Storybook patterns more than from those sites’ chrome specs).
- UIMi multi-framework Usage UX was not compared against a published multi-framework kit bar (most kits are React-first); mapping remains inferential.

## Any patterns for marking controls as "docs-only / playground-only"?

### Takeaway
Explicit markers are the reliable pattern: Storybook **tags** (`autodocs` + `!dev`), **parameters**/`globals` locks, addon disable flags, DaisyUI `themecontroller: false` / `exclude: themecontroller`, MUI’s written warning that density demo themes must not ship, and UIMi’s `data-uimi-kit="authoring"`.

### Cited Findings
- Storybook built-in tags: `dev` (sidebar), `autodocs` (docs page), `test`, `manifest`. **Docs-only stories**: `tags: ['autodocs', '!dev']`—appear in docs, not sidebar. Removing undocumented `docs-only` / `dev-only` / `test-only` aliases in Storybook 10 forces this explicit combo. — [Tags | Storybook docs](https://storybook.js.org/docs/writing-stories/tags); [PR #32360 remove x-only tags](https://github.com/storybookjs/storybook/pull/32360)
- Story-locked `globals` disable interactive toolbar controls for that story—playground chrome is suppressed when the story must be deterministic. — [Toolbars & globals](https://storybook.js.org/docs/essentials/toolbars-and-globals)
- Addon/theme parameters can `disable: true` (e.g. storybook-addon-themes `parameters.themes.disable`) or Atlassian disabling backgrounds to avoid conflicting playground tools. — [storybook-addon-themes](https://storybook.js.org/addons/storybook-addon-themes); [Atlassian Storybook addon code](https://atlassian.design/components/storybook-addon-design-system/code)
- DaisyUI: `themecontroller: false` on custom themes, or `exclude: themecontroller` in plugin config, removes `:root:has(input.theme-controller…)` selectors so themes apply only via `[data-theme]`—playground controller CSS does not bloat product CSS. — [daisyUI themes](https://daisyui.com/docs/themes/); [daisyUI config](https://daisyui.com/docs/config/)
- MUI Density docs: “If you enable high density a custom theme is applied to the docs. **This theme is only for demonstration purposes. You should not apply this theme to your whole application**…” — [Density – MUI](https://mui.com/material-ui/customization/density/)
- Carbon community Storybook Carbon-theme addon: “Styles never reach into a story. A story only gets the Carbon tokens…”—hard boundary between manager chrome styling and story content. — [storybook-carbon-theme](https://storybook.js.org/addons/storybook-carbon-theme)
- UIMi marks authoring with `data-uimi-kit="authoring"` on `.uimi-studio`, paint/glass editors, copy FAB; catalog shell uses `data-uimi-kit="catalog"`. Product extract rules: strip authoring nodes. — `AGENTS.md`; `index.html`

### Inferences
- Strongest portable pattern for UIMi: **keep `data-uimi-kit="authoring"`** (and optionally `catalog`) as machine-readable filters for copy/export—equivalent to Storybook `!dev` + DaisyUI excluding themecontroller.
- Document in export UX which controls are **preview preferences** (palette/font/glass → emit as `data-uimi-*`) vs **tools** (Paint/Move → never emit).
- When adding Usage framework tabs, mark the tab strip authoring; emitted code should contain only product attrs/classes.

### Gaps
- No widely shared HTML/ARIA standard (beyond project-specific `data-*`) for “playground-only” across kits; each ecosystem invents its own marker.
- Tokens Studio / Style Dictionary mark authoring via **tooling context** (plugin vs build) rather than DOM attributes—less directly transferable to a static HTML catalog except as process guidance.

## UIMi mapping cheat-sheet (synthesis for report writer)

| UIMi control | Shippable? | Closest industry analogue |
| --- | --- | --- |
| Palette select → `data-uimi-palette` | Yes (token/theme axis) | Radix `accentColor`/`grayColor`; shadcn CSS vars; ADS themes; Carbon g10/g100; DaisyUI `data-theme` (coarser) |
| Font / display / shell attrs | Yes | Radix/shadcn font + radius tokens; ADS typography theme |
| Glass Off/On → `data-uimi-glass` + `.uimi-glass` | Yes as preference, not as new palette | Radix `panelBackground` solid/translucent; Atlassian non-color theme axes |
| Paint / Move / Glass gear·modal | No — authoring | Storybook toolbar/addons; Tokens Studio plugin; MUI docs-only density theme |
| Usage HTML/React/Vue/Svelte | No — authoring export dialect | shadcn Copy CSS / CLI presets; Storybook Source panels |
| Copy FAB / snippets | No — authoring | shadcn Copy code; DaisyUI generator copy; Storybook copyable Source |
| Catalog nav (Login 1/2…) | No — catalog chrome | Storybook sidebar story tree |

**Control UI organization pattern to emulate:** one studio/toolbar row of **orthogonal selects** (theme · type · density/shell · appearance/glass) + a clearly separated **export/tools** cluster; apply state to preview root attributes; strip tools on export.
