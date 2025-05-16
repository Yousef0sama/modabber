"use client";

// hooks
import useAuthListener from "@/hooks/useAuthListener";

// interfaces
import { ReactNode } from "react";

type Props = {
  readonly children: ReactNode;
};

export default function AuthProvider({ children }: Props) {
  useAuthListener();
  return <>{children}</>;
}
