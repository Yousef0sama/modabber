"use client"

// imports

// hooks
import { useSelector } from "react-redux";

// interfaces
import { RootState } from "@/store/index";

type props = Readonly<{
  children: React.ReactNode;
  className? : string;
}>

export default function Container ({ children, className } : props) {

  const mode = useSelector((state: RootState) => state.theme.mode);

  return (
    <main className={` ${mode === 'dark' ? 'bg-foreground text-white' : 'bg-background text-foreground'} min-h-[90vh] ${className || ''}`}>
      {children}
    </main>
  );
};
