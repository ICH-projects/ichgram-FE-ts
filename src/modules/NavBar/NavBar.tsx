
import { Link } from "react-router-dom";
import IchgramLogo from "../../shared/components/IchgramLogo/IchgramLogo";

import Menu from "./Menu/Menu";

import styles from "./NavBar.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/auth/auth-thunks";
import { selectUser } from "../../redux/auth/auth-selectors";
import type { ChildType } from "./Menu/menuItems";

const { VITE_API_URL: baseURL } = import.meta.env;

interface INavbarProps {
  onMenuClick?: (param: ChildType | undefined) => unknown;
}

export default function NavBar({ onMenuClick }: INavbarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectUser);

  const handleOnLogoutClick = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={styles.navBar}>
      <div className={styles.left}>
        <IchgramLogo className={styles.logo} />
        <Menu onMenuClick={onMenuClick} />
        <Link to={`/profile/${currentUser!.id}`} className={styles.profile}>
          <div className={styles.avatarWrapper}>
            <img
              src={`${baseURL}/${currentUser!.avatar}`}
              className={styles.avatar}
            />
          </div>

          <p className={styles.title}>Profile</p>
        </Link>
        <button className={styles.logout} onClick={handleOnLogoutClick}>
          <p className={styles.title}>LOGOUT</p>
        </button>
      </div>
    </div>
  );
}
