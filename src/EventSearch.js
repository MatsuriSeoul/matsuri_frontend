import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './EventSearch.css';

const categories = {
    경기: ['전시', '교육', '공연', '행사'],
    서울: ['전시/관람', '산림여가', '문화행사', '농장체험', '교육체험', '공원탐방']
};

const ITEMS_PER_PAGE = 4;

const EventSearch = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [region, setRegion] = useState('');
    const [category, setCategory] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        if (region) {
            setAvailableCategories(categories[region]);
            setCategory(''); // 지역이 변경되면 카테고리를 초기화
        } else {
            setAvailableCategories([]);
        }
    }, [region]);

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/events/search', {
                params: {
                    startDate: startDate ? startDate.toISOString().split('T')[0] : '',
                    endDate: endDate ? endDate.toISOString().split('T')[0] : '',
                    region,
                    category,
                }
            });
            setResults(response.data);
            setCurrentPage(1); // 새로운 검색 시 첫 페이지로 이동
        } catch (err) {
            setError(err.message || '잘못된 형식');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Invalid Date';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            // 날짜 형식이 YYYYMMDD인 경우 처리
            const year = dateString.slice(0, 4);
            const month = dateString.slice(4, 6) - 1; // 월은 0부터 시작하므로 -1
            const day = dateString.slice(6, 8);
            const parsedDate = new Date(year, month, day);
            if (!isNaN(parsedDate.getTime())) {
                return parsedDate.toLocaleDateString();
            }
            return 'Invalid Date';
        }
        return date.toLocaleDateString();
    };

    const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
    const paginatedResults = results.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
                    <option value="경기">경기</option>
                    <option value="서울">서울</option>
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
                            src={event.imageUrl || event.imgurl}
                            alt={event.title || event.svcnm}
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
