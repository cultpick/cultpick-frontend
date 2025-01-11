import React from "react";
import styles from "./InputBox.module.css";

type InputBoxProps = {
  type: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputBox: React.FC<InputBoxProps> = ({
  type,
  name,
  placeholder = "",
  value,
  onChange,
}) => {
  return (
    <input
      id={name}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`${styles.input} body_18_R`}
    />
  );
};

export default InputBox;
