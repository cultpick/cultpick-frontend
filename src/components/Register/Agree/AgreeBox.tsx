"use client";

import { useRecoilValue } from "recoil";
import styles from "./AgreeBox.module.css";
import Button from "../../Button";
import CheckSection from "./CheckSection";
import { isAllCheckedState } from "@/recoil/registerAtoms";
import { useRouter } from "next/navigation";

export default function AgreeBox() {
  const router = useRouter();

  const onClickNext = () => {
    router.push("/register/form");
  };
  const isAllChecked = useRecoilValue(isAllCheckedState);

  return (
    <div className={styles.boxContainer}>
      <CheckSection />
      <div className={styles.btnWrapper}>
        <Button
          text="다음 단계"
          state={isAllChecked ? "active" : "disabled"}
          width="60rem"
          onClick={onClickNext}
        />
      </div>
    </div>
  );
}
