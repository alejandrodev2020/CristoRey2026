export interface ProductEquivalence {
  id: number;
  amount: number;
  factor: number;
  productId: number;
  suggestedPricePurchase: number;
  suggestedPriceSale: number;
  unitMeasurementChild: number;
  unitMeasurementChildData: UnitMeasurement;
  unitMeasurementDestination: UnitMeasurement;
  unitMeasurementDestinationId: number;
  unitMeasurementFather: number;
  unitMeasurementFatherData: UnitMeasurement;
  unitMeasurementMotive: UnitMeasurement;
  unitMeasurementMotiveId: number;
  unitMeasurementOrigin: UnitMeasurement;
  unitMeasurementOriginId: number;
  isActive: boolean;
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
