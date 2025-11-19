import { useSelector, useDispatch } from "react-redux";

import AuthSignupForm from "/src/modules/AuthSignupForm/AuthSignupForm";

import { registerUser } from "/src/redux/auth/auth-thunks";
import { selectAuth } from "/src/redux/auth/auth-selectors";

import styles from "./AuthSignupPage.module.css";

export default function AuthSignupPage() {
  const { loading, error, message } = useSelector(selectAuth);
  const dispatch = useDispatch();

  const handleOnSubmit = async (values) => {
    dispatch(registerUser(values));
  };

  return (
    <div className={styles.authSignupPage}>
      <AuthSignupForm
        handleOnSubmit={handleOnSubmit}
        error={error}
        loading={loading}
        message={message}
      />
    </div>
  );
}
