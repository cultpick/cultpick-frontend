"use client";

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useModal } from "@/hooks/useModal";
import Image from "next/image";
import styles from "./SearchModal.module.css";
import IC_SEARCH from "@/../public/svgs/search_icon.svg";
import { searchModalState } from "@/states/client/atoms";

export default function SearchModal() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(searchModalState);
  const { close } = useModal();

  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    };
  }, [isModalOpen]);

  const genres = [
    "연극",
    "무용",
    "대중무용",
    "클래식",
    "국악",
    "대중음악",
    "복합",
    "서커스・마술",
    "뮤지컬",
  ];

  const statuses = ["진행 예정", "진행 중"];

  const regions = [
    "서울",
    "경기",
    "인천",
    "강원",
    "대전",
    "세종",
    "충남",
    "충북",
    "부산",
  ];

  const handleClose = () => {
    setIsModalOpen(false);
    close();
  };

  if (!isModalOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <Image
              src={"/img/typography_logo.png"}
              alt="cultpick logo"
              width={318}
              height={77}
            />
          </div>
          <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
              <div className={`body_18_R ${styles.searchText}`}>
                행사를 검색해보세요.
              </div>
              <IC_SEARCH />
            </div>
          </div>
          <div className={styles.searchModalText}>Search Modal</div>
        </div>

        <div className={styles.filterSection}>
          <div className={styles.filterHeader}>
            <div className={styles.columnTitle}>장르</div>
            <div className={styles.columnTitle}>진행 예정 / 진행 중</div>
            <div className={styles.columnTitle}>지역</div>
            <div className={styles.filterHeaderHorizontalLine}></div>
          </div>

          <div className={styles.content}>
            <div className={styles.filterColumn}>
              <div className={styles.filterOptions}>
                {genres.map((genre, index) => (
                  <label key={index} className={styles.radioOption}>
                    <input
                      type="radio"
                      name="genre"
                      value={genre}
                      checked={selectedGenre === genre}
                      onChange={(e) => setSelectedGenre(e.target.value)}
                    />
                    <span className={styles.radioLabel}>{genre}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterColumn}>
              <div className={styles.filterOptions}>
                {statuses.map((status) => (
                  <label key={status} className={styles.radioOption}>
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={selectedStatus === status}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    />
                    <span className={styles.radioLabel}>{status}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterColumn}>
              <div className={styles.regionContainer}>
                <div className={styles.regionList}>
                  {regions.map((region) => (
                    <label key={region} className={styles.radioOption}>
                      <input
                        type="radio"
                        name="region"
                        value={region}
                        checked={selectedRegion === region}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                      />
                      <span className={styles.radioLabel}>{region}</span>
                    </label>
                  ))}
                </div>
                <div className={styles.citySelector}>
                  <span className={styles.cityPlaceholder}>
                    시/군을 선택해주세요.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            검색 결과로 얻고 싶은 조건의 카테고리를 선택해주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
