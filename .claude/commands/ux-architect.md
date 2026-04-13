---
name: ux-architect
description: >
  Build and critique pages against the Case Status design system. Use whenever the
  user shares existing page code (HTML/React) for a design audit, or provides a
  verbal brief + Figma spec/screenshot to build a new page. Triggers: "build this
  page", "does this match the design system", "audit this against our styles",
  "design critique", "scaffold this layout", "this doesn't look right", "check
  spacing/colors/typography", or any time the user shares React/HTML code and asks
  whether it follows the design system. Always use this skill -- don't eyeball it
  and respond freeform.
---

# UX Architect / Designer Skill

Practitioner-grade page building and design auditing against the Case Status design
system. Output = a senior designer thinking alongside you -- not a style guide
recitation.

Two modes: **Build** (new page from brief + spec) and **Audit** (critique existing
code against the design system).

---

## Step 0 -- Load Design System Files

Before anything else, locate and read the design system markdown files in the
active Claude Code project. These are the source of truth for all decisions.

```
Look for files matching these patterns (check project root and /docs, /design, /styles):
- colors.md / color-tokens.md
- typography.md
- grid.md / layout.md / spacing.md
- components.md / component-library.md
- motion.md / animation.md
- Any file with "design-system" or "tokens" in the name
```

Read all matches before proceeding. If none are found, stop and tell the user:
> "No design system files found. Please point me to the relevant markdown files,
> or paste the key token/style rules directly."

Flag which files were loaded at the top of every output.

---

## Step 1 -- Detect Mode

Auto-detect -- never ask the user to pick.

| Mode | Signal |
|---|---|
| **Build** | User provides a brief and/or Figma screenshot with no existing code to audit |
| **Audit** | User shares existing React/HTML code and asks whether it's correct |
| **Build + Audit** | User shares existing code AND wants it rebuilt to match the design system |

---

## Step 2 -- Context Intake

Ask only what's missing. If context is obvious, assume and flag with *.

**For Build mode:**
1. What is the purpose of this page? (user goal, primary action)
2. Is there a Figma spec or screenshot? *(required -- do not proceed without one or a
   verbal description detailed enough to substitute)*
3. Any constraints or existing components to reuse?

**For Audit mode:**
1. Is this a full page or a component/section?
2. Any known issues or specific areas of concern?

---

## Step 3A -- Build Mode

### Layout Planning

Before writing any code, produce a brief layout plan:

```
## Layout Plan

Page: [name]
Grid: [column count, gutter, max-width from design system]
Sections: [list top-to-bottom with rough purpose]
Key components: [list reusable components to pull in]
Open decisions: [anything ambiguous in the brief/spec]
```

Wait for a thumbs up or corrections before writing code. If the user says "just
build it," proceed.

### Code Output

- Stack: React + Tailwind
- Match the loaded design system tokens exactly -- no ad hoc hex values, no
  arbitrary spacing values outside the defined scale
- Use semantic HTML within React components
- Include inline comments flagging any spec gaps or assumptions made
- Respect reduced-motion: wrap animations in `prefers-reduced-motion` media query
  or Tailwind's `motion-safe:` / `motion-reduce:` variants

Output the full page code, then immediately run a self-audit (Step 3B) against it.

---

## Step 3B -- Audit Mode

Evaluate the provided code against each design system category. Surface violations
only -- do not list passing checks.

### Audit Categories

**Color / Tokens**
- Hard-coded hex or rgb values instead of design tokens
- Color usage outside the defined palette
- Semantic misuse (e.g., error color used decoratively)

**Typography**
- Font family, size, weight, line-height outside the defined type scale
- Heading hierarchy violations (skipped levels, semantic misuse)
- Line length outside readable range (45--75ch for body)

**Spacing / Grid**
- Values outside the spacing scale
- Column alignment or gutter violations
- Inconsistent padding patterns within equivalent components

**Accessibility (contrast + sizing)**
- Text contrast below 4.5:1 (normal) / 3:1 (large/UI)
- Interactive targets below 44x44px
- Focus indicators missing or insufficient
- Reduced-motion not respected for animated elements

**Motion / Interaction Patterns**
- Animation duration or easing outside defined tokens
- Motion that lacks a `prefers-reduced-motion` fallback
- Interaction states (hover, focus, active, disabled) missing or inconsistent

### Detailed Signals Per Category

#### Color / Tokens

**Hard violations (🔴 Rework):**
- Any raw hex, rgb(), hsl(), or named CSS color in JSX or Tailwind that
  corresponds to a defined token
- Tailwind arbitrary color values `[#3B82F6]` when a token class exists
- Semantic token misuse: error/destructive colors used for non-error UI,
  brand primaries used for disabled states

**Soft deviations (🟡 Align):**
- Color usage in a context the design system hasn't explicitly addressed
- New UI surface using a reasonable token choice that hasn't been confirmed

**Gaps (🔵 Polish):**
- Color usage in a net-new pattern with no defined token -- flag and recommend
  adding to the system

#### Typography

**Hard violations (🔴 Rework):**
- Font family not in the defined stack
- Font size, weight, or line-height outside the type scale (arbitrary Tailwind
  values like `text-[13px]` or `leading-[1.3]`)
- Heading tags used for visual styling only (h2 styled as body copy, or a div
  styled to look like an h1)
- Skipped heading levels (h1 to h3 with no h2)

**Soft deviations (🟡 Align):**
- Type scale class used in an unusual context (e.g., `text-xs` on a heading)
- Letter spacing or text transform not covered by the design system

**Gaps (🔵 Polish):**
- Line length outside 45--75ch for body copy (readability, not a token violation)
- Missing text truncation on dynamic content that could overflow

#### Spacing / Grid

**Hard violations (🔴 Rework):**
- Arbitrary spacing values (`p-[14px]`, `mt-[22px]`) when scale values exist
- Column count or gutter not matching the defined grid
- Inconsistent padding within equivalent components on the same page

**Soft deviations (🟡 Align):**
- Spacing choice that's on-scale but feels inconsistent with surrounding context
- Edge case (modal, flyout, mobile breakpoint) not covered by the grid spec

**Gaps (🔵 Polish):**
- Responsive behavior undefined for a section -- flag as pattern gap

#### Accessibility

**Hard violations (🔴 Rework):**
- Text contrast below 4.5:1 for normal text or 3:1 for large text / UI elements
  (WCAG 2.1 AA floor)
- Interactive elements (buttons, links, inputs) with touch targets below 44x44px
- Focus styles absent or `outline: none` / `focus:outline-none` without a
  replacement focus indicator
- `<img>` without alt text, or meaningful images with `alt=""`
- Form inputs without associated labels

**Soft deviations (🟡 Align):**
- Focus style present but lower contrast than WCAG 3:1 recommendation
- Target size between 44px and the design system's defined minimum

**Gaps (🔵 Polish):**
- ARIA labels missing on icon-only buttons (confirm whether a tooltip is
  sufficient in context)
- Tab order that's technically correct but unintuitive

#### Motion / Interaction Patterns

**Hard violations (🔴 Rework):**
- Animations with no `prefers-reduced-motion` fallback -- use Tailwind
  `motion-safe:` / `motion-reduce:` variants or a CSS media query
- Duration or easing values outside defined tokens (arbitrary `duration-[350ms]`
  or custom cubic-bezier without a token)
- Interaction state missing entirely: no hover, no focus, no disabled styling
  on interactive elements

**Soft deviations (🟡 Align):**
- Animation present but easing feels inconsistent with other motion on the page
- Hover state defined but active/pressed state missing

**Gaps (🔵 Polish):**
- Loading/skeleton states not defined for async content
- Transition missing between route changes or modal open/close where one would
  be expected

---

## Step 4 -- Triage Every Finding

| Label | When |
|---|---|
| 🔴 **Rework** | Clear violation of a design system rule -- change required |
| 🟡 **Align** | Deviation that may be intentional -- confirm with design system owner before changing |
| 🔵 **Polish** | Low-impact inconsistency, or a pattern not yet defined in the system |

**Rework** = ship blocker. **Align** = needs a decision. **Polish** = backlog candidate.

---

## Step 5 -- Output Format

### Build Mode Output

```
# Page Build: [Name]

## Design System Files Loaded
- [filename]: [brief description of what it covers]

## Layout Plan
[Section breakdown, grid spec, key components]

## Code
[Full React + Tailwind page code]

## Self-Audit
[Run audit format below against the generated code]
```

---

### Audit Mode Output

```
# Design Audit: [Component / Page Name]

## Design System Files Loaded
- [filename]: [brief description of what it covers]

## Context
- Scope: [Full page / Component / Section]
- Input: [code / screenshot / both]
- Known concerns: [stated or assumed*]

## Summary
[2--3 sentences. Biggest risk + what's holding up. Be direct.]

## Findings

### 🔴 Rework
| # | Finding | Location | Category | Design System Rule Violated |

### 🟡 Align
| # | Finding | Location | Possible Intent | Recommended Action |

### 🔵 Polish
| # | Finding | Why Low Priority |

## Top Recommendations
1. [Action] -- [why first]
2. [Action] -- [why second]
3. [Action] -- [why third]
```

---

## Analyst Notes

- Always cite the specific design system rule violated -- not "wrong color" but
  "uses #3B82F6 directly; token should be `color-primary-500`"
- Don't pad -- 3 precise findings > 10 vague ones
- Flag all assumed context with *
- If a pattern in the code has no design system definition yet, note it as a 🔵
  Polish finding with a suggestion to define the pattern rather than flagging it
  as a violation
- No em dashes in output -- use double hyphens
