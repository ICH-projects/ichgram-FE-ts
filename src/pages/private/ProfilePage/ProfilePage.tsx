import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { Post } from "../../../typescript/types";

import { type AppDispatch } from "../../../redux/store";
import { getProfileById } from "../../../redux/profile/profile-thunks";
import { selectProfileServiceData } from "../../../redux/profile/profile-selectors";
import { selectPostsByUserId } from "../../../redux/posts/posts-selectors";
import { findPosts } from "../../../redux/posts/posts-thunks";

import Profile from "../../../modules/Profile/Profile";
import Explore from "../../../modules/Explore/Explore";

import Info from "../../../shared/components/Info/Info";

import styles from "./ProfilePage.module.css";

export default function ProfilePage() {
  const profileId: number = Number(useParams().id);
  const dispatch = useDispatch<AppDispatch>();
  const { error, loading, message } = useSelector(selectProfileServiceData);
  const posts = useSelector(selectPostsByUserId(profileId));

  useEffect(() => {
    dispatch(getProfileById(profileId));
    dispatch(findPosts({ userId: profileId } as Post));
  }, [dispatch, profileId]);

  return (
    <div className={styles.profilePage}>
      <Info error={error} loading={loading} message={message} />
      <Profile />
      {posts && <Explore posts={posts} className={styles.posts} />}
    </div>
  );
}
