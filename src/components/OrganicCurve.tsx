// The large, soft cream shape that flows over the bottom of a hero photo.
// Drawn in a 390-wide box and stretched horizontally, so it scales with the viewport.

const shapes = {
  // Home: cream rises on the left and sweeps gently down to the right.
  home: {
    viewBox: "0 0 390 110",
    d: "M0 26 C 34 16 70 20 110 40 C 160 64 214 84 270 90 C 318 95 356 92 390 86 L390 110 L0 110 Z",
  },
  // Category: a deeper S-curve, high on the left, falling away to the right.
  category: {
    viewBox: "0 0 390 150",
    d: "M0 14 C 26 4 58 10 82 34 C 104 56 122 70 160 72 C 214 75 258 78 296 98 C 330 116 360 136 390 142 L390 150 L0 150 Z",
  },
  // Top edge of the home photo: a soft sweep, slightly lower on the left.
  homeTop: {
    viewBox: "0 0 390 40",
    d: "M0 0 H390 V4 C 300 6 200 14 120 24 C 70 30 30 34 0 38 Z",
  },
}

type Props = { variant: keyof typeof shapes; className?: string }

export function OrganicCurve({ variant, className = "" }: Props) {
  const { viewBox, d } = shapes[variant]
  return (
    <svg
      className={`curve curve--${variant} ${className}`}
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}
