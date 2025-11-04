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

export type AuthStore = {
  loading: boolean;
  error: string | null;
  message: string | null;
  user: User | null;
};

export type Store = {
  auth: AuthStore;
};

export type FetchResponse<T, E> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: E;
    };

export type ResponseData<T> = {
  message: string;
  payload: T;
};

export type Comment = {
  id: number;
  userId: number;
  postId: number;
  text: string;
  updatedAt?: Date;
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
