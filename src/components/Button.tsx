import React from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  text: string;
  state: "active" | "disabled" | "sub" | "completed";
  width?: string;
  height?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({
  text,
  state,
  width = "44rem",
  height = "6rem",
  onClick,
}) => {
  const getClassName = (state: string) => {
    switch (state) {
      case "active":
        return styles.active;
      case "disabled":
        return styles.disabled;
      case "sub":
        return styles.sub;
      case "completed":
        return styles.completed;
      default:
        return "";
    }
  };

  return (
    <button
      className={`${styles.button} ${getClassName(state)} btn_text`}
      style={{ width, height }}
      onClick={onClick}
      disabled={state === "disabled"}
    >
      {text}
    </button>
  );
};

export default Button;
