import type { ReactNode } from "react";

import styles from "./TemplateName.module.css";

interface ITemplateNameProps {
  className?: string;
  variant?: string;
}

export default function TemplateName({
  className = "",
  variant = "",
}: ITemplateNameProps): ReactNode {
  const fullClassName: string = `${styles.templateName} ${className} ${styles[variant]}`;
  return <div className={fullClassName}>TemplateName</div>;
}
