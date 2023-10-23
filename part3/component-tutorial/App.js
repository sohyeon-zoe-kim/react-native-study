import { StyleSheet, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Header } from './src/components/header/Header';
import { Spacer } from './src/components/atoms/Spacer';
import { TapIcon } from './src/components/molcules/TapIcon'

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header>
          <Header.Group>
            <Header.Icon iconName='home'></Header.Icon>
            <Spacer space={5} horizontal />
            <Header.Title title='FESTIVL LIFE'></Header.Title>
          </Header.Group>
          <Header.Icon iconName='close'></Header.Icon>
        </Header>
        <View style={{ flexDirection: 'row' }}>
          <TapIcon visibleBadge iconName='home' />
        </View>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
