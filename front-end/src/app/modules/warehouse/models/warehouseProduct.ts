export interface WarehouseProduct {
    id : number | null;
    warehouseId : number | null;
    amount : number | null;
    amountOrigin?: number | null;
    avaliable : number | null;
    purcharsePrice : number | null;
    suggestedPrice : number | null;
    discount : number | null;
    isActive : boolean;
    check ?: boolean;
    product : Product;
    name : string;
    description : string;
    unitMeasurement : Classifier,
    unitMeasurementSelect:  UnitMeasurementSelect | null,
    listUnitMeasurementEquivalences : any[];
    productId : number | null;
    picture ?: string | null;
}

export interface UnitMeasurementSelect {
   id: number | null,
   check : boolean,
   isActive : boolean,
   productId : number  | null,
   suggestedPricePurchase : number,
   suggestedPriceSale : number,
   unitMeasurement : Classifier,
   unitMeasurementId : number, 
   warehouseProductId: number
}


export interface Product {
    id : number | null;
    name : string;
    description : string;
    code : string;
    suggestedPrice : number | null;
    picture ?: string | null;
    hasEquivalences?: boolean | null;
    unitMeasurement : Classifier
}

export interface Classifier {
  id : number | null;
  name : string;
  description : string;
}
