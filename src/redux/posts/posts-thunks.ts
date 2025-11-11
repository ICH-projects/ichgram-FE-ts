import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import type { Comment, Follow, Like } from "../../typescript/types";

import { deletePostByIdApi, getLastUpdatedPostsApi } from "../../shared/api/post-api";
import { addCommentApi } from "../../shared/api/comment-api";
import { likePostApiThunk } from "../../shared/api/like-api";
import { followUserApiThunk } from "../../shared/api/follow-api";

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
      const { data } = await likePostApiThunk(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);

export const followUser = createAsyncThunk(
  "posts/follow_user",
  async (payload: Follow, { rejectWithValue }) => {
    try {
      const { data } = await followUserApiThunk(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as AxiosError<{ message: string }>).response?.data?.message ||
          (error as AxiosError).message
      );
    }
  }
);


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