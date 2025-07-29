"use client";

import Image from "next/image";
import styles from "./HomeSection.module.css";
import Pick_IC from "@/../public/svgs/home/pick_primary.svg";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function HomeSection() {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section
      ref={elementRef}
      className={`${styles.homeSection} ${isVisible ? styles.animate : ""}`}
    >
      <div className={styles.sectionContainer}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionImg}>
            <Image
              src={"/img/welcome/home-1.png"}
              alt="cultpick logo"
              width={271}
              height={371}
              style={{ marginRight: "-5rem" }}
              quality={100}
            />
            <Image
              src={"/img/welcome/home-2.png"}
              alt="cultpick logo"
              width={351}
              height={371}
              quality={100}
            />
          </div>
          <div className={styles.sectionText}>
            <h2 className={styles.sectionTitle}>HOME</h2>
            <p className={styles.sectionDescription}>
              CultPick에서는 한눈에 다양한 카테고리의 공연을 볼 수 있습니다.
              <br />홈 화면에서 CultPick 이용자들이 좋아한&nbsp;
              <span className={styles.bold}>이달의 인기 공연</span>을
              보여드리며,
              <br />
              사용자의 취향을 분석하여&nbsp;
              <span className={styles.bold}>
                사용자가 좋아할 만한 공연을 추천
              </span>
              해 드립니다.
            </p>
          </div>
          <div className={styles.background} />
          <div className={styles.imgWrapper}>
            <Image
              src={"/img/welcome/two-circle.png"}
              alt={"Home 설명"}
              width={443}
              height={323}
            />
          </div>
        </div>
      </div>
      <div className={styles.iconWrapper}>
        <Pick_IC />
      </div>
    </section>
  );
}
