"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Virtual } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import EvetItem from "./EventItem";
import styles from "./Underway.module.css";
import Next_IC from "@/../public/svgs/next_arrow.svg";

export default function UnderWay() {
  return (
    <div className={styles.Container}>
      <div className={styles.EventContainer}>
        <Swiper
          modules={[Navigation, Pagination, Virtual]}
          spaceBetween={300}
          slidesPerView={1}
          loop={false}
          centeredSlides={false}
          navigation={false}
          pagination={false}
          className={styles.SwiperContainer}
          breakpoints={{
            1024: {
              slidesPerView: 5,
              loop: false,
            },
            768: {
              slidesPerView: 3,
              loop: false,
            },
            480: {
              slidesPerView: 2,
              loop: false,
            },
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
            <SwiperSlide key={index} className={styles.Slide}>
              <EvetItem />
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
