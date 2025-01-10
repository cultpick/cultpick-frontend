import { useState } from "react";
import styles from "./BlurBox.module.css";
import InputBox from "./InputBox";

export default function BlurBox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  return (
    <div className={styles.boxContainer}>
      <div className={styles.loginTitle}>LOGIN</div>
      <form className={styles.form}>
        <InputBox
          label="Email"
          type="email"
          name="email"
          placeholder="이메일 입력"
          value={email}
          onChange={handleEmailChange}
        />
        <InputBox
          label="Password"
          type="password"
          name="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
