import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootApp } from './src/RootApp';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure()

export default function App() {
  return (
    <SafeAreaProvider>
      <RootApp />
    </SafeAreaProvider>
  );
}
