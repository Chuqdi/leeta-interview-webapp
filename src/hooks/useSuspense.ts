import { useEffect, useState } from "react";

export function useSuspense() {
  const [suspended, setSuspended] = useState(false);

  useEffect(() => {
    setSuspended(true);
  }, []);

  return suspended;
}