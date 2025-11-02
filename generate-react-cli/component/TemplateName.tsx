import type { JSX } from "react";

import styles from "./TemplateName.module.css";

export default function TemplateName({
  className = "",
  variant = "",
}: {
  className: string;
  variant: string;
}): JSX.Element {
  const fullClassName: string = `${styles.templateName} ${className} ${styles[variant]}`;
  return <div className={fullClassName}>TemplateName</div>;
}
