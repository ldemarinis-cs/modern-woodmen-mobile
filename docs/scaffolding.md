# Project Setup & Scaffolding

The project is already scaffolded. This file covers how to run it locally, how to apply the Modern Woodmen brand tokens once they are confirmed, and how to connect the Figma design file.

---

## 🛠️ Tech Stack

| Layer | Choice |
|---|---|
| Build tool | **Vite** |
| Framework | **React** (via `@vitejs/plugin-react`) |
| Styling | **Tailwind CSS v4** |
| Icons | **Heroicons** (`@heroicons/react`) |
| Display font | **Sora** (placeholder — replace when MW brand guide confirmed) |
| Body font | **Figtree** (placeholder — replace when MW brand guide confirmed) |
| Language | **TypeScript** |

---

## 🚀 Running locally

```sh
npm install
npm run dev
```

Open `http://localhost:5173` in a browser.

The app renders inside a 390px phone frame centered on the desktop screen. This matches an iPhone 14 Pro viewport. On a real mobile device or browser with a narrow viewport, the frame fills the screen naturally.

---

## 🔌 Figma MCP Server (recommended)

To read design files directly from Figma inside Claude Code, add the Figma MCP server:

```sh
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

You will be prompted to authenticate with Figma in the browser on first use. Once connected, Claude Code can read any Figma file you share a link to — useful for pulling updated colors, components, and layouts directly from the Modern Woodmen design files.

---

## 🎨 Applying the Modern Woodmen brand tokens

All brand colors and fonts are currently set to placeholder values. Once the official Modern Woodmen brand guide is received:

### 1. Update color tokens in `src/index.css`

Find every line marked `/* TODO: MW */` in the `@theme {}` block and replace the hex value with the correct brand color. The tokens follow this structure:

```css
--color-brand:     #000000; /* TODO: MW — replace with primary brand color */
--color-brand-97:  #F5F5F5; /* TODO: MW — lightest background tint */
--color-brand-93:  #E8E8E8; /* TODO: MW */
/* ...etc */
```

Replace the placeholder hex values with the confirmed palette. Every component that uses `bg-brand`, `text-brand`, `border-brand-*` etc. will update automatically — no component-level edits needed.

### 2. Update fonts in `index.html` and `src/index.css`

In `index.html`, find the Google Fonts `<link>` tag and replace `Figtree` and `Sora` with the confirmed Modern Woodmen typefaces.

In `src/index.css`, find the font family tokens and update them:

```css
--font-sans:    'Figtree', system-ui, sans-serif;    /* TODO: MW — replace with body font */
--font-display: 'Sora', system-ui, sans-serif;       /* TODO: MW — replace with display font */
```

### 3. Verify the result

Run `npm run dev` and visually scan the app. Because all tokens are centralized in `src/index.css`, the entire UI should update in one pass with no component-level changes required.

---

## 📁 Project structure

```
src/
  App.tsx                  — root, layout, route definitions
  index.css                — Tailwind import, @theme tokens, global keyframes
  components/
    layout/                — navigation bar, tab bar, shell wrappers
    screens/               — full screens (one file per screen)
    shared/                — reusable components (cells, badges, buttons, modals)
index.html                 — font links, root mount point
docs/
  design-system.md         — visual conventions, tokens, component patterns
  animation.md             — easing, durations, keyframes
  scaffolding.md           — this file
  production-stack.md      — notes on graduating to production
```

---

## Adding new screens (Path C — project already exists)

Before writing a new screen, check `src/components/screens/` to understand the existing patterns. Match the same navigation bar markup, spacing, and font classes already in use.

If installing additional dependencies is needed, check `package.json` first — do not install something already present.
