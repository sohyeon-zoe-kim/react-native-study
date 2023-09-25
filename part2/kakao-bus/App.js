import { SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import BusInfo from './src/BusInfo'
import { busStop, getSections, getBusNumColorByType, getRemainedTimeText, getSeatStatusText } from './src/data'
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { COLOR } from './src/color';

export default function App() {
  const sections = getSections(busStop.buses)
  const [now, setNow] = useState(dayjs())

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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <SectionList
          style={{ flex: 1, width: '100%'}}
          sections={sections}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
        >
        </SectionList>
      </SafeAreaView>
    </SafeAreaProvider>
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
