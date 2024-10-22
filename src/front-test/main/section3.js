import React, { useRef, useState, useEffect } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../css/main/section3.css";


const SlideTest = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
    { id: 12 }
  ];


const Section3 = () => {

    const modules = [Autoplay, Navigation, Pagination];
    const [autoplaying, setAutoplaying] = useState(true);
    const swiperRef = useRef(null);
    useEffect(() => {
        const swiperInstance = swiperRef.current?.swiper;
        if (!swiperInstance) return;
    
      }, [swiperRef]);
    const toggleAutoplay = () => {
        if (autoplaying) {
        swiperRef.current.swiper.autoplay.stop();
        } else {
        swiperRef.current.swiper.autoplay.start();
        }
        setAutoplaying(!autoplaying);
    };

    return(
        <div>
            <section className="main-sec3">
                <div className="titleTextBox">
                    <div className="headText">
                        어떤 카테고리의 행사
                    </div>
                    <div className="subText">
                        참여하고 싶으신가요?
                    </div>
                </div>
                <div className="contentWrapper">
                    <div className="contentBox show">
                        <div className="contentPic showPic"></div>
                        <div className="contentText">공연</div>
                    </div>
                    <div className="contentBox education">
                        <div className="contentPic educationPic"></div>
                        <div className="contentText">교육</div>
                    </div>
                    <div className="contentBox display">
                        <div className="contentPic displayPic"></div>
                        <div className="contentText">전시</div>
                    </div>
                    <div className="contentBox leisure">
                        <div className="contentPic leisurePic"></div>
                        <div className="contentText">산림여가</div>
                    </div>
                    <div className="contentBox event">
                        <div className="contentPic eventPic"></div>
                        <div className="contentText">문화행사</div>
                    </div>
                    <div className="contentBox tour">
                        <div className="contentPic tourPic"></div>
                        <div className="contentText">공원탐방</div>
                    </div>
                    <div className="contentBox experience">
                        <div className="contentPic experiencePic"></div>
                        <div className="contentText">농장체험</div>
                    </div>
                </div>

                <Swiper
                    ref={swiperRef}
                    slidesPerView={1}
                    slidesPerGroup={1}
                    spaceBetween={0}
                    loop={true}
                    modules={modules}
                    autoplay={{
                        delay: 3500,
                        disableOnInteraction: false,
                    }}
                    pagination={{ el: '.swiper-pagination', clickable: true }}
                    className={"mySwiper sec3Swiper"}
                >
                    <SwiperSlide>
                            <div className="halfSlide sec3Slide slide1"></div>
                            <div className="halfSlide sec3Slide slide2"></div>
                    </SwiperSlide>
                    <SwiperSlide>
                            <div className="sec3Slide slide3"></div>
                    </SwiperSlide>
                    <SwiperSlide>
                            <div className="halfSlide sec3Slide slide4"></div>
                            <div className="halfSlide sec3Slide slide5"></div>
                    </SwiperSlide>
                    <SwiperSlide>
                            <div className="sec3Slide slide6"></div> 
                    </SwiperSlide>
                    <SwiperSlide>
                            <div className="halfSlide sec3Slide slide7"></div>
                            <div className="halfSlide sec3Slide slide8"></div>
                    </SwiperSlide>
                    <SwiperSlide>
                            <div className="sec3Slide slide9"></div>
                    </SwiperSlide>
                </Swiper>
                <div className="swiper-tool">
                    <div className="autoplay-control">
                        <img
                        onClick={toggleAutoplay}
                        src={autoplaying ? "/img/icon/pause.svg" : "/img/icon/play.svg"}
                        alt="autoplay toggle"
                        />
                    </div>
                    <div className="swiper-pagination"></div>
                </div>
            </section>
        </div>
    );
}

export default Section3;
