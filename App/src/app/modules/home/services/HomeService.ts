// import axios from 'axios';
// import { Client } from '../models/Client';
// import AuthStorageService from 'app/modules/auth/services/AuthStorageService';

const BASE_URI = 'https://tu-api.com/'; // reemplaza con tu base real

export default class HomeService {
//   private authStorage: AuthStorageService;

//   constructor(authStorage: AuthStorageService) {
//     this.authStorage = authStorage;
//   }

//   private async getHttpOptions() {
//     const token = await this.authStorage.getToken();
//     return {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     };
//   }

//   async getAllClient(queryString: string = '') {
//     const options = await this.getHttpOptions();
//     return axios.get(`${BASE_URI}api/client/list${queryString}`, options);
//   }

//   async store(data: Client) {
//     const options = await this.getHttpOptions();
//     if (data?.id) {
//       return axios.put(`${BASE_URI}api/client/${data.id}`, data, options);
//     } else {
//       return axios.post(`${BASE_URI}api/client`, data, options);
//     }
//   }

//   async getById(id: number) {
//     const options = await this.getHttpOptions();
//     return axios.get<Client>(`${BASE_URI}api/client/${id}`, options);
//   }

//   async lowById(id: number) {
//     const options = await this.getHttpOptions();
//     return axios.put(`${BASE_URI}api/client/${id}/low`, {}, options);
//   }

//   async getListZone() {
//     const options = await this.getHttpOptions();
//     return axios.get(`${BASE_URI}api/client/zone/list`, options);
//   }
}
