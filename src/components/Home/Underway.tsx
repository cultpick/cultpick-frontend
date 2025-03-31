"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual, Mousewheel } from "swiper/modules";
import "swiper/css";
import styles from "./Underway.module.css";
import Next_IC from "@/../public/svgs/next_arrow.svg";
import EventItem from "./EventItem";
import { Performance } from "@/types/performance";
import { getOngoingPerformances } from "@/api/performance";
import { useQuery } from "@tanstack/react-query";

interface PerformanceResponse {
  performanceList: Performance[];
}

export default function Underway() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data, isLoading, error } = useQuery<PerformanceResponse>({
    queryKey: ["ongoingPerformances", currentPage],
    queryFn: () => getOngoingPerformances(currentPage, pageSize),
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
          slidesPerView={4.5}
          loop={false}
          centeredSlides={false}
          mousewheel={true}
          className={styles.SwiperContainer}
          breakpoints={{
            1024: {
              slidesPerView: 4.5,
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
      <div className={styles.bottomContainer}>
        <img
          src="/img/home/rectangle_gradient.png"
          className={styles.rectangle}
          alt="진행 중인 행사"
        />
        <div className={styles.rightContainer}>
          <div className={styles.bottomTitle}>진행 중인 행사</div>
          <button className={styles.nextBtn}>
            더 보러가기
            <Next_IC />
          </button>
        </div>
      </div>
    </div>
  );
}
