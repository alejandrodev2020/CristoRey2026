import AsyncStorage from '@react-native-async-storage/async-storage';
import { Client } from '../../clients/models/client_model';
import { Rate } from '../../product/models/rate_model';

export const saveListRates = async (listRates: Rate[]) => {
  try {
    await AsyncStorage.setItem('listRates', JSON.stringify(listRates));
  } catch (error) {
    console.error('Error guardar listado de Rates:', error);
  }
};

export const getListRates = async (): Promise<Rate[] | null> => {
  try {
    const json = await AsyncStorage.getItem('listRates');
    return json ? JSON.parse(json) : null;
  } catch (error) {
    console.error('Error obteniendo listado de Rates:', error);
    return null;
  }
};
