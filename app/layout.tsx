import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/src/providers/StoreProvider";
import SuspenseProvider from "@/src/providers/SuspenseProvider";
import { ToastContainer } from "react-toastify";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Leeta",
  description: "Gas delivery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${interFont.variable} h-full `}>
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <SuspenseProvider>
            {children}
            <ToastContainer />
          </SuspenseProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
