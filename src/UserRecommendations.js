import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { Link } from 'react-router-dom';

const UserRecommendation = () => {
    const { auth } = useAuth();  // 사용자 인증 정보 (토큰 포함)
    const [recommendation, setRecommendation] = useState('');
    const [categoryData, setCategoryData] = useState([]);  // 카테고리 데이터를 저장
    const [loading, setLoading] = useState(false);  // 로딩 상태
    const [refreshKey, setRefreshKey] = useState(0);  // 새로고침을 위한 상태값

    // 추천 데이터를 불러오는 함수
    const fetchRecommendation = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/clicks/personalized/recommendation', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setRecommendation(response.data.categoryName);

            // 선호하는 카테고리의 데이터를 불러옴
            const categoryDataResponse = await axios.get('http://localhost:8080/api/clicks/category-data', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            // 데이터를 랜덤하게 섞어 화면에 출력
            const shuffledData = categoryDataResponse.data.sort(() => Math.random() - 0.5);
            setCategoryData(shuffledData.slice(0, 4));  // 3~4개 정도만 보여줌
        } catch (error) {
            console.error('추천 데이터 불러오기 실패:', error);
        }
    };

    // 처음 컴포넌트가 로드될 때 데이터 불러오기
    useEffect(() => {
        setLoading(true);
        fetchRecommendation();
        setLoading(false);
    }, [auth.token, refreshKey]);  // 새로고침 시에도 fetchRecommendation을 호출

    // 새로고침 버튼 클릭 시 새 데이터를 불러오기
    const handleRefresh = () => {
        setRefreshKey((prevKey) => prevKey + 1);  // 상태값 변경으로 useEffect 재실행
    };

    // contenttypeid에 맞는 링크 경로 설정
    const getLinkPath = (contentid, contenttypeid) => {
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
                return '#';  // 잘못된 contenttypeid인 경우에 대한 기본 경로 설정
        }
    };

    const renderCategoryData = (item) => {
        // contenttypeid에 맞는 링크를 렌더링하는 함수
        return (
            <Link to={getLinkPath(item.contentid, item.contenttypeid)}>
                <h3>{item.title}</h3>
                <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                />
            </Link>
        );
    };

    return (
        <div>
            <h2>맞춤형 추천</h2>
            {loading ? (
                <p>로딩 중...</p>
            ) : (
                <>
                    <p>{recommendation}에 대한 정보를 찾고 계신가요?</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {categoryData.map((item, index) => (
                            <div key={index} style={{ marginBottom: '20px', width: '200px' }}>
                                {renderCategoryData(item)}
                            </div>
                        ))}
                    </div>
                    <button onClick={handleRefresh} style={{ marginTop: '20px' }}>
                        새로고침
                    </button>
                </>
            )}
        </div>
    );
};

export default UserRecommendation;
