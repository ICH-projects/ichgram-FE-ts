import { Link } from "react-router-dom";

import BannerPhone from "/src/shared/components/BannerPhone/BannerPhone";

import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.wrapper}>
        <BannerPhone />
        <div className={styles.info}>
          <h1 className={styles.title}>Oops! Page Not Found (404 Error)</h1>
          <p className={styles.text}>
            We're sorry, but the page you're looking for doesn't seem to exist.
          </p>
          <p className={styles.text}>
            If you typed the URL manually, please double-check the spelling.
          </p>
          <p className={styles.text}>
            If you clicked on a link, it may be outdated or broken.
          </p>
          <Link to={"/"} className={styles.link}>
            Click to home page
          </Link>
        </div>
      </div>
    </div>
  );
}
