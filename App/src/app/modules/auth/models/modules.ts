export type AppModuleKey =
  | 'HOME'
  | 'SALE_STORE'
  | 'SALE_STORE_IA'
  | 'SALE_LIST'
  | 'ORDERS_STORE'
  | 'ORDERS_LIST'
  | 'CLIENT'
  | 'CONFIGURATION'
  | 'LOGOUT';

export type AppModuleParent = 'ROOT' | 'SALE' | 'ORDERS';

export type AppModuleEntry = 'STORE' | 'LIST' | 'IA';

export interface AppModule {
  key: AppModuleKey;
  routeName: string;
  title: string;
  parent: AppModuleParent;
  entry?: AppModuleEntry;
}

export const MODULES: AppModule[] = [
  {
    key: 'HOME',
    routeName: 'Home',
    title: 'Inicio',
    parent: 'ROOT',
  },
  {
    key: 'SALE_STORE',
    routeName: 'Sale',
    title: 'Vender',
    parent: 'SALE',
    entry: 'STORE',
  },
  {
    key: 'SALE_STORE_IA',
    routeName: 'Sale', // Apunta a la ruta principal del flujo de ventas
    title: 'Vender con IA',
    parent: 'SALE',
    entry: 'IA', // Definido en tu AppModuleEntry
  },
  {
    key: 'SALE_LIST',
    routeName: 'Sale',
    title: 'Listado de Ventas',
    parent: 'SALE',
    entry: 'LIST',
  },
  {
    key: 'ORDERS_STORE',
    routeName: 'Orders',
    title: 'Levantar Pedido',
    parent: 'ORDERS',
    entry: 'STORE',
  },
  {
    key: 'ORDERS_LIST',
    routeName: 'Orders',
    title: 'Listado de Pedidos',
    parent: 'ORDERS',
    entry: 'LIST',
  },
  {
    key: 'CLIENT',
    routeName: 'Client',
    title: 'Clientes',
    parent: 'ROOT',
  },
  {
    key: 'CONFIGURATION',
    routeName: 'ConfigurationMain',
    title: 'Configuración',
    parent: 'ROOT',
  },
  {
    key: 'LOGOUT',
    routeName: 'Logout',
    title: 'Salir',
    parent: 'ROOT',
  },
];