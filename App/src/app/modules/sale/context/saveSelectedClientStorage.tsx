import AsyncStorage from '@react-native-async-storage/async-storage';
import { Client } from '../../clients/models/client_model';

export const saveSelectedClient = async (client: Client) => {
  try {
    await AsyncStorage.setItem('selectedClient', JSON.stringify(client));
  } catch (error) {
    console.error('Error guardando cliente:', error);
  }
};

export const getSelectedClient = async (): Promise<Client | null> => {
  try {
    const json = await AsyncStorage.getItem('selectedClient');
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error('Error obteniendo cliente:', error);
    return null;
  }
};

export const removeItemByKey = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error eliminando la clave "${key}":`, error);
  }
};