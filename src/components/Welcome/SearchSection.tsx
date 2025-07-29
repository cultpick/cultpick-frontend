"use client";

import Image from "next/image";
import styles from "./SearchSection.module.css";
import Pick_IC from "@/../public/svgs/home/pick_primary.svg";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

export default function SearchSection() {
  const { elementRef, isVisible } = useIntersectionObserver();

  return (
    <section
      ref={elementRef}
      className={`${styles.searchSection} ${isVisible ? styles.animate : ""}`}
    >
      <div className={styles.sectionContainer}>
        <div className={styles.sectionContent}>
          <div className={styles.sectionText}>
            <h2 className={styles.sectionTitle}>Search Modal</h2>
            <p className={styles.sectionDescription}>
              여러분이 공연을 찾는데에 있어서 편리한 탐색을 위해,
              <br />
              CultPick의 검색 모달을 이용하여
              <br />
              <span className={styles.bold}>원하는 조건의 공연을 검색</span>할
              수 있어요.
            </p>
          </div>
          <div className={styles.sectionImg}>
            <Image
              src={"/img/welcome/search-1.png"}
              alt="search modal"
              width={480.3}
              height={303}
              quality={100}
            />
          </div>
          <div className={styles.background} />
          <div className={styles.imgWrapper1}>
            <Image
              src={"/img/home/star1.png"}
              alt={"Search 설명"}
              width={289}
              height={289}
            />
          </div>
        </div>
        <div className={styles.imgWrapper2}>
          <Image
            src={"/img/home/star2.png"}
            alt={"Search 설명"}
            width={289}
            height={289}
          />
        </div>
      </div>
      <div className={styles.iconWrapper}>
        <Pick_IC />
      </div>
    </section>
  );
}
