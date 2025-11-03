import { useRef, useState, type JSX } from "react";
import { Outlet } from "react-router-dom";

import Container from "../../shared/components/Container/Container";

import Modal from "../../shared/components/Modal/Modal";

import styles from "./PrivatePageWrapper.module.css";

export default function PrivatePageWrapper(): JSX.Element {
  const [modalHidden, setModalHidden] = useState(true);
  const contentRef = useRef(null);

  const onModalClickHandle = () => {
    setModalHidden(true);
    (contentRef.current as unknown as HTMLDivElement).style.overflowY = "auto";
  };

  return (
    <Container>
      <div className={styles.privatePageWrapper}>
        <div className={styles.navbar}>navbar</div>
        <div ref={contentRef} className={styles.content}>
          <Outlet />
          <Modal hidden={modalHidden} onClickHandle={onModalClickHandle}>
            Modal
          </Modal>
        </div>
        <div className={styles.footer}>footer</div>
      </div>
    </Container>
  );
}
