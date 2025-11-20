import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import type { User } from "../../../typescript/types";

import IchgramLogo from "../../../shared/components/IchgramLogo/IchgramLogo";
import TextField from "../../../shared/components/TextField/TextField";
import Button from "../../../shared/components/Button/Button";
import LinkApp from "../../../shared/components/LinkApp/LinkApp";

import { fields, defaultSignupValues } from "../fields";
import { signupSchema } from "../schemes";

import styles from "./AuthSignupForm.module.css";

interface IAuthSignupFormProps {
  signupHandler: (user: User) => void;
}

export default function AuthSignupForm({
  signupHandler,
}: IAuthSignupFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: defaultSignupValues,
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: unknown) => {
    signupHandler(values as User);
    reset();
  };

  return (
    <div className={styles.authSignupForm}>
      <div className={styles.borderWrapper}>
        <IchgramLogo className={styles.logo} />
        <div className={styles.titleWrapper}>
          <p className={styles.title}>Sign up to see photos and videos</p>
          <p className={styles.title}>from your friends.</p>
        </div>

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
            {...fields.fullname}
            error={errors.fullname?.message}
          />
          <TextField
            className={styles.input}
            register={register}
            {...fields.username}
            error={errors.username?.message}
          />
          <TextField
            className={styles.input}
            register={register}
            {...fields.password}
            error={errors.password?.message}
          />

          <div className={styles.infoWrapper}>
            <p className={styles.info}>
              People who use our service may have uploaded your contact
              information to Ichgram.&nbsp;
              <LinkApp to={"/learn-more"} className={styles.infoLink}>
                Learn More
              </LinkApp>
            </p>
            <p className={styles.info}>
              By signing up, you agree to our&nbsp;
              <LinkApp to={"/terms"} className={styles.learnMoreLink}>
                Terms
              </LinkApp>
              ,&nbsp;
              <LinkApp to={"/privacy-policy"} className={styles.learnMoreLink}>
                Privacy Policy
              </LinkApp>
              &nbsp;and&nbsp;
              <LinkApp to={"/cookies-policy"} className={styles.learnMoreLink}>
                Cookies Policy
              </LinkApp>
            </p>
          </div>

          <Button
            type="submit"
            variant="contained"
            className={styles.button}
            disabled={!isValid}
          >
            Sign up
          </Button>
        </form>
      </div>
      <div className={styles.borderWrapper}>
        <span className={styles.text}>Have an account? </span>
        <LinkApp to={"/auth/login"} className={styles.signupLink}>
          Log in
        </LinkApp>
      </div>
    </div>
  );
}
