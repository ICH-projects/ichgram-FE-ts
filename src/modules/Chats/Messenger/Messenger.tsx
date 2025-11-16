import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import type { Chat, Message, User } from "../../../typescript/types";
import { type AppDispatch } from "../../../redux/store";

import { selectUser } from "../../../redux/auth/auth-selectors";
import {
  selectActiveChat,
  selectChatsServiceData,
} from "../../../redux/chat/chat-selectors";

import Info from "../../../shared/components/Info/Info";
import TextField from "../../../shared/components/TextField/TextField";

import MessageCard from "./MessageCard/MessageCard";

import styles from "./Messenger.module.css";
import {
  createMessage,
} from "../../../redux/chat/chat-thunks";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function Messenger(): ReactNode {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser: User | null = useSelector(selectUser);
  const activeChat: Chat = useSelector(selectActiveChat)!;
  const { loading, error, message } = useSelector(selectChatsServiceData);

  const companion: User =
    activeChat.member1Id === currentUser!.id
      ? activeChat.member2
      : activeChat.member1;

  const { register, handleSubmit, reset } = useForm();
  const msgBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    msgBoxRef.current!.scrollTop = msgBoxRef.current!.scrollHeight;
  });

  const handleOnSubmit = async (values: unknown) => {
    const message: Message = {
      ...(values as Message),
      authorId: currentUser!.id!,
      chatId: activeChat.id,
    };
    await dispatch(createMessage(message));
    reset();
  };

  const messageElements = activeChat.messages.map((message: Message) => (
    <MessageCard
      key={message.id}
      message={message}
      isMy={message.authorId === currentUser!.id}
    />
  ));

  return (
    <div className={styles.messenger}>
      <div className={styles.header}>
        <div className={styles.avatarWrapper}>
          <img
            src={`${baseURL}/${companion?.avatar}`}
            alt=""
            className={styles.avatar}
          />
        </div>
        <p className={styles.username}>{companion?.username}</p>
      </div>
      <div className={styles.userInfo}>
        <div className={styles.userInfoAvatarWrapper}>
          <img
            src={`${baseURL}/${companion?.avatar}`}
            alt=""
            className={styles.userInfoAvatar}
          />
        </div>
        <p className={styles.userInfoUsername}>{companion?.username}</p>
        <p className={styles.userInfoFullname}>{companion?.fullname}</p>
        <Link
          to={`/profile/${companion?.id}`}
          className={styles.userInfoButton}
        >
          View Profile
        </Link>
        <p className={styles.date}>{new Date().toUTCString()}</p>
      </div>
      <div className={styles.messages} ref={msgBoxRef}>
        {messageElements}
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)} className={styles.form}>
        <TextField
          register={register}
          name="text"
          // placeholder="Write text"
          className={styles.input}
          variant="filled"
        />
      </form>
      <Info loading={loading} error={error} message={message} />
    </div>
  );
}
