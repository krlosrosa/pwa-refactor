// src/components/form/form-combobox.tsx
import type { FieldValues, FieldPath, Control } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";

import { cn } from "@/_shared/lib/utils";
import { FormFieldWrapper } from "./FormFieldWrapper";

interface Option {
  value: string;
  label: string;
}

interface FormComboboxProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  required?: boolean;
  options: Option[];
}

export function FormCombobox<T extends FieldValues>({
  control,
  name,
  label,
  description,
  required,
  options,
}: FormComboboxProps<T>) {
  return (
    <FormFieldWrapper
      control={control}
      name={name}
      label={label}
      description={description}
      required={required}
    >
      {({ field }) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              {field.value
                ? options.find((opt) => opt.value === field.value)?.label
                : "Selecionar..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Buscar..." />
              <CommandEmpty>Nenhum resultado.</CommandEmpty>
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    key={opt.value}
                    onSelect={() => field.onChange(opt.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        field.value === opt.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {opt.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      )}
    </FormFieldWrapper>
  );
}
