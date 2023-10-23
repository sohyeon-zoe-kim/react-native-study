import { StyleSheet, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Header } from './src/components/header/Header';
import { Spacer } from './src/components/atoms/Spacer';
import { TapIcon } from './src/components/molcules/TapIcon'
import { HookTestComponent } from './src/components/HookTestComponent';
import { useCallback, useState } from 'react';
import { Button } from './src/components/atoms/Button';
import { Typography } from './src/components/atoms/Typography';

export default function App() {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  const doSum = useCallback(() => {
    return (a+b)
  }, [b])

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Header>
          <Header.Title title='FESTIVL LIFE'></Header.Title>
        </Header>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <HookTestComponent a={a} b={b}></HookTestComponent>
          <Typography>현재 callback으로 계산 된 값 : {doSum()}</Typography>
          <Button onPress={() => {
            console.log('press')
            setA(a+1)
          }}>
            <Typography>A 더하기</Typography>
          </Button>
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
