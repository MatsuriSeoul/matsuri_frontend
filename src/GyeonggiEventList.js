/*
* 지역 카테고리 경기 코드
* */
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GyeonggiEventList = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // 서버에서 경기도 행사 데이터 가져오기
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/gyeonggi-events/titles-and-images');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching Gyeonggi events', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <h1>경기도 행사</h1>
            <ul>
                {events
                    .filter(event => event[1])  // 이미지 URL이 있는 이벤트만 필터링
                    .map((event, index) => (
                        <li key={index}>
                            <h3>{event[0]}</h3>
                            <img src={event[1]} alt={event[0]} width="200" />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default GyeonggiEventList;
