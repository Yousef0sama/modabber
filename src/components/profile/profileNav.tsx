// imports

// mui components for the list and icons
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

// custom hook to get current theme mode (light or dark)
import { useThemeMode } from "@/hooks/useThemeMode";

// component props type definition
type Props = {
  activeTab: 'profile' | 'goals'; // current active tab
  setActiveTab: (tab: 'profile' | 'goals') => void; // function to change the active tab
};

/*
 * ProfileNav component:
 * Displays a vertical navigation menu inside the profile page.
 * Allows switching between "Profile" and "Goals" tabs.
*/
export default function ProfileNav({ activeTab, setActiveTab }: Props) {
  // get current theme mode from context (light/dark)
  const { mode } = useThemeMode();

  return (
    // main nav container with dynamic right border color based on theme
    <nav
      className={`flex flex-col w-[20%] min-h-full border-r-4 ${
        mode === 'dark' ? 'border-r-[#444]' : 'border-r-[#d0d0d0]'
      }`}
    >
      {/* list of navigation items */}
      <List className="px-2">
        {/* Profile tab button */}
        <ListItem disablePadding>
          <ListItemButton
            selected={activeTab === 'profile'} // highlight if active
            onClick={() => setActiveTab('profile')} // change tab on click
          >
            <ListItemIcon>
              <PersonIcon /> {/* icon for Profile tab */}
            </ListItemIcon>
            <ListItemText primary="Profile" className="hidden sm:block" /> {/* text label (hidden on small screens) */}
          </ListItemButton>
        </ListItem>

        {/* Goals tab button */}
        <ListItem disablePadding>
          <ListItemButton
            selected={activeTab === 'goals'} // highlight if active
            onClick={() => setActiveTab('goals')} // change tab on click
          >
            <ListItemIcon>
              <EmojiEventsIcon /> {/* icon for Goals tab */}
            </ListItemIcon>
            <ListItemText primary="Goals" className="hidden sm:block" /> {/* text label (hidden on small screens) */}
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  );
}
