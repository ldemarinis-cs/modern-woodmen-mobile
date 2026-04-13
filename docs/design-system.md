# Modern Woodmen Mobile Design System

> **Brand tokens are TBD.** Colors and fonts use `brand-*` placeholder tokens throughout. Once the Modern Woodmen brand guide is confirmed, replace placeholder values in `src/index.css` and update the Google Fonts link in `index.html`. Search for `/* TODO: MW */` comments to find every token that needs updating.

---

## 🛠️ Tech Stack

| Layer | Choice |
|---|---|
| Build tool | **Vite** |
| Framework | **React** (via `@vitejs/plugin-react`) |
| Styling | **Tailwind CSS v4** |
| Icons | **Heroicons** (`@heroicons/react`) |
| Display font | **Sora** — headings and large display text (`text-2xl` and above) — placeholder until MW brand guide confirmed |
| Body font | **Figtree** — all body copy and UI text (`text-xl` and below) — placeholder until MW brand guide confirmed |
| Language | **TypeScript** |

Extend Tailwind's theme with the color tokens defined in this file. Do not use arbitrary hex values inline — use token classes so the brand can be updated in one place.

---

## 🎯 Icons

Use **Heroicons** (`@heroicons/react`) for all icons. Do not use inline SVG paths or other icon libraries unless a specific icon is unavailable in Heroicons.

Heroicons comes in three styles — choose based on context:

| Style | Import path | When to use |
|---|---|---|
| Outline | `@heroicons/react/24/outline` | Default — navigation, UI chrome, labels |
| Solid | `@heroicons/react/24/solid` | Emphasis, filled states, active indicators |
| Mini | `@heroicons/react/20/solid` | Tight UI — badges, inline text, small buttons |

### Minimum icon size

**`w-4 h-4` (16px) is the floor.** No icon visible to the user may be smaller than 16px on its longest side.

Documented exceptions — these may go below `w-4 h-4`:

| Exception | Example | Why |
|---|---|---|
| Status dots | `w-2 h-2 rounded-full` | CSS shape, not an icon — purely decorative |
| Checkmarks inside checkboxes | `CheckIcon w-2.5 h-2.5` inside a `w-4 h-4` box | Must be smaller than its container |
| Icon-within-icon overlays | `w-3 h-3` inside a `w-5 h-5 rounded-full` source badge | Icon is decorating another icon container |

Everything else — action buttons, toolbar icons, leading/trailing icons in pill buttons, nav chevrons — must be `w-4 h-4` or larger.

### Rounding convention by icon context

| Context | Rounding | Why |
|---|---|---|
| Action icon button (standalone, icon only) | `rounded-full` | Circular tap target = consistent action affordance |
| Inline action icons (hover/swipe-revealed) | `rounded-full` | Same rule — icon-only = circular |
| Display icon container (non-interactive section header badge) | `rounded-lg` | No interaction affordance — square is fine |

**The rule in one sentence: if it is interactive and contains only an icon, it must be `rounded-full`.**

```tsx
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { XMarkIcon } from '@heroicons/react/20/solid'

<EnvelopeIcon className="w-5 h-5 text-neutral-400" />

// Action icon — rounded-full
<button className="p-1 rounded-full text-neutral-400 hover:bg-neutral-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
  <XMarkIcon className="w-4 h-4" />
</button>

// Display icon container — rounded-lg is fine
<div className="bg-brand-97 border border-brand-93 flex items-center justify-center p-1 rounded-lg shrink-0">
  <CheckCircleIcon className="w-4 h-4 text-brand" />
</div>
```

---

## 📋 Menus & Dropdowns

Menus are used for contextual actions, pickers, filter dropdowns, and any floating option list. On mobile, prefer bottom sheets over floating menus wherever the list is longer than 3 items.

### Visual conventions

| Element | Spec |
|---|---|
| Container background | `bg-white` |
| Container border | `border border-neutral-300` |
| Container radius | `rounded-xl` |
| Container padding | `p-3` |
| Container shadow | `shadow-[0px_4px_10px_0px_rgba(31,41,58,0.25)]` |
| Container inner gap | `gap-3` |
| Default width | `w-[200px]` — adjust per context |
| Menu title text | `font-sans font-semibold text-base text-neutral-800 leading-[22px] tracking-[0.2px]` |
| Menu title padding | `px-4 py-2 rounded-lg` |
| Divider | `border-t border-neutral-200` (full-width, no padding) |
| Option padding | `px-4 py-3 rounded-lg w-full` |
| Option text | `font-sans font-normal text-base text-neutral-800 leading-[22px] tracking-[0.2px]` |
| Option hover | `hover:bg-neutral-100 transition-colors` |
| Icon size (leading or trailing) | `w-5 h-5` |
| Icon gap | `gap-3` between icon and label |

### Popup and overlay header convention

All popup, dropdown, and overlay headers use the menu title style as the baseline:

```
font-sans font-semibold text-base leading-[22px] tracking-[0.2px]
```

Color is `text-neutral-800` for neutral contexts. No border rule is required beneath the header in floating overlays.

---

## 🔘 Buttons

**All standalone buttons use `rounded-full` (fully rounded pill shape).** All interactive touch targets must be at least 44px tall.

| Context | Rounding |
|---|---|
| Standalone action button (primary, secondary, ghost, destructive) | `rounded-full` |
| Split-button container | `rounded-full` on the outer wrapper with `overflow-hidden` |
| Menu / dropdown options (inside a menu container) | `rounded-lg` — list items, not standalone buttons |
| Icon-only buttons (nav toggles, row actions, close, sort) | `rounded-full` — circular tap target, always |

### Icon button rule

All icon-only buttons use `rounded-full` with a minimum `w-[44px] h-[44px]` tap target. The visual icon may be smaller (e.g. `w-5 h-5`) but the tappable area must meet the 44px minimum.

```tsx
// Correct — icon-only button with safe tap target
<button className="flex items-center justify-center w-[44px] h-[44px] rounded-full text-neutral-500 hover:bg-neutral-100 transition-colors cursor-pointer">
  <XMarkIcon className="w-5 h-5" />
</button>

// Correct — standalone action button
<button className="flex items-center gap-2 px-6 py-3 rounded-full bg-brand text-white font-semibold text-base min-h-[44px]">
  Confirm
</button>

// Wrong — square corners on standalone button
<button className="rounded-md px-4 py-2 bg-brand text-white">Confirm</button>
```

---

## 🏷️ Badges & Chips

Badges communicate status, category, counts, and metadata.

### Sizes

| Size | Padding | Text | Leading | Tracking | When to use |
|---|---|---|---|---|---|
| `base` | `px-[10px] py-[5px]` | `text-base` (16px) | `leading-[22px]` | `tracking-[0.2px]` | Page-level labels, section headers, standalone status |
| `small` | `px-[10px] py-[4px]` | `text-sm` (14px) | `leading-5` | `tracking-[0.25px]` | Most UI contexts — cards, list items |
| `xs` *(compact)* | `px-2 py-0.5` | `text-xs` (12px) | `leading-4` | `tracking-[0.3px]` | Data table cells, tight rows only |

All sizes use `font-semibold`.

### Shapes

| Shape | Class | When to use |
|---|---|---|
| Pill | `rounded-full` | Status, counts, most badge contexts |
| Rounded rect | `rounded-lg` | Category tags, longer labels |

### Colors

**Light theme** (default):

| Color | Background | Text |
|---|---|---|
| neutral | `bg-neutral-100` | `text-neutral-600` |
| brand | `bg-brand-93` | `text-brand-n10` |
| green | `bg-green-100` | `text-green-800` |
| yellow | `bg-yellow-100` | `text-yellow-800` |
| red | `bg-red-100` | `text-red-800` |

**Dark theme:**

| Color | Background | Text |
|---|---|---|
| neutral | `bg-neutral-800` | `text-white` |
| brand / blue | `bg-brand` | `text-white` |
| green | `bg-green-700` | `text-white` |
| yellow | `bg-yellow-800` | `text-white` |
| red | `bg-red-600` | `text-white` |

```tsx
{/* Status dot */}
<span className="inline-flex items-center gap-1.5 px-[10px] py-[4px] rounded-full bg-green-100 text-green-800 font-sans font-semibold text-sm leading-5 tracking-[0.25px]">
  <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
  Active
</span>

{/* Heroicon (leading) */}
<span className="inline-flex items-center gap-1.5 px-[10px] py-[4px] rounded-full bg-red-100 text-red-800 font-sans font-semibold text-sm leading-5 tracking-[0.25px]">
  <ExclamationCircleIcon className="w-4 h-4 shrink-0" />
  Overdue
</span>
```

---

## 🔍 Filter Controls Row

The filter controls row appears below a navigation bar on list screens. It provides search, filtering, and scope selection.

### Controls

| Element | Spec |
|---|---|
| Row layout | `flex gap-2 items-center px-4 w-full` |
| Search bar | `flex-1` — grows to fill available width on mobile |
| Filter icon button | `rounded-2xl` — exception to rounded-full; contains a large icon |

### Search bar

```tsx
<div className="bg-neutral-100 border border-neutral-100 flex gap-1 items-center pl-3 pr-4 rounded-full h-10 flex-1 focus-within:border-neutral-300 focus-within:bg-white transition-colors">
  <MagnifyingGlassIcon className="w-5 h-5 text-neutral-400 shrink-0" />
  <input
    type="text"
    placeholder="Search..."
    className="flex-1 bg-transparent font-sans text-sm text-neutral-700 placeholder:text-neutral-400 outline-none leading-5 tracking-[0.25px] min-w-0"
  />
  {query && (
    <button onClick={clear} className="p-0.5 rounded-full hover:bg-neutral-200 transition-colors cursor-pointer shrink-0">
      <XMarkIcon className="w-3.5 h-3.5 text-neutral-400" />
    </button>
  )}
</div>
```

### Filter pill (canonical standard)

```tsx
<button
  onClick={toggle}
  className="bg-white border border-neutral-300 flex gap-1 items-center justify-center px-4 py-3 rounded-full cursor-pointer hover:bg-neutral-50 shrink-0 min-h-[44px]"
>
  <span className="font-sans font-medium text-sm text-neutral-800 leading-5 tracking-[0.25px] whitespace-nowrap">
    Label
  </span>
  <ChevronDownIcon className="w-4 h-4 text-neutral-800" />
</button>
```

**Active state** — when a filter is applied:

```tsx
className="bg-brand-93 border border-brand-88 ... text-brand-n10"
```

---

## 📊 Data Tables

On mobile, avoid full data tables in favor of list cells. When a table is necessary (e.g. a comparison or summary view), apply the following conventions.

| Element | Spec |
|---|---|
| Header row background | `bg-neutral-100` |
| Header text | `font-sans font-medium text-sm text-neutral-500 leading-5 tracking-[0.25px]` |
| Data cell padding | `px-2 py-[10px]` |
| Primary text | `font-sans font-semibold text-sm text-neutral-600 leading-5 tracking-[0.25px]` |
| Secondary text | `font-sans font-normal text-sm text-neutral-500 leading-5 tracking-[0.25px]` |
| Emphasis text | `font-sans font-bold text-sm text-brand leading-5 tracking-[0.25px]` |
| Table container | `border border-neutral-200 rounded-2xl overflow-hidden bg-white` |

---

## ✍️ Typography

### Font Roles

| Font | Role | Tailwind class | Sizes |
|---|---|---|---|
| **Figtree** (placeholder) | Body copy, UI labels, inputs | `font-sans` | `text-xs` → `text-xl` |
| **Sora** (placeholder) | Display, headings | `font-display` | `text-2xl` → `text-5xl` |

- Use `font-sans` (Figtree placeholder) by default — all UI inherits it from `<body>`.
- Switch to `font-display` (Sora placeholder) explicitly on headings `text-2xl` and above.
- **Never use all-caps for labels, titles, or section headers.** Use sentence case or title case only. Do not use `uppercase` or `tracking-wider` on user-facing text.
- **Never use em dashes (`—`).** Use a middle dot (`·`) to separate inline metadata, or restructure to avoid the separator.
- **`text-xs` is a last resort.** Use only for timestamps, metadata labels, or tertiary annotations. Any text with UI weight uses `text-sm` minimum.

---

## 📐 Spacing System

All spacing falls on an **8pt base grid** with **4pt micro-spacing** permitted for tight UI.

| Role | Values (px) | Tailwind classes |
|---|---|---|
| **Primary** | 8, 16, 24, 32, 40, 48, 64 | `p-2`, `p-4`, `p-6`, `p-8`, `p-10`, `p-12`, `p-16` |
| **Micro** | 4, 12, 20, 28, 36 | `p-1`, `p-3`, `p-5`, `p-7`, `p-9` |

Never use fractional steps (`-0.5`, `-1.5`, `-2.5`, `-3.5`). These sit between grid points and break alignment.

Exceptions: icon sizes (`w-3.5`, `w-4.5`) and structural pixel locks derived from a specific element's dimensions.

---

## 🎨 Color System

> **All `brand-*` tokens are placeholders.** Replace with the confirmed Modern Woodmen palette in `src/index.css` once the brand guide is received.

### Brand (Primary — TBD)

```js
brand: {
  DEFAULT: '#000000', /* TODO: MW — replace with primary brand color */
  97:  '#F5F5F5',     /* TODO: MW — lightest tint */
  93:  '#E8E8E8',     /* TODO: MW */
  88:  '#D4D4D4',     /* TODO: MW */
  74:  '#ABABAB',     /* TODO: MW */
  n10: '#000000',     /* TODO: MW — dark -10L */
  n20: '#000000',     /* TODO: MW — dark -20L */
  n30: '#000000',     /* TODO: MW — dark -30L */
}
```

### Neutral / Gray

```js
neutral: {
  50:  '#F8FAFC',
  100: '#F2F5F8',
  200: '#E3E8EF',
  300: '#CED5DF',
  400: '#9AA6B6',
  500: '#687587',
  600: '#485568',
  700: '#364152',
  800: '#1F293A',
  900: '#111828',
  950: '#020617',
}
```

### Semantic — Red

```js
red: {
  50: '#FEF2F2', 100: '#FEE6E6', 200: '#FECACA',
  500: '#ED4646', 600: '#DC2626', 700: '#B91C1C',
  800: '#991B1B',
}
```

### Semantic — Yellow

```js
yellow: {
  100: '#FDF5CE', 500: '#F0BD05',
  700: '#B7750B', 800: '#975812',
}
```

### Semantic — Green

```js
green: {
  100: '#D1FAF0', 500: '#25BB96',
  700: '#14856A', 800: '#156A58',
}
```

---

## 🎨 Color Tokens (Tailwind v4)

Paste this `@theme` block into `src/index.css` (after `@import "tailwindcss"`). Replace `/* TODO: MW */` values once the brand guide is confirmed.

```css
@theme {
  /* Brand — TBD: replace all TODO: MW values */
  --color-brand:     #000000; /* TODO: MW */
  --color-brand-97:  #F5F5F5; /* TODO: MW */
  --color-brand-93:  #E8E8E8; /* TODO: MW */
  --color-brand-88:  #D4D4D4; /* TODO: MW */
  --color-brand-74:  #ABABAB; /* TODO: MW */
  --color-brand-n10: #000000; /* TODO: MW */
  --color-brand-n20: #000000; /* TODO: MW */
  --color-brand-n30: #000000; /* TODO: MW */

  /* Neutral */
  --color-neutral-50:  #F8FAFC;
  --color-neutral-100: #F2F5F8;
  --color-neutral-200: #E3E8EF;
  --color-neutral-300: #CED5DF;
  --color-neutral-400: #9AA6B6;
  --color-neutral-500: #687587;
  --color-neutral-600: #485568;
  --color-neutral-700: #364152;
  --color-neutral-800: #1F293A;
  --color-neutral-900: #111828;
  --color-neutral-950: #020617;

  /* Red */
  --color-red-50:  #FEF2F2;
  --color-red-100: #FEE6E6;
  --color-red-200: #FECACA;
  --color-red-500: #ED4646;
  --color-red-600: #DC2626;
  --color-red-700: #B91C1C;
  --color-red-800: #991B1B;

  /* Yellow */
  --color-yellow-100: #FDF5CE;
  --color-yellow-500: #F0BD05;
  --color-yellow-700: #B7750B;
  --color-yellow-800: #975812;

  /* Green */
  --color-green-100: #D1FAF0;
  --color-green-500: #25BB96;
  --color-green-700: #14856A;
  --color-green-800: #156A58;
}
```

---

## 🛑 Confirmation Dialogs

Two patterns exist. Choose based on context — never stack both.

### Pattern 1 — Full-screen modal

**When to use:** Actions triggered from a screen where no sheet is currently open.

| Element | Spec |
|---|---|
| Backdrop | `fixed inset-0 bg-neutral-900/60 z-[60]` |
| Card | `bg-white rounded-2xl p-4 w-[342px] mx-auto` |
| Icon badge (standard) | `bg-neutral-800 p-3 rounded-xl` + `ExclamationTriangleIcon w-8 h-8 text-white` |
| Icon badge (destructive) | `bg-red-600 p-3 rounded-xl` + `ExclamationTriangleIcon w-8 h-8 text-white` |
| Title | `font-sans font-semibold text-xl text-neutral-800 text-center` |
| Body | `font-sans text-base font-normal text-neutral-700 text-center` |
| Confirm button (standard) | `bg-brand` pill, `min-h-[44px]` |
| Confirm button (destructive) | `bg-red-600` pill, `min-h-[44px]` |
| Cancel button | `border border-neutral-300` pill, `min-h-[44px]` |

### Pattern 2 — Inline sheet overlay

**When to use:** Actions triggered from within an already-open bottom sheet. Avoids stacking two overlays.

An `absolute inset-0` overlay covers the sheet content area, with a `bg-white/70 backdrop-blur-sm` scrim and a centered confirmation card.

### Decision rule

```
Is there already an open bottom sheet?
  Yes → use the inline sheet overlay
  No  → use the full-screen modal
```

---

## 🧩 Component Extraction Convention

Add an inline comment wherever a component is self-contained enough to be extracted into a shared library:

```tsx
// [ui-candidate] ComponentName
// Reason: <why this is reusable>
// Props needed: <list the key props it would need>
```

Add `[ui-candidate]` when a component: has no hardcoded data, could appear on more than one screen, and is visually complete enough to document without significant rework.

---

## 📱 Mobile Conventions

### Viewport

- Design target: **390px wide** (iPhone 14 Pro). The `#root` shell in `src/index.css` enforces this in browser preview.
- On real mobile, the frame fills the viewport naturally.

### Touch targets

- **Minimum 44px tap target** on all interactive elements. Use `min-h-[44px]` and `min-w-[44px]` on buttons and list items.
- Small visual elements (icons, labels) can be smaller — the *tappable area* must be 44px.

### Navigation patterns

- **Stack navigation** — screens push in from the right (`page-enter` keyframe, `translateX`).
- **Bottom sheet / modal sheet** — slides up from the bottom (`sheet-enter` keyframe). Use for pickers, confirmations, and contextual actions.
- **Tab bar** — fixed to the bottom, 5 items max. Tab bar height: 83px (49px bar + 34px home indicator area). Use `pb-[83px]` on scrollable content to avoid overlap.
- Never use a side nav on mobile.

### Safe areas

- Top status bar: `pt-[44px]` (or `pt-[54px]` on Dynamic Island devices — use 54px as the safe default).
- Bottom home indicator: `pb-[34px]` inside the tab bar, `pb-[83px]` on content behind the tab bar.

### iOS UI patterns

- **Navigation bar**: 44px tall, title centered, back chevron + label on the left, action on the right.
- **Tab bar**: white background, `border-t border-neutral-200`, icons + labels, active tab uses brand color.
- **List cells**: full-width, `min-h-[44px]`, `ChevronRightIcon w-5 h-5 text-neutral-400` as trailing disclosure indicator.
- **Pull-to-refresh**: document the intent in comments; implement with a scroll listener.
- **Swipe actions**: destructive actions swipe left (red); non-destructive swipe right (brand).
