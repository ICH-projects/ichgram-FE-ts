import { Link } from "react-router-dom";

import styles from "./LinkApp.module.css";
import type { ReactNode } from "react";
interface ILinkAppProps {
  className?: string;
  variant?: string;
  children?: ReactNode;
  to: string;
}

export default function LinkApp({
  className = "",
  variant = "",
  children,
  ...props
}: ILinkAppProps) {
  const fullClassName = `${styles.linkApp} ${className} ${styles[variant]}`;
  return (
    <Link className={fullClassName} {...props}>
      {children}
    </Link>
  );
}
