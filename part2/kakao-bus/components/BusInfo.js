import { View, Text } from "react-native"
import BookmarkButton from "./BookmarkButton"
import { COLOR } from "../modules/utils/color"
import AlarmButton from "./AlarmButton"
import NextBusInfo from "./NextBusInfo"

export default ({
  isBookmarked,
  onPressBookmark,
  num,
  numColor,
  directionDescription,
  processedNextBusInfos
}) => {
  return (
    <View style={{ flexDirection: 'row', height: 75, backgroundColor: '#fff' }}>
      <View style={{ flex: 0.85, flexDirection: 'row', alignItems: 'center' }}>
        <BookmarkButton
          size={24}
          style={{ paddingHorizontal: 10 }}
          isBookmarked={isBookmarked}
          onPress={onPressBookmark}
        />
        <View style={{ flex: 1 }}>
          <Text style={{ color: numColor, fontSize: 20 }}>{num}</Text>
          <Text style={{ color: COLOR.GRAY_3, fontSize: 13, marginRight: 5 }}>{directionDescription}</Text>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          {processedNextBusInfos.map((info, index) => (
            <NextBusInfo
              key={`nextBusInfo-${index}`}
              hasInfo={info.hasInfo}
              remainedTimeText={info.remainedTimeText}
              numOfRemainedStops={info.numOfRemainedStops}
              seatStatusText={info.seatStatusText}
            />
          ))}
        </View>
        <AlarmButton onPress={() => {}} style={{ paddingHorizontal: 15 }} />
      </View>
    </View>
  )
}