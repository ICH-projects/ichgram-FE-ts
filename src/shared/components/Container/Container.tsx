import type { JSX } from "react";

import styles from "./Container.module.css";

export default function Container({
  className = "",
  variant = "",
}: {
  className: string;
  variant: string;
}): JSX.Element {
  const fullClassName: string = `${styles.container} ${className} ${styles[variant]}`;
  return <div className={fullClassName}>Container</div>;
}
