"use client";

// ===================== Imports ===================== //

// Fonts
import { El_Messiri } from "next/font/google";

// Hooks
import useCurrentUser from "@/hooks/useCurrentUser";

// Components
import ThemeSwitcher from "./ui/themeSwicher";
import SettingsList from "./ui/settingsList";
import NotificationList from "./ui/notificationsList";
import Link from "next/link";
import { ListItemIcon } from "@mui/material";

// Icons
import { Brightness4 } from "@mui/icons-material";

// Interfaces
import { JSX } from "react";

// ===================== Font Config ===================== //

const elMessiri = El_Messiri({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// ===================== Component ===================== //

/**
 * Header component.
 *
 * @component
 * @description
 * Renders the top navigation header for the app. It includes the logo,
 * notifications list, settings list, and theme switcher depending on
 * whether the user is logged in or not.
 *
 * @returns {JSX.Element} The rendered Header component.
 */
export default function Header() : JSX.Element {
  // Get the current user from a custom hook
  const currentUser = useCurrentUser();

  return (
    <header className="bg-primary text-white min-h-[10vh] flex justify-between items-center px-4 sm:px-20">
      {/* Logo */}
      <Link href="/">
        <h1 className={`${elMessiri.className} text-2xl font-bold`}>
          مُدَبِرْ
        </h1>
      </Link>

      {/* User actions */}
      <div className="flex items-center">
        {currentUser ? (
          <>
            {/* Notifications and settings for logged-in users */}
            <NotificationList />
            <SettingsList />
          </>
        ) : (
          <>
            {/* Theme toggle for guests */}
            <ListItemIcon className="!justify-end">
              <Brightness4 />
            </ListItemIcon>
            <ThemeSwitcher color="default" />
          </>
        )}
      </div>
    </header>
  );
}
