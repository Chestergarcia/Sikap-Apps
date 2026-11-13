import { useId, type InputHTMLAttributes } from "react";

type TextFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  error?: string;
  helpText?: string;
  id?: string;
  label: string;
};

export function TextField({
  error,
  helpText,
  id,
  label,
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = `${inputId}-description`;

  return (
    <label className="text-field" htmlFor={inputId}>
      <span className="text-field__label">{label}</span>
      <input
        aria-describedby={helpText || error ? descriptionId : undefined}
        aria-invalid={Boolean(error)}
        className="text-field__input"
        id={inputId}
        {...inputProps}
      />
      {error || helpText ? (
        <span className="text-field__help" id={descriptionId}>
          {error ?? helpText}
        </span>
      ) : null}
    </label>
  );
}
