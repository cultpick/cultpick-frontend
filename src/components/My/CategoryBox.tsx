import styles from "./CategoryBox.module.css";

export default function CategoryBox() {
  return (
    <div className={styles.box}>
      <div className={styles.textWrapper}>
        <div className={styles.bold}>관심 카테고리 선택</div>
        <div className={styles.btn}>설정하러 가기</div>
      </div>
    </div>
  );
}
