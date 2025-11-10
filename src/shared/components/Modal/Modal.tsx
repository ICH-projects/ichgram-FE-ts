import type { ReactNode } from "react";
import {  useDispatch } from "react-redux";

import type { AppDispatch } from "../../../redux/store";
import { hideModal } from "../../../redux/modal/modal-slice";

import styles from "./Modal.module.css";

interface IModalProps {
  className?: string;
  variant?: string;
  hidden?: boolean;
  children?: ReactNode;
  ref?: React.RefObject<HTMLDivElement | null>;
}

export default function Modal({
  className = "",
  variant = "",
  hidden = true,
  children,
  ref,
}: IModalProps) {
  const dispatch = useDispatch<AppDispatch>();

  const fullClassName = `${styles.modal} ${className} ${styles[variant]}`;
  return (
    <div
      className={fullClassName}
      hidden={hidden}
      onClick={() => dispatch(hideModal())}
      ref={ref}
    >
      {children}
    </div>
  );
}
