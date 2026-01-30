// Definir la interfaz PettyCash
export interface PettyCash {
    id: number;
    pettyCashInit: string;
    pettyCashEnd: string;
    amountInit: number;
    amountInitMain: number;
    amountInitCash: number;
    amountInitQr: number | null;
    amountInitCard: number | null;
    amountEnd: number;
    amountSale: number;
    amountCreditPaid: number;
    amountCreditCredit: number;
    amountMissingMoney: number;
    amountSpareMoney: number;
    cashAmount: number;
    cashAmountMain: number;
    cashAmountCash: number;
    cashAmountQr: number | null;
    cashAmountCard: number | null;
    note: string | null;
    userIdSeller: number;
    userAdminId: number;
    warehouseId: number;
    pettyCashStatusId: number | null;
    amountSales: number;
    amountSalesReject: number | null;
    amountCharges: number;
    amountCreditSales: number;
    isActive: boolean;
    userSeller: any | null;
    warehouse: any | null;
    status: any | null;
    userAdmin: any | null;
  }
  
  // Definir la interfaz Distributor
  export interface Distributor {
    id: number;
    firstName: string;
    lastName: string;
    phone: string | null;
    ci: string | null;
    avatar: string | null;
    userName: string | null;
    userKey: string | null;
    isAdmin: boolean;
    authUserId: number | null;
    token: string | null;
    isActive: boolean;
    authUserConfiguration: any | null;
    authRole: any | null;
    configuration: any | null;
  }
  
  // Definir la interfaz principal que contendrá toda la estructura
  export interface Distribution {
    id: number;
    createDateDistribution: string;
    authUserIdCreation: number;
    userDistribuidorId: number;
    startDate: string | null;
    endDate: string | null;
    closingUserId: number | null;
    description: string | null;
    isActive: boolean;
    pettyCashId: number;
    pettyCash: PettyCash;
    distributor: Distributor;
  }
  