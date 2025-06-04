// ===================== Imports ===================== //

// Components
import RenderField from "@/components/renders/renderField";

// Interfaces
import { InputField } from "@/interfaces/interfaces";
import { JSX } from "react";

// ===================== Props Interface ===================== //

interface FetchFieldsProps {
  fields: InputField[];
  handleChange: (index: number, value: string) => void;
  inlineFields?: number[]; // Indexes of fields to render inline
}

// ===================== Component ===================== //

/**
 * FetchFields Component
 *
 * @component
 * @description
 * Renders a dynamic list of input fields using the `RenderField` component.
 * Allows for specific fields (by index) to be rendered inline (horizontally),
 * while others are rendered in a vertical stack.
 *
 * @param {InputField[]} fields - Array of field configuration objects to render.
 * @param {(index: number, value: string) => void} handleChange - Callback to handle field input changes.
 * @param {number[]} [inlineFields=[]] - Optional array of field indexes to display inline (side-by-side).
 *
 * @returns {JSX.Element} A list of rendered input fields, some inline and some stacked vertically.
 */
export default function FetchFields({
  fields,
  handleChange,
  inlineFields = [],
}: FetchFieldsProps): JSX.Element {
  return (
    <>
      {/* Inline fields section */}
      {inlineFields.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-8 w-full">
          {inlineFields.map((i) => (
            <RenderField
              key={fields[i].name}
              field={fields[i]}
              handleChange={handleChange}
              index={i}
            />
          ))}
        </div>
      )}

      {/* Remaining fields */}
      {fields.map((field, i) => {
        if (inlineFields.includes(i)) return null;
        return (
          <RenderField
            key={field.name}
            field={field}
            handleChange={handleChange}
            index={i}
          />
        );
      })}
    </>
  );
}
