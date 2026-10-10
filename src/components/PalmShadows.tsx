import { useMemo } from "react"

// Soft palm-leaf shadows, as if late sun falls through a palm onto a beige wall.
// Each frond is a curved stem with tapering, slightly drooping leaflets on both
// sides; the whole layer is blurred twice (soft core + wide penumbra) and
// multiplied onto the background so it never competes with the logo.

type Frond = {
  x: number // base position (viewBox units, 390 × 844)
  y: number
  angle: number // direction of the stem in degrees (0 = right, -90 = up)
  length: number
  bend: number // sideways curvature of the stem
  leafLength: number
  leaflets: number
  seed: number
}

const fronds: Frond[] = [
  // Left cluster: reaches in from the left edge, mid-height.
  { x: -30, y: 480, angle: -50, length: 290, bend: 60, leafLength: 104, leaflets: 15, seed: 1 },
  { x: -50, y: 560, angle: -14, length: 215, bend: 46, leafLength: 86, leaflets: 12, seed: 2 },
  { x: -40, y: 380, angle: -80, length: 240, bend: -40, leafLength: 80, leaflets: 12, seed: 3 },
  // Right cluster: lower, coming in from the bottom-right corner.
  { x: 430, y: 900, angle: -128, length: 330, bend: -56, leafLength: 108, leaflets: 15, seed: 4 },
  { x: 440, y: 770, angle: -165, length: 230, bend: -40, leafLength: 74, leaflets: 12, seed: 5 },
  { x: 410, y: 960, angle: -100, length: 220, bend: 36, leafLength: 70, leaflets: 11, seed: 6 },
]

function random(seed: number) {
  let s = seed * 9301 + 49297
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

const rad = (deg: number) => (deg * Math.PI) / 180

function frondPaths(f: Frond) {
  const rnd = random(f.seed)
  const dir = rad(f.angle)
  const ux = Math.cos(dir)
  const uy = Math.sin(dir)
  // Stem as a quadratic Bézier: base → control (pushed sideways) → tip.
  const tip = { x: f.x + ux * f.length, y: f.y + uy * f.length }
  const ctrl = {
    x: f.x + ux * f.length * 0.5 - uy * f.bend,
    y: f.y + uy * f.length * 0.5 + ux * f.bend,
  }
  const at = (t: number) => ({
    x: (1 - t) ** 2 * f.x + 2 * (1 - t) * t * ctrl.x + t * t * tip.x,
    y: (1 - t) ** 2 * f.y + 2 * (1 - t) * t * ctrl.y + t * t * tip.y,
  })
  const tangent = (t: number) =>
    Math.atan2(
      2 * (1 - t) * (ctrl.y - f.y) + 2 * t * (tip.y - ctrl.y),
      2 * (1 - t) * (ctrl.x - f.x) + 2 * t * (tip.x - ctrl.x),
    )

  const stem = `M${f.x} ${f.y} Q${ctrl.x} ${ctrl.y} ${tip.x} ${tip.y}`
  const leaves: string[] = []

  for (let i = 0; i < f.leaflets; i++) {
    const t = 0.16 + (0.82 * i) / (f.leaflets - 1)
    const p = at(t)
    const tan = tangent(t)
    // Leaflets are longest around the middle of the frond and short at the tip.
    const size = f.leafLength * Math.sin(Math.PI * (0.22 + 0.7 * t)) * (0.85 + rnd() * 0.3)
    for (const side of [-1, 1]) {
      const spread = rad(52 - 22 * t + rnd() * 10) * side
      const a = tan + spread
      const len = size * (0.9 + rnd() * 0.2)
      const width = len * (0.12 + rnd() * 0.035)
      // Tip droops a little away from the stem's direction.
      const droop = rad(14 * side)
      const tx = p.x + Math.cos(a + droop * 0.5) * len
      const ty = p.y + Math.sin(a + droop * 0.5) * len
      const mx = p.x + Math.cos(a) * len * 0.5
      const my = p.y + Math.sin(a) * len * 0.5
      const nx = -Math.sin(a) * width
      const ny = Math.cos(a) * width
      leaves.push(
        `M${p.x.toFixed(1)} ${p.y.toFixed(1)}` +
          `Q${(mx + nx).toFixed(1)} ${(my + ny).toFixed(1)} ${tx.toFixed(1)} ${ty.toFixed(1)}` +
          `Q${(mx - nx).toFixed(1)} ${(my - ny).toFixed(1)} ${p.x.toFixed(1)} ${p.y.toFixed(1)}Z`,
      )
    }
  }
  return { stem, leaves: leaves.join("") }
}

export function PalmShadows() {
  const paths = useMemo(() => fronds.map(frondPaths), [])

  const layer = (filter: string) =>
    paths.map((p, i) => (
      <g key={i} className={`palm__frond palm__frond--${i % 3}`} style={{ transformOrigin: `${fronds[i].x}px ${fronds[i].y}px` }}>
        <path d={p.stem} fill="none" stroke="currentColor" strokeWidth={4} strokeLinecap="round" filter={filter} />
        <path d={p.leaves} fill="currentColor" filter={filter} />
      </g>
    ))

  return (
    <svg className="palm" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id="palm-core" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
        <filter id="palm-penumbra" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="11" />
        </filter>
      </defs>
      <g className="palm__penumbra">{layer("url(#palm-penumbra)")}</g>
      <g className="palm__core">{layer("url(#palm-core)")}</g>
    </svg>
  )
}
