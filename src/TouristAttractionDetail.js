import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TouristAttractionDetail = () => {
    const { contentid, contenttypeid, category } = useParams();
    const [detail, setDetail] = useState(null);
    const [intro, setIntro] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // 관광지 상세 정보 불러오기 (로컬 DB에서)
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/tourist-attractions/${contentid}/detail`);
                setDetail(response.data);
            } catch (error) {
                console.error('상세 정보 불러오기 실패', error);
            }
        };

        // 소개 정보 불러오기 (외부 API에서)
        const fetchIntro = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/tourist-attractions/${contentid}/${contenttypeid}/intro`);
                setIntro(response.data);
            } catch (error) {
                console.error('소개 정보 불러오기 실패', error);
            }
        };

        // firstimage 가져오기 위한
        const fetchEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/tourist-attractions/category/${category}`);
                console.log('Fetched Events:', response.data);
                setEvents(response.data);
            } catch (error) {
                console.error('이벤트 데이터 가져오기 실패', error);
            }
        };

        fetchDetail();
        fetchIntro();
        fetchEvents();
    }, [contentid, contenttypeid, category]);

    if (!detail || !intro) return <div>Loading...</div>;

    // 이벤트 데이터에서 첫 번째 이미지를 가져옴
    const firstImage = events.length > 0 ? events[0].firstimage : null;

    return (
        <div>
            <h1>{detail.title}</h1>
            {firstImage && (
                <img src={events.firstImage} alt={detail.title} width="300" />
            )}
            <p>{detail.overview}</p>

            <h2>추가 정보</h2>
            <p>전화: {intro.tel}</p>
            <p>홈페이지: <a href={intro.homepage}>{intro.homepage}</a></p>
            <p>이용 시간: {intro.usetime}</p>
            <p>주차 정보: {intro.parking}</p>
            {/* 필요한 다른 소개 정보들 추가 */}
        </div>
    );
};

export default TouristAttractionDetail;
