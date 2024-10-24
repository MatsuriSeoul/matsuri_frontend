import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../../css/myFestvalPage/myFestival.css";

const SlideTest = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
];

const wishSlide = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
];

const interestSlide = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
];

const MyFestival = () => {
    const [currentFestivalSlide, setCurrentFestivalSlide] = useState(1);
    const [currentInterestSlide, setCurrentInterestSlide] = useState(1);
    const [currentWishSlide, setCurrentWishSlide] = useState(1);

    const festivalSwiperRef = useRef(null);
    const interestSwiperRef = useRef(null);
    const wishSwiperRef = useRef(null);

    const totalFestivalSlides = SlideTest.length;
    const totalInterestSlides = interestSlide.length;
    const totalWishSlides = wishSlide.length;


    const [isLiked, setIsLiked] = useState(false);

    const handleLikeToggle = () => {
        setIsLiked(prevState => !prevState);
    };

    const handleFestivalSlideChange = () => {
        if (festivalSwiperRef.current) {
            setCurrentFestivalSlide(festivalSwiperRef.current.realIndex + 1);
        }
    };

    const handleInterestSlideChange = () => {
        if (interestSwiperRef.current) {
            setCurrentInterestSlide(interestSwiperRef.current.realIndex + 1);
        }
    };

    const handleWishSlideChange = () => {
        if (wishSwiperRef.current) {
            setCurrentWishSlide(wishSwiperRef.current.realIndex + 1);
        }
    };

    const festivalProgressPercentage = (currentFestivalSlide / totalFestivalSlides) * 100;
    const interestProgressPercentage = (currentInterestSlide / totalInterestSlides) * 100;
    const wishProgressPercentage = (currentWishSlide / totalWishSlides) * 100;

    return (
        <div>
            <section className="myfestival-container">
                <div className="myfestival-wrapper">
                    <div className="textBox">
                        <div className="headText">나의 행사</div>
                        <div className="subText">대한민국 핫!스팟에서 추천해주는 나를 위한 여행지는?</div>
                        <div className="subText">나의 관심사와 나와 비슷한 성향의 사용자 데이터를 분석하여 맞춤형 여행정보를 제공합니다</div>
                    </div>

                    <div className="festivalSwiper-wrapper">
                        <div className="headText">나만의 맞춤 행사</div>
                        <Swiper
                            onSwiper={(swiper) => (festivalSwiperRef.current = swiper)}
                            slidesPerView={4}
                            spaceBetween={20}
                            loop={true}
                            modules={[Pagination, Navigation]}
                            onSlideChange={handleFestivalSlideChange}
                            navigation={{
                                prevEl: ".festival-button-prev",
                                nextEl: ".festival-button-next",
                            }}
                            className="mySwiper festivalSwiper"
                        >
                            {SlideTest.map((slide) => (
                                <SwiperSlide key={slide.id}>
                                    <div className={`slide-content slide${slide.id}`}></div>
                                    <div className="like-btn" onClick={handleLikeToggle}>
                                        <img
                                            src={isLiked ? "/img/icon/heart-fill.svg" : "/img/icon/heart.svg"}
                                        ></img>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <section className="festivalSwiperPagination">
                        <div className="festival-pagination-wrapper">
                            <div className="festival-pagination-background"></div>
                            <div
                                className="festival-pagination-progress"
                                style={{ width: `${festivalProgressPercentage}%` }}
                            ></div>
                        </div>
                        <div className="festival-button-prev"></div>
                        <div className="festival-button-next"></div>
                    </section>
                </div>
            </section>

            <section className="wishlist-container">
                <div className="wishlist-wrapper">
                    <div className="textBox">
                        <div className="headText">나의 위시 리스트</div>
                        <div className="subText">나의 성향과 취향이 반영돼 찜하기를 누른 행사를 보여드립니다</div>
                    </div>
                    <Swiper
                        onSwiper={(swiper) => (wishSwiperRef.current = swiper)}
                        slidesPerView={3}
                        spaceBetween={20}
                        loop={true}
                        modules={[Pagination, Navigation]}
                        onSlideChange={handleWishSlideChange}
                        navigation={{
                        prevEl: ".wish-button-prev",
                        nextEl: ".wish-button-next",
                    }}
                    className="mySwiper wishSwiper"
                    >
                    {wishSlide.map((slide) => (
                                <SwiperSlide key={slide.id}>
                                    <div className={`wish-content slide${slide.id}`}></div>
                                </SwiperSlide>
                            ))}   
                    </Swiper>
                </div>

                <section className="wishSwiperPagination">
                        <div className="wish-pagination-wrapper">
                            <div className="wish-pagination-background"></div>
                            <div
                                className="wish-pagination-progress"
                                style={{ width: `${wishProgressPercentage}%` }}
                            ></div>
                        </div>
                        <div className="wish-button-prev"></div>
                        <div className="wish-button-next"></div>
                    </section>
            </section>

            <section className="interestContent-container">
                <div className="interestContent-wrapper">
                    <div className="interestSwiper-wrapper">
                        <div className="textBox">
                            <div className="interestSwiper-wrapper"></div>
                            <div className="headText">내 관심사와 <br /> 비슷한 최신행사</div>
                            <div className="subText">대한민국 핫!스팟 운영자가 <br /> 추천하는 여행지입니다. <br /><br /></div>
                            <div className="subText hashtag">#너는 내<br /><br /> #취향저격 <br /><br /> #말하지않아도 <br /><br /> #느낌이 와~~ </div>
                        </div>
                        <Swiper
                            onSwiper={(swiper) => (interestSwiperRef.current = swiper)}
                            slidesPerView={4}
                            spaceBetween={20}
                            loop={true}
                            modules={[Pagination, Navigation]}
                            onSlideChange={handleInterestSlideChange}
                            navigation={{
                                prevEl: ".interest-button-prev",
                                nextEl: ".interest-button-next",
                            }}
                            className="mySwiper interestSwiper"
                        >
                            {interestSlide.map((slide) => (
                                <SwiperSlide key={slide.id}>
                                    <div className={`interest-content slide${slide.id}`}></div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <section className="interestSwiperPagination">
                        <div className="interest-pagination-wrapper">
                            <div className="interest-pagination-background"></div>
                            <div
                                className="interest-pagination-progress"
                                style={{ width: `${interestProgressPercentage}%` }}
                            ></div>
                        </div>
                        <div className="interest-button-prev"></div>
                        <div className="interest-button-next"></div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default MyFestival;
