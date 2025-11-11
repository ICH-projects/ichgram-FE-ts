import { useEffect } from "react";


import Explore from "../../modules/Explore/Explore";
// import Posts from "../../modules/Posts/Posts";
import Info from "../../shared/components/Info/Info";


import styles from "./ExplorePage.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { selectPostsStore } from "../../redux/posts/posts-selectors";
import { getPosts } from "../../redux/posts/posts-thunks";

export default function ExplorePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading, posts, message } = useSelector(selectPostsStore);

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
