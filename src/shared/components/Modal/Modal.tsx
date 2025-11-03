import type { JSX } from "react";
import styles from "./Modal.module.css";

export default function Modal({
  className = "",
  variant = "",
  hidden = true,
  onClickHandle = () => {},
  children = "",
}: {
  className?: string;
  variant?: string;
  hidden?: boolean;
  onClickHandle?: () => void;
  children?: (JSX.Element | string)[] | JSX.Element | string;
}) {
  const fullClassName = `${styles.modal} ${className} ${styles[variant]}`;
  return (
    <div className={fullClassName} hidden={hidden} onClick={onClickHandle}>
      {children}
    </div>
  );
}
