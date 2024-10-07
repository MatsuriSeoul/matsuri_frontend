/*
* 지역 대구 카테고리 선택
* */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

const DaeguEventList = () => {
    const [shoppingEvents, setShoppingEvents] = useState([]);
    const [foodEvents, setFoodEvents] = useState([]);
    const [localEvents, setLocalEvents] = useState([]);
    const [culturalFacilities, setCulturalFacilities] = useState([]);
    const [tourEvents, setTourEvents] = useState([]);
    const [touristAttractions, setTouristAttractions] = useState([]);
    const [travelCourses, setTravelCourses] = useState([]);
    const [selectedRegion] = useState("daegu"); // '서울'로 고정

    // 각 지역별 시/군/구 데이터
    const regionSubareas = {
        seoul: ["강남구", "강동구", "강북구", "강서구", "관악구", "광진구", "구로구", "금천구", "기타지역", "노원구", "도봉구", "동대문구", "동작구", "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구", "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"],
        gyeonggi: ["가평군", "고양시", "과천시", "광명시", "광주시", "구리시", "군포시", "김포시", "남양주시", "동두천시", "부천시", "성남시", "수원시", "시흥시", "안산시", "안성시", "안양시", "양주시", "양평군", "여주시", "연천군", "오산시", "용인시", "의왕시", "의정부시", "이천시", "파주시", "평택시", "포천시", "하남시", "화성시"],
        incheon: ["강화군", "계양구", "미추홀구", "남동구", "동구", "부평구", "서구", "연수구", "옹진군", "중구"],
        daejeon: ["대덕구", "동구", "서구", "유성구", "중구"],
        gangwon: ["강릉시", "고성군", "동해시", "삼척시", "속초시", "양구군", "양양군", "영월군", "원주시", "인제군", "정선군", "철원군", "춘천시", "태백시", "평창군", "홍천군", "화천군", "횡성군"],
        busan: ["강서구", "금정구", "기장군", "남구", "동구", "동래구", "부산진구", "북구", "사상구", "사하구", "서구", "수영구", "연제구", "영도구", "중구", "해운대구"],
        ulsan: ["중구", "남구", "동구", "북구", "울주군"],
        daegu: ["군위군", "남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구"],
        jeonnam: ["강진군", "고흥군", "곡성군", "광양시", "구례군", "나주시", "담양군", "목포시", "무안군", "보성군", "순천시", "신안군", "여수시", "영광군", "영암군", "완도군", "장성군", "장흥군", "진도군", "함평군", "해남군", "화순군"],
        jeonbuk: ["고창군", "군산시", "김제시", "남원시", "무주군", "부안군", "순창군", "완주군", "익산시", "임실군", "장수군", "전주시", "정읍시", "진안군"],
        chungnam: ["공주시", "금산군", "논산시", "당진시", "보령시", "부여군", "서산시", "서천군", "아산시", "예산군", "천안시", "청양군", "태안군", "홍성군", "계룡시"],
        chungbuk: ["괴산군", "단양군", "보은군", "영동군", "옥천군", "음성군", "제천시", "진천군", "청원군", "청주시", "충주시", "증평군"],
        gyeongnam: ["거제시", "거창군", "고성군", "김해시", "남해군", "마산시", "밀양시", "사천시", "산청군", "양산시", "의령군", "진주시", "진해시", "창녕군", "창원시", "통영시", "하동군", "함안군", "함양군", "합천군"],
        gyeongbuk: ["경산시", "경주시", "고령군", "구미시", "김천시", "문경시", "봉화군", "상주시", "성주군", "안동군", "영덕군", "영양군", "영주시", "영천시", "예천군", "울릉군", "울진군", "의성군", "청도군", "청송군", "칠곡군", "포항시"],
        jeju: ["남제주군", "북제주군", "서귀포시", "제주시"]
    };

    // 지역 데이터
    const regions = [
        { id: 'seoul', name: '서울' },
        { id: 'gyeonggi', name: '경기' },
        { id: 'incheon', name: '인천' },
        { id: 'daejeon', name: '대전' },
        { id: 'gangwon', name: '강원' },
        { id: 'busan', name: '부산' },
        { id: 'ulsan', name: '울산' },
        { id: 'daegu', name: '대구' },
        { id: 'jeonnam', name: '전남' },
        { id: 'jeonbuk', name: '전북' },
        { id: 'chungnam', name: '충남' },
        { id: 'chungbuk', name: '충북' },
        { id: 'gyeongnam', name: '경남' },
        { id: 'gyeongbuk', name: '경북' },
        { id: 'jeju', name: '제주' }
    ];
    useEffect(() => {
        // 쇼핑 이벤트 가져오기
        const fetchShoppingEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/shopping-events/by-region', {
                    params: { region: '대구광역시' }
                });
                setShoppingEvents(response.data);
            } catch (error) {
                console.error('쇼핑 이벤트 데이터를 가져오는 중 오류 발생', error);
            }
        };

        // 음식 이벤트 가져오기
        const fetchFoodEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/food-events/by-region', {
                    params: { region: '대구광역시' }
                });
                setFoodEvents(response.data);
            } catch (error) {
                console.error('음식 이벤트 데이터를 가져오는 중 오류 발생', error);
            }
        };

        // 숙박 이벤트 가져오기
        const fetchLocalEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/local-events/by-region', {
                    params: { region: '대구광역시' }
                });
                setLocalEvents(response.data);
            } catch (error) {
                console.error('숙박 이벤트 데이터를 가져오는 중 오류 발생', error);
            }
        };

        // 문화시설 이벤트 가져오기
        const fetchCulturalFacilities = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cultural-facilities/by-region', {
                    params: { region: '대구광역시' }
                });
                setCulturalFacilities(response.data);
            } catch (error) {
                console.error('문화시설 이벤트 데이터를 가져오는 중 오류 발생', error);
            }
        };

        // 축제/공연/행사 가져오기
        const fetchTourEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/events/by-region', {
                    params: { region: '대구광역시' }
                });
                setTourEvents(response.data);
            } catch (error) {
                console.error('축제/공연/행사 데이터를 가져오는 중 오류 발생', error);
            }
        };

        // 관광지 가져오기
        const fetchTouristAttractions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/tourist-attractions/by-region', {
                    params: { region: '대구광역시' }
                });
                setTouristAttractions(response.data);
            } catch (error) {
                console.error('관광지 데이터를 가져오는 중 오류 발생', error);
            }
        };

        // 여행 코스 가져오기
        const fetchTravelCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/travel-courses/by-region', {
                    params: { region: '대구광역시' }
                });
                setTravelCourses(response.data);
            } catch (error) {
                console.error('여행 코스 데이터를 가져오는 중 오류 발생', error);
            }
        };

        // 모든 데이터 가져오기 함수 호출
        fetchShoppingEvents();
        fetchFoodEvents();
        fetchLocalEvents();
        fetchCulturalFacilities();
        fetchTourEvents();
        fetchTouristAttractions();
        fetchTravelCourses();
    }, []);

    return (
        <div>
            {/* 쇼핑 행사 */}
            <h2>쇼핑 행사</h2>
            {/* 시/군/구 목록 */}
            {selectedRegion && (
                <div style={{ marginTop: '20px' }}>
                    <h2>{regions.find(region => region.id === selectedRegion)?.name} 지역 자세하게 시/군/구를 골라봐요!</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {regionSubareas[selectedRegion]?.map((subarea, index) => (
                            <Link key={index} to={`/region/${selectedRegion}/${subarea}`} style={{ textDecoration: 'none' }}>
                                <button>{subarea}</button>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                {shoppingEvents.map((event, index) => (
                    <div key={index} style={{flex: '0 0 20%'}}>
                        <h3>{event.title || event[0]}</h3>
                        {(event.firstimage || event[1]) &&
                            <img src={event.firstimage || event[1]} alt={event.title || event[0]} width="100%"/>}
                    </div>
                ))}
            </div>

            {/* 음식 행사 */}
            <h2>음식 행사</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                {foodEvents.map((event, index) => (
                    <div key={index} style={{flex: '0 0 20%'}}>
                        <h3>{event.title || event[0]}</h3>
                        {(event.firstimage || event[1]) &&
                            <img src={event.firstimage || event[1]} alt={event.title || event[0]} width="100%"/>}
                    </div>
                ))}
            </div>

            {/* 숙박 행사 */}
            <h2>숙박 행사</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                {localEvents.map((event, index) => (
                    <div key={index} style={{flex: '0 0 20%'}}>
                        <h3>{event.title || event[0]}</h3>
                        {(event.firstimage || event[1]) &&
                            <img src={event.firstimage || event[1]} alt={event.title || event[0]} width="100%"/>}
                    </div>
                ))}
            </div>

            {/* 문화 시설 행사 */}
            <h2>문화 시설</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                {culturalFacilities.map((event, index) => (
                    <div key={index} style={{flex: '0 0 20%'}}>
                        <h3>{event.title || event[0]}</h3>
                        {(event.firstimage || event[1]) &&
                            <img src={event.firstimage || event[1]} alt={event.title || event[0]} width="100%"/>}
                    </div>
                ))}
            </div>

            {/* 축제/공연/행사 */}
            <h2>축제/공연/행사</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                {tourEvents.map((event, index) => (
                    <div key={index} style={{flex: '0 0 20%'}}>
                        <h3>{event.title || event[0]}</h3>
                        {(event.firstimage || event[1]) &&
                            <img src={event.firstimage || event[1]} alt={event.title || event[0]} width="100%"/>}
                    </div>
                ))}
            </div>

            {/* 관광지 */}
            <h2>관광지</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                {touristAttractions.map((event, index) => (
                    <div key={index} style={{flex: '0 0 20%'}}>
                        <h3>{event.title || event[0]}</h3>
                        {(event.firstimage || event[1]) &&
                            <img src={event.firstimage || event[1]} alt={event.title || event[0]} width="100%"/>}
                    </div>
                ))}
            </div>

            {/* 여행 코스 */}
            <h2>여행 코스</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                {travelCourses.map((event, index) => (
                    <div key={index} style={{flex: '0 0 20%'}}>
                        <h3>{event.title || event[0]}</h3>
                        {(event.firstimage || event[1]) &&
                            <img src={event.firstimage || event[1]} alt={event.title || event[0]} width="100%"/>}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DaeguEventList;
