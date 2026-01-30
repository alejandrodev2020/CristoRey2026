import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getStatusVinculation(): Promise<{ estado: 'vinculado' | 'sin_vincular' }> {
  const valor = await AsyncStorage.getItem('vinculado'); // aquí cambia vinculation por vinculado
  return {
    estado: valor === 'true' ? 'vinculado' : 'sin_vincular', // si guardas 'true', compara con 'true'
  };
}

const VINCULATION_KEY = 'vinculation';

export const VinculationStorageService = {
  async setVinculationUrl(url: string) {
    await AsyncStorage.setItem(VINCULATION_KEY, JSON.stringify({ estado: 'vinculado', url }));
  },

  async getVinculationStatus(): Promise<{ estado: string; url: string } | null> {
    const data = await AsyncStorage.getItem(VINCULATION_KEY);
    return data ? JSON.parse(data) : null;
  },

  async clearVinculation() {
    await AsyncStorage.removeItem(VINCULATION_KEY);
  },
};