import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {Link, useParams} from "react-router-dom";

import Banner from "./hotPlacePage/banner";
import '../css/hotPlacePage/hotPlacePage.css'
import Header from "./layout/header";
import Sec1 from './hotPlacePage/sec1';
import Sec2 from './hotPlacePage/sec2';
import Sec3 from './hotPlacePage/sec3';
import Footer from './layout/footer'
import axios from "axios";
import {useAuth} from "../AuthContext";


const HotPlacePage = () =>{
    const { hareaId } = useParams();

    const areaCodeList = {
        서울: 1,
        인천: 2,
        울산: 7,
        경기: 31,
        대전: 3,
        강원: 32,
        부산: 6,
        전남: 38,
        전북: 37,
        충남: 34,
        충북: 33,
        경남: 36,
        경북: 35,
        제주: 39,

        세종: 8,
        대구: 4,
        광주: 5,
    };

    const changeAreaList = {
        서울: '서울특별시',
        인천: '인천광역시',
        울산: '울산광역시',
        경기: '경기도',
        강원: '강원특별자치도',
        부산: '부산광역시',
        대전: '대전광역시',
        전남: '전라남도',
        전북: '전북특별자치도',
        충남: '충청남도',
        충북: '충청북도',
        경남: '경상남도',
        경북: '경상북도',
        제주: '제주특별자치도',

        대구: '대구광역시',
        광주: '광주광역시',
        세종: '세종특별자치시',
    };

    const areaCode = areaCodeList[hareaId] || hareaId;

    const fullAreaName = changeAreaList[hareaId] || hareaId;

    const [sigunguOptions, setSigunguOptions] = useState([]);
    const [sigunguSelected, setSigunguSelected] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSigunguSelected(null);
    };
    const onChangeSigunguSelect = (option) => {
        setSigunguSelected(option);
    };

    const allSigunguOptions = {
        서울: [
            { value: null, label: '#전체' },
            { value: 1, label: '#강남구' },
            { value: 2, label: '#강동구' },
            { value: 3, label: '#강북구' },
            { value: 4, label: '#강서구' },
            { value: 5, label: '#관악구' },
            { value: 6, label: '#광진구' },
            { value: 7, label: '#구로구' },
            { value: 8, label: '#금천구' },
            { value: 9, label: '#노원구' },
            { value: 10, label: '#도봉구' },
            { value: 11, label: '#동대문구' },
            { value: 12, label: '#동작구' },
            { value: 13, label: '#마포구' },
            { value: 14, label: '#서대문구' },
            { value: 15, label: '#서초구' },
            { value: 16, label: '#성동구' },
            { value: 17, label: '#성북구' },
            { value: 18, label: '#송파구' },
            { value: 19, label: '#양천구' },
            { value: 20, label: '#영등포구' },
            { value: 21, label: '#용산구' },
            { value: 22, label: '#은평구' },
            { value: 23, label: '#종로구' },
            { value: 24, label: '#중구' },
            { value: 25, label: '#중랑구' },
        ],
        인천: [
            { value: null, label: '#전체' },
            { value: 1, label: '#강화군' },
            { value: 2, label: '#계양구' },
            { value: 3, label: '#미추홀구' },
            { value: 4, label: '#남동구' },
            { value: 5, label: '#동구' },
            { value: 6, label: '#부평구' },
            { value: 7, label: '#서구' },
            { value: 8, label: '#연수구' },
            { value: 9, label: '#옹진군' },
            { value: 10, label: '#중구' },
        ],
        대전: [
            { value: null, label: '#전체' },
            { value: 1, label: '#대덕구' },
            { value: 2, label: '#동구' },
            { value: 3, label: '#서구' },
            { value: 4, label: '#유성구' },
            { value: 5, label: '#중구' },
        ],
        대구: [
            { value: null, label: '#전체' },
            { value: 1, label: '#남구' },
            { value: 2, label: '#달서구' },
            { value: 3, label: '#달성군' },
            { value: 4, label: '#동구' },
            { value: 5, label: '#북구' },
            { value: 6, label: '#서구' },
            { value: 7, label: '#수성구' },
            { value: 8, label: '#중구' },
            { value: 9, label: '#군위군' },
        ],
        경기: [
            { value: null, label: '#전체' },
            { value: 1, label: '#가평군' },
            { value: 2, label: '#고양시' },
            { value: 3, label: '#과천시' },
            { value: 4, label: '#광명시' },
            { value: 5, label: '#광주시' },
            { value: 6, label: '#구리시' },
            { value: 7, label: '#군포시' },
            { value: 8, label: '#김포시' },
            { value: 9, label: '#남양주시' },
            { value: 10, label: '#동두천시' },
            { value: 11, label: '#부천시' },
            { value: 12, label: '#성남시' },
            { value: 13, label: '#수원시' },
            { value: 14, label: '#시흥시' },
            { value: 15, label: '#안산시' },
            { value: 16, label: '#안성시' },
            { value: 17, label: '#안양시' },
            { value: 18, label: '#양주시' },
            { value: 19, label: '#양평군' },
            { value: 20, label: '#여주시' },
            { value: 21, label: '#연천군' },
            { value: 22, label: '#오산시' },
            { value: 23, label: '#용인시' },
            { value: 24, label: '#의왕시' },
            { value: 25, label: '#의정부시' },
            { value: 26, label: '#이천시' },
            { value: 27, label: '#파주시' },
            { value: 28, label: '#평택시' },
            { value: 29, label: '#포천시' },
            { value: 30, label: '#하남시' },
            { value: 31, label: '#화성시' },
        ],
        부산: [
            { value: null, label: '#전체' },
            { value: 1, label: '#강서구' },
            { value: 2, label: '#금정구' },
            { value: 3, label: '#기장군' },
            { value: 4, label: '#남구' },
            { value: 5, label: '#동구' },
            { value: 6, label: '#동래구' },
            { value: 7, label: '#부산진구' },
            { value: 8, label: '#북구' },
            { value: 9, label: '#사상구' },
            { value: 10, label: '#사하구' },
            { value: 11, label: '#서구' },
            { value: 12, label: '#수영구' },
            { value: 13, label: '#연제구' },
            { value: 14, label: '#영도구' },
            { value: 15, label: '#중구' },
            { value: 16, label: '#해운대구' },
        ],
        울산: [
            { value: null, label: '#전체' },
            { value: 1, label: '#중구' },
            { value: 2, label: '#남구' },
            { value: 3, label: '#동구' },
            { value: 4, label: '#북구' },
            { value: 5, label: '#울주군' },
        ],
        광주: [
            { value: null, label: '#전체' },
            { value: 1, label: '#광산구' },
            { value: 2, label: '#남구' },
            { value: 3, label: '#동구' },
            { value: 4, label: '#북구' },
            { value: 5, label: '#서구' },
        ],
        강원: [
            { value: null, label: '#전체' },
            { value: 1, label: '#강릉시' },
            { value: 2, label: '#고성군' },
            { value: 3, label: '#동해시' },
            { value: 4, label: '#삼척시' },
            { value: 5, label: '#속초시' },
            { value: 6, label: '#양구군' },
            { value: 7, label: '#양양군' },
            { value: 8, label: '#영월군' },
            { value: 9, label: '#원주시' },
            { value: 10, label: '#인제군' },
            { value: 11, label: '#정선군' },
            { value: 12, label: '#철원군' },
            { value: 13, label: '#춘천시' },
            { value: 14, label: '#태백시' },
            { value: 15, label: '#평창군' },
            { value: 16, label: '#홍천군' },
            { value: 17, label: '#화천군' },
            { value: 18, label: '#횡성군' },
        ],
        충남: [
            { value: null, label: '#전체' },
            { value: 1, label: '#공주시' },
            { value: 2, label: '#금산군' },
            { value: 3, label: '#논산시' },
            { value: 4, label: '#당진시' },
            { value: 5, label: '#보령시' },
            { value: 6, label: '#부여군' },
            { value: 7, label: '#서산시' },
            { value: 8, label: '#서천군' },
            { value: 9, label: '#아산시' },
            { value: 10, label: '#예산군' },
            { value: 11, label: '#천안시' },
            { value: 12, label: '#청양군' },
            { value: 13, label: '#태안군' },
            { value: 14, label: '#홍성군' },
            { value: 15, label: '#계룡시' },
        ],
        충북: [
            { value: null, label: '#전체' },
            { value: 1, label: '#괴산군' },
            { value: 2, label: '#단양군' },
            { value: 3, label: '#보은군' },
            { value: 4, label: '#영동군' },
            { value: 5, label: '#옥천군' },
            { value: 6, label: '#음성군' },
            { value: 7, label: '#제천시' },
            { value: 8, label: '#진천군' },
            { value: 9, label: '#청원군' },
            { value: 10, label: '#청주시' },
            { value: 11, label: '#충주시' },
            { value: 12, label: '#증평군' },
        ],
        경북: [
            { value: null, label: '#전체' },
            { value: 1, label: '#경산시' },
            { value: 2, label: '#경주시' },
            { value: 3, label: '#고령군' },
            { value: 4, label: '#구미시' },
            { value: 6, label: '#김천시' },
            { value: 7, label: '#문경시' },
            { value: 8, label: '#봉화군' },
            { value: 9, label: '#상주시' },
            { value: 10, label: '#성주군' },
            { value: 11, label: '#안동군' },
            { value: 12, label: '#영덕군' },
            { value: 13, label: '#영양군' },
            { value: 14, label: '#영주시' },
            { value: 15, label: '#영천시' },
            { value: 16, label: '#예천군' },
            { value: 17, label: '#울릉군' },
            { value: 18, label: '#울진군' },
            { value: 19, label: '#의성군' },
            { value: 20, label: '#청도군' },
            { value: 21, label: '#청송군' },
            { value: 22, label: '#칠곡군' },
            { value: 23, label: '#포항시' },
        ],
        경남: [
            { value: null, label: '#전체' },
            { value: 1, label: '#거제시' },
            { value: 2, label: '#거창군' },
            { value: 3, label: '#고성군' },
            { value: 4, label: '#김해시' },
            { value: 5, label: '#남해군' },
            { value: 6, label: '#마산시' },
            { value: 7, label: '#밀양시' },
            { value: 8, label: '#사천시' },
            { value: 9, label: '#산청군' },
            { value: 10, label: '#양산시' },
            { value: 11, label: '#의령군' },
            { value: 12, label: '#진주시' },
            { value: 13, label: '#진해시' },
            { value: 14, label: '#창녕군' },
            { value: 15, label: '#창원시' },
            { value: 16, label: '#통영시' },
            { value: 17, label: '#하동군' },
            { value: 18, label: '#함안군' },
            { value: 19, label: '#함양군' },
            { value: 20, label: '#합천군' },
        ],
        전북: [
            { value: null, label: '#전체' },
            { value: 1, label: '#고창군' },
            { value: 2, label: '#군산시' },
            { value: 3, label: '#김제시' },
            { value: 4, label: '#남원시' },
            { value: 5, label: '#무주군' },
            { value: 6, label: '#부안군' },
            { value: 7, label: '#순창군' },
            { value: 8, label: '#완주군' },
            { value: 9, label: '#익산시' },
            { value: 10, label: '#임실군' },
            { value: 11, label: '#장수군' },
            { value: 12, label: '#전주시' },
            { value: 13, label: '#정읍시' },
            { value: 14, label: '#진안군' },
        ],
        전남: [
            { value: null, label: '#전체' },
            { value: 1, label: '#강진군' },
            { value: 2, label: '#고흥군' },
            { value: 3, label: '#곡성군' },
            { value: 4, label: '#광양시' },
            { value: 5, label: '#구례군' },
            { value: 6, label: '#나주시' },
            { value: 7, label: '#담양군' },
            { value: 8, label: '#목포시' },
            { value: 9, label: '#무안군' },
            { value: 10, label: '#보성군' },
            { value: 11, label: '#순천시' },
            { value: 12, label: '#신안군' },
            { value: 13, label: '#여수시' },
            { value: 14, label: '#영광군' },
            { value: 15, label: '#영암군' },
            { value: 16, label: '#완도군' },
            { value: 17, label: '#장성군' },
            { value: 18, label: '#장흥군' },
            { value: 19, label: '#진도군' },
            { value: 20, label: '#함평군' },
            { value: 21, label: '#해남군' },
            { value: 22, label: '#화순군' },
        ],
        제주: [
            { value: null, label: '#전체' },
            { value: 1, label: '#남제주군' },
            { value: 2, label: '#북제주군' },
            { value: 3, label: '#서귀포시' },
            { value: 4, label: '#제주시' },
        ],
        세종: [
            { value: null, label: '#전체' },
            { value: 1, label: '#세종특별자치시' },
        ],

    };

    const [seoulEvents, setSeoulEvents] = useState([]);
    const [gyeonggiEvents, setGyeonggiEvents] = useState([]);
    const [shoppingEvents, setShoppingEvents] = useState([]);
    const [foodEvents, setFoodEvents] = useState([]);
    const [localEvents, setLocalEvents] = useState([]);
    const [culturalFacilities, setCulturalFacilities] = useState([]);
    const [tourEvents, setTourEvents] = useState([]);
    const [touristAttractions, setTouristAttractions] = useState([]);
    const [travelCourses, setTravelCourses] = useState([]);

    useEffect(() => {
        setSigunguSelected(null);
    },[hareaId]);


    useEffect(() => {
        // 서울 관련 데이터 가져오기
        const fetchSeoulEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/seoul-events/titles-and-images');
                setSeoulEvents(response.data);
            } catch (error) {

            }
        };
        // 경기도 관련 데이터 가져오기
        const fetchGyeonggiEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/gyeonggi-events/titles-and-images');
                setGyeonggiEvents(response.data);
            } catch (error) {

            }
        };

        // 쇼핑 이벤트 가져오기
        const fetchShoppingEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/shopping-events/by-region', {
                    params: { region: fullAreaName }
                });
                setShoppingEvents(response.data);

                // 추가된 코드: 쇼핑 이벤트 상세 정보 미리 가져오기
                response.data.forEach(event => {
                    axios.get(`http://localhost:8080/api/shopping-events/${event.contentid}/detail`);
                });
            } catch (error) {

            }
        };

        // 음식 이벤트 가져오기
        const fetchFoodEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/food-events/by-region', {
                    params: { region: fullAreaName }
                });
                setFoodEvents(response.data);

                // 추가된 코드: 음식 이벤트 상세 정보 미리 가져오기
                response.data.forEach(event => {
                    axios.get(`http://localhost:8080/api/food-events/${event.contentid}/detail`);
                });
            } catch (error) {

            }
        };

        // 숙박 이벤트 가져오기
        const fetchLocalEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/local-events/by-region', {
                    params: { region: fullAreaName }
                });
                setLocalEvents(response.data);

                // 추가된 코드: 숙박 이벤트 상세 정보 미리 가져오기
                response.data.forEach(event => {
                    axios.get(`http://localhost:8080/api/local-events/${event.contentid}/detail`);
                });
            } catch (error) {

            }
        };

        // 문화시설 이벤트 가져오기
        const fetchCulturalFacilities = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/cultural-facilities/by-region', {
                    params: { region: fullAreaName }
                });
                setCulturalFacilities(response.data);

                // 추가된 코드: 문화시설 상세 정보 미리 가져오기
                response.data.forEach(event => {
                    axios.get(`http://localhost:8080/api/cultural-facilities/${event.contentid}/detail`);
                });
            } catch (error) {

            }
        };

        // 축제/공연/행사 가져오기
        const fetchTourEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/events/by-region', {
                    params: { region: fullAreaName }
                });
                setTourEvents(response.data);

                // 추가된 코드: 축제/공연/행사 상세 정보 미리 가져오기
                const eventsWithDetails = await Promise.all(
                    response.data.map(async (event) => {
                        const detailResponse = await axios.get(`http://localhost:8080/api/events/${event.contentid}/detail`);
                        return {
                            ...event,
                            details: detailResponse.data // 상세 정보 추가
                        };
                    })
                );

                // 상태에 저장
                setTourEvents(eventsWithDetails);

            } catch (error) {

            }
        };

        // 관광지 가져오기
        const fetchTouristAttractions = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/tourist-attractions/by-region', {
                    params: { region: fullAreaName }
                });
                setTouristAttractions(response.data);

                // 추가된 코드: 관광지 상세 정보 미리 가져오기
                response.data.forEach(event => {
                    axios.get(`http://localhost:8080/api/tourist-attractions/${event.contentid}/detail`);
                });
            } catch (error) {

            }
        };

        // 여행 코스 가져오기
        const fetchTravelCourses = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/travel-courses/by-region', {
                    params: { region: fullAreaName }
                });
                setTravelCourses(response.data);

                // 추가된 코드: 여행 코스 상세 정보 미리 가져오기
                response.data.forEach(event => {
                    axios.get(`http://localhost:8080/api/travel-courses/${event.contentid}/detail`);
                });
            } catch (error) {

            }
        };

        // 시군구별 데이터를 가져오는 함수 추가
        const fetchEventsByDistrict = async (areaCode, sigunguCode) => {
            try {
                const response = await axios.get('http://localhost:8080/api/local/events', {
                    params: { areaCode, sigunguCode },
                });
                const events = response.data;

                // content_type_id에 따라 카테고리별로 분류
                const seoulEvents = [];
                const shoppingEvents = [];
                const foodEvents = [];
                const localEvents = [];
                const culturalFacilities = [];
                const tourEvents = [];
                const touristAttractions = [];
                const travelCourses = [];

                events.forEach(event => {
                    switch (event.contentTypeId) {
                        case '12':
                            touristAttractions.push(event);
                            break;
                        case '14':
                            culturalFacilities.push(event);
                            break;
                        case '15':
                            tourEvents.push(event);
                            break;
                        case '25':
                            travelCourses.push(event);
                            break;
                        case '32':
                            localEvents.push(event);
                            break;
                        case '38':
                            shoppingEvents.push(event);
                            break;
                        case '39':
                            foodEvents.push(event);
                            break;
                        default:
                            seoulEvents.push(event);
                            break;
                    }
                });

                // 상태 업데이트
                setSeoulEvents(seoulEvents);
                setShoppingEvents(shoppingEvents);
                setFoodEvents(foodEvents);
                setLocalEvents(localEvents);
                setCulturalFacilities(culturalFacilities);
                setTourEvents(tourEvents);
                setTouristAttractions(touristAttractions);
                setTravelCourses(travelCourses);
            } catch (error) {

            }
        };


        if (sigunguSelected === null || sigunguSelected.value === null) {
            // 사용자가 시군구를 선택하지 않은 경우, 기존의 전체 데이터를 가져옴
            fetchSeoulEvents();
            fetchGyeonggiEvents();
            fetchShoppingEvents();
            fetchFoodEvents();
            fetchLocalEvents();
            fetchCulturalFacilities();
            fetchTourEvents();
            fetchTouristAttractions();
            fetchTravelCourses();
        } else {
            // 사용자가 시군구를 선택한 경우, 해당 시군구의 데이터를 가져옴
            fetchEventsByDistrict(areaCode, sigunguSelected.value);

        }

        // hareaCode 값에 맞는 지역의 sigunguOptions 배열을 가져옵니다.
        if (allSigunguOptions[hareaId]) {
            setSigunguOptions(allSigunguOptions[hareaId]);
        } else {
            setSigunguOptions([]); // 해당하는 지역이 없으면 빈 배열
        }


    }, [hareaId, sigunguSelected]);


    // 개인화된 추천 데이터/////////////
    const { auth } = useAuth();  // 사용자 인증 정보 (토큰 포함)
    const [loading, setLoading] = useState(false);  // 로딩 상태
    const [personalizedRecommendations, setPersonalizedRecommendations] = useState([]);  // 개인화된 추천 데이터

    // 개인화된 추천 데이터를 불러오는 함수
    const fetchPersonalizedRecommendations = async () => {
        try {
            setLoading(true);  // 로딩 상태 시작
            const response = await axios.get(`http://localhost:8080/api/openai/personalized-recommendation/${auth.userId}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setPersonalizedRecommendations(response.data);

        } catch (error) {

        } finally {
            setLoading(false);  // 로딩 상태 종료
        }
    };

    // 처음 컴포넌트가 로드될 때 인기 행사 데이터 불러오기
    useEffect(() => {
        fetchPersonalizedRecommendations();  // 하나의 API 호출
    }, []); // 의존성 배열이 비어 있어 컴포넌트가 처음 렌더링될 때만 호출

    return(
        <section className="hotplacepage">
            <Banner></Banner>
            <div className="article">
                <div className="sec-container">
                    <Sec1 tourEvents={tourEvents}></Sec1>
                    <Sec2 foodEvents={foodEvents}></Sec2>
                    <Sec3 localEvents={localEvents}></Sec3>
                </div>
                <aside className='sidebar'>
                    <form className='hashtag-box' onSubmit={handleSubmit}>
                        <p>#{hareaId}</p>
                        <Select
                            onChange={onChangeSigunguSelect}
                            options={sigunguOptions}
                            value={sigunguSelected}
                            placeholder="#전체"
                        />
                    </form>
                    <div className='recommend-list'>
                        <h2 className='main-title'>사용자기반 추천</h2>
                        {personalizedRecommendations.slice(0, 8).map((event, index) =>(
                            <Link to={`/eventDetailPage/events/${event.contentid}/${event.contenttypeid}`} className='recommend'>
                                <div className='txt'>
                                    <h3 className='title'>{event.title}</h3>
                                    <p className='addr'>{event.aiRecommendation}</p>
                                </div>
                                <div className='img'
                                style={{
                                    backgroundImage: `url(${event.image || '/img/default_img.jpeg'})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}></div>
                            </Link>
                        ))}
                    </div>
                </aside>
            </div>

            <Footer></Footer>
        </section>
    )
}

export default HotPlacePage;