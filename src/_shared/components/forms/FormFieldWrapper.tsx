// src/components/form/form-field-wrapper.tsx
import type { ReactNode } from "react";
import {
  Controller,
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

interface FormFieldWrapperProps<TFieldValues extends FieldValues> {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  label?: ReactNode;
  description?: ReactNode;
  required?: boolean;
  children: (params: {
    field: any;
    fieldState: any;
  }) => ReactNode;
}

export function FormFieldWrapper<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  children,
}: FormFieldWrapperProps<TFieldValues>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          {label && (
            <label className="text-sm font-medium">
              {label}
              {required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </label>
          )}

          {children({ field, fieldState })}

          {description && (
            <p className="text-xs text-muted-foreground">
              {description}
            </p>
          )}

          {fieldState.error && (
            <p className="text-xs text-destructive">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
