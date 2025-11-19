import { useDispatch, useSelector } from "react-redux";

import EditProfile from "/src/modules/EditProfile/EditProfile";

import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import { selectAuth } from "/src/redux/auth/auth-selectors";
import { updateUser } from "/src/redux/auth/auth-thunks";

import styles from "./ProfileEditPage.module.css";

export default function ProfileEditPage() {
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector(selectAuth);

  const updateProfile = async (payload) => {
    dispatch(updateUser(payload));
  };

  return (
    <div className={styles.profileEditPage}>
      <LoadingErrorOutput error={error} loading={loading} />
      <EditProfile user={user} updateProfile={updateProfile} />
    </div>
  );
}
