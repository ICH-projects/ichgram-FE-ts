import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import type { Comment, Follow, Like, Post } from "../../typescript/types";

import { type AppDispatch } from "../../redux/store";
import { hideModal } from "../../redux/modal/modal-slice";
import { selectUser } from "../../redux/auth/auth-selectors";

import { isUserFollowed } from "../../shared/utils/user";

import useRequest from "../../shared/hooks/useRequest";
import { deletePostByIdApi, getPostByIdApi } from "../../shared/api/post-api";
import { followUserApi } from "../../shared/api/follow-api";
import { likePostApi } from "../../shared/api/like-api";
import { createCommentApi } from "../../shared/api/comment-api";

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
  postId: number | null;
}

export default function PostDetail({ postId }: IPostDetailProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [post, setPost] = useState<Post | null>(null);
  const [message, setMessage] = useState<string | null | undefined>(null);

  const { register, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(commentSchema),
    mode: "onChange",
  });

  const { loading, error, sendRequest } = useRequest<unknown | null>();
  const [render, setRender] = useState(true);

  useEffect(() => {
    const fetchData = async (postId: number) => {
      const post: Post = (await sendRequest(() =>
        getPostByIdApi(postId)
      )) as Post;
      setPost(post as Post);
    };

    if (postId) fetchData(postId);
  }, [postId]);

  const currentUser = useSelector(selectUser);
  const [dialogShow, setDialogShow] = useState(false);
  const [reset, setReset] = useState(false);

  const close = () => {
    dispatch(hideModal());
  };

  const handleSendComment = async (comment: Comment): Promise<void> => {
    const createdComment: Comment = (await sendRequest(() =>
      createCommentApi(comment)
    )) as Comment;
    if (error) return;
    if (!createdComment) return;
    setMessage("Comment successfully created");
    setPost((prev) => {
      prev!.totalComments = (prev!.totalComments || 0) + 1;
      if (!prev?.comments) prev!.comments = [];
      prev!.comments.unshift(createdComment as Comment);
      return prev;
    });
    setReset((prev) => !prev);
    setRender((prev) => !prev);
  };

  const handleLikePost = async (like: Like) => {
    if (post!.isLiked) return;
    const createdLike: Like = (await sendRequest(() =>
      likePostApi(like)
    )) as Like;
    if (error) return;
    if (!createdLike) return;
    setMessage("Like successfully created");
    setPost((prev) => {
      prev!.totalLikes = (prev!.totalLikes || 0) + 1;
      prev!.isLiked = true;
      return prev;
    });
    setRender((prev) => !prev);
  };

  const handleFollowUser = async (follow: Follow) => {
    if (isUserFollowed(post?.user, currentUser)) return;
    const createdFollow: Follow = (await sendRequest(() =>
      followUserApi(follow)
    )) as Follow;
    if (error) return;
    if (!createdFollow) return;
    setMessage("Follow successfully created");
    setPost((prev) => {
      if (prev!.user.id === follow.targetUserId) {
        if (!prev!.user.followers) prev!.user.followers = [];
        prev!.user.followers.push(createdFollow);
      }
      return prev;
    });
    setRender((prev) => !prev);
  };

  const handleDeletePost = async (id: number): Promise<void> => {
    if (post?.user?.id !== currentUser!.id) return;
    await sendRequest(() => deletePostByIdApi(id));
    setMessage(!error ? "Post successfully deleted" : null);
    if (error) return;
    alert("Post successfully deleted");
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
        <Info
          error={error?.response?.data.message || error?.message}
          loading={loading}
          message={message}
          render={render}
        />
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
