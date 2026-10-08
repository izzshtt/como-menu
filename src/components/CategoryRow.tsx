import type { Category } from "../data/menu"
import { ArrowRight } from "./Icons"
import { Link } from "./Link"

/** Row in the Eten / Drankjes overview: photo · name · arrow. */
export function CategoryRow({ sectionSlug, category }: { sectionSlug: string; category: Category }) {
  return (
    <Link to={`/${sectionSlug}/${category.slug}`} className="category-row">
      <span className="category-row__media">
        <img
          src={category.thumb.src}
          alt=""
          style={{ objectPosition: category.thumb.position }}
          loading="lazy"
          decoding="async"
        />
      </span>
      <span className="category-row__title">{category.title}</span>
      <ArrowRight className="category-row__arrow" />
    </Link>
  )
}
