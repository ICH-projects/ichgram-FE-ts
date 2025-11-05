import { Link } from "react-router-dom";

import { toNotificationFormat } from "/src/shared/utils/dateFormat";

import styles from "./CommentCard.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function CommentCard({ comment }) {
  return (
    <div className={styles.commentCard}>
      <Link
        to={`/profile/${comment?.user?.id}`}
        className={styles.avatarWrapper}
      >
        <img
          src={`${baseURL}/${comment.user?.avatar}`}
          alt=""
          className={styles.avatar}
        />
      </Link>

      <div className={styles.commentTextWrapper}>
        <Link to={`/profile/${comment.user?.id}`} className={styles.username}>
          {comment?.user?.username}
        </Link>
        <span className={styles.commentText}> {comment?.text}</span>
        <p className={styles.commentDate}>
          {toNotificationFormat(comment?.updatedAt)}
        </p>
      </div>
    </div>
  );
}
