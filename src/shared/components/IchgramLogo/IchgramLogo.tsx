import styles from "./IchgramLogo.module.css";

interface IIchgramLogoProps {
  className?: string;
  variant?: string;
}

export default function IchgramLogo({
  className = "",
  variant = "",
}: IIchgramLogoProps) {
  const fullClassName = `${styles.ichgramLogo} ${className} ${styles[variant]}`;
  return <p className={fullClassName}>ICHGRAM</p>;
}
