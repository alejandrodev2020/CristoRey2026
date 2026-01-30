export interface Product {
    id: number | null;
    name: string;
    description: string;
    code: string;
    expired: Date;
    purcharsePrice:  string | null;
    salePrice:  string | null;
    categoryId:  number | null;
  }
