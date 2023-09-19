import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { myProfile } from './src/data'

import Header from './src/Header.js'
import MyProfile from './src/MyProfile.js';
import Margin from './src/Margin.js'

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView  style={styles.container} edges={['top', 'right', 'left']}>
        <Header />
        <Margin height={10} />
        <MyProfile 
          uri={myProfile.uri}
          name={myProfile.name}
          introduction={myProfile.introduction}
        />
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
