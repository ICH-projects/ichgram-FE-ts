import type { ReactNode } from "react";

import { EndIcon } from "../../../shared/components/icons";

import styles from "./End.module.css";

interface IEnd {
  className?: string;
  variant?: string;
}

export default function End({ className = "", variant = "" }: IEnd): ReactNode {
  const fullClassName: string = `${styles.end} ${className} ${styles[variant]}`;
  return (
    <div className={fullClassName}>
        <EndIcon className={styles.endIcon} />
        <h1 className={styles.endTitle}>You've seen all the updates</h1>
        <h1 className={styles.endText}>You have viewed all new publications</h1>
    </div>
  );
}
