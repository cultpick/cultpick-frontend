import { useState, useEffect } from "react";
import NextImage from "next/image";
import { Category } from "@/store/categoryState";
import styles from "./CategoryIcon.module.css";

interface CategoryIconProps {
  category: Category;
  className?: string;
}

const CATEGORY_ICONS = {
  연극: "/img/category/theater.png",
  무용: "/img/category/dance.png",
  대중무용: "/img/category/pop_dance.png",
  클래식: "/img/category/classic.png",
  국악: "/img/category/korean_music.png",
  대중음악: "/img/category/pop_music.png",
  복합: "/img/category/complex.png",
  "서커스·마술": "/img/category/circus.png",
  뮤지컬: "/img/category/musical.png",
} as const;

export function CategoryIcon({ category, className }: CategoryIconProps) {
  const iconPath = CATEGORY_ICONS[category];
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );

  useEffect(() => {
    const img = document.createElement("img"); // 네이티브 이미지 요소 생성
    img.src = iconPath;
    img.onload = () => {
      setSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [iconPath]);

  if (!size) return null; // 이미지 로딩 전에는 렌더링 안 함.

  return (
    <div className={className}>
      <NextImage
        src={iconPath}
        alt={`${category} 아이콘`}
        width={size.width} // 원본 크기 유지
        height={size.height} // 원본 크기 유지
        unoptimized
      />
    </div>
  );
}
