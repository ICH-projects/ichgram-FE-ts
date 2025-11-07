import { useEffect, useRef, type ChangeEvent } from "react";

import styles from "./Upload.module.css";
import type { UseFormSetValue, FieldValues, Path } from "react-hook-form";

// import { type FormData } from "../../../modules/PostCreateForm/fields";

interface IUploadProps<TFieldValues extends FieldValues> {
  className?: string;
  name: Path<TFieldValues>;
  setValue: UseFormSetValue<TFieldValues>;
  // setValue: UseFormSetValue<FieldValues>;
  // setValue: UseFormSetValue<FormData>;
  // setValue: (name:  unknown, value: unknown, options?: unknown)=>void;
  // setValue: () => void;
  reset: boolean;
}

export default function Upload<TFieldValues extends FieldValues>({
  className = "",
  name,
  setValue,
  reset = true,
  ...props
}: IUploadProps<TFieldValues>) {
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
    // setValue(name as keyof FieldValues, file);
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
