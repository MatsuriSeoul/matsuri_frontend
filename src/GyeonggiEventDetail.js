/*
* 경기도 API 상세 페이지
* */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import LikeButton from "./LikeButton";
import KakaoMap from "./KakaoMap";
import ReviewComponent from "./ReviewComponent";

const GyeonggiEventDetail = () => {
    const { id } = useParams(); // URL에서 이벤트 id 가져오기
    const [eventDetail, setEventDetail] = useState(null);
    const [error, setError] = useState(null);
    const [coords, setCoords] = useState(null);

    // Kakao Map 스크립트 로드 함수
    const loadKakaoMapScript = () => {
        return new Promise((resolve) => {
            if (window.kakao && window.kakao.maps) {
                resolve(); // 이미 스크립트가 로드되었을 경우
                return;
            }

            const script = document.createElement("script");
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=385055cf5aeb63a6e5db2a0bbb867f09&libraries=services&autoload=false`;
            script.onload = () => {
                window.kakao.maps.load(() => {
                    resolve();
                });
            };
            document.head.appendChild(script);
        });
    };
    // 좌표 검색 기능
    useEffect(() => {
        const getCoords = async () => {
            if (!eventDetail || !eventDetail.hostInstNm) return;

            try {
                // Kakao Map 스크립트가 로드될 때까지 대기
                await loadKakaoMapScript();

                if (window.kakao && window.kakao.maps) {
                    const geocoder = new window.kakao.maps.services.Geocoder();
                    geocoder.addressSearch(eventDetail.hostInstNm, (result, status) => {
                        if (status === window.kakao.maps.services.Status.OK) {
                            setCoords({
                                mapX: result[0].x,
                                mapY: result[0].y,
                            });
                        } else {
                            console.error("좌표 변환 실패: 검색 결과가 없습니다.");
                        }
                    });
                }
            } catch (error) {
                console.error('좌표 변환 실패:', error);
            }
        };

        getCoords();
    }, [eventDetail]);

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

    // 유효성 체크 함수 추가
    const isValidField = (field) => field ? field : '정보 없음';

    return (
        <div>
            <h2>{isValidField(eventDetail.title)}</h2>
            {/* 좌표가 있을 때만 지도 표시 */}
            {coords && (
                <KakaoMap mapX={coords.mapX} mapY={coords.mapY} title={eventDetail.title} />
            )}
            <LikeButton contentId={id} contentType="GyeonggiEventDetail"/>
            <img src={eventDetail.imageUrl || '/images/default-image.png'} alt={isValidField(eventDetail.title)}
                 width="400" height="200"/>
            <p><strong>기관명:</strong> {isValidField(eventDetail.instNm)}</p>
            <p><strong>분류:</strong> {isValidField(eventDetail.categoryNm)}</p>
            <p><strong>시작일:</strong> {isValidField(eventDetail.beginDe)}</p>
            <p><strong>종료일:</strong> {isValidField(eventDetail.endDe)}</p>
            <p><strong>주소:</strong> {isValidField(eventDetail.addr)}</p>
            <p><strong>시간:</strong> {isValidField(eventDetail.eventTmInfo)}</p>
            <p><strong>비용:</strong> {isValidField(eventDetail.partcptExpnInfo)}</p>
            <p><strong>전화번호:</strong> {isValidField(eventDetail.telnoInfo)}</p>
            <p><strong>주최기관명:</strong> {isValidField(eventDetail.hostInstNm)}</p>
            <p><strong>홈페이지:</strong> <a href={eventDetail.hmpgUrl || '#'}>{isValidField(eventDetail.hmpgUrl)}</a></p>
            {/*네이버 블로그 리뷰 */}
            <ReviewComponent query={eventDetail.title} />
        </div>
    );
};

export default GyeonggiEventDetail;
