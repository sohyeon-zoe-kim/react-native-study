import { NativeStackNavigationProp, createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import { BottomTabNaviation } from "./BottomTabNavigation"
import { AddFeedScreen } from "../screens/AddFeedScreen"
import { FeedListScreen } from "../screens/FeedListScreen"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"

export type RootStackparamList = {
  BottomTab: undefined,
  FeedList: {
    list: {
      id: string,
      content: string,
      writer: string,
      imageUrl: string,
      likeCount: number
    }[]
  }
  AddFeed: undefined
}

const Stack = createNativeStackNavigator<RootStackparamList>()

export const RootStacknavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: "containedModal"
      }}
    >
      <Stack.Screen name="BottomTab" component={BottomTabNaviation} />
      <Stack.Screen name="AddFeed" component={AddFeedScreen} />
      <Stack.Screen name="FeedList" component={FeedListScreen} />
    </Stack.Navigator>
  )
}

export const useRootNavigation = <RouteName extends keyof RootStackparamList>() => {
  return useNavigation<NativeStackNavigationProp<RootStackparamList, RouteName>>
}

export const useRootRoute = <RouteName extends keyof RootStackparamList>() => {
  return useRoute<RouteProp<RootStackparamList, RouteName>>
}