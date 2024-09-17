import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const GyeonggiEventDetail = () => {
    const { id } = useParams(); // URL에서 이벤트 id 가져오기
    const [eventDetail, setEventDetail] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/events/gyeonggi-events/${id}`);
                console.log(response.data);  // 서버 응답을 콘솔에 출력
                setEventDetail(response.data);
            } catch (error) {
                setError('경기 이벤트 상세 정보 가져오기 실패: ' + error.message);
            }
        };

        if (id) {
            fetchEventDetail();
        }
    }, [id]);

    if (!eventDetail && !error) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>{eventDetail.title}</h2>
            <img src={eventDetail.imageUrl} alt={eventDetail.title} width="400" height="200" />
            <p><strong>기관명:</strong> {eventDetail.instNm}</p>
            <p><strong>분류:</strong> {eventDetail.categoryNm}</p>
            <p><strong>시작일:</strong> {eventDetail.beginDe}</p>
            <p><strong>종료일:</strong> {eventDetail.endDe}</p>
            <p><strong>주소:</strong> {eventDetail.addr}</p>
            <p><strong>시간:</strong> {eventDetail.eventTmInfo}</p>
            <p><strong>비용:</strong> {eventDetail.partcptExpnInfo}</p>
            <p><strong>전화번호:</strong> {eventDetail.telnoInfo}</p>
            <p><strong>주최기관명:</strong> {eventDetail.hostInstNm}</p>
            <p><strong>홈페이지:</strong> <a href={eventDetail.hmpgUrl}>{eventDetail.hmpgUrl}</a></p>
        </div>
    );
};

export default GyeonggiEventDetail;
