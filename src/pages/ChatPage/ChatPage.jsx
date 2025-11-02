import { useCallback } from "react";
import { useParams } from "react-router-dom";

import useFetch from "/src/shared/hooks/temp/useFetch";
import { getChatsApi, createChatApi } from "/src/shared/api/chat-api";

import Chat from "/src/modules/Chat/Chat";
import LoadingErrorOutput from "/src/shared/components/LoadingErrorOutput/LoadingErrorOutput";

import styles from "./ChatPage.module.css";

export default function ChatPage() {
  const member2Id = useParams().member2Id;
  const getChatsApiCallback = useCallback(() => getChatsApi(), []);
  const createChatApiCallback = useCallback(
    () => createChatApi({ member2Id }),
    [member2Id]
  );


  const { state: activeChat } = useFetch(createChatApiCallback, null);
  const { state, loading, error } = useFetch(getChatsApiCallback, []);

  return (
    <div className={styles.chatPage}>
      <LoadingErrorOutput loading={loading} error={error} />
      <Chat chats={state} initChat={activeChat} />
    </div>
  );
}
