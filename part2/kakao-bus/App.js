import { useEffect, useState } from 'react';
import { SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons'
import dayjs from 'dayjs';

import { busStop, getSections, getBusNumColorByType, getRemainedTimeText, getSeatStatusText } from './modules/data'
import { COLOR } from './modules/color';
import BusInfo from './components/BusInfo'
import Margin from './components/common/Margin';
import BookmarkButton from './components/BookmarkButton';

const busStopBoomarkSize = 20
const busStopBookmarkHorizontal = 6

const HeaderIconButton = ({ iconName }) => (
  <TouchableOpacity style={{ padding: 10 }}>
    <SimpleLineIcons name={iconName} size={20} color={COLOR.WHITE} />
  </TouchableOpacity>
)

export default function App() {
  const sections = getSections(busStop.buses)
  const [now, setNow] = useState(dayjs())

  const onPressBusStopBookmark = () => {}

  const ListHeaderComponent = () => (
    <View
      style={{
        backgroundColor: COLOR.GRAY_3,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Margin height={10} />
      <Text style={{ color: COLOR.WHITE, fontSize: 13 }}>{busStop.id}</Text>
      <Margin height={4} />
      <Text style={{ color: COLOR.WHITE, fontSize: 20 }}>{busStop.name}</Text>
      <Margin height={4} />
      <Text style={{ color: COLOR.GRAY_1, fontSize: 14 }}>{busStop.directionDescription}</Text>
      <Margin height={20} />
      <BookmarkButton
        size={busStopBoomarkSize}
        isBookmarked={busStop.isBookmarked}
        onPress={onPressBusStopBookmark}
        style={{
          borderWidth: 0.3,
          borderColor: COLOR.GRAY_1,
          borderRadius: (busStopBoomarkSize + busStopBookmarkHorizontal * 2)/2,
          padding: busStopBookmarkHorizontal,
        }}
      />
      <Margin height={25} />
    </View>
  )

  const renderSectionHeader = ({ section: { title }}) => (
    <View style={{
      paddingLeft: 13, 
      paddingVertical: 3,
      backgroundColor: COLOR.GRAY_1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: COLOR.GRAY_2
    }}>
      <Text style={{ fontSize: 12, color: COLOR.GRAY_4 }}>{title}</Text>
    </View>
  )
  
  const renderItem = ({ item: bus }) => {
    const numColor = getBusNumColorByType(bus.type)
    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null; 
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos =
      !firstNextBusInfo && !secondNextBusInfo
        ? [null]
        : [firstNextBusInfo, secondNextBusInfo];

    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info)
        return {
          hasInfo: false,
          remainedTimeText: "도착 정보 없음",
        };

      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime);
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);
      return {
        hasInfo: true,
        remainedTimeText,
        numOfRemainedStops,
        seatStatusText,
      };
    });

    return (
      <BusInfo
        isBookmarked={bus.isBookmarked}
        onPressBookmark={() => {}} // TODO
        num={bus.num}
        directionDescription={bus.directionDescription}
        numColor={numColor}
        processedNextBusInfos={processedNextBusInfos}
      />
    )
  }

  const ItemSeparatorComponent = () => (
    <View style={{ width: '100%', height: 1, backgroundColor: COLOR.GRAY_1 }} />
  )
  const ListFooterComponent = () => (
    <Margin height={30} />
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = dayjs()
      setNow(newNow)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ width: '100%', backgroundColor: COLOR.GRAY_3 }}>
        <SafeAreaView style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <HeaderIconButton iconName='arrow-left' />
          <HeaderIconButton iconName='home' />
        </SafeAreaView>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: 500,
            backgroundColor: COLOR.GRAY_3,
            zIndex: -1
          }}
        />
      </View>
      <SectionList
        style={{ flex: 1, width: '100%' }}
        sections={sections}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListFooterComponent={ListFooterComponent}
      >
      </SectionList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
