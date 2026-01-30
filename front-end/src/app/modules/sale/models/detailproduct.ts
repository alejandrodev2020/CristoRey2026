export interface DetailProduct {
    id: number | null;
    count: number | null;
    discount: number | null;
    price: number | null;
    productId: number | null;
    subTotal:  number | null;
    avaliable: number | null;
    suggestedPriceShopping: number | null;
    suggestedPriceSale: number | null;
    picture?: string | null;
    hasEquivalences?: boolean | null;
    name?: string | null;
    description?: string | null;
    unitMeasurementSelect : any;
    expirationDate? : Date | null;
  }
