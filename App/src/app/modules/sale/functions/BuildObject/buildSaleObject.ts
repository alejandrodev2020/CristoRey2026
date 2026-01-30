import { CartItem } from '../../hooks/reducer/cartReducer';
import { Client } from '../../../clients/models/client_model';
import { Warehouse } from '../../../warehouse/models/warehouse';
import { buildSaleDetail } from './buildSaleDetail';
import { mapSaleTypeToId, SaleType } from '../types/types';

export type AmountBlock = {
  amountMain: number;
  amountCash: number;
  amountQr: number;
  amountCard: number;
};

type BuildSaleParams = {
  cartItems: CartItem[];
  client: Client | null;
  warehouse: Warehouse | null;
  saleType: SaleType; // ✅
  discount?: {
    type: 'PERCENT' | 'FIXED';
    value: number;
  };
  amountTotal?: AmountBlock;
  paymentDelivered?: AmountBlock;
};


export const buildSaleObject = ({
  cartItems,
  client,
  warehouse,
  saleType,
  discount,
  amountTotal,
  paymentDelivered,
}: BuildSaleParams) => {
  const detail = buildSaleDetail(cartItems);

  const subTotal = detail.reduce((acc, item) => acc + item.subTotal, 0);

  let discountAdditional = 0;
  let discountPercentage = 0;

  if (discount) {
    if (discount.type === 'PERCENT') {
      discountPercentage = discount.value;
      discountAdditional = (subTotal * discount.value) / 100;
    } else {
      discountAdditional = discount.value;
    }
  }

  const total = Math.max(0, subTotal - discountAdditional);

  return {
    // 🔹 SI VIENE DEL MODAL, USARLO
    amountTotal:
      saleType === 'CASH' && amountTotal
        ? amountTotal
        : {
            amountMain: total,
            amountCash: total,
            amountQr: 0,
            amountCard: 0,
          },

    saleTypeId: mapSaleTypeToId(saleType),

    pettyCashId: 81,
    warehouseId: warehouse?.id ?? 0,
    clientId: client?.id ?? 0,
    note: '',

    paymentTypeId: 0,
    amountOfDebt: saleType === 'CREDIT'
      ? Math.max(0, total - (paymentDelivered?.amountMain ?? 0))
      : 0,

    amountRecived: paymentDelivered?.amountMain ?? total,

    amountDiscountAditional: discountAdditional,
    DiscountPercentage: discountPercentage,

    paymentDelivered:
      saleType === 'CREDIT' && paymentDelivered
        ? paymentDelivered
        : {
            amountMain: 0,
            amountCash: 0,
            amountQr: 0,
            amountCard: 0,
          },

    detail,
  };
};
