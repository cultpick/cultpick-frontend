"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";
import "swiper/css";
import styles from "./MonthEvent.module.css";
import EventItem from "./EventItem";
import { getRecommendedPerformances } from "@/api/performance";
import { Performance } from "@/types/performance";

export default function MonthEvent() {
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchPerformances = async (page: number) => {
    try {
      setLoading(true);
      const data = await getRecommendedPerformances(page, pageSize);
      if (data?.performanceList) {
        setPerformances(data.performanceList);
      } else {
        setError("공연 정보가 없습니다.");
        setPerformances([]);
      }
    } catch (err) {
      setError("공연 정보를 불러오는데 실패했습니다.");
      setPerformances([]);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerformances(currentPage);
  }, [currentPage]);

  const handleSlideChange = (swiper: any) => {
    const newPage = Math.floor(swiper.activeIndex / pageSize) + 1;
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  if (loading && performances.length === 0) {
    return <div className={styles.loading}>로딩 중...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!performances || performances.length === 0) {
    return <div className={styles.error}>표시할 공연이 없습니다.</div>;
  }

  return (
    <div className={styles.Container}>
      <div className={styles.EventContainer}>
        <Swiper
          modules={[Virtual]}
          spaceBetween={24}
          slidesPerView={1}
          loop={false}
          centeredSlides={false}
          className={styles.SwiperContainer}
          breakpoints={{
            1024: {
              slidesPerView: 3.5,
              loop: false,
            },
            768: {
              slidesPerView: 2,
              loop: false,
            },
            480: {
              slidesPerView: 1,
              loop: false,
            },
          }}
          onSlideChange={handleSlideChange}
        >
          {performances.map((performance) => (
            <SwiperSlide key={performance.id} className={styles.Slide}>
              <EventItem performance={performance} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.rightTitle}>
        <div>이달의</div>
        <div>추천</div>
        <div>행사</div>
        <div className={styles.titleBgWrapper}>
          <Image
            src={"/img/home/three_circle.png"}
            alt={"이달의 추천 행사"}
            width={563}
            height={323}
          />
        </div>
      </div>
    </div>
  );
}
