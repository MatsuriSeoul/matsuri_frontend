import React, { useState } from 'react';
import Select from 'react-select';

import Header from '../layout/header';
import Footer from '../layout/footer';


import 'react-datepicker/dist/react-datepicker.css';
import '../../css/eventInfo/selectSearchPage.css'

const MainEvent = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
];
const allEvent = Array.from({ length: 100 }, (_, i) => `Post ${i + 1}`);

const SelectSearchPage = () =>{
    const dateOptions = [
        { value: '1월', label: '1월' },
        { value: '2월', label: '2월' },
        { value: '3월', label: '3월' },
        { value: '4월', label: '4월' },
        { value: '5월', label: '5월' },
        { value: '6월', label: '6월' },
        { value: '7월', label: '7월' },
        { value: '8월', label: '8월' },
        { value: '9월', label: '9월' },
        { value: '10월', label: '10월' },
        { value: '11월', label: '11월' },
        { value: '12월', label: '12월' },
        
    ];
    const areaOptions = [
        { value: '서울', label: '서울' },
        { value: '인천', label: '인천' },
        { value: '대전', label: '대전' },
        { value: '대구', label: '대구' },
        { value: '경기', label: '경기' },
        { value: '부산', label: '부산' },
        { value: '울산', label: '울산' },
        { value: '광주', label: '광주' },
        { value: '강원', label: '강원' },
        { value: '충북', label: '충북' },
        { value: '충남', label: '충남' },
        { value: '경북', label: '경북' },
        { value: '경남', label: '경남' },
        { value: '전북', label: '전북' },
        { value: '전남', label: '전남' },
        { value: '제주', label: '제주' },
        { value: '세종', label: '세종' },
    ];
    const categoryOptions = [
        { value: '공연/행사', label: '공연/행사' },
        { value: '숙박', label: '숙박' },
        { value: '쇼핑', label: '쇼핑' },
        { value: '공원탐방', label: '공원탐방' },
        { value: '음식', label: '음식' },
        { value: '농장체험', label: '농장체험' },
        { value: '교육', label: '교육' },
        { value: '산림여가', label: '산림여가' },
        { value: '문화행사', label: '문화행사' },
    ];
    const [dateselected, setDateSelected] = useState(null); 
    const [areaselected, setAreaSelected] = useState(null); 
    const [categoryselected, setCategorySelected] = useState(null); 

    const [visibleCount, setVisibleCount] = useState(18); 

    const [activeIndex, setActiveIndex] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        setDateSelected(null);
        setAreaSelected(null);
        setCategorySelected(null);
    };

    const onChangeDateSelect = (option) => {
        setDateSelected(option);
    };
    const onChangeAreaSelect = (option) => {
        setAreaSelected(option);
    };
    const onChangeCategorySelect = (option) => {
        setCategorySelected(option);
    };

    const handleLoadMore = () => {
      setVisibleCount((prevCount) => prevCount + 18);
    };


    return(
        <div className='ssp'>
            <Header></Header>
            <div className='headerbar'></div>
            <section className='banner'>
                <h1 className='title'>어떤 행사를 원하시나요?</h1>
                <p className='sub-title'>전국 지역의 행사를 당신이 원하는 시기, 카테고리 별로 나누어 제공해드립니다. </p>
                <div className='underbar'></div>
            </section>
            <section className='article'>
                <form className='selectform' onSubmit={handleSubmit}>
                    <Select
                      onChange={onChangeDateSelect}
                      options={dateOptions}
                      value={dateselected}
                      placeholder="시기"
                    />
                    <Select
                      onChange={onChangeAreaSelect}
                      options={areaOptions}
                      value={areaselected}
                      placeholder="지역"
                    />
                    <Select
                      onChange={onChangeCategorySelect}
                      options={categoryOptions}
                      value={categoryselected}
                      placeholder="카테고리"
                    />
                    <button type='submit' className='submit-btn'>조회<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-334.23 625.77-480 480-625.77 438.23-584l74 74H330v60h182.23l-74 74L480-334.23Zm.07 234.23q-78.84 0-148.21-29.92t-120.68-81.21q-51.31-51.29-81.25-120.63Q100-401.1 100-479.93q0-78.84 29.92-148.21t81.21-120.68q51.29-51.31 120.63-81.25Q401.1-860 479.93-860q78.84 0 148.21 29.92t120.68 81.21q51.31 51.29 81.25 120.63Q860-558.9 860-480.07q0 78.84-29.92 148.21t-81.21 120.68q-51.29 51.31-120.63 81.25Q558.9-100 480.07-100Zm-.07-60q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></button>
                </form>
                <div className='main-event'>
                    {MainEvent.slice(0, 3).map((item, index)=> (
                        <div 
                            className={`event event${item.id} ${activeIndex === index ? 'active' : ''}`}
                            onMouseEnter={() => setActiveIndex(index)}>
                            <div className='txt'>
                                <h1 className='event-title'>무안 연꽃축제</h1>
                                <div className='active-txt'>
                                    <p className='date'>2024.07.24 ~ 2024.07.28</p>
                                    <p className='area'>서울 영등포구</p>
                                    <button className='btn'></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='events-container'>
                    <div className='tabs'>
                        <p className='tab'>축제일순</p>
                    </div>
                    <div className='event-list'>
                        {allEvent.slice(0, visibleCount).map((item)=>(
                            <div className='event'>
                                <div className='event-img'></div>
                                <h1 className='event-title'>파주치멕페스티벌</h1>
                                <p className='date'>2024.07.03~2024.07.07</p>
                                <p className='area'>경기도 파주시</p>
                            </div>
                        ))}

                        {visibleCount < allEvent.length && (
                            <button className='more-btn' onClick={handleLoadMore}>더보기</button>
                        )}
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </div>
    )
}

export default SelectSearchPage;