import { atom } from "recoil";

export interface LoginState {
  email: string;
  password: string;
}

export const loginState = atom<LoginState>({
  key: "loginState",
  default: {
    email: "",
    password: "",
  },
});

export const searchModalState = atom<boolean>({
  key: "searchModalState",
  default: false,
});
