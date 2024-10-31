import React, {useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';
import KakaoMapPlaner from './KakaoMapPlaner';
import axios from "axios";

const AIPlanerResult = () => {
    const location = useLocation();
    const { result, region, category, duration } = location.state;
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [detail, setDetail] = useState(null);
    const [intro, setIntro] = useState(null);
    const [images, setImages] = useState([]);

    // contenttypeid와 카테고리명을 매핑하는 맵
    const categoryMap = {
        '12': '관광지',
        '14': '문화시설',
        '15': '행사',
        '25': '여행코스',
        '28': '레포츠',
        '32': '숙박',
        '38': '쇼핑',
        '39': '음식'
    };

    // 데이터 그룹화
    const locations = Object.keys(result.dayPlans).reduce((acc, day) => {
        acc[day] = result.dayPlans[day].map((event, index) => ({
            ...event,
            index: index + 1,
            category: categoryMap[event.contenttypeid] // contenttypeid를 기반으로 카테고리 추가
        }));
        return acc;
    }, {});

    // 이벤트 클릭 핸들러
    const handleEventClick = (event) => {
        if (!event || !event.contentid || !event.contenttypeid) {
            console.error("Invalid event data", event);
            return;
        }
        setSelectedEvent(event);
    };

    // selectedEvent가 변경될 때마다 상세 정보 API 호출
    useEffect(() => {
        if (selectedEvent) {
            const category = categoryMap[selectedEvent.contenttypeid] || 'default';
            fetchDetail(selectedEvent.contentid, category);
            fetchIntro(selectedEvent.contentid, selectedEvent.contenttypeid, category);
            fetchImages(selectedEvent.contentid);
        }
    }, [selectedEvent]);

    // 카테고리와 이벤트 ID에 따라 API 호출
    const getCategoryEndpoint = (category) => {
        switch (category) {
            case '관광지':
                return 'tourist-attractions';
            case '문화시설':
                return 'cultural-facilities';
            case '행사':
                return 'events';
            case '여행코스':
                return 'travel-courses';
            case '레포츠':
                return 'leisure-sports';
            case '숙박':
                return 'local-events';
            case '쇼핑':
                return 'shopping-events';
            case '음식':
                return 'food-events';
            default:
                console.warn("Unknown category:", category);
                return 'default-endpoint'; // 기본 엔드포인트 설정
        }
    };

    const fetchDetail = async (contentid, category) => {
        const endpoint = getCategoryEndpoint(category);
        try {
            const response = await axios.get(`http://localhost:8080/api/${endpoint}/${contentid}/detail`);
            setDetail(response.data);
        } catch (error) {
            console.error('상세 정보 불러오기 실패', error);
        }
    };

    const fetchIntro = async (contentid, contenttypeid, category) => {
        const endpoint = getCategoryEndpoint(category);
        try {
            const response = await axios.get(`http://localhost:8080/api/${endpoint}/${contentid}/${contenttypeid}/intro`);
            setIntro(response.data);
        } catch (error) {
            console.error('소개 정보 불러오기 실패', error);
        }
    };

    const fetchImages = async (contentid) => {
        if (!selectedEvent) return;
        const category = categoryMap[selectedEvent.contenttypeid] || 'default';
        const endpoint = getCategoryEndpoint(category);

        try {
            const response = await axios.get(`http://localhost:8080/api/${endpoint}/${contentid}/images`);
            setImages(response.data || []); // response.data가 null이거나 undefined인 경우 빈 배열로 설정
        } catch (error) {
            console.error('이미지 목록 불러오기 실패', error);
            setImages([]); // 오류 발생 시 빈 배열로 설정
        }
    };

    // 각 contenttypeid에 따라 추가 정보를 렌더링하는 함수
    const renderAdditionalInfo = () => {
        if (!selectedEvent || !detail || !intro) return null; // detail과 intro가 로드되었는지 확인


        switch (selectedEvent.contenttypeid) {
            case '12': // 관광지
                return (
                    <>
                        <p>홈페이지:
                            {/* HTML 태그를 포함한 문자열을 렌더링 */}
                            <span dangerouslySetInnerHTML={{__html: detail?.homepage || '정보 없음'}}/>
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
                            <span dangerouslySetInnerHTML={{__html: detail?.homepage || '정보 없음'}}/>
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
                            <span dangerouslySetInnerHTML={{__html: detail?.homepage || '정보 없음'}}/>
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
                            <span dangerouslySetInnerHTML={{__html: detail?.homepage || '정보 없음'}}/>
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
                            <span dangerouslySetInnerHTML={{__html: detail?.homepage || '정보 없음'}}/>
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
                            <span dangerouslySetInnerHTML={{__html: detail?.homepage || '정보 없음'}}/>
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
                            <span dangerouslySetInnerHTML={{__html: detail?.homepage || '정보 없음'}}/>
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
                            <span dangerouslySetInnerHTML={{__html: detail?.homepage || '정보 없음'}}/>
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
                return <p>추가 정보가 없습니다.</p>;
        }
    };


    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <h2 style={styles.title}>
                    {region} 지역의 {category} 카테고리로 {duration} 동안의 추천 여행 계획
                </h2>
                <div style={styles.planSection}>
                    {Object.keys(result.dayPlans).map((day, dayIndex) => (
                        <div key={dayIndex} style={styles.daySection}>
                            <h3 style={styles.dayTitle}>{day}</h3>
                            <ul style={styles.eventList}>
                                {result.dayPlans[day].map((event, index) => (
                                    <li
                                        key={index}
                                        style={styles.eventCard}
                                        onClick={() => handleEventClick(event)}
                                    >
                                        <span style={styles.eventNumber}>{index + 1}</span>
                                        <img
                                            src={event.image !== "이미지 없음" ? event.image : "/placeholder.jpg"}
                                            alt={event.title}
                                            style={styles.eventImage}
                                        />
                                        <div style={styles.eventContent}>
                                            <h4 style={styles.eventTitle}>{event.title}</h4>
                                            <p style={styles.eventAddress}>주소: {event.addr1}</p>
                                            <p style={styles.eventTime}>
                                                {event.time ? `${event.time}: ` : ""}{event.recommendation}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <div style={styles.aiMessageSection}>
                    <h3 style={styles.aiMessageTitle}>AI 추천 메시지</h3>
                    <div style={styles.aiMessageContent}>
                        {result.aiResponse && (
                            <div style={{whiteSpace: 'pre-line'}}>
                                {result.aiResponse}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {selectedEvent && detail && intro && ( // 모든 필드가 로드된 후에 렌더링
                <div style={styles.detailContainer}>
                    <h2 style={styles.detailTitle}>{selectedEvent.title}</h2>
                    <img
                        src={selectedEvent.image !== "이미지 없음" ? selectedEvent.image : "/placeholder.jpg"}
                        alt={selectedEvent.title}
                        style={styles.detailImage}
                    />
                    <p style={styles.detailAddress}>주소: {selectedEvent.addr1}</p>
                    <p>개요: {detail.overview || '정보 없음'}</p>
                    <p style={styles.detailDescription}>{selectedEvent.recommendation}</p>
                    <h3>추가 정보</h3>
                    {renderAdditionalInfo()}
                    {images.length > 0 ? (
                        <div>
                            <h2>이미지 갤러리</h2>
                            {images.map((image, index) => (
                                <div key={index} style={{ marginBottom: '20px' }}>
                                    <p>원본 이미지:</p>
                                    <img src={image.originimgurl} alt={`원본 이미지 ${index + 1}`} width="100"/>
                                    <p>썸네일 이미지:</p>
                                    <img src={image.smallimageurl} alt={`썸네일 이미지 ${index + 1}`} width="100"/>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>이미지가 없습니다.</p>
                    )}
                </div>
            )}
            <div style={styles.mapContainer}>
                <KakaoMapPlaner locations={locations} selectedEvent={selectedEvent}/>
            </div>
        </div>
    );
};

const styles = {
    container: {display: 'flex', height: '100vh', overflow: 'hidden'},
    sidebar: {width: '400px', padding: '20px', overflowY: 'auto', backgroundColor: '#f5f5f5'},
    title: {textAlign: 'center', fontSize: '24px', marginBottom: '20px', color: '#333'},
    planSection: {marginBottom: '20px' },
    daySection: { marginBottom: '10px' },
    dayTitle: { fontSize: '20px', color: '#555', marginBottom: '5px' },
    eventList: { listStyleType: 'none', padding: 0 },
    eventCard: { display: 'flex', alignItems: 'center', marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer' },
    eventNumber: { fontSize: '18px', fontWeight: 'bold', color: '#333', marginRight: '10px' },
    eventImage: { width: '80px', height: '60px', borderRadius: '5px', marginRight: '10px', objectFit: 'cover' },
    eventContent: { flex: 1 },
    eventTitle: { fontSize: '16px', margin: '0 0 5px', color: '#333' },
    eventAddress: { fontSize: '14px', color: '#777' },
    eventTime: { fontSize: '14px', color: '#333', marginTop: '5px' },
    aiMessageSection: { padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', marginTop: '10px' },
    aiMessageTitle: { fontSize: '18px', marginBottom: '10px', color: '#555' },
    aiMessageContent: { fontSize: '16px', color: '#333' },

    // 새로운 구조로 map과 detail을 감싸는 컨테이너 추가
    mapAndDetailContainer: { display: 'flex', flex: 1, height: '100vh', position: 'relative' },

    // detailContainer를 mapContainer 바로 옆에 배치
    detailContainer: {
        width: '400px',
        padding: '20px',
        backgroundColor: '#fff',
        borderLeft: '1px solid #ddd',
        overflowY: 'auto',
        height: '100vh', // 지도의 높이에 맞추기 위해 100vh로 설정
        zIndex: 1000,
    },

    mapContainer: { flex: 1, height: '100%', position: 'relative' },

    detailTitle: { fontSize: '22px', fontWeight: 'bold', marginBottom: '10px' },
    detailImage: { width: '100%', height: '200px', borderRadius: '8px', marginBottom: '10px', objectFit: 'cover' },
    detailAddress: { fontSize: '16px', color: '#555', marginBottom: '10px' },
    detailDescription: { fontSize: '14px', color: '#333' },
};

export default AIPlanerResult;