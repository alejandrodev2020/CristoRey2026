import AsyncStorage from '@react-native-async-storage/async-storage';
import { Warehouse } from '../../warehouse/models/warehouse';

export const saveSelectedWarehouse = async (warehouse: Warehouse) => {
  try {
    await AsyncStorage.setItem('selectedWarehouse', JSON.stringify(warehouse));
  } catch (error) {
    console.error('Error guardando almacén:', error);
  }
};

export const getSelectedWarehouse = async (): Promise<Warehouse | null> => {
  try {
    const json = await AsyncStorage.getItem('selectedWarehouse');
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error('Error obteniendo almacén:', error);
    return null;
  }
};