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

## Photos
Originals live in `photos-src/`. `npm run images` (also runs automatically before `npm run build`)
turns them into responsive WebP files in `public/img/photos/` (320, 640, 960, 1600 px, metadata stripped)
and writes `src/data/photo-manifest.json`. The browser downloads only the size it needs.
To replace a photo: put the original (at least 1600 px wide) in `photos-src/` with the same name and run `npm run images`.
Still low-res crops from the mockup: churros, eten-card, drankjes-card, home-hero, warme-dranken, koude-dranken.
A category page uses `hero` if set in `menu.ts`, otherwise the category thumbnail.
For a dedicated hero, add `<name>-hero.png` (or .jpg) to `photos-src/`, run `npm run images`, and set `hero: photo("<name>-hero")` on that category.
Loading: thumbnails of both sections are fetched in the background during the splash; a category hero is fetched when the guest touches or hovers that category.
