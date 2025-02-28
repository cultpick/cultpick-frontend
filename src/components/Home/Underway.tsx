import { SwiperSlide, Swiper } from "swiper/react";
import EvetItem from "./EvetItem";
import styles from "./Underway.module.css";
import Next_IC from "@/../public/svgs/next_arrow.svg";
import { Navigation, Pagination, Virtual } from "swiper/modules";

export default function UnderWay() {
  return (
    <div className={styles.Container}>
      <div className={styles.EventContainer}>
        <div className={styles.EventItemContainer}>
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
