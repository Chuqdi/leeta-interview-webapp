"use client";

import EarningsBreakdownSection from "@/src/components/sections/EarningsBreakdownSection";
import ListOrdersSection from "@/src/components/sections/ListOrdersSection";
import Checkbox from "@/src/components/ui/Checkbox";
import ThemeText from "@/src/components/ui/ThemeText";
import { useOrders } from "@/src/hooks/useOrders";

export default function OrdersPage() {
   const { orders, fetchOrders, filterOrders, clearFilter, activeFilter } =
    useOrders();
  return (
    <div className="min-h-screen bg-[#d2d2d232]">
      <div className="max-w-2xl mx-auto p-4 flex flex-col gap-8">

        {/* Header */}
        <div className="flex flex-row items-center justify-between pt-safe">
          <div className="flex flex-col">
            <ThemeText text="Orders" weight="bold" fontSize={16} />
            <ThemeText text="Goodhub Enterprize" fontSize={13} className="text-grey" />
          </div>

          <div className="flex flex-row gap-3 items-center">
            <div className="w-9">
              <Checkbox checked onCheck={() => {}} />
            </div>
            <button>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
          </div>
        </div>

        <EarningsBreakdownSection />
        <ListOrdersSection
         />
      </div>
    </div>
  );
}