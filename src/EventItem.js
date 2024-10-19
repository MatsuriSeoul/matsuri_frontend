import React from 'react';
import axios from 'axios';

const EventItem = ({ event }) => {

    const handleClick = async () => {
        try {
            // 사용자가 클릭한 contentid와 category를 설정
            const clickData = {
                contentid: event.contentid,
                category: event.contenttypeid
            };

            // JWT 토큰 가져오기 (예시)
            const token = localStorage.getItem('token');

            // API 호출
            const response = await axios.post('http://localhost:8080/api/clicks/log', clickData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log(response.data);
        } catch (error) {
            console.error("클릭 로그 저장 중 오류:", error);
        }
    };

    return (
        <div onClick={handleClick}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
        </div>
    );
};

export default EventItem;
