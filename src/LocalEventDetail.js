/*
* 숙박 상세 정보 페이지
* */
import React, { useEffect, useState } from 'react';
import {Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import LikeButton from "./LikeButton";
import CommentEventList from './CommentEventList';
import CreateComment from './CreateComment';
import KakaoMap from "./KakaoMap";
import ReviewComponent from "./ReviewComponent";

const LocalEventDetail = () => {
    const { contentid, contenttypeid } = useParams();
    const [detail, setDetail] = useState(null);
    const [intro, setIntro] = useState(null);
    const [images, setImages] = useState([]);
    const [thumnail, setThumnail] = useState(null);
    const [similarEvents, setSimilarEvents] = useState([]);  // 유사한 여행지 데이터 상태
    const location = useLocation();

    // URL에서 category 추출
    const category = location.pathname.split('/')[1];

    useEffect(() => {
        // 숙박 상세 정보 API 불러오기 (로컬 DB에서)
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
                const response = await axios.get(`http://localhost:8080/api/local-events/${contentid}/${contenttypeid}/intro`);
                setIntro(response.data);
            } catch (error) {
                console.error('소개 정보 불러오기 실패', error);
            }
        };

        // 첫 번째 이미지를 가져오기 위한 fetchFirstImage 호출
        const fetchThumNail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/local-events/firstimage/${contentid}`);
                console.log(thumnail);
                setThumnail(response.data);
            } catch (error) {
                console.error('이미지 못 불러옴', error);
            }
        }

        // 이미지 정보 조회 API 호출하여 이미지 목록 가져오기
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/local-events/${contentid}/images`);
                setImages(response.data);
            } catch (error) {
                console.error('이미지 정보 불러오기 실패', error);
                setImages([]); // 실패 시 빈 배열로 설정
            }
        };

        // 유사한 여행지 정보 가져오기
        const fetchSimilarEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/local-events/${contenttypeid}/similar-events`);
                setSimilarEvents(response.data.slice(0, 4));  // 최대 4개의 유사한 이벤트만 가져옴
            } catch (error) {
                console.error('유사한 여행지 불러오기 실패', error);
            }
        };

        fetchDetail();
        fetchIntro();
        fetchImages();
        fetchThumNail()
        fetchSimilarEvents();
    }, [category, contentid, contenttypeid]);

    if (!detail || !intro) return <div>Loading...</div>;

    return (
        <div>
            <h1>{detail.title}</h1>

            <img src={thumnail} alt={detail.title} width="300" />

            <h3>지도</h3>
            {/* 지도 표시 부분 */}
            <KakaoMap mapX={detail.mapx} mapY={detail.mapy}/>

            <LikeButton contentId={contentid} contentType="LocalEventDetail"/>
            <p>{detail.overview}</p>

            <h2>추가 정보</h2>
            <p>홈페이지:
                <span dangerouslySetInnerHTML={{__html: detail.homepage}}/>
            </p>
            <p>수용 가능 인원: {intro.accomcountlodging}</p>
            <p>베니키아 여부: {intro.benikia}</p>
            <p>입실 시간: {intro.checkintime}</p>
            <p>퇴실 시간: {intro.checkouttime}</p>
            <p>객실 내 취사 여부: {intro.chkcooking}</p>
            <p>식음료장: {intro.foodplace}</p>
            <p>굿스테이 여부: {intro.goodstay}</p>
            <p>한옥 여부: {intro.hanok}</p>
            <p>문의 및 안내: {intro.infocenterlodging}</p>
            <p>주차 시설: {intro.parkinglodging}</p>
            <p>픽업 서비스: {intro.pickup}</p>
            <p>객실 수: {intro.roomcount}</p>
            <p>예약 안내: {intro.reservationlodging}</p>
            <p>예약 안내 홈페이지: {intro.reservationurl}</p>
            <p>객실 유형: {intro.roomtype}</p>
            <p>규모: {intro.scalelodging}</p>
            <p>부대시설 (기타): {intro.subfacility}</p>
            <p>바비큐장 여부: {intro.barbecue}</p>
            <p>뷰티 시설 여부: {intro.beauty}</p>
            <p>식음료장 여부: {intro.beverage}</p>
            <p>자전거 대여 여부: {intro.bicycle}</p>
            <p>캠프파이어 여부: {intro.campfire}</p>
            <p>휘트니스 센터 여부: {intro.fitness}</p>
            <p>노래방 여부: {intro.karaoke}</p>
            <p>공용 샤워실 여부: {intro.publicbath}</p>
            <p>공용 PC실 여부: {intro.publicpc}</p>
            <p>사우나 여부: {intro.sauna}</p>
            <p>세미나실 여부: {intro.seminar}</p>
            <p>스포츠 시설 여부: {intro.sports}</p>
            <p>환불 규정: {intro.refundregulation}</p>

            {/* 이미지 정보 API 출력 */}
            <h2>이미지 갤러리</h2>
            <div>
                {images && images.length > 0 ? (
                    images.map((image, index) => (
                        <div key={index} style={{marginBottom: '20px'}}>
                            <p>원본 이미지:</p>
                            <img src={image.originimgurl} alt={`원본 이미지 ${index + 1}`} width="300"/>
                            <p>썸네일 이미지:</p>
                            <img src={image.smallimageurl} alt={`썸네일 이미지 ${index + 1}`} width="150"/>
                        </div>
                    ))
                ) : (
                    <p>이미지가 없습니다.</p>
                )}
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
                            <Link to={`/local-events/${contentId}/${contentTypeId}/detail`}>
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

export default LocalEventDetail;
