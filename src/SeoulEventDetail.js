import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LikeButton from "./LikeButton";
import KakaoMap from './KakaoMap';
import ReviewComponent from "./ReviewComponent";
import CommentEventList from "./CommentEventList";

const SeoulEventDetail = () => {
    const { svcid } = useParams(); // URL에서 svcid 가져오기
    const [eventDetail, setEventDetail] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEventDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/events/seoul-events/${svcid}`);

                setEventDetail(response.data);
            } catch (error) {
                setError('서울 이벤트 상세 정보 가져오기 실패: ' + error.message);
            }
        };

        if (svcid) {
            fetchEventDetail();
        }
    }, [svcid]);

    // 불필요한 텍스트를 제거하는 함수
    const cleanDetailContent = (content) => {
        // 제거할 정확한 텍스트 패턴 정의 (정규 표현식)
        const unwantedTextsPattern = /1\. 공공시설 예약서비스 이용시 필수 준수사항[\s\S]*서울시에서 제공하는 다양하고 많은 혜택을 받으실 수 있습니다\./;

        // 정규 표현식을 사용하여 패턴과 일치하는 부분을 제거
        return content.replace(unwantedTextsPattern, '').trim();
    };

    // HTML 엔티티를 디코딩하는 함수
    const decodeHtmlEntities = (text) => {
        const txt = document.createElement("textarea");
        txt.innerHTML = text;
        return txt.value;
    };

    if (!eventDetail && !error) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>{eventDetail.svcnm}</h2>
            <h3>지도</h3>
            {eventDetail.x && eventDetail.y ? (
                <KakaoMap mapX={eventDetail.x} mapY={eventDetail.y} title={eventDetail.svcnm} />
            ) : (
                <p>좌표 정보가 없습니다.</p>
            )}

            <LikeButton contentId={svcid} contentType="SeoulEventDetail" />
            <img src={eventDetail.imgurl} alt={eventDetail.svcnm} width="400" height="200" />
            <p><strong>장소:</strong> {eventDetail.placenm}</p>
            <p><strong>대상:</strong> {eventDetail.usetgtinfo}</p>
            <p><strong>결제 방법:</strong> {eventDetail.payatnm}</p>
            <p><strong>시작일:</strong> {eventDetail.svcopnbgndt}</p>
            <p><strong>종료일:</strong> {eventDetail.svcopnenddt}</p>
            <p><strong>접수 시작일:</strong> {eventDetail.rcptbgndt}</p>
            <p><strong>접수 종료일:</strong> {eventDetail.rcptenddt}</p>
            <p><strong>지역:</strong> {eventDetail.areanm}</p>
            <p><strong>상세 내용:</strong> {decodeHtmlEntities(cleanDetailContent(eventDetail.dtlcont))}</p>
            <p><strong>전화번호:</strong> {eventDetail.telno}</p>
            <p><strong>이용 시간:</strong> {eventDetail.vMin} - {eventDetail.vMax}</p>

            {/*네이버 블로그 리뷰 */}
            <ReviewComponent query={eventDetail.svcnm} />

            <div>
                {/* 서울 이벤트 여행톡 */}
                <CommentEventList category="seoul-events" svcid={svcid} />
            </div>
        </div>
    );
};

export default SeoulEventDetail;
