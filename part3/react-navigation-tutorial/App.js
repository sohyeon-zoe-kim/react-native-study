import * as React from 'react'
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ScreenA } from './src/ScreenA';
import { ScreenB } from './src/ScreenB';
import { NestedStackNavigation } from './src/NestedStackNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TapA } from './src/TapA';
import { TapB } from './src/TapB';
import Ionicons from '@expo/vector-icons/Ionicons';
import { BottomTapNavigation } from './src/BottomTapNavigator';

const Stack = createNativeStackNavigator()
const BottomTap = createBottomTabNavigator()

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name='screenA' component={ScreenA} />
//         <Stack.Screen name='screenB' component={ScreenB} />
//         <Stack.Screen name='NestedNavigator' component={NestedStackNavigation} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='NestedBottomTab' component={BottomTapNavigation} />
        <Stack.Screen name='ScreenB' component={ScreenB} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}