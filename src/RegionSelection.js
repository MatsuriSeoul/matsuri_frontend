/*
* 지역 카테고리 선택
* */
import React from 'react';
import { Link } from 'react-router-dom';

const regions = [
    { id: 'seoul', name: '서울' } ,
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
    { id: 'jeju', name: '제주' },

];

const RegionSelection = () => {
    return (
        <div>
            <h1>지역 선택</h1>
            <ul>
                {regions.map((region) => (
                    <li key={region.id}>
                        <Link to={`/region/${region.id}`}>{region.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RegionSelection;
