import { DateTime } from "luxon";

export interface shoppingProductDetail {
    Id?: number | null;
    productId: number | null;
    amount: number | null;
    priceShopping: number | null;
    discount: number | null;
    unitMeasurementId : number | null;
    subTotal:  number | null;
    expirationDate?: DateTime|null;
  }
