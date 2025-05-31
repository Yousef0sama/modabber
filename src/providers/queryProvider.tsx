"use client";

// imports

// react-query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// hooks
import { useState } from "react";

// interfaces

type props = {
  children: React.ReactNode;
};

export default function QueryProvider({ children }: props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
