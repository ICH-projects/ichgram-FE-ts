import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { type AppDispatch } from "../../redux/store";
import { selectPosts } from "../../redux/posts/posts-selectors";
import { getLastUpdatedPosts } from "../../redux/posts/posts-thunks";

import Posts from "../../modules/Posts/Posts";
import Info from "../../shared/components/Info/Info";
import End from "./End/End";

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
      {posts && posts.length > 0 && <Posts posts={posts} />}
      <End />
    </div>
  );
}
