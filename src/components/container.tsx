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
  // get current theme mode from redux store
  const mode = useSelector((state: RootState) => state.theme.mode);

  // add dark or light class based on theme mode and render children inside main container
  return (
    <main className={` ${mode === 'dark' ? 'dark' : 'light'} min-h-[90vh] ${className || ''}`}>
      {children}
    </main>
  );
};
