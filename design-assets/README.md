# Design Assets

Exported design files serving as the visual reference for implementation.

These are the source of truth for layout, spacing, color usage, and component patterns.
**Do not modify these files** — they are read-only reference material.

---

## Contents

```
design-assets/
├── DESIGN.md           ← Full design system specification (The Curated Blueprint)
├── home/
│   ├── prototype.html  ← Home page HTML prototype (open in browser for reference)
│   └── screen.png      ← Rendered screenshot
├── experience/
│   ├── prototype.html  ← Experience & Education page
│   └── screen.png
├── projects/
│   ├── prototype.html  ← Projects & Skills page
│   └── screen.png
└── blog/
    ├── prototype.html  ← Blog listing page
    └── screen.png
```

---

## How to Use

- Open `prototype.html` files directly in a browser to see the intended design
- Use `screen.png` as a quick visual reference during implementation
- Consult `DESIGN.md` for the reasoning behind design decisions
- For the full documented token set, see `docs/design-system.md`

---

## Key Design Decisions

All prototypes share the same Tailwind token configuration. The critical rules:

| Rule | Detail |
|---|---|
| No black borders | Section boundaries via background color shifts only |
| No pure black text | Always use `on-surface` (#181c1e) |
| Ghost borders only | `outline-variant` at 10–15% opacity max |
| Editorial shadow | `0 20px 40px rgba(24, 28, 30, 0.06)` |
| Frosted glass nav | `bg-white/80 backdrop-blur-md` |
| Timeline watermarks | `text-7xl text-primary-fixed-dim opacity-20` |
| Pill chips | `rounded-full` = `0.75rem` (not the default 9999px) |
