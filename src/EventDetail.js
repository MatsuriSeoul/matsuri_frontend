/*
* 행사 상세 페이지
* */
import React, { useEffect, useState } from 'react';
import {Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import KakaoMap from './KakaoMap';
import LikeButton from "./LikeButton";
import CommentEventList from './CommentEventList';
import ReviewComponent from "./ReviewComponent";
import { useAuth } from './AuthContext';


const EventDetail = () => {
    const { contentid, contenttypeid } = useParams();
    const [detail, setDetail] = useState(null);
    const { auth } = useAuth();
    const [intro, setIntro] = useState(null);
    const [images, setImages] = useState([]);
    const [similarEvents, setSimilarEvents] = useState([]);  // 유사한 여행지 데이터 상태
    const location = useLocation();
    const [thumnail, setThumnail] = useState(null);

    // URL에서 category 추출
        const category = location.pathname.split('/')[1];

    // 클릭 로그 저장 로직 추가
    const logClick = async (contentId, contentTypeId) => {
        if (!auth || !auth.token) {
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


        } catch (error) {
            console.error('로그 저장 중 오류:', error);
        }
    };


    useEffect(() => {

        // 페이지에 접근할 때 클릭 로그를 저장
        logClick(contentid, contenttypeid);  // 로그 저장 로직 실행

        // 행사 상세 정보 API 불러오기 (로컬 DB에서)
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
                const response = await axios.get(`http://localhost:8080/api/events/${contentid}/${contenttypeid}/intro`);
                setIntro(response.data);
            } catch (error) {
                console.error('소개 정보 불러오기 실패', error);
            }
        };

        // 첫 번째 이미지를 가져오기 위한 fetchFirstImage 호출
        const fetchThumNail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/events/firstimage/${contentid}`);
                setThumnail(response.data);
            } catch (error) {
                console.error('이미지 못 불러옴', error);
            }
        }

        // 이미지 정보 조회 API 호출하여 이미지 목록 가져오기
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/events/${contentid}/images`);
                setImages(response.data);
            } catch (error) {
                console.error('이미지 정보 불러오기 실패', error);
            }
        };

        // 유사한 여행지 정보 가져오기
        const fetchSimilarEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/events/${contenttypeid}/similar-events`);
                setSimilarEvents(response.data.slice(0, 4));  // 최대 4개의 유사한 이벤트만 가져옴
            } catch (error) {
                console.error('유사한 여행지 불러오기 실패', error);
            }
        };

        fetchDetail();
        fetchIntro();
        fetchImages();
        fetchSimilarEvents()
        fetchThumNail()
    }, [category, contentid, contenttypeid]);

    if (!detail || !intro) return <div>Loading...</div>;

    return (
        <div>
            {/* 댓글 기능 추가 */}
            <CommentEventList category={category} contentid={contentid} contenttypeid={contenttypeid}/>
            <h1>{detail.title}</h1>

            <h3>지도</h3>
            {/* 지도 표시 부분 */}
            <KakaoMap mapX={detail.mapx} mapY={detail.mapy}/>

            <img src={thumnail} alt={detail.title}/>

            <LikeButton contentId={contentid} contentType="EventDetail"/>
            <p>{detail.overview}</p>

            <h2>추가 정보</h2>
            <p>홈페이지:
                {/* HTML 태그를 포함한 문자열을 렌더링 */}
                <span dangerouslySetInnerHTML={{__html: detail.homepage}}/>
            </p>
            <p>관람 가능 연령: {intro.agelimit}</p>
            <p>예매처: {intro.bookingplace}</p>
            <p>할인 정보: {intro.discountinfofestival}</p>
            <p>행사 종료일: {intro.eventenddate}</p>
            <p>행사 시작일: {intro.eventstartdate}</p>
            <p>행사 장소: {intro.eventplace}</p>
            <p>행사 프로그램: {intro.program}</p>
            <p>관람 소요 시간: {intro.spendtimefestival}</p>
            <p>이용 요금: {intro.usetimefestival}</p>
            <p>주최자 정보: {intro.sponsor1}</p>
            <p>주최자 연락처: {intro.sponsor1tel}</p>
            <p>주관사 정보: {intro.sponsor2}</p>
            <p>주관사 연락처: {intro.sponsor2tel}</p>


            {/* 이미지 정보 API 출력 */}
            <h2>이미지 갤러리</h2>
            <div>
                {images.map((image, index) => (
                    <div key={index} style={{marginBottom: '20px'}}>
                        <p>원본 이미지:</p>
                        <img src={image.originimgurl} alt={`원본 이미지 ${index + 1}`} width="300"/>
                        <p>썸네일 이미지:</p>
                        <img src={image.smallimageurl} alt={`썸네일 이미지 ${index + 1}`} width="150"/>
                    </div>
                ))}
            </div>
            {/*네이버 블로그 리뷰 */}
            <ReviewComponent query={detail.title} />

            {/* 유사한 여행지 추천 */}
            <h2>‘{detail.title}’ 와(과) 유사한 여행지 추천 👍</h2>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                {similarEvents.map((event, index) => {
                    const contentId = event.contentid || event.contentId;  // contentId 가져오기
                    const contentTypeId = event.contenttypeid || event.contentTypeId;  // contentTypeId 가져오기

                    return (
                        <div key={index} style={{flex: '0 0 20%'}}>
                            <Link to={`/events/${contentId}/${contentTypeId}/detail`}>
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
        </div>
    );
};

export default EventDetail;
