import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import Header from './src/Header.js'

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView  style={styles.container} edges={['top', 'right', 'left']}>
        <Header />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
