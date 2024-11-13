import React, {useEffect, useState} from 'react';
import '../css/ai/aiPlannerPage.css'
import axios from "axios";
import {useHistory} from "react-router-dom";

const AIPlannerPage = () =>{
    const area =[
        '서울', '경기', '인천', '대전', '강원', '부산', '울산', '대구', '전남', '전북', '충남', '충북', '경남', '경북', '제주'
    ]
    const category = [
        '관광지', '문화시설', '행사', '여행코스', '레포츠', '숙박', '쇼핑', '음식'
    ]
    const days = [
        '당일', '1박 2일', '2박 3일'
    ]

    const [activeSection, setActiveSection] = useState(0);
    const [daysActiveIndex, setDaysActiveIndex] = useState(null);
    const [areaActiveIndex, setAreaActiveIndex] = useState(null);
    const [activeIndices, setActiveIndices] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const areahandleClick = (index) => {
        setAreaActiveIndex(index);
    };

    const dayshandleClick = (index) => {
        setDaysActiveIndex(index);
    };

    const handleClickMultiple = (index) => {
        setActiveIndices((prevActiveIndices) => {
            if (prevActiveIndices.includes(index)) {
                // 이미 선택된 index면 배열에서 제거
                return prevActiveIndices.filter((i) => i !== index);
            } else {
                // 최대 4개 선택 가능
                if (prevActiveIndices.length < 4) {
                    return [...prevActiveIndices, index];
                } else {
                    alert('최대 4개까지만 선택 가능합니다.');
                    return prevActiveIndices;
                }
            }
        });
    };

    // 선택된 index들을 category에서 가져와 배열로 변환하는 함수
    const getSelectedCategories = (activeIndices) => {
        return activeIndices.map(index => category[index]);
    };





    // 섹션 전환 함수 (next)
    const goToNextSection = () => {
        if (activeSection < 2 &&
            ((areaActiveIndex !== null && activeSection === 0) ||
            (activeIndices.length > 1 && activeSection === 1) ||
            (daysActiveIndex !== null && activeSection === 2))) {
            setActiveSection(prev => prev + 1);  // 다음 섹션으로 이동
        }else{
            if(activeSection === 0){
                alert('원하는 지역을 선택해주세요.')
            }
            if(activeSection === 1){
                if(activeIndices.length < 2){
                    alert('카테고리는 최소 2개 이상 선택해야 합니다.')
                }else{
                    alert('원하는 엑티비티을 선택해주세요.')
                }

            }
            if(activeSection === 2){
                alert('원하는 기간을 선택해주세요.')
            }
        }
    };

    // 섹션 전환 함수 (prev)
    const goToPrevSection = () => {
        if (activeSection > 0) {
            setActiveSection(prev => prev - 1);  // 이전 섹션으로 이동
        }
    };

    // 기간 선택 및 서버 요청
    const handleDurationSubmit = async () => {
        if (!daysActiveIndex) {
            alert("여행 기간을 선택하세요");
            return;
        }

        const region = area[areaActiveIndex];
        const duration = days[daysActiveIndex];
        const categories = getSelectedCategories(activeIndices);

        setLoading(true);

        try {
            const response = await axios.post('/api/openai/result', {
                region: region,
                categories: categories,  // 배열로 전달
                duration: duration
            });

            // 결과 페이지로 이동, 서버 응답 데이터를 함께 전달
            history.push({
                pathname: '/aiRecommendPage',
                state: { result: response.data, region, categories, duration }
            });
        } catch (error) {

        } finally {
            setLoading(false);
        }
    };
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token) {
            alert('로그인이 필요한 기능입니다.');
            history.push('/'); // 메인 페이지로 리다이렉션
            return;
        }
    }, [token]);


    return(
        <div className="aiPlannerPage">
            {loading ? (
                <>
                    <h1 className='loading-msg'>선택하신 정보로 여행 계획을 세우는 중입니다.</h1>
                    <div className='loader'></div>
                </>

            ) : (
                <div className='page-container'>
                    <div className="title-box">
                        <h1 className="title">AI플래너</h1>
                        <div className="page-num">
                            <div className={`num area ${activeSection >= 0 ? 'active' : ''}`}>
                                <p>지역</p>
                            </div>
                            <div className={`line ${activeSection >= 1 ? 'active' : ''}`}></div>
                            <div className={`num category ${activeSection >= 1 ? 'active' : ''}`}>
                                <p>엑티비티</p>
                            </div>
                            <div className={`line ${activeSection >= 2 ? 'active' : ''}`}></div>
                            <div className={`num days ${activeSection >= 2 ? 'active' : ''}`}>
                                <p>기간</p>
                            </div>
                        </div>
                        <h3 className="instructions">원하는 지역을 선택 해주세요</h3>
                    </div>


                    <section className={`areaSec sec ${activeSection === 0 ? 'active' : ''}`}>
                        {area.map((item, index) => (
                            <div className={`areaname name  ${areaActiveIndex === index ? 'active' : ''}`}
                                 onClick={() => areahandleClick(index)}
                            >
                                <p>{item}</p>
                            </div>
                        ))}
                    </section>
                    <section className={`categorySec sec ${activeSection === 1 ? 'active' : ''}`}>
                        {category.map((item, index) => (
                            <div className={`categoryname name  ${activeIndices.includes(index) ? 'active' : ''}`}
                                 onClick={() => handleClickMultiple(index)}
                            >
                                <p>{item}</p>
                            </div>
                        ))}
                    </section>
                    <section className={`daysSec sec ${activeSection === 2 ? 'active' : ''}`}>
                        {days.map((item, index) => (
                            <div className={`daysname name  ${daysActiveIndex === index ? 'active' : ''}`}
                                 onClick={() => dayshandleClick(index)}
                            >
                                <p>{item}</p>
                            </div>
                        ))}
                    </section>
                    <div className='navigation-box'>
                        <button type='button' className={`prev-btn btn ${activeSection === 0 ? 'active' : ''}`}
                                onClick={goToPrevSection}
                                disabled={activeSection === 0}>
                            이전
                        </button>
                        {activeSection === 2 ? (
                            <button type='button' className={`next-btn btn`}
                                    onClick={handleDurationSubmit}
                            >
                                생성
                            </button>
                        ) : (
                            <button type='button' className={`next-btn btn`}
                                    onClick={goToNextSection}
                                    disabled={activeSection === 2}>
                                다음
                            </button>
                        )}

                    </div>
                </div>
            )}

        </div>
    )
}

export default AIPlannerPage;