import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from 'react-router-dom';

import Header from "../layout/header";

const theme = [
    {id:1, title: "공연/행사"},
    {id:2, title: "숙박"},
    {id:3, title: "쇼핑"},
    {id:4, title: "공원탐방"},
    {id:5, title: "음식"},
    {id:6, title: "농장체험"},
    {id:7, title: "교육"},
    {id:8, title: "산림여가"},
    {id:9, title: "문화행사"},
    {id:10, title: "?????"},

];

const Banner = () =>{
    const [currentSlide, setCurrentSlide] = useState(1);
    const swiperRef = useRef(null);

    const handleSlideClick = (index) => {
        if (swiperRef.current) {
            swiperRef.current.swiper.slideTo(index); // 인덱스는 1-based로 수정
        }
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

    const totalSlides = theme.length;
    const progressPercentage = (currentSlide / totalSlides) * 100;

    return(
        <div className="themepage">
            <Header></Header>
            <section className="banner">
                <div className="main-title">
                    <h1><b>다채로운 즐거움이 가득한 </b><br/>
                    웹 이름 추천 테마여행!
                    </h1>
                    <div className="fullView-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M450-450H220v-60h230v-230h60v230h230v60H510v230h-60v-230Z"/></svg>
                        <p>모든 테마 보기</p>
                    </div>
                </div>
            <Swiper
                ref={swiperRef}
                  slidesPerView={5.8}
                  spaceBetween={15}
                  modules={[ Navigation, Pagination ]}
                  initialSlide= {3}
                  centeredSlides={true}
                  pagination={{ el: ".swiper-pagination", clickable: true }}
                  navigation={{
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next",
                  }}
                  className="mySwiper themepage-swiper"
                >
                    {theme.map((item, index) => (
                        <SwiperSlide key={index} onClick={() => handleSlideClick(index)}>
                            <Link to={`${item.id}`}>
                                <div className="theme-img">
                                    <p className="in-txt">{item.title}</p>
                                </div>
                                <div className="out-txt">
                                    <h3>{item.title}</h3>
                                    <p>여행에 장애가 되지 않도록 열린 여행을<br/>
                                    만들어갑니다.</p>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
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
                            {String(currentSlide).padStart(2, "0")} /{" "}
                            {String(totalSlides).padStart(2, "0")}
                          </p>
                        </div>
                        {/* arrow */}
                        <div className="swiper-button-prev arrow">
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
                        <div className="swiper-button-next arrow">
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
                </Swiper>
            </section>
        </div>
    )
}

export default Banner;