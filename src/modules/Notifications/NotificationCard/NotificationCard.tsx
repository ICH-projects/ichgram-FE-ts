import { Link } from "react-router-dom";

import type { Notification, User } from "../../../typescript/types";

import { toNotificationFormat } from "../../../shared/utils/dateFormat";

import styles from "./NotificationCard.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

interface INotificationCardProps {
  notification: Notification;
  currentUser: User;
  showPost?: (postId: number, notificationId: number) => void;
}

export default function NotificationCard({
  notification,
  currentUser,
  showPost = () => {},
}: INotificationCardProps) {
  let action = "";
  switch (notification.type) {
    case "LIKED":
      action = "liked your post";
      break;
    case "COMMENTED":
      action = "commented your post";
      break;
    case "FOLLOWED":
      action = "started following";
      break;
    default:
      break;
  }

  return (
    <div className={styles.card}>
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
          <span className={styles.action}>{action}</span>
          {". "}
          <span className={styles.date}>
            {toNotificationFormat(notification.updatedAt as unknown as string)}
          </span>
        </div>
      </div>

      {notification.type !== "FOLLOWED" && (
        <div
          // to={`/posts/${notification.targetPost?.id}`}
          className={styles.photoWrapper}
          onClick={() => showPost(notification.targetPost?.id, notification.id)}
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
