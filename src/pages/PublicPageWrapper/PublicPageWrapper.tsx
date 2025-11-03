import type { JSX } from "react";
import { Outlet } from "react-router-dom";

import Container from "../../shared/components/Container/Container";

import styles from "./PublicPageWrapper.module.css";

export default function PublicPageWrapper(): JSX.Element {
  return (
    <div className={styles.publicPageWrapper}>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
}
