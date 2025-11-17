import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import type { Comment, Follow, Like, Post } from "../../typescript/types";

import { type AppDispatch } from "../../redux/store";
import { hideModal } from "../../redux/modal/modal-slice";
import { selectUser } from "../../redux/auth/auth-selectors";
import { selectPostsStore } from "../../redux/posts/posts-selectors";
import {
  addComment,
  likePost,
  deletePost,
} from "../../redux/posts/posts-thunks";
import { subscribeToProfile } from "../../redux/profile/profile-thunks";

import { isUserFollowed } from "../../shared/utils/user";

import TextEditor from "../../shared/components/TextEditor/TextEditor";
import Info from "../../shared/components/Info/Info";
import Dialog from "../../shared/components/Dialog/Dialog";

import {
  AdditionalIcon,
  LikeIcon,
  CommentIcon,
} from "../../shared/components/icons";

import { fields, defaultValues, commentSchema, type FormData } from "./fields";
import CommentCard from "./CommentCard/CommentCard";

import styles from "./PostDetail.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

export interface IPostDetailProps {
  postId: number;
}

export default function PostDetail({ postId }: IPostDetailProps) {
  const dispatch = useDispatch<AppDispatch>();

  const { posts, error, loading, message } = useSelector(selectPostsStore);
  const post: Post | undefined = posts.find((p) => p.id === postId);

  const { register, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(commentSchema),
    mode: "onChange",
  });

  const currentUser = useSelector(selectUser);
  const [dialogShow, setDialogShow] = useState(false);
  const [reset, setReset] = useState(false);

  const close = () => {
    dispatch(hideModal());
  };

  const handleSendComment = async (comment: Comment): Promise<void> => {
    dispatch(addComment(comment));
    setReset((prev) => !prev);
  };

  const handleLikePost = async (like: Like) => {
    dispatch(likePost(like));
  };

  const handleFollowUser = async (follow: Follow) => {
    dispatch(subscribeToProfile(follow));
  };

  const handleDeletePost = async (id: number): Promise<void> => {
    dispatch(deletePost(id));
    close();
  };

  const commentElements = post?.comments?.map((comment) => {
    return <CommentCard key={comment.id} comment={comment} />;
  });

  return (
    <div
      className={styles.viewPost}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <div className={styles.imageWrapper}>
        <img
          src={`${baseURL}/${post?.image}`}
          alt=""
          className={styles.image}
        />
      </div>
      <div className={styles.infoWrapper}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <Link
              to={`/profile/${post?.user?.id}`}
              className={styles.avatarWrapper}
            >
              <img
                src={`${baseURL}/${post?.user?.avatar}`}
                alt=""
                className={styles.avatar}
              />
            </Link>
            <Link to={`/profile/${post?.user?.id}`} className={styles.username}>
              {post?.user?.username}
            </Link>

            {!isUserFollowed(post?.user, currentUser) &&
              post?.user?.id !== currentUser!.id && (
                <>
                  <span className={styles.username}>&bull;</span>
                  <button
                    className={styles.btn}
                    onClick={() =>
                      handleFollowUser({
                        targetUserId: post?.user?.id,
                      } as Follow)
                    }
                  >
                    Subscribe
                  </button>
                </>
              )}
          </div>
          <button
            className={styles.additionalBtn}
            onClick={() => setDialogShow(true)}
          >
            <AdditionalIcon className={styles.additionalIcon} />
          </button>
        </div>
        <div className={styles.comments}>{commentElements}</div>
        <div className={styles.icons}>
          <button
            className={styles.iconBtn}
            onClick={() => handleLikePost({ postId: post!.id } as Like)}
          >
            <LikeIcon
              className={`${styles.icon} ${post?.isLiked && styles.filled}`}
            />
          </button>
          <CommentIcon className={styles.icon} />
        </div>
        <div className={styles.statsWrapper}>
          <span className={styles.stats}>{`${
            post?.totalLikes ? post?.totalLikes : 0
          } ${post?.totalLikes == 1 ? "like" : "likes"}`}</span>
          <span className={styles.stats}>{`${
            post?.totalComments ? post?.totalComments : 0
          } ${post?.totalComments == 1 ? "comment" : "comments"}`}</span>
        </div>
        <form
          onSubmit={handleSubmit((data) =>
            handleSendComment({ ...data, postId: post!.id } as Comment)
          )}
          className={styles.inputWrapper}
        >
          <TextEditor
            register={register}
            {...fields.text}
            name={fields.text.name as keyof FormData}
            reset={reset}
          />
          <button type="submit" className={styles.btn}>
            Send
          </button>
        </form>
        <Info error={error} loading={loading} message={message} />
      </div>
      {dialogShow && (
        <Dialog
          setDialogShow={setDialogShow}
          deletePost={() => handleDeletePost(postId!)}
          closePost={close}
        />
      )}
    </div>
  );
}
