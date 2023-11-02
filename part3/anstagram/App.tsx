import React from 'react';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FeedListItem } from './src/components/FeedListItem';

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FeedListItem
          image={"https://cdn.imweb.me/upload/S20200106a105fd03f4b57/ddf34457eaa8b.jpg"}
          likeCount={10}
          writer='fstvl.life'
          comment='This is test!!!'
          isLiked={false}
          onPressFeed={() => {
            console.log('onPress!')
          }}
        />
      </View>
    </SafeAreaProvider>
  );
}
