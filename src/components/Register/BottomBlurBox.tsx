import { useState } from "react";
import styles from "./BottomBlurBox.module.css";
import InputBox from "../InputBox";
import Button from "../Button";
import Check_IC from "@/../public/svgs/check_icon.svg";
import AddressSelector from "./Agree/AddressSelector";

export default function BottomBlurBox() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");

  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [address, setAddress] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleGenderChange = (value: string) => {
    setGender(value);
  };

  const handleBirthYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) setBirthYear(value);
  };

  const handleBirthMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 2) setBirthMonth(value);
  };

  const handleBirthDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 2) setBirthDay(value);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with:", {
      name,
      gender,
      birthYear,
      birthMonth,
      birthDay,
      address,
    });
  };

  return (
    <div className={styles.boxContainer}>
      <form onSubmit={handleFormSubmit} className={styles.form}>
        <div className={styles.formSection}>
          <div className={`body_20_B ${styles.inputLabel}`}>이름</div>
          <InputBox
            type="text"
            name="name"
            placeholder="이름"
            value={name}
            onChange={handleNameChange}
          />
        </div>

        <div className={styles.formSection}>
          <div className={`body_20_B ${styles.inputLabel}`}>성별</div>
          <div className={styles.genderWrapper}>
            <label className={`body_18_M ${styles.checkLabel}`}>
              <input
                type="checkbox"
                className={styles.checkBtn}
                checked={gender === "남성"}
                onChange={() => handleGenderChange("남성")}
              />
              <span className={styles.checkboxIcon}>
                <Check_IC
                  style={{
                    color: gender === "남성" ? "#5300EC" : "#919191",
                  }}
                />
              </span>
              남성
            </label>
            <label className={`body_18_M ${styles.checkLabel}`}>
              <input
                type="checkbox"
                className={styles.checkBtn}
                checked={gender === "여성"}
                onChange={() => handleGenderChange("여성")}
              />
              <span className={styles.checkboxIcon}>
                <Check_IC
                  style={{
                    color: gender === "여성" ? "#5300EC" : "#919191",
                  }}
                />
              </span>
              여성
            </label>
          </div>
        </div>

        <div className={styles.formSection}>
          <div className={`body_20_B ${styles.inputLabel}`}>생년월일</div>
          <div className={styles.birthdateWrapper}>
            <InputBox
              type="text"
              name="birthYear"
              placeholder="YYYY"
              value={birthYear}
              onChange={handleBirthYearChange}
              maxLength={4}
            />
            <InputBox
              type="text"
              name="birthMonth"
              placeholder="MM"
              value={birthMonth}
              onChange={handleBirthMonthChange}
              maxLength={2}
            />
            <InputBox
              type="text"
              name="birthDay"
              placeholder="DD"
              value={birthDay}
              onChange={handleBirthDayChange}
              maxLength={2}
            />
          </div>
        </div>

        <div className={styles.regionSection}>
          <div className={`body_20_B ${styles.inputLabel}`}>주소</div>
          <AddressSelector />
        </div>

        <div className={styles.btnWrapper}>
          <Button text="가입하기" state="active" />
        </div>
      </form>
    </div>
  );
}
