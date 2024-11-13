import React, { useState } from 'react';
import Select from 'react-select';

import Header from '../layout/header';
import Footer from '../layout/footer';


import 'react-datepicker/dist/react-datepicker.css';
import '../../css/eventInfo/selectSearchPage.css'
import axios from "axios";
import {Link} from "react-router-dom";

const MainEvent = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
];

const SelectSearchPage = () =>{
    const [startDate, setStartDate] = useState(null); // 시작일 설정
    const [endDate, setEndDate] = useState(null); // 종료일 설정
    const [results, setResults] = useState([]); // 검색 결과 저장
    const [mainResults, setMainResults] = useState([]); // 메인 검색 결과 저장
    const [error, setError] = useState(null); // 에러 메시지 저장

    const [dateselected, setDateSelected] = useState({ value: '', label: '전체' });
    const [areaselected, setAreaSelected] = useState(null);
    const [categoryselected, setCategorySelected] = useState(null);

    const [visibleCount, setVisibleCount] = useState(18);

    const [activeIndex, setActiveIndex] = useState(0);

    const [firstLoad, setFirstLoad] = useState(null);

    const dateOptions = [
        { value: '', label: '전체' },
        { value: '1', label: '1월' },
        { value: '2', label: '2월' },
        { value: '3', label: '3월' },
        { value: '4', label: '4월' },
        { value: '5', label: '5월' },
        { value: '6', label: '6월' },
        { value: '7', label: '7월' },
        { value: '8', label: '8월' },
        { value: '9', label: '9월' },
        { value: '10', label: '10월' },
        { value: '11', label: '11월' },
        { value: '12', label: '12월' },
    ];
    const areaOptions = [
        { value: '서울', label: '서울' },
        { value: '인천', label: '인천' },
        { value: '대전', label: '대전' },
        // { value: '대구', label: '대구' },
        { value: '경기', label: '경기' },
        { value: '부산', label: '부산' },
        { value: '울산', label: '울산' },
        // { value: '광주', label: '광주' },
        { value: '강원', label: '강원' },
        { value: '충북', label: '충북' },
        { value: '충남', label: '충남' },
        { value: '경북', label: '경북' },
        { value: '경남', label: '경남' },
        { value: '전북', label: '전북' },
        { value: '전남', label: '전남' },
        { value: '제주', label: '제주' },
        // { value: '세종', label: '세종' },
    ];
    const regionMap = {
        서울: '서울특별시',
        경기: '경기도',
        인천: '인천광역시',
        대전: '대전광역시',
        부산: '부산광역시',
        전남: '전라남도',
        전북: '전라북도',
        울산: '울산광역시',
        충남: '충청남도',
        충북: '충청북도',
        경남: '경상남도',
        경북: '경상북도',
        대구: '대구광역시',
        제주: '제주특별자치도',
    };
    const categoryOptions = [
        { value: '축제/공연/행사', label: '축제/공연/행사' },
        { value: '숙박', label: '숙박' },
        { value: '쇼핑', label: '쇼핑' },
        { value: '여행코스', label: '여행코스' },
        { value: '음식', label: '음식' },
        { value: '관광지', label: '관광지' },
        { value: '레포츠', label: '레포츠' },
        { value: '문화시설', label: '문화시설' },
    ];

    // API 데이터 호출 함수 (경기, 서울 추가)
    const fetchAdditionalEvents = async (region, category, date) => {

        // 경기 이벤트 조회
        if (region === '경기' && (category === '축제/공연/행사' || category === '전시' || category === '교육' || category === '공연')) {
            try {
                const gyeonggiResponse = await axios.get('http://localhost:8080/api/events/gyeonggi-events', {
                    params: {
                        category: category  // 카테고리를 파라미터로 전달
                    }
                });
                console.log('gyeonggi-api');
                return gyeonggiResponse.data;
            } catch (error) {

            }
        }
        // 서울 이벤트 조회
        else if (region === '서울' && (category === '축제/공연/행사' || category === '전시/관람' || category === '산림여가' ||
            category === '문화행사' || category === '농장체험' || category === '교육체험' || category === '공원탐방')) {
            try {
                const seoulResponse = await axios.get('http://localhost:8080/api/events/seoul-events', {
                    params: {
                        category: category  // 카테고리를 파라미터로 전달
                    }
                });
                console.log('seoul-api');
                return seoulResponse.data;
            } catch (error) {

            }
        }
        return [];
    };

    // 검색 버튼 클릭 시 데이터 검색
    const handleSearch = async (region, category, date) => {
        try {
            // 기본 검색 API URL
            let apiUrl = `http://localhost:8080/api/events/search`;

            const fullRegionName = regionMap[region] || '';


            // 서울 또는 경기의 특정 카테고리면 해당 API로 리다이렉트
            const additionalEvents = await fetchAdditionalEvents(region, category, date);

            if (additionalEvents.length > 0) {
                setResults(additionalEvents);
                setVisibleCount(18);
                return; // 이미 데이터를 받았으므로 기본 API 호출은 생략
            }

            // 카테고리에 따라 동적으로 API URL 설정
            if (category === '음식') {
                apiUrl = `http://localhost:8080/api/food-events/by-region`;
            } else if (category === '숙박') {
                apiUrl = `http://localhost:8080/api/local-events/by-region`;
            } else if (category === '문화시설') {
                apiUrl = `http://localhost:8080/api/cultural-facilities/by-region`;
            } else if (category === '레포츠') {
                apiUrl = `http://localhost:8080/api/leisure-sports/by-region`;
            } else if (category === '쇼핑') {
                apiUrl = `http://localhost:8080/api/shopping-events/by-region`;
            } else if (category === '여행코스') {
                apiUrl = `http://localhost:8080/api/travel-courses/by-region`;
            } else if (category === '축제/공연/행사') {
                apiUrl = `http://localhost:8080/api/events/by-month-and-region`;
            } else if (category === '관광지') {
                apiUrl = `http://localhost:8080/api/tourist-attractions/by-region`;
            }

            // API 호출 및 데이터 설정
            const response = await axios.get(apiUrl, {
                params: {
                    month : date,
                    region: fullRegionName, // 매핑된 지역 이름 전달

                }
            });

            const mainresponse = await axios.get('http://localhost:8080/api/events/by-region', {
                params: {
                    region: fullRegionName, // 매핑된 지역 이름 전달
                }
            });
            setResults(response.data); // 결과 데이터 설정
            setMainResults(mainresponse.data);
            setVisibleCount(18);
            setFirstLoad(1);
        } catch (err) {
            setError(err.message || '잘못된 형식'); // 에러 처리
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!areaselected || !categoryselected) {
            alert("지역과 카테고리를 모두 선택해 주세요.");
            return;
        }

        handleSearch(areaselected.value, categoryselected.value, dateselected.value);

        // setDateSelected({ value: '', label: '전체' });
        // setAreaSelected(null);
        // setCategorySelected(null);
    };

    const onChangeDateSelect = (option) => {
        setDateSelected(option);
    };
    const onChangeAreaSelect = (option) => {
        setAreaSelected(option);
    };
    const onChangeCategorySelect = (option) => {
        setCategorySelected(option);
    };

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 18);
    };

    if (error) {
        return <div>{error}</div>;
    }
// eventenddate, eventstartdate
    return(
        <div className='ssp'>
            <div className='headerbar'></div>
            <section className='banner'>
                <h1 className='title'>어떤 행사를 원하시나요?</h1>
                <p className='sub-title'>전국 지역의 행사를 당신이 원하는 시기, 카테고리 별로 나누어 제공해드립니다. </p>
                <div className='underbar'></div>
            </section>
            <section className='article'>
                <form className='selectform' onSubmit={handleSubmit}>
                    <Select
                        onChange={onChangeDateSelect}
                        options={dateOptions}
                        value={dateselected}
                        placeholder="시기"
                    />
                    <Select
                        onChange={onChangeAreaSelect}
                        options={areaOptions}
                        value={areaselected}
                        placeholder="지역"
                    />
                    <Select
                        onChange={onChangeCategorySelect}
                        options={categoryOptions}
                        value={categoryselected}
                        placeholder="카테고리"
                    />
                    <button type='submit' className='submit-btn'>조회
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                             width="24px" fill="#e8eaed">
                            <path
                                d="M480-334.23 625.77-480 480-625.77 438.23-584l74 74H330v60h182.23l-74 74L480-334.23Zm.07 234.23q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm-.07-60q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                        </svg>
                    </button>
                </form>
                {firstLoad ? (
                    <>
                        <div className='main-event'>
                            {mainResults.slice(0, 3).map((event, index) => (
                                <Link
                                    to={`/eventDetailPage/events/${event.contentid}/${event.contenttypeid}`}
                                    className={`event event${event.id} ${activeIndex === index ? 'active' : ''}`}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    style={{
                                        backgroundImage: `url(${event.firstimage || event[1] || '/img/default_img.jpeg'})`, // 이미지 URL을 url()로 감싸야 합니다.
                                        backgroundSize: 'cover', // 이미지를 박스에 맞게 조절
                                        backgroundPosition: 'center', // 이미지를 중앙에 위치
                                    }}
                                >
                                    <div className='txt'>
                                        <h1 className='event-title'>{event.title}</h1>
                                        <div className='active-txt'>
                                            {event.eventstartdate && event.eventenddate && (
                                                <p className='date'>
                                                    {event.eventstartdate.slice(0, 4) + '.' +
                                                        event.eventstartdate.slice(4, 6) + '.' +
                                                        event.eventstartdate.slice(6)} ~
                                                    {event.eventenddate.slice(4, 6) + '.' +
                                                        event.eventenddate.slice(6)}
                                                </p>
                                            )}
                                            <button className='btn'></button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className='events-container'>
                            <div className='tabs'>
                                <p className='tab'>축제일순</p>
                            </div>
                            <div className='event-list'>
                                {results.slice(0, visibleCount).map((event) => (
                                    <Link to={`/eventDetailPage/events/${event.contentid}/${event.contenttypeid}`} className='event'>
                                        <div className='event-img'
                                             style={{
                                                 backgroundImage: `url(${event.firstimage || event[1] || '/img/default_img.jpeg'})`, // 이미지 URL을 url()로 감싸야 합니다.
                                                 backgroundSize: 'cover', // 이미지를 박스에 맞게 조절
                                                 backgroundPosition: 'center', // 이미지를 중앙에 위치
                                             }}
                                        ></div>
                                        <h1 className='event-title'>{event.title}</h1>
                                        {event.eventstartdate && event.eventenddate && (
                                            <p className='date'>
                                                {event.eventstartdate.slice(0, 4) + '.' +
                                                    event.eventstartdate.slice(4, 6) + '.' +
                                                    event.eventstartdate.slice(6)} ~
                                                {event.eventenddate.slice(4, 6) + '.' +
                                                    event.eventenddate.slice(6)}
                                            </p>
                                        )}
                                    </Link>
                                ))}
                            </div>
                            {visibleCount < results.length && (
                                <button className='more-btn' onClick={handleLoadMore}>더보기</button>
                            )}
                        </div>
                    </>
                ) : (
                    <div className='firstLoad'>
                        <h1>원하는 행사를 조회해서 확인하세요!</h1>
                    </div>
                )}

            </section>
            <Footer></Footer>
        </div>
    )
}

export default SelectSearchPage;