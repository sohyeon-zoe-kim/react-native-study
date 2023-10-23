import React from "react"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ImageListScreen } from '../screen/ImageListScreen'
import { FavoriteImageListScreen } from '../screen/FavoriteImageListScreen'
import { TabIcon } from '../components/molcules/TabIcon'

const Tabs = createBottomTabNavigator()

export const BottomTabNavigation = () => {
  return (
    <Tabs.Navigator screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size}) => {
        const getIconName = () => {
          if (route.name === 'ImageList') {
            return 'home'
          }

          if (route.name === 'FavoriteImageList') {
            return 'star'
          }
        }
        const iconName = getIconName()

        return (
          <TabIcon iconName={iconName} iconColor={color} />
        )
      }
    })}>
      <Tabs.Screen name="ImageList" component={ImageListScreen}></Tabs.Screen>
      <Tabs.Screen name="FavoriteImageList" component={FavoriteImageListScreen}></Tabs.Screen>
    </Tabs.Navigator>
  )
}