import { IOrder } from "@/src/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrdersState {
  orders: IOrder[];
  filteredOrders: IOrder[];
  activeFilter: string | null;
}

const initialState: OrdersState = {
  orders: [],
  filteredOrders: [],
  activeFilter: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload;
    },
    setFilteredOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.filteredOrders = action.payload;
    },
    setActiveFilter: (state, action: PayloadAction<string | null>) => {
      state.activeFilter = action.payload;
    },
    updateOrder: (state, action: PayloadAction<IOrder>) => {
      const index = state.orders.findIndex((o) => o.id === action.payload.id);
      if (index !== -1) state.orders[index] = action.payload;

      const filteredIndex = state.filteredOrders.findIndex(
        (o) => o.id === action.payload.id,
      );
      if (filteredIndex !== -1)
        state.filteredOrders[filteredIndex] = action.payload;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.filteredOrders = [];
      state.activeFilter = null;
    },
  },
});

export const {
  setOrders,
  setFilteredOrders,
  setActiveFilter,
  updateOrder,
  clearOrders,
} = ordersSlice.actions;
export default ordersSlice.reducer;
