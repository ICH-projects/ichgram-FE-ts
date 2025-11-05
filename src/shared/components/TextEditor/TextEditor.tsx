import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from "react";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import type { FieldValues, UseFormRegister } from "react-hook-form";

import styles from "./TextEditor.module.css";

interface ITextEditorProps {
  className?: string;
  register: UseFormRegister<FieldValues>;
  name: string;
  reset: boolean;
}

export default function TextEditor({
  className = "",
  register,
  name = "text",
  reset = true,
  ...props
}: ITextEditorProps) {
  const fullClassName = `${styles.textEditor} ${className}`;

  const cursorPosition = useRef(0);
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue("");
  }, [reset]);

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (event?.target?.localName === "textarea") {
      cursorPosition.current = event.target.selectionStart;
      setValue(event.target.value);
    }
  };
  const handleOnClick = (
    event: MouseEvent<HTMLTextAreaElement> & {
      target: { selectionStart: number; localName: string };
    }
  ) => {
    if (event?.target?.localName === "textarea") {
      cursorPosition.current = event.target.selectionStart;
    }
  };

  const handleEmojiClick = ({ emoji }: EmojiClickData) => {
    setValue((prev) => {
      const valueArr = prev.split("");
      valueArr.splice(cursorPosition.current, 0, emoji);
      return valueArr.join("");
    });

    cursorPosition.current += emoji.length;
  };

  return (
    <div className={fullClassName}>
      <textarea
        className={styles.textarea}
        {...register(name)}
        {...props}
        spellCheck
        maxLength={2200}
        onChange={handleOnChange}
        onClick={handleOnClick}
        value={value}
      ></textarea>
      <p className={styles.length}>{value.length}/2200</p>
      <EmojiPicker
        reactionsDefaultOpen={true}
        onReactionClick={handleEmojiClick}
        allowExpandReactions={false}
        lazyLoadEmojis={true}
      />
    </div>
  );
}
