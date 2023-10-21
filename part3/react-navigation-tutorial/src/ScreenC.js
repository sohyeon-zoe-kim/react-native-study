import React from "react";
import { View, Text } from "react-native";

export class ScreenC extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center'}}>
        <Text>이것은 C Screen 입니다.</Text>
      </View>
    )
  }
}