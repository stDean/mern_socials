import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  posts: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_MODE: state => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    SET_LOGIN: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
    },
    SET_LOGOUT: state => {
      state.user = null;
      state.token = null;
    },
    SET_FRIENDS: (state, { payload }) => {
      if (state.user) {
        state.user.friends = payload.friends;
      } else {
        console.error("user friends non-existent :(");
      }
    },
    SET_POSTS: (state, { payload }) => {
      state.posts = payload.posts;
    },
    SET_POST: (state, { payload }) => {
      const updatedPosts = state.posts.map(post => {
        if (post._id === payload.post._id) return payload.post;
        return post;
      });
      state.posts = updatedPosts;
    }
  }
});

export const { SET_MODE, SET_LOGIN, SET_LOGOUT, SET_FRIENDS, SET_POSTS, SET_POST } = authSlice.actions;

export default authSlice.reducer;