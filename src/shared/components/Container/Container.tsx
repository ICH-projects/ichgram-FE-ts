import type { JSX } from "react";

import styles from "./Container.module.css";

export default function Container({
  children = "",
}: {
  children?: (JSX.Element | string)[] | JSX.Element | string;
}): JSX.Element {
  return <div className={styles.container}>{children}</div>;
}
