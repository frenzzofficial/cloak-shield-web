"use client";
import type { Path, UseFormRegister } from "react-hook-form";

interface SelectProps<T extends Record<string, unknown>> {
  id: string;
  label?: string;
  options: { label: string; value: string }[];
  required?: boolean;
  register: UseFormRegister<T>;
  errorMessage?: string;
}

const Select = <T extends Record<string, unknown>>({
  id,
  label,
  options,
  required = false,
  register,
  errorMessage,
}: SelectProps<T>) => {
  return (
    <div className="select-wrapper">
      {label && (
        <label htmlFor={id} className="select-label">
          {label}
        </label>
      )}

      <select
        id={id}
        {...register(id as Path<T>)}
        required={required}
        className={`select-input ${errorMessage ? "select-error" : ""}`}
        aria-invalid={!!errorMessage}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {errorMessage && (
        <span id={`${id}-error`} className="select-error-message">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default Select;
