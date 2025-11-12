import { useSelector } from "react-redux";

import { selectNotificationsStore } from "../../redux/notifications/notifications-selectors";
import { selectUser } from "../../redux/auth/auth-selectors";

import Info from "../../shared/components/Info/Info";

import Card from "./NotificationCard/NotificationCard";

import styles from "./Notifications.module.css";

export default function Notifications() {
  const currentUser = useSelector(selectUser);
  const { notifications, error, loading, message } = useSelector(
    selectNotificationsStore
  );

  const elements = notifications?.map((notification) => (
    <Card
      key={notification.id}
      notification={notification}
      currentUser={currentUser!}
    />
  ));

  return (
    <div
      className={styles.notifications}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <h1 className={styles.title}>Notifications</h1>
      <h2 className={styles.subTitle}>New</h2>
      {elements}
      <Info error={error} loading={loading} message={message} />
    </div>
  );
}
