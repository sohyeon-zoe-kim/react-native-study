import { SectionList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import BusInfo from './src/BusInfo'
import { COLOR } from './src/color';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <BusInfo
          isBookmarked={true}
          onPressBookmark={() => {}}
          num={146}
          directionDescription='강남역.강남역사거리'
          numColor={COLOR.BUS_B}
        />
        {/* <SectionList>
        </SectionList> */}
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
