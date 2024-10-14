import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {Link, useParams} from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";


const HppArea = [
    {name: "서울"},
    {name: "인천"},
    {name: "대전"},
    {name: "대구"},
    {name: "경기"},
    {name: "부산"},
    {name: "울산"},
    {name: "광주"},
    {name: "강원"},
    {name: "충북"},
    {name: "충남"},
    {name: "경북"},
    {name: "경남"},
    {name: "전북"},
    {name: "전남"},
    {name: "제주"},
    {name: "세종"},
]

const Banner = () =>{
    const { hareaId } = useParams();

    return(
        <div className="hpp-banner">
            <div className="main-title">
                <h1>핫플모아</h1>
                <p>웹 이름 사용자 활동 데이터 기반의<br/>
                    지역별 인기 여행지와 맛집을 확인해보세요!</p>
            </div>
            <div className="sub-title">
                <h2>지역별로 떠나는 핫플 여행</h2>
                <p>지역 선택 시 해당 지역의 인기 여행지/음식점/숙박 정보를 확인하실 수 있습니다.</p>
            </div>
            <Swiper
                slidesPerView={10}
                spaceBetween={0}
                modules={[ Navigation ]}
                navigation={{
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next",
                }}
                className="mySwiper hpp-banner-swiper"
            >
                {HppArea.map((item, index) => (
                    <SwiperSlide >
                        <Link to={`/hotPlacePage/${item.name}`}>
                            <div className={`area-img ${item.name === hareaId ? 'active' : ''}`} src="/img/areaPage/icon_area.png"
                                 style={{
                                     background: 'url(/img/areaPage/icon_area.png) 0 0 / 100% auto no-repeat',
                                     backgroundPosition: `0 ${index * -70}px`}}
                            ></div>
                            <p className={`area-name ${item.name === hareaId ? 'active' : ''}`}>{item.name}</p>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="swiper-button swiper-button-prev"></div>
            <div className="swiper-button swiper-button-next"></div>
        </div>
    )
}

export default Banner;