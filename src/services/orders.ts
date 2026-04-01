import { IFilterResponse, IOrder, IOrderStatus } from "../types";
import api, { ApiError } from "../libs/axiosInstance";
import { toast } from "react-toastify";

export const getOrders = async (): Promise<IOrder[]> => {
  try {
    const { data } = await api.get("orders");
    return data;
  } catch (err) {
    const error = err as ApiError;
    toast.error(error.message);
    throw err;
  }
};

export const getFilteredOrders = async (
  filters: Partial<Record<keyof IOrder, string>>
): Promise<IFilterResponse> => {
  try {
    const { data } = await api.get("/orders/filter", { params: filters });
    return data;
  } catch (err) {
    const error = err as ApiError;
    toast.error(error.message);
    throw err;
  }
};

export const updateOrderStatus = async (
  id: string,
  status: IOrderStatus
): Promise<IOrder> => {
  try {
    const { data } = await api.patch(`/orders/${id}/status`, { status });

    const messages: Record<IOrderStatus, string> = {
      accepted: "Order accepted successfully.",
      completed: "Order marked as delivered.",
      pending: "Order set to pending.",
    };

    toast.success(messages[status]);
    return data;
  } catch (err) {
    const error = err as ApiError;
    toast.error(error.message);
    throw err;
  }
};