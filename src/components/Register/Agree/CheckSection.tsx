"use client";

import { useRecoilState } from "recoil";
import Check_IC from "@/../public/svgs/check_icon.svg";
import styles from "./CheckSection.module.css";
import TermsOfService from "@/constants/TermsOfService";
import PrivacyPolicy from "@/constants/PrivacyPolicy";
import {
  isAllCheckedState,
  isTermsCheckedState,
  isPrivacyCheckedState,
} from "@/recoil/registerAtoms";

export default function CheckSection() {
  const [isTermsChecked, setIsTermsChecked] =
    useRecoilState(isTermsCheckedState);
  const [isPrivacyChecked, setIsPrivacyChecked] = useRecoilState(
    isPrivacyCheckedState,
  );
  const [isAllChecked, setIsAllChecked] = useRecoilState(isAllCheckedState);

  const handleTermsCheck = () => {
    const newTermsChecked = !isTermsChecked;
    setIsTermsChecked(newTermsChecked);
    const newAllChecked = newTermsChecked && isPrivacyChecked;
    setIsAllChecked(newAllChecked);
  };

  const handlePrivacyCheck = () => {
    const newPrivacyChecked = !isPrivacyChecked;
    setIsPrivacyChecked(newPrivacyChecked);
    const newAllChecked = newPrivacyChecked && isTermsChecked;
    setIsAllChecked(newAllChecked);
  };

  const handleAllCheck = () => {
    const newCheckState = !isAllChecked;
    setIsAllChecked(newCheckState);
    setIsTermsChecked(newCheckState);
    setIsPrivacyChecked(newCheckState);
  };

  return (
    <div className={styles.boxContainer}>
      <div className={styles.labelContainer}>
        <label className={styles.checkLabel}>
          <input
            type="checkbox"
            id="checkTerms"
            className={styles.checkBtn}
            checked={isTermsChecked}
            onChange={handleTermsCheck}
          />
          <span className={styles.checkboxIcon}>
            <Check_IC
              style={{
                color: isTermsChecked ? "#5300EC" : "#919191",
              }}
            />
          </span>
          <span className="body_20_B">이용약관</span>
        </label>
        <div className={styles.captionWrapper}>
          <TermsOfService />
        </div>
      </div>

      <div className={styles.labelContainer}>
        <label className={styles.checkLabel}>
          <input
            type="checkbox"
            id="checkPrivacy"
            className={styles.checkBtn}
            checked={isPrivacyChecked}
            onChange={handlePrivacyCheck}
          />
          <span className={styles.checkboxIcon}>
            <Check_IC
              style={{
                color: isPrivacyChecked ? "#5300EC" : "#919191",
              }}
            />
          </span>
          <span className="body_20_B">개인정보 수집 및 이용</span>
        </label>
        <div className={styles.captionWrapper}>
          <PrivacyPolicy />
        </div>
      </div>

      <div className={styles.labelContainer}>
        <label className={styles.checkLabel}>
          <input
            type="checkbox"
            id="checkAll"
            className={styles.checkBtn}
            checked={isAllChecked}
            onChange={handleAllCheck}
          />
          <span className={styles.checkboxIcon}>
            <Check_IC
              style={{
                color: isAllChecked ? "#5300EC" : "#919191",
              }}
            />
          </span>
          <span className="body_20_B">전체 동의</span>
        </label>
      </div>
    </div>
  );
}
