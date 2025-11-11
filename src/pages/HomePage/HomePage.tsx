import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { type AppDispatch } from "../../redux/store";
import { selectPosts } from "../../redux/posts/posts-selectors";
import { getLastUpdatedPosts } from "../../redux/posts/posts-thunks";

import Posts from "../../modules/Posts/Posts";
import Info from "../../shared/components/Info/Info";
import { EndIcon } from "../../shared/components/icons";

import styles from "./HomePage.module.css";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading, posts, message } = useSelector(selectPosts);

  useEffect(() => {
    dispatch(getLastUpdatedPosts());
  }, [dispatch]);

  return (
    <div className={styles.homePage}>
      <Info loading={loading} error={error} message={message} />
      {posts.length > 0 && <Posts posts={posts} />}
      <div className={styles.end}>
        <EndIcon className={styles.endIcon} />
        <h1 className={styles.endTitle}>You've seen all the updates</h1>
        <h1 className={styles.endText}>You have viewed all new publications</h1>
      </div>
    </div>
  );
}
