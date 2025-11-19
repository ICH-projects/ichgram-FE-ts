import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectModal } from "../../redux/modal/modal-selectors";

import {
  showModal,
  hideModal,
  toggleModal,
} from "../../redux/modal/modal-slice";


import Menu from "./Menu/Menu";

import styles from "./Footer.module.css";
import type { ChildType } from "./Menu/menuItems";

export default function Footer() {
  const dispatch = useDispatch();
  const { childType } = useSelector(selectModal);

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
    <div className={styles.footer}>
      <Menu onMenuClick={onMenuClick} />
      <Link to={"/copyright"} className={styles.copyright}>
        {`${String.fromCodePoint(169)} 2024 ICHgram`}
      </Link>
    </div>
  );
}
