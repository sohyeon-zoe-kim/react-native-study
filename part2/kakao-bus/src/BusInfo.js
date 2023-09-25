import { View, Text } from "react-native"
import BookmarkButton from "./BookmarkButton"
import { COLOR } from "./color"
import AlarmButton from "./AlarmButton"
import NextBusInfo from "./NextBusInfo"

export default ({
  isBookmarked,
  onPressBookmark,
  num,
  directionDescription,
  numColor
}) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <BookmarkButton
          style={{ paddingHorizontal: 10 }}
          isBookmarked={isBookmarked}
          onPress={onPressBookmark}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ color: numColor, fontSize: 20 }}>{num}</Text>
          <Text style={{ color: COLOR.GRAY_3, fontSize: 13}}>{directionDescription}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <NextBusInfo
            hasInfo={true}
            remainedTimeText='8분 0초'
            numOfRemainedStos={5}
            seatStatusText='여유'
          />
          <NextBusInfo
            hasInfo={false}
            remainedTimeText='도착 정보 없음'
          />
        </View>
        <AlarmButton onPress={() => {}} style={{ paddingHorizontal: 15 }} />
      </View>
    </View>
  )
}