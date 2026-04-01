"use client";

import { IOrderStatus } from "@/src/types";
import { useCallback, useEffect, useState } from "react";
import ThemeText from "../ui/ThemeText";
import SingleOrderSection from "./SingleOrderSection";
import { useOrders } from "@/src/hooks/useOrders";
import { useAppSelector } from "@/src/store/useAppSelector";

const FILTERS: { label: string; value: IOrderStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Accepted", value: "accepted" },
  { label: "Completed", value: "completed" },
];

export default function ListOrdersSection() {
  const { orders, fetchOrders, filterOrders, clearFilter, activeFilter } =
    useOrders();
  const ordersList = useAppSelector((state) => state.orders.orders);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const pendingOrders = ordersList?.filter(
    (o) => o.status === "pending",
  ).length;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchOrders();
      setLoading(false);
    };
    load();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    activeFilter
      ? await filterOrders({ status: activeFilter })
      : await fetchOrders();
    setRefreshing(false);
  }, [activeFilter, fetchOrders, filterOrders]);

  const handleFilter = useCallback(
    async (value: IOrderStatus | "all") => {
      value === "all" ? clearFilter() : await filterOrders({ status: value });
    },
    [filterOrders, clearFilter],
  );

  if (loading) return <ThemeText text="Loading Orders..." />;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-3 p-2 bg-background-grey rounded-xl">
        {FILTERS.map((f) => {
          const isActive =
            f.value === "all" ? !activeFilter : activeFilter === f.value;
          return (
            <button
              key={f.value}
              onClick={() => handleFilter(f.value)}
              className={`flex-1 h-10 flex items-center justify-center rounded-lg transition-colors ${
                isActive ? "bg-white" : "bg-transparent"
              }`}
            >
              <ThemeText
                text={f.label}
                className={isActive ? "text-black" : "text-light-grey"}
              />
            </button>
          );
        })}
      </div>

      <ThemeText
        text={`Pending Orders (${pendingOrders})`}
        weight="bold"
        fontSize={17}
      />

      <button
        onClick={onRefresh}
        disabled={refreshing}
        className="text-sm text-primary text-right disabled:opacity-50"
      >
        {refreshing ? "Refreshing..." : "↻ Refresh"}
      </button>

      {orders?.length === 0 ? (
        <ThemeText text="No orders found." />
      ) : (
        <div className="flex flex-col gap-3">
          {orders?.map((item) => (
            <SingleOrderSection key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
