"use client";
import { Provider } from "react-redux";
import { store } from "../store";
// import { ToastContainer } from "react-toastify";

function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      {/* <ToastContainer /> */}
    </Provider>
  );
}

export default StoreProvider;
