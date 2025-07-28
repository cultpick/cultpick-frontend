import Image from "next/image";
import styles from "./PickListSection.module.css";

export default function PickListSection() {
  return (
    <section className={styles.pickListSection}>
      <div className={styles.sectionContainer}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionImg}>
            <Image
              src={"/img/welcome/pickList-1.png"}
              alt="picklist mockup 1"
              width={278.52}
              height={303}
              style={{ marginRight: "-3rem" }}
              quality={100}
            />
            <Image
              src={"/img/welcome/pickList-2.png"}
              alt="picklist mockup 2"
              width={480.3}
              height={303}
              quality={100}
            />
          </div>
          <div className={styles.sectionText}>
            <h2 className={styles.sectionTitle}>Pick List</h2>
            <p className={styles.sectionDescription}>
              <span className={styles.bold}>
                마음에 드는 공연을 당신의 Pick List에 담을 수 있어요.
              </span>
              <br />
              Pick List를 통해 관심있는 공연을 한 눈에 보고,
              <br />
              손쉽게 목록을 편집해요.
            </p>
          </div>
          <div className={styles.background} />
          <div className={styles.imgWrapper1}>
            <Image
              src={"/img/home/star3.png"}
              alt={"Pick List 설명"}
              width={289}
              height={289}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
