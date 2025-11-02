export const selectAuth = store => store.auth;

export const selectIsLogin = store => Boolean(store.auth.user);

export const selectUser = store => store.auth.user;

export const selectToken = store => store.auth.token;

