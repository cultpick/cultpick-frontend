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
      <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
        <Button
          text="Active BUTTON"
          state="active"
          width="440px"
          height="60px"
        />
        <Button
          text="Disabled BUTTON"
          state="disabled"
          width="440px"
          height="60px"
        />
        <Button text="Sub BUTTON" state="sub" width="440px" height="60px" />
        <Button
          text="Completed BUTTON"
          state="completed"
          width="440px"
          height="60px"
        />
      </div>
    </div>
  );
}
