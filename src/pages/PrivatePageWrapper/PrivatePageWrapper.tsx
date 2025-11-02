import type { JSX } from "react";
import { Outlet } from "react-router-dom";

import Container from "../../shared/components/Container/Container";

import styles from "./PrivatePageWrapper.module.css";

export default function PrivatePageWrapper(): JSX.Element {
  return (
    <Container>
      <div className={styles.privatePageWrapper}>
        <div className={styles.navbar}>navbar</div>
        <div className={styles.content}><Outlet /> content</div>
        <div className={styles.footer}>footer</div>
        
      </div>
    </Container>
  );
}
