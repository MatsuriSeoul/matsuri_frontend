/*
* 지역 인천 카테고리 선택
* */

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IncheonEventList = () => {
    const [shoppingEvents, setShoppingEvents] = useState([]);
    const [foodEvents, setFoodEvents] = useState([]);
    const [localEvents, setLocalEvents] = useState([]);
    const [culturalFacilities, setCulturalFacilities] = useState([]);
    const [tourEvents, setTourEvents] = useState([]);
    const [touristAttractions, setTouristAttractions] = useState([]);
    const [travelCourses, setTravelCourses] = useState([]);

    useEffect(() => {
        // 쇼핑 이벤트 가져오기
        const fetchShoppingEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/shopping-events/by-region', {
                    params: { region: '인천광역시' }
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
                    params: { region: '인천광역시' }
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
                    params: { region: '인천광역시' }
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
                    params: { region: '인천광역시' }
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
                    params: { region: '인천광역시' }
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
                    params: { region: '인천광역시' }
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
                    params: { region: '인천광역시' }
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

export default IncheonEventList;
