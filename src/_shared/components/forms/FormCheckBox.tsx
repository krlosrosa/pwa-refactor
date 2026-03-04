// src/components/form/form-checkbox.tsx
import type { FieldValues, FieldPath, Control } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface FormCheckboxProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  description?: string;
  required?: boolean;
}

export function FormCheckbox<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
}: FormCheckboxProps<T>) {
  return (
    <FormFieldWrapper
      control={control}
      name={name}
      description={description}
      required={required}
    >
      {({ field }) => (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={!!field.value}
            onCheckedChange={field.onChange}
          />
          <label className="text-sm font-medium">{label}</label>
        </div>
      )}
    </FormFieldWrapper>
  );
}
