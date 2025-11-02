import { Link } from "react-router-dom";

import styles from "./LinkApp.module.css";

export default function LinkApp({
  className,
  variant = "",
  children,
  ...props
}) {
  const fullClassName = `${styles.linkApp} ${className} ${styles[variant]}`;
  return (
    <Link className={fullClassName} {...props}>
      {children}
    </Link>
  );
}
