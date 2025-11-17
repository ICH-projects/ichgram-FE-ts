import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { type AppDispatch } from "../../redux/store";
import type { Follow, Post, User } from "../../typescript/types";

import { selectUser } from "../../redux/auth/auth-selectors";
import { selectProfile } from "../../redux/profile/profile-selectors";
import { subscribeToProfile } from "../../redux/profile/profile-thunks";

import Button from "../../shared/components/Button/Button";

import styles from "./Profile.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function Profile() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser: User | null = useSelector(selectUser);
  const profile: (User & { posts: Post[] }) | null = useSelector(selectProfile);
  const isMyProfile: boolean = currentUser!.id === profile?.id;

  const followUserHandler = async () => {
    dispatch(subscribeToProfile({ targetUserId: profile?.id } as Follow));
  };

  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          <img
            src={`${baseURL}/${profile?.avatar}`}
            alt=""
            className={styles.avatar}
          />
        </div>
        <div className={styles.infoWrapper}>
          <div className={styles.titleWrapper}>
            <Link
              to={String(profile?.website)}
              target="blank"
              className={styles.username}
            >
              {profile?.username}
            </Link>
            {!isMyProfile && !profile?.isFollowed && (
              <Button
                variant="contained"
                className={styles.btnFollow}
                handleClick={followUserHandler}
              >
                Follow
              </Button>
            )}
            {!isMyProfile ? (
              <Link
                to={`/messages/${profile?.id}`}
                className={styles.btnMessage}
              >
                Message
              </Link>
            ) : (
              <Link to={`edit`} className={styles.btnMessage}>
                Edit profile
              </Link>
            )}
          </div>
          <div className={styles.statsWrapper}>
            <span
              className={styles.statsValue}
            >{`${profile?.totalPosts} posts`}</span>
            <span
              className={styles.statsValue}
            >{`${profile?.totalFollowers} followers`}</span>
            <span
              className={styles.statsValue}
            >{`${profile?.totalFollows} following`}</span>
          </div>
          <div className={styles.aboutWrapper}>
            <p className={styles.about}>{profile?.about}</p>
          </div>
          <div className={styles.linkWrapper}>
            <Link
              to={String(profile?.website)}
              target="blank"
              className={styles.link}
            >
              {profile?.website}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
