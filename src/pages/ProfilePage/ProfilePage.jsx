import { useCallback } from "react";
import { useParams } from "react-router-dom";

import ViewProfile from "/src/modules/ViewProfile/ViewProfile";
import Explore from "/src/modules/Explore/Explore";

import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import useFetch from "/src/shared/hooks/temp/useFetch";
import { getUserByIdApi } from "/src/shared/api/user-api";
import { findPostsApi } from "/src/shared/api/post-api";

import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const profileId = useParams().id;
  const getUserByIdApiCallback = useCallback(
    () => getUserByIdApi(profileId),
    [profileId]
  );
  const findPostsApiCallback = useCallback(
    () => findPostsApi({ userId: profileId }),
    [profileId]
  );
  const {
    state: userData,
    error: userError,
    loading: userLoading,
  } = useFetch(getUserByIdApiCallback, null);
  const {
    state: postData,
    error: postError,
    loading: postLoading,
  } = useFetch(findPostsApiCallback, null);

  return (
    <div className={styles.profilePage}>
      <LoadingErrorOutput error={userError} loading={userLoading} />
      <LoadingErrorOutput error={postError} loading={postLoading} />
      <ViewProfile user={userData?.user} />
      <Explore posts={postData?.posts} variant={"profile"} />
    </div>
  );
}
