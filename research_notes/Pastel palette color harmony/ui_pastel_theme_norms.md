# Soft / pastel multi-hue UI semantic color norms

**Scope:** Professional product UI themes (kits, design systems, Tailwind/shadcn/DaisyUI), 2020–2026 preference. Judging whether UIMi Pastel’s coral + sky + mint + butter + rose set is a normal, coherent pattern vs mono-hue peach ramps and vs UIMi `lavender-mist`.

**Palette under review (UIMi Pastel, from `uimi.css`):**

| Role | Hex | Approx. HSL |
| --- | --- | --- |
| primary | `#e8a598` | H10 S63% L75% (warm coral) |
| info | `#8fb4e0` | H213 S57% L72% (sky) |
| success | `#8fbf9a` | H134 S27% L65% (mint) |
| warning | `#e0c06a` | H44 S66% L65% (butter) |
| danger | `#e08a9e` | H346 S58% L71% (rose) |
| chrome | `#c97b8a` | H348 S42% L64% (dusty rose) |
| bg | `#fcf7f6` | H10 S50% L98% (blush white) |

**Verdict (executive):** Spreading semantic roles across conventional hues while keeping brand chrome/bg in one warm family is the dominant product-UI pattern. UIMi Pastel matches that structure and is coherent; the main cohesion risk is primary/chrome/danger all sitting in the coral–rose band, not the presence of sky/mint/butter.

---

## Do major pastel / soft UI themes keep all roles in one hue family, or spread across hues?

### Takeaway
Product systems almost always keep **brand / surface / chrome** in one temperature or hue family, while **info / success / warning / danger** stay multi-hue (blue / green / amber / red family) so status remains readable. Pure mono-hue semantic sets are rare outside marketing-only mood boards.

### Cited Findings
- Adobe Spectrum maps semantic roles to different primitive hues: informative → blue, positive → green, notice → orange, negative → red, independent of accent — [Spectrum semantic color palette](https://opensource.adobe.com/spectrum-design-data/tokens/semantic-color-palette/)
- Material Design 3 treats success/warning-like meanings as **static custom colors** that keep their own hue ranges; brand/dynamic scheme colors are separate — [Material: define new / static colors](https://m3.material.io/styles/color/advanced/define-new-colors)
- Material’s optional **harmonize** only nudges static semantic hues toward primary by at most half the hue difference, capped at **15°**, explicitly so red stays recognizably “error” — [Material: harmonize colors](https://m3.material.io/styles/color/advanced/adjust-existing-colors); [Material Color Utilities `Blend.harmonize`](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/blend/blend.ts)
- daisyUI’s built-in **`pastel`** theme uses multi-hue OKLCH roles: primary ~hue 307 (lilac), secondary ~10 (rose), accent ~164 (mint), info ~207 (sky), success ~154 (green), warning ~66 (butter), error ~20 (coral) — [daisyUI pastel `object.js`](https://cdn.jsdelivr.net/npm/daisyui@5.7.46/theme/pastel/object.js)
- daisyUI **`cupcake`** (soft bakery aesthetic) likewise spreads: primary teal (~181), secondary pink (~343), accent butter (~71), plus conventional blue/green/yellow/red status — [daisyUI cupcake `object.js`](https://cdn.jsdelivr.net/npm/daisyui@5.7.46/theme/cupcake/object.js)
- daisyUI **`valentine`** (warm rose brand) keeps base/primary in pink/rose (~343–354) but still uses sky info (~207), mint success (~165), amber warning (~56), red error (~25) — [daisyUI valentine `object.js`](https://cdn.jsdelivr.net/npm/daisyui@5.7.46/theme/valentine/object.js)
- Catppuccin Latte ships a full multi-hue accent grid (rosewater, pink, red, peach, yellow, green, teal, sky, blue, lavender, …) with product apps mapping green→success, yellow→warning, red→danger — [Catppuccin palette](https://catppuccin.com/palette/); example semantic mapping — [Yazi Catppuccin Latte docs](https://deepwiki.com/yazi-rs/flavors/3.1.2-catppuccin-latte)
- Spectrum documents Light / Dark / Wireframe color themes, **not** a dedicated “soft/pastel” theme; Carbon similarly has no soft-pastel theme in public guidelines searched — [Spectrum theming](https://spectrum.adobe.com/page/theming/); [Carbon color guidelines](https://www.carbondesignsystem.com/building-blocks/foundations/color/guidelines)

### Inferences
- Industry norm for product UI: **mono-family brand surfaces + multi-hue semantics**, not “all roles peach.”
- Soft/pastel kits achieve cohesion by matching **lightness and chroma**, not by collapsing status into one hue.
- UIMi Pastel’s coral brand + sky/mint/butter/rose semantics is aligned with daisyUI pastel/valentine and Spectrum’s role→hue mapping.

### Gaps
- No official IBM Carbon or Adobe Spectrum “pastel soft theme” document with hand-picked soft hexes was found; those systems stay on fuller-chroma semantic primitives.
- Fine-art / mood-board galleries often show mono-peach sets; those are weak evidence for product status-color practice.

---

## Examples of cohesive soft multi-hue systems (with citations)

### Takeaway
Cohesive soft systems either (A) use a warm or cool **brand wash** plus conventional soft status hues, or (B) use a multi-hue pastel **wallpaper/surface** set while keeping one clear primary CTA and sparse semantics.

### Cited Findings

**Kit / theme tokens**
- **daisyUI `pastel`:** lilac primary + rose secondary + mint accent + sky/green/butter/coral status at ~80–90% OKLCH lightness — [object.js](https://cdn.jsdelivr.net/npm/daisyui@5.7.46/theme/pastel/object.js); theme list — [daisyUI themes](https://daisyui.com/docs/themes/)
- **daisyUI `cupcake`:** warm cream bases (`base-100` ~oklch hue 56) with teal/pink/butter brand accents and standard status hues — [object.js](https://cdn.jsdelivr.net/npm/daisyui@5.7.46/theme/cupcake/object.js)
- **daisyUI `valentine`:** rose brand family + multi-hue status (closest analog to warm blush brand + soft status) — [object.js](https://cdn.jsdelivr.net/npm/daisyui@5.7.46/theme/valentine/object.js)
- **Pastel Pop (CSS Crème / shadcn):** soft lilac bg `#FDF7FF`, primary `#A78BFA`, mint accent `#5EE6C5`, separate destructive; rule: one CTA color, accent never a second primary — [Pastel Pop](https://csscreme.com/palettes/pastel-pop)
- **Pastel Transfer (DESIGN.md):** rotating pastel backgrounds (peach, lavender, seafoam, butter, rose, sky, lilac) with **one** electric periwinkle primary and mint/amber/coral status — [Pastel Transfer](https://designmd.ai/chef/pastel-transfer)
- **Innei Pastel / Pastel Palette:** multi-family OKLCH pastels (blue, pink, purple, green, orange, yellow, sky, rose, …) with kawaii (higher L, lower C) variants and semantic tokens — [pastel.innei.dev](https://pastel.innei.dev/); [GitHub Innei/Pastel](https://github.com/Innei/Pastel/)
- **Catppuccin Latte:** coherent “soothing pastel” product ecosystem with rosewater `#dc8a78` through lavender, cool-tinted neutrals — [catppuccin.com/palette](https://catppuccin.com/palette/)
- **1st-Pouf:** pastel claymorphism React/shadcn-style kit (“pastel everywhere”) as a product UI pattern family — [moji2002/1st-pouf](https://github.com/moji2002/1st-pouf)
- **sui_id_web Lavender-Jade tokens:** lavender accent + jade success + separate danger/warning/info tuned for AA — [docs.rs sui-id-web tokens](https://docs.rs/sui-id-web/latest/sui_id_web/tokens/index.html)

**Design-system mechanics**
- Material: brand scheme (primary/secondary/tertiary) vs static semantic colors; optional mild hue harmonization — [M3 advanced color](https://m3.material.io/styles/color/advanced/define-new-colors)
- Spectrum: accent vs informative / positive / notice / negative as separate semantic ramps — [Spectrum semantic palette](https://opensource.adobe.com/spectrum-design-data/tokens/semantic-color-palette/)
- daisyUI color model: primary/secondary/accent (brand) vs info/success/warning/error (status) — [daisyUI colors](https://daisyui.com/docs/colors/)
- Akala UI: semantic classes + `.pastel` helper that desaturates/lightens status colors while keeping role identity — [Akala semantic colors](https://akala.js.org/web-ui/utilities/semantic-colors)

**Gallery / product pattern notes**
- Pastel Transfer explicitly rotates peach/lavender/seafoam/butter/rose/sky backgrounds while forbidding more than one primary blue focal per view — [Pastel Transfer dos/don’ts](https://designmd.ai/chef/pastel-transfer)
- Pastel Pop describes “soft lilac, mint and peach” as a friendly multi-hue brand set, not mono-lilac — [Pastel Pop](https://csscreme.com/palettes/pastel-pop)

### Inferences
- The recurring “soft multi-hue” product recipe is: **warm or cool tinted neutrals + 1–2 brand accents + blue/green/amber/red-family status at matched softness**.
- Coral/peach brand with sky + mint + butter + rose status is essentially the same architecture as daisyUI valentine + pastel status softness, and as Pastel Transfer’s peach bg + mint/amber/coral status.

### Gaps
- Few Dribbble shots have durable, citable token tables; kit token files are stronger evidence than gallery screenshots.
- shadcn default themes are not “pastel kits”; Pastel Pop / 1st-Pouf are the clearer soft shadcn-adjacent examples found.

---

## When does a pastel theme feel monotonous vs muddled?

### Takeaway
Monotony comes from **too little hue variety in the whole UI** (everything peach). Muddiness comes from **too many competing brand accents**, mixed temperature without a dominant wash, or status colors that collide with brand (especially primary ≈ danger). Softness alone does not cause muddle if L/C are matched and roles are sparse.

### Cited Findings
- ColorArchive: successful pastel palettes need a clear **temperature identity** (all warm, all cool, or all earthy); mixed-temperature sets without connecting logic “read as accidental” — [Pastel Color Palette guide](https://colorarchive.org/guides/pastel-color-palette/)
- ColorArchive warns that pastel pink next to pastel green as **equal brand surfaces** can read like Christmas decoration; expand from one anchor pastel via 2–3 adjacent hues — [same guide](https://colorarchive.org/guides/pastel-color-palette/)
- ColorArchive production note: pastels cluster ~OKLCH L70–85, so pastel-on-pastel contrast fails; need dark anchors (L20–35) and mid bridges — [Why pastel palettes fail in production](https://colorarchive.org/notes/april-2026-pastel-palettes-production/)
- UXPin (2026): monochromatic is safest; analogous low risk; triadic/tetradic need careful dominance; complementary fatiguing if overused — [Choose a Color Palette for UI Design](https://www.uxpin.com/studio/blog/choose-color-pallete/)
- Ramotion: pastels share low saturation / high brightness so hues feel closer; “using too many colors is distracting”; prefer soft/neutral dominance with few strong accents; 60–30–10 proportion — [App Design Color Palette Principles](https://www.ramotion.com/blog/app-design-color-palette/)
- DevPalettes: pastels often work together because of shared value/saturation; recommend consistent L/S across multi-hue pastel sets — [Pastel Color Guide](https://devpalettes.com/blog/pastel-color-guide/)
- Pastel Transfer: don’t add more than one primary-colored focal per view; keep interface mostly neutral — [Pastel Transfer](https://designmd.ai/chef/pastel-transfer)
- Pastel Pop agent rules: only one CTA color; accent never styled as second primary; don’t invent new hues mid-build — [Pastel Pop](https://csscreme.com/palettes/pastel-pop)
- Material: colors closer in hue appear more pleasing; harmonization exists because far-apart static colors can clash with brand primary — [Material harmonize](https://m3.material.io/styles/color/advanced/adjust-existing-colors)
- Material convention: primary/tertiary prominent; secondary/neutrals less chromatic and often same-ish hue as primary — [Material adjust existing colors](https://m3.material.io/styles/color/advanced/adjust-existing-colors)

### Inferences
- **Monotonous:** brand + surfaces + status all peach/coral → hierarchy and status hard to scan; looks like a single tint filter.
- **Muddled:** several equal-weight pastels (coral CTA + mint CTA + sky CTA + rose CTA) fighting for attention; or warm brand wash + cool surfaces with no shared L/C; or primary and danger nearly the same hue.
- **Cohesive multi-hue:** warm blush **wash** dominates area; sky/mint/butter/rose appear mainly as **status / charts / sparse accents** at similar softness; dark ink anchors text.
- ColorArchive’s “don’t put pink next to green” applies to **brand surface pairing**, not to green success badges on a blush app (which Spectrum/daisyUI/Catppuccin all do).

### Gaps
- No controlled user-study quantifying “muddle threshold” for pastel multi-hue UIs was found; guidance is practitioner/heuristic.
- The ColorArchive “April 2026” note date is future-relative to some readers; treat as that site’s editorial, not a peer-reviewed study.

---

## Relative to lavender-violet themes (purple/green/gold/pink roles): is the reviewed set similarly structured?

### Takeaway
Yes. UIMi `lavender-mist` and UIMi `pastel` use the same architecture: **brand family for primary/chrome/bg**, then **multi-hue status** (cool info, green success, gold warning, pink danger). Pastel is not a stranger pattern; it is the warm-blush twin of the violet theme.

### Cited Findings
- UIMi `lavender-mist` tokens: primary `#886cc0`, info `#a78bfa`, success `#7c9a7e`, warning `#e8b86d`, danger `#e07a9a`, bg `#f3f0f9` — local `uimi.css` `[data-uimi-palette="lavender-mist"]`
- UIMi `pastel` tokens: primary `#e8a598`, info `#8fb4e0`, success `#8fbf9a`, warning `#e0c06a`, danger `#e08a9e`, chrome `#c97b8a`, bg `#fcf7f6` — local `uimi.css` `[data-uimi-palette="pastel"]`
- Approximate HSL comparison (computed for this note):

| Role | Pastel | Lavender-mist |
| --- | --- | --- |
| bg wash | H10 warm | H260 cool violet |
| primary | H10 coral | H260 violet |
| info | H213 sky | H255 lavender (near brand) |
| success | H134 mint | H124 sage |
| warning | H44 butter | H37 gold |
| danger | H346 rose | H341 pink |

- Soft violet + mint product examples: Pastel Pop lilac primary + mint accent — [Pastel Pop](https://csscreme.com/palettes/pastel-pop); sui Lavender-Jade lavender + jade success — [sui-id-web tokens](https://docs.rs/sui-id-web/latest/sui_id_web/tokens/index.html)
- daisyUI pastel uses lilac brand with the same status hue families as warm themes — [daisyUI pastel](https://cdn.jsdelivr.net/npm/daisyui@5.7.46/theme/pastel/object.js)

### Inferences
- Structure parity: both themes are **brand mono-family + conventional multi-hue semantics**.
- Difference of note: in lavender-mist, **info (`#a78bfa`) sits in the same violet family as primary**, so info is less “distinct blue” than Pastel’s sky `#8fb4e0`. Pastel actually separates info from brand **more** clearly than lavender-mist does.
- Shared risk pattern: both use **pink/rose danger** near warm accents; Pastel’s risk is higher because primary is already coral (H10) next to danger (H346) — ~24° apart vs lavender primary (H260) vs danger (H341) — much farther.
- Softness parity: Pastel roles sit ~L65–75; lavender success is darker/duller (L55, S13%), so lavender status hierarchy is a bit more “muted sage” while Pastel success is softer mint.

### Gaps
- No third-party write-up of UIMi’s two themes exists; comparison is from local CSS + industry analogs.
- Chart tokens in both palettes add extra hues; this note focuses on primary/info/success/warning/danger/chrome/bg.

---

## Recommendations for keeping Pastel cohesive while remaining more varied than a single peach ramp

### Takeaway
Keep the multi-hue status set (it is normal and useful). Cohesion should come from a **dominant warm blush wash**, **matched pastel L/C**, **dark warm ink**, and clearer separation of **primary vs danger**, not from collapsing sky/mint/butter into peach.

### Cited Findings
- Material: preserve semantic hue identity; if clashing, harmonize mildly toward primary (≤15°) rather than recoloring green→peach — [Material harmonize](https://m3.material.io/styles/color/advanced/adjust-existing-colors); [blend.ts](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/blend/blend.ts)
- ColorArchive: two-layer system — pastel surfaces + dark anchors; expand brand from one blush anchor via adjacent warm hues (coral/apricot), not via equal-weight cool brand surfaces — [Pastel guide](https://colorarchive.org/guides/pastel-color-palette/)
- ColorArchive production: pair pastels with dark anchors (~L20–35) and mid bridges (~L45–55) — [pastel production note](https://colorarchive.org/notes/april-2026-pastel-palettes-production/)
- Ramotion / UXPin: limit competing accents; use proportion (e.g. 60–30–10); prefer analogous brand expansion; treat triadic status as accents under one dominant — [Ramotion](https://www.ramotion.com/blog/app-design-color-palette/); [UXPin](https://www.uxpin.com/studio/blog/choose-color-pallete/)
- Pastel Pop / Pastel Transfer: one primary CTA; multi-hue pastels OK as backgrounds or secondary accents — [Pastel Pop](https://csscreme.com/palettes/pastel-pop); [Pastel Transfer](https://designmd.ai/chef/pastel-transfer)
- daisyUI valentine: warm rose brand can coexist with soft blue/green/amber/red status — [valentine object.js](https://cdn.jsdelivr.net/npm/daisyui@5.7.46/theme/valentine/object.js)
- DevPalettes: keep consistent lightness/saturation across pastel multi-hue sets — [Pastel Color Guide](https://devpalettes.com/blog/pastel-color-guide/)
- Spectrum: keep status roles on distinct hue families for meaning — [Spectrum semantic palette](https://opensource.adobe.com/spectrum-design-data/tokens/semantic-color-palette/)

### Inferences (actionable for UIMi Pastel)
1. **Keep multi-hue semantics** (sky / mint / butter / rose). Collapsing them into a peach ramp would increase monotony and hurt status literacy vs Spectrum/daisyUI norms.
2. **Lock brand area to warm blush:** bg, surface, line, chrome, primary, shadows — already largely true (`#fcf7f6` / `#fff5f7` / `#c97b8a` / `#e8a598`).
3. **Differentiate danger from primary/chrome:** primary H10 coral vs danger H346 rose are close; nudge danger toward clearer red (or slightly lower L / higher C) so destructive actions don’t read as “another brand pink.” Chrome can stay dusty rose.
4. **Optional Material-style soft harmonization:** shift info/success a few degrees warmer (not into peach) so cool sky/mint feel related to warm brand without losing role identity.
5. **Match chroma bands:** success `#8fbf9a` is notably less saturated (S~27%) than warning/danger (~58–66%); either soften warning/danger slightly or enrich success so the status row feels one “pastel weight.”
6. **Usage rules beat hex tweaks:** status colors for alerts/badges/charts only; one coral primary CTA per view; mint/sky never equal-weight CTAs (Pastel Pop / Pastel Transfer pattern).
7. **Preserve dark warm ink** (`#2a1612` and role `*-ink` tokens) — this already follows the two-layer pastel system.
8. **Relative to lavender-mist:** treat Pastel as the warm twin — same role map, different brand wash — rather than inventing a separate “all peach” philosophy.

### Gaps
- Exact retuned hex proposals were out of scope for this research pass; recommendations are structural.
- Contrast AA/AAA for each Pastel fill + ink pair was not re-measured here (UIMi already defines `*-ink` companions).
- No A/B preference data comparing “harmonized” vs “raw conventional” soft status hues for blush brands.

---

## Source index (primary)

| Source | Why used |
| --- | --- |
| [daisyUI pastel/cupcake/valentine theme objects](https://cdn.jsdelivr.net/npm/daisyui@5.7.46/theme/pastel/object.js) | Concrete soft-theme semantic tokens |
| [daisyUI colors / themes docs](https://daisyui.com/docs/colors/) | Brand vs status role model |
| [Material M3 static colors + harmonize](https://m3.material.io/styles/color/advanced/define-new-colors) | Design-system theory for multi-hue semantics |
| [MCU Blend.harmonize](https://github.com/material-foundation/material-color-utilities/blob/main/typescript/blend/blend.ts) | 15° harmonization cap |
| [Adobe Spectrum semantic palette](https://opensource.adobe.com/spectrum-design-data/tokens/semantic-color-palette/) | Enterprise multi-hue status mapping |
| [Catppuccin palette](https://catppuccin.com/palette/) | Widely adopted soft multi-hue product palette |
| [Pastel Pop](https://csscreme.com/palettes/pastel-pop) | Soft lilac/mint/peach shadcn theme + rules |
| [Pastel Transfer DESIGN.md](https://designmd.ai/chef/pastel-transfer) | Rotating pastels + single primary + soft status |
| [Innei Pastel](https://pastel.innei.dev/) | OKLCH pastel system with semantic tokens |
| [ColorArchive pastel guide + production note](https://colorarchive.org/guides/pastel-color-palette/) | Monotony/muddle / temperature / contrast heuristics |
| [UXPin color palette 2026](https://www.uxpin.com/studio/blog/choose-color-pallete/) | Harmony types for UI |
| [Ramotion app palette principles](https://www.ramotion.com/blog/app-design-color-palette/) | Pastel + multi-color control / 60-30-10 |
| Local `uimi.css` pastel + lavender-mist blocks | Direct comparison for UIMi |

**Not found / weak:** dedicated Carbon or Spectrum “soft pastel” theme packs; peer-reviewed studies of pastel multi-hue muddle thresholds.
