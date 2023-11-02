import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"
import { HomeScreen } from "../screens/HomeScreen"
import { MyPageScreen } from "../screens/MyPageScreen"
import { iconName } from "../components/atoms/Icon"
import { TabIcon } from "../components/molcules/TabIcon"

export type BottomTabParamList = {
  Home: undefined,
  MyPage: undefined
}
const BottomTab = createBottomTabNavigator<BottomTabParamList>()
export const BottomTabNaviation = () => {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => {
        const getIconName = (): iconName => {
          if (route.name === 'MyPage') {
            return 'person'
          }
          return 'home'
        }

        const routeIconName = getIconName()

        return {
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return (
              <TabIcon
                visibleBadge={false}
                iconName={routeIconName}
                iconColor={color}
              />
            )
          }
        }
      }}
    >
      <BottomTab.Screen name='Home' component={HomeScreen} />
      <BottomTab.Screen name='MyPage' component={MyPageScreen} />
    </BottomTab.Navigator >
  )
}