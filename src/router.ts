import { useEffect, useState } from "react"

// Tiny hash router: works on any static host, and the browser's own back button
// behaves like on a normal website.

export type Route =
  | { name: "home" }
  | { name: "section"; section: string }
  | { name: "category"; section: string; category: string }

const scrollPositions = new Map<string, number>()

const currentPath = () => window.location.hash.replace(/^#/, "") || "/"

export function parseRoute(path: string): Route {
  const [section, category] = path.split("/").filter(Boolean)
  if (section && category) return { name: "category", section, category }
  if (section) return { name: "section", section }
  return { name: "home" }
}

export function parentPath(path: string) {
  const parts = path.split("/").filter(Boolean)
  return parts.length > 1 ? `/${parts[0]}` : "/"
}

function emit() {
  window.dispatchEvent(new Event("como:navigate"))
}

export function navigate(to: string) {
  if (to === currentPath()) {
    window.scrollTo({ top: 0, behavior: "smooth" })
    return
  }
  scrollPositions.set(currentPath(), window.scrollY)
  window.history.pushState({ como: true }, "", `#${to}`)
  emit()
  window.scrollTo(0, 0)
}

/** Back to the previous page; falls back to the parent page on a fresh visit. */
export function goBack() {
  const path = currentPath()
  if (window.history.state?.como) {
    window.history.back()
  } else {
    window.history.replaceState(null, "", `#${parentPath(path)}`)
    emit()
    window.scrollTo(0, 0)
  }
}

export function usePath() {
  const [path, setPath] = useState(currentPath)

  useEffect(() => {
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual"
    const onNavigate = () => setPath(currentPath())
    const onPop = () => {
      const next = currentPath()
      setPath(next)
      requestAnimationFrame(() => window.scrollTo(0, scrollPositions.get(next) ?? 0))
    }
    window.addEventListener("como:navigate", onNavigate)
    window.addEventListener("popstate", onPop)
    return () => {
      window.removeEventListener("como:navigate", onNavigate)
      window.removeEventListener("popstate", onPop)
    }
  }, [])

  return path
}
