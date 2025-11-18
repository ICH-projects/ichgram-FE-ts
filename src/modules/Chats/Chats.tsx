import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import type { Chat } from "../../typescript/types";
import type { AppDispatch } from "../../redux/store";

import { selectUser } from "../../redux/auth/auth-selectors";
import { setActiveChat } from "../../redux/chat/chat-slice";
import {
  selectActiveChat,
  selectChats,
  selectChatsServiceData,
} from "../../redux/chat/chat-selectors";
import { createChat, getChats } from "../../redux/chat/chat-thunks";

import Info from "../../shared/components/Info/Info";

import ChatCard from "./ChatCard/ChatCard";
import Messenger from "./Messenger/Messenger";

import styles from "./Chats.module.css";

interface IChatsProps {
  initCompanionId: number | undefined;
}

export default function Chats({ initCompanionId }: IChatsProps) {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectUser);
  const { error, loading } = useSelector(selectChatsServiceData);
  const chats: Chat[] = useSelector(selectChats);
  const activeChat: Chat | null = useSelector(selectActiveChat);

  useEffect(() => {
    (async () => {
      await dispatch(getChats());
    })();
  }, [dispatch]);

  useEffect(() => {
    (async () => {
      if (!initCompanionId) return;
      if (chats.length < 1) return;

      let chat = chats.find(
        (c) =>
          c.member1Id === initCompanionId || c.member2Id === initCompanionId
      );
      if (!chat) {
        return await dispatch(
          createChat({ member2Id: initCompanionId } as Chat)
        );
      }
      chat = chats.find(
        (c) =>
          c.member1Id === initCompanionId || c.member2Id === initCompanionId
      );
      dispatch(setActiveChat(chat));
    })();
  }, [dispatch, initCompanionId, chats]);

  const handleClickOnChat = (chat: Chat) => {
    dispatch(setActiveChat(chat));
  };

  const chatElements = chats?.map((chat) => (
    <ChatCard
      key={chat.id}
      chat={chat}
      active={chat?.id === activeChat?.id ? true : false}
      handleClick={handleClickOnChat}
      currentUser={currentUser!}
    />
  ));

  return (
    <div className={styles.chat}>
      <div className={styles.chatsWrapper}>
        <div className={styles.chatsHeader}>
          <p className={styles.chatsHeaderUsername}>{currentUser!.username}</p>
        </div>
        <div className={styles.chats}>{chatElements}</div>
        <Info loading={loading} error={error} />
      </div>
      {activeChat && <Messenger />}
    </div>
  );
}
