"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual, Mousewheel } from "swiper/modules";
import "swiper/css";
import styles from "./MonthEvent.module.css";
import EventItem from "./EventItem";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPerformanceList } from "@/api/performance/api";
import { PerformanceList } from "@/model/performance";

export default function MonthEvent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;
  const queryClient = useQueryClient();
  const swiperRef = useRef<any>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["recommendedPerformances", currentPage],
    queryFn: () => getPerformanceList(currentPage, pageSize),
  });

  // 모든 페이지의 데이터를 누적
  const allPerformances = useMemo(() => {
    if (!data) return [];
    return Array.from({ length: currentPage }, (_, i) => i + 1)
      .map((page) => {
        const cachedData = queryClient.getQueryData([
          "recommendedPerformances",
          page,
        ]);
        return (cachedData as PerformanceList)?.performanceList || [];
      })
      .flat();
  }, [data, currentPage, queryClient]);

  const handleReachEnd = async () => {
    if (!hasMore || isLoadingMore) return;

    setIsLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const nextPageData = await getPerformanceList(nextPage, pageSize);

      // 다음 페이지의 데이터가 없으면 hasMore를 false로 설정
      if (nextPageData.performanceList.length === 0) {
        setHasMore(false);
        return;
      }

      // 다음 페이지의 데이터가 10개 미만이면 마지막 페이지로 간주
      if (nextPageData.performanceList.length < pageSize) {
        setHasMore(false);
      }

      queryClient.setQueryData(
        ["recommendedPerformances", nextPage],
        nextPageData,
      );
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
          slidesPerView={1}
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
