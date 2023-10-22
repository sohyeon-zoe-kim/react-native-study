import { StyleSheet, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { HeaderWithoutCompound } from './src/components/molcules/HeaderWithoutCompound';
import { Header } from './src/components/header/Header';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* <HeaderWithoutCompound title='FSTVLLIFE' /> */}
        <Header>
          <Header.Group>
            <Header.Icon iconName='arrow-back'></Header.Icon>
            <Header.Title title='FSTVLLIFE'></Header.Title>
          </Header.Group>
          <Header.Icon iconName='close'></Header.Icon>
        </Header>
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
