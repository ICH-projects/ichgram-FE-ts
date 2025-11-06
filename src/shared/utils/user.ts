import type { User } from "../../typescript/types";

export const isUserFollowed = (
  targetUser: User | null | undefined,
  followerUser: User | null | undefined
): boolean => {
  if (!targetUser) return true;
  if (!followerUser) return true;
  return followerUser.id === targetUser.id
    ? true
    : targetUser.followers
    ? targetUser.followers.some(
        (follow) => follow.followerUserId === followerUser.id
      )
    : false;
};
