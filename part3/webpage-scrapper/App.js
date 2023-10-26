import { SafeAreaProvider } from 'react-native-safe-area-context'
import { NavigationContainer } from '@react-navigation/native'
import { RootNavigation } from './src/navigations/RootNavigation';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </RecoilRoot>
    </SafeAreaProvider>
  );
}
