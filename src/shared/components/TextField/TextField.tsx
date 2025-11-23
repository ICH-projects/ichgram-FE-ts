import type { FieldValues, UseFormRegister } from "react-hook-form";
import type { ReactNode } from "react";

import styles from "./TextField.module.css";

interface ITextFieldProps {
  variant?: string;
  className?: string;
  register?: unknown;
  showError?: boolean;
  name: string;
  error?: string | null | undefined;
  ariaLabel?: string;
  dataTestId?: string;
}

export default function TextField({
  variant = "",
  className = "",
  register,
  showError = true,
  name,
  error,
  ariaLabel,
  dataTestId,
  ...props
}: ITextFieldProps): ReactNode {
  const fullClassName = `${styles.input} ${styles[variant]} ${className}`;

  return (
    <div className={styles.textField}>
      <input
        {...(register as UseFormRegister<FieldValues>)(name)}
        {...props}
        className={fullClassName}
        aria-label={ariaLabel}
        data-testId={dataTestId}
      />
      {showError && !!error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
