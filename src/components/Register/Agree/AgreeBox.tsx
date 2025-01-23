"use client";

import { useRecoilValue } from "recoil";
import styles from "./AgreeBox.module.css";
import Button from "../../Button";
import CheckSection from "./CheckSection";
import { isAllCheckedState } from "@/recoil/atom";

export default function AgreeBox() {
  const isAllChecked = useRecoilValue(isAllCheckedState);

  return (
    <div className={styles.boxContainer}>
      <CheckSection />
      <div className={styles.btnWrapper}>
        <Button
          text="다음 단계"
          state={isAllChecked ? "active" : "disabled"}
          width="60rem"
        />
      </div>
    </div>
  );
}
