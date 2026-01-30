export interface PettyCash {
    id: number | null;
    pettyCashInit :Date | null;
    pettyCashEnd :Date | null;
    amountInit : number | null;
    amountEnd : number | null;
    amountSale : number | null;
    amountCreditPaid : number | null;
    amountCreditCredit : number | null;
    amountMissingMoney : number | null;
    amountSpareMoney :number | null;
    note : string;
    userIdSeller : number | null;
    userAdminId : number | null;
    warehouseId : number | null;
    isActive : boolean ;
  }
