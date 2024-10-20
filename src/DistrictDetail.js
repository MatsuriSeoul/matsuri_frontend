/*
 * 시군구 이벤트 상세페이지 (DistrictDetail.js)
 */
import React, { useEffect, useState } from 'react';
import {Link, useParams, useLocation} from 'react-router-dom';
import axios from 'axios';
import LikeButton from "./LikeButton";
import KakaoMap from "./KakaoMap";
import ReviewComponent from "./ReviewComponent";
import CommentEventList from './CommentEventList';

const DistrictDetail = () => {
    const { contentid, contenttypeid } = useParams();
    const [detail, setDetail] = useState(null);
    const [intro, setIntro] = useState(null);
    const [firstImage, setFirstImage] = useState(null);
    const [images, setImages] = useState([]);
    const [similarEvents, setSimilarEvents] = useState([]);  // 유사한 여행지 데이터 상태
    const location = useLocation();

    // URL에서 category 추출
    const category = location.pathname.split('/')[1];

    useEffect(() => {
        // 상세 정보 API 호출
        const fetchDetail = async () => {
            try {
                const apiKey = '13jkaARutXp/OwAHynRnYjP7BJuMVGIZx2Ki3dRMaDlcBqrfZHC9Zk97LCCuLyKfiR2cVhyWy59t96rPwyWioA=='; // API 키 설정
                const url = `http://apis.data.go.kr/B551011/KorService1/detailCommon1?serviceKey=${apiKey}&contentId=${contentid}&defaultYN=Y&addrinfoYN=Y&overviewYN=Y&mapinfoYN=Y&firstImageYN=Y&MobileOS=ETC&MobileApp=AppTest&_type=json`;

                const response = await axios.get(url);

                const item = response.data.response.body.items.item[0];  // 상세 정보의 첫 번째 항목
                setDetail(item);
                setFirstImage(item.firstimage);  // 이미지 설정
            } catch (error) {
                console.error('상세 정보 불러오기 실패', error);
            }
        };
        // 소개 정보 API 호출
        const fetchIntro = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/${category}/${contentid}/${contenttypeid}/intro`);
                setIntro(response.data);
            } catch (error) {
                console.error('소개 정보 불러오기 실패', error);
            }
        };

        // 첫 번째 이미지 가져오기
        const fetchFirstImage = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/district/${contentid}/images`);
                if (response.data.length > 0) {
                    setFirstImage(response.data[0].originimgurl); // 첫 번째 이미지를 설정
                }
            } catch (error) {
                console.error('이미지 정보 불러오기 실패', error);
            }
        };

        // 이미지 목록 가져오기
        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/district/${contentid}/images`);
                setImages(response.data);
            } catch (error) {
                console.error('이미지 목록 불러오기 실패', error);
            }
        };
        // 유사한 여행지 정보 가져오기
        const fetchSimilarEvents = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/district/${contenttypeid}/similar-events`);
                setSimilarEvents(response.data.slice(0, 4));  // 최대 4개의 유사한 이벤트만 가져옴
            } catch (error) {
                console.error('유사한 여행지 불러오기 실패', error);
            }
        };

        fetchDetail();
        fetchIntro();
        fetchFirstImage();
        fetchImages();
        fetchSimilarEvents();
    }, [category, contentid, contenttypeid]);

    if (!detail || !intro) return <div>Loading...</div>;

    // 카테고리별로 다른 정보 렌더링 함수
    const renderAdditionalInfo = () => {
        switch (contenttypeid) {
            case '12': // 관광지
                return (
                    <>
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
                    </>
                );
            case '14': // 문화시설
                return (
                    <>
                        <p>홈페이지:
                            {/* HTML 태그를 포함한 문자열을 렌더링 */}
                            <span dangerouslySetInnerHTML={{__html: detail.homepage}}/>
                        </p>
                        <p>이용 시간: {intro.usetimeculture}</p>
                        <p>주차 정보: {intro.parkingculture}</p>
                        <p>주차 요금: {intro.parkingfee}</p>
                        <p>수용 인원: {intro.accomcountculture}</p>
                        <p>유모차 대여 정보: {intro.chkbabycarriageculture}</p>
                        <p>신용카드 가능 여부: {intro.chkcreditcardculture}</p>
                        <p>애완동물 동반 가능 여부: {intro.chkpetculture}</p>
                        <p>할인 정보: {intro.discountinfo}</p>
                        <p>문의 및 안내: {intro.infocenterculture}</p>
                        <p>쉬는 날: {intro.restdateculture}</p>
                        <p>규모: {intro.scale}</p>
                        <p>관람 소요 시간: {intro.spendtime}</p>
                    </>
                );
            case '15': // 축제/공연/행사
                return (
                    <>
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
                    </>
                );
            case '25': // 여행코스
                return (
                    <>
                        <p>홈페이지:
                            {/* HTML 태그를 포함한 문자열을 렌더링 */}
                            <span dangerouslySetInnerHTML={{__html: detail.homepage}}/>
                        </p>
                        <p>코스 총 거리: {intro.distance}</p>
                        <p>문의 및 안내: {intro.infocentertourcourse}</p>
                        <p>코스 일정: {intro.schedule}</p>
                        <p>코스 총 소요 시간: {intro.taketime}</p>
                        <p>코스 테마: {intro.theme}</p>
                    </>
                );
            case '28': // 레포츠
                return (
                    <>
                        <p>홈페이지:
                            {/* HTML 태그를 포함한 문자열을 렌더링 */}
                            <span dangerouslySetInnerHTML={{__html: detail.homepage}}/>
                        </p>
                        <p>수용 인원: {intro.accomcountleports}</p>
                        <p>유모차 대여 정보: {intro.chkbabycarriageleports}</p>
                        <p>신용카드 가능 정보: {intro.chkcreditcardleports}</p>
                        <p>애완동물 동반 가능 정보: {intro.chkpetleports}</p>
                        <p>체험 가능 연령: {intro.expagerangeleports}</p>
                        <p>문의 및 안내: {intro.infocenterleports}</p>
                        <p>개장 기간: {intro.openperiod}</p>
                        <p>주차 요금: {intro.parkingfeeleports}</p>
                        <p>주차 시설: {intro.parkingleports}</p>
                        <p>예약 안내: {intro.reservation}</p>
                        <p>쉬는 날: {intro.restdateleports}</p>
                        <p>규모: {intro.scaleleports}</p>
                        <p>입장료: {intro.usefeeleports}</p>
                        <p>이용 시간: {intro.usetimeleports}</p>
                    </>
                );
            case '39': // 음식
                return (
                    <>
                        <p>홈페이지:
                            {/* HTML 태그를 포함한 문자열을 렌더링 */}
                            <span dangerouslySetInnerHTML={{__html: detail.homepage}}/>
                        </p>
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
                    </>
                );
            case '32': // 숙박
                return (
                    <>
                        <p>홈페이지:
                            {/* HTML 태그를 포함한 문자열을 렌더링 */}
                            <span dangerouslySetInnerHTML={{__html: detail.homepage}}/>
                        </p>
                        <p>수용 가능 인원: {intro.accomcountlodging}</p>
                        <p>입실 시간: {intro.checkintime}</p>
                        <p>퇴실 시간: {intro.checkouttime}</p>
                        <p>객실 내 취사 여부: {intro.chkcooking}</p>
                        <p>문의 및 안내: {intro.infocenterlodging}</p>
                        <p>주차 시설: {intro.parkinglodging}</p>
                        <p>객실 수: {intro.roomcount}</p>
                        <p>객실 유형: {intro.roomtype}</p>
                        <p>규모: {intro.scalelodging}</p>
                        <p>바비큐장 여부: {intro.barbecue}</p>
                        <p>뷰티 시설 여부: {intro.beauty}</p>
                        <p>식음료장 여부: {intro.beverage}</p>
                        <p>자전거 대여 여부: {intro.bicycle}</p>
                        <p>캠프파이어 여부: {intro.campfire}</p>
                        <p>휘트니스 센터 여부: {intro.fitness}</p>
                        <p>노래방 여부: {intro.karaoke}</p>
                    </>
                );
            case '38': // 쇼핑
                return (
                    <>
                        <p>홈페이지:
                            {/* HTML 태그를 포함한 문자열을 렌더링 */}
                            <span dangerouslySetInnerHTML={{__html: detail.homepage}}/>
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
                    </>
                );
            default:
                return <p>추가 정보를 불러올 수 없습니다.</p>;
        }
    };


    return (
        <div>
            <h1>{detail.title}</h1>
            {firstImage && (
                <img src={firstImage} alt={detail.title} width="300"/>
            )}

            <h3>지도</h3>
            {/* 지도 표시 부분 */}
            {detail.mapx && detail.mapy ? (
                <KakaoMap mapX={detail.mapx} mapY={detail.mapy}/>
            ) : (
                <p>좌표 정보가 없습니다.</p>
            )}

            <LikeButton contentId={contentid} contentType="DistrictEventDetail"/>
            <p>{detail.overview}</p>

            <h2>추가 정보</h2>
            {renderAdditionalInfo()}

            {/* 이미지 정보 갤러리 */}
            <h2>이미지 갤러리</h2>
            <div>
                {Array.isArray(images) && images.map((image, index) => (
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {similarEvents.map((event, index) => {
                    const contentId = event.contentid || event.contentId;  // contentId 가져오기
                    const contentTypeId = event.contenttypeid || event.contentTypeId;  // contentTypeId 가져오기

                    return (
                        <div key={index} style={{ flex: '0 0 20%' }}>
                            <Link to={`/district/${contentId}/${contentTypeId}/detail`}>
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

export default DistrictDetail;
