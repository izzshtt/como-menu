import { HeroImage } from "../components/HeroImage"
import { ArrowLeft } from "../components/Icons"
import { Link } from "../components/Link"
import { MenuItemRow } from "../components/MenuItemRow"
import type { Category, Section } from "../data/menu"

export function CategoryPage({ section, category }: { section: Section; category: Category }) {
  return (
    <main className="page page--category">
      <HeroImage photo={category.hero ?? category.thumb} alt={category.title} variant="category" />
      <div className="category__body">
        <header className="page-intro page-intro--category">
          <h1 className="page-intro__title">{category.title}</h1>
          <p className="page-intro__text">{category.intro}</p>
        </header>
        <ul className="menu-list">
          {category.items.map((item) => (
            <MenuItemRow key={item.name} item={item} />
          ))}
        </ul>
        {category.notes && (
          <div className="menu-notes">
            {category.notes.map((n) => (
              <p key={n}>{n}</p>
            ))}
          </div>
        )}
        <Link to={`/${section.slug}`} className="back-link">
          <ArrowLeft />
          <span>Terug naar {section.title}</span>
        </Link>
      </div>
    </main>
  )
}
