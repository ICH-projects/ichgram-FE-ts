import { Link } from "react-router-dom";

import type { User } from "../../../typescript/types";

import { ClosedIcon } from "../../../shared/components/icons";

import styles from "./UserCard.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

interface IUserCardProps {
  user: User;
  recent?: boolean;
  onClick?: (user: User) => void;
  onRemove?: (userId: number) => void;
}

export default function UserCard({
  user,
  recent = false,
  onClick = () => {},
  onRemove = () => {},
}: IUserCardProps) {
  return (
    <div onClick={() => onClick(user)} className={styles.card}>
      <Link to={`/profile/${user.id}`} className={styles.info}>
        <div className={styles.avatarWrapper}>
          <img
            src={`${baseURL}/${user.avatar}`}
            alt=""
            className={styles.avatar}
          />
        </div>
        <span className={styles.username}>{user.username}</span>
      </Link>

      {recent && (
        <div
          className={styles.closeIconWrapper}
          onClick={() => onRemove(user.id!)}
        >
          <ClosedIcon className={styles.closeIcon} />
        </div>
      )}
    </div>
  );
}
