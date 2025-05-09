"use client";

import styles from "./BlurBox.module.css";
import InputBox from "../InputBox";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { loginState } from "@/recoil/atoms";
import { useSignInMutation } from "@/api/auth/query";

export default function BlurBox() {
  const router = useRouter();
  const [loginData, setLoginData] = useRecoilState(loginState);

  const signInMutation = useSignInMutation(
    (data) => {
      // 토큰 저장
      localStorage.setItem("accessToken", data.accessToken);
      // 로그인 성공 후 리다이렉션
      router.push("/");
    },
    (error) => {
      console.error("로그인 실패:", error);
      // 에러 처리 로직 추가
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
