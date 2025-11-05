import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { AxiosError } from "axios";

import type { Follow, Post, ResponseData } from "../../../typescript/types";

import { selectUser } from "../../../redux/auth/auth-selectors";

// import { hideModal } from "/src/redux/modal/modal-slice";

import useRequest from "../../../shared/hooks/useRequest";
import { getPostByIdApi } from "../../../shared/api/post-api";
import { createCommentApi } from "../../../shared/api/comment-api";
import { likePostApi } from "../../../shared/api/like-api";
import { followUserApi } from "../../../shared/api/follow-api";
import { deletePostByIdApi } from "../../../shared/api/post-api";

import TextEditor from "../../../shared/components/TextEditor/TextEditor";
import LoadingErrorOutput from "../../../shared/components/LoadingErrorOutput/LoadingErrorOutput";
import Dialog from "../../../shared/components/Dialog/Dialog";

import {
  AdditionalIcon,
  LikeIcon,
  CommentIcon,
} from "../../../shared/components/icons";

import CommentCard from "./CommentCard/CommentCard";

import { fields, commentSchema } from "./fields";

import styles from "./PostDetail.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

interface IPostDetailProps {
  postId: number | null;
  close: () => void;
}

export default function PostDetail({ postId }: IPostDetailProps) {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(commentSchema),
    mode: "onChange",
  });

  const { state, loading, error, sendRequest } = useRequest<
    ResponseData<Post>,
    AxiosError<{ message: string }>
  >();
  const { message, payload: post } = state
    ? state
    : { message: null, payload: null };
  const [render, setRender] = useState(true);

  useEffect(() => {
    if (postId) {
      sendRequest(() => getPostByIdApi(postId));
    }
  }, [postId]);

  const currentUser = useSelector(selectUser);
  const isPostUserFollowed = state?.payload?.user?.followers
    ? state?.payload?.user?.followers.some(
        (follow: Follow) => follow.followerUserId === currentUser!.id
      )
    : false;
  const [dialogShow, setDialogShow] = useState(false);
  const [reset, setReset] = useState(false);

  const sendComment = async (comment) => {
    // const { comment: createdComment } = await sendRequest(() =>
    //   createCommentApi({
    //     postId: post.id,
    //     text: comment.comment,
    //   })
    // );
    // setRender((prev) => !prev);
    // if (post) {
    //   setPost((prev) => {
    //     if (!post?.totalComments) post.totalComments = 0;
    //     post.totalComments += 1;
    //     if (!post.comments) post.comments = [];
    //     post.comments.unshift(createdComment);
    //     return { ...prev };
    //   });
    //   setReset((prev) => !prev);
    // }
  };

  const likePost = async (postId) => {
    // if (post.isLiked) return;
    // await sendRequest(() => likePostApi({ postId }));
    // setRender((prev) => !prev);
    // if (post) {
    //   setPost((prev) => {
    //     if (!post?.totalLikes) post.totalLikes = 0;
    //     post.totalLikes = Number(post.totalLikes) + 1;
    //     post.isLiked = true;
    //     return { ...prev };
    //   });
    // }
  };

  const followUser = async (targetUserId) => {
    // const { follow } = await sendRequest(() => followUserApi({ targetUserId }));
    // setRender((prev) => !prev);
    // setPost((prev) => {
    //   if (post.user.id === follow.targetUserId)
    //     post.user.followers.push(follow);
    //   return { ...prev };
    // });
  };

  const deletePost = async () => {
    if (post?.user?.id !== currentUser.id) return;
    // dispatch(hideModal());
    const data = await sendRequest(() => deletePostByIdApi(postId));
    alert(data.message);
    // navigate("/");
  };

  const commentElements = state?.payload.comments?.map((comment) => {
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

            {!isPostUserFollowed && post?.user?.id !== currentUser!.id && (
              <>
                <span className={styles.username}>&bull;</span>
                <button
                  className={styles.btn}
                  onClick={() => followUser(post?.user?.id)}
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
          <button className={styles.iconBtn} onClick={() => likePost(post?.id)}>
            <LikeIcon
              className={`${styles.icon} ${post?.isLiked && styles.filled}`}
            />
          </button>

          <CommentIcon className={styles.icon} />
        </div>
        <div className={styles.statsWrapper}>
          <span className={styles.stats}>{`${
            post?.totalLikes ? post?.totalLikes : 0
          } likes`}</span>
          <span className={styles.stats}>{`${
            post?.totalComments ? post?.totalComments : 0
          } comments`}</span>
        </div>
        <form
          onSubmit={handleSubmit(sendComment)}
          className={styles.inputWrapper}
        >
          <TextEditor register={register} {...fields.comment} reset={reset} />
          <button type="submit" className={styles.btn}>
            Send
          </button>
        </form>
        <LoadingErrorOutput
          error={error?.response?.data.message || error?.message}
          loading={loading}
          message={message}
          render={render}
        />
      </div>
      {dialogShow && (
        <Dialog
          setDialogShow={setDialogShow}
          deletePost={deletePost}
          closePost={close}
        />
      )}
    </div>
  );
}
