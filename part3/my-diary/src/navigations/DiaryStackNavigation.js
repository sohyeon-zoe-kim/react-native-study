import React from "react"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DiartyListScreen } from '../screens/DiaryListScreen'
import { DiaryDetailScreen } from '../screens/DiaryDetailScreen'
import { SettingScreen } from '../screens/SettingScreen'
import { AddPasswordScreen } from "../screens/AddPasswordScreen"

const Stack = createNativeStackNavigator()

export const DiartyStackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="DiartyList"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name='DiaryList' component={DiartyListScreen} />
      <Stack.Screen name='DiaryDetail' component={DiaryDetailScreen} />
      <Stack.Screen name='Setting' component={SettingScreen} />
      <Stack.Screen name='AddPassword' component={AddPasswordScreen} />
    </Stack.Navigator>
  )
}