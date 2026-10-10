import type { Photo } from "../data/menu"
import { SIZES } from "../photoSizes"
import { OrganicCurve } from "./OrganicCurve"

type Props = {
  photo: Photo
  alt: string
  variant: "home" | "category"
}

/** Large food photograph with the organic cream curve overlapping its bottom edge. */
export function HeroImage({ photo, alt, variant }: Props) {
  return (
    <div className={`hero hero--${variant}`}>
      <img
        className="hero__img"
        src={photo.src}
        srcSet={photo.srcSet}
        sizes={SIZES.hero}
        alt={alt}
        style={{ objectPosition: photo.position }}
        fetchPriority="high"
        decoding="async"
      />
      {variant === "category" && <div className="hero__scrim" aria-hidden="true" />}
      {variant === "home" && <OrganicCurve variant="homeTop" />}
      <OrganicCurve variant={variant} />
    </div>
  )
}
