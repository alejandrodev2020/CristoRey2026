import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TouchableOpacity} from 'react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import IconList from '../../../../assets/icons/tabler/svg/outline/align-justified.svg';

import SaleStoreScreen from '../screens/SaleStoreScreen';
import SelectClientSaleStoreScreen from '../screens/SelectClientStore';
import SaleStoreProductScreen from '../screens/SaleStoreProduct';
import SaleEntryScreen from '../screens/SaleEntryScreen';
import {PreviewListProductSelect} from '../screens/PreviewListProductSelect';

import {SaleStackParamList} from './SaleStackRoutes';
import SaleListScreen from '../screens/SaleListScreen';
import SaleStoreIAScreen from '../screens/SaleIAStoreScreen';
import SaleDetailScreen from '../screens/SaleDetailScreen';

const Stack = createNativeStackNavigator<SaleStackParamList>();

export default function SaleStackNavigator({route}: any) {
  const navigation =
    useNavigation<NativeStackNavigationProp<SaleStackParamList>>();

  const entry = route?.params?.entry;
  return (
    <Stack.Navigator
      initialRouteName="SaleEntry"
      screenOptions={{headerShown: false}}>
      {/* ============================================================
          🚦 ENTRADA / RESOLUTOR DINÁMICO
          Decide a dónde ir según `entry`
      ============================================================ */}
      <Stack.Screen
        name="SaleEntry"
        component={SaleEntryScreen}
        initialParams={{entry}}
      />

      {/* ============================================================
          🏬 VENTA
      ============================================================ */}
      <Stack.Screen
        name="SaleStoreMain"
        component={SaleStoreScreen}
        options={{
          headerShown: false,
          headerTransparent: true,
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
              style={{marginLeft: 15}}>
              <IconList color="#ffffffff" />
            </TouchableOpacity>
          ),
        }}
      />

      {/* ============================================================
          👤 SELECCIONAR CLIENTE
      ============================================================ */}
      <Stack.Screen
        name="SelectClientSaleStore"
        component={SelectClientSaleStoreScreen}
      />

      {/* ============================================================
          📦 SELECCIONAR PRODUCTO
      ============================================================ */}
      <Stack.Screen
        name="SaleStoreProduct"
        component={SaleStoreProductScreen}
        options={{
          headerShown: true,
          title: '',
          headerTransparent: true,
          headerShadowVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
              <IconList color="#ffffffff" />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen name="SaleList" component={SaleListScreen} />

      <Stack.Screen name="SaleStoreIA" component={SaleStoreIAScreen} />

      <Stack.Screen 
        name="SaleDetail" 
        component={SaleDetailScreen} 
        options={{ 
          headerShown: false, 
          title: 'Detalle de Venta' 
        }} 
      />

      <Stack.Screen
        name="PreviewListProductSelect"
        component={PreviewListProductSelect}
      />
    </Stack.Navigator>
  );
}
