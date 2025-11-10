import { useEffect } from "react";

import type { Post } from "../../typescript/types";

// import Explore from "/src/modules/Explore/Explore";
import Posts from "../../modules/Posts/Posts";
import Info from "../../shared/components/Info/Info";

import { getPostsApi } from "../../shared/api/post-api";
import useRequest from "../../shared/hooks/useRequest";

import styles from "./ExplorePage.module.css";

export default function ExplorePage() {
  const { state, loading, error, sendRequest } = useRequest<Post[]>();

  useEffect(() => {
    sendRequest(getPostsApi);
  }, []);

  return (
    <div className={styles.explorePage}>
      {/* {state && <Explore posts={state} />} */}
      {state && <Posts posts={state} isExplore={true}/>}
      <Info
        error={error?.response?.data.message || error?.message}
        loading={loading}
      />
    </div>
  );
}
