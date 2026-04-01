import { IOrderStatus } from "@/src/types";
import { useCallback, useState } from "react";
import { useOrders } from "./useOrders";

export const useOrderStatus = (orderId: string) => {
  const { updateStatus } = useOrders();
  const [loadingStatus, setLoadingStatus] = useState<IOrderStatus | null>(null);

  const changeStatus = useCallback(
    async (status: IOrderStatus) => {
      setLoadingStatus(status);
      await updateStatus(orderId, status);
      setLoadingStatus(null);
    },
    [orderId, updateStatus],
  );

  return { changeStatus, loadingStatus };
};
