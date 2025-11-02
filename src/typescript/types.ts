export type User = {
  id?: number;
  email: string;
  fullname?: string;
  username?: string;
  about?: string;
  website?: string;
  avatar?: string;
  password?: string;
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
