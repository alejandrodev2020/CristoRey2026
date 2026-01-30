import { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { warehouseService } from '../../warehouse/services/WarehouseService';
import {
  getSelectedWarehouse,
  saveSelectedWarehouse,
} from '../context/saveSelectedWarehouseStorage';
import { getWarehouseListFromStorage } from '../functions/pages/cacheWarehouseStorage';

export default function SaleEntryScreen({ route }: any) {
  const navigation = useNavigation<any>();

  const entry = route?.params?.entry;
  const force = route?.params?.force === true;

  useEffect(() => {
    const resolveFlow = async () => {
      try {
        // =====================================================
        // 0️⃣ ATAJO POR ENTRY
        // =====================================================
        if (entry === 'LIST') {
          navigation.replace('SaleList');
          return;
        }

        // =====================================================
        // 1️⃣ Cargar contexto (NECESARIO PARA VALIDAR EL ROL)
        // =====================================================
        const configString = await AsyncStorage.getItem('configuration');
        const roleString = await AsyncStorage.getItem('role');
        const userString = await AsyncStorage.getItem('userLogged');

        if (!configString || !roleString || !userString) return;

        const config = JSON.parse(configString);
        const role = JSON.parse(roleString); // nRoleId o id
        const user = JSON.parse(userString);

        // =====================================================
        // 2️⃣ Validación rápida (Corregida)
        // =====================================================
        if (!force) {
          const alreadySelectedWarehouse = await getSelectedWarehouse();
          
          if (alreadySelectedWarehouse) {
            // 🚩 SI ES ADMIN Y PLAN MULTISUCURSAL, NO USAR EL ATAJO
            // Queremos que siempre tenga la opción de elegir o ver el selector
            const isAdminMultisite = config.planId >= 5 && role.id === 1;

            if (!isAdminMultisite) {
              navigation.replace('SelectClientSaleStore', {
                warehouseId: alreadySelectedWarehouse.id,
              });
              return;
            }
          }
        }

        // =====================================================
        // 3️⃣ Obtener warehouses
        // =====================================================
        let warehouses = await getWarehouseListFromStorage();

        if (!warehouses || warehouses.length === 0) {
          const response = await warehouseService.getListWarehouse('?Limit=100&Page=0');
          warehouses = (response || []).filter((w: any) => w.isActive);
          
          if (warehouses.length === 0) return;

          await AsyncStorage.setItem('warehouse_list', JSON.stringify(warehouses));
        }

        // =====================================================
        // 4️⃣ Resolver warehouse según Plan y Rol
        // =====================================================
        let selectedWarehouse = null;

        // 🔹 PLAN MULTI-SUCURSAL (>= 5)
        if (config.planId >= 5) {
          // 👑 Admin (id === 1) -> SIEMPRE al selector de sucursales
          if (role.id === 1) {
            navigation.replace('SaleStoreMain');
            return;
          }

          // 👤 Usuario normal -> warehouse fijo de su perfil
          selectedWarehouse = warehouses.find(w => w.id === user.warehouseId) ?? warehouses[0];
          await saveSelectedWarehouse(selectedWarehouse);
          navigation.replace('SelectClientSaleStore', { warehouseId: selectedWarehouse.id });
          return;
        }

        // 🔹 PLAN SIMPLE (< 5)
        selectedWarehouse = warehouses[0];
        await saveSelectedWarehouse(selectedWarehouse);
        navigation.replace('SelectClientSaleStore', { warehouseId: selectedWarehouse.id });

      } catch (error) {
        console.error('Error resolviendo flujo de ventas:', error);
      }
    };

    resolveFlow();
  }, [entry, force]); // Agregué force a las dependencias por seguridad

  return <View />;
}