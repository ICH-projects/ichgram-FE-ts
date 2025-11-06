import { Link } from "react-router-dom";

import menuItems, { type ChildType } from "./menuItems";

import styles from "./Menu.module.css";

interface IMenuProps {
  className?: string;
  variant?: string;
  onMenuClick?: (param: ChildType | undefined) => unknown;
}

export default function Menu({
  className = "",
  variant = "",
  onMenuClick = () => {},
}: IMenuProps) {
  const fullClassName = `${styles.menu} ${className} ${styles[variant]}`;

  const elements = menuItems.map(({ title, icon, link, child }) => {
    return (
      <li
        key={title}
        className={styles.item}
        onClick={() => onMenuClick(child)}
      >
        <Link to={link || ""} className={styles.link}>
          <img src={`/src/assets/icons/${icon}.svg`} className={styles.icon} />
          <p className={styles.title}>{title}</p>
        </Link>
      </li>
    );
  });

  return <ul className={fullClassName}>{elements}</ul>;
}
