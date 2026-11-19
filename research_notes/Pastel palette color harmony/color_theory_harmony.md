# UIMi Pastel palette chromatic harmony

Measured HSL (Python `colorsys` HLS) for fills under review:

| Role / swatch | Hex | H° | S% | L% |
| --- | --- | --- | --- | --- |
| primary coral | `#e8a598` | 9.8 | 63.5 | 75.3 |
| primary hover | `#d4897c` | 8.9 | 50.6 | 65.9 |
| info sky | `#8fb4e0` | 212.6 | 56.6 | 72.0 |
| success mint | `#8fbf9a` | 133.7 | 27.3 | 65.5 |
| warning butter | `#e0c06a` | 43.7 | 65.6 | 64.7 |
| danger rose | `#e08a9e` | 346.0 | 58.1 | 71.0 |
| chrome (labeled navy) | `#c97b8a` | 348.5 | 41.9 | 63.5 |
| bg | `#fcf7f6` | 10.0 | 50.0 | 97.6 |
| surface | `#fff5f7` | 348.0 | 100.0 | 98.0 |
| lilac | `#b8a4d9` | 262.6 | 41.1 | 74.7 |
| teal | `#7eb8c9` | 193.6 | 41.0 | 64.1 |
| tan | `#d4a574` | 30.6 | 52.7 | 64.3 |
| sage | `#9dcca8` | 134.0 | 31.5 | 70.8 |
| violet | `#c5b3e0` | 264.0 | 42.1 | 79.0 |

Semantic + chart fill cluster: L ≈ 63.5–79.0 (spread ~15.5); S ≈ 27.3–65.6 (spread ~38.3); mean L ≈ 69.5, mean S ≈ 47.4.

---

## Do these hues share enough chroma/value to feel like one pastel family?

### Takeaway
Lightness largely coheres as a soft family (most fills sit ~64–75% L), but saturation is uneven—especially success mint—so the set reads as a soft multi-hue system with one under-chroma outlier rather than a tightly matched pastel chorus.

### Cited Findings
- Pastels are commonly described as high-lightness, reduced-chroma tints; ColorArchive places pastels at roughly HSL L 75–95% and stresses shared temperature or connecting logic so mixed-temperature sets do not look accidental — [ColorArchive – Pastel Color Palette](https://colorarchive.org/guides/pastel-color-palette/).
- DesignYourWay characterizes pastels as desaturated with lightness often above ~70% and saturation often below ~50%, and advises picking several colors that share similar lightness for cohesion — [DesignYourWay – Pastel Color Palettes](https://www.designyourway.net/blog/pastel-color-palettes/).
- ColorUI (OKLCH framing) places classic pastels at high lightness / low chroma (e.g. L > 0.85, C < 0.10 in OKLCH) and notes “neo-pastels” that keep high lightness with slightly more saturation — [ColorUI – Pastel Color Palette Guide](https://colorui.io/blog/pastel-color-palette-guide).
- Jerwood Visual Arts: cohesive pastel sets usually share undertone, temperature, or a consistent level of softness — [Jerwood Visual Arts – How to Mix Colors with Pastels](https://jerwoodvisualarts.org/blog/how-to-mix-colors-with-pastels/).
- Analogous / multi-swatch tools emphasize balancing perceived lightness (OKLCH L) because equal HSL L still yields uneven brightness across hues (yellow vs blue) — [Made Good Designs – Analogous Color Scheme Generator](https://madegooddesigns.com/tools/analogous-color-generator/); Coolors exposes a luminance map for comparing brightness across a generated palette — [Isotropic – Guide to Coolors](https://isotropic.co/guide-to-coolors-co-2020/).

### Inferences
- UIMi Pastel fills are mostly “neo-pastel” / soft mid-pastels: L often ~65–75 (slightly below ColorArchive’s 75–95 band for background pastels, but still soft for UI fills), with S often ~40–65 rather than ultra-dusty.
- Shared value: yes enough for one product theme—L spread ~15 pts is workable for a soft family.
- Shared chroma: only partially. Coral / butter / danger / sky cluster around S ~56–66%; lilac / teal / tan / violet around ~41–53%; mint and sage sit much lower (~27–32%), so mint looks dusty next to butter/coral and weakens “one pastel family” unless intentional as a quieter success chip.
- bg `#fcf7f6` (H≈10°) and surface `#fff5f7` (H≈348°) correctly warm-tint the canvas toward peach/blush, which is the main glue holding multi-hue accents into one theme.

### Gaps
- No peer-reviewed psychophysics paper was located that defines a numeric “pastel family” chroma/value band for UI; guidance is practitioner/design-system based.
- Exact OKLCH L/C for each UIMi hex was not computed in this pass (HSL used); perceptual lightness of butter vs mint may diverge more than HSL L suggests.

---

## Are coral + rose too close (primary vs danger confusion)?

### Takeaway
Yes—primary coral (~10°) and danger rose (~346°) are only ~24° apart on the hue circle, with near-matching L/S; chrome `#c97b8a` (~348.5°) is essentially the same hue as danger (~2.4° apart), so primary / danger / chrome form a warm-red cluster that risks role confusion.

### Cited Findings
- When brand already owns coral/red, error should diverge in hue (and not reuse the accent hex); Coloristic recommends error near ~20–35° (red-orange) specifically so it diverges from brand coral, and warns that collapsing status into marketing accent causes misreads — [Coloristic – Semantic Status Color Tokens](https://coloristic.org/blog/semantic-status-color-tokens/).
- Android / Material guidance: semantic colors must stay consistent in meaning; mixing unrelated hues for the same meaning (or the inverse: same hue family for different meanings) confuses users — [Android Developers – Color](https://developer.android.com/design/ui/mobile/guides/styles/color).
- Material treats Error as a distinct static semantic role (not the brand primary), with its own on-error / container roles — [Material Design 3 – Color roles (Error)](https://m3.material.io/styles/color/roles); makers may optionally *harmonize* error toward primary (small hue shift) while retaining red/error identity — [Material Design – Designing Harmony into Dynamic Color](https://m3.material.io/blog/dynamic-color-harmony); [M3 – Define new colors / harmonization](https://m3.material.io/styles/color/advanced/define-new-colors).
- WCAG 1.4.1: color alone must not be the only means of conveying information; status distinction needs icon/text redundancy — [MDN – Using color wisely](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Colors/Using_color_wisely); [Section508.gov – Making Color Usage Accessible](https://www.section508.gov/create/making-color-usage-accessible/).
- For color-vision deficiency, hue-only separation is insufficient if lightness also matches; role redundancy (hue + lightness + icon) is recommended — [ColorArchive – Colorblind palette design notes](https://colorarchive.org/notes/july-2026-colorblind-palette-design/).

### Inferences
- Measured shortest-arc distance: coral → danger ≈ **23.7°**; coral → chrome ≈ **21.3°**; danger → chrome ≈ **2.4°**. At matched pastel L (~71–75) and similar S, this is too tight for “brand CTA” vs “destructive/error.”
- Material-style *harmonization* (nudging error toward primary) would make the problem worse here—the hues are already too close; this palette needs the opposite: **de-harmonize / separate** danger from coral.
- Chrome labeled “navy” is chromatically a dusty rose/mauve, not navy; as a chrome token it reinforces the coral–rose band instead of providing cool structure.
- Even after a hue fix, WCAG still requires non-color cues (icon, label) for danger vs primary.

### Gaps
- No lab study or A/B data specific to UIMi Pastel was found; confusion risk is inferred from hue geometry + published status-token guidance.
- Exact minimum hue degrees between brand and error is not standardized; Coloristic’s sector map is a practitioner starting point, not a formal standard.

---

## Does adding sky / mint / butter / lilac break peach identity or create a coherent soft multi-hue system?

### Takeaway
It creates a coherent soft multi-hue / “pastel rainbow” system held together by warm peach surfaces—not a pure peach monochrome brand—so peach identity becomes the *canvas and primary accent*, while semantics and charts supply a balanced warm–cool soft spectrum.

### Cited Findings
- ColorArchive: successful pastels usually pick a clear temperature identity (all warm, all cool, or all earthy); mixed-temperature sets without connecting logic read as accidental; expand from one anchor pastel into 2–3 adjacent hues rather than jumping the wheel — [ColorArchive – Pastel Color Palette](https://colorarchive.org/guides/pastel-color-palette/).
- Counterpoint in the same soft-color literature: pastel *complements* (e.g. mint + blush, lavender + pale yellow) can work because low saturation softens clash — [DesignYourWay – Pastel Color Palettes](https://www.designyourway.net/blog/pastel-color-palettes/).
- Multi-hue pastels need deliberate temperature/tint balance; one cohesion technique is sharing an undertone (a bit of the base hue in each accent) — [Gabrielle Scarlett – Pastel Colour Palette Inspiration](https://gabriellescarlett.com/pastel-colour-palette-inspiration/).
- Material dynamic-color research: multiple semantic hues can sit in one scheme if they keep recognizable identity (a yellow stays “yellow”) while overall scheme feels harmonious; closeness on the hue circle aids harmony, but semantic meaning must be retained — [Material Design – Designing Harmony into Dynamic Color](https://m3.material.io/blog/dynamic-color-harmony).
- Adobe: analogous schemes favor unity; complementary / triadic add contrast and energy—choose based on whether you want calm cohesion vs multi-hue balance — [Adobe – Colour Wheel Combinations](https://www.adobe.com/uk/creativecloud/design/discover/color-wheel.html).
- Coolors documents harmony modes (analogous, complementary, triadic, tetradic, monochromatic) as the usual generators for “colors that work together” — [Coolors / coolors.in generator docs](https://www.coolors.in/); [Coolors color picker – harmonies](https://coolors.co/color-picker).

### Inferences
- Warm core preserved: coral (~10°), butter (~44°), tan (~31°), bg (~10°), surface (~348°) keep a peach–blush–cream spine.
- Cool accents: sky (~213°), mint (~134°), lilac/violet (~263–264°), teal (~194°) intentionally leave the peach neighborhood—this *is* a soft multi-hue system, not an analogous peach-only brand.
- Connecting logic that saves the set: (1) shared high-ish L, (2) warm-tinted page chrome, (3) semantic roles mapping to conventional hue sectors (blue=info, green=success, yellow=warning). Without those roles, ColorArchive’s “Christmas / accidental” risk would apply to coral+mint alone.
- Peach identity is diluted as *exclusive* brand chroma but retained as *theme atmosphere* via bg/surface/primary. Chart extras (lilac, teal, tan, sage, violet) reinforce soft multi-hue rather than peach-only.

### Gaps
- “Peach identity” is a product/brand judgment; chromatic analysis can say the canvas is peach-anchored, not whether marketing still *reads* as peach after heavy sky/lilac use.
- No Huemint-specific quantitative score for this hex set was obtained (Huemint-style tools are generative; no citable analysis of these exact hexes found).

---

## What harmony model (if any) does this set approximate?

### Takeaway
No single classical wheel model fits the full token set; the closest description is a **warm analogous brand spine + soft near-complementary / loose tetradic semantic accents** (a soft multi-hue or “pastel spectrum” system), not a clean analogous, complementary, or equilateral triad.

### Cited Findings
- Itten / Bauhaus tradition: harmony as geometric wheel relations—complementary (opposites), analogous (neighbors), triadic (equilateral ~120°), tetradic (square/rectangle), split-complementary — [Color Type Kit – Itten Color Wheel](https://colortypekit.com/itten-color-wheel/); [Movavi – Itten’s Color Wheel](https://www.movavi.io/color-wheel-en/); summary of dyads/triads/tetrads from *The Art of Color* — [Bookey summary PDF – The Art of Color](https://cdn.bookey.app/files/pdf/book/en/the-art-of-color.pdf).
- Itten’s seven contrasts include hue, light–dark, cold–warm, complementary, saturation, etc.—harmony also depends on proportion and value, not only hue angles — [OLLI DC – Color Theory Week 3 handout](https://www.olli-dc.org/uploads/PDFs/2024_Spring/599_Miklitsch/599colortheoryweek3handout.pdf).
- Adobe Color harmony types include monochromatic, complementary, analogous, triadic, split-complementary, etc. — [Adobe Color – Color Wheel](https://color.adobe.com/create/color-wheel); [Adobe Express – Color wheel explained](https://www.adobe.com/express/learn/blog/color-wheel-explained).
- Material M2 palette generator historically offered analogous / complementary / triadic relations to a primary — [Material Design (M2) – The color system](https://m2.material.io/guidelines/style/color.html).

### Inferences
Measured against coral H≈9.8°:
- **Complement of coral** ≈ 189.8° (cyan-teal). Actual sky ≈ 212.6° (~23° off complement); teal ≈ 193.6° is near the true complement. So sky/teal behave as **near-complementary cool relief**, not exact complements.
- **Split-complement** of coral ≈ 160° / 220°: mint (134°) is somewhat near the green split; sky (213°) near the blue split—loose split-complementary flavor for coral + mint + sky.
- **Triad from coral** ≈ 10° / 130° / 250°: mint (134°) matches well; lilac/violet (~263°) is ~13° past the third vertex—**near-triadic** for coral–mint–lilac if butter/danger are ignored.
- **Butter** at 44° is **analogous** to coral (Δ≈34°)—warm spine, not a separate harmony family.
- **Danger/chrome** at ~346–349° are **analogous/diadic** to coral (Δ≈21–24°)—same warm family, which is harmony-friendly aesthetically but role-hostile for semantics.
- Full set with chart accents spans most of the wheel → closest classical label: **soft tetradic / spectrum** with a dominant warm primary, not a 3–5 swatch Adobe “Analogous” lock.
- Warm–cool balance: warm (coral, butter, tan, rose, chrome, peach surfaces) vs cool (sky, mint, sage, teal, lilac, violet)—roughly even, which supports “balanced soft multi-hue” rather than warm-only peach.

### Gaps
- Classical models assume equal chroma; pastel unequal S (mint vs butter) means geometric hue fits overstate perceptual harmony.
- RYB (Itten painter’s wheel) vs RGB/HSV digital wheel can shift “exact” complements slightly; angles above use digital HLS hue.

---

## Concrete hex tweaks if the set does not hang together

### Takeaway
The set mostly hangs as a soft multi-hue product theme if peach surfaces stay dominant; the critical fix is separating danger (and chrome) from coral by ≥~40° hue and optionally lifting mint saturation toward the family mean—optional L/S normalization polishes chart accents.

### Cited Findings
- Separate error from brand coral by hue sector; example practitioner map: error ~20–35°, success ~165°, warning ~75–85°, info ~230–260° (then tune to brand) — [Coloristic – Semantic Status Color Tokens](https://coloristic.org/blog/semantic-status-color-tokens/).
- Material: keep semantic identity while tuning toward scheme harmony *only when* identity survives; do not shift so far that yellow becomes green — [Material Design – Designing Harmony into Dynamic Color](https://m3.material.io/blog/dynamic-color-harmony).
- Pastel cohesion: match softness/temperature; raise shared lightness consistency; use dark ink anchors (this palette already has role inks ~L 11–15%) — [ColorArchive – Pastel Color Palette](https://colorarchive.org/guides/pastel-color-palette/); [DesignYourWay – Pastel Color Palettes](https://www.designyourway.net/blog/pastel-color-palettes/).
- Adobe / Itten practice: in multi-hue schemes, pick one dominant color and use others in smaller areas or lighter versions — [Movavi – Itten’s Color Wheel](https://www.movavi.io/color-wheel-en/); [Adobe – Colour Wheel Combinations](https://www.adobe.com/uk/creativecloud/design/discover/color-wheel.html).

### Inferences
Priority tweaks (keep L/S in the soft band; values derived via HSL remapping of current danger/mint targets):

1. **Danger — increase hue distance from coral (required for roles)**  
   - Current: `#e08a9e` H≈346°, Δcoral≈24°.  
   - Prefer cooler magenta-rose so it stays “rose” but clears coral: e.g. **`#e08ab5`** (H≈330°, S≈58%, L≈71°, Δcoral≈40°) or **`#e08aae`** (H≈335°, Δ≈34°).  
   - Alternative (more “standard error,” less peach-adjacent rose): shift toward red-orange **only if** coral moves cooler; H≈25° from current coral is *closer* (Δ≈15°) and is a worse primary/danger split—do **not** use H≈25° while primary stays at ~10°.  
   - If following Coloristic’s ~20–35° error sector while keeping coral, **move primary** slightly toward peach-orange (~20–25°) *or* move danger to magenta (~320–330°)—magenta path preserves current coral.

2. **Chrome — stop overlapping danger**  
   - Current `#c97b8a` ≈ danger hue. Retint toward true cool chrome/navy-adjacent soft blue-gray, e.g. aim H≈215–230, S≈25–35%, L≈70–78 (example direction: soft slate-blue near info but grayer), **or** rename and accept it as a secondary mauve only if danger is moved away first.

3. **Success mint — raise chroma toward family**  
   - Current `#8fbf9a` S≈27% looks dusty beside S≈60% coral/butter.  
   - Candidates at H≈134°, L≈66%: **`#8ac798`** (S≈35%), **`#81cf93`** (S≈45%), **`#79d88f`** (S≈55%). Mid option `#81cf93` best matches mean S≈47%.

4. **Optional family normalization (charts)**  
   Shared soft multi-hue row at ~L72 / S50 (illustrative, not mandatory): coral `#dba094`, butter `#dbc894`, mint `#94dba5`, teal `#94cbdb`, sky `#94b4db`, lilac `#af94db`, rose `#db94a5`. Use only if equal “chip weight” in charts matters more than current character.

5. **Keep** coral `#e8a598`, butter `#e0c06a`, sky `#8fb4e0`, lilac `#b8a4d9`, bg/surface, and dark inks—these already support peach atmosphere + soft multi-hue semantics. Prefer **dominance**: primary/peach surfaces large; semantic fills as accents (60–30–10 style proportion per Adobe’s discussion of dominant vs accent use — [Adobe – Complementary colours guide](https://www.adobe.com/uk/creativecloud/design/discover/complementary-colors.html)).

### Gaps
- Proposed hexes are HSL-remapped illustrations, not WCAG-verified against every UIMi component state; contrast of ink-on-fill pairs should be rechecked after any change.
- No automated Coolors/Huemint export of this exact palette was run; tweaks are theory- and measurement-driven.
- Cultural/signage conventions for “error = red” vs “error = rose/magenta” vary; magenta-rose danger is chromatically clearer vs coral but may read less “alarm” than classic red—pair with icon/label.
