import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import ClosedIcon from "../../../shared/components/icons/ClosedIcon";
import TextField from "../../../shared/components/TextField/TextField";
import Button from "../../../shared/components/Button/Button";
import Divider from "../../../shared/components/Divider/Divider";
import LinkApp from "../../../shared/components/LinkApp/LinkApp";

import { fields, defaultResetPasswordValues } from "../fields";
import { emailSchema, type EmailFormData } from "../schemes";

import styles from "./AuthResetPasswordForm.module.css";

interface IAuthResetPasswordFormProps {
  onSubmitHandler: (email: string) => Promise<void> | void;
}

export default function AuthResetPasswordForm({
  onSubmitHandler,
}: IAuthResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: defaultResetPasswordValues,
    resolver: yupResolver(emailSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: EmailFormData) => {
    onSubmitHandler(values.email);
    reset();
  };

  return (
    <div className={styles.authResetPasswordForm}>
      <div className={styles.borderWrapper}>
        <ClosedIcon className={styles.logo} />
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>Trouble logging in?</h3>
          <p className={styles.titleText}>
            Enter your email, phone, or username and we'll send you a link to
            get back into your account.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <TextField
            className={styles.input}
            register={register}
            {...fields.email}
            error={errors.email?.message}
          />
          <Button
            type="submit"
            variant="contained"
            className={styles.button}
            disabled={!isValid}
          >
            Reset your password
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
