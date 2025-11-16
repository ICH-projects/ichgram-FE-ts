import { toNotificationFormat } from "/src/shared/utils/dateFormat.js";

import styles from "./ChatCard.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function ChatCard({ chat, active, handleClick, currentUser }) {
  const otherUser =
    chat.member1Id === currentUser.id ? chat.member2 : chat.member1;

  let lastMessageDate = null;
  if (otherUser?.messages && Array.isArray(otherUser?.messages)) {
    lastMessageDate = otherUser?.messages[0]?.updatedAt;
  }

  return (
    <button
      className={`${styles.chatCard} ${active && styles.active}`}
      onClick={() => handleClick(chat)}
    >
      <div className={styles.avatarWrapper}>
        <img
          src={`${baseURL}/${otherUser.avatar}`}
          alt=""
          className={styles.avatar}
        />
      </div>
      <div className={styles.infoWrapper}>
        <p className={styles.username}>{otherUser.username}</p>
        {lastMessageDate && (
          <span className={styles.info}>
            {otherUser.username} sent a message &bull;{" "}
            {toNotificationFormat(lastMessageDate)}
          </span>
        )}
      </div>
    </button>
  );
}
