import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Article = () =>{
    const { areaId } = useParams();

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

    const linkAreaList = {
        서울: 'seoul-events',
        경기: 'gyeonggi-events'
    }

    const fullAreaName = changeAreaList[areaId] || areaId;
    const linkAreaName = linkAreaList[areaId] || 'events';


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

        fetchSeoulEvents();
        fetchGyeonggiEvents();
        fetchShoppingEvents();
        fetchFoodEvents();
        fetchLocalEvents();
        fetchCulturalFacilities();
        fetchTourEvents();
        fetchTouristAttractions();
        fetchTravelCourses();

    }, [areaId]);


    return(
        <article className="areaPage-article">
            <div className="recommend">
                <h1 className="area-name">{areaId}</h1>
                <div className="recommend-list">
                    {tourEvents.slice(0, 3).map((event, index) => (
                        <div key={index} className="recommend-box">
                            <h3 className="tag">행사</h3>
                            <h2 className="title">{event.title || event[0]}</h2>
                            <p className="info">{event.details?.overview}</p>
                            <Link
                                to={`/eventDetailPage/${linkAreaName}/${event.contentid}/${event.contenttypeid}`}>
                                <span className="detail-btn">자세히보기</span>
                            </Link>
                        </div>
                    ))}
                </div>
                
            </div>
            <div className="hotplace">
                <h1 className="main-title">우리 지역 핫플이 궁금해?</h1>
                <div className="title">
                    <h1><b>{areaId}</b> 추천 여행지</h1>
                    {/*<div className="more-btn">*/}
                    {/*<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M450-450H220v-60h230v-230h60v230h230v60H510v230h-60v-230Z"/></svg>*/}
                    {/*</div>*/}
                </div>
                <div className="list recommened_destinations">
                    {travelCourses.slice(0, 4).map((event, index) => (
                        <div key={index} className='box'>
                            {event.firstimage !== null ? (
                                <div className="img"
                                     style={{
                                         backgroundImage: `url(${event.firstimage || event[1] || '/img/default_img.jpeg'})`,
                                         backgroundSize: 'cover',
                                         backgroundPosition: 'center',
                                     }}
                                ></div>
                            ) : (
                                <img src='/img/default_img.jpeg' className='img default_img'></img>
                            )}

                            <h3 className="name">{event.title || event[0]}</h3>
                            <p className="address">{event.addr1}</p>
                        </div>
                    ))}
                </div>
                <div className="title">
                    <h1><b>{areaId}</b> 추천 맛집</h1>
                    {/*<div className="more-btn">*/}
                    {/*    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M450-450H220v-60h230v-230h60v230h230v60H510v230h-60v-230Z"/></svg>*/}
                    {/*</div>*/}
                </div>
                <div className="list recommened_food">
                    {foodEvents.slice(0, 4).map((event, index) => (
                        <div key={index} className='box'>
                            {event.firstimage !== null ? (
                                <div className="img"
                                     style={{
                                         backgroundImage: `url(${event.firstimage || event[1]})`,
                                         backgroundSize: 'cover',
                                         backgroundPosition: 'center',
                                     }}
                                ></div>
                            ) : (
                                <img src='/img/default_img.jpeg' className='img default_img'></img>
                            )}
                            <h3 className="name">{event.title || event[0]}</h3>
                            <p className="address">{event.addr1}</p>
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}

export default Article;