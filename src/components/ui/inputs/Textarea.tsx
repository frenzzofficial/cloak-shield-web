import React from "react";
import "@/styles/ui/input.css";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className = "", id, rows = 4, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div className="input-wrapper">
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          id={inputId}
          rows={rows}
          className={`input input-textarea relative ${error ? "input-error" : ""} ${className}`}
          {...props}
        />

        {error && <span className="input-error-text">{error}</span>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
