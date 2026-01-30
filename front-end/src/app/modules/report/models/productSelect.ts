import { Product } from "app/modules/product/models/product";

export interface ProductSelect {
    ProductWarehouseId: number | null;
    valiable: number | null;
    count : number | null;
    price : number | null;
    suggestedPrice : number | null;
    amount : string;
    discount: string;
    subTotal: number;
    product: Product;
  }
