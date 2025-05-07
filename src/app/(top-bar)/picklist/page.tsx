"use client";

import styles from "./page.module.css";
import Image from "next/image";

export default function PickList() {
  return (
    <div className={styles.container}>
      <div>
        <Image
          src={"/img/typography_logo.png"}
          alt="cultpick logo"
          width={318}
          height={77}
        />
      </div>
      <div className="pixel_text_20">My Pick List</div>
      <div className="pixel_text_20">목록 편집</div>
    </div>
  );
}
