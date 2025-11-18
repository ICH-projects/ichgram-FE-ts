import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, type ReactNode } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { User } from "../../typescript/types";
import { type AppDispatch } from "../../redux/store";

import { selectUser } from "../../redux/auth/auth-selectors";
import { updateUser } from "../../redux/profile/profile-thunks";

import Button from "../../shared/components/Button/Button";
import TextField from "../../shared/components/TextField/TextField";
import Info from "../../shared/components/Info/Info";

import { fields, editProfileSchema, type FormData } from "./fields";

import styles from "./ProfileEditForm.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function ProfileEditForm(): ReactNode {
  const user: User = useSelector(selectUser)!;
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(editProfileSchema),
    mode: "onChange",
  });
  const avatarRef = useRef(null);

  useEffect(() => {
    setValue(
      fields.username.name as keyof FormData,
      user.username ? user.username : ""
    );
    setValue(
      fields.website.name as keyof FormData,
      user.website ? user.website : ""
    );
    setValue(fields.about.name as keyof FormData, user.about ? user.about : "");
  }, [user, setValue]);

  const handleOnFileUploadChange = (event: unknown) => {
    // const file = event.target.files[0];
    // avatarRef.current.src = URL.createObjectURL(file);
    // setValue(fields.avatar.name, file);
  };

  const handleOnSubmit = (values: unknown) => {
    dispatch(updateUser(values as User));
  };

  return (
    <div
      className={styles.editProfile}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <h1 className={styles.title}>Edit profile</h1>
      <div className={styles.header}>
        <div className={styles.userInfoWrapper}>
          <div className={styles.avatarWrapper}>
            <img
              ref={avatarRef}
              src={`${baseURL}/${user?.avatar}`}
              alt=""
              className={styles.avatar}
            />
          </div>
          <div className={styles.infoWrapper}>
            <p className={styles.username}>{user?.username}</p>
            <p className={styles.about}>{user?.about}</p>
          </div>
        </div>

        <input
          id="file-upload"
          {...register(fields.avatar.name as keyof FormData)}
          {...fields.avatar}
          className={styles.fileInput}
          form="editProfileForm"
          onChange={handleOnFileUploadChange}
        />
        <label
          htmlFor="file-upload"
          form="editProfileForm"
          className={styles.fileInputLabel}
        >
          New photo
        </label>
      </div>
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className={styles.form}
        id="editProfileForm"
      >
        <h2 className={styles.fieldTitle}>Username</h2>
        <TextField
          variant="outlined"
          className={styles.textInput}
          register={register}
          {...fields.username}
          error={errors?.username?.message}
        />
        <h2 className={styles.fieldTitle}>Website</h2>
        <TextField
          variant="outlined"
          className={styles.textInput}
          register={register}
          {...fields.website}
          error={errors?.website?.message}
        />
        <h2 className={styles.fieldTitle}>About</h2>
        <textarea
          {...register(fields.about.name as keyof FormData)}
          {...fields.about}
          className={styles.textarea}
        />
        <Info error={errors?.about?.message} />

        <Button type="submit" variant="contained" className={styles.btnSave}>
          Save
        </Button>
      </form>
    </div>
  );
}
