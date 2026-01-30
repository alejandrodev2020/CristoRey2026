import { BaseService } from '../../../shared/services/base.service';

export class ClientService extends BaseService {
  constructor() {
    super();
  }

  // Obtiene lista de ventas con paginación y límite
  async getListClients(queryString: string): Promise<any> {
    try {
      return await this.get(`api/client/list${queryString}`);
    } catch (error) {
      console.error('Error en getListSale:', error);
      throw error;
    }
  }

  async getClientById(id: number): Promise<any> {
    try {
      return await this.get(`api/client/${id}`);
    } catch (error) {
      console.error('Error en getClientById:', error);
      throw error;
    }
  }


  async CreateClient(data: any): Promise<any> {
    try {
      return await this.post(`api/client`,data);
    } catch (error) {
      console.error('Error en getListSale:', error);
      throw error;
    }
  }

  async UpdateClient(id: number, data: any): Promise<any> {
    try {
      return await this.post(`api/client/${id}`,data);
    } catch (error) {
      console.error('Error en Actualizar Cliente:', error);
      throw error;
    }
  }

 
}

export const clientService = new ClientService();
