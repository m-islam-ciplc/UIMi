# Look settings vs tools/modes in authoring control bars

Research scope: information architecture and UX patterns for separating **appearance/look** controls from **tools/modes** in horizontal authoring bars (e.g. UIMi Design bar: Theme / UI / Headings / Usage / Paint / Move / Glass). Sources emphasize NN/g progressive disclosure & chunking, Apple HIG / Material / Fluent toolbars, Figma UI3 properties IA, and ARIA toolbar grouping.

Current UIMi Design bar inventory (for the closing IA map): shell Sidebar|Navbar; Theme, UI, Headings, Usage `<select>`s; Paint/Move mode chips (Off + Undo/Save/Clear + status meta); Glass Off|On + explanatory meta + Clear.

---

## What IA buckets do experts recommend (Appearance / Layout / Tools / Export)?

### Takeaway
Experts do not prescribe a single universal “Appearance / Layout / Tools / Export” taxonomy, but they consistently recommend **few logical groups by function and frequency**, with **look/settings** separated from **task modes/actions**, and overflow or secondary surfaces for low-frequency controls.

### Cited Findings
- Apple HIG toolbars: “Group toolbar items logically by function and frequency of use”; minimize the number of groups; keep navigation/critical actions in dedicated, familiar, visually distinct sections; leading / center / trailing zones have different roles (document commands vs common controls vs More / primary action). — [Apple HIG Toolbars (HIG Doctor mirror)](https://apple.raintree.technology/topics/toolbars); canonical: [Apple Developer — Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars)
- Apple Settings HIG: put **general, infrequently changed** options in Settings; keep **task-specific** options (show/hide view parts, reorder, filter) **in the task UI** so users do not leave context. Avoid stuffing Settings into a window toolbar because it crowds frequent commands. — [Apple HIG Settings (mirror)](https://apple-docs.everest.mt/docs/design/human-interface-guidelines/settings/)
- NN/g progressive disclosure: show only a few important options first; defer specialized options to a secondary surface with clear “information scent”; prefer **at most two disclosure levels**; if many features remain, **chunk advanced features into groups** so users can ignore irrelevant areas. — [NN/g — Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)
- NN/g chunking: group related tools in a crowded application toolbar so users remember where to find them; use proximity, background, rules, and white space to show what is related. Do **not** hard-cap menus/toolbars at “seven items” (Miller’s number is about short-term memory for recall, not always-visible recognition UIs). — [NN/g — How Chunking Helps Content Processing](https://www.nngroup.com/articles/chunking/)
- Figma UI3: separated **slim tool toolbar** (tools for creating/editing on canvas) from **properties panel** (attributes of selection); reordered properties so **higher-order system controls** (component variants/instances) sit above low-level attributes (color/size); merged layout-related options into one panel; made UI hideable/collapsible so canvas is primary. — [Figma Blog — Behind our redesign (UI3)](https://www.figma.com/blog/behind-our-redesign-ui3/); [Figma Blog — Making the Move to UI3](https://www.figma.com/blog/making-the-move-to-ui3-a-guide-to-figmas-next-chapter/)
- Material Design 3 toolbars: use toolbars for page/contextual actions; when actions do not fit, put them in a menu; on large screens, dividers can organize large item sets; multiple toolbars can separate different kinds of actions (e.g. undo/redo vs edit tools) with stylistic distinction — but not on compact windows. — [Material Design 3 — Toolbars guidelines](https://m3.material.io/components/toolbars/guidelines)
- Fluent CommandBar / Toolbar: primary items vs overflow/secondary items vs far items; dividers (`ToolbarDivider` / `CommandBarSeparator`) mark logical groups; optional aria labels for primary/secondary groups. — [Fluent UI CommandBar → Toolbar migration](https://storybooks.fluentui.dev/react/?path=%2Fdocs%2Fconcepts-migration-from-v8-components-commandbar-migration--docs); [Fluent PR — primary/secondary group labels](https://github.com/microsoft/fluentui/pull/19280); [fluent_ui CommandBarSeparator](https://pub.dev/documentation/fluent_ui/latest/fluent_ui/CommandBarSeparator-class.html)

### Inferences
- A practical authoring-bar taxonomy that maps well to expert guidance is: **Appearance (look)** · **Layout/chrome** · **Modes/tools** · **Catalog/export helpers** — not because those four names are canonical, but because they separate *persistent look preferences* from *ephemeral interaction modes* from *meta authoring utilities*.
- “Export” in product apps often belongs in a document menu / trailing More menu (Apple), not mixed with theme picks. UIMi’s **Usage** (HTML/React/…) is closer to **catalog/export context** than to Appearance.
- Settings-like look controls that change often during authoring (palette while designing a kit) legitimately stay **in-bar**, per Apple’s “task-specific options stay in the task” rule — but they should still be **chunked apart** from Paint/Move tools.

### Gaps
- No primary source was found that endorses the exact four-bucket labels “Appearance / Layout / Tools / Export” as an industry standard for design-studio bars; those names are a synthesis for UIMi, not a quoted standard.
- Apple’s live HIG Toolbars page returned minimal content via fetch; grouping rules cited above come from the structured HIG Doctor mirror (snapshot noted as 2025-02-02) plus Apple Settings guidance.

---

## How should On/Off modes (Paint, Move, Glass) be visually distinct from theme selects?

### Takeaway
Treat **theme/font selects as persistent Appearance settings** (dropdowns or compact selects) and treat **Paint/Move as modal tools** (toggle buttons with pressed state + progressive disclosure of secondary actions). Treat **Glass as a master appearance switch** (binary toggle / segmented Off·On), not as another paint-like tool and not as a fifth theme option.

### Cited Findings
- Chrome Modern Web Guidance toolbar: distinguish control types in markup/ARIA — **toggle buttons** use `aria-pressed` and must **not** change their accessible name when toggled; **action buttons** (undo, save) do **not** get `aria-pressed`; mutually exclusive sets use pressed state with exactly one true; wrap related controls in `role="group"` with `aria-label`, divide with `role="separator"`. — [Chrome — Toolbar UI component guide](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-components/toolbar)
- Primer Segmented Control: use for 2–5 mutually exclusive choices applied **immediately**; for **binary on/off**, other systems explicitly prefer a **Toggle/Switch** over segmented control (Toyota DX / Accor usage). Segmented control is for view/mode switches among a small static set, not for large option lists (use dropdown). — [Primer — Segmented control](https://primer.github.io/design/components/segmented-control/); [Toyota DX Playbook — Segmented control](https://dx-playbook.toyota-europe.com/cds/components/forms/segmented-control/); [Accor — Segmented Control usage](https://design.accor.com/latest/web/core-components/segmented-control/usage-DeU1gQ3P)
- Chip usage guidance: chips are for compact selection/filtering, not as a substitute for primary action buttons; do **not** use a filter chip for binary on/off — use a Switch; do not mix filter, navigation, and action chips in one row. — [AIA Design — Chip](https://design.aia.com/component/chip); [BlaBlaCar/Supernova Chip usage](https://pixar.supernova-docs.io/latest/components/actions/chip/usage-lRmJk8wJ)
- Apple Reduce Transparency: system **master switch** that replaces translucent/blurred backgrounds with solid ones for readability — separate from wallpaper/theme choice; lives under Accessibility / Display, not as another “theme.” — [Apple Support — iPhone display colors / Reduce Transparency](https://support.apple.com/guide/iphone/change-display-colors-iph3e2e1fb0/ios); [Apple Support — Mac Accessibility Display](https://support.apple.com/guide/mac-help/change-display-settings-for-accessibility-unac089/mac)
- Material M3: a **vibrant** toolbar color scheme can indicate a **temporary change in page behavior, such as entering edit mode** — useful signal that a mode is active vs. calm “standard” chrome for settings. Emphasize **one** high-priority action at a time. — [Material Design 3 — Toolbars](https://m3.material.io/components/toolbars/guidelines)
- Figma UI3: tools live in a dedicated slim toolbar; object look attributes live in the properties panel; optional property **labels** help newcomers without permanently expanding every control. — [Figma Blog — UI3 redesign](https://www.figma.com/blog/behind-our-redesign-ui3/)
- NN/g icon usability: icon-only controls need **visible** text labels when meaning is ambiguous; do not rely on hover alone (fails on touch). — [NN/g — Icon Usability](https://www.nngroup.com/articles/icon-usability/)

### Inferences
- **Visual recipe for distinction:**
  1. **Appearance selects** (Theme, UI, Headings): labeled dropdowns/`<select>` — calm, always available, no “armed” chrome.
  2. **Master switch** (Glass): Switch or 2-segment Off|On adjacent to Appearance; short noun label “Glass”; secondary preset/gear only **after** On (progressive disclosure). Matches Reduce Transparency mental model and UIMi’s own rule that glass ≠ a palette.
  3. **Modal tools** (Paint, Move): toggle that shows **armed/edit-mode** styling when On (Material “vibrant” / filled pressed state); reveal Undo / Save / Clear / counts **only while On** (or in a compact overflow under the tool).
- Using the **same chip styling** for Theme-adjacent Glass Off/On, Paint Off, and Paint Undo/Save/Clear collapses three different interaction types (setting, mode, actions) into one visual language — experts advise against mixing chip roles in one row.
- Dropdowns fit Theme/UI/Headings/Usage (many or long labels, infrequent compare-across-all); segmented controls fit Shell Sidebar|Navbar and optionally Glass Off|On if kept to two short labels; switches fit single binary Glass if space is tight.

### Gaps
- No controlled study was found that A/B tests “chips for everything” vs. “selects + switch + mode toggle” specifically for design-kit studio bars.
- Apple HIG does not document “Liquid Glass” as a product-theme control; Reduce Transparency is the closest **primary** analogy for a glass master switch.

---

## How many controls before a bar should collapse into panels/menus?

### Takeaway
There is **no magic integer**. Collapse when the bar is **overcrowded**, when controls are **low-frequency or advanced**, or when **width shrinks** — using overflow/More menus, progressive disclosure, and (for attribute-heavy look controls) a properties/settings panel. Prefer **few visible groups** over a flat dump.

### Cited Findings
- Apple HIG: choose items deliberately to **avoid overcrowding**; add a **More** menu for additional actions; center-area items can **automatically collapse into a system-managed overflow** as the window shrinks; trailing edge keeps important always-available items + More. Minimize the number of groups. — [Apple HIG Toolbars (mirror)](https://apple.raintree.technology/topics/toolbars)
- Material top app bars / M3 toolbars: put most-used actions first; remaining/secondary actions go to **overflow**; as width shrinks, actions move into overflow (typically least-used first); floating toolbars must stay on-screen — excess actions → overflow menu; “Don’t overwhelm people with too many controls.” — [Material M2 — Top app bars](https://m2.material.io/components/app-bars-top); [Material M3 — Toolbars](https://m3.material.io/components/toolbars/guidelines)
- Android App Bar: `showAsAction="ifRoom"` vs `"never"` — important actions visible if space permits; settings-like items can be **forced** into overflow. — [Android Developers — Add and handle actions](https://developer.android.com/develop/ui/views/components/appbar/actions)
- Fluent CommandBar: split **primary `items`**, always-overflow **`overflowItems`**, and fixed **`farItems`**; on resize, primary items reduce into overflow. — [Fluent CommandBar types](https://app.unpkg.com/office-ui-fabric-react@7.181.0/files/lib/components/CommandBar/CommandBar.types.d.ts); [Fluent v9 Overflow migration notes](https://storybooks.fluentui.dev/react/?path=%2Fdocs%2Fconcepts-migration-from-v8-components-commandbar-migration--docs)
- NN/g progressive disclosure: primary surface should include what users **frequently** need, but not so many that attention fails; secondary via clear Advanced/More; multiple secondary entry points add initial-level complexity. — [NN/g — Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)
- NN/g chunking: do **not** misuse “magical number seven” as a hard toolbar item limit; structure and meaning matter more than raw count for always-visible options. — [NN/g — Chunking](https://www.nngroup.com/articles/chunking/)
- Figma UI3: radical minimal hover-only UI felt **too unstable**; landed on **collapsible/resizable panels** + slim toolbar so complexity moves off the persistent chrome without disappearing. — [Figma Blog — UI3 redesign](https://www.figma.com/blog/behind-our-redesign-ui3/)
- WAI-ARIA APG: use `toolbar` only for groups of **3+ controls**; toolbars reduce tab stops when implemented with roving tabindex / arrow navigation. — [WAI-ARIA APG — Toolbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)

### Inferences
- **Practical thresholds for a studio bar like UIMi (heuristic, not a cited constant):**
  - **~3–5 always-visible primary chunks** (e.g. Appearance · Layout · Modes · More) before scanning cost rises — aligned with “minimize groups” + progressive disclosure, not Miller’s 7.
  - **Per group:** keep 1 master control visible; park secondary actions (Undo/Save/Clear, glass presets, counts) behind mode-on disclosure or a “…” menu.
  - **Width-driven:** implement overflow when controls wrap or collide (Apple/Material/Fluent pattern) rather than waiting for a fixed N.
  - **Attribute depth:** if Appearance grows (many fonts, glass presets, paint tokens), follow Figma — move detail into a **panel/popover**, keep the bar for entry points + mode toggles.
- UIMi’s current flat row (shell + 4 selects + Paint cluster + Move cluster + Glass cluster + inline sentences) already exceeds “few primary options” progressive-disclosure guidance even if individual controls are useful.

### Gaps
- Neither Apple, Material, nor NN/g publishes a validated numeric cutoff such as “collapse after N controls.” Any number used in product decisions should be treated as a design heuristic and validated with usage or usability testing.
- No public frequency telemetry for UIMi Design bar controls was available for this research pass.

---

## Best practices for helper microcopy length in toolbars (keep short / move to tooltips)?

### Takeaway
Keep **persistent toolbar microcopy extremely short** (group labels, control names). Move explanatory sentences and “why” copy into **tooltips or captions accessed on demand**. Never hide **task-critical** instructions only in tooltips; never duplicate the visible label in a tooltip.

### Cited Findings
- NN/g tooltip guidelines: tooltips are for **additional**, non-vital explanation; keep content **brief** (microcontent); do not put instructions required to complete the task only in a tooltip; do not use redundant tooltips that repeat the button label; support keyboard as well as mouse hover; tooltips are weak on touch. — [NN/g — Tooltip Guidelines](https://www.nngroup.com/articles/tooltip-guidelines/)
- NN/g icon usability: prefer **always-visible** labels over tooltip-only labels for icons/navigation; hover-revealed labels increase interaction cost and fail on touch. — [NN/g — Icon Usability](https://www.nngroup.com/articles/icon-usability/)
- Primer segmented control: optional **caption** may explain effect of selection but “should be as short as possible”; visible or SR-only label is required. — [Primer — Segmented control](https://primer.github.io/design/components/segmented-control/)
- Figma UI3: optional **property labels** can be toggled on for learnability and off for density — progressive disclosure of helper text at the chrome level. — [Figma Blog — UI3](https://www.figma.com/blog/behind-our-redesign-ui3/); [Making the Move to UI3](https://www.figma.com/blog/making-the-move-to-ui3-a-guide-to-figmas-next-chapter/)
- Chrome toolbar guide: icon-only buttons need `aria-label`; tooltips do **not** replace the accessible name; tooltips for icon-only are supplemental (`title` / hint popover). — [Chrome — Toolbar guide](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-components/toolbar)
- WAI-ARIA APG toolbar: provide accessible name via `aria-labelledby` (visible label) or `aria-label`. — [APG — Toolbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/); [MDN — toolbar role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role)

### Inferences
- Inline copy like UIMi’s `On = use glass · Off = solid theme` is **too long for a dense horizontal bar**; it is a good **tooltip or first-run caption**, not a permanent sibling of Off/On chips.
- Status meta (`0 picks`, `Unsaved`) is operational feedback — keep **short**, show only when relevant (mode on / dirty), and prefer a live region for SR users when Save/Copy-like actions fire (Chrome guidance).
- Group labels (“Paint”, “Theme”) should stay visible; explanatory clauses move out.

### Gaps
- No NN/g article gives a character-count limit for toolbar helper text; “brief” is qualitative.
- Touch-first studio use would need popup tips / toggletips instead of hover tooltips — not fully specified for UIMi’s current desktop-oriented bar.

---

## Control-type chooser: dropdowns vs segmented controls vs chips (cross-cutting)

### Takeaway
**Dropdown/select** for 5+ or long-labeled mutually exclusive options; **segmented control** for 2–5 short, equal, always-visible exclusive choices applied immediately; **switch** for a single binary setting; **chips** sparingly for filters/actions — not as the default chrome for mixed setting+mode+action rows.

### Cited Findings
- Primer: segmented control 2–5 text choices (≤6 icon-only); more → radio group or dropdown; immediate apply; not a toolbar role. — [Primer — Segmented control](https://primer.github.io/design/components/segmented-control/)
- Toyota DX / Accor: 2–3 (up to 5) options for segmented; binary on/off → Toggle; multi-select → chips/checkboxes; many/long labels → dropdown. — [Toyota DX Playbook](https://dx-playbook.toyota-europe.com/cds/components/forms/segmented-control/); [Accor Segmented Control](https://design.accor.com/latest/web/core-components/segmented-control/usage-DeU1gQ3P)
- AIA Chip comparison: dropdown when more than ~6 options; switch for two opposing states; chips for 2–9 short horizontal options. — [AIA Design — Chip](https://design.aia.com/component/chip)

### Inferences
| UIMi control | Recommended pattern |
| --- | --- |
| Theme / UI / Headings / Usage | Dropdown/`<select>` (already correct) |
| Shell Sidebar \| Navbar | Segmented control (already close) |
| Glass Off \| On | Switch **or** 2-segment control; not action chips |
| Paint / Move armed state | Toggle button (`aria-pressed`) |
| Undo / Save / Clear | Action buttons; disclose when mode On |
| Glass Clear / counts | Secondary; disclose when Glass On |

### Gaps
- Design-system pages disagree slightly on segmented max (4 vs 5) and whether binary Off/On should be segmented vs switch; both are acceptable if visually distinct from action chips.

---

## Accessibility notes (ARIA toolbar, group labeling)

### Takeaway
Name the whole Design bar, name each **group**, separate groups with **separators**, and encode mode vs action correctly (`aria-pressed` only on true toggles). Prefer visible group labels wired with `aria-labelledby` when present.

### Cited Findings
- APG Toolbar: container `role="toolbar"`; label via `aria-labelledby` or `aria-label`; use toolbar for **3+** controls; implement arrow-key navigation / single tab stop for benefit. — [APG — Toolbar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)
- MDN: if more than one toolbar exists, each needs a label. — [MDN — toolbar role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/toolbar_role)
- Chrome toolbar guide: `role="group"` + `aria-label` per cluster; `role="separator"` `aria-orientation="vertical"` between groups; do not `display:none` separators that should remain in the a11y tree. — [Chrome — Toolbar guide](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-components/toolbar)
- Fluent: primary/secondary command groups can expose group aria labels. — [Fluent PR #19280](https://github.com/microsoft/fluentui/pull/19280)

### Inferences
- UIMi already uses `aria-label` on the aside and some groups — extend that to **Appearance** / **Layout** / **Tools** buckets and add visual+semantic separators between look settings and modes.
- If the Design bar becomes a true `role="toolbar"`, avoid putting the Usage select and long helper text inside the same roving-tabindex toolbar without testing — selects and text fields are awkward in arrow-key toolbars (APG warns about controls that need arrow keys).

### Gaps
- Whether UIMi’s entire `.uimi-studio` should be one `toolbar` vs. a labeled `group`/`region` containing nested toolbars was not settled by a single authority; Chrome’s guide assumes a composite toolbar of buttons, while UIMi mixes `<select>`s and mode clusters.

---

## Recommended IA map for UIMi Design bar specifically

### Takeaway
Split the flat Design bar into **four chunks** with separators: **Layout** · **Appearance** (includes Glass master switch) · **Tools** (Paint / Move modes with progressive disclosure) · **Catalog** (Usage). Collapse secondary actions and long helper copy out of the always-visible row.

### Cited Findings
- Synthesis grounded in: grouping by function/frequency ([Apple Toolbars](https://apple.raintree.technology/topics/toolbars)); progressive disclosure + chunking ([NN/g Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/), [NN/g Chunking](https://www.nngroup.com/articles/chunking/)); tools vs properties split ([Figma UI3](https://www.figma.com/blog/behind-our-redesign-ui3/)); glass as independent transparency preference ([Apple Reduce Transparency](https://support.apple.com/guide/iphone/change-display-colors-iph3e2e1fb0/ios)); overflow for secondary ([Material Toolbars](https://m3.material.io/components/toolbars/guidelines), [Fluent CommandBar](https://storybooks.fluentui.dev/react/?path=%2Fdocs%2Fconcepts-migration-from-v8-components-commandbar-migration--docs)); short microcopy / tooltips ([NN/g Tooltip Guidelines](https://www.nngroup.com/articles/tooltip-guidelines/)); group labeling ([APG Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/), [Chrome Toolbar guide](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-components/toolbar)).

### Inferences

#### Proposed structure (left → right)

```
[ Design ]
│ Layout          │ Appearance                    │ Tools                         │ Catalog
│ Shell: Sidebar│ │ Theme ▾  UI ▾  Headings ▾    │ Paint [Off]  Move [Off]       │ Usage ▾
│ Navbar        │ │ Glass ⏻ Off—On  [⚙ if On]   │ (Undo/Save/Clear only if On)  │
```

| Bucket | Controls | Pattern | Always visible? |
| --- | --- | --- | --- |
| **Layout** | Shell Sidebar \| Navbar | Segmented control | Yes |
| **Appearance** | Theme, UI typeface, Headings typeface | Labeled dropdowns | Yes |
| **Appearance** | Glass Off \| On | Switch or 2-segment; **not** a theme option | Yes (master only) |
| **Appearance / secondary** | Glass presets (Regular/Clear/…), Clear glass marks, counts, gear/modal | Popover / gear **after Glass On** | No |
| **Tools** | Paint mode, Move mode | Toggle (`aria-pressed`); distinct “armed” style when On | Yes (toggles only) |
| **Tools / secondary** | Undo, Save, Clear, pick/move counts, Unsaved | Reveal when that mode is On, or under tool overflow | No |
| **Catalog** | Usage (HTML/React/Vue/Svelte) | Dropdown; visually separated from Appearance | Yes or in More if width-constrained |

#### Sectioning & separators
- One visible **section label** or `role="group"` aria name per bucket: Layout, Appearance, Tools, Catalog.
- Vertical **separator** between buckets (Chrome/Fluent pattern).
- Do **not** place Glass beside Paint/Move; Glass is Appearance (look preference), Paint/Move are Tools (interaction modes).

#### Primary vs secondary
- **Primary:** Shell, Theme, Glass master, Paint toggle, Move toggle (± Usage).
- **Secondary:** font pairing detail if Theme is enough for most sessions; glass preset/gear; Undo/Save/Clear; status counts; long explanations.
- **Trailing More / overflow** when width shrinks: collapse Catalog first, then Headings/UI into an “Type” submenu, keep Theme + Glass + active tool toggles longest (Material/Apple frequency rule).

#### Master switch (Glass)
- Model after **Reduce Transparency**: one On/Off controlling whether glass surfaces are in play; presets are refinement, not parallel themes.
- Tooltip (not inline sentence): e.g. “When on, selected surfaces use liquid glass; theme colors stay the same.”

#### Microcopy
- Keep group + control labels (1–2 words).
- Move `On = use glass · Off = solid theme` → tooltip/`title`/caption.
- Show `Unsaved` / counts only in active tool cluster.

#### A11y sketch
- `aria-label="Design settings"` (or `aria-labelledby` → visible “Design”).
- Groups: `aria-label="Layout"`, `"Appearance"`, `"Tools"`, `"Catalog"`.
- Separators between groups; Paint/Move toggles use `aria-pressed`; Undo/Save/Clear do not.

### Gaps
- This IA map is a **recommendation synthesized for UIMi**, not a layout published by NN/g or Apple. Validate with a quick usability pass (can users find Glass without confusing it with Theme? do they discover Paint secondary actions when disclosed?).
- Exact overflow priority and whether Usage belongs in-bar vs. copy/export chrome should follow measured use frequency once available.
