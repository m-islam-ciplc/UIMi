# UIMi

UIMi is a workspace UI you can use in HTML, React, Vue, or Svelte. One CSS file, same class names everywhere.

Open `index.html` to preview the console.

## Use it

**HTML**

```html
<link rel="stylesheet" href="uimi.css" />
<button class="uimi-btn uimi-btn--primary">Save</button>
```

**React**

```jsx
import "./uimi.css";

export function SaveButton() {
  return <button className="uimi-btn uimi-btn--primary">Save</button>;
}
```

Icons are Lucide (ISC), vendored in `icons/`. Same class names in HTML, React, Vue, and Svelte:

```html
<span class="uimi-icon uimi-icon-sun" aria-hidden="true"></span>
<span class="uimi-icon uimi-icon-moon" aria-hidden="true"></span>
```

Brand mark uses [letter U](https://www.flaticon.com/free-icon/letter-u_8149880) from Flaticon (free license — attribution required).

The kit ships three ready-made themes in the Design bar — Apricot ([Coolors](https://coolors.co/palette/ffcdb2-ffb4a2-e5989b-b5838d-6d6875)), Midnight, and Pastel ([Coolors](https://coolors.co/palette/e8a598-ffb5a7-fec5bb-fcd5ce-fae1dd-f8edeb-f9e5d8-f9dcc4-fcd2af-fec89a)). Each packs colors and radius together. Typefaces are [Inter](https://open-foundry.com/fonts/inter) and [Cooper Hewitt](https://open-foundry.com/fonts/cooper-hewitt) (OFL), vendored in `fonts/inter/` and `fonts/cooper-hewitt/`. Body uses thin weights; headings use semibold — same weight map for both faces.

Buttons come in solid, border, gradient, and flip treatments. Add a color, then a treatment. Solid is the default. Colors are `primary`, `info`, `success`, `warning`, and `danger`. Flip slides four alternate blocks across the fill and rolls the label.

```html
<button class="uimi-btn uimi-btn--primary">Save</button>
<button class="uimi-btn uimi-btn--primary uimi-btn--solid">Save</button>
<button class="uimi-btn uimi-btn--primary uimi-btn--border">Save</button>
<button class="uimi-btn uimi-btn--primary uimi-btn--gradient">Save</button>
<button class="uimi-btn uimi-btn--primary uimi-btn--flip">Save</button>
```

Corners are rounded by default. Square and pill are their own pages in the catalog (`#buttons-1`, `#buttons-2`, `#buttons-3`). `#buttons` opens Button 1.

```html
<button class="uimi-btn uimi-btn--primary">Save</button>
<button class="uimi-btn uimi-btn--primary uimi-btn--square">Save</button>
<button class="uimi-btn uimi-btn--primary uimi-btn--pill">Save</button>
```

Sizes are large, medium, and small. The default is medium:

```html
<button class="uimi-btn uimi-btn--primary uimi-btn--lg">Large</button>
<button class="uimi-btn uimi-btn--primary uimi-btn--md">Medium</button>
<button class="uimi-btn uimi-btn--primary uimi-btn--sm">Small</button>
```

Breadcrumbs, notification alerts, and pagination use the same class pattern:

```html
<nav class="uimi-crumbs" aria-label="Breadcrumb">
  <a href="#dashboard">Workspace</a>
  <span class="uimi-crumbs-sep">/</span>
  <span>Accounts</span>
</nav>

<div class="uimi-alert">Info</div>
<div class="uimi-alert uimi-alert--ok">Success</div>
<div class="uimi-alert uimi-alert--warn">Warning</div>
<div class="uimi-alert uimi-alert--danger">Error</div>

<nav class="uimi-pager" data-uimi-pager aria-label="Pagination">
  <button class="uimi-btn uimi-btn--ghost uimi-btn--sm">Previous</button>
  <button class="uimi-pager-page is-active">1</button>
  <button class="uimi-pager-page">2</button>
  <button class="uimi-btn uimi-btn--ghost uimi-btn--sm">Next</button>
</nav>
```

Tables scroll inside `uimi-table-wrap`. Freeze the header, the first column, the last column, or any mix. Header freeze uses a 280px max height. Override it with `--uimi-table-max`.

```html
<div class="uimi-table-wrap">
  <table class="uimi-table">…</table>
</div>

<div class="uimi-table-wrap uimi-table-wrap--freeze-head">
  <table class="uimi-table">…</table>
</div>

<div class="uimi-table-wrap uimi-table-wrap--freeze-col">
  <table class="uimi-table">…</table>
</div>

<div class="uimi-table-wrap uimi-table-wrap--freeze-head uimi-table-wrap--freeze-col uimi-table-wrap--freeze-end">
  <table class="uimi-table">…</table>
</div>
```

Wrap a bell button with `uimi-notify` and `data-uimi-notify-toggle` to open the panel. Clicking a notification in the preview jumps to the matching page.

Tabbed pages use `uimi-tabset`. Line tabs sit on a strip. The selected page has a bar under the label.

```html
<div class="uimi-tabset" data-uimi-tabs>
  <div class="uimi-tabs" role="tablist">
    <button class="uimi-tab" data-tab="overview" aria-selected="true">Overview</button>
    <button class="uimi-tab" data-tab="invoices" aria-selected="false">Invoices</button>
  </div>
  <div class="uimi-tab-panel" data-uimi-panel="overview">Account summary</div>
  <div class="uimi-tab-panel" data-uimi-panel="invoices" hidden>Invoice list</div>
</div>
```

Add `uimi-tabs--pills` on the tab list for a compact switcher.

Text fields, dropdowns, and dates:

```html
<label class="uimi-field">
  <span class="uimi-label">Work email</span>
  <input class="uimi-input" type="email" />
</label>

<select class="uimi-select">
  <option>Business</option>
</select>

<div class="uimi-datepicker" data-uimi-datepicker>
  <input class="uimi-input" type="text" readonly />
  <div class="uimi-calendar" hidden></div>
</div>

<div class="uimi-dateparts" data-uimi-dateparts data-value="16 Sep 2026">
  <select class="uimi-select" data-part="day" aria-label="Day"></select>
  <select class="uimi-select" data-part="month" aria-label="Month"></select>
  <select class="uimi-select" data-part="year" aria-label="Year"></select>
</div>

<div class="uimi-calendar uimi-calendar--inline" data-uimi-calendar></div>
```

Charts are `bar`, `stacked`, `line`, `area`, or `donut`. Stacked bars take one group of values per category. `data-uimi-chart-series` names the segments.

```html
<div
  class="uimi-chart"
  data-uimi-chart
  data-uimi-chart-type="stacked"
  data-uimi-chart-values="28,18,12,34,22,14,31,26,16,42,30,18"
  data-uimi-chart-labels="Q1,Q2,Q3,Q4"
  data-uimi-chart-series="Platform,Onboarding,Compliance"
></div>
```

## Navigation

The preview sidebar is grouped like a component catalog:

- **Login** — Login 1, Login 2
- **Dashboard** — Dashboard 1, Dashboard 2, Dashboard 3
- **Settings**
- **Components** — Button 1, Button 2, Button 3, Cards, Tables, Charts, Notifications, Badges, Forms, Tabs

Each item is its own page (`#login-1`, `#login-2`, `#dashboard-1`, `#dashboard-2`, `#dashboard-3`, `#buttons-1`, `#buttons-2`, `#buttons-3`, `#cards`, `#tables`, `#notifications`, `#badges`, `#charts`, `#forms`, `#tabs`). `#login` opens Login 1. `#dashboard` opens Dashboard 1. `#buttons` opens Button 1. Old `#accounts` links open Tables.

Login layouts:

- **Login 1** — split: brand panel and form
- **Login 2** — centered card

Open one, then click the copy button in the corner. That copies the page plus the layout from the Design bar. Same for dashboards.

Dashboard layouts:

- **Dashboard 1** — hero banner, then stats and charts
- **Dashboard 2** — no hero; title on the page, then stats and a stacked bar chart
- **Dashboard 3** — split work queue; title and actions, then table and activity

Button shapes:

- **Button 1** — rounded corners
- **Button 2** — square corners
- **Button 3** — pill

Use a sidebar or a top navbar. Set `data-uimi-shell` on `<html>`:

```html
<html data-uimi-shell="sidebar">
<html data-uimi-shell="navbar">
```

The preview keeps layout, theme, and usage (HTML, React, Vue, or Svelte) in a Design bar. Open the login or dashboard you want, then click the copy button in the corner. That copies the markup plus shell. Click a button sample to copy that button with the same setup. Markup on Buttons and Cards follows the Usage dropdown. Card corners are a catalog, not a gear: open **Cards** and pick Rounded, Cut, or Square. Fill follows the workspace colors.

```html
<article class="uimi-card">…</article>
<article class="uimi-card" data-uimi-card-corner="cut">…</article>
<article class="uimi-card" data-uimi-card-corner="square">…</article>
```

To use one shape on every card, set `data-uimi-corner` on `<html>`:

```html
<html data-uimi-corner="cut">
```

Users can switch ready-made themes from the Design bar. Each theme sets colors via `data-uimi-palette` on `<html>`. UI and heading typefaces switch via `data-uimi-font` and `data-uimi-display` (`inter` or `cooper-hewitt`).
