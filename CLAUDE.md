# Modern Woodmen Mobile — Prototype Guide

iOS mobile app mockup for Modern Woodmen of America.
Built with Vite + React + TypeScript + Tailwind v4 + Heroicons.
390px phone frame in the browser. Brand tokens are TBD — see `src/index.css`.

@docs/design-system.md
@docs/animation.md

@docs/scaffolding.md
@docs/production-stack.md

---

## Session Start Checklist

At the start of every session read `docs/design-system.md` before writing any UI code. Key rules:

- **Brand tokens are placeholders.** Use `bg-brand`, `text-brand`, `border-brand-88` etc. everywhere. Never hardcode hex values for brand colors.
- **No all-caps labels or headers.** Never use `uppercase` on user-facing text. Sentence or title case only. `tracking-wider` is also banned on user-facing text.
- **`text-xs` is a last resort.** Only for timestamps, metadata, tertiary badges. Any text with UI weight uses `text-sm` minimum.
- **8pt spacing grid.** No fractional steps (`gap-1.5`, `p-2.5`, etc.) except documented exceptions.
- **Icon minimum `w-4 h-4`.** No icon visible to the user may be smaller than 16px.
- **Buttons are `rounded-full`.** All standalone action buttons and icon-only buttons use `rounded-full`.
- **44px minimum touch target.** Use `min-h-[44px]` on all tappable elements.
- **Tab bar is always 83px from the bottom.** Content behind a tab bar needs `pb-[83px]`.
- **No side nav.** Mobile uses bottom tab bar navigation only.
- **Popup/overlay headers:** `font-sans font-semibold text-base leading-[22px] tracking-[0.2px]`.

---

## Git Workflow

**Never commit or push unless explicitly asked.**

When the user says "commit" or "commit and push", use the `/commit` skill.

---

## Token Efficiency — Use Grep First

**Attempt to use Grep before Read.**

Never default to opening a file to find something. Grep for it first to get the exact line number, then Read only the lines needed.

```
// Correct
Grep("ComponentName", output_mode: "content")  → line 42
Read(offset: 38, limit: 20)
Edit(...)

// Wrong
Read("SomePage.tsx")  // entire file
```

Rules:
- Never call Read on a file you haven't grepped first (unless under 80 lines).
- Read range limit: 20–60 lines.
- Before any Edit, verify the exact string with Grep first.
- Never spawn an Agent for a task that can be done with 2–3 Grep + Edit calls.

---

## Component Consistency Rule

If the same component type exists in more than one place, it must be visually identical. Before writing a new instance of an existing component, read the existing implementation and match it exactly.

### Interactive card hover convention (desktop preview only)
All clickable cards use `active:opacity-80 transition-opacity` as the tap state on mobile. On desktop preview, also add `hover:shadow-md transition-all`.

---

## Agent Files

Sub-agents live at `.claude/agents/`. Always check this directory before assuming no agents exist.

| Directory | Contents |
|---|---|
| `.claude/agents/design-*.md` | UI Designer, UX Architect, Brand Guardian, and other design agents |
| `.claude/agents/engineering-*.md` | Frontend Developer, Senior Developer, Rapid Prototyper, Code Reviewer |
| `.claude/agents/testing-*.md` | Accessibility, performance, reality-check, and workflow agents |
| `.claude/agents/product-*.md` | Product Manager, Sprint Prioritizer, Feedback Synthesizer, and others |

---

## Memory Management

| File | Purpose |
|---|---|
| `PROJECT_MEMORY.md` (project root) | Human-readable memory — committed to git |
| `~/.claude/projects/.../memory/MEMORY.md` | Hidden auto-memory loaded at session start |

Update both on explicit request or at conversation compaction.
