# Colored CTA vs raised soft buttons in neumorphic / Soft UI auth

## How do demos style Google/GitHub-style raised soft buttons?

### Takeaway
Social / secondary controls in real soft-UI auth demos are almost always **surface-matched raised plates**: `background` equals the page/card gray, dual light+dark `box-shadow`, brand color only on the icon/`color`, and `:active` flips shadows to `inset`.

### Cited Findings
- CodeFronts’ neumorphic social buttons set `--surface: #e8eaf0`, then `.soc-16__btn { background: var(--surface); color: var(--brand); box-shadow: -6px -6px 13px var(--light), 6px 6px 14px var(--shade); }` with `:active` inset `-4px/-4px` light and `4px/4px` shade; brand is applied via per-link `--brand` (e.g. LinkedIn `#0a66c2`), not a filled background. — [CodeFronts Neumorphic Soft UI Social Buttons](https://codefronts.com/snippets/css-social-buttons/neumorphic-soft-ui-social-buttons/)
- Colorlib/puikinsh neumorphism login uses the same recipe for social icons: `.neu-social { background: #e0e5ec; … box-shadow: 6px 6px 15px #bec3cf, -6px -6px 15px #ffffff; }` and `:active` uses inset `3px/3px` / `-3px/-3px` of those same gray/white colors; glyph color stays `#565d7b`. — [puikinsh neumorphism style.css](https://puikinsh.github.io/login-forms/forms/neumorphism/style.css); [README palette](https://puikinsh.github.io/login-forms/forms/neumorphism/README.md)
- SoftUI CSS default (non-primary) buttons are the library’s raised social/secondary pattern: `.sui-btn { background: var(--sui-bg); color: var(--sui-text); box-shadow: var(--sui-shadow-raised); }` where `--sui-shadow-raised` is `6px 6px 14px var(--sui-shadow-dark), -6px -6px 14px var(--sui-shadow-light)`. — [softui-css dist](https://cdn.jsdelivr.net/npm/softui-css@latest/dist/softui.css); [SoftUI theming](https://softui-css.netlify.app/theming/)
- uiCookies’ base `.neu-btn` is surface-matched raised: `background: var(--neu-bg); border: … var(--neu-edge); box-shadow: var(--neu-raised-sm)` with hover → `--neu-raised` and active → `--neu-inset-sm`. — [uiCookies Neumorphic Forms & Login Card](https://uicookies.com/snippets/neumorphic-forms-and-login-card/)
- Design-for-AI states the neumorphic rule plainly: the button is the same colour as the page and gets shape from two shadows (`-6px -6px 12px #fff, 6px 6px 12px #c8ccd4`); pressed flips both to `inset`; they advise using this style for **secondary** controls, not the main CTA. — [designforai.dev neumorphic buttons](https://designforai.dev/buttons/neumorphic)
- Webspire’s Tailwind soft button is the same extrusion model: `--soft-bg` must match the surrounding background; idle is extruded dual shadow, `:active` inverts to inset. — [Webspire Soft Button](https://webspire.de/snippets/soft-ui/button/)
- Classic CodePen soft-UI icon toggles use CSS variables for the dual outer shadow, e.g. `--btnOuterShadow: 4px 2px 16px rgba(136, 165, 191, 0.48), -4px -2px 16px #ffffff` and checked/pressed inset shadows. — [CodePen MoustafaJazzar — Neumorphism Soft UI Buttons](https://codepen.io/MoustafaJazzar/pen/MWWBPQj)

### Inferences
- “Google/GitHub-style” in soft-UI kits means **raised surface + brand glyph**, not a Google-colored filled button; contrast for the control edge comes from dual shadows (weak) plus icon color / focus ring (stronger).
- Auth demos that keep Sign In and social on the same surface often share one raised class (`.neu-button` / `.neu-social` differ mainly in size/shape, not shadow recipe).

### Gaps
- Few published demos label social buttons as “Google” / “GitHub” with official brand fill while still calling the control neumorphic; brand-filled social blocks (e.g. Learn With Arshyan’s `.facebook` / `.google` solid brand backgrounds in search snippets) break the surface-match rule — full CSS for that page could not be re-fetched (HTTP 500).

---

## How do demos style the primary Create Account / Sign Up CTA (gradient, colored soft shadow, borderless pill)?

### Takeaway
Primary CTAs in soft-UI auth fall into three coded patterns: (A) **colored fill still using gray/white dual shadows**, (B) **colored/tinted soft elevation** (color-mix or brand-tinted shadow), and (C) **gradient Soft UI kits that are not true neumorphism**. A fourth camp keeps the CTA surface-matched like everything else.

### Cited Findings

**Pattern A — colored fill + page-matched dual shadows (common tutorial login)**
- Red Stapler login CTA: pill (`border-radius: 30px`), `border: none`, white text, solid `background: #24cfaa`, and still the classic pair `box-shadow: 3px 3px 8px #b1b1b1, -3px -3px 8px #ffffff`. Hover/active only change fill (`#2fdbb6` / `#1da88a`), **not** inset shadows. — [Red Stapler CSS Neumorphic Login Form](https://redstapler.co/css-neumorphic-login-form-design/)
- GeeksforGeeks NeumorphismUI form LOGIN button: `background-color: #2f8d46; color: #fff; border: none; border-radius: 1rem;` with the same gray/white dual raise as fields/card: `box-shadow: .3rem .3rem .6rem #c8d0e7, -.2rem -.2rem .5rem #fff`. — [GeeksforGeeks NeumorphismUI Form](https://www.geeksforgeeks.org/css/neumorphismui-form/)

**Pattern B — accent/primary variant with tinted soft shadow**
- SoftUI CSS `.sui-btn-primary`: `background: var(--sui-primary); color: #FFFFFF;` and **overrides** the default raised recipe with `box-shadow: 4px 4px 12px color-mix(in srgb, var(--sui-primary) 35%, transparent), -2px -2px 8px var(--sui-shadow-light);`; active uses `inset 3px 3px 8px rgba(0,0,0,0.2), inset -2px -2px 6px color-mix(… primary 40% …)`. — [softui-css dist](https://cdn.jsdelivr.net/npm/softui-css@latest/dist/softui.css); [SoftUI Buttons](https://softui-css.netlify.app/components/buttons/)
- CodeFronts Soft UI Button Lab primary: solid `background: var(--nm-05-primary)` (`#6f5bd0`) plus dual shadows built from the primary itself via `color-mix(in oklab, var(--nm-05-primary), #000 30%)` and `… #fff 42%` (not the surface light/dark tokens). — [CodeFronts Soft UI Button Lab](https://codefronts.com/design-styles/css-neumorphism/soft-ui-button-lab/)
- uiCookies login submit: `neu-btn neu-btn--accent neu-btn--block` — accent only swaps fill/border/text (`background: var(--neu-accent); border-color: var(--neu-accent); color: var(--neu-on-accent)` with `--neu-accent:#4f46e5`); **shadow tokens stay `--neu-raised-sm` / inset on press**. — [uiCookies Neumorphic Forms & Login Card](https://uicookies.com/snippets/neumorphic-forms-and-login-card/)

**Pattern C — Soft UI kit gradient CTA (soft elevation, not dual-light neumorphism)**
- Creative Tim Soft UI Design System primary CTAs use `.btn.bg-gradient-primary` (310° brand gradients, e.g. documented primary/info/success stops) with button shadow `--bs-btn-box-shadow: 0 4px 7px -1px rgba(0, 0, 0, 0.11), 0 2px 4px -1px rgba(0, 0, 0, 0.07)` — single-direction soft drop shadow, **no** white highlight shadow. App Generator docs show `btn bg-gradient-primary shadow-soft-md` vs outline secondary. — [soft-design-system.css](https://raw.githubusercontent.com/creativetimofficial/soft-ui-design-system/main/assets/css/soft-design-system.css); [App Generator Soft UI Design docs](https://github.com/app-generator/app-generator/blob/main/docs/source/templates/bootstrap/soft-ui-design.rst); [Creative Tim Soft UI buttons](https://www.creative-tim.com/learning-lab/bootstrap/buttons/soft-ui-design-system)
- Soft UI Dashboard documentation describes “soft shadows” as `$box-shadow-soft: 0 20px 27px 0 rgba(0, 0, 0, 0.05)` and gradient CTAs via a `gradient-background` mixin — again soft Material-like elevation, not extruded light/dark pairs. — [App Generator Soft UI Dashboard docs](https://app-generator.dev/docs/templates/bootstrap/soft-ui-dashboard.html)

**Pattern D — CTA remains true raised surface (no colored fill)**
- puikinsh Sign In `.neu-button` matches the card: `background: #e0e5ec; color: #3d4468; border: none; border-radius: 15px; box-shadow: 8px 8px 20px #bec3cf, -8px -8px 20px #ffffff;` with hover lift and inset press — **same family as social**, not a blue/green pill. — [puikinsh neumorphism style.css](https://puikinsh.github.io/login-forms/forms/neumorphism/style.css)
- Learn With Arshyan login/signup (search-extracted CSS) keeps `form button` on `#dde1e7` with dual raise and hover → inset + accent **text** color `#0dafbb` rather than a filled CTA (page fetch failed; treat as secondary confirmation). — search snippet from [Learn With Arshyan](https://learnwitharshyan.com/neumorphism-login-signup-form-html-css-js/)

**Pill / borderless notes**
- Red Stapler CTA is explicitly a full-width pill (`height: 60px; border-radius: 30px; border: none`). — [Red Stapler](https://redstapler.co/css-neumorphic-login-form-design/)
- SoftUI ships `.sui-btn-pill` as a separate modifier on top of default/primary. — [SoftUI Buttons](https://softui-css.netlify.app/components/buttons/)
- cssbuttoncreator “Neumorph Pill” uses a **surface-matching** 145° gradient (`#f1f5f9` → `#d6dce5`) and dual white/slate shadows on a `#e0e5ec` page — soft CTA look without a brand fill. — [cssbuttoncreator Neumorph Pill](https://cssbuttoncreator.com/css-buttons/neumorph-round/)

### Inferences
- When a Dribbble-like soft login shows a blue/teal Create Account button, the CSS is usually **Pattern A or B**: filled (sometimes gradient) CTA + soft raise; social stays Pattern raised-surface.
- Calling Pattern C “neumorphic” is branding overlap: Creative Tim Soft UI is **soft elevation + gradient**, not extruded same-as-background controls.

### Gaps
- No single canonical “Create Account” CodePen was found that pairs Google/GitHub raised icons **and** a blue gradient CTA in one open-sourced file with both rules side-by-side; the pairing is reconstructed across login tutorials (colored CTA) + social soft-UI snippets (raised icons).
- webdevtrick’s switchable login/register article describes social SVG + neumorphic shadows but the fetched page did not inline the CSS source. — [webdevtrick](https://webdevtrick.com/neumorphism-login-register-form/)

---

## Do libraries treat these as one class or two variants?

### Takeaway
Serious Soft UI / neumorph kits treat them as **one base button class + a color/primary variant** (and often outline/ghost/pill modifiers). True same-surface raise is the default; colored CTA is a second class or `--accent` / `--primary` modifier that changes fill and often the shadow recipe.

### Cited Findings
- SoftUI CSS: `.sui-btn` (default raised) vs `.sui-btn-primary` / `-success` / `-danger` / … (filled + tinted shadows); also outline, ghost, pill, icon, pressed. Documented usage: `<button class="sui-btn">` vs `<button class="sui-btn sui-btn-primary">`. — [SoftUI Buttons](https://softui-css.netlify.app/components/buttons/); [softui-css GitHub README](https://github.com/siddharth-bhansali/softui)
- uiCookies: `.neu-btn` + `.neu-btn--accent` (and `--block`, `--sm`, `--icon`); login submit is `neu-btn neu-btn--accent neu-btn--block`. Accent only overrides background/border/color; shared hover/active shadow machinery. — [uiCookies](https://uicookies.com/snippets/neumorphic-forms-and-login-card/)
- CodeFronts Soft UI Button Lab: base `.nm-05__btn` (surface raise) vs `.nm-05__btn--nm-05-primary` (filled + color-mix shadows) vs `--ghost` / `--danger`; HTML uses two classes. — [CodeFronts Soft UI Button Lab](https://codefronts.com/design-styles/css-neumorphism/soft-ui-button-lab/)
- Creative Tim Soft UI: Bootstrap-style dual system — `.btn` + `.bg-gradient-primary` (or `.btn-primary`) for CTAs vs `.btn-outline-*` / secondary for quieter actions; Vue SoftButton uses `variant` (`contained` | `outline` | `gradient`) × `color`. — [Creative Tim Soft UI buttons](https://www.creative-tim.com/learning-lab/bootstrap/buttons/soft-ui-design-system); [Vue Soft UI SoftButton](https://www.creative-tim.com/learning-lab/vue/buttons/soft-ui-dashboard/)
- puikinsh demo uses **two sibling classes** with the **same shadow family**: `.neu-button` (full-width Sign In) and `.neu-social` (icon), both `#e0e5ec` raised — not a primary-color variant. — [puikinsh style.css](https://puikinsh.github.io/login-forms/forms/neumorphism/style.css)
- Design-for-AI explicitly recommends neumorphic styling for secondary controls and a higher-contrast treatment for the main call to action (conceptual split even when demos don’t ship a kit). — [designforai.dev](https://designforai.dev/buttons/neumorphic)

### Inferences
- Kit API convention: **base = raised surface**, **modifier = semantic color CTA**. One-class-only demos either skip colored CTAs or hardcode a separate `.signin-button` / `.btn` selector without a shared BEM base.
- When implementing Soft UI auth in a product kit, expect at least two tokens: `--shadow-raised` (surface) and `--shadow-primary` / color-mix elevation (CTA).

### Gaps
- SoftUI’s outline/ghost primary variants’ exact shadow overrides were not fully extracted beyond confirming the class matrix on the docs page.

---

## What shadow recipes are used for colored soft elevation (not dual light/dark on matching surface)?

### Takeaway
Colored soft elevation replaces the surface gray/white pair with **brand-tinted dark + lighter highlight** (often via `color-mix`), or drops the highlight entirely for a **single soft black/rgba drop shadow** under a gradient fill. Both are “soft UI”; only the tinted dual pair still echoes neumorphic light-direction language.

### Cited Findings

**Recipe 1 — brand-tinted dual shadows (soft-neumorph on a colored fill)**
- SoftUI primary: `4px 4px 12px color-mix(in srgb, var(--sui-primary) 35%, transparent), -2px -2px 8px var(--sui-shadow-light)` (asymmetric: stronger tinted dark BR, weaker white TL). Hover tightens; active becomes `inset 3px 3px 8px rgba(0,0,0,0.2)` + inset tinted primary highlight. — [softui-css dist](https://cdn.jsdelivr.net/npm/softui-css@latest/dist/softui.css)
- CodeFronts primary: both sides derived from primary — dark = `color-mix(in oklab, primary, #000 30%)`, light = `color-mix(in oklab, primary, #fff 42%)`, same distance/blur tokens as the surface button. — [CodeFronts Soft UI Button Lab](https://codefronts.com/design-styles/css-neumorphism/soft-ui-button-lab/)

**Recipe 2 — gray/white dual shadows kept under a colored fill (pseudo-neu CTA)**
- Red Stapler / GeeksforGeeks keep `#b1b1b1`+`#ffffff` or `#c8d0e7`+`#fff` under teal/green fills — elevation still reads as “on the gray card,” not as a glow of the CTA color. — [Red Stapler](https://redstapler.co/css-neumorphic-login-form-design/); [GeeksforGeeks](https://www.geeksforgeeks.org/css/neumorphismui-form/)
- uiCookies accent buttons reuse `--neu-raised` built from `--neu-dark` / `--neu-light` surface tokens even when fill is `#4f46e5`. — [uiCookies](https://uicookies.com/snippets/neumorphic-forms-and-login-card/)

**Recipe 3 — soft drop shadow only (Soft UI kits; not true neumorphism)**
- Creative Tim buttons: `0 4px 7px -1px rgba(0, 0, 0, 0.11), 0 2px 4px -1px rgba(0, 0, 0, 0.07)`. — [soft-design-system.css](https://raw.githubusercontent.com/creativetimofficial/soft-ui-design-system/main/assets/css/soft-design-system.css)
- Soft UI Dashboard soft card/icon language: `0 20px 27px 0 rgba(0, 0, 0, 0.05)` and `shadow-{color}` utilities paired with `bg-gradient-*`. — [App Generator Soft UI Dashboard](https://app-generator.dev/docs/templates/bootstrap/soft-ui-dashboard.html); [Soft UI utilities](https://www.creative-tim.com/learning-lab/bootstrap-marketplace/utilities-product/soft-ui-design-system)
- Stylekit Soft UI guidance (Tailwind-oriented): `shadow-lg` / `shadow-xl` with accent transparency `shadow-[accent]/20`, plus hover lift — colored glow language, not dual extrusion. — [AnxForever/stylekit soft-ui.ts](https://github.com/AnxForever/stylekit/blob/main/lib/styles/soft-ui.ts)

**Contrast with true surface raise (for reference)**
- SoftUI raised tokens: `6px 6px 14px #B8C0CC, -6px -6px 14px #FFFFFF` (and sm/lg scales). — [SoftUI theming](https://softui-css.netlify.app/theming/)
- CodeFronts social: `-6px -6px 13px` light / `6px 6px 14px` shade on matching `--surface`. — [CodeFronts social buttons](https://codefronts.com/snippets/css-social-buttons/neumorphic-soft-ui-social-buttons/)

### Inferences
- **True neumorphism** = surface-matched fill + dual opposing shadows. A **colored soft CTA** in kits is usually either (1) fill change keeping surface shadows, or (2) fill + tinted dual shadows — both still “soft”; (3) gradient + single soft drop is Soft UI branding without the extrusion illusion.
- For a kit that needs both Google-style social and a blue Create Account button: ship **raised surface** (`--neu-raised`) and **colored elevation** (`color-mix` primary shadows or Soft UI drop shadow) as separate shadow tokens/variants.

### Gaps
- No authoritative WCAG-tested recipe comparing contrast of tinted dual shadows vs soft drop shadows on CTAs was found in these sources (only general neumorphism contrast warnings). — [designforai.dev](https://designforai.dev/buttons/neumorphic); [wpdean CSS Neumorphism](https://wpdean.com/css-neumorphism/)

---

## Quick CSS pattern cheat-sheet (for implementers)

### Raised soft (social / secondary)
```css
/* Surface must match parent */
.btn-raised {
  background: var(--surface); /* e.g. #e0e5ec */
  color: var(--ink-or-brand-icon);
  border: none; /* or 1px edge for a11y */
  border-radius: 12px; /* or 50% / pill */
  box-shadow:
    -6px -6px 14px var(--light), /* #fff or lighter mix */
     6px  6px 14px var(--shade); /* #a3b1c6 / #bec3cf */
}
.btn-raised:active {
  box-shadow:
    inset -4px -4px 9px var(--light),
    inset  4px  4px 10px var(--shade);
}
```

### Colored soft CTA (kit-style, tinted elevation)
```css
.btn-cta {
  background: var(--primary); /* or linear-gradient(310deg, …) */
  color: #fff;
  border: none;
  border-radius: 999px; /* pill optional */
  box-shadow:
     4px  4px 12px color-mix(in srgb, var(--primary) 35%, transparent),
    -2px -2px  8px var(--light);
}
.btn-cta:active {
  box-shadow:
    inset 3px 3px 8px rgba(0, 0, 0, 0.2),
    inset -2px -2px 6px color-mix(in srgb, var(--primary) 40%, transparent);
}
```

### Soft UI gradient CTA (NOT true neumorphism — still common in Soft UI kits)
```css
.btn-soft-gradient {
  border: 0;
  color: #fff;
  background-image: linear-gradient(310deg, #cb0c9f 0%, /* lighten */ #e640c0 100%);
  box-shadow: 0 4px 7px -1px rgba(0, 0, 0, 0.11), 0 2px 4px -1px rgba(0, 0, 0, 0.07);
}
```
