import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListClientScreen from './screens/ListClientScreen';
import { ClientStackParamList } from './routes/ClientStackRoutes';
import { ClientService } from './services/ClientService';
import CreateClientScreen from './screens/CreateClientScreen';
import OverviewClientScreen from './screens/OverviewClientScreen';
import UpdateClientScreen from './screens/UpdateClientScreen';

const Stack = createNativeStackNavigator<ClientStackParamList>();

export function HomeModuleNavigator() {
  return (
    <Stack.Navigator initialRouteName="ListClient" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListClient" component={ListClientScreen} />
      <Stack.Screen name="CreateClient" component={CreateClientScreen} />
       <Stack.Screen name="OverviewClient"  component={OverviewClientScreen} />
       <Stack.Screen name="UpdateClient"  component={UpdateClientScreen} />
    
    </Stack.Navigator>
  );
}


export {
  ClientService,
  ListClientScreen,
};
