import { useEffect, useRef } from "react"
import { ArrowRight, Close } from "./Icons"
import { Link } from "./Link"
import { Logo } from "./Logo"

type Props = { open: boolean; onClose: () => void }

const links = [
  { to: "/eten", label: "Eten" },
  { to: "/drankjes", label: "Drankjes" },
  { to: "/", label: "Home" },
]

/** Full-screen navigation: Eten · Drankjes · Home. */
export function NavMenu({ open, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.documentElement.classList.add("no-scroll")
    return () => {
      document.removeEventListener("keydown", onKey)
      document.documentElement.classList.remove("no-scroll")
    }
  }, [open, onClose])

  return (
    <div className={`nav ${open ? "is-open" : ""}`} aria-hidden={!open} inert={!open}>
      <div className="nav__panel" role="dialog" aria-modal="true" aria-label="Navigatie">
        <div className="nav__top">
          <Link to="/" onClick={onClose} className="header__logo" aria-label="COMO., naar home">
            <Logo />
          </Link>
          <button ref={closeRef} type="button" className="icon-button" onClick={onClose} aria-label="Menu sluiten">
            <Close />
          </button>
        </div>
        <nav className="nav__links">
          {links.map((l) => (
            <Link key={l.to} to={l.to} onClick={onClose} className="nav__link">
              <span>{l.label}</span>
              <ArrowRight />
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
