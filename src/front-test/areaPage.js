
import "../css/areaPage/areaPage.css"

import Article from "./areaPage/article";
import Header from "./layout/header";
import Footer from "./layout/footer";

import React, { useRef, useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import LoginPage from "./login/LoginPage";

const AreaPage = () =>{
    const { areaId } = useParams();

    const Area = [
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


    return(
        <seaction className="areapage">
            <sction className="areaPage-banner">
                <h1 className="title">
                    {areaId} 지역 정보<br/>
                    <b>어디까지 알고있니?</b>
                </h1>
                <Swiper
                    slidesPerView={10}
                    spaceBetween={21}
                    modules={[ Navigation ]}
                    navigation={{
                        prevEl: ".swiper-button-prev",
                        nextEl: ".swiper-button-next",
                    }}
                    className="mySwiper areaPage_banner-swiper"
                >
                    {Area.map((item, index) => (
                        <SwiperSlide >
                            <Link to={`/areaPage/${item.name}`}>
                                <div className={`area-img ${item.name === areaId ? 'active' : ''}`} src="/img/areaPage/icon_area.png"
                                     style={{
                                         background: 'url(/img/areaPage/icon_area.png) 0 0 / 100% auto no-repeat',
                                         backgroundPosition: `0 ${index * -70}px`}}
                                ></div>
                                <p className={`area-name ${item.name === areaId ? 'active' : ''}`}>{item.name}</p>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className="swiper-button swiper-button-prev"></div>
                <div className="swiper-button swiper-button-next"></div>
            </sction>

            <Article></Article>

            <div className="link-sec">
                <div className="link-box left">
                    <h2 className="title">핫플모아</h2>
                    <p className="txt">요즘 인기있는 여행지는 다 모였네!<br/>
                        지역별 핫플을 알려드려요!</p>
                    <Link to={'/hotPlacePage/서울'} className="link-btn">
                        <p>바로가기</p>
                        <img src="/img/areaPage/link-icon1.png"></img>
                    </Link>
                </div>
                <div className="link-box right">
                    <h2 className="title">행사 검색</h2>
                    <p className="txt">내가 원하는 여행지를<br/>
                        지역과 카테고리 선택을 통한 여행지 추천!</p>
                    <Link to={'/selectSearchPage'} className="link-btn">
                        <p>바로가기</p>
                        <img src="/img/areaPage/link-icon2.png"></img>
                    </Link>
                </div>
            </div>
            <Footer/>
        </seaction>
    );


}

export default AreaPage;