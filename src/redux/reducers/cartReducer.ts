// import { CartItem, CartState } from '../../libs/reduxTypes';
import { CartState } from '../../interfaces/cartItemInterface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DealInterface } from '../../interfaces/dealInterface';

const initialState: CartState = {
  cart: [],
  total: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<DealInterface>) {
      const existingIndex = state.cart.findIndex(item => item.dealID === action.payload.dealID);

      if (existingIndex >= 0) {
        state.cart[existingIndex].quantity += 1;
        state.total += parseFloat(state.cart[existingIndex].salePrice);
      } else {
        const newItem: DealInterface = { ...action.payload, quantity: 1 };
        state.cart.push(newItem);
        state.total += parseFloat(newItem.salePrice);
      }
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const index = state.cart.findIndex(item => item.dealID === action.payload);
      const existingItem = state.cart[index];

      if (existingItem) {
        state.total -= parseFloat(existingItem.salePrice) * existingItem.quantity;
        state.cart.splice(index, 1);
      }
    },
    adjustQty(state, action: PayloadAction<{ id: string; qty: number }>) {
      const item = state.cart.find(item => item.dealID === action.payload.id);
      if (item) {
        state.total -= parseFloat(item.salePrice) * item.quantity;
        item.quantity = action.payload.qty;
        state.total += parseFloat(item.salePrice) * item.quantity;
      }
    }
  }
});

export const { addToCart, removeFromCart, adjustQty } = cartSlice.actions;
export default cartSlice.reducer;
