import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ConfigurationStackParamList } from './ConfigurationStackRoutes';
import ConfigurationMainScreen from '../screens/ConfigurationMainScreen';
import RequestPermisionBluetooth from '../screens/RequestPermisionBluetooth';
import RequestPermissionCamera from '../screens/RequestPermisionCamera';
import RequestPermissionMicrophone from '../screens/RequestPermisionMicrophone';
import VinculationPrinterZebra from '../screens/VinculationPrinterZebra';
import { TouchableOpacity } from 'react-native';
import IconList from '../../../../assets/icons/tabler/svg/outline/align-justified.svg';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const Stack = createNativeStackNavigator<ConfigurationStackParamList>();

export default function ConfigurationStackNavigator() {
  const navigation = useNavigation(); // 👈 Necesario para abrir el drawer

  return (
    <Stack.Navigator initialRouteName="ConfigurationMain">
      <Stack.Screen
        name="ConfigurationMain"
        component={ConfigurationMainScreen}
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true, // Hace el header transparente (incluye eliminar fondo y sombra)
          headerShadowVisible: false, // Elimina la sombra (en versiones recientes de react-navigation)
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{marginLeft: 15}}>
              <IconList color="#ffffffff" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="RequestPermisionBluetooth"
        component={RequestPermisionBluetooth}
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true, // Hace el header transparente (incluye eliminar fondo y sombra)
          headerShadowVisible: false, // Elimina la sombra (en versiones recientes de react-navigation)
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{marginLeft: 15}}>
              <IconList color="#ffffffff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="RequestPermisionCamera"
        component={RequestPermissionCamera}
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true, // Hace el header transparente (incluye eliminar fondo y sombra)
          headerShadowVisible: false, // Elimina la sombra (en versiones recientes de react-navigation)
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{marginLeft: 15}}>
              <IconList color="#ffffffff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="RequestPermissionMicrophone"
        component={RequestPermissionMicrophone}
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true, // Hace el header transparente (incluye eliminar fondo y sombra)
          headerShadowVisible: false, // Elimina la sombra (en versiones recientes de react-navigation)
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{marginLeft: 15}}>
              <IconList color="#ffffffff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="VinculationPrinterZebra"
        component={VinculationPrinterZebra}
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true, // Hace el header transparente (incluye eliminar fondo y sombra)
          headerShadowVisible: false, // Elimina la sombra (en versiones recientes de react-navigation)
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{marginLeft: 15}}>
              <IconList color="#ffffffff" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}
