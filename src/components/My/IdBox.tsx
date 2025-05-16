import styles from "./IdBox.module.css";

export default function IdBox() {
  return (
    <div className={styles.box}>
      <div className={styles.textWrapper}>
        <div className={styles.bold}>이메일</div>
        <div className={styles.text}>CultPick@gmail.com</div>
      </div>
      <div className={styles.textWrapper}>
        <div className={styles.bold}>비밀번호</div>
        <div className={styles.btn}>비밀번호 재설정</div>
      </div>
    </div>
  );
}
