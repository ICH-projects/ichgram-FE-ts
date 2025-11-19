import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { User } from "../../../typescript/types";

import { type AppDispatch } from "../../../redux/store";
import {
  selectLastUpdatedPosts,
  selectPostsServiceData,
} from "../../../redux/posts/posts-selectors";
import { selectUser } from "../../../redux/auth/auth-selectors";
import { getLastUpdatedPosts } from "../../../redux/posts/posts-thunks";

import Posts from "../../../modules/Posts/Posts";
import Info from "../../../shared/components/Info/Info";
import End from "./End/End";

import styles from "./HomePage.module.css";


export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser: User = useSelector(selectUser)!;
  const { error, loading, message } = useSelector(selectPostsServiceData);
  const posts = useSelector(selectLastUpdatedPosts(currentUser.id!));

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
