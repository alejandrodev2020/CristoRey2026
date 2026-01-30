export enum ClientDiscount {
  None = 1,
  TenPercent = 2,
  FifteenPercent = 3,
  TwentyPercent = 4,
  Other = 5,
}

export const getDiscountValue = (id: number): number => {
  switch (id) {
    case ClientDiscount.None:
      return 0;
    case ClientDiscount.TenPercent:
      return 10;
    case ClientDiscount.FifteenPercent:
      return 15;
    case ClientDiscount.TwentyPercent:
      return 20;
    case ClientDiscount.Other:
      return 0; 
    default:
      return 0;
  }
};