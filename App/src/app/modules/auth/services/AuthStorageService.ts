import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorageService {
  async setSession(data: any): Promise<void> {
    await AsyncStorage.setItem('token', data.token);

    await AsyncStorage.setItem('userLogged', JSON.stringify({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      avatar: data.avatar,
      warehouseId : data.warehouseId
    }));

    await AsyncStorage.setItem('role', JSON.stringify(data.authRole));
    await AsyncStorage.setItem('configuration', JSON.stringify(data.configuration));
    await AsyncStorage.setItem('company', JSON.stringify(data.company));
    await AsyncStorage.setItem('userConfiguration', JSON.stringify(data.authUserConfiguration));
    await AsyncStorage.setItem('viewAlert', 'false');
  }

  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem('token');
  }

  async getUser(): Promise<any> {
    const user = await AsyncStorage.getItem('userLogged');
    return user ? JSON.parse(user) : null;
  }

  async getRole(): Promise<any> {
    const role = await AsyncStorage.getItem('role');
    return role ? JSON.parse(role) : null;
  }

  async getConfiguration(): Promise<any> {
    const config = await AsyncStorage.getItem('configuration');
    return config ? JSON.parse(config) : null;
  }

  async getCompany(): Promise<any> {
    const config = await AsyncStorage.getItem('company');
    return config ? JSON.parse(config) : null;
  }

  async getUserConfiguration(): Promise<any> {
    const config = await AsyncStorage.getItem('userConfiguration');
    return config ? JSON.parse(config) : null;
  }

  async clear(): Promise<void> {
    // await AsyncStorage.clear();
      await AsyncStorage.removeItem('listWarehouse');
      await AsyncStorage.removeItem('warehouse_list');
      await AsyncStorage.removeItem('selectedWarehouse');

      await AsyncStorage.removeItem('role');
      await AsyncStorage.removeItem('configuration');
      await AsyncStorage.removeItem('userConfiguration');
      await AsyncStorage.removeItem('userLogged');

      await AsyncStorage.removeItem('viewAlert');
  }
}

// Exporta una instancia para uso global
const authStorageService = new AuthStorageService();
export default authStorageService;