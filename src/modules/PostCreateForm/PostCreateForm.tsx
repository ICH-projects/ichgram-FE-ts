import { useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";

import type { Post } from "../../typescript/types";

import type { AppDispatch } from "../../redux/store";
import { hideModal } from "../../redux/modal/modal-slice";

import useRequest from "../../shared/hooks/useRequest";
import { createPostApi } from "../../shared/api/post-api";

import { UploadIcon } from "../../shared/components/icons";
import TextEditor from "../../shared/components/TextEditor/TextEditor";
import Info from "../../shared/components/Info/Info";

import { fields, createPostSchema, type FormData } from "./fields";

import styles from "./PostCreateForm.module.css";

export default function PostCreateForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(createPostSchema),
    mode: "onChange",
  });
  const dispatch = useDispatch<AppDispatch>();

  const [imgSrc, setImgSrc] = useState<string | null>();
  const [message, setMessage] = useState<string | null>(null);
  const [reset, setReset] = useState(false);
  const { loading, error, sendRequest } = useRequest<Post>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setImgSrc(URL.createObjectURL(acceptedFiles[0]));
    setValue(fields.image.name as keyof FormData, acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  const handleOnSubmit = async (values: unknown) => {
    await sendRequest(() => createPostApi(values));
    if (!error) setMessage("Post successfully created. Form will closed");
    setReset((prev) => !prev);
    setValue(fields.image.name as keyof FormData, {});
    setImgSrc(null);
    setTimeout(() => {
      dispatch(hideModal());
    }, 2000);
  };

  return (
    <div className={styles.createPost}>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className={styles.form}
        id="postForm"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className={styles.header}>
          <h1 className={styles.title}>Create new post</h1>
          <button type="submit" className={styles.submit}>
            Share
          </button>
        </div>
        <div className={styles.uploadWrapper}>
          <div {...getRootProps()} className={styles.upload}>
            <input {...getInputProps()} />
            <div
              className={
                isDragActive
                  ? `${styles.dragIconWrapper} ${styles.isDragActive}`
                  : styles.dragIconWrapper
              }
            >
              {imgSrc ? (
                <img
                  src={imgSrc}
                  alt=""
                  className={
                    isDragActive
                      ? `${styles.preview} ${styles.isDragActive}`
                      : styles.preview
                  }
                />
              ) : (
                <UploadIcon className={styles.dragIcon} />
              )}
            </div>
          </div>
        </div>
        <div className={styles.textEditorWrapper}>
          <TextEditor
            register={register}
            {...fields.comment}
            name={fields.comment.name as keyof FormData}
            reset={reset}
          />
        </div>
        <div className={styles.messageWrapper}>
          <Info
            loading={loading}
            error={error?.response?.data.message || error?.message}
            message={`${message}`}
          />
          <Info
            error={
              (errors as unknown as { image?: { message?: string } }).image
                ?.message
            }
          />
        </div>
      </form>
    </div>
  );
}
