import styles from "./IdBox.module.css";

interface IdBoxProps {
  email?: string;
}

export default function IdBox({ email }: IdBoxProps) {
  return (
    <div className={styles.box}>
      <div className={styles.textWrapper}>
        <div className={styles.bold}>이메일</div>
        <div className={styles.text}>{email || "CultPick@gmail.com"}</div>
      </div>
      <div className={styles.textWrapper}>
        <div className={styles.bold}>비밀번호</div>
        <div className={styles.btn}>비밀번호 재설정</div>
      </div>
    </div>
  );
}
