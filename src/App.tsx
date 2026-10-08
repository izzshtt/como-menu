import { useCallback, useEffect, useState } from "react"
import { Header } from "./components/Header"
import { NavMenu } from "./components/NavMenu"
import { findCategory, findSection } from "./data/menu"
import { CategoryPage } from "./pages/CategoryPage"
import { Home } from "./pages/Home"
import { SectionPage } from "./pages/SectionPage"
import { Splash } from "./pages/Splash"
import { parseRoute, usePath } from "./router"

const SPLASH_MS = 2200
const SPLASH_FADE_MS = 700

function useSplash() {
  const [stage, setStage] = useState<"show" | "leaving" | "done">("show")
  useEffect(() => {
    // `?splash` keeps the splash on screen — handy when reviewing it.
    if (new URLSearchParams(window.location.search).has("splash")) return
    const leave = window.setTimeout(() => setStage("leaving"), SPLASH_MS)
    const done = window.setTimeout(() => setStage("done"), SPLASH_MS + SPLASH_FADE_MS)
    return () => {
      window.clearTimeout(leave)
      window.clearTimeout(done)
    }
  }, [])
  return stage
}

export function App() {
  const path = usePath()
  const splash = useSplash()
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  const openMenu = useCallback(() => setMenuOpen(true), [])

  const route = parseRoute(path)
  const section = route.name !== "home" ? findSection(route.section) : undefined
  const category = route.name === "category" ? findCategory(route.section, route.category) : undefined

  let page = <Home />
  let headerTone: "light" | "photo" = "light"
  if (section && category) {
    page = <CategoryPage section={section} category={category} />
    headerTone = "photo"
  } else if (section && route.name === "section") {
    page = <SectionPage section={section} />
  }
  const isHome = page.type === Home

  useEffect(() => {
    document.title = category
      ? `${category.title} — COMO.`
      : section
        ? `${section.title} — COMO.`
        : "COMO. bakery & brunch — Menu"
  }, [section, category])

  return (
    <div className="site">
      <div className="frame">
        <Header tone={headerTone} showBack={!isHome} onMenu={openMenu} />
        <div key={path} className="page-transition">
          {page}
        </div>
      </div>
      <NavMenu open={menuOpen} onClose={closeMenu} />
      {splash !== "done" && <Splash leaving={splash === "leaving"} />}
    </div>
  )
}
