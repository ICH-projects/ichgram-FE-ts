import type { ReactNode } from "react";

import styles from "./Badge.module.css";

interface IBadgeProps {
  className?: string;
  variant?: string;
  value?: number;
}

export default function Badge({
  className = "",
  variant = "",
  value = 0,
}: IBadgeProps): ReactNode {
  const fullClassName: string = `${styles.badge} ${className} ${styles[variant]}`;
  return <div className={fullClassName}>{value < 100 ? value : "+99"}</div>;
}
