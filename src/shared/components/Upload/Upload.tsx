import { useEffect, useRef, type ChangeEvent } from "react";

import styles from "./Upload.module.css";
import type { FieldValues, UseFormSetValue } from "react-hook-form";

interface IUploadProps {
  className?: string;
  name: string;
  // setValue: UseFormSetValue<FieldValues>;
  setValue: (...args: [])=>void;
  reset: boolean;
}

export default function Upload({
  className = "",
  name,
  setValue,
  reset = true,
  ...props
}: IUploadProps) {
  const fullClassName = `${styles.upload} ${className}`;

  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imageRef.current) return;
    imageRef.current.src = "";
  }, [reset]);

  const handleOnFileUploadChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!imageRef.current) return;
    if (!event.target.files) return;
    const file = event.target.files[0];
    imageRef.current.src = URL.createObjectURL(file);
    setValue(name, file);
  };

  return (
    <div className={fullClassName}>
      <img alt="" className={styles.preview} ref={imageRef} />
      <div className={styles.modal}>
        <img
          src="/src/assets/icons/upload.svg"
          alt=""
          className={styles.icon}
        />

        <input
          {...props}
          onChange={handleOnFileUploadChange}
          className={styles.input}
        />
      </div>
    </div>
  );
}
