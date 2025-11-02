import type { FieldValues, UseFormRegister } from "react-hook-form";
import styles from "./TextField.module.css";

export default function TextField({
  variant = "",
  className = "",
  register,
  showError = true,
  name,
  error,
  ...props
}:{
  variant?: string,
  className?: string,
  register?: unknown,
  showError?:boolean,
  name: string,
  error:string | null | undefined,
}) {
  const fullClassName = `${styles.input} ${styles[variant]} ${className}`;

  return (
    <div className={styles.textField}>
      <input {...(register as UseFormRegister<FieldValues>)(name)} {...props} className={fullClassName} />
      {showError && !!error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
