"use client";

// hooks
import useAuthListener from "@/hooks/useAuthListener";

// interfaces

type Props = {
  readonly children: React.ReactNode;
};

export default function AuthProvider({ children }: Props) {
  useAuthListener();
  return <>{children}</>;
}
