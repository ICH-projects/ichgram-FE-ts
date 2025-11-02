import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import LinkApp from "/src/shared/components/LinkApp/LinkApp";
import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import { confirmEmailApi } from "/src/shared/api/auth-api";
import useFetch from "/src/shared/hooks/useFetch";

import styles from "./AuthConfirmPage.module.css";

export default function ConfirmPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const { state, error, loading, fetchData } = useFetch();

  useEffect(() => {
    fetchData(() => confirmEmailApi(token));
    setTimeout(() => {
      navigate("/auth/login");
    }, 10000);
  }, []);

  return (
    <div className={styles.confirmPage}>
      <h2> Email Confirmation</h2>
      <LoadingErrorOutput
        message={state?.message}
        error={error}
        loading={loading}
      />
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
