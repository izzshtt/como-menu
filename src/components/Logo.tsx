// The supplied transparent COMO logo files, used as-is (never redrawn or recoloured).

type Props = { tone?: "black" | "white"; className?: string }

export function Logo({ tone = "black", className = "" }: Props) {
  return (
    <img
      className={`logo ${className}`}
      src={`/img/logo/como-${tone}.png`}
      width={1400}
      height={437}
      alt="COMO. bakery & brunch"
      decoding="async"
    />
  )
}
