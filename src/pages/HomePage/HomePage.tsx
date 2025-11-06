import { useEffect } from "react";

import type { Post } from "../../typescript/types";

import useRequest from "../../shared/hooks/useRequest";
import { getLastUpdatedPostsApi } from "../../shared/api/post-api";

import Posts from "../../modules/Posts/Posts";
import Info from "../../shared/components/Info/Info";
import { EndIcon } from "../../shared/components/icons";

import styles from "./HomePage.module.css";

export default function HomePage() {
  const { state, loading, error, sendRequest } = useRequest<Post[]>();

  useEffect(() => {
    sendRequest(getLastUpdatedPostsApi);
  }, []);

  return (
    <div className={styles.homePage}>
      <Info
        loading={loading}
        error={error?.response?.data.message || error?.message}
      />
      {state && <Posts posts={state} />}
      <div className={styles.end}>
        <EndIcon className={styles.endIcon} />
        <h1 className={styles.endTitle}>You've seen all the updates</h1>
        <h1 className={styles.endText}>You have viewed all new publications</h1>
      </div>
    </div>
  );
}
