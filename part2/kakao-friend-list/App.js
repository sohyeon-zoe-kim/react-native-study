import { StatusBar } from 'expo-status-bar';
import {  StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { friendProfiles, myProfile } from './src/data'

import Header from './src/Header.js'
import Profile from './src/Profile.js';
import Margin from './src/Margin.js'
import Devision from './src/Devision.js'
import FriendSection from './src/FriendSection';
import FriendList from './src/FriendList';

export default function App() {
  const onPressArrow = () => {
    console.log('clicked arrow')
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView  style={styles.container} edges={['top', 'right', 'left']}>
        <Header />
        <Margin height={10} />
        <Profile 
          uri={myProfile.uri}
          name={myProfile.name}
          introduction={myProfile.introduction}
        />
        <Margin height={15} />
        <Devision />
        <Margin height={12} />
        <FriendSection
          friendProfileLen={friendProfiles.length}
          onPress={onPressArrow}
        />
        <FriendList
          data={friendProfiles}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15
  },
});
