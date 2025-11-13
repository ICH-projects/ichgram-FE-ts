import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "../../redux/store";

import { selectNotificationsStore } from "../../redux/notifications/notifications-selectors";
import { selectUser } from "../../redux/auth/auth-selectors";
import { showModal } from "../../redux/modal/modal-slice";
import {
  markAllAsRead,
  markAsRead,
} from "../../redux/notifications/notifications-thunks";

import Info from "../../shared/components/Info/Info";
import { MarkAsReadIcon } from "../../shared/components/icons";

import Card from "./NotificationCard/NotificationCard";

import styles from "./Notifications.module.css";

export default function Notifications() {
  const dispatch = useDispatch<AppDispatch>();

  const currentUser = useSelector(selectUser);
  const { notifications, error, loading, message } = useSelector(
    selectNotificationsStore
  );

  const showPost = (postId: number): void => {
    dispatch(
      showModal({
        childType: "post_detail",
        childProps: {
          postId,
        },
      })
    );
  };

  const markAsReadHandler = (notificationId: number) => {
    dispatch(markAsRead(notificationId));
  };

  const markAllAsReadHandler = () => {
    dispatch(markAllAsRead(notifications.map((n) => n.id)));
  };

  const elements = notifications?.map((notification) => (
    <Card
      key={notification.id}
      notification={notification}
      currentUser={currentUser!}
      showPost={showPost}
      markAsRead={markAsReadHandler}
    />
  ));

  return (
    <div
      className={styles.notifications}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <h1 className={styles.title}>
        Notifications
        <div
          title="Mark all notifications as read"
          onClick={markAllAsReadHandler}
        >
          <MarkAsReadIcon className={styles.markAsReadIcon} />
        </div>
      </h1>
      <h2 className={styles.subTitle}>New</h2>
      {elements}
      <Info error={error} loading={loading} message={message} />
    </div>
  );
}
