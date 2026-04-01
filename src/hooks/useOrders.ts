import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilteredOrders,
  getOrders,
  updateOrderStatus,
} from "../services/orders";
import { AppDispatch, RootState } from "../store";
import {
  setActiveFilter,
  setFilteredOrders,
  setOrders,
  updateOrder,
} from "../store/slices/ordersSlice";
import { IOrder, IOrderStatus } from "../types";
import { useAppSelector } from "../store/useAppSelector";

export const useOrders = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { orders, filteredOrders, activeFilter } = useAppSelector(
    state => state.orders,
  );

  const displayedOrders = activeFilter ? filteredOrders : orders;

  const fetchOrders = useCallback(async () => {
    const data = await getOrders();
    dispatch(setOrders(data));
  }, [dispatch]);

  const filterOrders = useCallback(
    async (filters: Partial<Record<keyof IOrder, string>>) => {
      dispatch(setActiveFilter(Object.values(filters)[0] ?? null));
      const response = await getFilteredOrders(filters);
      dispatch(setFilteredOrders(response.results));
    },
    [dispatch],
  );

  const clearFilter = useCallback(() => {
    dispatch(setFilteredOrders([]));
    dispatch(setActiveFilter(null));
  }, [dispatch]);

  const updateStatus = useCallback(
    async (id: string, status: IOrderStatus) => {
      const updated = await updateOrderStatus(id, status);
      dispatch(updateOrder(updated));
    },
    [dispatch],
  );

  return {
    orders: displayedOrders,
    fetchOrders,
    updateStatus,
    filterOrders,
    clearFilter,
    activeFilter,
  };
};
