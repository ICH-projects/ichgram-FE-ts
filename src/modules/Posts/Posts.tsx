import { useState } from "react";

import LoadingErrorOutput from "../../shared/components/LoadingErrorOutput/LoadingErrorOutput";

import useRequest from "../../shared/hooks/useRequest";

import { createCommentApi } from "../../shared/api/comment-api";
import { likePostApi } from "../../shared/api/like-api";
import { followUserApi } from "../../shared/api/follow-api";

import PostCard from "./PostCard/PostCard";

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
  const { loading, error, sendRequest } = useRequest<ResponseData<unknown>>();

  const showPost = (postId: number) => {
    // dispatch(showModal({ type: "Post", id: postId }));
  };

  const sendComment = async (comment: Comment) => {
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
    setMessage(responseData?.message)
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
      sendComment={sendComment}
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
        error={error}
        message={message}
        render={render}
        className={styles.message}
      />
    </>
  );
}
