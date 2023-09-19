import { TouchableOpacity, View } from "react-native"
import { Fontisto } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const TabButton = ({
  isSelected,
  onPress,
  activeIconName,
  inActiveIconName,
  isIconFontisto,
  isIconIonicons
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
      }}
    >
      {isIconFontisto && <Fontisto name={isSelected ? activeIconName : inActiveIconName} size={24} color='black' />}
      {isIconIonicons && <Ionicons name={isSelected ? activeIconName : inActiveIconName} size={24} color='black' />}
    </TouchableOpacity>
  )
}

export default ({ selectedTabIdx, setSelectedTabIdx }) => {
  const insets = useSafeAreaInsets()

  return (
    <View style={{
      flexDirection: 'row',  
      width: '100%',
      paddingBottom: insets.bottom,
      borderTopWidth: 0.5,
      borderTopColor: 'grey',
    }}>
      <TabButton
        isSelected={selectedTabIdx === 0}
        onPress={() => setSelectedTabIdx(0)}
        activeIconName={'person'}
        inActiveIconName={'persons'}
        isIconFontisto
      />
      <TabButton
        isSelected={selectedTabIdx === 1}
        onPress={() => setSelectedTabIdx(1)}
        activeIconName={'chatbubble'}
        inActiveIconName={'chatbubble-outline'}
        isIconIonicons
      />
      <TabButton
        isSelected={selectedTabIdx === 2}
        onPress={() => setSelectedTabIdx(2)}
        activeIconName={'pricetag'}
        inActiveIconName={'pricetag-outline'}
        isIconIonicons
      />
      <TabButton
        isSelected={selectedTabIdx === 3}
        onPress={() => setSelectedTabIdx(3)}
        activeIconName={'add-circle'}
        inActiveIconName={'add-circle-outline'}
        isIconIonicons
      />
    </View>
  )
}