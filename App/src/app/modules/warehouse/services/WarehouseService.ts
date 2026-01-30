import { BaseService } from '../../../shared/services/base.service';

export class WarehouseService extends BaseService {
  constructor() {
    super();
  }

  // Obtiene lista de ventas con paginación y límite
  async getListWarehouse(queryString: string): Promise<any> {
    try {
      return await this.get(`api/warehouse/list${queryString}`);
    } catch (error) {
      console.error('Error en getListSale:', error);
      throw error;
    }
  }

  async getListProductWarehouseById(id : number, queryString: string): Promise<any> {
    try {
      return await this.get(`api/warehouse/${id}/product${queryString}`);
    } catch (error) {
      console.error('Error en getListSale:', error);
      throw error;
    }
  }

  async getListProductWarehouseByCode(id : number, code: string): Promise<any> {
    try {
      return await this.get(`api/warehouse/${id}/product/${code}`);
    } catch (error) {
      console.error('Error en getListSale:', error);
      throw error;
    }
  }

  async getListCategory(queryString: string): Promise<any> {
    try {
      return await this.get(`api/classifier/product-category/list${queryString}`);
    } catch (error) {
      console.error('Error en getListSale:', error);
      throw error;
    }
  }
 
}

export const warehouseService = new WarehouseService();
