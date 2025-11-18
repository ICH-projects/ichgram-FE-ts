import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import type { Comment,  Like, Post } from "../../typescript/types";

import {
  createPostApi,
  deletePostByIdApi,
  findPostsApi,
  getLastUpdatedPostsApi,
  getPostsApi,
} from "../../shared/api/post-api";
import { addCommentApi } from "../../shared/api/comment-api";
import { likePostApi } from "../../shared/api/like-api";
// import { followUserApi } from "../../shared/api/follow-api";

export const getLastUpdatedPosts = createAsyncThunk(
  "posts/getUpdates",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getLastUpdatedPostsApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/explore",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getPostsApi();
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const findPosts = createAsyncThunk(
  "posts/search",
  async (payload: Post, { rejectWithValue }) => {
    try {
      const { data } = await findPostsApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/create",
  async (payload: Post, { rejectWithValue }) => {
    try {
      const { data } = await createPostApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async (payload: Comment, { rejectWithValue }) => {
    try {
      const { data } = await addCommentApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/like",
  async (payload: Like, { rejectWithValue }) => {
    try {
      const { data } = await likePostApi(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

// export const followUser = createAsyncThunk(
//   "posts/follow_user",
//   async (payload: Follow, { rejectWithValue }) => {
//     try {
//       const { data } = await followUserApi(payload);
//       return data;
//     } catch (error) {
//       return rejectWithValue(
//         (error as AxiosError<{ message: string }>).response?.data?.message ||
//           (error as AxiosError).message
//       );
//     }
//   }
// );

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (payload: number, { rejectWithValue }) => {
    try {
      await deletePostByIdApi(payload);
      return payload;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);
