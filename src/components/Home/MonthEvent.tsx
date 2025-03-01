"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Virtual } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./MonthEvent.module.css";
import EvetItem from "./EventItem";

export default function MonthEvent() {
  return (
    <div className={styles.Container}>
      <div className={styles.EventContainer}>
        <Swiper
          modules={[Navigation, Pagination, Virtual]}
          spaceBetween={24}
          slidesPerView={3.5}
          loop
          centeredSlides={false}
          navigation={false}
          pagination={false}
          className={styles.SwiperContainer}
          breakpoints={{
            1024: { slidesPerView: 3.5 },
            768: { slidesPerView: 2 },
            480: { slidesPerView: 1 },
          }}
        >
          <SwiperSlide className={styles.Slide}>
            <EvetItem />
          </SwiperSlide>
          <SwiperSlide className={styles.Slide}>
            <EvetItem />
          </SwiperSlide>
          <SwiperSlide className={styles.Slide}>
            <EvetItem />
          </SwiperSlide>
          <SwiperSlide className={styles.Slide}>
            <EvetItem />
          </SwiperSlide>
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
