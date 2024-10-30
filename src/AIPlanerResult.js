// AIPlanerResult.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import KakaoMapPlaner from './KakaoMapPlaner';

const AIPlanerResult = () => {
    const location = useLocation();
    const { result, region, category, duration } = location.state;
    const [selectedEvent, setSelectedEvent] = useState(null);

    // 데이터 그룹화
    const locations = Object.keys(result.dayPlans).reduce((acc, day) => {
        acc[day] = result.dayPlans[day].map((event, index) => ({
            ...event,
            index: index + 1,
        }));
        return acc;
    }, {});

    const handleEventClick = (event) => {
        setSelectedEvent(event);
    };

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <h2 style={styles.title}>
                    {region} 지역의 {category} 카테고리로 {duration} 동안의 추천 여행 계획
                </h2>
                <div style={styles.planSection}>
                    {Object.keys(result.dayPlans).map((day, dayIndex) => (
                        <div key={dayIndex} style={styles.daySection}>
                            <h3 style={styles.dayTitle}>{day}</h3>
                            <ul style={styles.eventList}>
                                {result.dayPlans[day].map((event, index) => (
                                    <li
                                        key={index}
                                        style={styles.eventCard}
                                        onClick={() => handleEventClick(event)}
                                    >
                                        <span style={styles.eventNumber}>{index + 1}</span>
                                        <img
                                            src={event.image !== "이미지 없음" ? event.image : "/placeholder.jpg"}
                                            alt={event.title}
                                            style={styles.eventImage}
                                        />
                                        <div style={styles.eventContent}>
                                            <h4 style={styles.eventTitle}>{event.title}</h4>
                                            <p style={styles.eventAddress}>주소: {event.addr1}</p>
                                            <p style={styles.eventTime}>
                                                {event.time ? `${event.time}: ` : ""}{event.recommendation}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div style={styles.aiMessageSection}>
                    <h3 style={styles.aiMessageTitle}>AI 추천 메시지</h3>
                    <div style={styles.aiMessageContent}>
                        {result.aiResponse && (
                            <div style={{whiteSpace: 'pre-line'}}>
                                {result.aiResponse}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div style={styles.mapContainer}>
                <KakaoMapPlaner locations={locations} selectedEvent={selectedEvent}/>
            </div>
            {
                selectedEvent && (
                    <div style={styles.detailContainer}>
                        <h2 style={styles.detailTitle}>{selectedEvent.title}</h2>
                        <img
                            src={selectedEvent.image !== "이미지 없음" ? selectedEvent.image : "/placeholder.jpg"}
                            alt={selectedEvent.title}
                            style={styles.detailImage}
                        />
                        <p style={styles.detailAddress}>주소: {selectedEvent.addr1}</p>
                        <p style={styles.detailDescription}>{selectedEvent.recommendation}</p>
                    </div>
                )
            }
        </div>
    );
};

const styles = {
    container: { display: 'flex', height: '100vh', overflow: 'hidden' },
    sidebar: { width: '400px', padding: '20px', overflowY: 'auto', backgroundColor: '#f5f5f5' },
    title: { textAlign: 'center', fontSize: '24px', marginBottom: '20px', color: '#333' },
    planSection: { marginBottom: '20px' }, // aiMessageSection이 planSection 아래에 위치하도록 여백 조정
    daySection: { marginBottom: '10px' },
    dayTitle: { fontSize: '20px', color: '#555', marginBottom: '5px' },
    eventList: { listStyleType: 'none', padding: 0 },
    eventCard: { display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' },
    eventNumber: { fontSize: '18px', fontWeight: 'bold', color: '#333', marginRight: '10px' },
    eventImage: { width: '80px', height: '60px', borderRadius: '5px', marginRight: '10px', objectFit: 'cover' },
    eventContent: { flex: 1 },
    eventTitle: { fontSize: '16px', margin: '0 0 5px', color: '#333' },
    eventAddress: { fontSize: '14px', color: '#777' },
    eventTime: { fontSize: '14px', color: '#333', marginTop: '5px' },
    aiMessageSection: { padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginTop: '10px' }, // sidebar 내에 위치
    aiMessageTitle: { fontSize: '18px', marginBottom: '10px', color: '#555' },
    aiMessageContent: { fontSize: '16px', color: '#333' },
    mapContainer: { flex: 1, height: '100%', position: 'relative' },

    // 상세 정보 패널이 지도의 왼쪽에 붙도록 조정
    detailContainer: {
        width: '400px', // sidebar와 동일한 너비
        padding: '20px',
        backgroundColor: '#fff',
        borderRight: '1px solid #ddd',
        overflowY: 'auto',
        position: 'absolute',
        top: 0,
        left: '400px', // 사이드바 너비와 일치하도록 설정
        height: '100%',
        zIndex: 1000, // 다른 요소 위로 오게 설정
    },
    detailTitle: { fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' },
    detailImage: { width: '100%', height: '200px', borderRadius: '8px', marginBottom: '10px', objectFit: 'cover' },
    detailAddress: { fontSize: '16px', color: '#555', marginBottom: '10px' },
    detailDescription: { fontSize: '14px', color: '#333' },
};

export default AIPlanerResult;
