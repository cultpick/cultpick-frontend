import React from "react";
import styles from "./InputBox.module.css";

type InputBoxProps = {
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
};

const InputBox: React.FC<InputBoxProps> = ({
  type,
  name,
  placeholder = "",
  value,
  onChange,
  error = false,
}) => {
  const inputClass = `${styles.input} body_18_R ${type === "password" ? styles.password : ""} ${error ? styles.errorBorder : ""}`;

  return (
    <input
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={inputClass}
      autoComplete="off"
    />
  );
};

export default InputBox;
