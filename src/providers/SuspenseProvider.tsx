"use client";

import { useSuspense } from "../hooks/useSuspense";

export default function SuspenseProvider({ children }: { children: React.ReactNode }) {
  const suspened = useSuspense();

  if (!suspened) return null;

  return children;
}
