import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { type AppDispatch } from "../../redux/store";
import { getProfileById } from "../../redux/profile/profile-thunks";
import { selectProfileServiceData } from "../../redux/profile/profile-selectors";

import Profile from "../../modules/Profile/Profile";

import Info from "../../shared/components/Info/Info";

import styles from "./ProfilePage.module.css";


export default function ProfilePage() {
  const profileId: number = Number(useParams().id);
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading, message } = useSelector(selectProfileServiceData);

  useEffect(() => {
    dispatch(getProfileById(profileId));
  }, [dispatch, profileId]);

  return (
    <div className={styles.profilePage}>
      <Info error={error} loading={loading} message={message} />
      <Profile  />
      {/* <Explore posts={postData?.posts} variant={"profile"} /> */}
    </div>
  );
}
