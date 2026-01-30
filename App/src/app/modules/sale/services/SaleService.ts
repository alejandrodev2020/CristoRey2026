import { BaseService } from '../../../shared/services/base.service';

export class SaleService extends BaseService {
  constructor() {
    super();
  }

  // Obtiene lista de ventas con paginación y límite
  async getListSale(queryString: string): Promise<any> {
    try {
      return await this.get(`api/sale/list${queryString}`);
    } catch (error) {
      console.error('Error en getListSale:', error);
      throw error;
    }
  }

  async getSaleById(id:number): Promise<any> {
    try {
      return await this.get(`api/sale/${id}`);
    } catch (error) {
      console.error('Error en getSaleById:', error);
      throw error;
    }
  }

  // Obtiene lista de ventas para asistente
  async getListSaleAssistant(queryString: string): Promise<any> {
    try {
      return await this.get(`/api/sale/list/assistant${queryString}`);
    } catch (error) {
      console.error('Error en getListSaleAssistant:', error);
      throw error;
    }
  }

  // Crea o actualiza una venta
  async store(data: any): Promise<any> {
    try {
        return await this.post('api/sale', data);
    } catch (error) {
      console.error('Error en store:', error);
      throw error;
    }
  }

  async storeQuotation(data: any): Promise<any> {
    try {
        return await this.post('api/quotation', data);
    } catch (error) {
      console.error('Error en store:', error);
      throw error;
    }
  }

  // Guarda una cotización de venta
  async saveQuotation(data: any): Promise<any> {
    try {
      return await this.post('/api/sale/quotation', data);
    } catch (error) {
      console.error('Error en saveQuotation:', error);
      throw error;
    }
  }

  // Guarda una cotización relacionada con venta
  async saveQuotationSale(data: any): Promise<any> {
    try {
      return await this.post('/api/quotation/sale', data);
    } catch (error) {
      console.error('Error en saveQuotationSale:', error);
      throw error;
    }
  }

  async getLastDaySale(): Promise<any> {
    try {
      return await this.get(`api/sale/last-day`);
    } catch (error) {
      console.error('Error en getListSaleAssistant:', error);
      throw error;
    }
  }


  async GetSaleById(id: number): Promise<any> {
    try {
      return await this.get(`api/sale/${id}`);
    } catch (error) {
      console.error('Error en getListSaleAssistant:', error);
      throw error;
    }
  }
  
}

export const saleService = new SaleService();
