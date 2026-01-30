// src/services/BaseService.ts
import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { environment } from '../../../environments/enviroments';
import authStorageService from '../../modules/auth/services/AuthStorageService';

export class BaseService {
  // Ya no necesitas mantener baseUri como propiedad de instancia
  // porque lo vamos a obtener dinámicamente

  protected async getBaseUri(): Promise<string> {
    const storedUrl = await AsyncStorage.getItem('baseUrl');
    if (storedUrl) {
      return storedUrl;
    }
    // Fallback a las URLs por entorno si no está vinculada
    return environment.production ? environment.apiUrlProd : environment.apiUrlLocal;
  }

  protected async getHttpOptions(): Promise<AxiosRequestConfig> {
    const token = await authStorageService.getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  protected async getHttpOptionsDocument(responseType: 'json' | 'blob' = 'json'): Promise<AxiosRequestConfig> {
    const token = await authStorageService.getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: responseType === 'blob' ? 'blob' : 'json',
    };
  }

  // Método GET
  async get<T>(url: string): Promise<T> {
    const options = await this.getHttpOptions();
    const baseUri = await this.getBaseUri();
    const response = await axios.get<T>(`${baseUri}${url}`, options);
    return response.data;
  }

  // Método POST
  async post<T>(url: string, data: any): Promise<T> {
    try {
      const options = await this.getHttpOptions();
      const baseUri = await this.getBaseUri();
      const response = await axios.post<T>(`${baseUri}${url}`, data, options);
      return response.data;
    } catch (error) {
      console.error('POST request error:', error);
      throw error;
    }
  }

  // Método PUT
  async put<T = any>(url: string, data: any): Promise<T> {
    const options = await this.getHttpOptions();
    const baseUri = await this.getBaseUri();
    const response = await axios.put<T>(`${baseUri}${url}`, data, options);
    return response.data;
  }
}
