import AsyncStorage from '@react-native-async-storage/async-storage';
import { Warehouse } from '../../../warehouse/models/warehouse';


const STORAGE_KEY = 'listWarehouse';

export const saveWarehouseListToStorage = async (warehouses: Warehouse[]) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(warehouses));
  } catch (error) {
    console.error('Error guardando almacenes en almacenamiento local:', error);
  }
};

export const getWarehouseListFromStorage = async (): Promise<Warehouse[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error leyendo almacenes del almacenamiento local:', error);
    return [];
  }
};

export const clearWarehouseListFromStorage = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error eliminando almacenes del almacenamiento local:', error);
  }
};
