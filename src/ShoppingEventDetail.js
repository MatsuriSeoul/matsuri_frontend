/*
* 쇼핑 이벤트 상세페이지
* */
import React, { useEffect, useState } from 'react';
import {useParams, useLocation, Link} from 'react-router-dom';
import axios from 'axios';
import LikeButton from "./LikeButton";
import KakaoMap from "./KakaoMap";
import CommentEventList from './CommentEventList';
import ReviewComponent from "./ReviewComponent";
import { useAuth } from './AuthContext';


const ShoppingEventDetail = () => {
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

        // 쇼핑 상세 정보 API 불러오기 (로컬 DB에서)
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
                const response = await axios.get(`http://localhost:8080/api/shopping-events/${contentid}/${contenttypeid}/intro`);
                setIntro(response.data);
            } catch (error) {
                console.error('소개 정보 불러오기 실패', error);
            }
        };

        // 첫 번째 이미지를 가져오기 위한 fetchFirstImage 호출
        const fetchThumNail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/shopping-events/firstimage/${contentid}`);
                console.log(thumnail);
                setThumnail(response.data);
            } catch (error) {
                console.error('이미지 못 불러옴', error);
            }
        }
        // 이미지 정보 조회 API 호출하여 이미지 목록 가져오기
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/shopping-events/${contentid}/images`);
                setImages(response.data);
            } catch (error) {
                console.error('이미지 정보 불러오기 실패', error);
            }
        };
        // 유사한 여행지 정보 가져오기
        const fetchSimilarEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/shopping-events/${contenttypeid}/similar-events`);
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

            <img src={thumnail} alt={detail.title}/>
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

            <LikeButton contentId={contentid} contentType="ShoppingEventDetail" />
            <p>{detail.overview}</p>

            <h2>추가 정보</h2>
            <p>홈페이지:
                <span dangerouslySetInnerHTML={{ __html: detail.homepage }} />
            </p>
            <p>유모차 대여 정보: {intro.chkbabycarriageshopping}</p>
            <p>신용카드 가능 정보: {intro.chkcreditcardshopping}</p>
            <p>애완동물 동반 가능 정보: {intro.chkpetshopping}</p>
            <p>문화센터 바로가기: {intro.culturecenter}</p>
            <p>장서는 날: {intro.fairday}</p>
            <p>문의 및 안내: {intro.infocentershopping}</p>
            <p>개장일: {intro.opendateshopping}</p>
            <p>영업 시간: {intro.opentime}</p>
            <p>주차 시설: {intro.parkingshopping}</p>
            <p>쉬는 날: {intro.restdateshopping}</p>
            <p>화장실 설명: {intro.restroom}</p>
            <p>판매 품목: {intro.saleitem}</p>
            <p>판매 품목별 가격: {intro.saleitemcost}</p>
            <p>규모: {intro.scaleshopping}</p>
            <p>매장 안내: {intro.shopguide}</p>

            {/* 이미지 정보 API 출력 */}
            <h2>이미지 갤러리</h2>
            <div>
                {Array.isArray(images) && images.map((image, index) => (
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
                {similarEvents.map((event, index) => (
                    <div key={index} style={{ flex: '0 0 20%' }}>
                        <Link to={`/shopping-events/${event.contentid}/${event.contenttypeid}/detail`}>
                            <img
                                src={event.firstimage || event.firstImage || event.first_image || event[1]}
                                alt={event.title || event[0]}
                                width="100%"
                            />
                            <h3>{event.title || event[0]}</h3>
                        </Link>
                    </div>
                ))}
            </div>
            {/* 댓글 기능 추가 */}

            <CommentEventList category={category} contentid={contentid} contenttypeid={contenttypeid}/>
        </div>
    );
};

export default ShoppingEventDetail;
