import {  useState } from "react";
import { useDispatch } from "react-redux";

import type { Comment, Follow, Like, Post } from "../../typescript/types";

import useRequest from "../../shared/hooks/useRequest";
import { createCommentApi } from "../../shared/api/comment-api";
import { likePostApi } from "../../shared/api/like-api";
import { followUserApi } from "../../shared/api/follow-api";

import Info from "../../shared/components/Info/Info";

import PostCard from "./PostCard/PostCard";

import styles from "./Posts.module.css";
import {type AppDispatch } from "../../redux/store";
import { showModal } from "../../redux/modal/modal-slice";

interface IPostsProps {
  posts: Post[];
  isExplore?: boolean;
}

export default function Posts({ posts, isExplore = false }: IPostsProps) {
  const [render, setRender] = useState(true);
  const [message, setMessage] = useState<string | null | undefined>(null);
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, sendRequest } = useRequest<unknown>();

  const showPost = (postId: number) => {
    dispatch(
      showModal({
        childType: "post_detail",
        childProps: {
           postId ,
          // message: { message },
          // sendComment: { handleSendComment },
          // likePost: { handleLikePost },
          // followUser: { handleFollowUser },
          // deletePost: { handleDeletePost },
        },
      })
    );
  };

  const handleSendComment = async (comment: Comment): Promise<Comment> => {
    const responseData = await sendRequest(() => createCommentApi(comment));
    const createdComment = responseData as Comment;
    setMessage(!error ? "Comment successfully created" : null);
    setRender((prev) => !prev);
    const post = posts.find((item) => item.id === createdComment.postId);
    if (!post) throw new Error("Post for adding comment not found");
    post.totalComments = (post.totalComments || 0) + 1;
    if (!post.comments) post.comments = [];
    post.comments.unshift(createdComment);
    post.comments = post.comments.slice(0, 4);
    return createdComment;
  };

  const handleLikePost = async (like: Like): Promise<Like> => {
    const responseData = await sendRequest(() => likePostApi(like));
    const createdLike = responseData as Like;
    setMessage(!error ? "Like successfully created" : null);
    setRender((prev) => !prev);
    const post = posts.find((item) => item.id === createdLike.postId);
    if (!post) throw new Error("Post for adding like not found");
    post.totalLikes = (post.totalLikes || 0) + 1;
    post.isLiked = true;
    return createdLike;
  };

  const handleFollowUser = async (follow: Follow): Promise<Follow> => {
    const responseData = await sendRequest(() => followUserApi(follow));
    const createdFollow = responseData as Follow;
    setMessage(!error ? "Follow successfully created" : null);
    setRender((prev) => !prev);
    posts!.map((post) => {
      if (post.user.id === createdFollow.targetUserId)
        (post.user.followers || []).push(createdFollow);
      return post;
    });
    return createdFollow;
  };

  const elements = posts.map((post) => {
    return (
      <PostCard
        key={post.id}
        post={post}
        sendComment={handleSendComment}
        likePost={handleLikePost}
        followUser={handleFollowUser}
        showPost={showPost}
        detailed={!isExplore}
      />
    );
  });
  return (
    <>
      <div className={styles.posts}> {elements} </div>
      <Info
        loading={loading}
        error={error?.response?.data.message || error?.message}
        message={message}
        render={render}
        className={styles.message}
      />
    </>
  );
}
