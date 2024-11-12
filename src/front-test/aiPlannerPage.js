import React, { useState } from 'react';
import '../css/ai/aiPlannerPage.css'

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

    const areahandleClick = (index) => {
        setAreaActiveIndex(index);
    };

    const dayshandleClick = (index) => {
        setDaysActiveIndex(index);
    };

    const handleClickMultiple = (index) => {
        setActiveIndices((prevActiveIndices) => {
            if (prevActiveIndices.includes(index)) {
                return prevActiveIndices.filter((i) => i !== index);  
            } else {
                return [...prevActiveIndices, index];  
            }
        });
    };

    // 섹션 전환 함수 (next)
    const goToNextSection = () => {
        if (activeSection < 2 &&
            ((areaActiveIndex && activeSection === 0) || 
            (activeIndices.length > 0 && activeSection === 1) ||
            (daysActiveIndex && activeSection === 2))) {
            setActiveSection(prev => prev + 1);  // 다음 섹션으로 이동
        }else{
            if(activeSection === 0){
                alert('원하는 지역을 선택해주세요')
            }
            if(activeSection === 1){
                alert('원하는 엑티비티을 선택해주세요')
            }
            if(activeSection === 2){
                alert('원하는 기간을 선택해주세요')
            }
        }
    };

    // 섹션 전환 함수 (prev)
    const goToPrevSection = () => {
        if (activeSection > 0) {
            setActiveSection(prev => prev - 1);  // 이전 섹션으로 이동
        }
    };


    return(
        <div className="aiPlannerPage">
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
                {area.map((item ,index) => (
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
                <button type='button' className={`next-btn btn ${activeSection === 2 ? 'active' : ''}`}
                    onClick={goToNextSection}
                    disabled={activeSection === 2}>
                    다음
                </button>
            </div>
        </div>
    )
}

export default AIPlannerPage;