import React, { useEffect, useState } from 'react';
import {Link, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import LikeButton from "./LikeButton";
import KakaoMap from "./KakaoMap";
import CommentEventList from './CommentEventList';
import ReviewComponent from "./ReviewComponent";

const FoodEventDetail = () => {
    const { contentid, contenttypeid } = useParams();
    const [detail, setDetail] = useState(null);
    const [intro, setIntro] = useState(null);
    const [thumnail, setThumnail] = useState(null);
    const [images, setImages] = useState([]);
    const [similarEvents, setSimilarEvents] = useState([]);  // 유사한 여행지 데이터 상태

    const location = useLocation();

    // URL에서 category 추출
    const category = location.pathname.split('/')[1];

    useEffect(() => {
        // 음식 이벤트 상세 정보 API 호출
        const fetchDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/${category}/${contentid}/detail`);
                setDetail(response.data);
            } catch (error) {
                console.error('상세 정보 불러오기 실패', error);
            }
        };

        // 소개 정보 API 호출
        const fetchIntro = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/food-events/${contentid}/${contenttypeid}/intro`);
                setIntro(response.data);
            } catch (error) {
                console.error('소개 정보 불러오기 실패', error);
            }
        };

        // 첫 번째 이미지를 가져오기 위한 fetchFirstImage 호출
        const fetchThumNail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/food-events/firstimage/${contentid}`);
                console.log(thumnail);
                setThumnail(response.data);
            } catch (error) {
                console.error('이미지 못 불러옴', error);
            }
        }


        // 이미지 정보 가져오기
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/food-events/${contentid}/images`);
                setImages(response.data);
            } catch (error) {
                console.error('이미지 정보 불러오기 실패', error);
            }
        };

        // 유사한 여행지 정보 가져오기
        const fetchSimilarEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/food-events/${contenttypeid}/similar-events`);
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

            <img src={thumnail} alt={detail.title} />
            {/*{firstImage && (*/}
            {/*    <img src={firstImage} alt={detail.title} width="300" />*/}
            {/*)}*/}

            <h3>지도</h3>
            {/* 지도 표시 부분 */}
            {detail.mapx && detail.mapy ? (
                <KakaoMap mapX={detail.mapx} mapY={detail.mapy} title={detail.title}/>
            ) : (
                <p>좌표 정보가 없습니다.</p>
            )}

            <LikeButton contentId={contentid} contentType="FoodEventDetail" />
            <p>{detail.overview}</p>

            <h2>추가 정보</h2>
            <p>신용카드 가능 정보: {intro.chkcreditcardfood}</p>
            <p>할인 정보: {intro.discountinfofood}</p>
            <p>대표 메뉴: {intro.firstmenu}</p>
            <p>문의 및 안내: {intro.infocenterfood}</p>
            <p>어린이 놀이방 여부: {intro.kidsfacility}</p>
            <p>개업일: {intro.opendatefood}</p>
            <p>영업시간: {intro.opentimefood}</p>
            <p>포장 가능: {intro.packing}</p>
            <p>주차 시설: {intro.parkingfood}</p>
            <p>예약 안내: {intro.reservationfood}</p>
            <p>쉬는 날: {intro.restdatefood}</p>
            <p>규모: {intro.scalefood}</p>
            <p>좌석 수: {intro.seat}</p>
            <p>금연/흡연 여부: {intro.smoking}</p>
            <p>취급 메뉴: {intro.treatmenu}</p>
            <p>인허가 번호: {intro.lcnsno}</p>

            {/* 이미지 정보 출력 */}
            <h2>이미지 갤러리</h2>
            <div>
                {images && images.length > 0 ? (
                    images.map((image, index) => (
                        <div key={index} style={{ marginBottom: '20px' }}>
                            <p>원본 이미지:</p>
                            <img src={image.originimgurl} alt={`원본 이미지 ${index + 1}`} width="300" />
                            <p>썸네일 이미지:</p>
                            <img src={image.smallimageurl} alt={`썸네일 이미지 ${index + 1}`} width="150" />
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
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '20px'}}>
                {similarEvents.map((event, index) => {
                    const contentId = event.contentid || event.contentId;  // contentId 가져오기
                    const contentTypeId = event.contenttypeid || event.contentTypeId;  // contentTypeId 가져오기

                    return (
                        <div key={index} style={{flex: '0 0 20%'}}>
                            <Link to={`/food-events/${contentId}/${contentTypeId}/detail`}>
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

export default FoodEventDetail;
