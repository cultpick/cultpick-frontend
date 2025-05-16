"use client";
import Image from "next/image";
import styles from "./page.module.css";
import IdBox from "@/components/My/IdBox";
import UserBox from "@/components/My/UserBox";
import CategoryBox from "@/components/My/CategoryBox";
import Logout from "@/components/My/Logout";
import Delete from "@/components/My/Delete";

export default function page() {
  return (
    <div className={styles.page}>
      <div className={styles.titleWrapper}>
        <Image
          src={"/img/my/my_icon.png"}
          alt="my icon"
          width={40}
          height={40}
          unoptimized={true}
        />
        <div className={styles.title}>My name</div>
      </div>
      <div className={styles.boxWrapper}>
        <IdBox />
        <UserBox />
        <CategoryBox />
        <Logout />
        <Delete />
      </div>
      <div className={styles.bgImgWrapper}>
        <div className={styles.bgImg}>
          <Image
            src={"/img/background-object.png"}
            alt={"background 이미지"}
            width={2683.86}
            height={180}
          />
          <Image
            src={"/img/background-object.png"}
            alt={"background 이미지"}
            width={2683.86}
            height={180}
          />
        </div>
      </div>
      <div className={styles.gradient} />
    </div>
  );
}
