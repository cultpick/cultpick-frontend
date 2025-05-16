"use client";

import styles from "./BlurBox.module.css";
import InputBox from "../InputBox";
import Button from "../Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useRecoilState } from "recoil";
import { loginState } from "@/recoil/atoms";
import { useSignInMutation } from "@/api/auth/query";

export default function BlurBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loginData, setLoginData] = useRecoilState(loginState);

  const signInMutation = useSignInMutation(
    (data) => {
      // from 파라미터가 있으면 해당 페이지로, 없으면 홈으로 리다이렉션
      const from = searchParams.get("from");
      router.push(from || "/");
    },
    (error) => {
      console.error("로그인 실패:", error);
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 다시 확인해주세요.");
    },
  );

  const onClickRegister = () => {
    router.push("/register/agree");
  };

  const onClickFindPass = () => {
    alert("개발 중이에요 🍔");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    signInMutation.mutate(loginData);
  };

  return (
    <div className={styles.boxContainer}>
      <div className={styles.loginTitle}>LOGIN</div>
      <form onSubmit={handleLogin} className={styles.form}>
        <InputBox
          type="email"
          name="email"
          placeholder="이메일 입력"
          value={loginData.email}
          onChange={handleChange}
        />
        <InputBox
          type="password"
          name="password"
          placeholder="비밀번호 입력"
          value={loginData.password}
          onChange={handleChange}
        />
        <div className={styles.btnWrapper}>
          <Button
            text="로그인"
            state={signInMutation.isPending ? "disabled" : "active"}
            type="submit"
          />
        </div>
        <div className={styles.bottomBtnContainer}>
          <div className="body_16_B pointer" onClick={onClickRegister}>
            회원가입
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2"
            height="18"
            viewBox="0 0 2 18"
            fill="none"
          >
            <path d="M1 0V18" stroke="var(--g1)" strokeWidth="1.6" />
          </svg>
          <div className="body_16_R pointer" onClick={onClickFindPass}>
            비밀번호 찾기
          </div>
        </div>
      </form>
    </div>
  );
}
