# Pastel UI palette — accessibility & semantic distinguishability

**Scope:** Functional assessment of the Pastel UI hex set — fill/ink contrast, status-color separability (including color-vision deficiency), washout on warm off-whites, chrome text, and concrete hex-level adjustments that keep a soft multi-hue pastel look.

**Method note:** WCAG 2.x contrast ratios below were computed locally from relative luminance using the W3C formula `(L1+0.05)/(L2+0.05)`. Approximate CIE Lab ΔE76 and Machado-like CVD matrix simulations were also computed locally. Official WebAIM / APCA web calculators were not available in this environment; APCA Lc values are approximate (APCA 0.1.9-style coefficients) and should be verified in [APCA Contrast Calculator](https://apcacontrast.com/) or [Myndex APCA](https://www.myndex.com/APCA/) before shipping.

**Palette under test**

| Role | Fill | Ink |
| --- | --- | --- |
| Primary | `#e8a598` | `#2a1612` |
| Info | `#8fb4e0` | `#142238` |
| Success | `#8fbf9a` | `#14261a` |
| Warning | `#e0c06a` | `#3a2e10` |
| Danger | `#e08a9e` | `#2a1218` |
| Chrome | `#c97b8a` | `#fff8f6` (light) |
| Background / surface | `#fcf7f6` / `#fff5f7` | — |

---

## Approximate WCAG contrast for each fill/ink pair (and filled button text)

### Takeaway
All five semantic fill/ink pairs clear WCAG 2.2 AA for normal text (≥4.5:1); four of five also clear AAA (≥7:1). The chrome + light-ink pair fails AA (and even the 3:1 large-text threshold by the “do not round” rule). Pastel fills vs page background sit far below the 3:1 non-text threshold if the fill alone must identify a control or status graphic.

### Cited Findings
- WCAG 2.2 Level AA (SC 1.4.3) requires text contrast of at least **4.5:1** (normal) and **3:1** (large text: ≥18pt / 14pt bold); Level AAA (SC 1.4.6) requires **7:1** / **4.5:1**. Computed ratios must not be rounded (e.g. 2.999:1 does not meet 3:1). — [WCAG 2.2](https://www.w3.org/TR/WCAG22/); [Understanding 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)
- Contrast ratio is defined as `(L1 + 0.05) / (L2 + 0.05)` using relative luminance. — [WCAG 2.2 (contrast ratio definition)](https://www.w3.org/TR/WCAG22/)
- SC 1.4.11 Non-text Contrast (AA) requires **3:1** for visual information needed to identify UI components/states and meaningful graphical objects against adjacent colors. Button boundaries that are the *only* identifier of a control must meet 3:1; if text/icon already identifies the control, the boundary itself may be exempt. — [Understanding 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)
- WebAIM / MDN summarize the same AA/AAA text thresholds and note UI components/graphics typically need **3:1**. — [MDN Color contrast](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Perceivable/Color_contrast); [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- APCA reports perceptual lightness contrast as **Lc** (not a WCAG ratio). Bronze Simple Mode guidance: body text ~**Lc 75** min / **Lc 90** preferred; other content text ~**Lc 60**; large fluent text ~**Lc 45**; spot-readable / solid semantic non-text ~**Lc 30**; below ~**Lc 15** treat as invisible for many users. — [APCA in a Nutshell](https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html); [ARC Bronze Simple Mode](https://www.readtech.org/ARC/tests/bronze-simple-mode/)
- Material Design 3 documents that intended color-role pairings target accessible contrast (commonly citing ≥3:1 for role pairs) and that small text should meet ≥4.5:1, large text/graphics ≥3:1. — [Material color contrast](https://m3.material.io/foundations/designing/color-contrast); [Material color roles](https://m3.material.io/styles/color/roles)
- Apple HIG references WCAG AA (4.5:1 / 3:1 for large/bold) and APCA as accepted measures, and advises testing Increase Contrast contexts. — [Apple HIG Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)

**Computed WCAG ratios (local; approximate to 2 decimals)**

| Pair | Ratio | AA normal (4.5) | AA large (3.0) | AAA normal (7.0) |
| --- | ---: | --- | --- | --- |
| Primary `#e8a598` / `#2a1612` | **8.40:1** | Pass | Pass | Pass |
| Info `#8fb4e0` / `#142238` | **7.43:1** | Pass | Pass | Pass |
| Success `#8fbf9a` / `#14261a` | **7.63:1** | Pass | Pass | Pass |
| Warning `#e0c06a` / `#3a2e10` | **7.55:1** | Pass | Pass | Pass |
| Danger `#e08a9e` / `#2a1218` | **6.93:1** | Pass | Pass | Fail (near AAA) |
| Chrome `#c97b8a` / `#fff8f6` | **2.99:1** | Fail | Fail* | Fail |
| Page bg `#fcf7f6` / any status ink | **12.5–16.5:1** | Pass | Pass | Pass |

\*2.99:1 is below 3:1 without rounding, so it fails large-text AA as well as normal text.

**Approximate APCA Lc (local 0.1.9-style; verify externally)**

| Pair | Lc (approx.) | Rough reading vs Bronze guidance |
| --- | ---: | --- |
| Primary fill/ink | ~62 | Around “other content text” (Lc 60), short of body Lc 75 |
| Info fill/ink | ~58 | Borderline for content text |
| Success fill/ink | ~60 | Borderline for content text |
| Warning fill/ink | ~63 | Around content-text band |
| Danger fill/ink | ~53 | Below Lc 60; better for large/heavier labels |
| Chrome / light ink | ~57 | Near content-text band despite WCAG fail (polarity/midtone difference) |
| Bg / primary ink | ~98 | Strong body-text territory |

### Inferences
- Filled semantic buttons that put the listed dark inks on the pastel fills are **legible under WCAG AA** for normal button labels; primary/info/success/warning also meet AAA.
- Danger is the weakest semantic fill/ink pair for AAA (6.93:1) but still comfortably AA.
- Chrome + `#fff8f6` is **not** a WCAG-passing filled-button / nav-label combination for normal *or* large text.
- If pastel fills are used as the *only* visual cue for a status chip or iconographic object on `#fcf7f6`/`#fff5f7`, non-text contrast (~1.7–2.4:1) fails 1.4.11; dark ink, border, icon, or label text is required for accessibility—not optional decoration.

### Gaps
- Exact WebAIM checker screenshots and official APCA calculator Lc values were not captured in-tool; ratios above should be spot-checked in those UIs before treating as compliance evidence.
- No interactive component states (hover/disabled/focus rings) were measured; focus appearance (WCAG 2.4.13) is out of scope of the static hex set alone.

---

## Are coral primary and rose danger too close for status recognition?

### Takeaway
Yes — for status recognition that depends on hue alone, coral primary (`#e8a598`) and rose danger (`#e08a9e`) are the closest semantic pair (ΔE≈19), and danger is even closer to chrome (`#c97b8a`, ΔE≈7). Under red-green CVD simulation they remain only moderately separated; chrome vs danger collapses further. Do not rely on color alone between brand/primary and error.

### Cited Findings
- WCAG SC 1.4.1 (Use of Color) and GOV.UK / Home Office guidance: anything indicated by colour needs a secondary cue (label, border, underline, pattern, icon); monochrome rendering must not remove meaning. — [Home Office Perceivable](https://design.homeoffice.gov.uk/accessibility/standard/perceivable); [GOV.UK colour contrast blog](https://accessibility.blog.gov.uk/2016/06/17/colour-contrast-why-does-it-matter/); [GOV.UK Brand maps (colour)](https://brand.design-system.service.gov.uk/data/maps/)
- Apple HIG: avoid relying solely on color; people with color blindness may struggle especially with red–green and blue–orange pairings; use labels/glyph shapes. — [Apple HIG Color](https://developer.apple.com/design/human-interface-guidelines/color); [Differentiate Without Color Alone](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/differentiate-without-color-alone-evaluation-criteria/)
- Material (classic usability): for colorblind users include strokes, indicators, patterns, texture, or text in addition to color. — [Material Accessibility (M1)](https://m1.material.io/usability/accessibility.html)
- NIH / MedlinePlus: red-green CVD is the most common form; among Northern European ancestry populations ~**1 in 12 men** and **1 in 200 women**; NEI notes about **1 in 12 men** have CVD. — [MedlinePlus Genetics](https://medlineplus.gov/genetics/condition/color-vision-deficiency/); [NEI Color Blindness](https://www.nei.nih.gov/eye-health-information-eye-conditions-and-diseases/color-blindness) (see also [NEI](https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/color-blindness))
- Coblis documents client-side CVD simulation; current Coblis V2 uses HCIRN methodology; Machado 2009 publishes severity-dependent RGB matrices widely used in modern tooling (preferred over Coblis V1 ColorMatrix). Simulations remain approximate. — [Coblis](https://www.color-blindness.com/coblis-color-blindness-simulator/); [Machado et al. CVD model](https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html); [DaltonLens review of open-source simulators](https://daltonlens.org/opensource-cvd-simulation/)

**Local measurements (approximate)**

| Comparison | Hue gap (HSV) | ΔE76 (approx.) | Notes |
| --- | ---: | ---: | --- |
| Primary vs danger | ~24° (10° vs 346°) | **~19** | Closest status pair among the five roles |
| Danger vs chrome | ~2.5° (both ~348°) | **~7** | Same hue family; mainly lightness/chroma difference |
| Primary vs info / success / warning | large | **~38–49** | Comfortably separated for typical vision |
| Info vs success | blue vs green | **~45** | OK for typical vision; still need non-color cues for CVD |

**CVD simulation (Machado-like matrices; approximate hex after transform)**

| Condition | Primary `#e8a598` → | Danger `#e08a9e` → | Approx. ΔE after sim |
| --- | --- | --- | ---: |
| Protanopia | muddy khaki `#b4ad97` | gray-blue `#97999f` | ~17 |
| Deuteranopia | khaki `#c3ba97` | gray-khaki `#aca99c` | ~14 |
| Tritanopia | pink `#f79ca2` | rose `#ee8391` | ~10 |

Under deuteranopia, danger and chrome both become desaturated warm-grays with ΔE≈7 — effectively the same “soft mauve/gray chip” family.

### Inferences
- Primary (coral/peach) vs danger (rose) is **borderline for unaided status recognition** when chips sit side by side without labels; ΔE≈19 is noticeable for typical trichromats but not “obviously different categories” in a soft pastel system.
- The larger product risk is **danger ↔ chrome**: sharing ~348° hue means brand chrome and error fills will read as the same rose family — especially risky if chrome backgrounds appear near destructive actions.
- CVD does not fully merge primary and danger, but it **removes the red/pink identity of danger**, turning it grayish while primary becomes khaki — status meaning flips from “warm rose = error” to “desaturated blob,” so icons/text become mandatory.
- Success (`#8fbf9a`) vs warning (`#e0c06a`) stay better separated by lightness/chroma than primary vs danger, but classic red–green CVD still weakens green/yellow category cues; pair with check / alert icons.

### Gaps
- No user testing with CVD participants on this specific set; simulation ≠ lived perception.
- ΔE76 thresholds for “UI status distinguishable” are not standardized in WCAG; values here are engineering heuristics, not a pass/fail criterion.

---

## Do pastel fills on warm off-white backgrounds wash out?

### Takeaway
Yes. All five pastel fills vs `#fcf7f6` / `#fff5f7` sit around **1.7–2.4:1** (warning worst at ~1.66:1), so large soft pills can visually melt into the page. Washed-out fills are a **distinguishability and non-text-contrast** problem even when fill/ink text contrast is excellent.

### Cited Findings
- Non-text contrast of 3:1 applies when a graphical object or control boundary is required to understand content or identify a control. — [Understanding 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast)
- Home Office / GOV.UK: check contrast of interactive controls and chart elements (≥3:1); faded colours alone are insufficient for inactive or status meaning. — [Colour and contrast (Home Office)](https://design.homeoffice.gov.uk/accessibility/providing-alternatives/colour-and-contrast)
- Material: some non-text elements such as button containers should meet 3:1 against their background. — [Material color contrast](https://m3.material.io/foundations/designing/color-contrast)
- APCA treats ~Lc 15 as near-invisible for many users and ~Lc 30 as a floor for solid semantic non-text; low fill-vs-bg Lc implies weak object separation. — [APCA in a Nutshell](https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html)

**Fill vs warm backgrounds (local WCAG)**

| Fill | vs `#fcf7f6` | vs `#fff5f7` | Approx. APCA Lc vs bg |
| --- | ---: | ---: | ---: |
| Warning `#e0c06a` | **1.66:1** | 1.65:1 | ~27 |
| Primary `#e8a598` | 1.93:1 | 1.91:1 | ~34 |
| Success `#8fbf9a` | 1.96:1 | 1.95:1 | ~34 |
| Info `#8fb4e0` | 2.02:1 | 2.01:1 | ~35 |
| Danger `#e08a9e` | 2.38:1 | 2.37:1 | ~43 |
| Chrome `#c97b8a` | 2.96:1 | 2.94:1 | ~52 |

Warm off-white (`#fcf7f6` / `#fff5f7`) shares the pink/cream cast of primary/danger, so coral and rose chips lose edge more than a cool gray canvas would.

### Inferences
- Warning yellow-gold is the most washout-prone status on this canvas; without a border or deeper tone it can look like a faint stain rather than a status.
- Danger’s slightly lower luminance helps it pop more than primary/success/warning, which ironically can make **errors more visible than the brand primary** while still failing 3:1.
- Soft pastel aesthetic can be preserved by adding **1px–1.5px darker-tint borders**, hairline separators, or slightly deeper “container” tones rather than abandoning pastels for neon.

### Gaps
- Ambient lighting / display calibration not tested; washout often worsens on washed-out laptop panels and in bright rooms (noted qualitatively by GOV.UK contrast writing).
- No measurement of translucent / glass overlays on these fills.

---

## Does light text on chrome `#c97b8a` pass?

### Takeaway
No for WCAG 2.2 text contrast: `#fff8f6` on `#c97b8a` is ~**2.99:1**, failing AA normal text and (without rounding) AA large text. APCA Lc≈57 is more optimistic for mid-size UI labels, but WCAG conformance still fails. Prefer dark ink on current chrome, or darken chrome to ~`#a85a6c`+ for light ink.

### Cited Findings
- AA requires 4.5:1 for normal text and 3:1 for large text; values must not be rounded up. — [Understanding 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum)
- Apple Sufficient Contrast evaluation cites the common **4.5:1** guideline for foreground text. — [Apple Sufficient Contrast criteria](https://developer.apple.com/help/app-store-connect/manage-app-accessibility/sufficient-contrast-evaluation-criteria/)
- APCA Bronze content-text guidance centers near **Lc 60**, with body text higher (Lc 75+); APCA and WCAG 2.x can disagree on midtone light-on-color pairs. — [APCA in a Nutshell](https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html)

**Local chrome ink options**

| Chrome | Ink | WCAG | Pass AA normal? |
| --- | --- | ---: | --- |
| `#c97b8a` (current) | `#fff8f6` | **2.99:1** | No |
| `#c97b8a` | `#2a1218` (dark) | **5.58:1** | Yes |
| `#c97b8a` | `#3a1520` | **5.11:1** | Yes |
| `#b86a7a` | `#fff8f6` | 3.72:1 | No (large only) |
| `#a85a6c` | `#fff8f6` | **4.61:1** | Yes |
| `#9a4f62` | `#fff8f6` | 5.45:1 | Yes |

### Inferences
- Keeping the soft rose chrome fill and switching to **dark ink** is the smallest aesthetic change that restores WCAG AA.
- If light-on-rose branding is essential (nav bar, primary CTA), darken chrome into the `#a85a6c`–`#9a4f62` band; `#a85a6c` is the lightest candidate here that clears ~4.5:1 with `#fff8f6`.
- Chrome’s hue twinning with danger means a darkened chrome for light text also **helps** brand-vs-error separation (deeper brand rose vs softer danger fill) if danger stays lighter.

### Gaps
- Hover/active chrome shades not specified; darkening for default state may still fail if hover lightens toward `#c97b8a` while keeping white text.

---

## Concrete adjustments that improve distinguishability without abandoning soft multi-hue pastels

### Takeaway
Keep the multi-hue pastel strategy, but (1) separate primary toward peach/orange and danger toward cooler magenta, (2) break chrome↔danger hue collision via darker chrome or dark chrome ink, (3) deepen warning/success slightly for canvas contrast, and (4) always pair status with non-color cues. Two concrete packages below stay soft and pastel while fixing the measured failures.

### Cited Findings
- Guidance consensus (W3C 1.4.1, GOV.UK, Apple, Material, Section508): color may encode status but must not be the only cue — labels, icons, shapes, patterns. — [Section508 color usage](https://www.section508.gov/create/making-color-usage-accessible/); [Home Office Perceivable](https://design.homeoffice.gov.uk/accessibility/standard/perceivable); [Apple HIG Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- Material color roles: pair fills with their “on-” inks as designed pairs so contrast survives theme/contrast settings. — [Material color roles](https://m3.material.io/styles/color/roles)
- CVD simulation methodology (Machado / Brettel family) is appropriate for checking red–green collisions before locking a palette. — [Machado CVD model](https://www.inf.ufrgs.br/~oliveira/pubs_files/CVD_Simulation/CVD_Simulation.html); [DaltonLens](https://daltonlens.org/opensource-cvd-simulation/)

### Inferences — recommended hex tweaks (computed locally)

**Package B — minimal change (keep coral primary)**

| Token | Current | Suggested | Why |
| --- | --- | --- | --- |
| Primary fill/ink | `#e8a598` / `#2a1612` | unchanged | Already strong fill/ink (8.40:1) |
| Danger fill | `#e08a9e` | **`#d070a0`** | Cooler magenta; ΔE vs primary **~36** (was ~19); fill/ink with `#2a1218` still **~5.4:1** |
| Chrome | `#c97b8a` | keep **or** darken to **`#a85a6c`** | If keeping `#c97b8a`, switch ink to **`#2a1218`** (5.58:1). If light ink required, use `#a85a6c` / `#fff8f6` (**4.61:1**) |
| Warning fill | `#e0c06a` | **`#d4a84a`** | Slightly deeper gold; better vs bg (~2.08:1, still soft) while ink `#3a2e10` remains ~6:1 |
| Success fill | `#8fbf9a` | **`#7ab890`** | A bit more chroma/depth for CVD vs khaki-shifted warning |
| Info | `#8fb4e0` / `#142238` | unchanged | Best-separated cool hue; 7.43:1 |

**Package A — stronger separation (shift primary too)**

| Token | Suggested | Notes |
| --- | --- | --- |
| Primary fill | **`#e9a07a`** | More peach/orange; still soft; ink `#2a1612` ~8.0:1 |
| Danger fill | **`#d070a0`** | ΔE vs new primary **~46** |
| Chrome | **`#a85a6c`** + `#fff8f6` | AA light text; ΔE vs danger ~20 (was ~7) |
| Warning / success | `#d4a84a` / `#7ab890` | Same as Package B |

**Non-hex product rules (required even after retuning)**
1. Status chips/toasts: icon + text label (`Error`, `Warning`, …), not color alone.
2. Destructive buttons: use danger fill + explicit “Delete/Remove” copy; do not place chrome-rose CTAs adjacent without typography weight/shape difference.
3. Pastel fills on `#fcf7f6`: add a border using a ~15–25% deeper mix of the same hue (or 1px ink at ~30% opacity) so object edges approach 3:1 without leaving the pastel family.
4. Prefer **dark inks on pastel fills** (already correct for the five statuses); treat light-on-pastel as large/bold-only after measured ≥3:1.
5. Re-check any new hexes in WebAIM + APCA calculators and with a Coblis/Machado deuteranopia pass before locking tokens.

### Gaps
- Suggested replacement hexes are engineering proposals from local contrast/ΔE math, not validated in a design critique or with CVD users.
- No WHO page was fetched successfully in-session for CVD prevalence; NIH/MedlinePlus figures were used instead.
- Full APCA lookup-table compliance (font size × weight) was not run; Lc figures are Bronze-style ballparks only.

---

## Cross-cutting verdict (for report writer)

| Question | Verdict |
| --- | --- |
| Fill/ink text contrast | **Good** for five statuses (AA; mostly AAA). |
| Chrome + light ink | **Fail** WCAG (~2.99:1). |
| Primary vs danger separability | **Too close** for color-only status; danger vs chrome worse. |
| Pastels on warm bg | **Wash out** (all <3:1 object contrast; warning worst). |
| Soft pastel salvageable? | **Yes** — deepen selectively, split coral↔magenta, fix chrome ink or chrome depth, keep icons/labels. |
