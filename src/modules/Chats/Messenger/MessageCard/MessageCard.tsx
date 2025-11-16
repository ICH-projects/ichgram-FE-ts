import type { ReactNode } from "react";
import type { Message } from "../../../../typescript/types";
import styles from "./MessageCard.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

interface IMessageCardProps {
  message: Message;
  isMy: boolean;
}

export default function MessageCard({ message, isMy }: IMessageCardProps): ReactNode {
  return (
    <div className={`${styles.message} ${isMy && styles.right}`}>
      <div className={styles.avatarWrapper}>
        <img
          src={`${baseURL}/${message.author?.avatar}`}
          alt=""
          className={styles.avatar}
        />
      </div>
      <p className={`${styles.text} ${isMy && styles.right}`}>{message.text}</p>
    </div>
  );
}
