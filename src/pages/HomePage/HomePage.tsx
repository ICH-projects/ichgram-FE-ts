import { useEffect } from "react";
import type { AxiosError } from "axios";

import type { Post, ResponseData } from "../../typescript/types";

import useRequest from "../../shared/hooks/useRequest";
import { getLastUpdatedPostsApi } from "../../shared/api/post-api";

import Posts from "../../modules/Posts/Posts";
import LoadingErrorOutput from "../../shared/components/LoadingErrorOutput/LoadingErrorOutput";
import { EndIcon } from "../../shared/components/icons";

import styles from "./HomePage.module.css";

export default function HomePage() {
  const { state, loading, error, sendRequest } = useRequest<
    ResponseData<Post[]>,
    AxiosError<{ message: string }>
  >();

  useEffect(() => {
    sendRequest(getLastUpdatedPostsApi);
  }, []);

  return (
    <div className={styles.homePage}>
      <LoadingErrorOutput
        loading={loading}
        error={error?.response?.data.message || error?.message}
        message={state?.message}
      />
      <Posts posts={state?.payload} />
      <div className={styles.end}>
        <EndIcon className={styles.endIcon} />
        <h1 className={styles.endTitle}>You've seen all the updates</h1>
        <h1 className={styles.endText}>You have viewed all new publications</h1>
      </div>
    </div>
  );
}
