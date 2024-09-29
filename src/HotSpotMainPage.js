/*
* 핫!스팟 추천 페이지
* */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


const HotSpotMainPage = () => {
    const [activeTab, setActiveTab] = useState('경기도'); // 기본 선택된 탭을 '경기도'로 설정
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
            console.error(`${activeTab} 지역 행사를 가져오는 중 오류 발생`, error); // 오류 발생 시 로그 출력
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

    return (
        <div className="main-container">
            <h1 className="main-title">서울/경기 핫!스팟</h1>
            <p>각 지역별 축제 데이터를 기반으로 추천 행사를 알려드려요.</p>
            <div className="tab-buttons">
                <button
                    className={`tab-button ${activeTab === '경기도' ? 'active' : ''}`} // 경기도 탭 버튼 활성화 여부
                    onClick={() => handleTabChange('경기도')} // 경기도 탭 클릭 시 handleTabChange 함수 호출
                >
                    경기 추천 행사
                </button>
                <button
                    className={`tab-button ${activeTab === '서울특별시' ? 'active' : ''}`} // 서울특별시 탭 버튼 활성화 여부
                    onClick={() => handleTabChange('서울특별시')} // 서울특별시 탭 클릭 시 handleTabChange 함수 호출
                >
                    서울 추천 행사
                </button>
            </div>
            <div className="events-container">
                {isLoading ? ( // 로딩 중일 때 표시
                    <p>데이터 로딩 중...</p>
                ) : (
                    events.length > 0 ? ( // 이벤트 데이터가 있을 경우
                        <div className="events-grid">
                            {events.map((event, index) => (
                                <div key={index} className="event-card">
                                    <Link
                                        to={`/${event.contenttypeid ? 'events' : ''}/${event.contentid}/${event.contenttypeid}/detail`}
                                    >
                                        <img
                                            src={event.firstimage || event.imgurl} // 이미지 URL
                                            alt={event.title || event.svcnm} // 이미지 대체 텍스트
                                            className="event-image"
                                        />
                                        <h3 className="event-title">{event.title || event.svcnm}</h3> {/* 행사명 */}
                                        <p className="event-address">{event.addr1}</p> {/* 행사 주소 */}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>현재 선택된 지역에 대한 행사 데이터가 없습니다.</p> // 이벤트 데이터가 없을 때 표시
                    )
                )}
            </div>
        </div>
    );
};

export default HotSpotMainPage;
