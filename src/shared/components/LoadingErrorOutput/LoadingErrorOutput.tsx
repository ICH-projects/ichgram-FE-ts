import { useEffect, useState } from "react";

import styles from "./LoadingErrorOutput.module.css";

export default function LoadingErrorOutput({
  className = "",
  loading = false,
  error = null,
  message = null,
  render = true,
  timeout = 5000,
}: {
  className?: string | null;
  loading?: boolean;
  error?: string | null;
  message?: string | null;
  render?: boolean;
  timeout?: number;
}) {
  const fullClassName = `${styles.loadingErrorOutput} ${className}`;

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
