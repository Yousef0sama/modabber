// Components
import TextField from "@mui/material/TextField";

// Interfaces
import { InputField } from "@/interfaces/interfaces";

// Helpers
import { labelsMap } from "@/constants/labels";
import { getInputType, getAutoComplete } from "@/utils/fields";

type Props = {
  fields: InputField[];
  handleChange: (index: number, value: string) => void;
  inlineFields?: number[]; // indexes of fields to display inline
};

export default function FetchFields({
  fields,
  handleChange,
  inlineFields = [],
}: Props) {
  const renderField = (field: InputField, index: number) => (
    <TextField
      key={field.name}
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

  return (
    <>
      {inlineFields.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-8 w-full">
          {inlineFields.map((i) => renderField(fields[i], i))}
        </div>
      )}

      {fields.map((field, i) => {
        if (inlineFields.includes(i)) return null;
        return renderField(field, i);
      })}
    </>
  );
}
