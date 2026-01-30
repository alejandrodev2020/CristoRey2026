import { BaseService } from '../../../shared/services/base.service';

export class ProductService extends BaseService {
  constructor() {
    super();
  }

  // Obtiene lista de ventas con paginación y límite
  async getListRates(queryString: string): Promise<any> {
    try {
      return await this.get(`api/rate/list${queryString}`);
    } catch (error) {
      console.error('Error en getListSale:', error);
      throw error;
    }
  }


  async getProductEquivalences(id: number): Promise<any> {
    try {
      return await this.get(`api/product/${id}/equivalence`);
    } catch (error) {
      console.error('Error en getEquivalence:', error);
      throw error;
    }
  }

  

}

export const productService = new ProductService();
