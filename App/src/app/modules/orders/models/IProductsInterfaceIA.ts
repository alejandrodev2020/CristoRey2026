export interface IAResponse {
  status: number;
  type: number;
  messages: string[];
  threadId: string;
  data: IAData;
}

export interface IAData {
  actions: string;          // "SALE"
  actionTypeId: number;     // 1
  client: Client;
  details: Detail[];
}

export interface Client {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  nit: string | null;
  file: string | null;
  photo: string | null;
  clientZoneId: number | null;
  ubication: string | null;
  company: string | null;
  hasPhoto: boolean;
  clientRateId: number;
  clientTypeId: number;
  clientDiscountId: number;
  isActive: boolean;
  zone: string | null;
}

export interface Detail {
  id: number;
  name: string;
  code: string;
  unitMeasurementId: number;
  amountRequested: number;
  stock: number;
  purcharsePrice: number;
  suggestedPrice: number;
  listProductRate: ProductRate[];
}

export interface ProductRate {
  id: number;
  productId: number;
  rateId: number;
  margin: number;
  price: number | null;
  percentage: number | null;
  isActive: boolean;
  rate: Rate;
}

export interface Rate {
  id: number;
  code: string;             // "MIN", "MAY", etc.
  description: string;      // "Minorista"
  presetMargin: number;
  isActive: boolean;
}