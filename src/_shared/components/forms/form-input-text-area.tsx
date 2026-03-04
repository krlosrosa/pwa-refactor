// src/components/form/form-textarea.tsx
import type { FieldValues, FieldPath, Control } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface FormTextAreaProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  required?: boolean;
  textareaProps?: React.ComponentProps<typeof Textarea>;
}

export function FormTextArea<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  textareaProps,
}: FormTextAreaProps<T>) {
  return (
    <FormFieldWrapper
      control={control}
      name={name}
      label={label}
      description={description}
      required={required}
    >
      {({ field, fieldState }) => (
        <Textarea
          {...field}
          {...textareaProps}
          aria-invalid={fieldState.invalid}
        />
      )}
    </FormFieldWrapper>
  );
}
