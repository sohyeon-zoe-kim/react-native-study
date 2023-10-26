import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
