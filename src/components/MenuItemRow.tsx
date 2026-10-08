import type { MenuItem } from "../data/menu"
import { Price } from "./Price"

/** View-only menu line. Height follows the content: names and descriptions always wrap, never clip. */
export function MenuItemRow({ item }: { item: MenuItem }) {
  return (
    <li className="menu-item">
      <div className="menu-item__text">
        <h3 className="menu-item__name">{item.name}</h3>
        {item.description && <p className="menu-item__description">{item.description}</p>}
        {item.label && <p className="menu-item__label">{item.label}</p>}
      </div>
      {item.price !== undefined && <Price value={item.price} />}
    </li>
  )
}
