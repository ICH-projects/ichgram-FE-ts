import { useSelector, useDispatch } from "react-redux";

import AuthLoginForm from "../../../modules/auth/AuthLoginForm/AuthLoginForm";
import BannerPhone from "../../../shared/components/BannerPhone/BannerPhone";

import type { AppDispatch } from "../../../redux/store";
import { loginUser } from "../../../redux/auth/auth-thunks";
import { selectAuthServiceData } from "../../../redux/auth/auth-selectors";

import type { User } from "../../../typescript/types";

import styles from "./AuthLoginPage.module.css";
import Info from "../../../shared/components/Info/Info";

export default function AuthLoginPage() {
  const { loading, error, message } = useSelector(selectAuthServiceData);
  const dispatch = useDispatch<AppDispatch>();

  const handleOnSubmit = async (values: User): Promise<void> => {
    dispatch(loginUser(values));
  };

  console.log(error);

  return (
    <div className={styles.authLoginPage}>
      <div className={styles.gridWrapper}>
        <BannerPhone />
        <AuthLoginForm handleOnSubmit={handleOnSubmit} />
      </div>
      <Info loading={loading} error={error} message={message} />
    </div>
  );
}
