import items from "./items";

import styles from "./Dialog.module.css";

interface IDialogProps {
  className?: string;
  setDialogShow: (value: boolean) => void;
  deletePost: () => void;
  closePost: () => void;
}

export default function Dialog({
  className = "",
  setDialogShow,
  deletePost,
  closePost,
}: IDialogProps) {
  const fullClassName = `${styles.dialog} ${className}`;

  const handleClick = (action: string | undefined) => {
    setDialogShow(false);
    if (action === "delete") deletePost();
    if (action === "cancel") closePost();
  };

  const elements = items.map((item) => (
    <li key={item.title} className={styles.item}>
      <button
        className={`${styles.btn} ${item.attention && styles.attention}`}
        onClick={() => handleClick(item.action)}
      >
        {item.title}
      </button>
    </li>
  ));

  return <ul className={fullClassName}>{elements}</ul>;
}
