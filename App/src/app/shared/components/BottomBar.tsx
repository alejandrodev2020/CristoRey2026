import React, { useRef, useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Animated, Easing, StyleSheet } from 'react-native';
import HomeIcon from '../../../assets/icons/tabler/svg/filled/home.svg';
import Shopping from '../../../assets/icons/tabler/svg/filled/shopping-cart.svg';
import ListIcon from '../../../assets/icons/tabler/svg/filled/layout-list.svg';

import {
  CommonActions,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';

import { clearCart } from '../../modules/sale/hooks/reducer/cartReducer';
import { removeItemByKey as removeSelectedByKey } from '../../modules/sale/context/saveSelectedClientStorage';
// import { styles } from './BottomBarStyle';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ROUTES_DEFAULT = [
  { path: 'Home', icon: HomeIcon, label: 'Inicio' },
  { path: 'SaleStore', icon: Shopping, label: 'Vender', entry: 'STORE' },
  { path: 'SaleList', icon: ListIcon, label: 'Ventas', entry: 'LIST' },
];

const ROUTES_REPARTIDOR = [
  { path: 'Home', icon: HomeIcon, label: 'Inicio' },
  { path: 'OrdersStore', icon: Shopping, label: 'Pedidos', entry: 'STORE' },
  { path: 'OrdersList', icon: ListIcon, label: 'Mis pedidos', entry: 'LIST' },
];

// 🔹 Resolver ruta activa REAL (incluye stacks)
const getActiveRouteName = (state: any): string => {
  const route = state.routes[state.index];
  if (route.state) return getActiveRouteName(route.state);
  return route.name;
};

export default function BottomBar() {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch();

  const currentRouteName = useNavigationState(state =>
    getActiveRouteName(state),
  );

  const [routes, setRoutes] = useState<any[]>(ROUTES_DEFAULT);

  useEffect(() => {
    const loadRole = async () => {
      const roleRaw = await AsyncStorage.getItem('role');
      if (!roleRaw) return;
      const role = JSON.parse(roleRaw);
      setRoutes(role?.id === 5 ? ROUTES_REPARTIDOR : ROUTES_DEFAULT);
    };
    loadRole();
  }, []);

  const handleNavigate = async (route: any) => {
    try {
      const { path, entry } = route;

      // 🔴 limpiar contexto al entrar a venta / pedidos
      if (path === 'SaleStore' || path === 'OrdersStore') {
        dispatch(clearCart());
        await removeSelectedByKey('selectedClient');
        await removeSelectedByKey('selectedWarehouse');
      }

      navigation.dispatch(
        CommonActions.navigate({
          name: path,
          params: entry ? { entry, force: true } : undefined,
        }),
      );
    } catch (error) {
      console.error('Error al navegar:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {routes.map(({ path, icon: Icon, label, entry }: any) => {
          const isFocused = currentRouteName === path;

          const animation = useRef(
            new Animated.Value(isFocused ? 1 : 0),
          ).current;

          useEffect(() => {
            Animated.timing(animation, {
              toValue: isFocused ? 1 : 0,
              duration: 300,
              easing: Easing.out(Easing.exp),
              useNativeDriver: false,
            }).start();
          }, [isFocused]);

          const backgroundColor = animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['transparent', '#a0bfbeff'],
          });

          const paddingHorizontal = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [10, 16],
          });

          const iconColor = isFocused ? '#fff' : '#cdcdcdff';

          return (
            <AnimatedTouchable
              key={path}
              onPress={() => !isFocused && handleNavigate({ path, entry })}
              style={[styles.button, { backgroundColor, paddingHorizontal }]}
            >
              <Icon width={20} height={20} fill={iconColor} />
              {isFocused && <Text style={styles.label}>{label}</Text>}
            </AnimatedTouchable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 6,
    right: 6,
    borderRadius: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  bar: {
    backgroundColor: '#00317aff',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 32,
    paddingVertical: 10,
    paddingHorizontal: 34,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 24,
    minHeight: 40,
    maxHeight: 40,
  },
  label: {
    marginLeft: 6,
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});
