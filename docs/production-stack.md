# Production Stack Reference

This project is a **prototype only**. There is no production stack defined yet for Modern Woodmen mobile. This file documents conventions to follow now so that components are easy to graduate when a production target is confirmed.

---

## Likely production target

When this prototype graduates to production, the most probable stack is **React Native** or **Expo** (managed workflow). Both use React component primitives and TypeScript, which means the component logic and data contracts written today will carry forward with minimal changes.

Tailwind classes will not transfer directly to React Native — but the design tokens (colors, spacing scale, typography scale) defined in `src/index.css` provide the reference values needed to build an equivalent native style system.

---

## Write components as if they will graduate

Even in the prototype, write components as if they will be extracted to a shared library. This means:

- **Explicit typed props** — no implicit context dependencies. If a component needs data, it takes it as a prop.
- **No hardcoded content** — all text, values, and labels come through props or a mock data file. Never hardcode a name, balance, or date inside a component.
- **Controlled where possible** — prefer stateless / controlled components. Keep state at the screen level and pass handlers down. This makes components easy to unit test and easy to adapt for native state management.
- **No direct API calls inside components** — components receive data, they do not fetch it. Mock data lives in a separate `*-mock-data.ts` file next to the screen, not inside the component.

---

## Mark reusable components with `[ui-candidate]`

Add the following comment to any component that meets all three criteria:
1. No hardcoded data — all content comes through props or is purely presentational.
2. Could reasonably appear on more than one screen.
3. Visually complete enough to document in Storybook without significant rework.

```tsx
// [ui-candidate] AccountCell
// Reason: Standard list cell used across account list, beneficiary list, and search results
// Props needed: name, accountNumber, balance, status, onPress
```

These comments become the roadmap for the first sprint of native component library work.

---

## Token mapping to native

When the prototype is ready to graduate, the `src/index.css` `@theme` block is the source of truth for the design token values. Map them to a React Native style sheet or a theme provider (e.g. Tamagui, NativeWind) using the same token names:

| Prototype token | Native equivalent |
|---|---|
| `--color-brand` | `colors.brand.DEFAULT` |
| `--color-neutral-*` | `colors.neutral[N]` |
| `--font-sans` | `fontFamily.sans` |
| `--text-sm` / `--text-sm--line-height` | `fontSize.sm` / `lineHeight.sm` |

Spacing values follow the same 8pt grid — `p-4` (16px) in Tailwind becomes `padding: 16` in React Native.
