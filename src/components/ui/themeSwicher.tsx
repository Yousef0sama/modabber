"use client"

// imports

// hooks
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

// redux
import { toggleTheme } from "@/store/features/themeSlice";

// components
import { Switch, Skeleton  } from "@mui/material";

// interfaces
import { RootState } from "@/store/index";

export default function ThemeSwitcher() {

  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleChange = () => {
    dispatch(toggleTheme())
  }

  return (
    <div className="flex justify-cneter items-center">
        {isClient ? (
          <>
            Dark
            <Switch color="default" checked={mode === "dark"} onChange={handleChange} />
          </>
        ) : (
          <Skeleton variant="rounded" width={100} height={26} />
        )}
    </div>
  );
};