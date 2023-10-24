import { createContext, useState } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CounterScreen } from './src/screens/CounterScreen';
import { Provider } from 'react-redux';

export const CounterContext = createContext()

export default function App() {
  const counterState = useState(0)

  return (
    <SafeAreaProvider>
      <CounterContext.Provider value={counterState}>
        <CounterScreen />
      </CounterContext.Provider>
    </SafeAreaProvider>
  );
}