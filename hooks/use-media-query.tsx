"use client"

import { useEffect, useState } from "react"

// Responsive hook for media queries
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    if (typeof window === "undefined") return
    const media = window.matchMedia(query)

    // Listener callback
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches)

    // Attach listener
    media.addEventListener("change", listener)
    // Initialize
    setMatches(media.matches)

    // Cleanup
    return () => media.removeEventListener("change", listener)
  }, [query])

  return matches
}
