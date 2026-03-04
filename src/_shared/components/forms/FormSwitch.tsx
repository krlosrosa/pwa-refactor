// src/components/form/form-toggle.tsx
import type { FieldValues, FieldPath, Control } from "react-hook-form";
import { Switch } from "../ui/switch";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface FormToggleProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  required?: boolean;
}

export function FormToggle<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
}: FormToggleProps<T>) {
  return (
    <FormFieldWrapper
      control={control}
      name={name}
      label={label}
      description={description}
      required={required}
    >
      {({ field }) => (
        <Switch
          checked={!!field.value}
          onCheckedChange={field.onChange}
        />
      )}
    </FormFieldWrapper>
  );
}
