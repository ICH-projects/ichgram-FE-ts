import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import type { User } from "../../../typescript/types";

import IchgramLogo from "../../../shared/components/IchgramLogo/IchgramLogo";
import TextField from "../../../shared/components/TextField/TextField";
import Button from "../../../shared/components/Button/Button";
import Divider from "../../../shared/components/Divider/Divider";
import LinkApp from "../../../shared/components/LinkApp/LinkApp";

import { fields, defaultLoginValues } from "../fields";
import { loginSchema } from "../schemes";

import styles from "./AuthLoginForm.module.css";

interface IAuthLoginFormProps {
  handleOnSubmit: (user: User) => Promise<void> | void;
}

export default function AuthLoginForm({ handleOnSubmit }: IAuthLoginFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: defaultLoginValues,
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: User) => {
    handleOnSubmit(values);
    reset();
  };

  return (
    <div className={styles.authLoginForm}>
      <div className={styles.borderWrapper}>
        <IchgramLogo className={styles.logo} />

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <TextField
            className={styles.input}
            register={register}
            {...fields.email}
            error={errors.email?.message}
          />
          <TextField
            className={styles.input}
            register={register}
            {...fields.password}
            error={errors.password?.message}
          />
          <Button
            type="submit"
            variant="contained"
            className={styles.button}
            disabled={!isValid}
          >
            Log in
          </Button>
          <Divider>OR</Divider>
          <LinkApp to={"/auth/reset"} className={styles.resetLink}>
            Forgot password?
          </LinkApp>
        </form>
      </div>
      <div className={styles.borderWrapper}>
        <span className={styles.text}>Don't have an account? </span>
        <LinkApp to={"/auth/signup"} className={styles.signupLink}>
          Sign up?
        </LinkApp>
      </div>
    </div>
  );
}
