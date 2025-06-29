"use client";

import styles from "./Delete.module.css";
import { useRouter } from "next/navigation";

export default function Delete() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/my/delete");
  };

  return (
    <div className={styles.text} onClick={handleClick}>
      계정을 탈퇴하시겠습니까?
    </div>
  );
}
