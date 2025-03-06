"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { registerFormState } from "@/store/registerState";

export default function CategoryPage() {
  const router = useRouter();
  const formData = useRecoilValue(registerFormState);

  useEffect(() => {
    // 회원가입 데이터가 없으면 회원가입 페이지로 리다이렉트
    if (!formData.email) {
      router.replace("/register");
    }
  }, [formData, router]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">관심 카테고리 선택</h1>
      <p className="mb-4">선호하는 카테고리를 선택해주세요.</p>
      {/* 카테고리 선택 UI는 추후 구현 */}
    </div>
  );
}
