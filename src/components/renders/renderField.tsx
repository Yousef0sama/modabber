// ===================== Imports ===================== //

// Components
import { TextField } from "@mui/material";

// Constants
import { labelsMap } from "@/constants/labels";

// Utils
import { getInputType, getAutoComplete } from "@/utils/fields";

// Interfaces
import { InputField } from "@/interfaces/interfaces";
import { JSX } from "react";

interface RenderFieldProps {
  field: InputField;
  handleChange: (index: number, value: string) => void;
  index: number;
};

// ===================== Component ===================== //

/**
 * RenderField component.
 *
 * @component
 * @description
 * Dynamically renders a single input field using MUI's TextField component.
 * Supports error display, field-specific input types, and autocomplete behavior.
 *
 * @param {RenderFieldProps} props - Component props.
 * @param {InputField} props.field - Field object containing name, value, and error state.
 * @param {(index: number, value: string) => void} props.handleChange - Callback function for input changes.
 * @param {number} props.index - Index of the current field in the array.
 *
 * @returns {JSX.Element} The rendered input field.
 */
export default function RenderField({
  field,
  handleChange,
  index,
}: RenderFieldProps): JSX.Element {
  return (
    <TextField
      label={labelsMap[field.name] || field.name}
      id={field.name}
      name={field.name}
      type={getInputType(field.name)}
      variant="standard"
      size="small"
      fullWidth
      value={field.value}
      error={field.isErr}
      helperText={field.error}
      autoComplete={getAutoComplete(field.name)}
      onChange={(e) => handleChange(index, e.target.value)}
    />
  );
}
