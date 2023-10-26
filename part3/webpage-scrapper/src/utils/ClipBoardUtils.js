import { getStringAsync } from 'expo-clipboard'

export const getClipBoardString = () => {
  return getStringAsync()
}