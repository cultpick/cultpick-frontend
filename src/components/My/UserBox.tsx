import styles from "./User.module.css";

export default function IdBox() {
  return (
    <div className={styles.box}>
      <div className={styles.textWrapper}>
        <div className={styles.bold}>이름</div>
        <div className={styles.text}>홍길동</div>
        <button type="button" className={styles.confirmBtn}>
          수정
        </button>
      </div>
      <div className={styles.textWrapper}>
        <div className={styles.bold}>성별</div>
        <div className={styles.text}>남성</div>
        <button type="button" className={styles.confirmBtn}>
          수정
        </button>
      </div>
      <div className={styles.textWrapper}>
        <div className={styles.bold}>생년월일</div>
        <div className={styles.text}>2002 - 09 - 07</div>
        <button type="button" className={styles.confirmBtn}>
          수정
        </button>
      </div>
      <div className={styles.textWrapper}>
        <div className={styles.bold}>주소</div>
        <div className={styles.addressWrapper}>
          <div className={styles.address}>경기</div>
          <div className={styles.addressSub}>성남시</div>
        </div>
        <button type="button" className={styles.confirmBtn}>
          수정
        </button>
      </div>
    </div>
  );
}
