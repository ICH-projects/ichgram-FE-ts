import type { JSX } from "react";
import styles from "./Divider.module.css";

export default function Divider({
  className = "",
  variant = "",
  children = "",
}: {
  className?: string;
  variant?: string;
  children?: (JSX.Element | string)[] | string;
}) {
  const fullClassName = `${styles.divider} ${className} ${
    variant && styles[variant]
  }`;
  return (
    <div className={fullClassName}>
      <div className={styles.border}></div>
      <div className={styles.children}>{children}</div>
      <div className={styles.border}></div>
    </div>
  );
}
