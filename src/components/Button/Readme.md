# Button Component — Setup Guide

## File structure

```
src/components/Button/
├── Button.tsx           ← Component + ButtonGroup + ButtonSpinner
├── Button.test.tsx      ← Vitest + Testing Library tests
├── Button.stories.tsx   ← Storybook 8 stories
└── index.ts             ← Re-exports (optional)
```

---

## Dependencies

```bash
# Component
npm install clsx tailwind-merge lucide-react

# Testing
npm install -D vitest @testing-library/react @testing-library/user-event \
  @testing-library/jest-dom jsdom

# Storybook 8
npx storybook@latest init
npm install -D @storybook/test @storybook/react-vite
```

---

## Vitest config (`vitest.config.ts`)

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./src/test/setup.ts"],
  },
});
```

## Test setup (`src/test/setup.ts`)

```ts
import "@testing-library/jest-dom";
```

## Run tests

```bash
npx vitest run                # single run
npx vitest                    # watch mode
npx vitest --coverage         # with coverage
```

---

## Tailwind config

Make sure your `tailwind.config.ts` includes:

```ts
export default {
  darkMode: "class",            // needed for dark: utilities
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      height: { 13: "3.25rem" },   // h-13 for xl size
    },
  },
};
```

---

## Storybook config (`.storybook/main.ts`)

```ts
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "@storybook/addon-interactions",
  ],
  framework: { name: "@storybook/react-vite", options: {} },
};

export default config;
```

## Run Storybook

```bash
npx storybook dev -p 6006
npx storybook build             # production build
```

---

## Story inventory

| Story name              | What it shows                                |
|-------------------------|----------------------------------------------|
| Playground              | All controls wired up — interactive sandbox  |
| Variants                | All 9 variants side by side                  |
| Sizes                   | xs → xl                                      |
| Primary / Secondary … | One story per variant for autodocs           |
| Loading                 | Spinner + loadingText combos                 |
| Disabled                | Opacity + pointer-events-none                |
| WithIcons               | leftIcon / rightIcon / both                  |
| IconOnly                | Square buttons with aria-label               |
| IconOnlySizes           | Icon-only across all 5 sizes                 |
| Pill                    | Pill shape across variants                   |
| FullWidth               | Stretched layout in a 340px container        |
| AsAnchor                | Polymorphic `<a>` render via `href`          |
| Group                   | Horizontal + vertical ButtonGroup            |
| DarkMode                | All variants on dark bg (toggle toolbar)     |
| ModalFooter             | Real-world composition example               |

---

## Test coverage summary

The test file covers:

- **ButtonSpinner** — aria-hidden, size classes
- **Rendering** — element type, ref forwarding, className merging, spread props, polymorphic `<a>`
- **Variants** — all 9 variants mount without error; primary default class check
- **Sizes** — height class for each of 5 tiers
- **Shape** — pill rounds corners; icon hides children and squares the button
- **Icons** — leftIcon before label, rightIcon after label
- **Disabled** — HTML attribute, aria-disabled, click suppression
- **Loading** — spinner presence, children hidden, loadingText, disabled, aria-busy, click suppression
- **FullWidth** — w-full present / absent
- **Interaction** — click, tab focus, Enter key, Space key
- **Accessibility** — role=button, icon aria-label, role=link for anchors
- **ButtonGroup** — role=group, child count, orientation classes, className merge