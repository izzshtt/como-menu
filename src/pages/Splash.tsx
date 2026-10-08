import { Logo } from "../components/Logo"
import { PalmShadows } from "../components/PalmShadows"

export function Splash({ leaving }: { leaving: boolean }) {
  return (
    <div className={`splash ${leaving ? "is-leaving" : ""}`} role="status" aria-label="Menu wordt geladen">
      <PalmShadows />
      <div className="splash__logo">
        <Logo />
      </div>
      <div className="splash__progress">
        <span className="splash__bar" />
        <span className="splash__text">Welkom…</span>
      </div>
    </div>
  )
}
