import Section2Left from './section2/section2Left';
import Section2Right from './section2/section2Right';
import "../../css/main/section2.css";
import React, {useContext, useEffect, useState} from "react";
import AuthContext from "../../AuthContext";
import {Link} from "react-router-dom";
import axios from "axios";

const tourEvents = [
    [],
    [],
    [],
    [],
    [],
    [],
    []
];

const Section2 = () =>{
    const { auth } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('인기추천'); // 기본 선택된 탭을 '경기도'로 설정

    const [activeIndex, setActiveIndex] = useState(0);

    // 탭 변경 시 호출되는 함수
    const handleTabChange = (tabName) => {
        setActiveTab(tabName); // 선택된 탭을 업데이트
    };

    //인기추천////////////////////

    const [popularEvents, setPopularEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopularEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/clicks/popular');
                setPopularEvents(response.data);
                setLoading(false);
            } catch (error) {

                setLoading(false);
            }
        };

        fetchPopularEvents();
    }, []);

    const renderEventLink = (event) => {
        const { contentid, contenttypeid, title, image } = event;
        const getLinkPath = () => {
            switch (contenttypeid) {
                case '12':
                    return `/tourist-attraction/${contentid}/${contenttypeid}/detail`;
                case '14':
                    return `/cultural-facilities/${contentid}/${contenttypeid}/detail`;
                case '15':
                    return `/events/${contentid}/${contenttypeid}/detail`;
                case '25':
                    return `/travel-courses/${contentid}/${contenttypeid}/detail`;
                case '28':
                    return `/leisure-sports/${contentid}/${contenttypeid}/detail`;
                case '32':
                    return `/local-events/${contentid}/${contenttypeid}/detail`;
                case '38':
                    return `/shopping-events/${contentid}/${contenttypeid}/detail`;
                case '39':
                    return `/food-events/${contentid}/${contenttypeid}/detail`;
                default:
                    return '#';
            }
        };
    };


    // 개인화된 추천 데이터/////////////

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
        <div className="main_section2">
            <div className='main-title'>
                <h2>추천행사</h2>
                <div className='wall'></div>
                <p>사용자정보 및 유저정보를 기반으로 행사를 추천해드려요.</p>
            </div>
            <div className="category-tab">
                <div
                    className={`left ${activeTab === '인기추천' ? 'active' : ''}`}
                    onClick={() => handleTabChange('인기추천')}>
                    <p>인기행사 추천</p>
                </div>
                <div className="wall"></div>
                <div className={`right ${activeTab === '사용자추천' ? 'active' : ''}`}
                     onClick={() => handleTabChange('사용자추천')}>
                    <p>사용자기반 추천</p>
                </div>
            </div>
            {activeTab === '인기추천' ? (
                <>
                    {popularEvents.length > 5 ? (
                        <div className='main-event'>
                            {popularEvents.slice(0, 6).map((event, index) => (
                                <Link
                                    to={`/eventDetailPage/events/${event.contentid}/${event.contenttypeid}`}
                                    className={`event event${index} ${activeIndex === index ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    style={{
                                        backgroundImage: `url(${event.image || '/img/default_img.jpeg'})`, // 이미지 URL을 url()로 감싸야 합니다.
                                        backgroundSize: 'cover', // 이미지를 박스에 맞게 조절
                                        backgroundPosition: 'center', // 이미지를 중앙에 위치
                                    }}
                                >
                                    <div className='txt'>
                                        <h1 className='event-title'>{event.title}</h1>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className='token-x'>인기행사를 추천하기에 사용자 정보가 부족합니다!</p>
                    )}

                </>
                ) : (
                <>
                {auth.token ? (
                <>
                    {personalizedRecommendations.length > 5 ? (
                        <div className='main-event'>
                            {personalizedRecommendations.slice(0, 6).map((event, index) => (
                                <Link
                                    to={`/eventDetailPage/events/${event.contentid}/${event.contenttypeid}`}
                                    className={`event event${index} ${activeIndex === index ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    style={{
                                        backgroundImage: `url(${event.image || '/img/default_img.jpeg'})`, // 이미지 URL을 url()로 감싸야 합니다.
                                        backgroundSize: 'cover', // 이미지를 박스에 맞게 조절
                                        backgroundPosition: 'center', // 이미지를 중앙에 위치
                                    }}
                                >
                                    <div className='txt'>
                                        <h1 className='event-title'>{event.title}</h1>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className='token-x'>인기행사를 추천하기에 사용자 정보가 부족합니다!</p>
                    )}
                </>
                ) : (
                <p className='token-x'>사용자기반 추천을 받기 위해서는 로그인을 필요합니다!</p>
                )}
        </>
    )
}

</div>
)
    ;
}
export default Section2;