import { ArrowLeft, Hamburger } from "./Icons"
import { Link } from "./Link"
import { Logo } from "./Logo"
import { goBack } from "../router"

type Props = {
  /** "light" = black logo on cream, "photo" = white logo over photography. */
  tone?: "light" | "photo"
  showBack?: boolean
  onMenu: () => void
}

export function Header({ tone = "light", showBack = false, onMenu }: Props) {
  return (
    <header className={`header header--${tone}`}>
      <div className="header__start">
        {showBack && (
          <button type="button" className="icon-button header__back" onClick={goBack} aria-label="Terug">
            <ArrowLeft />
          </button>
        )}
        <Link to="/" className="header__logo" aria-label="COMO. — naar home">
          <Logo tone={tone === "photo" ? "white" : "black"} />
        </Link>
      </div>
      <button type="button" className="icon-button header__menu" onClick={onMenu} aria-label="Menu openen">
        <Hamburger />
      </button>
    </header>
  )
}
