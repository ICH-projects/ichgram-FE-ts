import { useDispatch } from "react-redux";

import type { Post } from "../../typescript/types";

import { type AppDispatch } from "../../redux/store";
import { showModal } from "../../redux/modal/modal-slice";

import ExploreCard from "./ExploreCard/ExploreCard";

import styles from "./Explore.module.css";

interface IExploreProps {
  posts: Post[];
}

export default function Explore({ posts }: IExploreProps) {
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

  const elements = posts.map((post) => {
    return (
      <ExploreCard
        key={post.id}
        post={post}
        showPost={showPost}
      />
    );
  });
  return <div className={styles.explore}> {elements} </div>;
}
