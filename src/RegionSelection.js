import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// 지역 데이터
const regions = [
    { id: 'seoul', name: '서울' },
    { id: 'gyeonggi', name: '경기' },
    { id: 'incheon', name: '인천' },
    { id: 'daejeon', name: '대전' },
    { id: 'gangwon', name: '강원' },
    { id: 'busan', name: '부산' },
    { id: 'ulsan', name: '울산' },
    { id: 'daegu', name: '대구' },
    { id: 'jeonnam', name: '전남' },
    { id: 'jeonbuk', name: '전북' },
    { id: 'chungnam', name: '충남' },
    { id: 'chungbuk', name: '충북' },
    { id: 'gyeongnam', name: '경남' },
    { id: 'gyeongbuk', name: '경북' },
    { id: 'jeju', name: '제주' }
];


const RegionSelection = () => {
    const [selectedRegion, setSelectedRegion] = useState(null);

    const handleRegionClick = (regionId) => {
        setSelectedRegion(regionId);
    };

    return (
        <div>
            <h1>지역 선택</h1>
            {/* 지역 버튼 목록 */}
            <ul style={{ display: 'flex', gap: '10px', listStyle: 'none', padding: 0 }}>
                {regions.map((region) => (
                    <li key={region.id}>
                        <Link to={`/region/${region.id}`}>
                            <button onClick={() => handleRegionClick(region.id)}>
                                {region.name}
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RegionSelection;
