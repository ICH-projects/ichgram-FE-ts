import { useForm, type FieldErrors, type FieldValues } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import type { Post } from "../../typescript/types";

import useRequest from "../../shared/hooks/useRequest";
import { createPostApi } from "../../shared/api/post-api";

import Upload from "../../shared/components/Upload/Upload";
import TextEditor from "../../shared/components/TextEditor/TextEditor";
import Info from "../../shared/components/Info/Info";

import { fields, createPostSchema } from "./fields";

import styles from "./PostCreateForm.module.css";

interface IPostCreateFormProps {
  closeForm: () => void;
}

export default function PostCreateForm({ closeForm }: IPostCreateFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createPostSchema),
    mode: "onChange",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [reset, setReset] = useState(false);
  const { loading, error, sendRequest } = useRequest<Post>();

  const handleOnSubmit = async (values: FieldValues) => {
    await sendRequest(() => createPostApi(values));
    if (!error) setMessage("Post successfully created. Form will closed");
    setTimeout(() => {
      closeForm();
    }, 5000);
  };

  return (
    <div
      className={styles.createPost}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className={styles.form}
        id="postForm"
      >
        <div className={styles.header}>
          <h1 className={styles.title}>Create new post</h1>
          <button type="submit" className={styles.submit}>
            Share
          </button>
        </div>
        <div className={styles.uploadWrapper}>
          <Upload
            {...fields.image}
            setValue={setValue}
            reset={reset}
            // form="postForm"
          />
        </div>
        <div className={styles.textEditorWrapper}>
          <TextEditor register={register} {...fields.comment} reset={reset} />
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
