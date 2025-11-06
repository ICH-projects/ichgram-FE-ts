import { useEffect, useState } from "react";

import styles from "./Info.module.css";

interface IInfoProps {
  className?: string | null;
  loading?: boolean;
  error?: string | null;
  message?: string | null;
  render?: boolean;
  timeout?: number;
}

export default function Info({
  className = "",
  loading = false,
  error = null,
  message = null,
  render = true,
  timeout = 5000,
}: IInfoProps) {
  const fullClassName = `${styles.main} ${className}`;

  const [localMessage, setLocalMessage] = useState(message);

  useEffect(() => {
    setLocalMessage(message);
    if (!message) return;
    const t = setTimeout(() => {
      setLocalMessage(null);
    }, timeout);
    return () => clearTimeout(t);
  }, [message, render, timeout]);

  return (
    <div className={fullClassName}>
      {loading && <p className={styles.loading}>Loading...</p>}
      {!!error && <p className={styles.error}>Error: {error}</p>}
      {!!localMessage && <p className={styles.info}>Info: {localMessage}</p>}
    </div>
  );
}
