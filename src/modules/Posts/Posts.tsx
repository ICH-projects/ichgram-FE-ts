import { useDispatch } from "react-redux";

import type { Comment, Follow, Like, Post } from "../../typescript/types";

import { type AppDispatch } from "../../redux/store";
import { showModal } from "../../redux/modal/modal-slice";
import {
  addComment,
  followUser,
  likePost,
} from "../../redux/posts/posts-thunks";

import PostCard from "./PostCard/PostCard";

import styles from "./Posts.module.css";

interface IPostsProps {
  posts: Post[];
}

export default function Posts({ posts }: IPostsProps) {
  const dispatch = useDispatch<AppDispatch>();

  const showPost = (postId: number) => {
    dispatch(
      showModal({
        childType: "post_detail",
        childProps: {
          postId,
        },
      })
    );
  };

  const handleSendComment = async (comment: Comment): Promise<void> => {
    dispatch(addComment(comment));
  };

  const handleLikePost = async (like: Like): Promise<void> => {
    dispatch(likePost(like));
  };

  const handleFollowUser = async (follow: Follow): Promise<void> => {
    dispatch(followUser(follow));
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
      />
    );
  });
  return <div className={styles.posts}> {elements} </div>;
}
