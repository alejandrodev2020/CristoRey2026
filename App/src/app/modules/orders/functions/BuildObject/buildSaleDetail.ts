import { CartItem } from '../../hooks/reducer/cartReducer';

export const buildSaleDetail = (cartItems: CartItem[]) => {
  return cartItems.map(item => {
    const product = item.warehouseProduct.product;

    const amount = item.amount ?? 1;
    const price = item.price ?? 0;
    const discount = item.discount ?? 0;

    const subTotal =
      item.subTotal != null
        ? item.subTotal
        : Math.max(0, price * amount - discount);

    return {
      productId: product.id,
      amount,
      price,
      discount,
      subTotal,
      unitMeasurenmentSelectId:
        item.unitMeasurenmentSelectId ??
        item.warehouseProduct.unitMeasurement?.id ??
        0,
      updatePrice: item.updatePrice ?? false,
    };
  });
};
