import { useState, useRef, useEffect } from "react";
import styles from "./AddressSelector.module.css";
import DownArrow_IC from "@/../public/svgs/bottom_arrow.svg";
import { useRecoilState } from "recoil";
import { registerFormState } from "@/states/client/registerAtoms";
import { useAddress } from "@/states/server/queries";

import { Address } from "@/model/address";

interface Region extends Address {}

export default function AddressSelector() {
  const [formData, setFormData] = useRecoilState(registerFormState);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [selectedSubRegion, setSelectedSubRegion] = useState<{
    code: string;
    name: string;
  } | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<
    "region" | "subRegion" | null
  >(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: addressData } = useAddress();

  // 주소가 이미 선택되어 있는 경우 초기값 설정
  useEffect(() => {
    if (formData.address) {
      const [regionName, subRegionName] = formData.address.split(" ");
      const region = addressData?.find((r) => r.name === regionName);
      if (region) {
        setSelectedRegion(region);
        const subRegion = region.subregions.find(
          (sr) => sr.name === subRegionName,
        );
        if (subRegion) {
          setSelectedSubRegion(subRegion);
        }
      }
    }
  }, [formData.address, addressData]);

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
  const handleRegionSelect = (region: Region) => {
    setSelectedRegion(region);
    setSelectedSubRegion(null);
    setActiveDropdown("subRegion");
    setFormData((prev) => ({ ...prev, address: region.name }));
  };

  // 하위 카테고리 선택
  const handleSubRegionSelect = (subRegion: { code: string; name: string }) => {
    setSelectedSubRegion(subRegion);
    setActiveDropdown(null);
    if (selectedRegion) {
      setFormData((prev) => ({
        ...prev,
        address: `${selectedRegion.name} ${subRegion.name}`,
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
          {selectedRegion?.name || "지역"}
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
            {selectedSubRegion?.name || "시/군/구"}
            <DownArrow_IC />
          </button>
        )}
      </div>

      {/* 상위 카테고리 드롭다운 */}
      {activeDropdown === "region" && (
        <div className={styles.dropdown}>
          {addressData?.map((region) => (
            <div
              key={region.code}
              className={`body_18_R ${styles.dropdownItem}`}
              onClick={() => handleRegionSelect(region)}
            >
              <input
                type="radio"
                checked={selectedRegion?.code === region.code}
                readOnly
                className={styles.radioInput}
              />
              {region.name}
            </div>
          ))}
        </div>
      )}

      {/* 하위 카테고리 드롭다운 (상위 선택 후만 나타남) */}
      {activeDropdown === "subRegion" && selectedRegion && (
        <div className={styles.dropdown}>
          {selectedRegion.subregions.map((subRegion) => (
            <div
              key={subRegion.code}
              className={`body_18_R ${styles.dropdownItem}`}
              onClick={() => handleSubRegionSelect(subRegion)}
            >
              <input
                type="radio"
                checked={selectedSubRegion?.code === subRegion.code}
                readOnly
                className={styles.radioInput}
              />
              {subRegion.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
