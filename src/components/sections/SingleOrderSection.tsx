"use client";

import { useRouter } from "next/navigation";
import ThemeText from "../ui/ThemeText";
import { formatPrice, timeAgo } from "@/src/libs/utils";
import Button from "../ui/Button";
import { IOrder } from "@/src/types";
import { FaGasPump } from "react-icons/fa";
import { useOrderStatus } from "@/src/hooks/useOrderStatus";

export default function SingleOrderSection({ item }: { item: IOrder }) {
  const router = useRouter();
  const { changeStatus, loadingStatus } = useOrderStatus(item.id);

  const statusBg =
    item.status === "completed" ? "bg-delivered-bg" : "bg-cancelled-bg";

  return (
    <div
      className="bg-white rounded-2xl p-3 flex flex-col gap-3 cursor-pointer"
    >
      <div className="flex flex-row gap-3">
        <div className="flex items-center justify-center p-3 rounded-lg bg-background-grey">
          <FaGasPump />
        </div>

        <div className="flex flex-col gap-1.5 flex-1">
          <ThemeText text={item.customerName} weight="bold" fontSize={14} />
          <ThemeText
            text={`Request ${timeAgo(item.createdAt)}`}
            className="text-grey"
            fontSize={12}
          />

          <div className="flex flex-row gap-3 items-center">
            <div className="flex flex-row gap-1 items-center">
              <ThemeText text={item.quantity} />
              <ThemeText text="|" className="text-light-grey" />
            </div>

            <ThemeText text={formatPrice(item.amount)} />

            <div className="flex flex-row gap-1 items-center">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <ThemeText text={item.phone} />
            </div>
          </div>
        </div>

        <div
          className={`${statusBg} rounded-2xl px-2 h-8 flex items-center justify-center`}
        >
          <ThemeText
            text={item.status}
            weight="bold"
            fontSize={12}
            className="capitalize"
          />
        </div>
      </div>

      {item.status === "completed" && (
        <button
          className="flex items-center justify-center p-1"
          onClick={(e) => e.stopPropagation()}
        >
          <ThemeText
            text="Report an issue"
            weight="bold"
            className="text-primary"
          />
        </button>
      )}

      {/* Accepted */}
      {item.status === "accepted" && (
        <Button
          title={
            loadingStatus === "completed" ? "Updating..." : "Mark as delivered"
          }
          variant="primary"
          disabled={!!loadingStatus}
          className="w-full h-10"
          onClick={(e) => {
            e.stopPropagation();
            changeStatus("completed");
          }}
        />
      )}

      {item.status === "pending" && (
        <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
          <Button
            title={loadingStatus === "accepted" ? "Accepting..." : "Accept"}
            variant="primary"
            disabled={!!loadingStatus}
            className="flex-1 h-10"
            onClick={() => changeStatus("accepted")}
          />
        </div>
      )}
    </div>
  );
}
