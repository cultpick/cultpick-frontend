"use client";

import styles from "./Logout.module.css";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import Modal from "@/components/Modal";

export default function Logout() {
  const router = useRouter();
  const modal = useModal();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/");
    } catch (error) {
      console.error("로그아웃 실패:", error);
    }
  };

  return (
    <>
      <button type="button" className={styles.btn} onClick={modal.open}>
        로그아웃
      </button>
      <Modal
        show={modal.show}
        onClose={modal.close}
        onConfirm={handleLogout}
        title="로그아웃"
        description="로그아웃 하시겠습니까?"
      />
    </>
  );
}
