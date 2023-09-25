import { TouchableOpacity } from "react-native"
import { Ionicons } from '@expo/vector-icons'

import { COLOR } from '../modules/utils/color'
import { useBookmark } from "../modules/hooks/useBookmark"

export default ({
  size,
  onPress,
  isBookmarked: isBookmarkedProp,
  style
}) => {
  const { isBookmarked, toggleIsBookmarked } = useBookmark(isBookmarkedProp)
  
  return (
    <TouchableOpacity style={style}
      onPress={() => {
        toggleIsBookmarked()
        onPress()
      }}
    >
      <Ionicons
        name="star"
        size={size}
        color={isBookmarked ? COLOR.YELLOW : COLOR.GRAY_1}
      />
    </TouchableOpacity>
  )
}