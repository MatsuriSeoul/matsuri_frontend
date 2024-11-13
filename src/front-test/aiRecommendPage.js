import React, {useEffect} from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import '../css/ai/aiRecommendPage.css';
import {useLocation} from "react-router-dom";
import axios from "axios";
import KakaoMapPlaner from "../KakaoMapPlaner";
import ReviewComponent from "../ReviewComponent";
import AIPlanerCommentList from "../AIPlanerCommentList";

const AIRecommendPage = () => {
    const [activeSidebar, setActiveSidebar] = useState(false);

    const handleClick = () => {
        setActiveSidebar(!activeSidebar);
      };

    const location = useLocation();
    const { result, region, category, duration, categories } = location.state;
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [detail, setDetail] = useState(null);
    const [planResult, setPlanResult] = useState(result); // 초기 여행 계획 결과를 상태로 설정
    const [intro, setIntro] = useState(null);
    const [images, setImages] = useState([]);
    const [locations, setLocations] = useState({}); // 변경된 locations 상태 변수

    // contenttypeid와 카테고리명을 매핑하는 맵
    const categoryMap = {
        '12': '관광지',
        '14': '문화시설',
        '15': '행사',
        '25': '여행코스',
        '28': '레포츠',
        '32': '숙박',
        '38': '쇼핑',
        '39': '음식'
    };
    // AIPlanerResult 컴포넌트 내
    const getEncodedCategory = (contenttypeid) => {
        const encodedCategory = categoryMap[contenttypeid] || 'default-category';
        return encodedCategory;
    };
    // 데이터 그룹화
    useEffect(() => {
        const updatedLocations = Object.keys(planResult.dayPlans).reduce((acc, day) => {
            acc[day] = planResult.dayPlans[day].map((event, index) => ({
                ...event,
                index: index + 1,
                category: categoryMap[event.contenttypeid],
            }));
            return acc;
        }, {});

        setLocations(updatedLocations); // locations 상태 업데이트
    }, [planResult]); // planResult가 변경될 때만 실행

    // 이벤트 클릭 핸들러
    const handleEventClick = (event) => {
        if (!event || !event.contentid || !event.contenttypeid) {
            return;
        }
        setActiveSidebar(true);
        setSelectedEvent(event);
    };

    //여행 새로고침
    const refreshPlan = async () => {
        try {
            const response = await axios.post('/api/openai/refresh-plan', {
                region,
                categories: categories && categories.length > 0 ? categories : [category],
                duration,
            });

            const newPlanResult = response.data;
            setPlanResult(newPlanResult); // 새로운 계획 데이터로 상태 업데이트

            // 업데이트된 계획 데이터로 locations도 갱신
            const updatedLocations = Object.keys(newPlanResult.dayPlans).reduce((acc, day) => {
                acc[day] = newPlanResult.dayPlans[day].map((event, index) => ({
                    ...event,
                    index: index + 1,
                    category: categoryMap[event.contenttypeid],
                }));
                return acc;
            }, {});

            setLocations(updatedLocations); // locations 상태 업데이트
        } catch (error) {
        }
    };

    // selectedEvent가 변경될 때마다 상세 정보 API 호출
    useEffect(() => {
        if (selectedEvent) {
            const category = categoryMap[selectedEvent.contenttypeid] || 'default';
            fetchDetail(selectedEvent.contentid, category);
            fetchIntro(selectedEvent.contentid, selectedEvent.contenttypeid, category);
            fetchImages(selectedEvent.contentid);
        }
    }, [selectedEvent],[planResult]);


    // 카테고리와 이벤트 ID에 따라 API 호출
    const getCategoryEndpoint = (category) => {
        switch (category) {
            case '관광지':
                return 'tourist-attractions';
            case '문화시설':
                return 'cultural-facilities';
            case '행사':
                return 'events';
            case '여행코스':
                return 'travel-courses';
            case '레포츠':
                return 'leisure-sports';
            case '숙박':
                return 'local-events';
            case '쇼핑':
                return 'shopping-events';
            case '음식':
                return 'food-events';
            default:
                return 'default-endpoint'; // 기본 엔드포인트 설정
        }
    };

    const fetchDetail = async (contentid, category) => {
        const endpoint = getCategoryEndpoint(category);
        try {
            const response = await axios.get(`http://localhost:8080/api/${endpoint}/${contentid}/detail`);
            setDetail(response.data);
        } catch (error) {

        }
    };

    const fetchIntro = async (contentid, contenttypeid, category) => {
        const endpoint = getCategoryEndpoint(category);
        try {
            const response = await axios.get(`http://localhost:8080/api/${endpoint}/${contentid}/${contenttypeid}/intro`);
            setIntro(response.data);
        } catch (error) {

        }
    };

    const fetchImages = async (contentid) => {
        if (!selectedEvent) return;
        const category = categoryMap[selectedEvent.contenttypeid] || 'default';
        const endpoint = getCategoryEndpoint(category);

        try {
            const response = await axios.get(`http://localhost:8080/api/${endpoint}/${contentid}/images`);
            setImages(response.data || []); // response.data가 null이거나 undefined인 경우 빈 배열로 설정
        } catch (error) {

            setImages([]); // 오류 발생 시 빈 배열로 설정
        }
    };

    // 각 contenttypeid에 따라 추가 정보를 렌더링하는 함수
    const renderAdditionalInfo = () => {
        if (!selectedEvent || !detail || !intro) return null; // detail과 intro가 로드되었는지 확인

        switch (selectedEvent.contenttypeid) {
            case '12': // 관광지
                return (
                    <div className="sub-info-list">
                        <div className="list">
                            <p className="label">홈페이지</p>
                            <span className="value" dangerouslySetInnerHTML={{__html: detail?.homepage || '정보 없음'}}/>
                        </div>
                        <div className="list">
                            <p className="label">주차 정보</p>
                            <p className="value">{intro.parking || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">이용 시간</p>
                            <p className="value">{intro.usetime || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">수용 인원</p>
                            <p className="value">{intro.accomcount || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">유모차 대여 정보</p>
                            <p className="value">{intro.chkbabycarriage || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">신용카드 가능 여부</p>
                            <p className="value">{intro.chkcreditcard || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">애완동물 동반 여부</p>
                            <p className="value">{intro.chkpet || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">체험 가능 연령</p>
                            <p className="value">{intro.expagerange || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">체험 안내</p>
                            <p className="value">{intro.expguide || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">세계문화유산 여부</p>
                            <p className="value">{intro.heritage1 || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">세계자연유산 여부</p>
                            <p className="value">{intro.heritage2 || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">세계기록유산 여부</p>
                            <p className="value">{intro.heritage3 || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">문의 및 안내</p>
                            <p className="value">{intro.infocenter || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">개장일</p>
                            <p className="value">{intro.opendate || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">쉬는 날</p>
                            <p className="value">{intro.restdate || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">이용 시기</p>
                            <p className="value">{intro.useseason || '정보 없음'}</p>
                        </div>
                    </div>
                );
            case '14': // 문화시설
                return (
                    <div className="sub-info-list">
                        <div className="list">
                            <p className="label">홈페이지</p>
                            <span className="value" dangerouslySetInnerHTML={{__html: detail?.homepage || '정보 없음'}}/>
                        </div>
                        <div className="list">
                            <p className="label">이용 시간</p>
                            <p className="value">{intro.usetimeculture || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">주차 정보</p>
                            <p className="value">{intro.parkingculture || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">주차 요금</p>
                            <p className="value">{intro.parkingfee || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">수용 인원</p>
                            <p className="value">{intro.accomcountculture || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">유모차 대여 정보</p>
                            <p className="value">{intro.chkbabycarriageculture || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">신용카드 가능 여부</p>
                            <p className="value">{intro.chkcreditcardculture || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">애완동물 동반 여부</p>
                            <p className="value">{intro.chkpetculture || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">할인 정보</p>
                            <p className="value">{intro.discountinfo || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">문의 및 안내</p>
                            <p className="value">{intro.infocenterculture || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">쉬는 날</p>
                            <p className="value">{intro.restdateculture || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">규모</p>
                            <p className="value">{intro.scale || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">관람 소요 시간</p>
                            <p className="value">{intro.spendtime || '정보 없음'}</p>
                        </div>
                    </div>
                );
            case '15': // 축제/공연/행사
                return (
                    <div className="sub-info-list">
                        <div className="list">
                            <p className="label">홈페이지</p>
                            <span className="value" dangerouslySetInnerHTML={{__html: detail?.homepage || '정보 없음'}}/>
                        </div>
                        <div className="list">
                            <p className="label">관람 가능 연령</p>
                            <p className="value">{intro.agelimit || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">예매처</p>
                            <p className="value">{intro.bookingplace || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">할인 정보</p>
                            <p className="value">{intro.discountinfofestival || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">행사 종료일</p>
                            <p className="value">{intro.eventenddate || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">행사 시작일</p>
                            <p className="value">{intro.eventstartdate || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">행사 장소</p>
                            <p className="value">{intro.eventplace || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">행사 프로그램</p>
                            <p className="value">{intro.program || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">관람 소요 시간</p>
                            <p className="value">{intro.spendtimefestival || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">이용 요금</p>
                            <p className="value">{intro.usetimefestival || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">주최자 정보</p>
                            <p className="value">{intro.sponsor1 || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">주최자 연락처</p>
                            <p className="value">{intro.sponsor1tel || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">주관사 정보</p>
                            <p className="value">{intro.sponsor2 || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">주관사 연락처</p>
                            <p className="value">{intro.sponsor2tel || '정보 없음'}</p>
                        </div>
                    </div>

                );
            case '25': // 여행코스
                return (
                    <div className="sub-info-list">
                        <div className="list">
                            <p className="label">홈페이지</p>
                            <span className="value" dangerouslySetInnerHTML={{__html: detail?.homepage || '정보 없음'}}/>
                        </div>
                        <div className="list">
                            <p className="label">코스 총 거리</p>
                            <p className="value">{intro.distance || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">문의 및 안내</p>
                            <p className="value">{intro.infocentertourcourse || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">코스 일정</p>
                            <p className="value">{intro.schedule || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">코스 총 소요 시간</p>
                            <p className="value">{intro.taketime || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">코스 테마</p>
                            <p className="value">{intro.theme || '정보 없음'}</p>
                        </div>
                    </div>

                );
            case '28': // 레포츠
                return (
                    <div className="sub-info-list">
                        <div className="list">
                            <p className="label">홈페이지</p>
                            <span className="value" dangerouslySetInnerHTML={{__html: detail?.homepage || '정보 없음'}}/>
                        </div>
                        <div className="list">
                            <p className="label">수용 인원</p>
                            <p className="value">{intro.accomcountleports || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">유모차 대여 정보</p>
                            <p className="value">{intro.chkbabycarriageleports || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">신용카드 가능 정보</p>
                            <p className="value">{intro.chkcreditcardleports || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">애완동물 동반 정보</p>
                            <p className="value">{intro.chkpetleports || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">체험 가능 연령</p>
                            <p className="value">{intro.expagerangeleports || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">문의 및 안내</p>
                            <p className="value">{intro.infocenterleports || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">개장 기간</p>
                            <p className="value">{intro.openperiod || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">주차 요금</p>
                            <p className="value">{intro.parkingfeeleports || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">주차 시설</p>
                            <p className="value">{intro.parkingleports || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">예약 안내</p>
                            <p className="value">{intro.reservation || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">쉬는 날</p>
                            <p className="value">{intro.restdateleports || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">규모</p>
                            <p className="value">{intro.scaleleports || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">입장료</p>
                            <p className="value">{intro.usefeeleports || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">이용 시간</p>
                            <p className="value">{intro.usetimeleports || '정보 없음'}</p>
                        </div>
                    </div>

                );
            case '39': // 음식
                return (
                    <div className="sub-info-list">
                        <div className="list">
                            <p className="label">홈페이지</p>
                            <span className="value" dangerouslySetInnerHTML={{__html: detail?.homepage || '정보 없음'}}/>
                        </div>
                        <div className="list">
                            <p className="label">신용카드 가능 정보</p>
                            <p className="value">{intro.chkcreditcardfood || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">할인 정보</p>
                            <p className="value">{intro.discountinfofood || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">대표 메뉴</p>
                            <p className="value">{intro.firstmenu || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">문의 및 안내</p>
                            <p className="value">{intro.infocenterfood || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">어린이 놀이방 여부</p>
                            <p className="value">{intro.kidsfacility || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">개업일</p>
                            <p className="value">{intro.opendatefood || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">영업시간</p>
                            <p className="value">{intro.opentimefood || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">포장 가능</p>
                            <p className="value">{intro.packing || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">주차 시설</p>
                            <p className="value">{intro.parkingfood || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">예약 안내</p>
                            <p className="value">{intro.reservationfood || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">쉬는 날</p>
                            <p className="value">{intro.restdatefood || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">규모</p>
                            <p className="value">{intro.scalefood || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">좌석 수</p>
                            <p className="value">{intro.seat || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">금연/흡연 여부</p>
                            <p className="value">{intro.smoking || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">취급 메뉴</p>
                            <p className="value">{intro.treatmenu || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">인허가 번호</p>
                            <p className="value">{intro.lcnsno || '정보 없음'}</p>
                        </div>
                    </div>

                );
            case '32': // 숙박
                return (
                    <div className="sub-info-list">
                        <div className="list">
                            <p className="label">홈페이지</p>
                            <span className="value" dangerouslySetInnerHTML={{__html: detail?.homepage || '정보 없음'}}/>
                        </div>
                        <div className="list">
                            <p className="label">수용 가능 인원</p>
                            <p className="value">{intro.accomcountlodging || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">입실 시간</p>
                            <p className="value">{intro.checkintime || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">퇴실 시간</p>
                            <p className="value">{intro.checkouttime || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">객실 내 취사 여부</p>
                            <p className="value">{intro.chkcooking || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">문의 및 안내</p>
                            <p className="value">{intro.infocenterlodging || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">주차 시설</p>
                            <p className="value">{intro.parkinglodging || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">객실 수</p>
                            <p className="value">{intro.roomcount || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">객실 유형</p>
                            <p className="value">{intro.roomtype || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">규모</p>
                            <p className="value">{intro.scalelodging || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">바비큐장 여부</p>
                            <p className="value">{intro.barbecue || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">뷰티 시설 여부</p>
                            <p className="value">{intro.beauty || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">식음료장 여부</p>
                            <p className="value">{intro.beverage || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">자전거 대여 여부</p>
                            <p className="value">{intro.bicycle || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">캠프파이어 여부</p>
                            <p className="value">{intro.campfire || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">휘트니스 센터 여부</p>
                            <p className="value">{intro.fitness || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">노래방 여부</p>
                            <p className="value">{intro.karaoke || '정보 없음'}</p>
                        </div>
                    </div>

                );
            case '38': // 쇼핑
                return (
                    <div className="sub-info-list">
                        <div className="list">
                            <p className="label">홈페이지</p>
                            <span className="value" dangerouslySetInnerHTML={{__html: detail?.homepage || '정보 없음'}}/>
                        </div>
                        <div className="list">
                            <p className="label">유모차 대여 정보</p>
                            <p className="value">{intro.chkbabycarriageshopping || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">신용카드 가능 정보</p>
                            <p className="value">{intro.chkcreditcardshopping || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">애완동물 동반 정보</p>
                            <p className="value">{intro.chkpetshopping || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">문화센터 바로가기</p>
                            <p className="value">{intro.culturecenter || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">장서는 날</p>
                            <p className="value">{intro.fairday || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">문의 및 안내</p>
                            <p className="value">{intro.infocentershopping || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">개장일</p>
                            <p className="value">{intro.opendateshopping || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">영업 시간</p>
                            <p className="value">{intro.opentime || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">주차 시설</p>
                            <p className="value">{intro.parkingshopping || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">쉬는 날</p>
                            <p className="value">{intro.restdateshopping || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">화장실 설명</p>
                            <p className="value">{intro.restroom || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">판매 품목</p>
                            <p className="value">{intro.saleitem || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">판매 품목별 가격</p>
                            <p className="value">{intro.saleitemcost || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">규모</p>
                            <p className="value">{intro.scaleshopping || '정보 없음'}</p>
                        </div>
                        <div className="list">
                            <p className="label">매장 안내</p>
                            <p className="value">{intro.shopguide || '정보 없음'}</p>
                        </div>
                    </div>

                );
            default:
                return <p>추가 정보가 없습니다.</p>;
        }
    };

    // 회원정보
    const [userInfo, setUserInfo] = useState({
        userName: '',
        userEmail: '',
        userPhone: '',
        userBirthday: '',
        profileImage: ''
    });
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 사용자 정보 불러오기
                const userInfoResponse = await axios.get('/api/users/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserInfo(userInfoResponse.data);
            } catch (error) {

            }
        };
        fetchData();
    }, [token]);
    return (
        <div className="AIRP">
            <div className="recommend-list">
                <div className="main-title">
                    <Link to='/'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                             fill="#5f6368">
                            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
                        </svg>
                    </Link>
                    <h1 className="title">AI플래너</h1>
                </div>
                <div className="choose-category">
                    <h1 className="user-title"><b>{userInfo.userName}님</b>을 위한 여행코스</h1>
                    <div className="container">
                        <div className="categorys">
                            <div className="area">
                                <p>{region}</p>
                            </div>
                            <div className="days">
                                <p>{duration}</p>
                            </div>
                            <div className="category">
                                <p>{categories.join('/')}</p>
                            </div>
                        </div>
                        <button className="reload" onClick={refreshPlan}>
                            <p>여행계획 다시 세우기</p>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                                 fill="#e8eaed">
                                <path
                                    d="M204-318q-22-38-33-78t-11-82q0-134 93-228t227-94h7l-64-64 56-56 160 160-160 160-56-56 64-64h-7q-100 0-170 70.5T240-478q0 26 6 51t18 49l-60 60ZM481-40 321-200l160-160 56 56-64 64h7q100 0 170-70.5T720-482q0-26-6-51t-18-49l60-60q22 38 33 78t11 82q0 134-93 228t-227 94h-7l64 64-56 56Z"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="planner">
                    {Object.keys(locations).map((day, dayIndex) => (
                        <div className="day day1">
                            <div className="title">
                                <div className="arrow-right"></div>
                                <h3>{day}</h3>
                            </div>
                            {locations[day].map((event, index) => (
                                <div className="plan"
                                     onClick={() => handleEventClick(event)}>
                                    <p className="num">{index + 1}</p>
                                    <div className="img"
                                         style={{
                                             backgroundImage: `url(${event.image ? event.image : '/img/default_img.jpeg'})`,
                                             backgroundSize: 'cover',
                                             backgroundPosition: 'center',
                                         }}
                                    >
                                    </div>
                                    <div className="plan-info">
                                        <div className="category">
                                            <p>{categoryMap[event.contenttypeid]}</p>
                                        </div>
                                        <p className="plan-title">{event.title}</p>
                                        <p className="addr">{event.addr1}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="wall"></div>
                <div className="AIcomment">
                    <div className="title">
                        <div className="arrow-right"></div>
                        <h3>AI 추천 메시지</h3>
                    </div>
                    <div className='comment'>
                        <p>
                            {planResult.aiResponse}
                        </p>
                    </div>
                </div>
            </div>

            <div className="map">
                <KakaoMapPlaner locations={locations} selectedEvent={selectedEvent}/>
            </div>
            {selectedEvent && detail && intro && (
                <div className={`detail-side ${activeSidebar ? 'active' : ''}`}>
                    <div className="container">
                        <div className="main-img"
                             style={{
                                 backgroundImage: `url(${selectedEvent.image ? selectedEvent.image : '/img/default_img.jpeg'})`,
                                 backgroundSize: 'cover',
                                 backgroundPosition: 'center',
                             }}>
                        </div>
                        <div className="info-box info-title">
                            <div className="category">
                                <p>{categoryMap[selectedEvent.contenttypeid]}</p>
                            </div>
                            <h2 className="title">{selectedEvent.title}</h2>
                            <h4 className="addr">{selectedEvent.addr1}</h4>
                        </div>
                        <div className="arrow-title">
                            <h3>상세정보</h3>
                        </div>
                        <div className="info-box info-content">
                            <p className="content">
                                {detail.overview}
                            </p>
                        </div>
                        <div className="arrow-title">
                            <h3>추가정보</h3>
                        </div>
                        <div className="info-box sub-info">
                            {renderAdditionalInfo()}
                        </div>
                        {images.length > 0 && (
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
                                    {images.map((image, index) => (
                                        <SwiperSlide key={index}>
                                            <div className={`detail-img id${index}`}>
                                                <img src={image.originimgurl} alt={`원본 이미지 ${index + 1}`}/>
                                            </div>
                                        </SwiperSlide>
                                    ))}

                                    <div className="swiper-button swiper-button-prev"></div>
                                    <div className="swiper-button swiper-button-next"></div>
                                </Swiper>
                            </div>
                        )}

                        <div className="arrow-title">
                            <h3>관련리뷰</h3>
                        </div>
                        <ReviewComponent query={detail.title}/>

                        <div className="arrow-title">
                            <h3>댓글 목록</h3>
                        </div>
                        <AIPlanerCommentList
                            category={getEncodedCategory(selectedEvent.contenttypeid)}
                            contentid={selectedEvent.contentid}
                            contenttypeid={selectedEvent.contenttypeid}
                        />
                    </div>
                </div>
            )}
            {selectedEvent && detail && intro && (
                <button type="button" className={`open-btn ${activeSidebar ? 'active' : ''}`} onClick={handleClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="#555555">
                        <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/>
                    </svg>
                </button>
            )}
        </div>
    )
}
export default AIRecommendPage;