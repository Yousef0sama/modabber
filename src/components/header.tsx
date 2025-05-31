"use client";

// fonts
import { El_Messiri } from "next/font/google";

// hooks
import useCurrentUser from "@/hooks/useCurrentUser";

// components
import ThemeSwitcher from "./ui/themeSwicher";
import SettingsList from "./ui/settingsList";
import NotificationList from "./ui/notificationsList";
import Link from "next/link";
import { ListItemIcon } from "@mui/material";

// icons
import { Brightness4 } from "@mui/icons-material";

const elMessiri = El_Messiri({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export default function Header() {
  const currentUser = useCurrentUser();

  return (
    <header className="bg-primary text-white min-h-[10vh] flex justify-between items-center px-4 sm:px-20">
      <Link href="/">
        <h1 className={`${elMessiri.className} text-2xl font-bold`}>
          مُدَبِرْ
        </h1>
      </Link>

      <div className="flex items-center">
        {currentUser ? (
          <>
            <NotificationList />
            <SettingsList />
          </>
        ) : (
          <>
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
