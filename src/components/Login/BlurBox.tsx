import { useState } from "react";
import styles from "./BlurBox.module.css";
import InputBox from "./InputBox";
import Button from "../Button";

export default function BlurBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className={styles.boxContainer}>
      <div className={styles.loginTitle}>LOGIN</div>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <InputBox
          type="email"
          name="email"
          placeholder="이메일 입력"
          value={email}
          onChange={handleEmailChange}
        />
        <InputBox
          type="password"
          name="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={handlePasswordChange}
        />
        <div className={styles.btnWrapper}>
          <Button text="로그인" state="active" />
        </div>
      </form>
    </div>
  );
}
