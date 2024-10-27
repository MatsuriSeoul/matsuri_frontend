import React from 'react';
import { useLocation } from 'react-router-dom';
import KakaoMapPlaner from './KakaoMapPlaner';

const AIPlanerResult = () => {
    const location = useLocation();
    const { result, region, category, duration } = location.state;

    // 각 일차의 모든 이벤트들을 하나의 배열로 모아 지도에 전달
    const locations = Object.keys(result.dayPlans).flatMap((day) =>
        result.dayPlans[day].map((event, index) => ({
            title: event.title,
            mapx: event.mapx,
            mapy: event.mapy,
            index: index + 1,
            time: event.time,  // 시간 정보 추가
        }))
    );

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
                                    <li key={index} style={styles.eventCard}>
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
                                                {event.time ? `${event.time}: ` : ""}  {/* 오전/오후 데이터에 맞게 */}
                                                {event.recommendation}
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
                            <div style={{ whiteSpace: 'pre-line' }}>
                                {result.aiResponse}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div style={styles.mapContainer}>
                <KakaoMapPlaner locations={locations} />
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
    },
    sidebar: {
        width: '400px',
        padding: '20px',
        overflowY: 'auto',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
        backgroundColor: '#f5f5f5',
    },
    title: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    planSection: {
        marginBottom: '30px',
    },
    daySection: {
        marginBottom: '20px',
    },
    dayTitle: {
        fontSize: '20px',
        color: '#555',
        marginBottom: '10px',
    },
    eventList: {
        listStyleType: 'none',
        padding: 0,
    },
    eventCard: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    eventNumber: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
        marginRight: '10px',
    },
    eventImage: {
        width: '80px',
        height: '60px',
        borderRadius: '5px',
        marginRight: '10px',
        objectFit: 'cover',
    },
    eventContent: {
        flex: 1,
    },
    eventTitle: {
        fontSize: '16px',
        margin: '0 0 5px',
        color: '#333',
    },
    eventAddress: {
        fontSize: '14px',
        color: '#777',
    },
    eventTime: {
        fontSize: '14px',
        color: '#333',
        marginTop: '5px',
    },
    aiMessageSection: {
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
    },
    aiMessageTitle: {
        fontSize: '18px',
        marginBottom: '10px',
        color: '#555',
    },
    aiMessageContent: {
        fontSize: '16px',
        color: '#333',
    },
    mapContainer: {
        flex: 1,
        height: '100%',
        position: 'relative',
    },
};

export default AIPlanerResult;
