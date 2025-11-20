import { useSelector, useDispatch } from "react-redux";

import type { AppDispatch } from "../../../redux/store";
import type { User } from "../../../typescript/types";

import { signupUser } from "../../../redux/auth/auth-thunks";
import { selectAuthServiceData } from "../../../redux/auth/auth-selectors";

import AuthSignupForm from "../../../modules/auth/AuthSignupForm/AuthSignupForm";
import Info from "../../../shared/components/Info/Info";

import styles from "./AuthSignupPage.module.css";

export default function AuthSignupPage() {
  const { loading, error, message } = useSelector(selectAuthServiceData);
  const dispatch = useDispatch<AppDispatch>();

  const signupHandler = async (values: User) => {
    dispatch(signupUser(values));
  };

  return (
    <div className={styles.authSignupPage}>
      <AuthSignupForm signupHandler={signupHandler} />
      <Info loading={loading} error={error} message={message} />
    </div>
  );
}
