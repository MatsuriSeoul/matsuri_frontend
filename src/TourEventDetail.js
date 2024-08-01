import React, { useState } from 'react';
import axios from 'axios';

const TourEventDetail = () => {
    const [contentId, setContentId] = useState('');
    const [eventDetail, setEventDetail] = useState(null);
    const [error, setError] = useState(null);

    const fetchEventDetail = async () => {
        try {
            const response = await axios.get('/api/events/fetchDetail', {
                params: { contentid: contentId }
            });

            console.log('API Response:', response.data); // 응답 데이터 로그

            if (response.data) {
                setEventDetail(response.data);
            } else {
                console.log('이벤트 상세 정보를 찾을 수 없습니다.', response.data);
                setEventDetail(null);
            }
        } catch (error) {
            console.error('이벤트 상세 정보 가져오기 실패', error);
            setError('이벤트 상세 정보 가져오기 실패');
        }
    };

    const handleInputChange = (e) => {
        setContentId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchEventDetail();
    };

    return (
        <div>
            <h1>이벤트 상세 정보</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="contentId">Content ID:</label>
                <input
                    type="text"
                    id="contentId"
                    value={contentId}
                    onChange={handleInputChange}
                />
                <button type="submit">Fetch Event Detail</button>
            </form>

            {error && <div>{error}</div>}

            {eventDetail && (
                <div>
                    <h2>{eventDetail.title}</h2>
                    <p>{eventDetail.addr1}</p>
                    <p>{eventDetail.eventstartdate} - {eventDetail.eventenddate}</p>
                    {eventDetail.firstimage && <img src={eventDetail.firstimage} alt={eventDetail.title} />}
                </div>
            )}
        </div>
    );
};

export default TourEventDetail;