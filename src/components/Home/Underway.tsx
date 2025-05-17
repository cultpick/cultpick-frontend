"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual, Mousewheel } from "swiper/modules";
import "swiper/css";
import styles from "./Underway.module.css";
import Next_IC from "@/../public/svgs/next_arrow.svg";
import EventItem from "./EventItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOngoingPerformanceList } from "@/api/performance/api";
import { PerformanceListResponse } from "@/api/performance/type";

export default function Underway() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;
  const queryClient = useQueryClient();
  const swiperRef = useRef<any>(null);

  const { data, isLoading, error } = useQuery<PerformanceListResponse>({
    queryKey: ["ongoingPerformances", currentPage],
    queryFn: () => getOngoingPerformanceList(currentPage, pageSize),
  });

  // 모든 페이지의 데이터를 누적
  const allPerformances = useMemo(() => {
    if (!data) return [];
    return Array.from({ length: currentPage }, (_, i) => i + 1)
      .map((page) => {
        const cachedData = queryClient.getQueryData<PerformanceListResponse>([
          "ongoingPerformances",
          page,
        ]);
        return cachedData?.performanceList || [];
      })
      .flat();
  }, [data, currentPage, queryClient]);

  const handleReachEnd = async () => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const nextPageData = await getOngoingPerformanceList(nextPage, pageSize);

      // 다음 페이지의 데이터가 없으면 hasMore를 false로 설정
      if (nextPageData.performanceList.length === 0) {
        setHasMore(false);
        return;
      }

      // 다음 페이지의 데이터가 10개 미만이면 마지막 페이지로 간주
      if (nextPageData.performanceList.length < pageSize) {
        setHasMore(false);
      }

      queryClient.setQueryData(["ongoingPerformances", nextPage], nextPageData);
      setCurrentPage(nextPage);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSlideChange = (swiper: any) => {
    setCurrentSlideIndex(swiper.activeIndex);
  };

  return (
    <div className={styles.Container}>
      <div className={styles.EventContainer}>
        <Swiper
          ref={swiperRef}
          modules={[Virtual, Mousewheel]}
          spaceBetween={24}
          slidesPerView={4.5}
          loop={false}
          centeredSlides={false}
          mousewheel={{
            forceToAxis: true,
            invert: false,
            thresholdDelta: 50,
            thresholdTime: 200,
          }}
          virtual
          initialSlide={currentSlideIndex}
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
          onReachEnd={handleReachEnd}
          onSlideChange={handleSlideChange}
        >
          {isLoading ? (
            <div className={styles.loading}>로딩 중...</div>
          ) : error ? (
            <div className={styles.error}>
              공연 정보를 불러오는데 실패했습니다.
            </div>
          ) : allPerformances.length === 0 ? (
            <div className={styles.error}>표시할 공연이 없습니다.</div>
          ) : (
            allPerformances.map((performance, index) => (
              <SwiperSlide
                key={performance.id}
                virtualIndex={index}
                className={styles.Slide}
              >
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
