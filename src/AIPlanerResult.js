import React from 'react';
import { useLocation } from 'react-router-dom';

const AIPlanerResult = () => {
    const location = useLocation();
    const { result, region, category, duration } = location.state;

    return (
        <div style={styles.container}>
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
                                    <img
                                        src={event.image !== "이미지 없음" ? event.image : "/placeholder.jpg"}
                                        alt={event.title}
                                        style={styles.eventImage}
                                    />
                                    <div style={styles.eventContent}>
                                        <h4 style={styles.eventTitle}>{event.title}</h4>
                                        <p style={styles.eventAddress}>주소: {event.addr1}</p>
                                        <p style={styles.eventTime}>
                                            {event.time === "오전" ? "오전: " : "오후: "}
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
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        lineHeight: '1.6',
    },
    title: {
        textAlign: 'center',
        fontSize: '24px',
        marginBottom: '20px',
        color: '#333',
    },
    planSection: {
        marginTop: '30px',
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
        marginBottom: '15px',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    eventImage: {
        width: '120px',
        height: '80px',
        borderRadius: '5px',
        marginRight: '15px',
        objectFit: 'cover',
    },
    eventContent: {
        flex: 1,
    },
    eventTitle: {
        fontSize: '18px',
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
};

export default AIPlanerResult;
