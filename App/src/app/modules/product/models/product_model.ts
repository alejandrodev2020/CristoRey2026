import { Category, UnitMeasurement } from "./category_model";

export interface Product {
  id: number;
  name: string;
  description: string;
  descriptionSmall: string;
  code: string;
  barcode: string | null;
  originalCode: string;
  supplierProviderId: number | null;
  discountOne: number | null;
  discountTwo: number | null;
  discountThree: number | null;
  creationDate: string | null;
  maxApplicableDiscount: number | null;
  location: string | null;
  weight: number | null;
  thread: string | null;
  minimumPackaging: number;
  manufacturer: string | null;
  requiredExpired: boolean;
  suggestedPriceShopping: number;
  suggestedPriceSale: number;
  suggestedPriceSaleOne: number | null;
  suggestedPriceSaleTwo: number | null;
  suggestedPriceSaleThree: number | null;
  suggestedPriceSaleFour: number | null;
  unitMeasurementId: number;
  productCategoryId: number | null;
  picture: string | null;
  hasEquivalences: boolean;
  isBundle: boolean;
  onlyUnitMeasurement: boolean | null;
  category: Category;
  unitMeasurement: UnitMeasurement | null;
  listProductRate: ProductRate[];
}

export interface ProductRate {
  id: number;
  productId: number;
  rateId: number;
  margin: number | null;
  price: number;
  percentage: number | null;
  isActive: boolean | null;
  rate: any | null; 
}