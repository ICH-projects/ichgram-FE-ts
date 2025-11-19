import { useSelector, useDispatch } from "react-redux";

import AuthLoginForm from "../../../modules/auth/AuthLoginForm/AuthLoginForm";
import BannerPhone from "../../../shared/components/BannerPhone/BannerPhone";

import type { AppDispatch } from "../../../redux/store";
import { loginUser } from "../../../redux/auth/auth-thunks";
import { selectAuth } from "../../../redux/auth/auth-selectors";

import type { User } from "../../../typescript/types";

import styles from "./AuthLoginPage.module.css";

export default function AuthLoginPage() {
  const { loading, error, message } = useSelector(selectAuth);
  const dispatch = useDispatch<AppDispatch>();

  const handleOnSubmit = async (values: User): Promise<void> => {
    dispatch(loginUser(values));
  };

  return (
    <div className={styles.authLoginPage}>
      <div className={styles.gridWrapper}>
        <BannerPhone />
        <AuthLoginForm
          handleOnSubmit={handleOnSubmit}
          error={error}
          loading={loading}
          message={message}
        />
      </div>
    </div>
  );
}
