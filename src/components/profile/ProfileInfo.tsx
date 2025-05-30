// imports

// hooks
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserProfile from "@/hooks/useUserProfile";

// components
import { Button, Typography, Divider } from "@mui/material";
import Link from "next/link";

// icons
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from "@mui/icons-material/Edit";

// utils
import handleVerifyEmail from "@/utils/sendVerifyigMail"; // function to send email verification

/*
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
        <PersonIcon color="primary" />
        <Typography variant="h6">{displayName || "No Name"}</Typography>
      </div>

      <Divider />

      {/* Email + Verification Section */}
      <div className="flex items-center gap-2 flex-wrap">
        <EmailIcon color="primary" />
        <Typography className="text-[0.8rem]! sm:text-[1rem]!">
          {email || "No Email"}
        </Typography>

        {/* Verification Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleVerifyEmail(currentUser)}
          startIcon={emailVerified && <CheckIcon color="success" />}
          disabled={emailVerified}
        >
          {emailVerified ? "Verified" : "Verify Email"}
        </Button>
      </div>

      <Divider />

      {/* Financial Summary Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MonetizationOnIcon color="primary" />
          <Typography>Budget: {budget ?? 0}$</Typography>
        </div>
        <div className="flex items-center gap-2">
          <MonetizationOnIcon color="primary" />
          <Typography>Total Income: {totalIncome ?? 0}$</Typography>
        </div>
        <div className="flex items-center gap-2">
          <MonetizationOnIcon color="primary" />
          <Typography>Total Expense: {totalExpense ?? 0}$</Typography>
        </div>
      </div>

      {/* Edit Profile Link */}
      <Link
        href={`/profile/edit`} // navigate to edit profile page
        role="button"
        className="flex items-center gap-2 mt-4 bg-primary text-white p-2 rounded-md w-fit"
      >
        <EditIcon />
        Edit Profile
      </Link>
    </>
  );
}
