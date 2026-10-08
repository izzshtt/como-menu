# COMO. bakery & brunch — digitale menukaart

View-only QR menu (no ordering). Vite + React + TypeScript, static output.

```
npm install
npm run dev      # http://localhost:5173  (add ?splash to keep the splash on screen)
npm run build    # static site in dist/
```

## Structure
- `src/data/menu.ts` — all content (sections → categories → items). Shaped like future Sanity documents.
- `src/components/` — Header, Logo, HeroImage, OrganicCurve, PalmShadows, SectionCard, CategoryRow, MenuItemRow, Price, NavMenu.
- `src/pages/` — Splash, Home, SectionPage (Eten/Drankjes), CategoryPage.
- `src/styles.css` — design tokens (exact COMO palette, Playfair Display + DM Sans) and all component styles.
- Routes: `#/`, `#/eten`, `#/drankjes`, `#/eten/<category>`, `#/drankjes/<category>`.

## Photos — replace before going live
`public/img/photos/` holds the best crops currently available (derived from the concept mockup).
Drop in the original photos with the same file names (≥ 1200 px wide) — no code changes needed.
Category pages use `hero` if set in `menu.ts`, otherwise the category photo; add `hero: photo("<name>-hero")` per category once originals exist.
