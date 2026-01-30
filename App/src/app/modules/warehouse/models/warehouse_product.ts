import { UnitMeasurement } from "../../product/models/category_model";
import { Product } from "../../product/models/product_model";

export interface WarehouseProduct {
  id: number;
  warehouseId: number;
  amount: number;
  purcharsePrice: number;
  suggestedPrice: number;
  existing: number | null;
  isActive: boolean;
  warehouse: any | null; // puedes crear otra interface si necesitas más detalle
  product: Product;
  unitMeasurement: UnitMeasurement | null;
  equivalences: any | null; // puedes tipar esto si sabes su estructura
}