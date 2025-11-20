import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import type { AppDispatch } from "../../../redux/store";

import { selectAuthServiceData } from "../../../redux/auth/auth-selectors";
import { resetPassword, updatePassword } from "../../../redux/auth/auth-thunks";

import AuthResetPasswordForm from "../../../modules/auth/AuthResetPasswordForm/AuthResetPasswordForm";
import AuthUpdatePasswordForm from "../../../modules/auth/AuthUpdatePasswordForm/AuthUpdatePasswordForm";

import Info from "../../../shared/components/Info/Info";

import styles from "./AuthResetPasswordPage.module.css";

export default function AuthResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, message } = useSelector(selectAuthServiceData);
  const navigate = useNavigate();


  const onSubmitEmailHandler = async (email: string) => {
    dispatch(resetPassword(email));
  };

  const onSubmitNewPasswordHandler = async (password: string) => {
    if (!token) return;
    await dispatch(updatePassword({ password, token }));
    if (!error) navigate("/auth/login");
  };

  return (
    <div className={styles.authResetPasswordPage}>
      {!token ? (
        <AuthResetPasswordForm onSubmitHandler={onSubmitEmailHandler} />
      ) : (
        <AuthUpdatePasswordForm onSubmitHandler={onSubmitNewPasswordHandler} />
      )}
      <Info loading={loading} error={error} message={message} />
    </div>
  );
}
