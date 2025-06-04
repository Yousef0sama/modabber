// ===================== Imports ===================== //

// Components
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

// Interfaces
import { TabItem, Tab } from "@/interfaces/interfaces";
import { JSX } from "react";

// ===================== Props Interface ===================== //

interface FetchProfileNavTabsProps {
  tabs: TabItem[];
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

// ===================== Component ===================== //

/**
 * FetchProfileNavTabs Component
 *
 * @description
 * Renders a list of profile navigation tabs with icons and labels.
 * The active tab is highlighted, and tabs can be switched on click.
 *
 * @param {TabItem[]} tabs - Array of tab objects containing label, value, and icon.
 * @param {Tab} activeTab - The current active tab value.
 * @param {(tab: Tab) => void} setActiveTab - Callback to set the active tab.
 *
 * @returns {JSX.Element[]} An array of MUI ListItem components representing the tabs.
 */
export default function FetchProfileNavTabs({
  tabs,
  activeTab,
  setActiveTab,
}: FetchProfileNavTabsProps): JSX.Element[] {
  return tabs.map(({ label, value, icon }) => (
    <ListItem disablePadding key={value}>
      <ListItemButton
        selected={activeTab === value} // highlight if active
        onClick={() => setActiveTab(value)} // change tab on click
      >
        {icon && <ListItemIcon>{icon}</ListItemIcon>} {/* render icon if provided */}
        <ListItemText primary={label} className="hidden sm:block" /> {/* text label (hidden on small screens) */}
      </ListItemButton>
    </ListItem>
  ));
}
