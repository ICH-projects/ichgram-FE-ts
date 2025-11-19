import { useParams } from "react-router-dom";

import Chats from "../../../modules/Chats/Chats";

import styles from "./ChatPage.module.css";

export default function ChatPage() {
  const companionId = Number(useParams().member2Id);

  return (
    <div className={styles.chatPage}>
      <Chats initCompanionId={companionId} />
    </div>
  );
}
