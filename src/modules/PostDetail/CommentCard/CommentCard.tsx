import { Link } from "react-router-dom";

import type { Comment } from "../../../typescript/types";

import { toNotificationFormat } from "../../../shared/utils/dateFormat";

import styles from "./CommentCard.module.css";


const { VITE_API_URL: baseURL } = import.meta.env;

interface ICommentCard {
  comment: Comment
}

export default function CommentCard({ comment }: ICommentCard) {
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
          {toNotificationFormat(String(comment?.updatedAt))}
        </p>
      </div>
    </div>
  );
}
