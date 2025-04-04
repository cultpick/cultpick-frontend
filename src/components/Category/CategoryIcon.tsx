import { useState, useEffect } from "react";
import NextImage from "next/image";
import styles from "./CategoryIcon.module.css";

interface CategoryIconProps {
  category: string;
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
  const iconPath = CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS];
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );

  useEffect(() => {
    const img = document.createElement("img");
    img.src = iconPath;
    img.onload = () => {
      setSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [iconPath]);

  if (!size) return null;

  return (
    <div className={className}>
      <NextImage
        src={iconPath}
        alt={`${category} 아이콘`}
        width={size.width}
        height={size.height}
        unoptimized
      />
    </div>
  );
}
