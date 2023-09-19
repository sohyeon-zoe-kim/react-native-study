import { ScrollView, View } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Profile from "./Profile"
import Margin from './Margin'

export default (props) => {
  const insets = useSafeAreaInsets()

  if (!props.isOpened) return null
  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: insets.bottom }}>
      {props.data.map((item, index) => (
        <View key={index}>
          <Profile
            uri={item.uri}
            name={item.name}
            introduction={item.introduction}
          />
          <Margin height={13} />
        </View>
      ))}
    </ScrollView>
  )
}