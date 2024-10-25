import React from 'react';
import { useLocation } from 'react-router-dom';

const AIPlanerResult = () => {
    const location = useLocation();
    const { result, region, category, duration } = location.state;

    return (
        <div>
            <h2>{region} 지역의 {category} 카테고리로 {duration} 동안의 추천 여행 계획</h2>
            <div>
                <h3>추천 이벤트 목록</h3>
                <ul>
                    {result.events.map((event, index) => (
                        <li key={index}>
                            <h4>{event.title}</h4>
                            <img src={event.image || '이미지 없음'} alt={event.title} width="200" height="auto"/>
                            <p>주소: {event.addr1}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>AI 추천 메시지</h3>
                <p>{result.aiResponse}</p>
            </div>
        </div>
    );
};

export default AIPlanerResult;
