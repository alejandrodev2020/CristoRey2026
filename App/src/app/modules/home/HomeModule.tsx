import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeService from './services/HomeService';
import { HomeStackParamList } from './routes/HomeRoutes';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeModuleNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
}


export {
  HomeService,
  HomeScreen,
};
