import { useRef, useState, type JSX } from "react";
import { Outlet } from "react-router-dom";

import { type ChildType } from "../../modules/NavBar/Menu/menuItems";

import NavBar from "../../modules/NavBar/NavBar";
import PostCreateForm from "../../modules/PostCreateForm/PostCreateForm";

import Container from "../../shared/components/Container/Container";
import Modal from "../../shared/components/Modal/Modal";

import styles from "./PrivatePageWrapper.module.css";

export default function PrivatePageWrapper(): JSX.Element {
  const [modalHidden, setModalHidden] = useState(true);
  const [childType, setChildType] = useState<ChildType | null>(null);
  const contentRef = useRef(null);

  const onModalClickHandler = () => {
    setModalHidden(true);
    setChildType(null);
    (contentRef.current as unknown as HTMLDivElement).style.overflowY = "auto";
  };

  const onMenuClick = (childTypeParam: ChildType | undefined) => {
    if (!childTypeParam) {
      setChildType(null);
      return setModalHidden(true);
    }
    if (childTypeParam === childType) {
      return setModalHidden((prev) => !prev);
    }
    setModalHidden(false);
    setChildType(childTypeParam);
  };

  return (
    <Container>
      <div className={styles.privatePageWrapper}>
        <div className={styles.navbar}>
          <NavBar onMenuClick={onMenuClick} />
        </div>
        <div ref={contentRef} className={styles.content}>
          <Outlet />
          <Modal hidden={modalHidden} onClickHandle={onModalClickHandler}>
            {childType === "create" && <PostCreateForm closeForm={onModalClickHandler}/>}
            {childType === "notifications" && "notifications"}
            {childType === "search" && "search"}
          </Modal>
        </div>
        <div className={styles.footer}>footer</div>
      </div>
    </Container>
  );
}
