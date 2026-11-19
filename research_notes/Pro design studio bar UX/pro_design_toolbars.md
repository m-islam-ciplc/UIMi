# Pro design studio bar UX — toolbar IA patterns (2023–2026)

Actionable research for a web UI kit **Design** authoring bar that mixes document chrome, appearance settings (theme/font/shell), editing modes (paint/move/glass), and export. Sources prefer official product docs, release writeups, and established design-system guidelines.

---

## How do pro tools separate global look (theme/color) from editing tools (paint, move, effects)?

### Takeaway
Pros almost never mix “how the product/canvas looks globally” with “what tool I’m using right now” in one undifferentiated cluster: **appearance/theme lives as a global preference or preview control**, while **edit modes and drawing tools live in a dedicated tool strip or mode switcher**, and **fills/effects/properties stay in a contextual inspector or options bar**.

### Cited Findings
- Figma UI3 puts **mode switching + drawing tools + Actions + zoom** in a **floating bottom toolbar**, while navigation/layers/assets/variables sit in a left nav + sidebar and properties (including appearance of the selection) sit in the right panel — five distinct interactive zones, not one mega-bar. — [Figma Help: navigation bar & left sidebar](https://help.figma.com/hc/en-us/articles/360039831974-Explore-the-navigation-bar-and-left-sidebar); [Irurueta UI3 interface tour](https://www.irurueta.com/ui-ux/figma/interface-tour.html)
- Figma’s toolbar docs group **Move / Hand / Scale**, region tools, shapes, pen/pencil, text, comments, and **Dev Mode / Draw mode** as canvas interaction tools — not theme or app chrome. — [Figma Help: Access design tools from the toolbar](https://help.figma.com/hc/en-us/articles/360041064174-Access-design-tools-from-the-toolbar)
- Figma’s UI3 redesign explicitly aimed to stop “playing Tetris” fitting features into one bar by giving **cleaner hierarchy** and logical slots for future capabilities; toolbars float at the bottom across products. — [Figma Blog: Designing UI3 (Oct 2024)](https://www.figma.com/blog/our-approach-to-designing-ui3/)
- Webflow separates chrome into **top bar** (product tabs, context, share/publish), **canvas bar** (undo, breadcrumbs, breakpoints, canvas settings), **left toolbar** (structure panels + main menu), and **right toolbar** (Style / Settings / Interactions). Interface **theme** (darker/brighter) is under the **main menu**, not beside Add/Navigator tools. — [Webflow Help: Intro to Webflow](https://help.webflow.com/hc/en-us/articles/33961260162323-Intro-to-Webflow)
- Webflow’s account-level appearance (System / Light / Dark, plus Darker/Default/Brighter) is documented as controlling **the Webflow interface — not your published site**. — [Webflow Updates: Light and dark themes](https://webflow.com/updates/light-and-dark-themes-across-webflow)
- Framer’s interface lesson places **insert/project/preview/publish** in the toolbar, **Pages / Layers / Assets** in the left sidebar, **selection-driven properties** on the right, and a **theme toggle to preview light/dark content** as a canvas/view concern — not as a drawing tool. — [Framer Academy: Learn the Framer interface](https://www.framer.com/academy/lessons/framer-interface)
- Sketch’s Mac toolbar (updated docs Nov 2026) left-to-right clusters: **Command Bar + Insert → Tools (frame/graphic/shape) → notifications/comments → View/zoom → Preview/Prototyping → Collaborate → Share**. Layer fills, borders, shadows, and effects live in the **Inspector**, not the top toolbar. — [Sketch Docs: The Toolbar](https://www.sketch.com/docs/interface-and-settings/the-mac-app-interface/the-toolbar/); [Sketch Docs: The Inspector](https://www.sketch.com/docs/interface-and-settings/the-mac-app-interface/the-inspector/)
- Penpot’s workspace map: **Toolbar = create layers** (Board/Text/Image + shape/free-draw flyouts); **color/typography palettes** are separate docks; **Design properties** are a right sidebar; **Prototype / Inspect / View** are distinct modes in the top-right area. — [Penpot Help: Interface tour](https://help.penpot.app/user-guide/first-steps/the-interface/)
- Photoshop’s long-standing split: left **Tools panel** chooses *what tool*; top **Options bar** shows *settings for that tool* (brush size, opacity, etc.); fills/layers remain in panels. Adobe also documents a **Contextual Task Bar** for “most relevant next steps” after a tool is chosen. — [Adobe Help: Photoshop tools, options, and task bars](https://helpx.adobe.com/africa/photoshop/using/using-tools.html); [Adobe Learn: workspace basics](https://www.adobe.com/learn/photoshop/web/ps-basics-fundamentals)
- Storybook treats theme as a **global** (not a story arg), exposed via a **toolbar dropdown** that re-renders decorators — the canonical design-system sandbox pattern for palette/theme without mixing it into component controls. — [Storybook Docs: Toolbars & globals](https://storybook.js.org/docs/essentials/toolbars-and-globals/); [Storybook blog: theme switcher](https://storybook.js.org/blog/how-to-add-a-theme-switcher-to-storybook/)
- Material Design 3 distinguishes **docked toolbars** (global actions that stay the same) from **floating toolbars** (contextual/page actions), and on large screens allows **separate toolbars for different action kinds** (e.g. undo/redo vs edit tools) with stylistic differences to clarify hierarchy. — [Material Design 3: Toolbars](https://m3.material.io/components/toolbars/guidelines)

### Inferences
- For a UIMi **Design** authoring bar, map three scopes explicitly:
  1. **Document / kit chrome** — page identity, usage, export/copy stack (like Sketch Share / Webflow Publish / Storybook toolbar actions).
  2. **Global look** — palette, font, display, shell, glass on/off (like Storybook `globals.theme` + Framer theme toggle + Webflow interface theme, but here the “document under preview” *is* the themed kit).
  3. **Editing modes** — Paint / Move / Glass as a **single exclusive mode control** (like Figma Design/Draw/Dev or Photoshop tool selection), with mode-specific options deferred to a popover/inspector (like Photoshop Options bar), not dumped beside theme selects.
- Glass should stay a **preference + surface class**, not a fifth palette — consistent with how Webflow separates interface theme from site theme and how Storybook separates globals from component args.
- Never put theme/font/shell dropdowns in the same visual group as Paint/Move/Glass without a divider or labeled segment; pros use **spatial separation** (different bars/zones) more than micro-labels alone.

### Gaps
- No single 2024–2026 official “toolbar IA cookbook” comparing Figma/Framer/Webflow side-by-side; left/center/right conventions below are synthesized from product docs, not a published comparative study.
- Adobe XD is largely legacy post-sunset; current Adobe guidance cited is Photoshop-centric. Reliable recent XD authoring-bar primary docs were not found in this pass.
- Exact pixel/placement of Framer’s theme toggle vs insert tools is described in Academy copy but not fully diagrammed in the fetched lesson text.

---

## What labeling conventions work (section titles vs icons vs segmented controls)?

### Takeaway
Working bars use **icons for frequent familiar tools**, **short noun labels (or dynamic titles) for appearance globals**, **segmented/mode controls for mutually exclusive edit states**, and **optional icon+text** when learning cost is high — while avoiding mixed icon+text *inside one segment* and avoiding unlabeled icon dumps for nonstandard actions.

### Cited Findings
- Apple HIG (toolbars): prefer **simple recognizable symbols** over text except for actions poorly represented by symbols (e.g. Edit); keep **text-labeled actions separate** from symbol-only actions so they don’t read as one combined control; group by function/frequency; minimize number of groups. Leading = navigation/document; center = common useful controls (overflowable); trailing = always-available important actions + More. — [Apple HIG: Toolbars (mirrored docs)](https://apple-docs.everest.mt/docs/design/human-interface-guidelines/toolbars/); [HIG Doctor: Toolbars](https://apple.raintree.technology/topics/toolbars)
- Apple HIG (segmented controls): use for **closely related choices** affecting an object/state/view; prefer **either text or images — not a mix** in one control; use **nouns/noun phrases** with title-style capitalization; text-labeled segments usually need no intro label; icon segments may need labels below (esp. macOS). Don’t mix selection-state segments with action-performing segments in one control. — [Apple HIG: Segmented controls](https://apple-docs.everest.mt/docs/design/human-interface-guidelines/segmented-controls/)
- Figma UI3 invested heavily in **visible labels that match aria-labels**, after finding that icon-only / tooltip-dependent patterns hurt accessibility and slowed discovery (e.g. blend mode behind an icon forced waiting for a tooltip). Noun labels + directional tooltips was the revised pattern. — [Figma Blog: Designing UI3 — Labels section](https://www.figma.com/blog/our-approach-to-designing-ui3/)
- Sketch explicitly teaches discoverability: Control-click toolbar → **Icon & Text** to show names under items; toolbar is customizable. — [Sketch Blog: Getting to know the Sketch Interface](https://www.sketch.com/blog/sketch-interface/)
- Storybook toolbar globals recommend a **title** (e.g. “Theme”), an **icon**, and **`dynamicTitle: true`** so the control shows the *current* value — scannable state without opening the menu. Items can carry `title`, optional `right` adornment, and per-item icons. — [Storybook Docs: Toolbars & globals](https://storybook.js.org/docs/essentials/toolbars-and-globals/)
- Penpot keeps high-frequency creators (**Board, Text, Image**) as primary toolbar icons and groups lower-frequency relatives into **Shapes** and **Free-draw flyouts** (shipped in 2.18) — labeling by group name in the flyout rather than flattening every tool. — [Penpot Help: Interface tour](https://help.penpot.app/user-guide/first-steps/the-interface/); [Penpot 2.18 release notes](https://penpot.app/release-notes/2-18-born-this-way)
- UX Patterns Guide: toolbars should be a **labelled command region** with grouped buttons, toggles, menu buttons, separators, overflow, and visible pressed/disabled states; do **not** rely on tooltips as the only names for icon-only controls. — [UX Patterns Guide: Toolbar](https://uxpatternsguide.com/patterns/toolbar/)
- Material Design 3: be cautious of too many controls; show essential actions by default; overflow the rest. Multiple toolbars can use **stylistic differences** to emphasize different purposes. — [Material Design 3: Toolbars](https://m3.material.io/components/toolbars/guidelines)

### Inferences
- **Section titles** (small muted caps like “Theme” / “Edit” / “Export”) work well on a web kit authoring bar because the audience is intermittent (not daily Figma power users) — closer to Storybook’s titled globals than to Photoshop’s icon-only Tools panel.
- **Segmented control** fits Paint | Move | Glass (exclusive modes). Use **text segments** or **icon+caption under the group**, not icon-only + text mixed in one segment strip (Apple HIG).
- **Dropdowns with dynamic titles** fit palette/font/shell (Storybook pattern): closed state should read `Apricot` / `Inter` / `App shell`, not a generic “Theme” glyph.
- **Icons alone** are fine for export/copy/usage once learned, but pair with tooltip *and* accessible name; for first-run kit authors, prefer Icon & Text (Sketch) or labeled chips.
- Do not use a segmented control for theme *and* for paint mode in the same visual weight — different control types reinforce different mental models (preference vs tool).

### Gaps
- Official Apple developer.apple.com HIG pages sometimes block or mirror; guidance above is from widely cited HIG mirrors and secondary summaries — wording should be verified against the live Apple HIG if legal/compliance quoting is required.
- Limited primary research on whether **visible section headers inside a single horizontal bar** outperform **separator-only grouping** in A/B studies; NN/g material found in this pass focuses more on chrome ratio and overflow than section-title typography.

---

## How do they handle density / wrap / overflow on narrow widths?

### Takeaway
Pros treat overflow as a **priority-ordered collapse** into menus/flyouts/Minimize-UI — not wrapping into multi-row “control lasagna.” Essential trailing/leading actions stay put; center/secondary clusters collapse first; wrapping is rare for authoring toolbars.

### Cited Findings
- Apple HIG: define which items move to overflow as the toolbar narrows; on macOS/iPadOS the **system manages center-area overflow** — don’t invent a duplicate overflow; **trailing-edge items remain visible** at all window sizes; avoid layouts that overflow *by default*. — [Apple HIG: Toolbars](https://apple-docs.everest.mt/docs/design/human-interface-guidelines/toolbars/)
- Material Design 3 floating toolbars: if items don’t fit, put them in an **overflow menu in the trailing slot**; as breakpoints expand, reveal more actions; **don’t let the floating toolbar exceed the window edge**; trailing actions collapse first. Docked vs floating variants imply different density strategies. — [Material Design 3: Toolbars](https://m3.material.io/components/toolbars/guidelines)
- Material / Android top app bars: excess actions go to overflow; `showAsAction="ifRoom"` vs `"never"` encodes priority; actions consolidate **right-to-left** so the most-used action is last to disappear. — [Material Design 2: App bars top](https://m2.material.io/components/app-bars-top); [Android Developers: Add actions](https://developer.android.com/develop/ui/views/components/appbar/actions)
- PatternFly toolbar guidelines: surface ≤2 primary actions; park the rest in a kebab overflow; on small viewports collapse filters into a toggle group and actions into overflow; keep bulk selector/sort if critical. — [PatternFly: Toolbar design guidelines](https://www.patternfly.org/components/toolbar/design-guidelines/)
- NN/g: overflow menus are recognizable but **hiding key actions hurts usability** — use for secondary actions; on small screens hiding chrome can be necessary to preserve content-to-chrome ratio, but on large screens hiding the same chrome is usually not worth the discovery cost. — [NN/g: Overflow Menu Icons](https://www.nngroup.com/videos/overflow-menu-icons/); [NN/g: Content-to-chrome ratio](https://www.nngroup.com/articles/content-chrome-ratio/)
- Figma UI3 added **Minimize UI** to collapse side panels for small/split-screen work rather than wrapping chrome; floating panels were rolled back for Design because they cramped small screens and slowed experts. — [Figma Blog: Designing UI3](https://www.figma.com/blog/our-approach-to-designing-ui3/); [Figma Help: navigation / Minimize UI](https://help.figma.com/hc/en-us/articles/360039831974-Explore-the-navigation-bar-and-left-sidebar)
- Webflow states a hard **minimum designer width of 1268px** (left + right toolbars + canvas) — authoring density is solved by **requiring desktop width**, not by wrapping the chrome. — [Webflow Help: Intro to Webflow](https://help.webflow.com/hc/en-us/articles/33961260162323-Intro-to-Webflow)
- Penpot densifies the create toolbar via **flyouts** (shapes / free-draw) instead of showing every tool at once. — [Penpot 2.18 release notes](https://penpot.app/release-notes/2-18-born-this-way)
- Photoshop nests related tools under one Tools-panel slot (triangle flyout) and keeps options in a separate bar — density via **nesting + context**, not multi-line wrapping. — [Adobe Help: Photoshop tools](https://helpx.adobe.com/africa/photoshop/using/using-tools.html)
- UX Patterns Guide: define **overflow priority before responsive collapse**; overflow should retain labels, grouping, and object scope; don’t clip labels/focus rings unpredictably. — [UX Patterns Guide: Toolbar](https://uxpatternsguide.com/patterns/toolbar/)

### Inferences
- Recommended collapse order for a UIMi Design bar on narrow widths:
  1. Hide/compact **section titles** first (keep controls).
  2. Collapse **font / shell / secondary appearance** into a single “Appearance” menu.
  3. Keep **palette** (or current dynamic title) + **mode segment** + **primary export** visible longest.
  4. Park Paint/Move/Glass *options* (gear, presets) in overflow before parking the mode switch itself.
  5. Prefer **one horizontal row + overflow** over wrapping to 2–3 rows (pros don’t wrap authoring toolbars).
- For kit catalog use (often wide desktop), still define overflow priorities — split-screen and embedded previews are common (Figma’s stated reason for Minimize UI).
- Do not copy Webflow’s 1268px floor blindly for a *preview* Design bar; do copy the idea that **authoring chrome is desktop-first** and shouldn’t try to be a phone UI.

### Gaps
- Few public specs document exact breakpoint pixel values for Figma/Framer/Sketch toolbar collapse behavior.
- Chromatic’s toolbar/theme UI specifics were not fetched as primary docs in this pass (Storybook globals cover the dominant design-system sandbox pattern).

---

## What anti-patterns make bars feel like an undifferentiated control dump?

### Takeaway
Bars feel like dumps when they **mix scopes** (nav + theme + tools + publish), **flatten hierarchy** (no groups/separators/modes), **hide meaning** (icon-only nonstandard actions), and **overflow without priority** (or wrap chaotically) — pros fix this with zone separation, exclusive modes, labeled globals, and deliberate density limits.

### Cited Findings
- Material Design 3 explicitly warns: **don’t overwhelm people with too many controls**; choose essential on-screen actions; use overflow for the rest; don’t stretch a floating toolbar with empty space. — [Material Design 3: Toolbars](https://m3.material.io/components/toolbars/guidelines)
- UX Patterns Guide anti-patterns: unrelated actions sharing one toolbar “just because they share horizontal space”; tooltip-only naming; overflow that hides essentials or **changes command order unpredictably**; responsive layouts that clip labels/focus. — [UX Patterns Guide: Toolbar](https://uxpatternsguide.com/patterns/toolbar/)
- Apple HIG: overcrowding; mixing text-labeled and symbol actions adjacently (reads as one control); inventing a custom overflow when the system already provides one; putting too many customizable items on the leading edge. — [Apple HIG: Toolbars](https://apple-docs.everest.mt/docs/design/human-interface-guidelines/toolbars/)
- Figma UI3 post-mortem: putting blend mode behind a cryptic icon **slowed workflows** (tooltip dependency); hiding clip-content behind extra clicks also failed — clarity/efficiency beat minimalism theater. Feature Tetris in one region was called out as a pre-redesign pain. — [Figma Blog: Designing UI3](https://www.figma.com/blog/our-approach-to-designing-ui3/)
- NN/g: stuffing chrome until content-to-chrome collapses; conversely, over-hiding primary actions into overflow/hamburgers increases discovery cost — especially on large screens where the chrome would have fit. — [NN/g: Content-to-chrome ratio](https://www.nngroup.com/articles/content-chrome-ratio/); [NN/g: Overflow Menu Icons](https://www.nngroup.com/videos/overflow-menu-icons/)
- PatternFly: exposing 3+ peer actions without overflow crowds the bar; putting a lone item in overflow is also awkward — design the visible vs overflow split intentionally. — [PatternFly: Toolbar](https://www.patternfly.org/components/toolbar/design-guidelines/)
- Webflow’s multi-bar architecture is itself evidence against a single dump: top vs canvas vs left vs right each own a job. Putting Publish next to Style inputs would break that model. — [Webflow Help: Intro to Webflow](https://help.webflow.com/hc/en-us/articles/33961260162323-Intro-to-Webflow)
- Storybook’s model warns against locking globals carelessly at story level (disables exploration) — analogous anti-pattern: freezing theme controls inside an edit mode so authors can’t scan appearance independently. — [Storybook Docs: Toolbars & globals](https://storybook.js.org/docs/essentials/toolbars-and-globals/)

### Inferences — anti-patterns checklist for UIMi Design bar
- **Scope soup**: theme + paint + move + glass + export + page nav in one unlabeled flex row.
- **False peers**: treating “Apricot palette” and “Paint mode” as the same kind of chip.
- **Icon salad**: custom glyphs for Glass/Paint/Shell with no text, no grouping, tooltip-only names.
- **Always-wrap**: multi-line bar that reflows randomly so muscle memory dies.
- **Priority-free overflow**: last item in the DOM disappears first regardless of importance.
- **Authoring chrome shipped as product**: studio controls that look like the theme itself (related product rule: `.uimi-studio` is not the theme).
- **All presets at once**: exposing Regular + Clear + Chrome + Thick glass together as equal toggles (mode dump).
- **Duplicate theme axes**: separate “Apricot LG” vs “Apricot solid” themes instead of palette × glass.

### Inferences — scannable target IA for UIMi Design bar
| Zone | Put here | Control type |
| --- | --- | --- |
| **Left** | Kit/document identity, optional usage switch | Text / select |
| **Center-left** | Global look: palette, font, display, shell | Dropdowns with **dynamic titles**; optional muted “Theme” group label |
| **Center** | Exclusive edit modes: Paint \| Move \| Glass | **Segmented control** (one active); gear/presets as overflow of the mode |
| **Right** | Export / copy / snippet stack | Buttons or button+menu; stay visible longest |

Separators or subtle group labels between the three control families; collapse center-left appearance extras before center mode before right export.

### Gaps
- No quantitative study found (2023–2026) measuring “control dump” perception specifically for design-tool top bars; anti-patterns above are triangulated from HIG “don’ts,” Figma redesign rationale, and component guidelines.
- Direct screenshots of Chromatic / every design-system sandbox theme switcher were not archived in this note set; Storybook remains the best-documented pattern.

---

## Source index (primary / high-signal)

| Source | URL |
| --- | --- |
| Figma UI3 design writeup | https://www.figma.com/blog/our-approach-to-designing-ui3/ |
| Figma toolbar tools | https://help.figma.com/hc/en-us/articles/360041064174-Access-design-tools-from-the-toolbar |
| Figma nav / Minimize UI | https://help.figma.com/hc/en-us/articles/360039831974-Explore-the-navigation-bar-and-left-sidebar |
| Webflow Designer chrome | https://help.webflow.com/hc/en-us/articles/33961260162323-Intro-to-Webflow |
| Webflow interface themes | https://webflow.com/updates/light-and-dark-themes-across-webflow |
| Framer interface | https://www.framer.com/academy/lessons/framer-interface |
| Sketch toolbar | https://www.sketch.com/docs/interface-and-settings/the-mac-app-interface/the-toolbar/ |
| Sketch Inspector | https://www.sketch.com/docs/interface-and-settings/the-mac-app-interface/the-inspector/ |
| Penpot interface | https://help.penpot.app/user-guide/first-steps/the-interface/ |
| Penpot 2.18 toolbar flyouts | https://penpot.app/release-notes/2-18-born-this-way |
| Photoshop tools / options bar | https://helpx.adobe.com/africa/photoshop/using/using-tools.html |
| Storybook toolbars & globals | https://storybook.js.org/docs/essentials/toolbars-and-globals/ |
| Material 3 toolbars | https://m3.material.io/components/toolbars/guidelines |
| Apple HIG toolbars (mirror) | https://apple-docs.everest.mt/docs/design/human-interface-guidelines/toolbars/ |
| Apple HIG segmented controls (mirror) | https://apple-docs.everest.mt/docs/design/human-interface-guidelines/segmented-controls/ |
| NN/g content-to-chrome | https://www.nngroup.com/articles/content-chrome-ratio/ |
| PatternFly toolbar | https://www.patternfly.org/components/toolbar/design-guidelines/ |
| UX Patterns Guide toolbar | https://uxpatternsguide.com/patterns/toolbar/ |
