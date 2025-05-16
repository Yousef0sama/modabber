"use client";

// fonts
import { El_Messiri } from "next/font/google";

// imports
import { useEffect } from "react";

// hooks
import useCurrentUser from "@/hooks/useCurrentUser";

// components
import ThemeSwitcher from "./ui/themeSwicher";
import UserMenu from "./ui/menu";
import Link from "next/link";

// mui icons and components
import { Brightness4 } from "@mui/icons-material";
import { ListItemIcon } from "@mui/material";

const elMessiri = El_Messiri({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function Header() {
  const currentUser = useCurrentUser();

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <header className="bg-primary text-white min-h-[10vh] flex justify-between items-center px-4 sm:px-20">
      <Link href="/">
        <h1 className={`${elMessiri.className} text-2xl font-bold`}>مُدَبِرْ</h1>
      </Link>

      {currentUser ? (
        <UserMenu />
      ) : (
        <div className="flex justify-center items-center">
          <ListItemIcon className="!justify-end">
            <Brightness4 />
          </ListItemIcon>
          <ThemeSwitcher color="default" />
        </div>
      )}
    </header>
  );
}
