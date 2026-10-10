import type { Photo } from "./data/menu"

// `sizes` per slot: tells the browser how wide the photo is shown, so it
// downloads the smallest file that is still sharp on that screen.
// The layout is capped at --max-width (480px), so these never grow past that.
export const SIZES = {
  hero: "(max-width: 480px) 100vw, 480px",
  card: "(max-width: 480px) 45vw, 220px",
  row: "(max-width: 480px) 41vw, 200px",
} as const

export type Slot = keyof typeof SIZES

const warmed = new Set<string>()

/** Downloads photos in the background, so they show instantly when the page opens. */
export function preload(photos: Photo[], slot: Slot, immediate = false) {
  // Respect "data saver" on the guest's phone.
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  if (conn?.saveData) return
  const run = () => {
    for (const p of photos) {
      const key = `${p.srcSet}|${slot}`
      if (warmed.has(key)) continue
      warmed.add(key)
      const img = new Image()
      img.decoding = "async"
      img.sizes = SIZES[slot]
      img.srcset = p.srcSet
      img.src = p.src
    }
  }
  if (immediate) run()
  else if ("requestIdleCallback" in window) window.requestIdleCallback(run, { timeout: 1500 })
  else setTimeout(run, 200)
}
