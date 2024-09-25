/*
* 무료 유료 구분 행사 페이지
* */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FreePaidEvents = () => {
    const [activeRegion, setActiveRegion] = useState('경기도'); // 기본값은 '경기도'
    const [events, setEvents] = useState([]);
    const [isFree, setIsFree] = useState(true); // 기본값은 무료 행사
    const [isLoading, setIsLoading] = useState(false);

    // API를 호출하는 함수
    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/events/${isFree ? 'free' : 'paid'}`, {
                params: { region: activeRegion }
            });
            setEvents(response.data);
        } catch (error) {
            console.error('이벤트를 가져오는 중 오류 발생:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // 탭 변경 시 데이터를 다시 가져옴
    useEffect(() => {
        fetchEvents();
    }, [activeRegion, isFree]);

    return (
        <div>
            <h1>{activeRegion} - {isFree ? '무료' : '유료'} 행사</h1>
            <div>
                <button onClick={() => setActiveRegion('경기도')}>경기도</button>
                <button onClick={() => setActiveRegion('서울특별시')}>서울특별시</button>
            </div>
            <div>
                <button onClick={() => setIsFree(true)}>무료 행사</button>
                <button onClick={() => setIsFree(false)}>유료 행사</button>
            </div>
            <div>
                {isLoading ? (
                    <p>로딩 중...</p>
                ) : events.length > 0 ? (
                    events.map((event, index) => (
                        <div key={index}>
                            {/* 제목과 이미지를 클릭하면 상세 페이지로 이동 */}
                            <Link to={`/${activeRegion === '경기도' ? 'gyeonggi-events' : 'seoul-events'}/${activeRegion === '경기도' ? event.id : event.svcid}/detail`}>
                                <h3>{activeRegion === '경기도' ? event.title : event.svcnm}</h3>
                                <img
                                    src={activeRegion === '경기도' ? event.imageUrl : event.imgurl}
                                    alt={activeRegion === '경기도' ? event.title : event.svcnm}
                                    style={{width: '200px'}}
                                />
                            </Link>
                            <p>{activeRegion === '경기도' ? event.addr : event.placenm}</p>
                        </div>
                    ))
                ) : (
                    <p>이벤트가 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default FreePaidEvents;
