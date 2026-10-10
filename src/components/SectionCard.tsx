import type { Section } from "../data/menu"
import { SIZES } from "../photoSizes"
import { ArrowRight } from "./Icons"
import { Link } from "./Link"

/** Large ETEN / DRANKJES card on the home page. */
export function SectionCard({ section }: { section: Section }) {
  return (
    <Link to={`/${section.slug}`} className="section-card">
      <span className="section-card__media">
        <img
          src={section.card.src}
          srcSet={section.card.srcSet}
          sizes={SIZES.card}
          alt=""
          style={{ objectPosition: section.card.position }}
          decoding="async"
        />
      </span>
      <span className="section-card__label">{section.title}</span>
      <ArrowRight className="section-card__arrow" />
    </Link>
  )
}
