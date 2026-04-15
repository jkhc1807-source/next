"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./Carousel.module.css";

interface CarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  slidesPerView?: number | "auto";
  spaceBetween?: number;
  loop?: boolean;
}

export const Carousel = ({
  items,
  autoPlay = false,
  interval = 5000,
  showDots = true,
  showArrows = true,
  slidesPerView = 1.4, // 중앙 70%, 좌우 15%를 위한 최적 수치 [확실]
  spaceBetween = 20,
  loop = true,
}: CarouselProps) => {
  return (
    <div className={styles.carouselWrapper}>
      <Swiper
        key={items.length}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        centeredSlides={true}
        navigation={showArrows}
        pagination={showDots ? { 
          clickable: true,
          dynamicBullets: true, 
          dynamicMainBullets: 1, // 중앙 1개만 크게 유지 (인스타그램 스타일) [확실]
        } : false}
        autoplay={autoPlay ? { delay: interval, disableOnInteraction: false } : false}
        loop={loop}
        className={styles.mySwiper}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className={styles.slide}>
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
