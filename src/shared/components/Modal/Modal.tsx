import type { JSX } from "react";
import styles from "./Modal.module.css";

interface IModalProps {
  className?: string;
  variant?: string;
  hidden?: boolean;
  onClickHandle?: () => void;
  children?: (JSX.Element | string)[] | JSX.Element | string | undefined;
}

export default function Modal({
  className = "",
  variant = "",
  hidden = true,
  onClickHandle,
  children,
}: IModalProps) {
  const fullClassName = `${styles.modal} ${className} ${styles[variant]}`;
  return (
    <div className={fullClassName} hidden={hidden} onClick={onClickHandle}>
      {children}
    </div>
  );
}
