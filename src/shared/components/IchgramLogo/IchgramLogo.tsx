import styles from "./IchgramLogo.module.css";

export default function IchgramLogo({ className, variant = "" }) {
  const fullClassName = `${styles.ichgramLogo} ${className} ${styles[variant]}`;
  return <p className={fullClassName}>ICHGRAM</p>;
}
