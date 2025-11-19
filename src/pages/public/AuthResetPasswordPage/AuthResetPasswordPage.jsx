import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import AuthResetPasswordForm from "/src/modules/AuthResetPasswordForm/AuthResetPasswordForm";

import { resetPassword, updatePassword } from "/src/redux/auth/auth-thunks";
import { selectAuth } from "/src/redux/auth/auth-selectors";

import styles from "./AuthResetPasswordPage.module.css";

export default function AuthResetPasswordPage() {
  const [searchParams, _] = useSearchParams();
  const { loading, error, message } = useSelector(selectAuth);
  const token = searchParams.get("token");
  // const token = error ? null : searchParams.get("token");
  const dispatch = useDispatch();

  const handleOnSubmitEmail = async (values) => {
    dispatch(resetPassword(values));
  };

  const handleOnSubmitNewPassword = async (values) => {
    dispatch(updatePassword({ values, token }));
  };

  return (
    <div className={styles.authResetPasswordPage}>
      <AuthResetPasswordForm
        handleOnSubmitEmail={handleOnSubmitEmail}
        handleOnSubmitNewPassword={handleOnSubmitNewPassword}
        resetToken={token}
        error={error}
        loading={loading}
        message={message}
      />
    </div>
  );
}
