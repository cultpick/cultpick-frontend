"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual, Mousewheel } from "swiper/modules";
import "swiper/css";
import styles from "./MonthEvent.module.css";
import EventItem from "./EventItem";
import { getRecommendedPerformances } from "@/api/performance";
import { Performance } from "@/types/performance";
import { useQuery } from "@tanstack/react-query";

interface PerformanceResponse {
  performanceList: Performance[];
}

export default function MonthEvent() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, error } = useQuery<PerformanceResponse>({
    queryKey: ["recommendedPerformances", currentPage],
    queryFn: () => getRecommendedPerformances(currentPage, pageSize),
  });

  const handleSlideChange = (swiper: any) => {
    const newPage = Math.floor(swiper.activeIndex / pageSize) + 1;
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className={styles.Container}>
      <div className={styles.EventContainer}>
        <Swiper
          modules={[Virtual, Mousewheel]}
          spaceBetween={24}
          slidesPerView={1}
          loop={false}
          centeredSlides={false}
          mousewheel={true}
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
          {isLoading ? (
            <div className={styles.loading}>로딩 중...</div>
          ) : error ? (
            <div className={styles.error}>
              공연 정보를 불러오는데 실패했습니다.
            </div>
          ) : !data?.performanceList || data.performanceList.length === 0 ? (
            <div className={styles.error}>표시할 공연이 없습니다.</div>
          ) : (
            data.performanceList.map((performance) => (
              <SwiperSlide key={performance.id} className={styles.Slide}>
                <EventItem performance={performance} />
              </SwiperSlide>
            ))
          )}
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
