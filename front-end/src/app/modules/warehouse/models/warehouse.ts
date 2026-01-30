export interface Warehouse {
    id: number | null;
    name : string;
    description : string;
    code : string;
    location : string;    
    countProduct?: number;
    warehouseTypeId: number;
    isActive: boolean;
    type: WarehouseType;
  }
  
  export interface WarehouseType {
    id: number | null;
    name : string;
    description : string;
    isActive: boolean;
  }
  