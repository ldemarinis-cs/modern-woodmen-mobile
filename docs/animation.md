# Animation & Transitions

All interactive surfaces share a single physical vocabulary. Consistent easing and directional meaning make the UI feel native rather than mechanical. These conventions are designed to match iOS system animation idioms closely enough that users do not notice the difference.

---

## Easing functions

| Role | Curve | When to use |
|---|---|---|
| Enter / open (physical) | `cubic-bezier(0.34, 1.2, 0.64, 1)` | Sheets sliding up, cards arriving, selection pulse |
| Exit / close | `cubic-bezier(0.4, 0, 1, 1)` | Sheets dismissing, items being removed |
| Screen navigation | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Stack push/pop transitions — smooth deceleration, no overshoot |
| Standard UI | `ease` / `ease-out` | Hover states, color transitions, opacity fades |

The spring curve (`0.34, 1.2, 0.64, 1`) overshoots slightly — right for sheets and cards arriving with physical presence. **Do not use it for full-screen stack transitions** — at screen scale the overshoot reads as unsteady.

---

## Durations

| Type | Duration | Notes |
|---|---|---|
| Screen push (stack navigation) | `380ms` | `PageTransition` wrapper — `translateX` enter, ease-out curve, enter only |
| Sheet enter | `420ms` | `translateY` rise from below, spring curve |
| Sheet exit | `320ms` | Snappier than enter — dismissal should feel light |
| Tab bar crossfade | `200ms` | Opacity fade only — no slide on tab switches |
| Back swipe | `280ms` | `translateX` 0 → 100%, ease-out |
| Row tap pulse | `300ms` | Brief background highlight before navigation |
| Status flash | `700ms` | Highlight on live status change |
| Confirmation modal enter | `280ms` | Fade + scale from 96% → 100% |

---

## Directional vocabulary

Animations carry meaning — use them consistently:

| Direction | Meaning | Example |
|---|---|---|
| Slide in from right (`translateX`) | Forward navigation — you went deeper in a stack | Push: account list → account detail |
| Slide out to right (`translateX`) | Back navigation — you went back up the stack | Back swipe / back button |
| Rise from below (`translateY`) | Contextual overlay arriving — no stack hierarchy implied | Bottom sheet opening, action sheet |
| Fall below screen (`translateY`) | Contextual overlay dismissed | Bottom sheet closing |
| Crossfade | Lateral switch — no hierarchy, no direction | Tab bar switching between top-level tabs |
| Background pulse (brand → transparent) | Row selected | Tap-to-navigate feedback on list cells |
| Background flash (green → transparent) | Status changed | Live update flash |

**Rule:** `translateX` is reserved for stack navigation with a clear forward/back hierarchy. `translateY` is for sheets and modals that sit above the current screen — no direction implied. Tab switches use crossfade only — never `translateX` or `translateY`, as tabs are peers with no hierarchy.

---

## iOS-specific patterns

### Bottom sheet enter

Sheets rise from below with a spring overshoot — this matches the iOS modal sheet feel.

```css
@keyframes sheet-enter {
  0%   { transform: translateY(100%); opacity: 0.8; }
  100% { transform: translateY(0);    opacity: 1; }
}
```

Apply: `animation: sheet-enter 420ms cubic-bezier(0.34, 1.2, 0.64, 1) both`

### Bottom sheet exit

Exit is snappier than enter so dismissal does not feel sluggish.

```css
@keyframes sheet-exit {
  0%   { transform: translateY(0);    opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
}
```

Apply: `animation: sheet-exit 320ms cubic-bezier(0.4, 0, 1, 1) both`

### Stack push (screen navigation)

Screens slide in from the right. Enter only — no exit animation on the outgoing screen in the prototype (the new screen's enter is sufficient).

```css
@keyframes page-enter {
  from { opacity: 0;   transform: translateX(32px); }
  to   { opacity: 1;   transform: translateX(0); }
}
```

Apply: `animation: page-enter 380ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both`

### Back swipe / back navigation

The screen exits to the right.

```css
@keyframes page-exit-back {
  from { opacity: 1; transform: translateX(0); }
  to   { opacity: 0; transform: translateX(100%); }
}
```

Apply: `animation: page-exit-back 280ms ease-out both`

### Tab bar crossfade

No slide — tabs are peers. Content fades in only.

```css
@keyframes fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
```

Apply: `animation: fade-in 200ms ease both`

### Row tap pulse

Brief brand-tinted highlight before navigating, giving the user tactile feedback that the tap registered.

```css
@keyframes row-select {
  0%   { background-color: var(--color-brand-88); }
  100% { background-color: var(--color-brand-97); }
}
```

### Status flash

Short green highlight when a live status value updates.

```css
@keyframes status-flash {
  0%   { background-color: #D1FAF0; }
  60%  { background-color: #D1FAF0; }
  100% { background-color: transparent; }
}
```

---

## isClosing pattern (sheets with exit animation)

When a sheet needs an exit animation before unmounting, use the `isClosing` state pattern:

```tsx
const [isClosing, setIsClosing] = useState(false)

// Reset when new sheet opens so enter animation re-triggers
useEffect(() => { if (isOpen) setIsClosing(false) }, [isOpen])

const handleClose = () => {
  setIsClosing(true)
  setTimeout(() => {
    setIsClosing(false)
    onClose() // actual state reset happens after animation
  }, 320) // match sheet-exit duration
}
```

Apply `handleClose` to **every** close trigger inside the sheet (header X, Cancel buttons, backdrop tap, swipe-down gesture). Never call `onClose` directly from inside the sheet — always go through `handleClose`.

---

## Inline style vs Tailwind for animated transforms

**Do not mix Tailwind transform classes (`translate-y-4`, `-translate-x-1/2`) with inline `transform` style strings on the same element.** Tailwind v4 uses CSS custom properties (`--tw-translate-x`) that the inline style overrides, breaking the Tailwind class silently.

Rule: if an element uses an inline `transform` style for animation, handle **all** of its transforms in that inline style (including centering). Remove any Tailwind translate classes from that element.

```tsx
// Correct — all transforms in one place
<div
  style={{
    transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
    transition: 'transform 420ms cubic-bezier(0.34, 1.2, 0.64, 1)',
  }}
/>

// Wrong — Tailwind translate class silently overridden by inline style
<div className="translate-y-0" style={{ transform: 'translateY(100%)' }} />
```

---

## CSS keyframe placement

Place `<style>` tags inside the component's return that defines them — keeps keyframes colocated with the component that uses them. Shared keyframes (page-enter, sheet-enter, sheet-exit, fade-in, row-select, status-flash) live in `src/index.css`.

---

## PageTransition wrapper

Route-level transitions fire on every stack navigation. The `PageTransition` component wraps main content on every route and is keyed to `useLocation().pathname` so React remounts it on each navigation, replaying the enter animation.

```tsx
function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  return (
    <div
      key={pathname}
      className="flex-1 overflow-hidden min-w-0 min-h-0"
      style={{ animation: 'page-enter 380ms cubic-bezier(0.25, 0.46, 0.45, 0.94) both' }}
    >
      {children}
    </div>
  )
}
```

- Apply `PageTransition` to the main content area only — never to the tab bar or persistent chrome.
- Enter only — no exit animation. Screens arrive; they do not say goodbye.
- Use `translateX` — horizontal direction signals forward navigation in a stack hierarchy.
- The `both` fill-mode ensures the `from` state applies before the animation starts (prevents flash).

---

## Re-triggering enter animation on content switch

When screen content changes without a route change (e.g. user switches account within a detail screen), add a `key` prop tied to the content identifier. React will unmount and remount the element, replaying the enter animation:

```tsx
<div
  key={selectedAccount.id}
  style={{ animation: 'fade-in 200ms ease both' }}
>
  {/* screen content */}
</div>
```
