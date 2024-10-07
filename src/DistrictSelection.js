import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 서울 시군구 데이터
const districts = [
    { id: 1, name: '강남구' },
    { id: 2, name: '강동구' },
    { id: 3, name: '강북구' },
    { id: 4, name: '강서구' },
    { id: 5, name: '관악구' },
    { id: 6, name: '광진구' },
    { id: 7, name: '구로구' },
    { id: 8, name: '금천구' },
    { id: 9, name: '노원구' },
    { id: 10, name: '도봉구' },
    { id: 11, name: '동대문구' },
    { id: 12, name: '동작구' },
    { id: 13, name: '마포구' },
    { id: 14, name: '서대문구' },
    { id: 15, name: '서초구' },
    { id: 16, name: '성동구' },
    { id: 17, name: '성북구' },
    { id: 18, name: '송파구' },
    { id: 19, name: '양천구' },
    { id: 20, name: '영등포구' },
    { id: 21, name: '용산구' },
    { id: 22, name: '은평구' },
    { id: 23, name: '종로구' },
    { id: 24, name: '중구' },
    { id: 25, name: '중랑구' },
];

const DistrictSelection = ({ selectedDistrict, setSelectedDistrict }) => {
    const [events, setEvents] = useState([]);

    const areaCode = 1; // 서울의 areaCode는 1 << 여기에 다른 지역 코드도 받게 해줘야함.

    useEffect(() => {
        if (selectedDistrict === null) return;

        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/local/events', {
                    params: { areaCode, sigunguCode: selectedDistrict },
                });
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events', error);
            }
        };

        fetchEvents();
    }, [selectedDistrict]);

    return (
        <div>
            {/* 시군구 선택 버튼 */}
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px'}}>
                {districts.map((district) => (
                    <button
                        key={district.id}
                        onClick={() => setSelectedDistrict(district.id)}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#f0f0f0',
                            color: '#000',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                        }}
                    >
                        {district.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default DistrictSelection;
