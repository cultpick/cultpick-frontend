"use client";

import { useRouter } from "next/navigation";
import style from "./not-found.module.css";
useRouter;

export default function NotFound() {
  const router = useRouter();
  const onClick = () => {
    router.push("/");
  };

  return (
    <div className={style.container}>
      <div className={style.title}>
        죄송합니다. 해당 페이지를 찾을 수 없습니다.
      </div>
      <div className={style.description}>지금 진행 중인 행사를 구경해봐요!</div>
      <div className={style.row}>
        <button className={style.btn} onClick={onClick}>
          HOME
        </button>
      </div>
    </div>
  );
}
