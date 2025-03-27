"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";
import "swiper/css";
import styles from "./Underway.module.css";
import Next_IC from "@/../public/svgs/next_arrow.svg";
import EventItem from "./EventItem";
import { Performance } from "@/types/performance";
import axios from "axios";

interface PerformanceResponse {
  performanceList: Performance[];
}

export default function Underway() {
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const fetchPerformances = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/performance/ongoing`,
        {
          params: {
            page,
            size: pageSize,
          },
        },
      );

      // 날짜 형식 변환
      const transformedData = {
        performanceList: response.data.performanceList.map((item: any) => {
          const startDate = new Date(item.startDate);
          const endDate = new Date(item.endDate);

          const formatDate = (date: Date) => {
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${month}월 ${day}일`;
          };

          return {
            ...item,
            startDate: formatDate(startDate),
            endDate: formatDate(endDate),
          };
        }),
      };

      setPerformances(transformedData.performanceList);
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
          slidesPerView={4.5}
          loop={false}
          centeredSlides={false}
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
          {performances.map((performance) => (
            <SwiperSlide key={performance.id} className={styles.Slide}>
              <EventItem performance={performance} />
            </SwiperSlide>
          ))}
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
