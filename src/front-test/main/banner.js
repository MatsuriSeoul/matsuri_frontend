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
  { id: 4 },
  { id: 5 },
  { id: 6 },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const swiperRef = useRef(null);
  const [autoplaying, setAutoplaying] = useState(true);

  const toggleAutoplay = () => {
    if (autoplaying) {
      swiperRef.current.swiper.autoplay.stop();
    } else {
      swiperRef.current.swiper.autoplay.start();
    }
    setAutoplaying(!autoplaying);
  };


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

  const totalSlides = SlideTest.length;
  const progressPercentage = (currentSlide / totalSlides) * 100;

  return (
    <section className="main_banner">
      <div className="swiper-container">
        <div className="event-info">
          <p className="hashtag">7월에 만나는 보랏빛 여름</p>
          <h1 className="title">불꽃놀이와 함께하는 밤하늘</h1>
          <p className="event-date">행사기간 : 2024.07.01~07.03</p>
          <p className="detail-link">자세히 보기</p>
          <div className="swiper-tool">
          {/* pagination-bar */}
          <div className="swiper-pagination-wrapper">
            <div className="swiper-pagination-background"></div>
            <div
              className="swiper-pagination-progress"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          {/* pagination-count */}
          <div className="swiper-pagination-info">
            <p>
              <b>{String(currentSlide).padStart(2, "0")}</b> /{" "}
              {String(totalSlides).padStart(2, "0")}
            </p>
          </div>

          <div className="swiper-button-prev">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
          </div>

          <div className="autoplay-control" onClick={toggleAutoplay}>
            <img
              src={autoplaying ? "/img/icon/pause.svg" : "/img/icon/play.svg"}
              alt="autoplay toggle"
            />
          </div>

          <div className="swiper-button-next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
            </svg>
          </div>
        </div>
        </div>

        <Swiper
          ref={swiperRef}
          slidesPerView={1.1}
          spaceBetween={30}
          loopedSlides={2}
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation, Pagination]}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          className="mySwiper banner-swiper"
        >
          {SlideTest.map((item) => (
            <SwiperSlide key={item.id}>
              <div className={`event-img id${item.id}`}></div>
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>
    </section>
  );
};

export default Banner;
