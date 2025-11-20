import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { type AppDispatch } from "../../../redux/store";

import { selectAuthServiceData } from "../../../redux/auth/auth-selectors";
import { confirmEmail } from "../../../redux/auth/auth-thunks";

import LinkApp from "../../../shared/components/LinkApp/LinkApp";
import Info from "../../../shared/components/Info/Info";

import styles from "./AuthConfirmationPage.module.css";

export default function AuthConfirmationPage() {
  const [searchParams] = useSearchParams();
  const token: string | null = searchParams.get("token");
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading, message } = useSelector(selectAuthServiceData);

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    dispatch(confirmEmail(token));
    setTimeout(() => {
      navigate("/auth/login");
    }, 10000);
  }, [dispatch, navigate, token]);

  return (
    <div className={styles.confirmationPage}>
      <h2> Email Confirmation</h2>
      <Info message={message} error={error} loading={loading} />
      <div className={styles.info}>
        <p>
          You will be automatically redirected to the login page after 10 sec.
        </p>
        <p>If you are not redirected, click the link below.</p>
        <p>
          <LinkApp to={"/auth/login"} className={styles.signupLink}>
            Log in
          </LinkApp>
        </p>
      </div>
    </div>
  );
}
