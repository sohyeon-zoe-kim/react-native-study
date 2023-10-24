import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CounterScreen } from './src/screens/CounterScreen';
import { RecoilRoot } from 'recoil';

export default function App() {

  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <CounterScreen />
      </RecoilRoot>
    </SafeAreaProvider>
  );
}