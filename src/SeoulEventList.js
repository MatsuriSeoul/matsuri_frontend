/*
* 지역 서울 카테고리 선택
* */

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeoulEventList = () => {
    const [seoulEvents, setSeoulEvents] = useState([]);
    const [shoppingEvents, setShoppingEvents] = useState([]);
    const [foodEvents, setFoodEvents] = useState([]);
    const [localEvents, setLocalEvents] = useState([]);
    const [culturalFacilities, setCulturalFacilities] = useState([]);
    const [tourEvents, setTourEvents] = useState([]);
    const [touristAttractions, setTouristAttractions] = useState([]);
    const [travelCourses, setTravelCourses] = useState([]);

    useEffect(() => {
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
                    params: {region: '서울특별시'}
                });
                setShoppingEvents(response.data);
            } catch (error) {
                console.error('Error fetching Shopping events', error);
            }
        };

        // 음식 이벤트 가져오기
        const fetchFoodEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/food-events/by-region', {
                    params: {region: '서울특별시'}
                });
                setFoodEvents(response.data);
            } catch (error) {
                console.error('Error fetching Food events', error);
            }
        };

        // 숙박 이벤트 가져오기
        const fetchLocalEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/local-events/by-region', {
                    params: {region: '서울특별시'}
                });
                setLocalEvents(response.data);
            } catch (error) {
                console.error('Error fetching Local events', error);
            }
        };

        // 문화시설 이벤트 가져오기
        const fetchCulturalFacilities = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cultural-facilities/by-region', {
                    params: {region: '서울특별시'}
                });
                setCulturalFacilities(response.data);
            } catch (error) {
                console.error('Error fetching Cultural Facilities', error);
            }
        };

        // 축제/공연/행사 가져오기
        const fetchTourEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/events/by-region', {
                    params: {region: '서울특별시'}
                });
                setTourEvents(response.data);
            } catch (error) {
                console.error('Error fetching Tour events', error);
            }
        };

        // 관광지 가져오기
        const fetchTouristAttractions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/tourist-attractions/by-region', {
                    params: {region: '서울특별시'}
                });
                setTouristAttractions(response.data);
            } catch (error) {
                console.error('Error fetching Tourist Attractions', error);
            }
        };

        // 여행 코스 가져오기
        const fetchTravelCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/travel-courses/by-region', {
                    params: {region: '서울특별시'}
                });
                setTravelCourses(response.data);
            } catch (error) {
                console.error('Error fetching Travel Courses', error);
            }
        };

        // 모든 데이터 가져오기 함수 호출
        fetchSeoulEvents();
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
            <h1>서울 지역 행사</h1>

            {/* 서울 행사 */}
            <h2>서울 행사</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                {seoulEvents.map((event, index) => (
                    <div key={index} style={{flex: '0 0 20%'}}>
                        <h3>{event.title || event[0]}</h3>
                        {(event.firstimage || event[1]) &&
                            <img src={event.firstimage || event[1]} alt={event.title || event[0]} width="100%"/>}
                    </div>
                ))}
            </div>

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
}
export default SeoulEventList;
