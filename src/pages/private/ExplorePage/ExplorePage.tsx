import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../../redux/store";
import {
  selectPosts,
  selectPostsServiceData,
} from "../../../redux/posts/posts-selectors";
import { getPosts } from "../../../redux/posts/posts-thunks";

import Explore from "../../../modules/Explore/Explore";
import Info from "../../../shared/components/Info/Info";

import styles from "./ExplorePage.module.css";

export default function ExplorePage() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectPosts);
  const { error, loading, message } = useSelector(selectPostsServiceData);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <div className={styles.explorePage}>
      <Info error={error} loading={loading} message={message} />
      {posts && posts.length > 0 && <Explore posts={posts} />}
    </div>
  );
}
