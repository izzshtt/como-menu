import { CategoryRow } from "../components/CategoryRow"
import type { Section } from "../data/menu"

/** Rows that fit on a phone screen without scrolling. */
const EAGER_ROWS = 5

/** Eten / Drankjes overview. */
export function SectionPage({ section }: { section: Section }) {
  return (
    <main className="page page--section">
      <header className="page-intro">
        <h1 className="page-intro__title">{section.title}</h1>
        <p className="page-intro__text">{section.intro}</p>
      </header>
      <nav className="category-list" aria-label={section.title}>
        {section.categories.map((c, i) => (
          <CategoryRow key={c.slug} sectionSlug={section.slug} category={c} eager={i < EAGER_ROWS} />
        ))}
      </nav>
    </main>
  )
}
