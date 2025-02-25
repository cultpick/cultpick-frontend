import Image from "next/image";
import styles from "./NonLogin.module.css";

export default function NonLogin() {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <div className={styles.title}>
          당신의 취향에 맞는 행사들을 추천 받으세요.
        </div>
        <div className={styles.caption}>
          컬픽이 당신을 위한 사용자 맞춤형 추천을 해드립니다.
        </div>
      </div>
      <div>
        {/* <Image /> */}
        <div>로그인하러 가기</div>
      </div>
    </div>
  );
}
