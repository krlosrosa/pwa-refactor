// src/components/form/form-input.tsx
import type { FieldValues, FieldPath, Control } from "react-hook-form";
import { Input } from "../ui/input";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  required?: boolean;

  type?: "text" | "number";
  valueAsNumber?: boolean;

  inputProps?: Omit<
    React.ComponentProps<typeof Input>,
    "name" | "value" | "onChange"
  >;
}

export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  type = "text",
  valueAsNumber = false,
  inputProps,
}: FormInputProps<T>) {
  return (
    <FormFieldWrapper
      control={control}
      name={name}
      label={label}
      description={description}
      required={required}
    >
      {({ field, fieldState }) => (
        <Input
          {...field}
          {...inputProps}
          type={type}
          aria-invalid={fieldState.invalid}
          onChange={(e) => {
            if (type === "number" && valueAsNumber) {
              const value =
                e.target.value === ""
                  ? undefined
                  : Number(e.target.value);

              field.onChange(value);
            } else {
              field.onChange(e.target.value);
            }
          }}
        />
      )}
    </FormFieldWrapper>
  );
}
