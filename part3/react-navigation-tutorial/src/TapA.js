import React from 'react';
import { View, Text } from 'react-native';

export class TapA extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>이것은 TapA 입니다.</Text>
      </View>
    )
  }
}