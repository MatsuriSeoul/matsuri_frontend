/*
* 관광지 상세페이지
*  */

import React, { useEffect, useState } from 'react';
import {Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import LikeButton from "./LikeButton";
import KakaoMap from "./KakaoMap";
import CommentEventList from './CommentEventList';
import ReviewComponent from "./ReviewComponent";
import { useAuth } from './AuthContext';

const TouristAttractionDetail = () => {
    const { contentid, contenttypeid } = useParams();
    const [detail, setDetail] = useState(null);
    const [intro, setIntro] = useState(null);
    const { auth } = useAuth();
    const [thumnail, setThumnail] = useState(null);
    const [images, setImages] = useState([]);
    const [similarEvents, setSimilarEvents] = useState([]);  // 유사한 여행지 데이터 상태
    const location = useLocation();

    // URL에서 category 추출
    const category = location.pathname.split('/')[1];

    // 클릭 로그 저장 로직 추가
    const logClick = async (contentId, contentTypeId) => {
        if (!auth || !auth.token) {
            console.error('로그인되지 않았습니다.');
            return;
        }

        try {
            const clickData = {
                contentid: contentId,
                category: contentTypeId,
            };

            // 클릭 로그를 서버에 저장하는 API 호출
            const response = await axios.post('http://localhost:8080/api/clicks/log', clickData, {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('로그 저장 성공:', response.data);
        } catch (error) {
            console.error('로그 저장 중 오류:', error);
        }
    };

    useEffect(() => {

        // 페이지에 접근할 때 클릭 로그를 저장
        logClick(contentid, contenttypeid);  // 로그 저장 로직 실행

        // 관광지 상세 정보 API 불러오기 (로컬 DB에서)
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/${category}/${contentid}/detail`);
                setDetail(response.data);
            } catch (error) {
                console.error('상세 정보 불러오기 실패', error);
            }
        };

        // 소개 정보 API 불러오기 (외부 API에서)
        const fetchIntro = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/tourist-attractions/${contentid}/${contenttypeid}/intro`);
                setIntro(response.data);
            } catch (error) {
                console.error('소개 정보 불러오기 실패', error);
            }
        };

        // 첫 번째 이미지를 가져오기 위한 fetchFirstImage 호출
        const fetchThumNail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/tourist-attractions/firstimage/${contentid}`);
                console.log(thumnail);
                setThumnail(response.data);
            } catch (error) {
                console.error('이미지 못 불러옴', error);
            }
        };


        // 이미지 정보 조회 API 호출하여 이미지 목록 가져오기
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/tourist-attractions/${contentid}/images`);
                setImages(response.data);
            } catch (error) {
                console.error('이미지 정보 불러오기 실패', error);
            }
        };

        // 유사한 여행지 정보 가져오기
        const fetchSimilarEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/tourist-attractions/${contenttypeid}/similar-events`);
                setSimilarEvents(response.data.slice(0, 4));  // 최대 4개의 유사한 이벤트만 가져옴
            } catch (error) {
                console.error('유사한 여행지 불러오기 실패', error);
            }
        };

        fetchDetail();
        fetchIntro();
        fetchThumNail();
        fetchImages();
        fetchSimilarEvents()
    }, [category, contentid, contenttypeid]);

    if (!detail || !intro) return <div>Loading...</div>;

    return (
        <div>
            <h1>{detail.title}</h1>


            {/*{firstImage && (*/}
            {/*    <img src={firstImage} alt={detail.title} width="300" />*/}
            {/*)}*/}
            <img src={thumnail} alt={detail.title}/>

            <h3>지도</h3>
            {/* 지도 표시 부분 */}
            {detail.mapx && detail.mapy ? (
                <KakaoMap mapX={detail.mapx} mapY={detail.mapy} title={detail.title}/>
            ) : (
                <p>좌표 정보가 없습니다.</p>
            )}

            <LikeButton contentId={contentid} contentType="TouristAttractionDetail" />
            <p>{detail.overview}</p>

            <h2>추가 정보</h2>
            <p>전화: {intro.tel}</p>
            <p>홈페이지:
                {/* HTML 태그를 포함한 문자열을 렌더링 */}
                <span dangerouslySetInnerHTML={{__html: detail.homepage}}/>
            </p>
            <p>이용 시간: {intro.usetime}</p>
            <p>주차 정보: {intro.parking}</p>
            <p>수용 인원: {intro.accomcount}</p>
            <p>유모차 대여 정보: {intro.chkbabycarriage}</p>
            <p>신용카드 가능 여부: {intro.chkcreditcard}</p>
            <p>애완동물 동반 가능 여부: {intro.chkpet}</p>
            <p>체험 가능 연령: {intro.expagerange}</p>
            <p>체험 안내: {intro.expguide}</p>
            <p>세계문화유산 여부: {intro.heritage1}</p>
            <p>세계자연유산 여부: {intro.heritage2}</p>
            <p>세계기록유산 여부: {intro.heritage3}</p>
            <p>문의 및 안내: {intro.infocenter}</p>
            <p>개장일: {intro.opendate}</p>
            <p>쉬는 날: {intro.restdate}</p>
            <p>이용 시기: {intro.useseason}</p>
            <p>이용 시간: {intro.usetime}</p>

            {/* 이미지 정보 API 출력 */}
            <h2>이미지 갤러리</h2>
            <div>
                {images.map((image, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <p>원본 이미지:</p>
                        <img src={image.originimgurl} alt={`원본 이미지 ${index + 1}`} width="300" />
                        <p>썸네일 이미지:</p>
                        <img src={image.smallimageurl} alt={`썸네일 이미지 ${index + 1}`} width="150" />
                    </div>
                ))}
            </div>
            {/*네이버 블로그 리뷰 */}
            <ReviewComponent query={detail.title} />

            {/* 유사한 여행지 추천 */}
            <h2>‘{detail.title}’ 와(과) 유사한 여행지 추천 👍</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {similarEvents.map((event, index) => {
                    const contentId = event.contentid || event.contentId;  // contentId 가져오기
                    const contentTypeId = event.contenttypeid || event.contentTypeId;  // contentTypeId 가져오기

                    return (
                        <div key={index} style={{ flex: '0 0 20%' }}>
                            <Link to={`/tourist-attractions/${contentId}/${contentTypeId}/detail`}>
                                <img
                                    src={event.firstimage || event.firstImage || event.first_image || event[1]}
                                    alt={event.title || event[0]}
                                    width="100%"
                                />
                                <h3>{event.title || event[0]}</h3>
                            </Link>
                        </div>
                    );
                })}
            </div>
            {/* 댓글 기능 추가 */}

            <CommentEventList category={category} contentid={contentid} contenttypeid={contenttypeid} />
        </div>
    );
};

export default TouristAttractionDetail;
