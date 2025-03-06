import { useState, useRef, useEffect } from "react";
import styles from "./AddressSelector.module.css";
import { regionData } from "@/constants/regionData";
import DownArrow_IC from "@/../public/svgs/bottom_arrow.svg";
import { useRecoilState } from "recoil";
import { registerFormState } from "@/store/registerState";

export default function AddressSelector() {
  const [formData, setFormData] = useRecoilState(registerFormState);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedSubRegion, setSelectedSubRegion] = useState<string | null>(
    null,
  );
  const [activeDropdown, setActiveDropdown] = useState<
    "region" | "subRegion" | null
  >(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 주소가 이미 선택되어 있는 경우 초기값 설정
  useEffect(() => {
    if (formData.address) {
      const [region, subRegion] = formData.address.split(" ");
      setSelectedRegion(region);
      setSelectedSubRegion(subRegion || null);
    }
  }, []);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // 상위 카테고리 선택
  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
    setSelectedSubRegion(null);
    setActiveDropdown("subRegion");
    setFormData((prev) => ({ ...prev, address: region }));
  };

  // 하위 카테고리 선택
  const handleSubRegionSelect = (subRegion: string) => {
    setSelectedSubRegion(subRegion);
    setActiveDropdown(null);
    if (selectedRegion) {
      setFormData((prev) => ({
        ...prev,
        address: `${selectedRegion} ${subRegion}`,
      }));
    }
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <div className={styles.row}>
        <button
          type="button"
          onClick={() =>
            setActiveDropdown(activeDropdown === "region" ? null : "region")
          }
          className={`body_18_B ${styles.dropdownButton}`}
        >
          {selectedRegion || "지역"}
          <DownArrow_IC />
        </button>

        {selectedRegion && (
          <button
            type="button"
            onClick={() =>
              setActiveDropdown(
                activeDropdown === "subRegion" ? null : "subRegion",
              )
            }
            className={`body_18_B ${styles.dropdownButton}`}
          >
            {selectedSubRegion || "시/군/구"}
            <DownArrow_IC />
          </button>
        )}
      </div>

      {/* 상위 카테고리 드롭다운 */}
      {activeDropdown === "region" && (
        <div className={styles.dropdown}>
          {Object.keys(regionData).map((region) => (
            <div
              key={region}
              className={`body_18_R ${styles.dropdownItem}`}
              onClick={() => handleRegionSelect(region)}
            >
              <input
                type="radio"
                checked={selectedRegion === region}
                readOnly
                className={styles.radioInput}
              />
              {region}
            </div>
          ))}
        </div>
      )}

      {/* 하위 카테고리 드롭다운 (상위 선택 후만 나타남) */}
      {activeDropdown === "subRegion" && selectedRegion && (
        <div className={styles.dropdown}>
          {regionData[selectedRegion].map((subRegion) => (
            <div
              key={subRegion}
              className={`body_18_R ${styles.dropdownItem}`}
              onClick={() => handleSubRegionSelect(subRegion)}
            >
              <input
                type="radio"
                checked={selectedSubRegion === subRegion}
                readOnly
                className={styles.radioInput}
              />
              {subRegion}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
