import { Link } from "react-router-dom";

import type { Notification, User } from "../../../typescript/types";

import { toNotificationFormat } from "../../../shared/utils/dateFormat";

import styles from "./NotificationCard.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

const actions = {
  LIKED: "liked your post",
  COMMENTED: "commented your post",
  FOLLOWED: "started following",
};

interface INotificationCardProps {
  notification: Notification;
  currentUser: User;
  showPost?: (postId: number) => void;
  markAsRead?: (notificationId: number) => void;
}

export default function NotificationCard({
  notification,
  currentUser,
  showPost = () => {},
  markAsRead = () => {},
}: INotificationCardProps) {
  const onClickHandler = () => {
    markAsRead(notification.id);
  };

  return (
    <div className={styles.card} onClick={onClickHandler}>
      <div className={styles.wrapper}>
        <Link
          to={`/profile/${notification.authorUser.id}`}
          className={styles.avatarWrapper}
        >
          <img
            src={`${baseURL}/${notification.authorUser.avatar}`}
            alt=""
            className={styles.avatar}
          />
        </Link>
        <div className={styles.infoWrapper}>
          <Link
            to={`/profile/${notification.authorUser.id}`}
            className={styles.username}
          >
            {notification.authorUser.id === currentUser.id
              ? "You"
              : notification.authorUser.username}
          </Link>{" "}
          <span className={styles.action}>{actions[notification.type]}</span>
          {". "}
          <span className={styles.date}>
            {toNotificationFormat(notification.updatedAt as unknown as string)}
          </span>
        </div>
      </div>

      {notification.type !== "FOLLOWED" && (
        <div
          className={styles.photoWrapper}
          onClick={() => showPost(notification.targetPost?.id)}
        >
          <img
            src={`${baseURL}/${notification.targetPost?.image}`}
            alt=""
            className={styles.photo}
          />
        </div>
      )}
    </div>
  );
}
