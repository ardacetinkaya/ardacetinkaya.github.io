# Theme Toggle (Light/Dark/Auto) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a menu-area icon button that lets the user explicitly pick Light or Dark appearance, cycling Auto → Light → Dark → Auto, while defaulting to the browser/OS preference when no explicit choice has been made.

**Architecture:** CSS custom properties already drive the whole palette via `:root` and a `@media (prefers-color-scheme: dark)` override. We add two new `html[data-theme="light"]`/`html[data-theme="dark"]` blocks with higher specificity than `:root` so an explicit choice (reflected as a `data-theme` attribute on `<html>`, persisted in `localStorage`) overrides the OS preference. A new `ThemeToggle` React component owns the button, the cycling state machine, and syncing `localStorage`/the DOM attribute; it's rendered in `App.js` next to the existing `Social` icons.

**Tech Stack:** React 18 (class components, matching existing style), Create React App / react-scripts (Jest + React Testing Library already configured), plain CSS custom properties, Unicons icon font (`uil uil-*`, already used in `Social.js`).

## Global Constraints

- Default appearance (no stored preference) must remain exactly the current browser/OS-driven behavior — no visual change for users who never touch the toggle.
- Only add the toggle; do not modify `Menu.js`'s nav items or any other existing component's markup/behavior.
- Follow existing code style: ES5-style class components (`class X extends Component`), not hooks/function components, to match `Menu.js`/`Social.js`/`App.js`.
- Persist the explicit choice in `localStorage` under the key `theme`; "Auto" means the key is absent.

---

### Task 1: Explicit theme CSS overrides

**Files:**
- Modify: `public/assets/css/style.css:39-40`

**Interfaces:**
- Produces: `html[data-theme="light"]` and `html[data-theme="dark"]` CSS selectors that later tasks rely on being toggled via `document.documentElement.setAttribute("data-theme", ...)` / `removeAttribute("data-theme")`.

- [ ] **Step 1: Add the two override blocks**

Open `public/assets/css/style.css`. Find this exact existing block (currently ending at line 40):

```css
@media (prefers-color-scheme: dark) {
    :root {
        --color-light: #222; /* Adjusted to a slightly off-white for readability */
        --color-bg: #121212; /* Dark background */
        --color-copy: #b3b3b3; /* Lighter gray for text */
        --color-default: #cccccc; /* Default text color */
        --color-muted: #888888; /* Muted text color */
        --color-dark: #ffffff; /* Light color for text */
        --color-border: rgba(255, 255, 255, 0.1); /* Light border for contrast */
        --color-border-strong: rgba(255, 255, 255, 0.2); /* Stronger border */
        --shadow: 0 0px 3px 0 rgba(0, 0, 0, 0.8); /* Darker shadow for depth */
        --color-brand: rgba(255, 255, 255, 0.05);
        --color-progress: rgba(255, 255, 255, 0.3);
        --input-padding-x: 1rem;
        --input-padding-y: 0.5rem;
        --inverted: 1;
    }
}
```

Immediately after its closing `}` (and before the next `/*---...` comment banner), insert:

```css

/* Explicit theme overrides — win over prefers-color-scheme because
   html[data-theme] has higher specificity than :root. Applied by
   ThemeToggle via document.documentElement.dataset.theme. */
html[data-theme="light"] {
    --color-light: #fff;
    --color-bg: #f3f3f3;
    --color-copy: #808080;
    --color-default: #a7a7a7;
    --color-muted: #a7a7a7;
    --color-dark: #303030;
    --color-border: rgba(0, 0, 0, 0.05);
    --color-border-strong: rgba(0, 0, 0, 0.1);
    --shadow: 0 0px 3px 0 rgba(0, 0, 0, 0.08);
    --color-brand: rgba(0, 0, 0, 0.05);
    --color-progress: #e9ecef;
    --input-padding-x: 1rem;
    --input-padding-y: 0.5rem;
    --inverted: 0;
}

html[data-theme="dark"] {
    --color-light: #222;
    --color-bg: #121212;
    --color-copy: #b3b3b3;
    --color-default: #cccccc;
    --color-muted: #888888;
    --color-dark: #ffffff;
    --color-border: rgba(255, 255, 255, 0.1);
    --color-border-strong: rgba(255, 255, 255, 0.2);
    --shadow: 0 0px 3px 0 rgba(0, 0, 0, 0.8);
    --color-brand: rgba(255, 255, 255, 0.05);
    --color-progress: rgba(255, 255, 255, 0.3);
    --input-padding-x: 1rem;
    --input-padding-y: 0.5rem;
    --inverted: 1;
}
```

- [ ] **Step 2: Sanity-check the file has no syntax errors**

Run: `node -e "require('fs').readFileSync('public/assets/css/style.css','utf8')" && echo OK`
Expected: `OK` (this just confirms the file is still readable/valid UTF-8 text; there is no CSS linter configured in this project).

- [ ] **Step 3: Commit**

```bash
git add public/assets/css/style.css
git commit -m "feat: add explicit light/dark theme CSS overrides"
```

---

### Task 2: `ThemeToggle` component

**Files:**
- Create: `src/components/ThemeToggle.js`
- Test: `src/components/ThemeToggle.test.js`

**Interfaces:**
- Consumes: `html[data-theme="light"]` / `html[data-theme="dark"]` CSS hooks from Task 1 (component only needs to know the attribute name/values, not the CSS itself).
- Produces: default export `ThemeToggle`, a React class component with no required props, rendering a `<button>` containing an `<i>` whose class is one of `uil uil-desktop` (auto), `uil uil-sun` (light), `uil uil-moon` (dark). Later tasks (Task 3) import it as `import ThemeToggle from "./components/ThemeToggle";` and render `<ThemeToggle />` with no props.

- [ ] **Step 1: Write the failing tests**

Create `src/components/ThemeToggle.test.js`:

```jsx
import React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import ThemeToggle from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.removeAttribute("data-theme");
  });

  afterEach(() => {
    cleanup();
  });

  test("defaults to auto with no stored preference", () => {
    const { container } = render(<ThemeToggle />);
    expect(container.querySelector(".uil-desktop")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBeNull();
  });

  test("cycles auto -> light -> dark -> auto on click", () => {
    const { container, getByRole } = render(<ThemeToggle />);
    const button = getByRole("button");

    fireEvent.click(button);
    expect(container.querySelector(".uil-sun")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("light");
    expect(window.localStorage.getItem("theme")).toBe("light");

    fireEvent.click(button);
    expect(container.querySelector(".uil-moon")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(window.localStorage.getItem("theme")).toBe("dark");

    fireEvent.click(button);
    expect(container.querySelector(".uil-desktop")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBeNull();
    expect(window.localStorage.getItem("theme")).toBeNull();
  });

  test("initializes from an existing stored preference", () => {
    window.localStorage.setItem("theme", "dark");
    const { container } = render(<ThemeToggle />);
    expect(container.querySelector(".uil-moon")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  test("ignores an invalid stored preference and falls back to auto", () => {
    window.localStorage.setItem("theme", "purple");
    const { container } = render(<ThemeToggle />);
    expect(container.querySelector(".uil-desktop")).toBeInTheDocument();
    expect(document.documentElement.getAttribute("data-theme")).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `CI=true npx react-scripts test src/components/ThemeToggle.test.js`
Expected: FAIL — `Cannot find module './ThemeToggle' from 'src/components/ThemeToggle.test.js'`

- [ ] **Step 3: Write the component implementation**

Create `src/components/ThemeToggle.js`:

```jsx
import React, { Component } from "react";

const THEME_STORAGE_KEY = "theme";
const THEME_ORDER = ["auto", "light", "dark"];
const THEME_ICON_CLASS = {
    auto: "uil uil-desktop",
    light: "uil uil-sun",
    dark: "uil uil-moon",
};
const THEME_LABEL = {
    auto: "Auto",
    light: "Light",
    dark: "Dark",
};

class ThemeToggle extends Component {
    constructor(props) {
        super(props);
        this.state = { theme: this.readStoredTheme() };
    }

    componentDidMount() {
        this.applyTheme(this.state.theme);
    }

    readStoredTheme = () => {
        const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
        return THEME_ORDER.includes(stored) ? stored : "auto";
    }

    applyTheme = (theme) => {
        if (theme === "auto") {
            document.documentElement.removeAttribute("data-theme");
        } else {
            document.documentElement.setAttribute("data-theme", theme);
        }
    }

    handleClick = () => {
        const currentIndex = THEME_ORDER.indexOf(this.state.theme);
        const nextTheme = THEME_ORDER[(currentIndex + 1) % THEME_ORDER.length];

        if (nextTheme === "auto") {
            window.localStorage.removeItem(THEME_STORAGE_KEY);
        } else {
            window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        }

        this.applyTheme(nextTheme);
        this.setState({ theme: nextTheme });
    }

    render() {
        const { theme } = this.state;
        const label = `Switch appearance (current: ${THEME_LABEL[theme]})`;

        return (
            <button
                type="button"
                className="theme-toggle btn btn-link p-0"
                onClick={this.handleClick}
                title={label}
                aria-label={label}
            >
                <i className={THEME_ICON_CLASS[theme]}></i>
            </button>
        )
    }
}

export default ThemeToggle;
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `CI=true npx react-scripts test src/components/ThemeToggle.test.js`
Expected: PASS — 4 tests passed (`defaults to auto...`, `cycles auto -> light -> dark -> auto...`, `initializes from an existing stored preference`, `ignores an invalid stored preference...`)

- [ ] **Step 5: Commit**

```bash
git add src/components/ThemeToggle.js src/components/ThemeToggle.test.js
git commit -m "feat: add ThemeToggle component"
```

---

### Task 3: Wire `ThemeToggle` into `App.js`

**Files:**
- Modify: `src/App.js:1-13` (imports), `src/App.js` header column that renders `Social` (currently the `<div className="col-1 mx-auto col-lg-12 order-2 order-lg-3">` block)

**Interfaces:**
- Consumes: `ThemeToggle` default export from Task 2 (`import ThemeToggle from "./components/ThemeToggle";`, rendered as `<ThemeToggle />`).
- Produces: nothing consumed by later tasks — this is the final integration point.

- [ ] **Step 1: Add the import**

In `src/App.js`, find:

```js
import Contact from "./components/Contact";
```

Add immediately after it:

```js
import ThemeToggle from "./components/ThemeToggle";
```

- [ ] **Step 2: Render it next to the Social icons**

In `src/App.js`, find this exact block:

```jsx
              <div className="col-1 mx-auto col-lg-12 order-2 order-lg-3">
                {this.state.loading ?
                  <div className="spinner-grow spinner-grow-sm" role="status">
                    <span className="sr-only"></span>
                  </div> : <Social data={this.state.socialAddresses} />
                }

              </div>
```

Replace it with:

```jsx
              <div className="col-1 mx-auto col-lg-12 order-2 order-lg-3">
                {this.state.loading ?
                  <div className="spinner-grow spinner-grow-sm" role="status">
                    <span className="sr-only"></span>
                  </div> : <Social data={this.state.socialAddresses} />
                }
                <ThemeToggle />
              </div>
```

- [ ] **Step 3: Run the full test suite**

Run: `CI=true npx react-scripts test`
Expected: PASS — all existing tests (`App.test.js`, `ThemeToggle.test.js`) pass, no regressions.

- [ ] **Step 4: Run a production build to confirm no build errors**

Run: `npx react-scripts build`
Expected: Exits 0 with `Compiled successfully.` (warnings about bundle size are pre-existing/acceptable; there must be no new errors).

- [ ] **Step 5: Manual smoke check**

Run: `npx serve -s build -l 5005` (or `npx react-scripts start` if you prefer the dev server), then open the site in a browser:
- Confirm a small icon button (desktop icon) appears next to the social icons.
- Click it once: page switches to light palette, icon becomes a sun, `localStorage.getItem("theme")` is `"light"`.
- Click again: page switches to dark palette, icon becomes a moon, `localStorage.getItem("theme")` is `"dark"`.
- Click again: icon returns to desktop, `localStorage.getItem("theme")` is `null`, and the page again reflects the OS/browser preference.
- Reload the page after setting it to `"dark"`: confirm it stays dark (persistence works across reloads).
Stop the server afterward.

- [ ] **Step 6: Commit**

```bash
git add src/App.js
git commit -m "feat: wire ThemeToggle into App header"
```
