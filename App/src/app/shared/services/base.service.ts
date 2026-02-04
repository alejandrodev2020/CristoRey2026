import { AxiosRequestConfig } from 'axios';
import authStorageService from '../../modules/auth/services/AuthStorageService';
import { api } from './api';

export class BaseService {

  protected async getHttpOptions(): Promise<AxiosRequestConfig> {
    const token = await authStorageService.getToken();
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
    };
  }

  protected async getHttpOptionsDocument(
    responseType: 'json' | 'blob' = 'json',
  ): Promise<AxiosRequestConfig> {
    const token = await authStorageService.getToken();
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
      },
      responseType,
    };
  }

  // ✅ GET
  async get<T>(url: string): Promise<T> {
    const options = await this.getHttpOptions();
    const response = await api.get<T>(url, options);
    return response.data;
  }

  // ✅ POST
  async post<T>(url: string, data: any): Promise<T> {
    const options = await this.getHttpOptions();
    const response = await api.post<T>(url, data, options);
    return response.data;
  }

  // ✅ PUT
  async put<T>(url: string, data: any): Promise<T> {
    const options = await this.getHttpOptions();
    const response = await api.put<T>(url, data, options);
    return response.data;
  }
}
