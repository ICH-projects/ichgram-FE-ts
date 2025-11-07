import type {  ReactNode } from "react";
import styles from "./Modal.module.css";

interface IModalProps {
  className?: string;
  variant?: string;
  hidden?: boolean;
  onClickHandle?: () => void;
  children?: ReactNode;
  ref: React.RefObject<HTMLDivElement | null>
}

export default function Modal({
  className = "",
  variant = "",
  hidden = true,
  onClickHandle,
  children,
  ref,
}: IModalProps) {
  const fullClassName = `${styles.modal} ${className} ${styles[variant]}`;
  return (
    <div className={fullClassName} hidden={hidden} onClick={onClickHandle} ref={ref}>
      {children}
    </div>
  );
}
