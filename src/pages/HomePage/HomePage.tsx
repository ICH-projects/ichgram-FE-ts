import { useEffect } from "react";

import Posts from "../../modules/Posts/Posts";
import LoadingErrorOutput from "../../shared/components/LoadingErrorOutput/LoadingErrorOutput";
import { EndIcon } from "../../shared/components/icons";

import useRequest from "../../shared/hooks/useRequest";
import { getLastUpdatedPostsApi } from "../../shared/api/post-api";
import type { ResponseData } from "../../typescript/types";

import styles from "./HomePage.module.css";

export default function HomePage() {
  const {
    state,
    loading,
    error,
    sendRequest,
  } = useRequest<ResponseData<[]>>();

  useEffect(() => {
    sendRequest(getLastUpdatedPostsApi);
  }, []);

  return (
    <div className={styles.homePage}>
      <LoadingErrorOutput loading={loading} error={error} message={state?.message} />
      <Posts posts={state?.payload} />
      <div className={styles.end}>
        <EndIcon className={styles.endIcon} />
        <h1 className={styles.endTitle}>You've seen all the updates</h1>
        <h1 className={styles.endText}>You have viewed all new publications</h1>
      </div>
    </div>
  );
}
