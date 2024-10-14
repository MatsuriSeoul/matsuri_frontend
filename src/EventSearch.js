/*
* 검색 페이지
* */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './EventSearch.css';
import { Link } from "react-router-dom";
import qs from 'qs';

// 지역별 카테고리 정의
const categories = {
    경기: ['축제/공연/행사', '전시', '교육', '공연', '행사', '음식', '쇼핑', '문화시설', '여행코스', '레포츠', '숙박', '관광지'],
    서울: ['축제/공연/행사', '전시/관람', '산림여가', '문화행사', '농장체험', '교육체험', '공원탐방', '음식', '쇼핑', '여행코스', '레포츠', '숙박', '관광지'],
    인천: ['음식', '쇼핑', '문화시설', '여행코스', '레포츠', '숙박', '관광지', '축제/공연/행사'],
    대전: ['음식', '쇼핑', '문화시설', '여행코스', '레포츠', '숙박', '관광지', '축제/공연/행사'],
    강원: ['음식', '쇼핑', '문화시설', '여행코스', '레포츠', '숙박', '관광지', '축제/공연/행사'],
    부산: ['음식', '쇼핑', '문화시설', '여행코스', '레포츠', '숙박', '관광지', '축제/공연/행사'],
    울산: ['음식', '쇼핑', '문화시설', '여행코스', '레포츠', '숙박', '관광지', '축제/공연/행사'],
    대구: ['음식', '쇼핑', '문화시설', '여행코스', '레포츠', '숙박', '관광지', '축제/공연/행사'],
    전남: ['음식', '쇼핑', '문화시설', '여행코스', '레포츠', '숙박', '관광지', '축제/공연/행사'],
    전북: ['음식', '쇼핑', '문화시설', '여행코스', '레포츠', '숙박', '관광지', '축제/공연/행사'],
    충남: ['음식', '쇼핑', '문화시설', '여행코스', '레포츠', '숙박', '관광지', '축제/공연/행사'],
    충북: ['음식', '쇼핑', '문화시설', '여행코스', '레포츠', '숙박', '관광지', '축제/공연/행사'],
    경남: ['음식', '쇼핑', '문화시설', '여행코스', '레포츠', '숙박', '관광지', '축제/공연/행사'],
    경북: ['음식', '쇼핑', '문화시설', '여행코스', '레포츠', '숙박', '관광지', '축제/공연/행사'],
    제주: ['음식', '쇼핑', '문화시설', '여행코스', '레포츠', '숙박', '관광지', '축제/공연/행사'],
};

// 지역 이름을 매핑하는 객체
const regionMap = {
    서울: '서울특별시',
    경기: '경기도',
    인천: '인천광역시',
    대전: '대전광역시',
    부산: '부산광역시',
    전남: '전라남도',
    전북: '전북특별자치도',
    울산: '울산광역시',
    충남: '충청남도',
    충북: '충청북도',
    경남: '경상남도',
    경북: '경상북도',
    대구: '대구광역시',
    강원: '강원특별자치도',
    제주: '제주특별자치도',
};

// 카테고리 한글 이름을 영어로 변환하는 매핑 객체
const categoryMap = {
    '음식': 'food-events',
    '숙박': 'local-events',
    '문화시설': 'cultural-facilities',
    '레포츠': 'leisure-sports',
    '쇼핑': 'shopping-events',
    '여행코스': 'travel-courses',
    '축제/공연/행사': 'events',
    '관광지': 'tourist-attractions'
};

// 지역 목록 정의
const regions = Object.keys(regionMap);
const months = [
    "전체", "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"
];

const ITEMS_PER_PAGE = 4; // 페이지당 표시할 항목 수

const EventSearch = () => {
    const [month, setMonth] = useState('전체') // 선택한 월 초기값을 '전체'로 설정
    const [region, setRegion] = useState(''); // 선택된 지역
    const [category, setCategory] = useState(''); // 선택된 카테고리
    const [results, setResults] = useState([]); // 검색 결과 저장
    const [error, setError] = useState(null); // 에러 메시지 저장
    const [availableCategories, setAvailableCategories] = useState([]); // 선택 가능한 카테고리 목록
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

    // 지역 선택에 따른 카테고리 업데이트
    useEffect(() => {
        if (region) {
            setAvailableCategories(categories[region] || []); // 지역에 맞는 카테고리 설정
            setCategory(''); // 카테고리 초기화
        } else {
            setAvailableCategories([]);
        }
    }, [region]);

    // 카테고리에 따라 API URL을 결정하는 함수
    const getApiUrlByCategory = (category) => {
        switch (category) {
            case '음식':
                return `http://localhost:8080/api/food-events/by-region`;
            case '숙박':
                return `http://localhost:8080/api/local-events/by-region`;
            case '문화시설':
                return `http://localhost:8080/api/cultural-facilities/by-region`;
            case '레포츠':
                return `http://localhost:8080/api/leisure-sports/by-region`;
            case '쇼핑':
                return `http://localhost:8080/api/shopping-events/by-region`;
            case '여행코스':
                return `http://localhost:8080/api/travel-courses/by-region`;
            case '관광지':
                return `http://localhost:8080/api/tourist-attractions/by-region`;
            default:
                return `http://localhost:8080/api/events/search`;
        }
    };

    // API 요청을 수행하는 함수
    const fetchApiData = async (apiUrl, region) => {
        try {
            const response = await axios.get(apiUrl, {
                params: {
                    region: region === '전체' ? '' : region // 전체인 경우 빈 문자열 전달
                }
            });
            return response.data;
        } catch (err) {
            throw new Error(err.message || '잘못된 형식');
        }
    };

    // 검색 버튼 클릭 시 데이터 검색
    const handleSearch = async () => {
        try {
            // 사용자가 선택한 지역을 매핑된 전체 이름으로 변환
            const fullRegionName = regionMap[region] || '';

            const gyeonggiApiUrl = 'http://localhost:8080/api/gyeonggi-events/search';

            const seoulApiUrl = 'http://localhost:8080/api/seoul-events/search';

            if (region === '경기' && ['전시', '교육', '공연', '행사'].includes(category) && month) {
                try {
                    // 로그 추가: category 값을 확인
                    console.log("현재 카테고리:", category);

                    const params = {category: category, month: month === '전체' ? '' : month.replace('월', '')}; // "1월"을 숫자 1로 변환
                    console.log("경기 특정 카테고리 및 월 선택 시 엔드포인트로 요청 보냄:", params);

                    // 해당 조건에 맞는 요청을 별도의 엔드포인트로 보냄
                    const gyeonggiResponse = await axios.get(gyeonggiApiUrl, {
                        params: params
                    });

                    if(!gyeonggiResponse.data){
                        return (
                            <h3>진행중인 행사가 없습니다 😭</h3>
                        );
                    }

                    console.log("요청이 성공적으로 보내졌습니다.", params.category, params.month);
                    setResults(gyeonggiResponse.data); // 결과 데이터 설정
                    setCurrentPage(1); // 검색 시 첫 페이지로 이동
                    return results; // 기본 API 호출을 생략하기 위해 리턴
                } catch (error) {
                    console.error("경기 이벤트 호출 실패:", error);
                    return; // 오류 발생 시에도 기본 API 호출이 실행되지 않도록 함
                }
            }


            // 서울 이벤트 조회
            if (region === '서울' && ['전시/관람', '산림여가', '문화행사', '농장체험', '교육체험', '공원탐방'].includes(category) && month) {
                try {
                    // 로그 추가: category 값을 확인
                    console.log("현재 카테고리:", category);

                    const params = {category: category, month: month === '전체' ? '' : month.replace('월', '')}; // "1월"을 숫자 1로 변환
                    console.log("경기 특정 카테고리 및 월 선택 시 엔드포인트로 요청 보냄:", params);

                    const seoulResponse = await axios.get(seoulApiUrl, {
                        params: params
                    });
                    if(!seoulResponse.data){
                        return (
                            <h3>진행중인 행사가 없습니다 😭</h3>
                        );
                    }
                    console.log("요청이 성공적으로 보내졌습니다.", params.category, params.month);
                    setResults(seoulResponse.data); // 결과 데이터 설정
                    setCurrentPage(1); // 검색 시 첫 페이지로 이동
                    return results; // 기본 API 호출을 생략하기 위해 리턴
                } catch (error) {
                    console.error("서울 이벤트 호출 실패:", error);
                }
            }



            let regionAndMonthUrl = `http://localhost:8080/api/events/by-month-and-region`;

            // 축제/공연/행사 카테고리일 때 월별 데이터를 가져오는 로직 추가
            if (category === '축제/공연/행사' && month) {
                const response = await axios.get(regionAndMonthUrl, {
                    params: {
                        month: month === '전체' ? '' : month.replace('월', ''), // "1월" -> "1" 형식으로 변환, 전체일 경우 빈 문자열
                        region: fullRegionName === '전체' ? '' : fullRegionName // 지역 정보가 전체인 경우 빈 문자열로 전달
                    }
                });
                if (!response.data) {
                    return (
                        <h3>진행중인 행사가 없습니다 😭</h3>
                    );
                }
                console.log(fullRegionName, month);
                setResults(response.data);
                setCurrentPage(1);
                return;
            }

            const apiUrl = getApiUrlByCategory(category);
            const data = await fetchApiData(apiUrl, fullRegionName);
            setResults(data); // 결과 데이터 설정
            setCurrentPage(1); // 검색 시 첫 페이지로 이동
        } catch (err) {
            setError(err.message || '잘못된 형식'); // 에러 처리
        }
    };

    // // 날짜 형식 변환 함수
    // const formatDate = (dateString) => {
    //     if (!dateString) return 'Invalid Date';
    //     const date = new Date(dateString);
    //     if (isNaN(date.getTime())) {
    //         return 'Invalid Date';
    //     }
    //     return date.toLocaleDateString();
    // };

    const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE); // 총 페이지 수 계산
    const paginatedResults = results.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE); // 페이지에 따른 결과 분할

    return (
        <div>
            <div>
                {(category === '축제/공연/행사' || category === '전시' || category === '교육' ||
                    category === '공연' || category === '행사' || category === '전시/관람' ||
                    category === '농장체험' || category === '산림여가' || category === '문화행사' || category === '교육체험')  && (
                    <div>
                        <label>시작 월: </label>
                        <select value={month} onChange={(e) => setMonth(e.target.value)}>
                            {months.map((month, index) => (
                                <option key={index} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>
                )}
                <label>지역: </label>
                <select value={region} onChange={(e) => setRegion(e.target.value)}>
                    <option value="">지역을 선택해주세요</option>
                    {regions.map((region) => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>
                <label>카테고리: </label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">카테고리를 선택해주세요</option>
                    {availableCategories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
                <button onClick={handleSearch}>조회</button>
            </div>
            <div className="results-grid">
                {error && <p>Error: {error}</p>}
                {paginatedResults.map((event, index) => (
                    <div key={index} className="event-card">
                        {/* 서울 특정 카테고리일 때만 상세 페이지로 이동 */}
                        {(region === '서울' && (category === '전시/관람' || category === '산림여가' ||
                            category === '문화행사' || category === '농장체험' || category === '교육체험' || category === '공원탐방')) ? (
                            <Link to={`/seoul-events/${event.svcid}/detail`}>
                                <img
                                    src={event.firstimage || event.imgurl}
                                    alt={event.title || event.svcnm}
                                    className="event-image"
                                />
                                <h3 className="event-title">
                                    {event.svcnm}
                                </h3>
                            </Link>
                        ) : (
                            // 경기 특정 카테고리일 때만 상세 페이지로 이동
                            (region === '경기' && (category === '전시' ||
                                category === '교육' || category === '공연')) ? (
                                <Link to={`/gyeonggi-events/${event.id}/detail`}>
                                    <img
                                        src={event.imageUrl || event.imgurl}
                                        alt={event.title || event.svcnm}
                                        className="event-image"
                                    />
                                    <h3 className="event-title">
                                        {event.title || event.svcnm}
                                    </h3>
                                </Link>
                            ) : (
                                <Link
                                    to={`/${categoryMap[category] || 'events'}/${event.contentid || event.svcid}/${event.contenttypeid}/detail`}>
                                    <img
                                        src={event.firstimage || event.imgurl}
                                        alt={event.title || event.svcnm}
                                        className="event-image"
                                    />
                                    <h3 className="event-title">
                                        {event.title || event.svcnm}
                                    </h3>
                                </Link>
                            )
                        )}
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({length: totalPages}, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? 'active' : ''}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default EventSearch;
