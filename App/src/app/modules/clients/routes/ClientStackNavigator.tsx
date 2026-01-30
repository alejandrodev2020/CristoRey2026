import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import IconList from '../../../../assets/icons/tabler/svg/outline/align-justified.svg';

import { ClientStackParamList } from './ClientStackRoutes';
import { ListClientScreen } from '../ClientModule';
import CreateClientScreen from '../screens/CreateClientScreen';
import OverviewClientScreen from '../screens/OverviewClientScreen';
import UpdateClientScreen from '../screens/UpdateClientScreen';

const Stack = createNativeStackNavigator<ClientStackParamList>();
export default function ClientStackNavigator() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      initialRouteName="ListClient"
      screenOptions={{
        headerShown: false,
      }}
    >

      {/* ============================================================
          👥 LISTADO DE CLIENTES
      ============================================================ */}
      <Stack.Screen
        name="ListClient"
        component={ListClientScreen}
        options={{
          headerShown: false,
          headerTransparent: true,
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{ marginLeft: 15 }}
            >
              <IconList color="#ffffffff" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* ============================================================
          ➕ CREAR CLIENTE
      ============================================================ */}
      <Stack.Screen
        name="CreateClient"
        component={CreateClientScreen}
        options={{
          headerShown: false,
          title: 'Nuevo Cliente',
        }}
      />

      {/* ============================================================
          👁️ OVERVIEW CLIENTE (SOLO LECTURA)
      ============================================================ */}
      <Stack.Screen
        name="OverviewClient"
        component={OverviewClientScreen}
        options={{
          headerShown: false,
        }}
      />
      
      {/* ============================================================
          👁️ UPDATE CLIENTE 
      ============================================================ */}
      <Stack.Screen
        name="UpdateClient"
        component={UpdateClientScreen}
        options={{
          headerShown: false,
        }}
      />

    </Stack.Navigator>
  );
}
