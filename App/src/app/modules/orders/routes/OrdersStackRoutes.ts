export type OrdersStackParamList = {
  OrdersEntry: undefined;
  OrdersStore: undefined;
  OrdersIAStore: undefined;
  OrdersList: undefined;
  Scanner: undefined;
  SelectClientOrdersStore: { warehouseId: number  };
  OverviewOrdersById: { orderId: number };
  OrdersStoreProduct: { warehouseId: number; clientId: number };
  PreviewListProductSelect: undefined;
};