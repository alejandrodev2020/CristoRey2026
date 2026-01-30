export interface Product {
    id?: number | null;
    optionId?: number | null;
    picture?: string | null;
    name?: string;
    description?: string;
    amount?: number | null;
    avaliable?: number | null;
    code?: string | null;
    purcharsePrice?:  string | null;
    salePrice?:  string | null;
    suggestedPrice?:  string | null;
    suggestedPricePurcharse?:  string | null;
    suggestedPriceSale?:  string | null;
    suggestedPriceShopping?:  string | null;
    categoryId?:  number | null;
    productCategoryId?:number|null;
    check?:  boolean | null;
    requiredExpired ?:  boolean | null; 
    hasEquivalences?:  boolean | null;
    unitMeasurementId ?: number | null;
    unitMeasurement?: UnitMeasurement;
    unitMeasurementSelect? :UnitMeasurement;
    listUnitMeasurementEquivalences?: any[];
    category:category
  }

  export interface UnitMeasurement {
    id: number | null;
    name: string| null;
    description: string|null;
    isActive : boolean | null;
  }
  export interface category{
    id?: number | null;
    name?:  string | null;
    description?:  string | null;
  }