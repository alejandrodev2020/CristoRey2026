import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BaseClassifier} from '../../../../shared/models/baseClassifier';
import {WarehouseProduct} from '../../../warehouse/models/warehouse_product';

export interface CartItem {
  id: string;
  amount?: number;
  productId?: number;
  subTotal?: number;
  rateId?: number;
  unitMeasurenmentSelectId?: number;
  discount?: number;
  price: number;
  updatePrice?: boolean;
  warehouseProduct: WarehouseProduct;
}

export interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // addToCart: (state, action: PayloadAction<CartItem>) => {
    //     const itemToAdd = action.payload;
    //     const itemInCart = state.cart.find(item => item.id === itemToAdd.id);

    //     if (itemInCart && itemInCart.amount != null) {
    //         itemInCart.amount++;
    //     } else {
    //         state.cart.push(itemToAdd);
    //     }
    // },
    // addToCart: (state, action: PayloadAction<CartItem>) => {
    // const itemToAdd = action.payload;

    // const index = state.cart.findIndex(
    //     item =>
    //     item.productId === itemToAdd.productId &&
    //     item.unitMeasurenmentSelectId === itemToAdd.unitMeasurenmentSelectId
    // );

    // if (index >= 0) {
    //     // 🔁 mismo producto + misma unidad → actualizar
    //     state.cart[index] = itemToAdd;
    // } else {
    //     state.cart.push(itemToAdd);
    // }
    // },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;

      // Seguridad mínima
      item.discount = item.discount ?? 0;
      item.subTotal = Math.max(
        0,
        item.price * (item.amount ?? 1) - item.discount,
      );

      const index = state.cart.findIndex(
        i =>
          i.productId === item.productId &&
          i.unitMeasurenmentSelectId === item.unitMeasurenmentSelectId,
      );

      if (index >= 0) {
        state.cart[index] = item;
      } else {
        state.cart.push(item);
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const idToRemove = action.payload;
      state.cart = state.cart.filter(item => item.id !== idToRemove);
    },
    updateCartItemAmount: (
      state,
      action: PayloadAction<{id: string; amount: number}>,
    ) => {
      const {id, amount} = action.payload;
      const itemInCart = state.cart.find(item => item.id === id);
      if (itemInCart) {
        itemInCart.amount = amount;
      }
    },
    updatePrice: (
      state,
      action: PayloadAction<{id: string; newPrice: number}>,
    ) => {
      const {id, newPrice} = action.payload;
      const itemInCart = state.cart.find(item => item.id === id);
      if (itemInCart) {
        itemInCart.price = newPrice;
      }
    },
    clearCart: state => {
      state.cart = [];
    },
    incrementQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const itemInCart = state.cart.find(item => item.id === itemId);
      if (itemInCart && itemInCart.amount != null) {
        itemInCart.amount++;
      }
    },
    decrementQuantity: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const itemInCart = state.cart.find(item => item.id === itemId);
      if (itemInCart && itemInCart.amount != null) {
        if (itemInCart.amount === 1) {
          state.cart = state.cart.filter(item => item.id !== itemId);
        } else {
          itemInCart.amount--;
        }
      }
    },

    applyGlobalDiscount: (
      state,
      action: PayloadAction<{
        type: 'PERCENT' | 'FIXED';
        value: number;
      }>,
    ) => {
      const {type, value} = action.payload;

      if (state.cart.length === 0) return;

      // 🔹 Total actual del carrito (antes del descuento)
      const totalBeforeDiscount = state.cart.reduce(
        (sum, item) => sum + (item.subTotal ?? 0),
        0,
      );

      if (totalBeforeDiscount <= 0) return;

      state.cart = state.cart.map(item => {
        const itemBase = (item.price ?? 0) * (item.amount ?? 1);

        let discountValue = 0;

        if (type === 'PERCENT') {
          // 🔹 prorrateo proporcional
          const proportion = itemBase / totalBeforeDiscount;
          discountValue = (value * proportion * totalBeforeDiscount) / 100;
        } else {
          // 🔹 FIXED → prorrateo proporcional
          const proportion = itemBase / totalBeforeDiscount;
          discountValue = value * proportion;
        }

        discountValue = Number(discountValue.toFixed(2));

        return {
          ...item,
          discount: discountValue,
          subTotal: Math.max(0, itemBase - discountValue),
        };
      });
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemAmount,
  updatePrice,
  clearCart,
  incrementQuantity,
  decrementQuantity,
  applyGlobalDiscount
} = cartSlice.actions;

export default cartSlice.reducer;
