import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TouristAttractionDetail = () => {
    const { contentid, contenttypeid } = useParams();
    const [detail, setDetail] = useState(null);
    const [intro, setIntro] = useState(null);

    useEffect(() => {
        // 관광지 상세 정보 불러오기 (로컬 DB에서)
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/tourist-attractions/${contentid}/detail`);
                setDetail(response.data);
            } catch (error) {
                console.error('Error fetching detail', error);
            }
        };

        // 소개 정보 불러오기 (외부 API에서)
        const fetchIntro = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/tourist-attractions/${contentid}/${contenttypeid}/intro`);
                setIntro(response.data);
            } catch (error) {
                console.error('Error fetching intro', error);
            }
        };

        fetchDetail();
        fetchIntro();
    }, [contentid, contenttypeid]);

    if (!detail || !intro) return <div>Loading...</div>;

    return (
        <div>
            <h1>{detail.title}</h1>
            <img src={detail.firstimage} alt={detail.title} width="300" />
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
