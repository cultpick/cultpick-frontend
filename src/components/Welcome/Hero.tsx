import Image from "next/image";
import styles from "./Hero.module.css";
import Pick_IC from "@/../public/svgs/home/pick_primary.svg";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>
        <Image
          src={"/img/typography_logo.png"}
          alt="cultpick logo"
          width={400}
          height={96.739}
          quality={100}
        />
        <p className={styles.subtitle}>문화를 Pick 하는 방법, 컬픽</p>
      </h1>
      <div className={styles.welcomeMessageContainer}>
        <span className={styles.asterisk}>*</span>
        <div className={styles.messageContainer}>
          <span className={styles.welcomeMessage}>
            안녕하세요.
            <br />
            CultPick을 이용해 주셔서 감사합니다.
          </span>
          <p className={styles.description}>
            문화생활을 즐기고자 공연을 찾을 때,
            <br />
            어디서 어떻게 찾아야 할지 모호하여 불편을 겪으신 적이 있으신가요?
            <br />
            CultPick은 이러한 고충을 해결하고자&nbsp;
            <span className={styles.textBold}>
              공연, 전시, 축제 등의 대중문화·예술 공연 검색 및 북마킹 서비스
            </span>
            를 제공합니다.
          </p>
        </div>
      </div>
      <div className={styles.iconWrapper}>
        <Pick_IC />
      </div>
    </section>
  );
}
