import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const SlideTest = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
];

const Section2Right = () => {
  const modules = [Autoplay, Navigation, Pagination];
  const [currentSlide, setCurrentSlide] = useState(1);
  const swiperRef = useRef(null);
  const totalSlides = SlideTest.length;
  const progressPercentage = (currentSlide / totalSlides) * 100;

  useEffect(() => {
    const swiperInstance = swiperRef.current?.swiper;
    if (!swiperInstance) return;

    const updateProgress = () => {
      const { realIndex } = swiperInstance;
      setCurrentSlide(realIndex + 1);
    };
 
    swiperInstance.on("slideChange", updateProgress);
    updateProgress();

    return () => {
      swiperInstance.off("slideChange", updateProgress);
    };
  }, [swiperRef]);

  return (
    <div>
      <section className="main-sec2">
        <div className="sec2Leftbox sec2RightBox">
          <div className="sec2Leftbox-Textbox">
            <h3 className="headText">당신이 원하는 행사</h3>
            <h4 className="subText">
              당신의 취향과 성향을 분석했어요! 마음에 드는 행사 추천해드릴게요.
            </h4>
          </div>
          <Swiper
            ref={swiperRef}
            slidesPerView={3}
            spaceBetween={0}
            loop={true}
            centeredSlides={true}
            modules={modules}
            navigation={{
              prevEl: ".sec2Right-button-prev",
              nextEl: ".sec2Right-button-next",
            }}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            className={"mySwiper sec2Swiper"}
          >
            {SlideTest.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className={`slide-content slide${slide.id}`}></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section className="sec2SwiperPagination">
        <div className="swiper-pagination-wrapper">
          <div className="swiper-pagination-background"></div>
          <div
            className="swiper-pagination-progress"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="sec2Right-button-prev">
          <svg
            viewBox="0 0 10 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.11119 25.0238L0.487804 12.7186L8.11119 0.41333L10 3.46214L4.26543 12.7186L10 21.975L8.11119 25.0238Z"
              fill="#686565"
            />
          </svg>
        </div>
        <div className="swiper-pagination-info">
          <p>
            <b>{String(currentSlide).padStart(2, "0")}</b> /{" "}
            {String(totalSlides).padStart(2, "0")}
          </p>
        </div>
        <div className="sec2Right-button-next">
          <svg
            viewBox="0 0 10 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.88881 25.0238L9.5122 12.7186L1.88881 0.41333L0 3.46214L5.73457 12.7186L0 21.975L1.88881 25.0238Z"
              fill="#686565"
            />
          </svg>
        </div>
      </section>
    </div>
  );
};

export default Section2Right;
