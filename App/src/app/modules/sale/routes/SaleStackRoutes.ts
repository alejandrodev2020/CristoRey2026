export type SaleStackParamList = {
  // SaleEntry: undefined;
  SaleEntry: {
    entry?: 'STORE' | 'LIST' | 'IA';
    force?: boolean;
  };
  SaleHome: undefined;
  // SaleStore: undefined;
  SaleList: undefined;
  SaleStoreMain: undefined;
  SaleIAStore: undefined;
  // SaleStoreIA: undefined;
  SaleStoreIA: { warehouseId: number };
  SaleDetail: { saleId: number };
  Scanner: undefined;
  SelectClientSaleStore: { warehouseId: number  };
  SaleStoreProduct: { warehouseId: number; clientId: number };
  PreviewListProductSelect: undefined;
};