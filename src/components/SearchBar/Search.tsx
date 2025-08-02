"use client";

import { useRecoilState } from "recoil";
import styles from "./Search.module.css";
import IC_SEARCH from "@/../public/svgs/search_icon.svg";
import { searchModalState } from "@/states/client/atoms";

export default function Search() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(searchModalState);

  const handleSearchClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container} onClick={handleSearchClick}>
      <div className={`body_18_R ${styles.textColor}`}>
        행사를 검색해보세요.
      </div>
      <IC_SEARCH />
    </div>
  );
}
