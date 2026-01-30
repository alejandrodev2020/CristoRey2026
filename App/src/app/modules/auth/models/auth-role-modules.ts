import { RoleId } from './roles';
import { AppModuleKey } from './modules';

export const AUTH_ROLE_MODULES: Record<RoleId, AppModuleKey[]> = {
  1: [ // Administrador
    'HOME',
    'SALE_LIST',
    'SALE_STORE',
    'SALE_STORE_IA',
    'CLIENT',
    'CONFIGURATION',
    'LOGOUT',
  ],

  2: [ // Cajero
    'HOME',
    'SALE_LIST',
    'SALE_STORE',
    'SALE_STORE_IA',
    'CLIENT',
    'LOGOUT',
  ],

  3: [ // Vendedor
    'HOME',
    'SALE_STORE',
    'CLIENT',
    'LOGOUT',
  ],

  4: [ // Colaborador
    'HOME',
    'SALE_LIST',
    'LOGOUT',
  ],

  5: [ // Impulsador
    'HOME',
    'ORDERS_STORE',
    'ORDERS_LIST',
    'CLIENT',
    'LOGOUT',
  ],

  6: [ // Repartidor
    'HOME',
    'SALE_LIST',
    'LOGOUT',
  ],
};