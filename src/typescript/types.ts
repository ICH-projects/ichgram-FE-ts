import type { AxiosError } from "axios";

export type User = {
  id?: number;
  email: string;
  fullname?: string;
  username?: string;
  about?: string;
  website?: string;
  avatar?: string;
  password?: string;
  followers?: Follow[];
};

export type FetchResponse<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: AxiosError<{ message: string }>;
    };

export type Comment = {
  id: number;
  userId: number;
  postId: number;
  text: string;
  updatedAt: Date;
  user: User;
};

export type Like = {
  id: number;
  userId: number;
  postId: number;
};

export type Post = {
  id: number;
  userId: number;
  image: string;
  updatedAt: Date;
  comments?: Comment[];
  totalComments?: number;
  likes?: Like[];
  totalLikes?: number;
  isLiked?: boolean;
  user: User;
};

export type Follow = {
  id: number;
  followerUserId: number;
  targetUserId: number;
};

export type Notification = {
  id: number;
  authorUserId: number;
  type: "LIKED" | "COMMENTED" | "FOLLOWED";
  targetUserId: number;
  targetPostId: number;
  isViewed: boolean;
  authorUser: User;
  updatedAt: Date;
  targetPost: Post;
};

export type Chat = {
  id: number;
  member1Id: number;
  member2Id: number;
  member1: User;
  member2: User;
  messages: Message[];
};

export type Message = {
  id: number;
  chatId: number;
  authorId: number;
  text: string;
  author: User;
};

export type StoreAsync = {
  loading: boolean;
  error: string | null;
  message: string | null;
};

export type AuthStore = StoreAsync & {
  user: User | null;
};

export type PostsStore = StoreAsync & {
  posts: Post[];
};

export type NotificationsStore = StoreAsync & {
  notifications: Notification[];
};

export type SearchStore = StoreAsync & {
  result: User[];
  recent: User[];
};

export type ChatsStore = StoreAsync & {
  chats: Chat[];
  activeChat: Chat | null;
};

export type ModalStore = {
  hidden: boolean;
  childType: string | null;
  childProps: unknown | null;
};

export type Store = {
  auth: AuthStore;
  modal: ModalStore;
  posts: PostsStore;
  notifications: NotificationsStore;
  search: SearchStore;
  chats: ChatsStore;
};
