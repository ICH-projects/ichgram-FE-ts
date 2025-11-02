import Explore from "/src/modules/Explore/Explore";
import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import { getPostsApi } from "/src/shared/api/post-api.js";
import useFetch from "../../shared/hooks/temp/useFetch";

import styles from "./ExplorePage.module.css";

export default function ExplorePage() {
  const { state, loading, error } = useFetch(getPostsApi, []);
  return (
    <div className={styles.explorePage}>
      <Explore posts={state.posts} />
      <LoadingErrorOutput error={error} loading={loading} />
    </div>
  );
}
