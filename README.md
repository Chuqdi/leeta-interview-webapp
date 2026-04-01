# Orders App

A full-stack order management app built with **React Native (Expo)** and **Next.js**, backed by a **Node.js + Express + TypeScript** API.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile | React Native (Expo) |
| Web | Next.js 14 (App Router) |
| Backend | Node.js + Express + TypeScript |
| State | Redux Toolkit |
| Persistence | redux-persist |
| HTTP | Axios |
| Styling (web) | Tailwind CSS |

---

## Key Components

### `ListOrdersSection`

Responsible for fetching, filtering, and displaying the full list of orders.

**What it does:**
- Fetches all orders on mount via `fetchOrders()`
- Displays a tab bar with three filter options — **All**, **Accepted**, and **Completed**
- Hitting a filter tab calls `GET /orders/filter?status=<value>` and updates the displayed list
- Selecting **All** clears the active filter and restores the full list
- Shows a pending orders count pulled from the Redux store
- Supports pull-to-refresh (mobile) and a refresh button (web) — both respect the active filter, so refreshing while on "Accepted" re-fetches filtered results rather than resetting to all orders
- Renders each order via `SingleOrderSection`

**State used:**
- `orders` — the currently displayed list (full or filtered depending on `activeFilter`)
- `activeFilter` — the currently selected filter value (`null` means all)
- `ordersList` — raw orders from Redux store, used to compute the pending count

---

### `SingleOrderSection`

Renders a single order card with contextual action buttons based on the order's current status.

**What it does:**
- Displays customer name, order age via `timeAgo()`, quantity, formatted price via `formatPrice()`, and phone number
- Shows a status badge coloured by status — green for completed, red/orange for others
- Navigates to the order detail screen on tap
- Renders different action buttons depending on `item.status`:

| Status | Actions shown |
|---|---|
| `pending` | **Accept** button |
| `accepted` | **Mark as delivered** button |
| `completed` | **Report an issue** link |

- Each button calls `changeStatus(newStatus)` from `useOrderStatus`, which hits `PATCH /orders/:id/status` and updates the order in Redux state in place
- The button shows a loading label (e.g. `"Accepting..."`) while the request is in flight and disables itself to prevent double-taps
- `e.stopPropagation()` is used on action buttons to prevent triggering the card's navigation handler

---

## State Management

### Redux Store

The app uses **Redux Toolkit** for state management with a single `orders` slice.

**`ordersSlice`** manages:

| State | Type | Description |
|---|---|---|
| `orders` | `IOrder[]` | Full list of orders |
| `filteredOrders` | `IOrder[]` | Results of an active filter |
| `activeFilter` | `string \| null` | Currently selected filter value |

**Reducers:**

| Action | Description |
|---|---|
| `setOrders` | Replaces the full orders list |
| `setFilteredOrders` | Replaces the filtered orders list |
| `setActiveFilter` | Sets or clears the active filter |
| `updateOrder` | Updates a single order in both `orders` and `filteredOrders` by `id` |
| `clearOrders` | Resets all order state to initial values |

---

### Persistence

The app uses **`redux-persist`** to persist the Redux store across sessions.

**React Native** — persists to `AsyncStorage`:
```ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["orders"],
};
```

**Next.js (Web)** — persists to `localStorage`:
```ts
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["orders"],
};
```

Only the `orders` slice is in the `whitelist`, meaning order data survives app restarts and page refreshes. On next load, the list renders instantly from cache before the fresh network fetch completes.

The web `PersistGate` is wrapped in a `"use client"` provider to avoid SSR hydration mismatches, since `localStorage` is only available in the browser.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/orders` | Fetch all orders |
| `GET` | `/orders/filter` | Filter orders by query params (e.g. `?status=pending`) |
| `PATCH` | `/orders/:id/status` | Update order status |

---



### Web
```bash
cd web
npm install
npm run dev
```

