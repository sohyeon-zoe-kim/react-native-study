import { useState } from "react"

export const useBookmark = (initialIsBookmarked) => {
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked)
  const toggleIsBookmarked = () => setIsBookmarked(!isBookmarked)
  return {
    isBookmarked,
    toggleIsBookmarked
  }
}