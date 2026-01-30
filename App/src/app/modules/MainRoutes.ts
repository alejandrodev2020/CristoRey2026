// export type DrawerParamList = {
//   Home:undefined;
//   SaleList: undefined;
//   OrdersList: undefined;
//   Client: undefined;
//   BluetoothScreen: undefined;
  
//   SaleStore: undefined;
//   OrdersStore: undefined;
//   SaleStoreIA: undefined;
//   ConfigurationMain: undefined;

//   SelectClientSaleStore: { warehouseId: number };
//   SelectClientOrdersStore: { warehouseId: number };
  
//   SaleStoreProduct: { warehouseId: number; clientId: number };
//   OrdersStoreProduct: { warehouseId: number; clientId: number };

//   Login: undefined;
//   Logout: undefined;

// };
export type DrawerParamList = {
  Home: undefined;

  // 🔹 Ventas (un solo módulo, distintas entradas)
  SaleStore: { entry: 'STORE' };
  SaleStoreIA: { entry: 'IA' };
  SaleList: { entry: 'LIST' };

  // 🔹 Pedidos
  OrdersStore: { entry: 'STORE' };
  OrdersList: { entry: 'LIST' };

  // 🔹 Otros módulos
  Client: undefined;
  ConfigurationMain: undefined;
  Logout: undefined;

  

  // 🔹 Rutas internas de stacks (NO drawer real)
  SelectClientSaleStore: { warehouseId: number };
  SelectClientOrdersStore: { warehouseId: number };

  SaleStoreProduct: { warehouseId: number; clientId: number };
  OrdersStoreProduct: { warehouseId: number; clientId: number };

  Login: undefined;
};