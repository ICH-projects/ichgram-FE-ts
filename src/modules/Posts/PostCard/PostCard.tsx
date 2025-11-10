import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";

import type {
  Comment,
  Follow,
  Like,
  Post,
  User,
} from "../../../typescript/types";

import { selectUser } from "../../../redux/auth/auth-selectors";
import { toNotificationFormat } from "../../../shared/utils/dateFormat";
import { isUserFollowed } from "../../../shared/utils/user";

import { LikeIcon, CommentIcon } from "../../../shared/components/icons";

import styles from "./PostCard.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

interface IPostCardProps {
  className?: string;
  post: Post;
  likePost: (like: Like) => Promise<Like>;
  sendComment: (comment: Comment) => Promise<Comment>;
  followUser: (follow: Follow) => Promise<Follow>;
  showPost: (postId: number) => void;
  detailed?: boolean;
}

export default function PostCard({
  className = "",
  post,
  likePost,
  sendComment,
  followUser,
  showPost,
  detailed = true,
}: IPostCardProps) {
  const fullClassName = `${styles.card} ${className} `;

  const [isTextOverflowed, setIsTextOverflowed] = useState(false);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const textRef = useRef(null);
  const currentUser: User = useSelector(selectUser)!;
  const { register, handleSubmit, reset } = useForm<{ comment: string }>();

  useEffect(() => {
    setIsTextOverflowed(
      textRef.current
        ? Boolean(
            (textRef.current as unknown as HTMLDivElement).offsetHeight -
              (textRef.current as unknown as HTMLDivElement).scrollHeight
          )
        : false
    );
  }, []);

  const handleOnSubmitComment: SubmitHandler<{ comment: string }> = (
    values
  ) => {
    sendComment({ postId: post.id, text: values.comment } as Comment);
    reset();
  };

  const handleLikeButtonClick = () => {
    // if (post.userId === currentUser.id) return;      // !!!!! not remove
    if (post.isLiked) return;
    likePost({ postId: post.id } as Like);
  };

  const handleFollowButtonClick = () => {
    if (post.userId === currentUser.id) return;
    followUser({ targetUserId: post.userId } as Follow);
  };

  const handleCommentButtonClick = () => {
    setShowCommentForm((prev) => !prev);
  };

  const handleReadMore = () => {
    (
      textRef.current as unknown as HTMLDivElement
    ).className = `${styles.commentsWrapper} ${styles.expanded}`;
    setIsTextOverflowed(false);
  };

  const { comments } = post;

  const commentElements = comments?.map((item) => {
    return (
      <p key={item.id} className={styles.comment}>
        <Link to={`profile/${item.userId}`} className={styles.commentAuthor}>
          {item.user?.username}
        </Link>{" "}
        <span className={styles.commentText}>{item.text}</span>
      </p>
    );
  });

  return (
    <div className={fullClassName}>
      {detailed && (
        <div className={styles.header}>
          <div className={styles.avatarWrapper}>
            <img
              className={styles.avatarWrapper}
              src={`${baseURL}/${post.user?.avatar}`}
              alt=""
            />
          </div>
          <Link to={`/profile/${post.userId}`} className={styles.username}>
            {post.user.username ? post.user.username : "Sashaa"}
          </Link>
          <p className={styles.date}>{toNotificationFormat(post.updatedAt)}</p>
          {!isUserFollowed(post.user, currentUser) && (
            <button
              className={styles.followBtn}
              onClick={handleFollowButtonClick}
            >
              follow
            </button>
          )}
        </div>
      )}

      <button className={styles.imgWrapper} onClick={() => showPost(post.id)}>
        <img
          src={`${baseURL}/${post.image}`}
          alt="post_img"
          className={styles.img}
        />
      </button>

      {detailed && (
        <div className={styles.controlsWrapper}>
          <button
            className={styles.controlButton}
            onClick={handleLikeButtonClick}
          >
            <LikeIcon
              className={`${styles.controlIcon} ${
                post.isLiked && styles.filled
              }`}
            />
          </button>
          <button
            className={styles.controlButton}
            onClick={handleCommentButtonClick}
          >
            <CommentIcon
              className={`${styles.controlIcon} ${
                showCommentForm && styles.filled
              }`}
            />
          </button>
        </div>
      )}

      {detailed && post.totalLikes && post.totalLikes > 0 && (
        <p className={styles.likes}>{`${post.totalLikes} ${
          post.totalLikes == 1 ? "like" : "likes"
        }`}</p>
      )}
      {detailed && showCommentForm && (
        <form
          onSubmit={handleSubmit(handleOnSubmitComment)}
          className={styles.commentForm}
        >
          <input
            type="text"
            {...register("comment", { required: true })}
            className={styles.commentInput}
          />
          <button type="submit" className={styles.commentSubmitBtn}>
            Send
          </button>
        </form>
      )}
      {detailed && (
        <div className={styles.commentsWrapper} ref={textRef}>
          {commentElements}
        </div>
      )}
      {detailed && isTextOverflowed && (
        <p className={styles.readMore} onClick={handleReadMore}>
          ...more
        </p>
      )}
      {detailed &&
        !isTextOverflowed &&
        comments?.length &&
        comments?.length > 2 && (
          <Link to={`/posts/${post.id}`} className={styles.commentsFooter}>
            {`View all comments (${post.totalComments})`}
          </Link>
        )}
    </div>
  );
}
