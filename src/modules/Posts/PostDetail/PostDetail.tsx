import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useForm,
  type SubmitHandler,
  type UseFormRegister,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import type { AxiosError } from "axios";

import type {
  Comment,
  Follow,
  Post,
  ResponseData,
} from "../../../typescript/types";

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

import { fields, defaultValues, commentSchema } from "./fields";

import styles from "./PostDetail.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

interface IPostDetailProps {
  postId: number | null;
  close: () => void;
}

export default function PostDetail({ postId }: IPostDetailProps) {
  const [post, setPost] = useState<Post | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const { register, handleSubmit } = useForm({
    defaultValues,
    resolver: yupResolver(commentSchema),
    mode: "onChange",
  });

  const { loading, error, sendRequest } = useRequest<
    ResponseData<unknown>,
    AxiosError<{ message: string }>
  >();
  const [render, setRender] = useState(true);

  useEffect(() => {
    const fetchData = async (postId: number) => {
      const responseData = await sendRequest(() => getPostByIdApi(postId));
      setPost(responseData?.payload as Post);
      setMessage(responseData?.message as string);
    };

    if (postId) fetchData(postId);
  }, [postId]);

  const currentUser = useSelector(selectUser);
  const isPostUserFollowed = post?.user?.followers
    ? post.user?.followers.some(
        (follow: Follow) => follow.followerUserId === currentUser!.id
      )
    : false;
  const [dialogShow, setDialogShow] = useState(false);
  const [reset, setReset] = useState(false);

  const handleSendComment = async (comment: Comment): Promise<void> => {
    const responseData = await sendRequest(() => createCommentApi(comment));
    setMessage(responseData?.message as string);
    setPost((prev) => {
      if (!prev?.totalComments) prev!.totalComments = 0;
      prev!.totalComments += 1;
      if (!prev?.comments) prev!.comments = [];
      prev!.comments.unshift( responseData?.payload as Comment);
      return prev;
    });
    setReset((prev) => !prev);
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
          onSubmit={handleSubmit((data) =>
            handleSendComment({ ...data, postId: post!.id } as Comment)
          )}
          className={styles.inputWrapper}
        >
          <TextEditor register={register} {...fields.text} reset={reset} />
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
