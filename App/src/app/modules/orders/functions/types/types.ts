// =======================
// SALE TYPES (FUENTE DE VERDAD)
// =======================

export type SaleType = 'CASH' | 'CREDIT';

export type SaleConfig = {
  discount: {
    type: 'PERCENT' | 'FIXED';
    value: number;
  };
  saleType: SaleType;

  amountTotal?: {
    amountMain: number;
    amountCash: number;
    amountQr: number;
    amountCard: number;
  };

  paymentDelivered?: {
    amountMain: number;
    amountCash: number;
    amountQr: number;
    amountCard: number;
  };
};

// =======================
// MODAL HANDLE
// =======================
export type SaleConfigModalHandle = {
  open: (initial: SaleConfig) => void;
  close: () => void;
};

// =======================
// UI → BACKEND MAPPER
// =======================
export const mapSaleTypeToId = (type: SaleType): 1 | 2 => {
  switch (type) {
    case 'CASH':
      return 1;
    case 'CREDIT':
      return 2;
  }
};
