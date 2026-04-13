---
name: ux-analysis
description: >
  Conduct rigorous UX analysis on UI components, pages, user flows, and page-to-page
  experiences. Use whenever the user shares a screenshot, live URL, code (HTML/React),
  or describes a UI for evaluation. Triggers: "review this UI", "analyze this flow",
  "what's wrong with this page", "should we test this", "heuristic evaluation",
  "UX audit", "cognitive walkthrough", "is this usable", "critique this component",
  or any time the user pastes code or shares a screenshot and asks for UX feedback.
  Always use this skill — don't eyeball it and respond freeform.
---

# UX Analysis Skill

Practitioner-grade UX analysis for self-review. Output = sharp senior researcher
thinking alongside you, not a stakeholder report.

---

## URLs & Input Types

| Input | Works? |
|---|---|
| Public URL (Vercel, Netlify, etc.) | ✅ Use `web_fetch` |
| `localhost` / behind auth | ❌ Paste the code instead |
| Screenshot / image | ✅ Analyze directly |
| HTML / React code | ✅ Analyze directly |

---

## Step 1 — Context Intake

Ask only these three questions. If skipped, assume and flag.

1. **Who is the user?** (e.g. "first-time visitor," "logged-in power user")
2. **What task are they completing?** (e.g. "checkout," "find account settings")
3. **Known friction points or hypotheses?** *(optional)*

---

## Step 2 — Classify Scope

Auto-detect — never ask the user to pick a mode.

| Scope | Signal | Method |
|---|---|---|
| **Component** | Single element (button, form, modal) | Focused heuristics |
| **Page** | Single screen | Full heuristics + visual hierarchy |
| **Flow** | Multi-step task | Cognitive walkthrough |
| **Transition** | Page-to-page | Continuity + mental model match |

---

## Step 3 — Analyze

### Heuristic Evaluation (Component / Page)
Surface **violated heuristics only** — not all 10. For each violation: which heuristic,
where in the UI, user impact, triage label.

Heuristics: (1) System status (2) Real-world match (3) User control (4) Consistency
(5) Error prevention (6) Recognition over recall (7) Flexibility (8) Minimalism
(9) Error recovery (10) Help & docs

**Violation signals by heuristic:**

| # | Heuristic | Strong violation signals |
|---|---|---|
| 1 | System status | No response after action • silent async ops • indistinguishable selected/unselected states • spinner with no context |
| 2 | Real-world match | Internal/technical labels • metaphors that don't map • system-ordered info vs. user mental model • non-standard date/number formats |
| 3 | User control | No undo on destructive actions • modals with no escape • losing progress on back-nav • forced linear flows |
| 4 | Consistency | Same action, different labels • same icon, different meanings • visual treatment varies without reason • platform conventions broken |
| 5 | Error prevention | Validation only on submit • destructive + safe actions adjacent • free-text where structured input expected • no constraints on bounded inputs |
| 6 | Recognition over recall | Prior selections not visible at decision point • must-remember syntax • context lost between steps • no recents/suggestions where expected |
| 7 | Flexibility | No bulk actions • no keyboard shortcuts for repeat tasks • no defaults or saved configs (weight higher for daily-use tools) |
| 8 | Minimalism | Competing visual hierarchies • multiple primary CTAs • redundant labels • decorative noise • secondary info at same weight as primary |
| 9 | Error recovery | Generic messages ("something went wrong") • no recovery path from error state • error placed away from offending field • form clears on error |
| 10 | Help & docs | Complex task, no progressive disclosure • help unreachable from point of confusion • generic rather than task-specific docs |

**Scope weighting:**
- **Component:** H1, H5, H8, H9 -- most violations surface here
- **Page:** H2, H4, H6, H8 -- hierarchy and language dominate
- **Flow:** H1, H3, H6, H9 -- status + recovery across steps
- **Transition:** H1, H3, H4, H6 -- continuity and orientation

### Cognitive Walkthrough (Flow / Transition)
For each task step, evaluate all four:
1. **Subgoal** — does the UI surface the right next goal?
2. **Action** — is the correct action visible and obvious?
3. **Execution** — any friction performing it?
4. **Feedback** — does the response confirm success?

Breakdown at any point = finding. Label which question failed.

For transitions, also check: state continuity, orientation, mental model match.

```
Step [N]: [User goal]
  ✓/✗ Subgoal  ✓/✗ Action  ✓/✗ Execution  ✓/✗ Feedback
  → Finding: [if any]
```

### Secondary Lenses (always run)
**Accessibility** — contrast (4.5:1 text / 3:1 UI), touch targets (44px min),
focus order, ARIA/semantic HTML (code only), reduced-motion.

**Copy & Microcopy** — action-oriented labels, error messages (what + how to fix),
empty states (guide next action), button copy (sets accurate expectations).

**Loading / Error / Edge States** — loading feedback beyond spinner, specific error
messages, inline error placement, graceful recovery without data loss, empty states designed.

---

## Step 4 — Triage Every Finding

| Label | When |
|---|---|
| 🔴 **Fix now** | Clear violation, no testing needed, blocks task or violates accessibility |
| 🧪 **Test to validate** | Right solution depends on user behavior/mental models |
| 👀 **Monitor** | Low severity, not worth speculative fixing |

For every 🧪 finding, specify: hypothesis, method (usability test or A/B), decision rule.
**The core decision -- test or fix?**

Fix without testing when:
- The heuristic violation is clear and the correct solution is established practice
- The fix has low implementation cost and low risk of making things worse
- Accessibility violations (WCAG) -- these are requirements, not hypotheses

Test before fixing when:
- You have two or more viable solutions and can't determine analytically which is better
- The issue involves user mental models you can't predict (labeling, navigation, IA)
- The fix has high implementation cost and you need confidence before building
- Drop-off or friction is suspected but unconfirmed -- need to observe before diagnosing

Monitor without testing when:
- The issue is low severity and low frequency
- You don't have a solution hypothesis yet
- The cost of testing exceeds the cost of the problem

**Method selection:**

*Moderated Usability Session* -- use when you need to understand *why*, the task is complex, or you're exploring a new flow. Minimum viable: 5 participants per user segment.

Hypothesis format:
```
We believe [user type] will [struggle / succeed] with [specific task step]
because [our reasoning].
We'll know this is true if [observable behavior] occurs in [N] of [N] sessions.
```

What to observe (not just task completion): hesitations of 3+ seconds, incorrect first clicks, verbalizations of confusion, backtracking or abandonment, workarounds.

*A/B Test* -- use when you have two fully-built variants, sufficient traffic (1,000+ conversions per variant), and a clear measurable decision metric. Do NOT use A/B when traffic is low, variants are fundamentally different, or you're still diagnosing the problem.

Hypothesis format:
```
We believe changing [specific element] from [A] to [B]
will increase [metric] by [X]%
because [rationale].
We'll run the test until we reach [significance threshold] or [N] days,
whichever comes first.
```

Significance threshold: 95% confidence minimum. Don't call a winner early.

**Every 🧪 finding needs three things:**

1. **Hypothesis** -- not "test whether users understand the CTA" but a specific, falsifiable belief about user behavior with a predicted outcome.

2. **Method** -- moderated usability or A/B, and why. If usability: participant count and task prompt. If A/B: both variants and the success metric.

3. **Decision rule** -- pre-commit to action before seeing results. E.g. "If 3+ of 5 participants hesitate or misclick, we'll revise before launch. If 4+ complete without issue, we'll ship as-is." This prevents post-hoc rationalization.

**Task prompt writing:**
- Scenario-based, not instruction-based: ✗ "Click Settings" -- ✓ "You want to change your email address. Show me how."
- Free of leading language -- don't name UI elements in the prompt
- Realistic and grounded in an actual user reason
- Specific enough to have a clear completion state

**What makes a finding untestable:** preference questions ("which do you like better?"), hypothetical behavior ("would you use this?"), and too-early concepts. When a finding falls here, recommend fixing analytically or monitoring rather than generating false confidence from a poorly-designed test.

---

## Step 5 — Report Format

```
# UX Analysis: [Name]

## Context
- User: [stated or assumed*]  Task: [stated or assumed*]
- Scope: [Component/Page/Flow/Transition]  Method: [Heuristics/Walkthrough/Both]
- Hypotheses: [if any]

## Summary
[2–4 sentences. Biggest risk + what's working. Be direct.]

## Findings

### 🔴 Fix Now
| # | Finding | Evidence | Heuristic/Lens | User Impact |

### 🧪 Test to Validate
| # | Finding | Hypothesis | Method | Decision Rule |

### 👀 Monitor
| # | Finding | Why low priority |

## Cognitive Walkthrough *(flow scope only)*
[Step table per format above]

## Accessibility Notes
[Violations only. If none: "No critical violations identified."]

## Copy & Microcopy
[Issues + before/after suggestions]

## Top 3 Recommendations
1. [Action] — [why first]
2. [Action] — [why second]
3. [Action] — [why third]
```

---

## Analyst Notes
- Evidence must be specific: not "the CTA" but "the 'Get started' button, below fold on 13" screens"
- Don't pad — 3 precise findings > 12 vague ones
- No walkthrough without a defined task — fall back to heuristics and flag it
- Flag all assumed context with *
