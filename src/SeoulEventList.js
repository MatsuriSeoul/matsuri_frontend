/*
* 지역 서울 카테고리 선택
* */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DistrictSelection from "./DistrictSelection";
import {Link} from "react-router-dom";

const SeoulEventList = () => {
    const [seoulEvents, setSeoulEvents] = useState([]);
    const [shoppingEvents, setShoppingEvents] = useState([]);
    const [foodEvents, setFoodEvents] = useState([]);
    const [localEvents, setLocalEvents] = useState([]);
    const [culturalFacilities, setCulturalFacilities] = useState([]);
    const [tourEvents, setTourEvents] = useState([]);
    const [touristAttractions, setTouristAttractions] = useState([]);
    const [travelCourses, setTravelCourses] = useState([]);

    const [selectedDistrict, setSelectedDistrict] = useState(null); // 시군구 선택 상태 추가

    useEffect(() => {
        if (selectedDistrict === null) {
            // 사용자가 시군구를 선택하지 않은 경우, 기존의 전체 데이터를 가져옴
            fetchSeoulEvents();
            fetchShoppingEvents();
            fetchFoodEvents();
            fetchLocalEvents();
            fetchCulturalFacilities();
            fetchTourEvents();
            fetchTouristAttractions();
            fetchTravelCourses();
        } else {
            // 사용자가 시군구를 선택한 경우, 해당 시군구의 데이터를 가져옴
            const areaCode = 1; // 서울의 areaCode는 1
            fetchEventsByDistrict(areaCode, selectedDistrict);
        }
    }, [selectedDistrict]);

    // 기존의 데이터를 가져오는 함수들 (수정하지 않음)
    // 서울 관련 데이터 가져오기
    const fetchSeoulEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/seoul-events/titles-and-images');
            setSeoulEvents(response.data);
        } catch (error) {
            console.error('Error fetching Seoul events', error);
        }
    };

    // 쇼핑 이벤트 가져오기
    const fetchShoppingEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/shopping-events/by-region', {
                params: { region: '서울특별시' }
            });
            setShoppingEvents(response.data);

            // 추가된 코드: 쇼핑 이벤트 상세 정보 미리 가져오기
            response.data.forEach(event => {
                axios.get(`http://localhost:8080/api/shopping-events/${event.contentid}/detail`);
            });
        } catch (error) {
            console.error('Error fetching Shopping events', error);
        }
    };

    // 음식 이벤트 가져오기
    const fetchFoodEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/food-events/by-region', {
                params: { region: '서울특별시' }
            });
            setFoodEvents(response.data);

            // 추가된 코드: 음식 이벤트 상세 정보 미리 가져오기
            response.data.forEach(event => {
                axios.get(`http://localhost:8080/api/food-events/${event.contentid}/detail`);
            });
        } catch (error) {
            console.error('Error fetching Food events', error);
        }
    };

    // 숙박 이벤트 가져오기
    const fetchLocalEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/local-events/by-region', {
                params: { region: '서울특별시' }
            });
            setLocalEvents(response.data);

            // 추가된 코드: 숙박 이벤트 상세 정보 미리 가져오기
            response.data.forEach(event => {
                axios.get(`http://localhost:8080/api/local-events/${event.contentid}/detail`);
            });
        } catch (error) {
            console.error('Error fetching Local events', error);
        }
    };

    // 문화시설 이벤트 가져오기
    const fetchCulturalFacilities = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/cultural-facilities/by-region', {
                params: { region: '서울특별시' }
            });
            setCulturalFacilities(response.data);

            // 추가된 코드: 문화시설 상세 정보 미리 가져오기
            response.data.forEach(event => {
                axios.get(`http://localhost:8080/api/cultural-facilities/${event.contentid}/detail`);
            });
        } catch (error) {
            console.error('Error fetching Cultural Facilities', error);
        }
    };

    // 축제/공연/행사 가져오기
    const fetchTourEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/events/by-region', {
                params: { region: '서울특별시' }
            });
            setTourEvents(response.data);

            // 추가된 코드: 축제/공연/행사 상세 정보 미리 가져오기
            response.data.forEach(event => {
                axios.get(`http://localhost:8080/api/events/${event.contentid}/detail`);
            });
        } catch (error) {
            console.error('Error fetching Tour events', error);
        }
    };

    // 관광지 가져오기
    const fetchTouristAttractions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/tourist-attractions/by-region', {
                params: { region: '서울특별시' }
            });
            setTouristAttractions(response.data);

            // 추가된 코드: 관광지 상세 정보 미리 가져오기
            response.data.forEach(event => {
                axios.get(`http://localhost:8080/api/tourist-attractions/${event.contentid}/detail`);
            });
        } catch (error) {
            console.error('Error fetching Tourist Attractions', error);
        }
    };

    // 여행 코스 가져오기
    const fetchTravelCourses = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/travel-courses/by-region', {
                params: { region: '서울특별시' }
            });
            setTravelCourses(response.data);

            // 추가된 코드: 여행 코스 상세 정보 미리 가져오기
            response.data.forEach(event => {
                axios.get(`http://localhost:8080/api/travel-courses/${event.contentid}/detail`);
            });
        } catch (error) {
            console.error('Error fetching Travel Courses', error);
        }
    };


    // 시군구별 데이터를 가져오는 함수 추가
    const fetchEventsByDistrict = async (areaCode, sigunguCode) => {
        try {
            const response = await axios.get('http://localhost:8080/api/local/events', {
                params: { areaCode, sigunguCode },
            });
            const events = response.data;

            // content_type_id에 따라 카테고리별로 분류
            const seoulEvents = [];
            const shoppingEvents = [];
            const foodEvents = [];
            const localEvents = [];
            const culturalFacilities = [];
            const tourEvents = [];
            const touristAttractions = [];
            const travelCourses = [];

            events.forEach(event => {
                switch (event.contentTypeId) {
                    case '12':
                        touristAttractions.push(event);
                        break;
                    case '14':
                        culturalFacilities.push(event);
                        break;
                    case '15':
                        tourEvents.push(event);
                        break;
                    case '25':
                        travelCourses.push(event);
                        break;
                    case '32':
                        localEvents.push(event);
                        break;
                    case '38':
                        shoppingEvents.push(event);
                        break;
                    case '39':
                        foodEvents.push(event);
                        break;
                    default:
                        seoulEvents.push(event);
                        break;
                }
            });

            // 상태 업데이트
            setSeoulEvents(seoulEvents);
            setShoppingEvents(shoppingEvents);
            setFoodEvents(foodEvents);
            setLocalEvents(localEvents);
            setCulturalFacilities(culturalFacilities);
            setTourEvents(tourEvents);
            setTouristAttractions(touristAttractions);
            setTravelCourses(travelCourses);
        } catch (error) {
            console.error('Error fetching events by district', error);
        }
    };

    return (
        <div>
            <h1>서울 지역 행사</h1>

            {/* DistrictSelection에 selectedDistrict와 setSelectedDistrict를 전달 */}
            <DistrictSelection
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
            />

            {/* 선택된 시군구에 따라 렌더링 */}
            {selectedDistrict === null ? (
                <>
                    {/* 서울 행사 */}
                    <h2>서울 행사</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {seoulEvents.map((event, index) => {
                            const contentId = event.contentid || event.contentId;
                            const contentTypeId = event.contenttypeid || event.contentTypeId;
                            return (
                                <div key={index} style={{ flex: '0 0 20%' }}>
                                    <Link to={`/seoul-events/${contentId}/detail`}>
                                        <h3>{event.title || event[0]}</h3>
                                        {(event.firstimage || event.firstImage || event.first_image || event[1]) &&
                                            <img
                                                src={event.firstimage || event.firstImage || event.first_image || event[1]}
                                                alt={event.title || event[0]}
                                                width="100%"
                                            />}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* 쇼핑 행사 */}
                    <h2>쇼핑 행사</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {shoppingEvents.map((event, index) => {
                            const contentId = event.contentid || event.contentId;
                            const contentTypeId = event.contenttypeid || event.contentTypeId;
                            return (
                                <div key={index} style={{ flex: '0 0 20%' }}>
                                    <Link to={`/shopping-events/${contentId}/${contentTypeId}/detail`}>
                                        <h3>{event.title || event[0]}</h3>
                                        {(event.firstimage || event.firstImage || event.first_image || event[1]) &&
                                            <img
                                                src={event.firstimage || event.firstImage || event.first_image || event[1]}
                                                alt={event.title || event[0]}
                                                width="100%"
                                            />}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* 음식 행사 */}
                    <h2>음식 행사</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {foodEvents.map((event, index) => {
                            const contentId = event.contentid || event.contentId;
                            const contentTypeId = event.contenttypeid || event.contentTypeId;
                            return (
                                <div key={index} style={{ flex: '0 0 20%' }}>
                                    <Link to={`/food-events/${contentId}/${contentTypeId}/detail`}>
                                        <h3>{event.title || event[0]}</h3>
                                        {(event.firstimage || event.firstImage || event.first_image || event[1]) &&
                                            <img
                                                src={event.firstimage || event.firstImage || event.first_image || event[1]}
                                                alt={event.title || event[0]}
                                                width="100%"
                                            />}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* 숙박 행사 */}
                    <h2>숙박 행사</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {localEvents.map((event, index) => {
                            const contentId = event.contentid || event.contentId;
                            const contentTypeId = event.contenttypeid || event.contentTypeId;
                            return (
                                <div key={index} style={{ flex: '0 0 20%' }}>
                                    <Link to={`/local-events/${contentId}/${contentTypeId}/detail`}>
                                        <h3>{event.title || event[0]}</h3>
                                        {(event.firstimage || event.firstImage || event.first_image || event[1]) &&
                                            <img
                                                src={event.firstimage || event.firstImage || event.first_image || event[1]}
                                                alt={event.title || event[0]}
                                                width="100%"
                                            />}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* 문화 시설 */}
                    <h2>문화 시설</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {culturalFacilities.map((event, index) => {
                            const contentId = event.contentid || event.contentId;
                            const contentTypeId = event.contenttypeid || event.contentTypeId;
                            return (
                                <div key={index} style={{ flex: '0 0 20%' }}>
                                    <Link to={`/cultural-facilities/${contentId}/${contentTypeId}/detail`}>
                                        <h3>{event.title || event[0]}</h3>
                                        {(event.firstimage || event.firstImage || event.first_image || event[1]) &&
                                            <img
                                                src={event.firstimage || event.firstImage || event.first_image || event[1]}
                                                alt={event.title || event[0]}
                                                width="100%"
                                            />}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* 축제/공연/행사 */}
                    <h2>축제/공연/행사</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {tourEvents.map((event, index) => {
                            const contentId = event.contentid || event.contentId;
                            const contentTypeId = event.contenttypeid || event.contentTypeId;
                            return (
                                <div key={index} style={{ flex: '0 0 20%' }}>
                                    <Link to={`/events/${contentId}/${contentTypeId}/detail`}>
                                        <h3>{event.title || event[0]}</h3>
                                        {(event.firstimage || event.firstImage || event.first_image || event[1]) &&
                                            <img
                                                src={event.firstimage || event.firstImage || event.first_image || event[1]}
                                                alt={event.title || event[0]}
                                                width="100%"
                                            />}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* 관광지 */}
                    <h2>관광지</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {touristAttractions.map((event, index) => {
                            const contentId = event.contentid || event.contentId;
                            const contentTypeId = event.contenttypeid || event.contentTypeId;
                            return (
                                <div key={index} style={{ flex: '0 0 20%' }}>
                                    <Link to={`/tourist-attraction/${contentId}/${contentTypeId}/detail`}>
                                        <h3>{event.title || event[0]}</h3>
                                        {(event.firstimage || event.firstImage || event.first_image || event[1]) &&
                                            <img
                                                src={event.firstimage || event.firstImage || event.first_image || event[1]}
                                                alt={event.title || event[0]}
                                                width="100%"
                                            />}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* 여행 코스 */}
                    <h2>여행 코스</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {travelCourses.map((event, index) => {
                            const contentId = event.contentid || event.contentId;
                            const contentTypeId = event.contenttypeid || event.contentTypeId;
                            return (
                                <div key={index} style={{ flex: '0 0 20%' }}>
                                    <Link to={`/travel-courses/${contentId}/${contentTypeId}/detail`}>
                                        <h3>{event.title || event[0]}</h3>
                                        {(event.firstimage || event.firstImage || event.first_image || event[1]) &&
                                            <img
                                                src={event.firstimage || event.firstImage || event.first_image || event[1]}
                                                alt={event.title || event[0]}
                                                width="100%"
                                            />}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </>
            ) : (
                <>
                    {/* 선택된 시군구의 행사 */}
                    {/* 쇼핑 행사 */}
                    <h2>쇼핑 행사</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {shoppingEvents.map((event, index) => {
                            const contentId = event.contentid || event.contentId;
                            const contentTypeId = event.contenttypeid || event.contentTypeId;
                            return (
                                <div key={index} style={{ flex: '0 0 20%' }}>
                                    <Link to={`/district/${contentId}/${contentTypeId}/detail`}>
                                        <h3>{event.title || event[0]}</h3>
                                        {(event.firstImage || event.firstimage || event.first_image || event[1]) &&
                                            <img
                                                src={event.firstImage || event.firstimage || event.first_image || event[1]}
                                                alt={event.title || event[0]}
                                                width="100%"
                                            />}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* 음식 행사 */}
                    <h2>음식 행사</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {foodEvents.map((event, index) => {
                            const contentId = event.contentid || event.contentId;
                            const contentTypeId = event.contenttypeid || event.contentTypeId;
                            return (
                                <div key={index} style={{ flex: '0 0 20%' }}>
                                    <Link to={`/district/${contentId}/${contentTypeId}/detail`}>
                                        <h3>{event.title || event[0]}</h3>
                                        {(event.firstImage || event.firstimage || event.first_image || event[1]) &&
                                            <img
                                                src={event.firstImage || event.firstimage || event.first_image || event[1]}
                                                alt={event.title || event[0]}
                                                width="100%"
                                            />}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* 숙박 행사 */}
                    <h2>숙박 행사</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {localEvents.map((event, index) => {
                            const contentId = event.contentid || event.contentId;
                            const contentTypeId = event.contenttypeid || event.contentTypeId;
                            return (
                                <div key={index} style={{ flex: '0 0 20%' }}>
                                    <Link to={`/district/${contentId}/${contentTypeId}/detail`}>
                                        <h3>{event.title || event[0]}</h3>
                                        {(event.firstImage || event.firstimage || event.first_image || event[1]) &&
                                            <img
                                                src={event.firstImage || event.firstimage || event.first_image || event[1]}
                                                alt={event.title || event[0]}
                                                width="100%"
                                            />}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* 문화 시설 */}
                    <h2>문화 시설</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {culturalFacilities.map((event, index) => {
                            const contentId = event.contentid || event.contentId;
                            const contentTypeId = event.contenttypeid || event.contentTypeId;
                            return (
                                <div key={index} style={{ flex: '0 0 20%' }}>
                                    <Link to={`/district/${contentId}/${contentTypeId}/detail`}>
                                        <h3>{event.title || event[0]}</h3>
                                        {(event.firstImage || event.firstimage || event.first_image || event[1]) &&
                                            <img
                                                src={event.firstImage || event.firstimage || event.first_image || event[1]}
                                                alt={event.title || event[0]}
                                                width="100%"
                                            />}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* 축제/공연/행사 */}
                    <h2>축제/공연/행사</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {tourEvents.map((event, index) => {
                            const contentId = event.contentid || event.contentId;
                            const contentTypeId = event.contenttypeid || event.contentTypeId;
                            return (
                                <div key={index} style={{ flex: '0 0 20%' }}>
                                    <Link to={`/district/${contentId}/${contentTypeId}/detail`}>
                                        <h3>{event.title || event[0]}</h3>
                                        {(event.firstImage || event.firstimage || event.first_image || event[1]) &&
                                            <img
                                                src={event.firstImage || event.firstimage || event.first_image || event[1]}
                                                alt={event.title || event[0]}
                                                width="100%"
                                            />}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* 관광지 */}
                    <h2>관광지</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {touristAttractions.map((event, index) => {
                            const contentId = event.contentid || event.contentId;
                            const contentTypeId = event.contenttypeid || event.contentTypeId;
                            return (
                                <div key={index} style={{ flex: '0 0 20%' }}>
                                    <Link to={`/district/${contentId}/${contentTypeId}/detail`}>
                                        <h3>{event.title || event[0]}</h3>
                                        {(event.firstImage || event.firstimage || event.first_image || event[1]) &&
                                            <img
                                                src={event.firstImage || event.firstimage || event.first_image || event[1]}
                                                alt={event.title || event[0]}
                                                width="100%"
                                            />}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* 여행 코스 */}
                    <h2>여행 코스</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {travelCourses.map((event, index) => {
                            const contentId = event.contentid || event.contentId;
                            const contentTypeId = event.contenttypeid || event.contentTypeId;
                            return (
                                <div key={index} style={{ flex: '0 0 20%' }}>
                                    <Link to={`/district/${contentId}/${contentTypeId}/detail`}>
                                        <h3>{event.title || event[0]}</h3>
                                        {(event.firstImage || event.firstimage || event.first_image || event[1]) &&
                                            <img
                                                src={event.firstImage || event.firstimage || event.first_image || event[1]}
                                                alt={event.title || event[0]}
                                                width="100%"
                                            />}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    {/* 레포츠 행사 */}
                    <h2>레포츠 행사</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {seoulEvents.map((event, index) => {
                            const contentId = event.contentid || event.contentId;
                            const contentTypeId = event.contenttypeid || event.contentTypeId;
                            return (
                                <div key={index} style={{ flex: '0 0 20%' }}>
                                    <Link to={`/district/${contentId}/${contentTypeId}/detail`}>
                                        <h3>{event.title || event[0]}</h3>
                                        {(event.firstimage || event.firstImage || event.first_image || event[1]) &&
                                            <img
                                                src={event.firstimage || event.firstImage || event.first_image || event[1]}
                                                alt={event.title || event[0]}
                                                width="100%"
                                            />}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                </>
            )}
        </div>
    );
};

export default SeoulEventList;
