import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';  // 사용자 인증 정보 (토큰 포함)
import { Link } from 'react-router-dom';

const UserRecommendation = () => {
    const { auth } = useAuth();  // 사용자 인증 정보 (토큰 포함)
    const [recommendation, setRecommendation] = useState('');  // 카테고리 이름 저장
    const [categoryData, setCategoryData] = useState([]);  // 카테고리 데이터를 저장
    const [personalizedRecommendations, setPersonalizedRecommendations] = useState([]);  // 개인화된 추천 데이터
    const [loading, setLoading] = useState(false);  // 로딩 상태
    const [refreshKey, setRefreshKey] = useState(0);  // 새로고침을 위한 상태값

    // 개인화된 추천 데이터를 불러오는 함수
    const fetchPersonalizedRecommendations = async () => {
        try {
            setLoading(true);  // 로딩 상태 시작
            const response = await axios.get(`http://localhost:8080/api/openai/personalized-recommendation/${auth.userId}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setPersonalizedRecommendations(response.data.slice(0, 4));  // 최대 4개의 추천 데이터만 저장
        } catch (error) {
            console.error('개인화된 추천 데이터를 불러오는 중 오류 발생:', error);
        } finally {
            setLoading(false);  // 로딩 상태 종료
        }
    };

    // 추천 데이터를 불러오는 함수
    const fetchRecommendation = async () => {
        try {
            setLoading(true);  // 로딩 상태 시작
            const response = await axios.get('http://localhost:8080/api/clicks/personalized/recommendation', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setRecommendation(response.data.categoryName);  // 추천 카테고리 이름 저장

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
        } finally {
            setLoading(false);  // 로딩 상태 종료
        }
    };

    // 처음 컴포넌트가 로드될 때 데이터 불러오기
    useEffect(() => {
        // 로딩 상태 시작
        setLoading(true);

        // 두 API 호출을 동시에 처리
        Promise.all([fetchRecommendation(), fetchPersonalizedRecommendations()]).then(() => {
            setLoading(false);  // 모든 데이터가 불러와지면 로딩 상태 종료
        });
    }, [auth.token, refreshKey]);

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

    // 추천 데이터를 렌더링하는 함수
    const renderCategoryData = (item) => {
        if (!item.contentid || !item.contenttypeid) {
            return null;
        }

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

    // 개인화된 추천 데이터를 렌더링하는 함수
    const renderPersonalizedRecommendation = (item, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
            <h3>{item.title}</h3>
            <img
                src={item.image || '이미지 없음'}
                alt={item.title}
                style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <p>{item.aiRecommendation || '추천 문구 없음'}</p>
        </div>
    );

    return (
        <div>
            <h2>{auth.userName}님이 찾는 정보가 {recommendation}인가요!?</h2>
            <p>{recommendation}에 해당하는 정보를 아래에서 확인해봐요!</p>

            {loading ? (
                <p>{auth.userName}님이 선호할만한 행사를 찾고 있어요!</p>  // 로딩 중일 때 표시할 메시지
            ) : (
                <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {categoryData.map((item, index) => (
                            <div key={index} style={{ marginBottom: '20px', width: '200px' }}>
                                {renderCategoryData(item)}
                            </div>
                        ))}
                    </div>

                    <h2>개인화된 추천</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                        {personalizedRecommendations.map(renderPersonalizedRecommendation)}
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
