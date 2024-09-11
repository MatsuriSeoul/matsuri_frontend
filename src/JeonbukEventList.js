import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './EventSearch.css'; // 여기에 CSS 파일을 연결합니다.

// 지역별 카테고리 정의
const categories = {
    경기: ['축제/공연/행사', '전시', '교육', '공연', '음식', '쇼핑', '문화시설', '여행코스', '레포츠', '숙박', '관광지'],
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
    전북: '전라북도',
    울산: '울산광역시',
    충남: '충청남도',
    충북: '충청북도',
    경남: '경상남도',
    경북: '경상북도',
    대구: '대구광역시',
    제주: '제주특별자치도',
};

// 지역 목록 정의
const regions = Object.keys(regionMap);

const ITEMS_PER_PAGE = 4; // 페이지당 표시할 항목 수

const EventSearch = () => {
    const [startDate, setStartDate] = useState(null); // 시작일 설정
    const [endDate, setEndDate] = useState(null); // 종료일 설정
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

    // 검색 버튼 클릭 시 데이터 검색
    const handleSearch = async () => {
        try {
            // 사용자가 선택한 지역을 매핑된 전체 이름으로 변환
            const fullRegionName = regionMap[region] || '';

            // 기본 검색 API URL
            let apiUrl = `http://localhost:8080/api/events/search`;

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
                apiUrl = `http://localhost:8080/api/events/by-region`;
            } else if (category === '관광지') {
                apiUrl = `http://localhost:8080/api/tourist-attractions/by-region`;
            }

            // API 호출 및 데이터 설정
            const response = await axios.get(apiUrl, {
                params: {
                    region: fullRegionName, // 매핑된 지역 이름 전달
                    startDate: startDate ? startDate.toISOString().split('T')[0] : '',
                    endDate: endDate ? endDate.toISOString().split('T')[0] : ''
                }
            });
            console.log(response.data);  // 데이터를 받아오는지 확인
            setResults(response.data); // 결과 데이터 설정
            setCurrentPage(1); // 검색 시 첫 페이지로 이동
        } catch (err) {
            setError(err.message || '잘못된 형식'); // 에러 처리
        }
    };

    // 날짜 형식 변환 함수
    const formatDate = (dateString) => {
        if (!dateString) return 'Invalid Date';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return date.toLocaleDateString();
    };

    const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE); // 총 페이지 수 계산
    const paginatedResults = results.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE); // 페이지에 따른 결과 분할

    return (
        <div>
            <div>
                <label>시작일: </label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    dateFormat="yyyy-MM-dd"
                />
                <label>종료일: </label>
                <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    dateFormat="yyyy-MM-dd"
                />
                <label>지역: </label>
                <select value={region} onChange={(e) => setRegion(e.target.value)}>
                    <option value="">전체</option>
                    {regions.map((region) => (
                        <option key={region} value={region}>{region}</option>
                    ))}
                </select>
                <label>카테고리: </label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">전체</option>
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
                        <img
                            src={event.firstimage || event.imgurl}  // 이미지 필드명
                            alt={event.title || event.svcnm}  // 제목 필드명
                            className="event-image"
                        />
                        <h3 className="event-title">
                            {event.title || event.svcnm}
                            ({formatDate(event.beginDe)} - {formatDate(event.endDe)})
                        </h3>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
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
