import type { Post } from "../../../typescript/types";

import styles from "./ExploreCard.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

interface IExploreCardProps {
  className?: string;
  post: Post;
  showPost: (postId: number) => void;
}

export default function ExploreCard({
  className = "",
  post,
  showPost,
}: IExploreCardProps) {
  const fullClassName = `${styles.exploreCard} ${className} `;

  return (
    <div className={fullClassName}>
      <div className={styles.imgWrapper} onClick={() => showPost(post.id)}>
        <img
          src={`${baseURL}/${post.image}`}
          alt="post_img"
          className={styles.image}
        />
      </div>
    </div>
  );
}
