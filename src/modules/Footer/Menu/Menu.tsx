import { Link } from "react-router-dom";

import menuItems, { type ChildType } from "./menuItems";

import styles from "./Menu.module.css";

interface IMenuProps {
  className?: string;
  variant?: string;
  onMenuClick?: (param: ChildType | undefined, props: unknown) => unknown;
}

export default function Menu({
  className,
  variant = "",
  onMenuClick = () => {},
}: IMenuProps) {
  const fullClassName = `${styles.menu} ${className} ${styles[variant]}`;

  const elements = menuItems.map(({ title, link, childType }) => {
    return (
      <li
        key={title}
        className={
          title === "Profile"
            ? `${styles.item} ${styles.profileItem}`
            : styles.item
        }
        onClick={() => onMenuClick(childType, {})}
      >
        <Link to={link || ""} className={styles.link}>
          <p className={styles.title}>{title}</p>
        </Link>
      </li>
    );
  });

  return <ul className={fullClassName}>{elements}</ul>;
}
