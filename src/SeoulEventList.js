/*
* 지역 카테고리 서울 코드
* */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SeoulEventList = () => {
    const [seoulEvents, setSeoulEvents] = useState([]);
    const [shoppingEvents, setShoppingEvents] = useState([]);
    const [foodEvents, setFoodEvents] = useState([]);
    // 다른 카테고리 상태 추가 가능

    useEffect(() => {
        // 서버에서 서울 관련 데이터 가져오기
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
            } catch (error) {
                console.error('Error fetching Food events', error);
            }
        };

        // 모든 데이터 가져오기 함수 호출
        fetchSeoulEvents();
        fetchShoppingEvents();
        fetchFoodEvents();
    }, []);

    return (
        <div>
            <h1>서울 지역 행사</h1>

            {/* 서울 행사 */}
            <h2>서울 행사</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {seoulEvents.map((event, index) => (
                    <div key={index} style={{ flex: '0 0 20%' }}>
                        <h3>{event.title || event[0]}</h3>
                        {(event.firstimage || event[1]) && <img src={event.firstimage || event[1]} alt={event.title || event[0]} width="100%" />}
                    </div>
                ))}
            </div>

            {/* 쇼핑 행사 */}
            <h2>쇼핑 행사</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {shoppingEvents.map((event, index) => (
                    <div key={index} style={{ flex: '0 0 20%' }}>
                        <h3>{event.title || event[0]}</h3>
                        {(event.firstimage || event[1]) && <img src={event.firstimage || event[1]} alt={event.title || event[0]} width="100%" />}
                    </div>
                ))}
            </div>

            {/* 음식 행사 */}
            <h2>음식 행사</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {foodEvents.map((event, index) => (
                    <div key={index} style={{ flex: '0 0 20%' }}>
                        <h3>{event.title || event[0]}</h3>
                        {(event.firstimage || event[1]) && <img src={event.firstimage || event[1]} alt={event.title || event[0]} width="100%" />}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SeoulEventList;
