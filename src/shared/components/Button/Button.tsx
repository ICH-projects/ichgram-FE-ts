import type { ReactNode } from "react";
import styles from "./Button.module.css";

interface IButtonProps {
  variant?: string;
  className?: string;
  active?: boolean;
  children?: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  handleClick?: (...args: unknown[]) => void;
  disabled?: boolean;
}

export default function Button({
  variant = "text",
  className = "",
  active = false,
  children,
  handleClick = () => {},
  ...props
}: IButtonProps) {
  const fullClassName = `${styles.button} ${styles[variant]} ${
    active && styles.active
  } ${className}`;

  return (
    <button className={fullClassName} onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
