import { atom } from "recoil";

// 전체 동의 상태를 관리할 atom
export const isAllCheckedState = atom({
  key: "isAllCheckedState",
  default: false,
});

// 이용약관 체크 상태를 관리할 atom
export const isTermsCheckedState = atom({
  key: "isTermsCheckedState",
  default: false,
});

// 개인정보 수집 및 이용 체크 상태를 관리할 atom
export const isPrivacyCheckedState = atom({
  key: "isPrivacyCheckedState",
  default: false,
});
