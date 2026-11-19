# UIMi

UIMi is a workspace UI kit for HTML, React, Vue, and Svelte. One CSS file, same class names everywhere.

**License:** [MIT](LICENSE) — free to use, copy, modify, and ship in your apps.

Open `index.html` to preview the catalog. That page is a **design playground**, not a finished product.

---

## Use it in your app

1. Copy into your project:
   - `uimi.css`
   - `fonts/` (if you use kit typefaces)
   - `icons/` (if you use kit icons)
   - `uimi.js` only if you need catalog behaviors (tabs, charts, datepicker, notify, etc.)
2. Set theme attributes on `<html>`.
3. Build with UIMi classes (`uimi-btn`, `uimi-card`, …).
4. Take **one** layout variant from the catalog (e.g. Login 1 **or** Login 2) — not every demo.
5. Replace the UIMi brand and demo copy with your product.

### Minimal HTML

```html
<!DOCTYPE html>
<html
  lang="en"
  data-uimi-palette="apricot"
  data-uimi-font="inter"
  data-uimi-display="inter"
  data-uimi-shell="sidebar"
  data-uimi-glass="off"
>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="uimi.css" />
  </head>
  <body class="uimi-body">
    <button class="uimi-btn uimi-btn--primary">Save</button>
  </body>
</html>
```

### React

```jsx
import "./uimi.css";

export function SaveButton() {
  return <button className="uimi-btn uimi-btn--primary">Save</button>;
}
```

Also see `examples/vanilla.html`, `examples/react.jsx`, and `examples/vue.vue`.

---

## What not to copy

These are **authoring tools** for this repo. Do not ship them in product apps:

- Design bar (`.uimi-studio`) — theme / font / Paint / Move / Glass controls
- Paint popover, liquid-glass gear/modal, copy FAB
- Catalog nav that lists every Login / Dashboard / Buttons demo
- The **UIMi** logo in that shell (kit branding)

Marked in markup as `data-uimi-kit="authoring"` or `data-uimi-kit="catalog"`.

---

## Themes

Themes are palette + type + shell — not Liquid Glass.

| Attribute | Values | Role |
| --- | --- | --- |
| `data-uimi-palette` | `apricot` · `midnight` · `pastel` · `lavender-mist` | Colors |
| `data-uimi-font` | `inter` · `cooper-hewitt` · `poppins` | UI typeface |
| `data-uimi-display` | same | Headings |
| `data-uimi-shell` | `sidebar` · `navbar` | App chrome layout |

Same palette can power many apps.

---

## Liquid Glass (optional)

Glass is a **separate preference**, like iPhone wallpaper vs transparency. Themes do **not** turn glass on.

| App | Theme | Glass |
| --- | --- | --- |
| Solid app | e.g. `data-uimi-palette="apricot"` | `data-uimi-glass="off"` |
| Glass app | same palette | `data-uimi-glass="on"` + class `uimi-glass` on chosen surfaces |

Presets (pick **one**): **Regular** (default), **Clear**, **Chrome**, **Thick**.

- Don’t invent “Apricot LG” as a fifth theme.
- Don’t ship the Glass Off/On studio chips, gear, or modal.
- If glass isn’t requested, leave it off.

In the catalog: Design bar → Glass **On** → click a surface → gear → preset → Apply.

---

## Pick one variant

The catalog shows options side by side. Ship **one** of each family you need.

| Need | Options | Default if undecided |
| --- | --- | --- |
| Login | `login-1`, `login-2` | `login-1` |
| Dashboard | `dashboard-1` … `dashboard-3` | `dashboard-1` |
| Buttons | rounded / square / pill / oval | rounded |
| Tables | plain wrap · freeze-head · freeze-col · both | plain wrap |

In the preview: open the page you want → copy button in the corner (respects Usage: HTML / React / Vue / Svelte).

---

## Components (quick)

**Buttons** — color then treatment. Colors: `primary`, `info`, `success`, `warning`, `danger`. Treatments: solid (default), border, gradient, soft, liquid, flip. Shapes: default rounded, `--square`, `--pill`, `--oval`. Sizes: `--lg`, `--md` (default), `--sm`.

```html
<button class="uimi-btn uimi-btn--primary">Save</button>
<button class="uimi-btn uimi-btn--primary uimi-btn--border">Save</button>
<button class="uimi-btn uimi-btn--primary uimi-btn--pill uimi-btn--sm">Save</button>
```

**Cards**

```html
<article class="uimi-card">…</article>
<article class="uimi-card" data-uimi-card-corner="cut">…</article>
<article class="uimi-card" data-uimi-card-corner="square">…</article>
```

Global corner: `data-uimi-corner="cut"` on `<html>`.

**Tables**

```html
<div class="uimi-table-wrap">
  <table class="uimi-table">…</table>
</div>
```

Freeze helpers: `uimi-table-wrap--freeze-head`, `--freeze-col`, `--freeze-end`.

**Icons** — Lucide (ISC), vendored in `icons/`:

```html
<span class="uimi-icon uimi-icon-sun" aria-hidden="true"></span>
```

More patterns (forms, tabs, charts, alerts, pagination) live in `index.html` and the catalog pages.

---

## Catalog map

| Nav | Pages |
| --- | --- |
| Login | `#login-1`, `#login-2` |
| Dashboard | `#dashboard-1`, `#dashboard-2`, `#dashboard-3` |
| Settings | `#settings` |
| Components | `#buttons`, `#cards`, `#tables`, `#charts`, `#notifications`, `#badges`, `#forms`, `#tabs` |

- Login 1 — split brand + form  
- Login 2 — centered card  
- Dashboard 1 — hero + stats/charts  
- Dashboard 2 — title + stats, no hero  
- Dashboard 3 — work queue table + activity  

---

## Sharing this kit

1. Give people access to this repo (public GitHub, invite, or zip).
2. Point them at this README.
3. They copy CSS + fonts/icons and one layout — not the Design studio.

Agent / Cursor notes: see [AGENTS.md](AGENTS.md).

---

## Credits

- Icons: [Lucide](https://lucide.dev/) (ISC), vendored in `icons/`
- Catalog brand mark (`.uimi-kit-mark` only): [letter U](https://www.flaticon.com/free-icon/letter-u_8149880) (Flaticon — attribution required). Do not ship in product apps; use your own logo in `.uimi-mark`.
- Fonts: [Inter](https://open-foundry.com/fonts/inter), [Cooper Hewitt](https://open-foundry.com/fonts/cooper-hewitt), [Poppins](https://fonts.google.com/specimen/Poppins) (OFL)
- Palettes: Apricot / Pastel via Coolors; Lavender Mist; Midnight
