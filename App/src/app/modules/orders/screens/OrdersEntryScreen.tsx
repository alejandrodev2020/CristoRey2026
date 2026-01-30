// import { useEffect } from 'react';
// import { View } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export default function OrdersEntryScreen() {
//   const navigation = useNavigation<any>();

//   useEffect(() => {
//     const resolveFlow = async () => {
//       const configString = await AsyncStorage.getItem('configuration');
//       const roleString = await AsyncStorage.getItem('role');
//       const userString = await AsyncStorage.getItem('userLogged');

//       if (!configString || !roleString || !userString) return;

//       const config = JSON.parse(configString);
//       const role = JSON.parse(roleString);
//       const user = JSON.parse(userString);

//       // ================================
//       // 🟢 PLAN MULTI-SUCURSAL
//       // ================================
//       if (config.planId >= 5) {

//         // 🔐 NO administrador
//         if (role.id > 1) {
//           navigation.replace('SelectClientOrdersStore', {
//             warehouseId: user.warehouseId,
//           });
//           return;
//         }

//         // 👑 Administrador
//         navigation.replace('OrderStore');
//         return;
//       }

//       // ================================
//       // 🟡 PLAN UNA SOLA SUCURSAL
//       // ================================
//       navigation.replace('SelectClientOrdersStore', {
//         warehouseId: config.warehouseId,
//       });
//     };

//     resolveFlow();
//   }, []);

//   return <View />;
// }

import { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { warehouseService } from '../../warehouse/services/WarehouseService';
import { getSelectedWarehouse, saveSelectedWarehouse } from '../context/saveSelectedWarehouseStorage';
import { getWarehouseListFromStorage } from '../functions/pages/cacheWarehouseStorage';

export default function OrdersEntryScreen({ route }: any) {
  const navigation = useNavigation<any>();
  const force = route?.params?.force === true;
useEffect(() => {
  const resolveFlow = async () => {
    try {
      console.log('ENTRA');

      // ✅ 0️⃣ VALIDACIÓN CLAVE
      if (!force) {
        const alreadySelectedWarehouse = await getSelectedWarehouse();
        if (alreadySelectedWarehouse) {
          navigation.replace('OrdersList');
          return;
        }
      }

      const configString = await AsyncStorage.getItem('configuration');
      const roleString = await AsyncStorage.getItem('role');
      const userString = await AsyncStorage.getItem('userLogged');

      if (!configString || !roleString || !userString) return;

      const config = JSON.parse(configString);
      const role = JSON.parse(roleString);
      const user = JSON.parse(userString);

      // ============================
      // 1️⃣ Obtener listado warehouse
      // ============================
      let warehouses = await getWarehouseListFromStorage();

      if (!warehouses || warehouses.length === 0) {
        const response = await warehouseService.getListWarehouse('?Limit=100&Page=0');
        warehouses = (response || []).filter((w: any) => w.isActive);

        if (warehouses.length === 0) return;

        await AsyncStorage.setItem('warehouse_list', JSON.stringify(warehouses));
      }

      // ============================
      // 2️⃣ Resolver warehouse
      // ============================
      let selectedWarehouse = null;

      if (config.planId >= 5) {
        if (role.id > 1) {
          selectedWarehouse =
            warehouses.find(w => w.id === user.warehouseId) ?? null;
        }
      } else {
        selectedWarehouse =
          warehouses.find(w => w.id === config.warehouseId) ?? null;
      }

      if (!selectedWarehouse) {
        selectedWarehouse = warehouses[0];
      }

      // ============================
      // 3️⃣ Guardar y navegar
      // ============================
      await saveSelectedWarehouse(selectedWarehouse);

      navigation.replace('SelectClientOrdersStore', {
        warehouseId: selectedWarehouse.id,
      });

    } catch (error) {
      console.error('Error resolviendo flujo de pedidos:', error);
    }
  };

  resolveFlow();
}, []);

  return <View />;
}
