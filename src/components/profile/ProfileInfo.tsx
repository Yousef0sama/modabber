// ===================== Imports ===================== //

// Hooks
import useCurrentUser from "@/hooks/useCurrentUser";
import useUserProfile from "@/hooks/useUserProfile";

// Components
import { Button, Typography, Divider } from "@mui/material";

// Icons
import {
  Email,
  Person,
  MonetizationOn,
  Check,
} from "@mui/icons-material";

// Utils
import handleVerifyEmail from "@/utils/sendVerifyMail";

// Interfaces
import { JSX } from "react";


// ===================== Component ===================== //

/**
 * ProfileInfo component.
 *
 * @component
 * @description
 * Displays current user's profile information including name, email (with verification status),
 * budget, total income, and total expense.
 *
 * @returns {JSX.Element} Rendered profile information section.
 *
 */
export default function ProfileInfo() : JSX.Element {

  const currentUser = useCurrentUser();
  const { uid, displayName, email, emailVerified } = currentUser || {};

  const { data: userProfile } = useUserProfile(uid);
  const { budget = 0, totalIncome = 0, totalExpense = 0 } = userProfile || {};

  return (
    <>
      {/* Name Section */}
      <div className="flex items-center gap-2 mt-4">
        <Person color="primary" />
        <Typography variant="h6">{displayName || "No Name"}</Typography>
      </div>

      <Divider className="my-2" />

      {/* Email Section */}
      <div className="flex items-center gap-2 flex-wrap">
        <Email color="primary" />
        <Typography variant="body1">{email || "No Email"}</Typography>

        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleVerifyEmail(currentUser)}
          startIcon={emailVerified && <Check color="success" />}
          disabled={emailVerified}
        >
          {emailVerified ? "Verified" : "Verify Email"}
        </Button>
      </div>

      <Divider className="my-2" />

      {/* Budget Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MonetizationOn color="primary" />
          <Typography variant="body1">Budget: {budget}$</Typography>
        </div>
        <div className="flex items-center gap-2">
          <MonetizationOn color="primary" />
          <Typography variant="body1">Total Income: {totalIncome}$</Typography>
        </div>
        <div className="flex items-center gap-2">
          <MonetizationOn color="primary" />
          <Typography variant="body1">Total Expense: {totalExpense}$</Typography>
        </div>
      </div>
    </>
  );
}
