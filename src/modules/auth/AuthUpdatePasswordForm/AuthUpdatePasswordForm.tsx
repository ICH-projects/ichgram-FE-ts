import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import ClosedIcon from "../../../shared/components/icons/ClosedIcon";
import TextField from "../../../shared/components/TextField/TextField";
import Button from "../../../shared/components/Button/Button";
import Divider from "../../../shared/components/Divider/Divider";
import LinkApp from "../../../shared/components/LinkApp/LinkApp";

import { fields, defaultUpdatePasswordValues } from "../fields";
import { type UpdatePasswordFormData, updatePasswordSchema } from "../schemes";

import styles from "./AuthUpdatePasswordForm.module.css";

interface IAuthUpdatePasswordFormProps {
  onSubmitHandler: (password: string) => Promise<void> | void;
}

export default function AuthUpdatePasswordForm({
  onSubmitHandler,
}: IAuthUpdatePasswordFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: defaultUpdatePasswordValues,
    resolver: yupResolver(updatePasswordSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: UpdatePasswordFormData) => {
    onSubmitHandler(values.password);
    reset();
  };

  return (
    <div className={styles.authResetPasswordForm}>
      <div className={styles.borderWrapper}>
        <ClosedIcon className={styles.logo} />
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>Trouble logging in?</h3>
          <p className={styles.titleText}>Enter new password</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <TextField
            className={styles.input}
            register={register}
            {...fields.password}
            error={errors.password?.message}
          />
          <TextField
            className={styles.input}
            register={register}
            {...fields.confirmPassword}
            error={errors.confirmPassword?.message}
          />
          <Button
            type="submit"
            variant="contained"
            className={styles.button}
            disabled={!isValid}
          >
            Update password
          </Button>
          <Divider>OR</Divider>
          <LinkApp to={"/auth/signup"} className={styles.signupLink}>
            Create new account
          </LinkApp>
        </form>
      </div>
      <div className={styles.borderWrapper}>
        <LinkApp to={"/auth/login"} className={styles.loginLink}>
          Back to login
        </LinkApp>
      </div>
    </div>
  );
}
