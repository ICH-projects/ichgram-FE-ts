import { useEffect, useRef, type JSX } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { selectModal } from "../../redux/modal/modal-selectors";
import type { AppDispatch } from "../../redux/store";
import { getNotifications } from "../../redux/notifications/notifications-thunks";

import NavBar from "../../modules/NavBar/NavBar";
import PostCreateForm from "../../modules/PostCreateForm/PostCreateForm";
import PostDetail, {
  type IPostDetailProps,
} from "../../modules/PostDetail/PostDetail";
import Notifications from "../../modules/Notifications/Notifications";

import Container from "../../shared/components/Container/Container";
import Modal from "../../shared/components/Modal/Modal";

import styles from "./PrivatePageWrapper.module.css";
import { AppSocket } from "../../shared/socket/socket-client";

export default function PrivatePageWrapper(): JSX.Element {
  const { hidden, childType, childProps } = useSelector(selectModal);
  const dispatch = useDispatch<AppDispatch>();

  const contentRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    AppSocket.getInstance();
  }, []);

  useEffect(() => {
    dispatch(getNotifications());
  }, [dispatch]);

  useEffect(() => {
    (contentRef.current as unknown as HTMLDivElement).style.overflowY = hidden
      ? "auto"
      : "hidden";
    offsetModal();
  }, [hidden]);

  const offsetModal = () => {
    const modalTopOffset: number = contentRef.current?.scrollTop || 0;
    modalRef.current?.style.setProperty("top", `${modalTopOffset}px`);
  };

  return (
    <Container>
      <div className={styles.privatePageWrapper}>
        <div className={styles.navbar}>
          <NavBar />
        </div>
        <div ref={contentRef} className={styles.content}>
          <Outlet />
          <Modal hidden={hidden} ref={modalRef}>
            {childType === "create" && <PostCreateForm />}
            {childType === "post_detail" && (
              <PostDetail {...(childProps as IPostDetailProps)} />
            )}
            {childType === "notifications" && <Notifications />}
            {childType === "search" && "search"}
          </Modal>
        </div>
        <div className={styles.footer}>footer</div>
      </div>
    </Container>
  );
}
