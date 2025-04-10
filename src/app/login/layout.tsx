"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <div>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
}
