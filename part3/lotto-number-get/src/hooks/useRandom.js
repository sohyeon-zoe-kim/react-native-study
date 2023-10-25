import { useCallback } from "react"

export const useRandom = () => {
  const getNumberBackgroundColor = useCallback (() => {
    const randomNumber = Math.floor(Math.random() * 10 ) % 6
    switch(randomNumber) {
      case 0:
        return 'red'
      case 1:
        return 'blue'
      case 2:
        return 'gray'
      case 3:
        return 'green'
      case 4:
        return 'purple'
      default:
        return 'black'
    }
  }, [])

  return {
    getNumberBackgroundColor,
  }
}