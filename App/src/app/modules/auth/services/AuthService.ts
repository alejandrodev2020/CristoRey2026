import { BaseService } from "../../../shared/services/base.service";

export class AuthService extends BaseService {
  constructor() {
    super();
  }

  async login(data: any): Promise<{ user: string; id: string }> {
    return { user: 'admin', id: 'admin' };
  }

  async signIn(data: any): Promise<any> {
    try {
        const response = await this.post('api/auth/user/loggin', data);
        return response;
    } catch (error) {
        console.error('Error en signIn:', error);
        throw error;  // o maneja el error como prefieras
    }
  }


  async getUserTableConfiguration(queryString: string): Promise<any> {
    return this.get(`/api/auth/configuration/table${queryString}`);
  }

  async saveTableConfiguration(data: any): Promise<any> {
    return this.post('/api/auth/configuration/table', data);
  }

  async getListRoles(): Promise<any> {
    return this.get('/api/auth/role/list');
  }

  async getListModules(): Promise<any> {
    return this.get('/api/auth/module/list');
  }

  async setModuleToRole(id: number, data: any): Promise<any> {
    return this.put(`/api/auth/roles/${id}/modules`, data);
  }

  async deleteModuleByRoleId(roleId: number, moduleId: number): Promise<any> {
    return this.put(`/api/auth/role/${roleId}/module/${moduleId}`, {});
  }
}

export const authService = new AuthService();
