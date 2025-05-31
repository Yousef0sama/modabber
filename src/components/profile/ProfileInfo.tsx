// imports

// hooks
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserProfile from "@/hooks/useUserProfile";

// components
import { Button, Typography, Divider } from "@mui/material";
import Link from "next/link";

// icons
import {
  Email,
  Person,
  MonetizationOn,
  Check,
  Delete,
  Edit,
} from "@mui/icons-material";

// utils
import handleVerifyEmail from "@/utils/sendVerifyMail"; // function to send email verification
import deleteAccount from "@/utils/deleteAccount";

/**
 * ProfileInfo component:
 * Displays user's name, email (with verification status), budget info, and edit profile link.
 */
export default function ProfileInfo() {
  // get current user from Firebase Auth
  const currentUser = useCurrentUser();
  const { uid, displayName, email, emailVerified } = currentUser || {};

  // get user profile data from Firestore using custom hook
  const { data: userProfile } = useUserProfile(uid);
  const { budget, totalIncome, totalExpense } = userProfile || {};

  return (
    <>
      {/* User Name Section */}
      <div className="flex items-center gap-2 mt-4">
        <Person color="primary" />
        <Typography variant="h6">{displayName || "No Name"}</Typography>
      </div>

      <Divider />

      {/* Email + Verification Section */}
      <div className="flex items-center gap-2 flex-wrap">
        <Email color="primary" />
        <Typography className="text-[0.8rem]! sm:text-[1rem]!">
          {email || "No Email"}
        </Typography>

        {/* Verification Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleVerifyEmail(currentUser)}
          startIcon={emailVerified && <Check color="success" />}
          disabled={emailVerified}
        >
          {emailVerified ? "Verified" : "Verify Email"}
        </Button>
      </div>

      <Divider />

      {/* Financial Summary Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MonetizationOn color="primary" />
          <Typography>Budget: {budget ?? 0}$</Typography>
        </div>
        <div className="flex items-center gap-2">
          <MonetizationOn color="primary" />
          <Typography>Total Income: {totalIncome ?? 0}$</Typography>
        </div>
        <div className="flex items-center gap-2">
          <MonetizationOn color="primary" />
          <Typography>Total Expense: {totalExpense ?? 0}$</Typography>
        </div>
      </div>

      {/* Edit Profile Link */}
      <Link
        href={`/profile/edit`} // navigate to edit profile page
        role="button"
        className="flex items-center gap-2 mt-4 bg-primary text-white p-2 rounded-md w-fit"
      >
        <Edit />
        Edit Profile
      </Link>
      <Button
        variant="contained"
        color="error"
        className="w-fit"
        onClick={() => deleteAccount(currentUser)}
        startIcon={<Delete />}
      >
        delete account
      </Button>
    </>
  );
}
