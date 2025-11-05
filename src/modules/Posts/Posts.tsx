import { useState } from "react";
import type { AxiosError } from "axios";

import useRequest from "../../shared/hooks/useRequest";
import { createCommentApi } from "../../shared/api/comment-api";
import { likePostApi } from "../../shared/api/like-api";
import { followUserApi } from "../../shared/api/follow-api";

import LoadingErrorOutput from "../../shared/components/LoadingErrorOutput/LoadingErrorOutput";
import Modal from "../../shared/components/Modal/Modal";

import PostCard from "./PostCard/PostCard";
import PostDetail from "./PostDetail/PostDetail";

import styles from "./Posts.module.css";
import type {
  Comment,
  Follow,
  Like,
  Post,
  ResponseData,
} from "../../typescript/types";

export default function Posts({ posts = [] }: { posts: Post[] | undefined }) {
  const [render, setRender] = useState(true);
  const [message, setMessage] = useState<string | null | undefined>(null);
  const [modalHidden, setModalHidden] = useState(true);
  const [postId, setPostId] = useState<number | null>(null);

  const { loading, error, sendRequest } = useRequest<
    ResponseData<unknown>,
    AxiosError<{ message: string }>
  >();

  const showPost = (postId: number) => {
    setModalHidden(false);
    setPostId(postId);
  };
  const closePost = () => {
    setModalHidden(true);
    setPostId(null);
  };

  const handleSendComment = async (comment: Comment) => {
    const responseData = await sendRequest(() => createCommentApi(comment));
    const createdComment = responseData?.payload as Comment;
    setMessage(responseData?.message);
    setRender((prev) => !prev);
    const post = posts.find((item) => item.id === createdComment.postId);
    if (post) {
      post.totalComments = (post.totalComments || 0) + 1;
      if (!post.comments) post.comments = [];
      post.comments.unshift(createdComment);
      post.comments = post.comments.slice(0, 4);
    }
  };

  const likePost = async (postId: number) => {
    const responseData = await sendRequest(() => likePostApi({ postId }));
    const createdLike = responseData?.payload as Like;
    setMessage(responseData?.message);
    setRender((prev) => !prev);
    const post = posts.find((item) => item.id === createdLike.postId);
    if (post) {
      post.totalLikes = Number(post.totalLikes) + 1;
      post.isLiked = true;
    }
  };

  const followUser = async (targetUserId: number) => {
    const responseData = await sendRequest(() =>
      followUserApi({ targetUserId })
    );
    const createdFollow = responseData?.payload as Follow;
    setMessage(responseData?.message);
    setRender((prev) => !prev);
    posts.map((post) => {
      if (post.user.id === createdFollow.targetUserId)
        (post.user.followers || []).push(createdFollow);
      return post;
    });
  };

  const elements = posts.map((post) => (
    <PostCard
      key={post.id}
      post={post}
      sendComment={handleSendComment}
      likePost={likePost}
      followUser={followUser}
      showPost={showPost}
    />
  ));

  return (
    <>
      <div className={styles.posts}>{elements}</div>
      <LoadingErrorOutput
        loading={loading}
        error={error?.response?.data.message || error?.message}
        message={message}
        render={render}
        className={styles.message}
      />
      <Modal hidden={modalHidden} onClickHandle={closePost}>
        <PostDetail postId={postId} close={closePost} />
      </Modal>
    </>
  );
}
