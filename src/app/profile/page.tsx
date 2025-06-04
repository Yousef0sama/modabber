"use client";

// ===================== Imports ===================== //

// Hooks
import { useState } from "react";
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserProfile from "@/hooks/useUserProfile";

// Components
import Container from "@/components/container";
import { CircularProgress } from "@mui/material";
import ProfileNav from "@/components/profile/profileNav";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ChangeName from "@/components/profile/changeName";
import ChangeEmail from "@/components/profile/changeEmail";
import ChangePassword from "@/components/profile/changePassword";
import DeleteAccount from "@/components/profile/deleteAcount";

// Providers
import ThemeProviderWraper from "@/providers/themeProvider";

// Interfaces
import { Tab } from "@/interfaces/interfaces";
import { JSX } from "react";

// ===================== Component ===================== //

/**
 * Profile component - Displays and manages the user profile section.
 *
 * @component
 * @returns {JSX.Element} The user profile page UI including tab navigation and dynamic content rendering.
 *
 * @description
 * - Fetches the current user via `useCurrentUser` hook.
 * - Retrieves the user profile data using `useUserProfile(uid)`.
 * - Displays a sidebar (`ProfileNav`) for tab navigation.
 * - Based on the active tab (`activeTab`), renders one of the following:
 *   - `ProfileInfo` → user data
 *   - `ChangeName` → form to update name
 *   - `ChangeEmail` → form to update email
 *   - `ChangePassword` → form to update password
 *   - `goals` and `deleteAccount` are placeholders for future content
 * - Shows a loading spinner while profile data is loading or user is not fetched
 * ToDo: edit goals and delete account sections
 */
export default function Profile(): JSX.Element {
  const currentUser = useCurrentUser();
  const { isLoading } = useUserProfile(currentUser?.uid);
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  return (
    <Container className="flex justify-start">
      <ThemeProviderWraper>
        {/* Sidebar Tabs */}
        <ProfileNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        {!currentUser || isLoading ? (
          <div className="flex justify-center items-center w-full min-h-full">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex flex-col w-full min-h-full gap-4 px-4">
            {activeTab === "profile" && <ProfileInfo />}
            {activeTab === "goals" && <div>الأهداف هنا</div>}
            {activeTab === "changeName" && <ChangeName />}
            {activeTab === "changeEmail" && <ChangeEmail />}
            {activeTab === "changePassword" && <ChangePassword />}
            {activeTab === "deleteAccount" && <DeleteAccount />}
          </div>
        )}
      </ThemeProviderWraper>
    </Container>
  );
}
