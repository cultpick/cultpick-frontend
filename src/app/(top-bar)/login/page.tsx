"use client";
import Image from "next/image";
import styles from "./page.module.css";
import BlurBox from "@/components/Login/BlurBox";
import Button from "@/components/Button";

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <Image
        src={"/img/typography_logo.png"}
        alt="cultpick logo"
        width={318}
        height={77}
      />
      <div className={styles.boxWrapper}>
        <BlurBox />
      </div>
    </div>
  );
}
