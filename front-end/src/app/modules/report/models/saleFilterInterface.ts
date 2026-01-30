export interface SaleFilterInterface {
    clientId?: number | null;
    dateType?: number | null;
    typeId?: number | null;
    warehouseId?: number | null;
    warehouseName?: string | null;
    name?: string | null;
    myControl?: string | null;
    dateInit: Date | null;
    dateEnd: Date | null;
}