Role & Goal:
You are an expert Principal Design System Engineer. Your task is to generate a complete, production-ready Base Component Library in React, TypeScript, and Tailwind CSS, fully integrated with Storybook stories (`.stories.tsx`) for every component.

---

### 1. Architectural & Technical Requirements:
1. **Design Tokens & Theme System:**
   - Define CSS custom properties / Tailwind configuration supporting Light & Dark modes.
   - Domain-focused palette:
     - **Fintech:** Deep Navy/Slate, Emerald Green (success/yield), Crimson Red (loss/alert), Royal Blue (trust/actions).
     - **EdTech:** Warm Indigo, Soft Purple, Amber Gold (achievement/badges), Soft Neutral backgrounds.
   - **Fluid Responsive Typography:** Use `clamp()` for dynamic font scaling (Mobile to Desktop) without breaking layout hierarchy.

2. **Accessibility & Quality:**
   - WCAG 2.1 AA compliant colors and keyboard focus rings (`focus-visible`).
   - Clean, typed Props interfaces (`HTMLAttributes` extension, `cva` or `clsx` for class merging).

3. **Storybook Standard:**
   - Deliver `.stories.tsx` for every single component using Component Story Format 3 (CSF3).
   - Include controls for variants, sizes, states, dark/light theme preview, and interactive mock args.

---

### 2. Full List of Base Components to Generate:

#### A. Core Inputs & Forms:
1. **Button:** Primary, Secondary, Outline, Ghost, Danger, Link. Loading spinner state, left/right icons, sizes (sm, md, lg).
2. **Input / TextField:** Support start/end adornments (e.g., $ / VND / search icon), label, floating label, error/helper text, disabled/readonly states.
3. **Select / Dropdown:** Custom trigger with dropdown popover, support search filter and item descriptions.
4. **Checkbox & Radio Group:** Custom styled inputs with smooth check/radio animations, label alignment, horizontal/vertical layouts.
5. **Switch / Toggle:** Smooth animation, sizes (sm, md), support labels on left/right.
6. **Form Group / Form Control:** Wrapper layout component for managing label, helper text, required markers, and validation error messages uniformly.

#### B. Data Display & Status:
7. **Badge / Chip:** Variants (solid, subtle/soft, outline). Statuses (success, warning, error, info, neutral). Suited for financial changes (+2.45%) or course status (In Progress, Completed).
8. **Avatar / Avatar Group:** Image fallback to initials or icon, status dot indicator (online, away), group overlapping stack.
9. **Card:** Modular sub-components (`Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
10. **Table:** Clean financial/data grid styling (`Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`, `TableHead`). Striped & hover options.
11. **Progress Bar & Circular Progress:** Linear progress bar with percentage indicator + circular loader for dashboard metrics.

#### C. Navigation & Overlay:
12. **Tabs:** Horizontal/Vertical variants with animated underline indicator.
13. **Modal / Dialog:** Backdrop blur, accessible dialog body, header, footer, close trigger.
14. **Toast / Alert:** Success, Info, Warning, Error alerts with icon and dismiss action.
15. **Tooltip:** Hover/Focus popover trigger with dynamic direction (top, bottom, left, right).

---

### 3. Folder Structure Output Format:

Generate the code structured in the following file layout:

```text
src/
├── styles/
│   └── globals.css          # Design Tokens (Light/Dark vars, fluid text)
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.types.ts
│   │   │   └── Button.stories.tsx
│   │   ├── Input/
│   │   │   ├── Input.tsx
│   │   │   └── Input.stories.tsx
│   │   ├── Card/
│   │   │   ├── Card.tsx
│   │   │   └── Card.stories.tsx
│   │   ├── Badge/
│   │   ├── Table/
│   │   ├── Modal/
│   │   └── ... (All base components)