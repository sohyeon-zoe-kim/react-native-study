import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { TapA } from "./TapA";
import { NestedStackNavigation } from "./NestedStackNavigator";
import Ionicons from '@expo/vector-icons/Ionicons';

const BottomTap = createBottomTabNavigator()

export class BottomTapNavigation extends React.Component {
  render() {
    return (
      <BottomTap.Navigator>
        <BottomTap.Screen
          name='TapA'
          component={TapA}
          options={{
            tabBarIcon: () => <Ionicons name="home" size={20} />
          }}
        />
        <BottomTap.Screen
          name='TapB'
          component={NestedStackNavigation}
          options={{
            tabBarIcon: () => <Ionicons name="settings" size={20} />
          }}
        />
      </BottomTap.Navigator>
    )
  }
}