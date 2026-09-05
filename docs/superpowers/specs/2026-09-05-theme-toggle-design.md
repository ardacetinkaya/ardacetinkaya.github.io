# Theme Toggle (Light/Dark/Auto) Design

## Goal

Let the user explicitly choose Light or Dark appearance from the site menu area,
while defaulting to the browser/OS preference (`prefers-color-scheme`) when no
explicit choice has been made. Everything else on the site stays as-is.

## Current State

`public/assets/css/style.css` already defines the full color palette as CSS
custom properties on `:root`, and overrides them inside a
`@media (prefers-color-scheme: dark) { :root { ... } }` block. There is no UI
control to override this — it is purely OS-driven today.

## Approach

### CSS

Add two new rule blocks to `style.css`, placed after the existing `:root` and
`prefers-color-scheme` blocks:

```css
html[data-theme="light"] {
  /* same values as the default :root block */
}

html[data-theme="dark"] {
  /* same values as the existing prefers-color-scheme: dark block */
}
```

An attribute selector on `html` (specificity 0,1,1) is more specific than the
pseudo-class `:root` (specificity 0,1,0), so these blocks win over the
`prefers-color-scheme` media query whenever `data-theme` is present —
regardless of source order. When `data-theme` is absent, nothing changes and
the OS preference continues to drive the palette exactly as it does today.

### Component: `src/components/ThemeToggle.js`

A small stateful component rendered as an icon button:

- Internal/localStorage state is one of `"auto" | "light" | "dark"` (default
  `"auto"`, i.e. no explicit choice stored).
- Clicking cycles: `auto → light → dark → auto → ...`.
- On each change:
  - `"auto"`: remove `theme` from `localStorage` and remove the `data-theme`
    attribute from `document.documentElement`.
  - `"light"` / `"dark"`: persist the value to `localStorage` (key: `theme`)
    and set `document.documentElement.dataset.theme` accordingly.
- On mount, reads `localStorage.getItem("theme")` and applies the
  `data-theme` attribute immediately (before first paint is not guaranteed in
  CRA, but this is acceptable — no SSR is involved, and the flash window is
  negligible for a personal portfolio site).
- Icon reflects current effective mode using the existing Unicons icon font
  (already used in `Social.js` via `uil uil-*` classes):
  - `auto` → `uil uil-desktop`
  - `light` → `uil uil-sun`
  - `dark` → `uil uil-moon`
- Exposes a `title`/`aria-label` describing the current mode and the action
  ("Switch to Light/Dark/Auto appearance") for accessibility.

### Wiring into `App.js`

Rendered in the header, next to the existing `Social` component's column
(outside of `<Menu>`'s `<ul className="nav">`), so it sits near the
profile/social icons rather than as a nav-list item.

## Out of Scope

- No changes to `Menu.js` nav items.
- No changes to any other visual behavior, routes, or data flow.
- No testing framework changes; this is a small, isolated UI addition.
