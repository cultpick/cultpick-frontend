"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDeleteUser } from "@/states/server/mutations";
import { handleApiError } from "@/utils/errorHandler";
import styles from "./DeleteForm.module.css";

interface DeleteFormProps {
  accessToken?: string;
}

export default function DeleteForm({ accessToken }: DeleteFormProps) {
  const router = useRouter();
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancel = () => {
    router.push("/my");
  };

  const deleteUserMutation = useDeleteUser({
    onSuccess: () => {
      router.push("/");
    },
    onError: (error) => {
      const errorMessage = handleApiError(error);
      alert(errorMessage);
    },
  });

  const handleDelete = () => {
    if (!agree) return;
    deleteUserMutation.mutate();
  };

  return (
    <div className={styles.deleteBoxWrapper}>
      <div className={styles.noticeBox}>
        <div className={styles.noticeTitle}>
          컬픽 회원 탈퇴를 신청하기 전에 유의사항을 확인해주세요.
        </div>
        <div className={styles.noticeContent}>
          <div className={styles.noticeItem}>
            <b>개인정보 및 서비스 이용 기록 삭제</b>
            <div>
              개인정보 및 서비스 이용 기록이 모두 삭제되며, 삭제된 데이터는
              복구되지 않습니다.
            </div>
          </div>
          <div className={styles.noticeItem}>
            <b>개인정보 보관</b>
            <div>
              회원 탈퇴 시 일부 개인정보는 개인정보 처리방침에 따라 탈퇴일로부터
              30일간 보관됩니다.
            </div>
          </div>
          <div className={styles.noticeItem}>
            <b>탈퇴 후 제한</b>
            <div>탈퇴 처리된 이메일 ID는 30일 동안 재가입이 불가합니다.</div>
          </div>
        </div>
      </div>
      <div className={styles.agreeWrapper}>
        <label className={styles.agreeLabel}>
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree((prev) => !prev)}
            className={styles.checkbox}
          />
          <span>회원 탈퇴 유의사항을 모두 확인하였으며, 이에 동의합니다.</span>
        </label>
      </div>
      <div className={styles.buttonRow}>
        <button
          className={styles.cancelButton}
          type="button"
          onClick={handleCancel}
          disabled={loading}
        >
          취소
        </button>
        <button
          className={agree ? styles.deleteButton : styles.deleteButtonDisabled}
          type="button"
          onClick={handleDelete}
          disabled={!agree || loading}
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  );
}
