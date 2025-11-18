import type { Chat, Message, User } from "../../../typescript/types";

import { toNotificationFormat } from "../../../shared/utils/dateFormat";

import styles from "./ChatCard.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

interface IChatCard {
  chat: Chat;
  active: boolean;
  handleClick: (chat: Chat) =>  void;
  currentUser: User;
}

export default function ChatCard({
  chat,
  active,
  handleClick,
  currentUser,
}: IChatCard) {
  const otherUser: User & { messages?: Message[] } =
    chat.member1Id === currentUser.id ? chat.member2 : chat.member1;

  let lastMessageDate: string | null = null;
  if (otherUser?.messages && Array.isArray(otherUser?.messages)) {
    lastMessageDate = String(otherUser?.messages[0]?.updatedAt);
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
