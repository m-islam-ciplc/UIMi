# Agent notes for UIMi

UIMi is a **UI kit + preview catalog**. `index.html` shows many optional layouts side by side. It is not a product app to clone wholesale.

## Do not clone into product UIs

- **Design studio** (`.uimi-studio`): theme/font/usage selects, Paint, Move, Glass — authoring only.
- **Injected editors**: paint popover, liquid-glass gear/modal, copy FAB.
- **Catalog chrome**: navbar/sidebar that links every Login / Dashboard / Buttons demo.
- **UIMi logo**: `.uimi-kit-mark` / `icons/letter-u.png` — kit only. Product apps use their own logo in `.uimi-mark` (or omit it). Never paste the catalog brand into a child app.
- **Every variant**: Login 1 + Login 2, Dashboard 1–3, all table demos, etc. Pick **one** of each family.

## Do clone / reuse

- `uimi.css` + class names (`uimi-btn`, `uimi-card`, …)
- Theme via `data-uimi-palette` / `data-uimi-font` / `data-uimi-display` / `data-uimi-shell` on `<html>`
- Markup from a **single** chosen `.uimi-page[data-uimi-page]` (or a single component pattern from a catalog page)

## How to choose among variants

Other Cursor sessions must **not** dump every login/table/dashboard into the product. Pick one per family:

1. If the user says which one (e.g. “Login 2”, “freeze column table”) → use that.
2. If they don’t → ask once with the short list. Don’t build all variants while waiting.
3. If they say “you pick” / “defaults” → use `*-1` (or the first simple pattern on that page).

| Need | Catalog ids / patterns | Default |
| --- | --- | --- |
| Login | `login-1`, `login-2` | `login-1` |
| Dashboard | `dashboard-1` … `dashboard-3` | `dashboard-1` |
| Button radius | rounded / square / pill / `uimi-btn--oval` (catalog `#buttons` is 2×2) | rounded |
| Table | plain · `--freeze-head` · `--freeze-col` · both+end | plain wrap |
| Cards / forms / etc. | multiple demos on one page | one block only |

Same theme + glass preference can be reused across apps; **variant choice is per screen**, not “copy the whole catalog.”

## Liquid Glass (preference, not a theme)

Do **not** invent “Apricot LG” / “Apricot solid” as separate themes. Palette and glass are independent — like iPhone wallpaper vs Liquid Glass / Reduce Transparency.

| App | Theme | Glass |
| --- | --- | --- |
| Software A (solid) | `data-uimi-palette="apricot"` (etc.) | `data-uimi-glass="off"` |
| Software B (glass) | same palette attrs | `data-uimi-glass="on"` + `.uimi-glass` on chrome surfaces |

**How to choose (same idea as login/table variants):**

1. User says solid / no glass / don’t use LG → `data-uimi-glass="off"`, no `.uimi-glass`.
2. User says glass / LG / liquid glass → `data-uimi-glass="on"` + `.uimi-glass` on chrome they care about.
3. User names a preset (Regular / Clear / Chrome / Thick) → that preset only.
4. User wants glass but no preset → **Regular**.
5. User doesn’t mention glass → **leave Off** (solid). Do not invent glass for “modern” looks.
6. Never ship Glass Off/On chips, gear, or modal.

Same palette can back App A (off) and App B (on). Glass is not a fifth theme and not “all four presets at once.”

Authoring nodes are marked `data-uimi-kit="authoring"`. See `.cursor/rules/uimi-kit-vs-product.mdc`.
