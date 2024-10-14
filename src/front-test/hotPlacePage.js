import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {useParams} from "react-router-dom";

import Banner from "./hotPlacePage/banner";
import '../css/hotPlacePage/hotPlacePage.css'
import Header from "./layout/header";
import Sec1 from './hotPlacePage/sec1';
import Sec2 from './hotPlacePage/sec2';
import Sec3 from './hotPlacePage/sec3';
import Footer from './layout/footer'
import axios from "axios";

const RecommendList = Array.from({ length: 20 }, (_, i) => `Post ${i + 1}`);


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
        제주: '제주특별자치도'
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
        울산: [
            { value: null, label: '#전체' },
            { value: 1, label: '#중구' },
            { value: 2, label: '#남구' },
            { value: 3, label: '#동구' },
            { value: 4, label: '#북구' },
            { value: 5, label: '#울주군' },
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
        대전: [
            { value: null, label: '#전체' },
            { value: 1, label: '#대덕구' },
            { value: 2, label: '#동구' },
            { value: 3, label: '#서구' },
            { value: 4, label: '#유성구' },
            { value: 5, label: '#중구' },
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
        ]
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
                console.error('Error fetching Seoul events', error);
            }
        };
        // 경기도 관련 데이터 가져오기
        const fetchGyeonggiEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/gyeonggi-events/titles-and-images');
                setGyeonggiEvents(response.data);
            } catch (error) {
                console.error('경기도 행사 데이터를 가져오는 중 오류 발생', error);
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
                console.error('Error fetching Shopping events', error);
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
                console.error('Error fetching Food events', error);
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
                console.error('Error fetching Local events', error);
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
                console.error('Error fetching Cultural Facilities', error);
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
                console.error('Error fetching Tour events', error);
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
                console.error('Error fetching Tourist Attractions', error);
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
                console.error('Error fetching Travel Courses', error);
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
                console.error('Error fetching events by district', error);
            }
        };
        console.log(sigunguSelected);

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




    return(
        <section className="hotplacepage">
            <Header></Header>
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
                        <h2 className='main-title'>추천</h2>
                        {RecommendList.slice(0, 8).map((item, index) =>(
                            <div className='recommend'>
                                <div className='txt'>
                                    <h3 className='title'>에코랜드 테마파크</h3>
                                    <p className='addr'>제주특별자치도 제주시</p>
                                    <p className='info'>설악 워터피아에서 즐기는 세계스파여행</p>
                                </div>
                                <div className='img'></div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
            
            <Footer></Footer>
        </section>
    )
}

export default HotPlacePage;