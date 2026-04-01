

export type IOrderStatus = "pending" | "accepted" | "completed";

export interface IOrder {
  id: string;
  customerName: string;
  phone: string;
  quantity: string;
  status: IOrderStatus;
  amount: number;
  createdAt: string;
}

export type OrderFilterQueryType = Partial<Record<keyof IOrder, string>>;

export interface IFilterResponse {
  count: number;
  results: IOrder[];
}
