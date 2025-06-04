// ===================== Imports ===================== //

// Hooks
import { useThemeMode } from "@/hooks/useThemeMode";

// Components
import { List } from "@mui/material";
import FetchProfileNavTabs from "../fetch/fetchProfileNavTabs";

// Icons
import {
  Person,
  EmojiEvents,
  Badge,
  Email,
  Key,
  Delete,
} from "@mui/icons-material";

// Interfaces
import { TabItem, Tab } from "@/interfaces/interfaces";

interface ProfileNavProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

// ===================== Component ===================== //

/**
 * ProfileNav component.
 *
 * @component
 * @description
 * Renders a vertical sidebar navigation for the profile page. It allows users to switch between
 * profile-related tabs such as profile info, goals, and account settings.
 *
 * @param {ProfileNavProps} props - Component props.
 * @param {Tab} props.activeTab - The currently selected tab.
 * @param {(tab: Tab) => void} props.setActiveTab - Callback to update the active tab.
 *
 * @returns {JSX.Element} A sidebar navigation with tabs.
 */
export default function ProfileNav({
  activeTab,
  setActiveTab,
}: ProfileNavProps) {
  // Get the current theme mode (light/dark)
  const { mode } = useThemeMode();

  // Define all available profile tabs
  const tabs: TabItem[] = [
    {
      label: "Profile",
      value: "profile",
      icon: <Person />, // Profile tab icon
    },
    {
      label: "Goals",
      value: "goals",
      icon: <EmojiEvents />, // Goals tab icon
    },
    {
      label: "Change Name",
      value: "changeName",
      icon: <Badge />, // Change Name tab icon
    },
    {
      label: "Change Email",
      value: "changeEmail",
      icon: <Email />, // Change Email tab icon
    },
    {
      label: "Change Password",
      value: "changePassword",
      icon: <Key />, // Change Password tab icon
    },
    {
      label: "Delete Account",
      value: "deleteAccount",
      icon: <Delete />, // Delete Account tab icon
    },
  ];

  return (
    // Main sidebar container with dynamic border color based on theme
    <nav
      className={`flex flex-col w-[20%] min-h-full border-r-4 ${
        mode === "dark" ? "border-r-[#444]" : "border-r-[#d0d0d0]"
      }`}
    >
      {/* Tab list container */}
      <List className="px-2">
        {/* Render all nav tab buttons */}
        <FetchProfileNavTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabs={tabs}
        />
      </List>
    </nav>
  );
}
