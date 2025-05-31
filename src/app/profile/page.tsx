"use client";

// imports

// hooks
import { useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserProfile from "@/hooks/useUserProfile";

// components
import Container from "@/components/container";
import { CircularProgress } from "@mui/material";
import ProfileNav from "@/components/profile/profileNav";
import ProfileInfo from "@/components/profile/ProfileInfo";

// providers
import ThemeProviderWraper from "@/providers/themeProvider";

/**
 * Profile Page:
 * Displays the user's profile information or goals depending on the selected tab.
 * Shows loading spinner while fetching data.
 */
export default function Profile() {
  // Get current Firebase auth user
  const currentUser = useCurrentUser();

  // Check loading status of user profile data
  const { isLoading } = useUserProfile(currentUser?.uid);

  // State to control which tab is active (either 'profile' or 'goals')
  const [activeTab, setActiveTab] = useState<"profile" | "goals">("profile");

  return (
    <Container className="flex justify-start">
      <ThemeProviderWraper>
        {/* Sidebar navigation with tab switch */}
        <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content section */}
        {
          // Show loading spinner if no user or data is still loading
          !currentUser || isLoading ? (
            <div className="flex justify-center items-center w-full min-h-full">
              <CircularProgress />
            </div>
          ) : (
            <div className="flex flex-col w-full min-h-full gap-4 px-4">
              {/* Profile Info Tab */}
              {activeTab === "profile" && <ProfileInfo />}

              {/* Goals Tab */}
              {activeTab === "goals" && <div>الأهداف هنا</div>}
            </div>
          )
        }
      </ThemeProviderWraper>
    </Container>
  );
}
