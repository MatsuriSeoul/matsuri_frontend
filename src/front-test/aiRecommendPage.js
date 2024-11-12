import React from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import '../css/ai/aiRecommendPage.css';

const AIRecommendPage = () => {
    const [activeSidebar, setActiveSidebar] = useState(false);

    const handleClick = () => {
        setActiveSidebar(!activeSidebar);
      };

      const SlideTest = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 },
        { id: 6 },
      ];

    return(
        <div className="AIRP">
            <div className="recommend-list">
                <div className="main-title">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                    <h1 className="title">AI플래너</h1>
                </div>
                <div className="choose-category">
                    <h1 className="user-title"><b>최윤서님</b>을 위한 여행코스</h1>
                    <div className="container">
                        <div className="categorys">
                            <div className="area">
                                <p>서울</p>
                            </div>
                            <div className="days">
                                <p>2박3일</p>
                            </div>
                            <div className="category">
                                <p>행사/관광지/축제</p>
                            </div>
                        </div>
                        <div className="reload">
                            <p>여행계획 다시 세우기</p>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z"/></svg>
                        </div>
                    </div>
                </div>
                <div className="planner">
                    <div className="day day1">
                        <div className="title">
                            <div className="arrow-right"></div>
                            <h3>1일차</h3>
                        </div>
                        <div className="plan">
                            <p className="num">1</p>
                            <div className="img"></div>
                            <div className="plan-info">
                                <div className="category">
                                    <p>여행지</p>
                                </div>
                                <p className="plan-title">제주도</p>
                                <p className="addr">경기도 파주시</p>
                            </div>
                        </div>
                        <div className="plan">
                            <p className="num">2</p>
                            <div className="img"></div>
                            <div className="plan-info">
                                <div className="category">
                                    <p>여행지</p>
                                </div>
                                <p className="plan-title">제주도</p>
                                <p className="addr">경기도 파주시</p>
                            </div>
                        </div>
                    </div>
                    <div className="day day1">
                        <div className="title">
                            <div className="arrow-right"></div>
                            <h3>2일차</h3>
                        </div>
                        <div className="plan">
                            <p className="num">1</p>
                            <div className="img"></div>
                            <div className="plan-info">
                                <div className="category">
                                    <p>여행지</p>
                                </div>
                                <p className="plan-title">제주도</p>
                                <p className="addr">경기도 파주시 경기도 파주시 경기도 파주시경기도 파주시</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wall"></div>
                <div className="AIcomment">

                </div>
            </div>

            <div className="map"></div>

            <div className={`detail-side ${activeSidebar ? 'active' : ''}`}>
                <div className="container">
                    <div className="main-img"></div>
                    <div className="info-box info-title">
                        <div className="category">
                            <p>여행지</p>
                        </div>
                        <h2 className="title">국립 복주산자연휴양림</h2>
                        <h4 className="addr">강원특별자치도 철원군 근남면 하오재로 818</h4>
                    </div>
                    <div className="arrow-title">
                        <h3>상세정보</h3>
                    </div>
                    <div className="info-box info-content">
                        <p className="content">
                            제15회 강동북페스티벌'은 강동문화재단이 주관하고 강동구립도서관(성내, 해공, 암사, 강일, 천호, 둔촌)이 기획, 진행하는 서울 강동구의 대표 문화축제이다. 올해 축제의 주제는 '질문하라 2024!'로 일상을 파고든 인공지능 시대에 질문의 중요성이 대두됨에 따라 AI와 독서를 통한 올바른 질문 방법에 대해 함께 고민해보는 자리가 될 예정이다. 강연과 전시, 공연, 체험을 포함한 다채로운 행사로 구성했다.
                        </p>
                    </div>
                    <div className="arrow-title">
                        <h3>추가정보</h3>
                    </div>
                    <div className="info-box sub-info">
                        <div className="sub-info-list">
                            <div className="list">
                                <p className="label">행사 종료일</p>
                                <p className="value">20240928</p>
                            </div>
                            <div className="list">
                                <p className="label">행사 종료일</p>
                                <p className="value">20240928</p>
                            </div>
                            <div className="list">
                                <p className="label">행사 종료일</p>
                                <p className="value">20240928</p>
                            </div>
                            <div className="list">
                                <p className="label">행사 종료일</p>
                                <p className="value">20240928</p>
                            </div>
                            <div className="list">
                                <p className="label">행사 종료일</p>
                                <p className="value">20240928</p>
                            </div>
                            <div className="list">
                                <p className="label">행사 종료일</p>
                                <p className="value">20240928</p>
                            </div>
                            <div className="list">
                                <p className="label">행사 종료일</p>
                                <p className="value">20240928</p>
                            </div>
                            <div className="list">
                                <p className="label">행사 종료일</p>
                                <p className="value">20240928</p>
                            </div>
                        </div>
                    </div>
                    <div className="img-list">
                        <Swiper
                            slidesPerView={1}
                            modules={[Navigation]}
                            navigation={{
                              prevEl: ".swiper-button-prev",
                              nextEl: ".swiper-button-next",
                            }}
                            className="mySwiper edpArticle-swiper"
                        >
                            {SlideTest.map((item) => (
                              <SwiperSlide key={item.id}>
                                <div className={`detail-img id${item.id}`}></div>
                              </SwiperSlide>
                            ))}

                            <div className="swiper-button swiper-button-prev"></div>
                            <div className="swiper-button swiper-button-next"></div>
                        </Swiper>
                    </div>
                    <div className="arrow-title">
                        <h3>관련리뷰</h3>
                    </div>
                    <div className="info-box review-list">
                        <li className="review">서울특별시서울특별시서울특별시</li>
                        <li className="review">서울특별시서울특별시서울특별시</li>
                        <li className="review">서울특별시서울특별시서울특별시</li>
                        <li className="review">서울특별시서울특별시서울특별시</li>
                    </div>
                </div>
            </div>
            <button type="button" className={`open-btn ${activeSidebar ? 'active' : ''}`} onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#555555"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
            </button>
        </div>
    )
}
export default AIRecommendPage;