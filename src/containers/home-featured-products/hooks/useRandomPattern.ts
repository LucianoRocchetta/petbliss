import { useMemo } from "react"
import { PATTERN_IMAGES } from "../constants"

export const useRandomPattern = (): string => {
  return useMemo(() => {
    const randomIndex = Math.floor(Math.random() * PATTERN_IMAGES.length)
    return PATTERN_IMAGES[randomIndex]
  }, [])
}
