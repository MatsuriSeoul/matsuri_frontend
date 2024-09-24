/*
* 진행중인 예정인 행사 페이지
* */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ScheduledEvents = () => {
    const [events, setEvents] = useState([]);
    const [activeRegion, setActiveRegion] = useState('경기도');
    const [isLoading, setIsLoading] = useState(false);
    const [showOngoing, setShowOngoing] = useState(true); // 진행 중인 행사를 기본으로 설정

    // API 호출 함수
    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`http://localhost:8080/api/events/scheduled`, {
                params: { region: activeRegion }
            });
            setEvents(response.data);
        } catch (error) {
            console.error('행사 데이터를 가져오는 중 오류 발생:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // 처음 렌더링되거나 지역이 변경될 때 데이터를 가져옴
    useEffect(() => {
        fetchEvents();
    }, [activeRegion]);

    // 진행 중인 행사 필터링
    const ongoingEvents = events.filter(event => {
        const today = moment();
        const startDate = activeRegion === '경기도' ? moment(event.beginDe) : moment(event.rcptbgndt, "YYYY-MM-DD HH:mm:ss.S");
        const endDate = activeRegion === '경기도' ? moment(event.endDe) : moment(event.rcptenddt, "YYYY-MM-DD HH:mm:ss.S");
        return today.isBetween(startDate, endDate, 'day', '[]');
    });

    // 진행 예정인 행사 필터링
    const upcomingEvents = events.filter(event => {
        const today = moment();
        const startDate = activeRegion === '경기도' ? moment(event.beginDe) : moment(event.rcptbgndt, "YYYY-MM-DD HH:mm:ss.S");
        return startDate.isAfter(today, 'day');
    });

    return (
        <div>
            <h1>{activeRegion} - {showOngoing ? '진행 중인 행사' : '진행 예정인 행사'}</h1>
            <div>
                <button onClick={() => setActiveRegion('경기도')}>경기도</button>
                <button onClick={() => setActiveRegion('서울특별시')}>서울특별시</button>
            </div>
            <div>
                <button onClick={() => setShowOngoing(true)}>진행 중인 행사</button>
                <button onClick={() => setShowOngoing(false)}>진행 예정인 행사</button>
            </div>
            <div>
                {isLoading ? (
                    <p>로딩 중...</p>
                ) : showOngoing ? (
                    ongoingEvents.length > 0 ? (
                        ongoingEvents.map((event, index) => (
                            <div key={index}>
                                <h3>
                                    {/* 제목을 클릭 시 상세 페이지로 이동 */}
                                    {activeRegion === '경기도' ? (
                                        <Link to={`/gyeonggi-events/${event.id}/detail`}>
                                            {event.title}
                                        </Link>
                                    ) : (
                                        <Link to={`/seoul-events/${event.svcid}/detail`}>
                                            {event.svcnm}
                                        </Link>
                                    )}
                                </h3>
                                {/* 이미지를 클릭 시 상세 페이지로 이동 */}
                                <Link to={activeRegion === '경기도' ? `/gyeonggi-events/${event.id}/detail` : `/seoul-events/${event.svcid}/detail`}>
                                    <img
                                        src={activeRegion === '경기도' ? event.imageUrl : event.imgurl}
                                        alt={activeRegion === '경기도' ? event.title : event.svcnm}
                                        style={{ width: '200px' }}
                                    />
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>진행 중인 행사가 없습니다.</p>
                    )
                ) : (
                    upcomingEvents.length > 0 ? (
                        upcomingEvents.map((event, index) => (
                            <div key={index}>
                                <h3>
                                    {/* 제목을 클릭 시 상세 페이지로 이동 */}
                                    {activeRegion === '경기도' ? (
                                        <Link to={`/gyeonggi-events/${event.id}/detail`}>
                                            {event.title}
                                        </Link>
                                    ) : (
                                        <Link to={`/seoul-events/${event.svcid}/detail`}>
                                            {event.svcnm}
                                        </Link>
                                    )}
                                </h3>
                                {/* 이미지를 클릭 시 상세 페이지로 이동 */}
                                <Link to={activeRegion === '경기도' ? `/gyeonggi-events/${event.id}/detail` : `/seoul-events/${event.svcid}/detail`}>
                                    <img
                                        src={activeRegion === '경기도' ? event.imageUrl : event.imgurl}
                                        alt={activeRegion === '경기도' ? event.title : event.svcnm}
                                        style={{ width: '200px' }}
                                    />
                                </Link>
                            </div>
                        ))
                    ) : (
                        <p>진행 예정인 행사가 없습니다.</p>
                    )
                )}
            </div>
        </div>
    );
};

export default ScheduledEvents;
