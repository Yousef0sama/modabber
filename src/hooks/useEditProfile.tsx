// improts

// Hooks
import { useState } from "react";
import { useRouter } from "next/navigation";
import useCurrentUser from "@/hooks/useCurrentUser";

// Utilities
import validateFormFields from "@/utils/validateFormFields";
import { isEmpty, isEmail, isNameValid, checkLength } from "@/utils/validators";
import toast from "react-hot-toast";
import changeName from "@/utils/changeName";
import changeEmail from "@/utils/changeEmail";
import { getFieldByName, updateFieldsByName } from "@/utils/fields";

// Interfaces
import { InputField } from "@/interfaces/interfaces";
import { User } from "firebase/auth";

/**
  * Custom hook to manage the edit profile form logic.
  ** Handles:
  * - Form state and validation
  * - Name and email updates
  * - User feedback and redirection
*/
export default function useEditProfileLogic() {
  const router = useRouter();
  const currentUser: User = useCurrentUser()!;

  const [fields, setFields] = useState<InputField[]>([
    {
      name: "firstName",
      value: "",
      validators: [isNameValid, (val) => checkLength(val, 2, 30)],
      isErr: false,
      error: "",
    },
    {
      name: "lastName",
      value: "",
      validators: [isNameValid, (val) => checkLength(val, 2, 30)],
      isErr: false,
      error: "",
    },
    {
      name: "email",
      value: "",
      validators: [isEmail],
      isErr: false,
      error: "",
    },
    {
      name: "currentPassword",
      value: "",
      validators: [isEmpty, (val) => checkLength(val, 8, 20)],
      isErr: false,
      error: "",
    },
  ]);

  /**
   * Updates the value of a form field by its index.
   * @param index - Index of the field in the array.
   * @param newValue - New value to set.
   */
  const handleChange = (index: number, newValue: string) => {
    setFields((prevFields) =>
      prevFields.map((field, i) =>
        i === index ? { ...field, value: newValue } : field
      )
    );
  };

  /*
    * Handles form submission.
    * - Validates changed fields.
    * - Shows toast errors if needed.
    * - Updates user name or email if valid.
    * - Redirects to profile page on success.
  */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const firstName = getFieldByName("firstName", fields)!;
    const lastName = getFieldByName("lastName", fields)!;
    const email = getFieldByName("email", fields)!;
    const currentPassword = getFieldByName("currentPassword", fields)!;

    const fullNameInput = `${firstName.value} ${lastName.value}`.trim();
    const fullNameCurrent = currentUser.displayName?.trim() || "";

    const isNameChanged =
      fullNameInput.toLowerCase() !== fullNameCurrent.toLowerCase();
    const isEmailChanged = email.value !== currentUser.email;

    // Prevent submission if no changes
    if (!isNameChanged && !isEmailChanged) {
      toast.error("No changes detected in name or email fields.");
      return;
    }

    // Ensure at least one field is filled
    if (isEmpty(firstName.value) && isEmpty(lastName.value) && isEmpty(email.value)) {
      toast.error("Please fill in at least one field (name or email).");
      return;
    }

    // name Update Flow
    if (!isEmpty(firstName.value) && !isEmpty(lastName.value) && isNameChanged) {
      const validatedFields = validateFormFields(firstName, lastName);
      updateFieldsByName(validatedFields, setFields);

      const hasError = validatedFields.some((field) => field.isErr);
      if (!hasError) {
        const success = await changeName(firstName.value, lastName.value, currentUser);
        if (success) router.push("/profile");
      }
    }

    // email Update Flow
    if (!isEmpty(email.value) && isEmailChanged) {
      const validatedFields = validateFormFields(email, currentPassword);
      updateFieldsByName(validatedFields, setFields);

      const hasError = validatedFields.some((field) => field.isErr);
      if (!hasError) {
        const success = await changeEmail(email.value, currentPassword.value, currentUser, setFields);
        if (success) router.push("/profile");
      }
    }
  };

  return {
    fields,
    setFields,
    handleChange,
    handleSubmit,
  };
}
