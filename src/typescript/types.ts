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

export type ModalStore = {
  hidden: boolean;
  childType: string | null;
  childProps: unknown | null;
};

export type Store = {
  auth: AuthStore;
  modal: ModalStore;
  posts: PostsStore;
};
