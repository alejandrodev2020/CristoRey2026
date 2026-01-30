import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import IconList from '../../../../assets/icons/tabler/svg/outline/align-justified.svg';

// import SaleStoreProductScreen from '../screens/SaleStoreProduct';
// import { PreviewListProductSelect } from '../screens/PreviewListProductSelect';

import OrdersEntryScreen from '../screens/OrdersEntryScreen';
import OrdersStoreScreen from '../screens/OrdersStoreScreen';
import SelectClientSaleStoreScreen from '../screens/SelectClientStore';
import { OrdersStackParamList } from './OrdersStackRoutes';
import SelectClientOrdersStoreScreen from '../screens/SelectClientStore';
import OrdersStoreProductScreen from '../screens/OrdersStoreProduct';
import { PreviewListProductSelect } from '../screens/PreviewListProductSelect';
import OverviewOrdersByIdScreen from '../screens/OverviewOrdersByIdScreen';
import OrdersListScreen from '../screens/OrdersListScreen';


const Stack = createNativeStackNavigator<OrdersStackParamList>();

export default function SaleStackNavigator() {
  const navigation =
    useNavigation<NativeStackNavigationProp<OrdersStackParamList>>();

  return (
    <Stack.Navigator initialRouteName="OrdersEntry">
      {/* ============================================================
          🚦 ENTRADA / RESOLUTOR DINÁMICO
      ============================================================ */}
      <Stack.Screen
        name="OrdersEntry"
        component={OrdersEntryScreen}
        options={{ headerShown: false }}
      />

      {/* ============================================================
          🏬 VENTA (HEADER COMO ANTES)
      ============================================================ */}
      <Stack.Screen
        name="OrdersStore"
        component={OrdersStoreScreen}
        options={{
          headerShown: false,
          headerTransparent: true,
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{ marginLeft: 15 }}>
              <IconList color="#ffffffff" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="OrdersList"
        component={OrdersListScreen}
        options={{ headerShown: false }}
      />

      {/* ============================================================
          👤 SELECCIONAR CLIENTE
      ============================================================ */}
      <Stack.Screen
        name="SelectClientOrdersStore"
        component={SelectClientOrdersStoreScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* ============================================================
          📦 SELECCIONAR PRODUCTO
      ============================================================ */}
      <Stack.Screen
        name="OrdersStoreProduct"
        component={OrdersStoreProductScreen}
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true,
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{ marginLeft: 0 }}>
              <IconList color="#ffffffff" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="PreviewListProductSelect"
        component={PreviewListProductSelect}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="OverviewOrdersById"
        component={OverviewOrdersByIdScreen}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}