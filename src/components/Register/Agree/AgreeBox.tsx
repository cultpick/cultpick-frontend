import { useState } from "react";
import styles from "./AgreeBox.module.css";
import Button from "../../Button";
import CheckSection from "./CheckSection";

export default function AgreeBox() {
  const [isAllChecked, setIsAllChecked] = useState(false);

  const handleAllCheckedChange = (isChecked: boolean) => {
    setIsAllChecked(isChecked);
  };

  return (
    <div className={styles.boxContainer}>
      <CheckSection onAllCheckedChange={handleAllCheckedChange} />
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
