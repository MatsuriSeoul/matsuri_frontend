import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import AuthContext from "../../AuthContext";
import {Link} from "react-router-dom";

const Section1 = () =>{
    //section1_logic
    const [activeTab, setActiveTab] = useState('서울특별시'); // 기본 선택된 탭을 '경기도'로 설정
    const [events, setEvents] = useState([]); // 이벤트 데이터를 저장할 상태
    const [isLoading, setIsLoading] = useState(false); // 데이터 로딩 상태

    // 랜덤 이벤트를 가져오는 함수
    const fetchRandomEvents = async () => {
        try {
            setIsLoading(true); // 로딩 시작
            const response = await axios.get('http://localhost:8080/api/events/random-by-region', {
                params: { region: activeTab } // 현재 선택된 탭의 지역을 파라미터로 보냄
            });
            setEvents(response.data); // 가져온 데이터를 상태에 저장
        } catch (error) {

        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    // 5초마다 이벤트를 가져오는 로직
    useEffect(() => {
        fetchRandomEvents(); // 처음 마운트 시 이벤트를 한 번 가져옴
        const interval = setInterval(fetchRandomEvents, 5000); // 5초마다 fetchRandomEvents 함수 호출
        return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 interval 해제
    }, [activeTab]);

    // 탭 변경 시 호출되는 함수
    const handleTabChange = (tabName) => {
        setActiveTab(tabName); // 선택된 탭을 업데이트
    };

    const [likeToglled, setlLikeToggled] = useState(false);

    const handleLikeToggle = () => {
        setlLikeToggled(prevState => !prevState);
      };


    //공지사항///////////////////////
    const { auth } = useContext(AuthContext);

    const [notices, setNotices] = useState([]);

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await axios.get('/api/notice');
                setNotices(response.data);
            } catch (error) {

            }
        };
        fetchNotices();
    }, [auth.token]);

    return(
        <section className="main_sec1">
            <article className="recommend">
                <div className="category-title">
                    <h3 className="area">서울/경기 핫!스팟</h3>
                    <div className="wall"></div>
                    <p className="right">각 지역별 축제 데이터를 기반으로 추천 행사를 알려드려요.</p>
                </div>
                <div className="area-category">
                    <div
                        className={`left ${activeTab === '서울특별시' ? 'active' : ''}`}
                        onClick={() => handleTabChange('서울특별시')}>
                        <p>서울 추천 행사</p>
                    </div>
                    <div className="wall"></div>
                    <div className={`right ${activeTab === '경기도' ? 'active' : ''}`}
                         onClick={() => handleTabChange('경기도')}>
                        <p>경기도 추천 행사</p>
                    </div>
                </div>
                <h4 className="comment">당신에게 운영자가 추천하고 싶은 행사 입니다!</h4>
                <div className="area-info-box">
                    {isLoading ? ( // 로딩 중일 때 표시
                        <p>데이터 로딩 중...</p>
                    ) : (
                        events.length > 0 ? ( // 이벤트 데이터가 있을 경우
                            events.slice(0, 4).map((event, index) => (
                                <Link to={`/eventDetailPage/events/${event.contentid}/${event.contenttypeid}`} className='recommend'>
                                    <div
                                        key={index}
                                        className={`box box${index}`}
                                        style={{
                                            backgroundImage: `url(${event.firstimage || event.imgurl})`, // 이미지 URL을 url()로 감싸야 합니다.
                                            backgroundSize: 'cover', // 이미지를 박스에 맞게 조절
                                            backgroundPosition: 'center', // 이미지를 중앙에 위치
                                        }}
                                    >
                                        <div className="txt">
                                            <h4 className="title">{event.title || event.svcnm}</h4>
                                            <p className="address">{event.addr1}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <p className='event-x'>이벤트가 없습니다.</p> // 이벤트가 없을 때 표시할 내용
                        )
                    )}
                </div>
            </article>
            <div className="announcement">
                <div className="title">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M720-440v-80h160v80H720Zm48 280-128-96 48-64 128 96-48 64Zm-80-480-48-64 128-96 48 64-128 96ZM200-200v-160h-40q-33 0-56.5-23.5T80-440v-80q0-33 23.5-56.5T160-600h160l200-120v480L320-360h-40v160h-80Zm240-182v-196l-98 58H160v80h182l98 58Zm120 36v-268q27 24 43.5 58.5T620-480q0 41-16.5 75.5T560-346ZM300-480Z"/></svg>
                    </div>
                    <h3>공지사항</h3>
                </div>
                {notices.length > 0 ? (
                    <ul className="announcement-list">
                        {notices.slice(0, 5).map((notice, index) => (
                            <Link to={`/noticePage/${notice.id}`} className={`link${index}`}>
                                <li>
                                    <div className="icon">공지</div>
                                    <p className="announcement-info">{notice.title}</p>
                                </li>
                            </Link>
                        ))}
                    </ul>
                ) : (
                    <ul className="announcement-list">
                        <p className='notices-x'>공지사항이 없습니다.</p>
                    </ul>
                )}
            </div>
        </section>
    )
}
export default Section1;