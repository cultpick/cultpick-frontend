import React from "react";
import styles from "./InputBox.module.css";

interface InputBoxProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: boolean;
  disabled?: boolean;
  maxLength?: number;
}

export default function InputBox({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  disabled,
}: InputBoxProps) {
  const inputClass = `${styles.input} body_18_R ${error ? styles.errorBorder : ""}`;

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
      disabled={disabled}
    />
  );
}
