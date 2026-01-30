export const ROLE_ID = {
  ADMIN: 1,
  CAJERO: 2,
  COLABORADOR: 3,
  DISTRIBUIDOR: 4,
};

export const drawerPermissions: Record<number, string[]> = {
  [ROLE_ID.ADMIN]: [
    'Home',
    'SaleStore',
    'SaleList',
    'Client',
    'ConfigurationMain',
    'Logout',
  ],

  [ROLE_ID.CAJERO]: [
    'SaleStore',
    'SaleList',
    'Client',
    'ConfigurationMain',
    'Logout',
  ],

  [ROLE_ID.COLABORADOR]: [
    'SaleStore',
    'SaleList',
    'Client',
    'ConfigurationMain',
    'Logout',
  ],

  [ROLE_ID.DISTRIBUIDOR]: [
    'Client',
    'OrderRequest',
    'ConfigurationMain',
    'Logout',
  ],
};
