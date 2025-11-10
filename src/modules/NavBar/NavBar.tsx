import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "../../redux/store";
import {
  toggleModal,
  hideModal,
  showModal,
} from "../../redux/modal/modal-slice";
import { selectModal } from "../../redux/modal/modal-selectors";
import { logoutUser } from "../../redux/auth/auth-thunks";
import { selectUser } from "../../redux/auth/auth-selectors";

import IchgramLogo from "../../shared/components/IchgramLogo/IchgramLogo";

import Menu from "./Menu/Menu";
import type { ChildType } from "./Menu/menuItems";

import styles from "./NavBar.module.css";

const { VITE_API_URL: baseURL } = import.meta.env;

export default function NavBar() {
  const dispatch = useDispatch<AppDispatch>();
  const { childType } = useSelector(selectModal);

  const currentUser = useSelector(selectUser);

  const handleOnLogoutClick = () => {
    dispatch(logoutUser());
  };

  const onMenuClick = (
    childTypeParam: ChildType | undefined,
    childPropsParam: unknown
  ) => {
    if (!childTypeParam) {
      return dispatch(hideModal());
    }
    if (childTypeParam == childType) {
      return dispatch(toggleModal());
    }
    dispatch(
      showModal({ childType: childTypeParam, childProps: childPropsParam })
    );
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
