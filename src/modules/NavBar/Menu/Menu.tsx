import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectNotificationCount } from "../../../redux/notifications/notifications-selectors";

import Badge from "../../../shared/components/Badge/Badge";

import menuItems, { type ChildType } from "./menuItems";

import styles from "./Menu.module.css";

interface IMenuProps {
  className?: string;
  variant?: string;
  onMenuClick?: (param: ChildType | undefined, props: unknown) => unknown;
}

export default function Menu({
  className = "",
  variant = "",
  onMenuClick = () => {},
}: IMenuProps) {
  const fullClassName = `${styles.menu} ${className} ${styles[variant]}`;

  const notificationCount = useSelector(selectNotificationCount);

  const elements = menuItems.map(({ title, icon, link, childType }) => {
    return (
      <li
        key={title}
        className={styles.item}
        onClick={() => onMenuClick(childType, {})}
      >
        <Link to={link || ""} className={styles.link}>
          <img src={`/src/assets/icons/${icon}.svg`} className={styles.icon} />
          <p className={styles.title}>{title}</p>
          {childType === "notifications" && notificationCount > 0 && (
            <Badge value={notificationCount} />
          )}
        </Link>
      </li>
    );
  });

  return <ul className={fullClassName}>{elements}</ul>;
}
