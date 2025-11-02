import background from "./background.png";

import styles from "./BannerPhone.module.css";

export default function BannerPhone({ className = "", variant = "" }) {
  const fullClassName = `${styles.bannerPhone} ${className} ${styles[variant]}`;
  return (
    <div className={fullClassName}>
      <img src={background} alt="" />
    </div>
  );
}
