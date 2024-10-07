import React, { useState } from 'react';
import Select from 'react-select';

import Banner from "./hotPlacePage/banner";
import '../css/hotPlacePage/hotPlacePage.css'
import Header from "./layout/header";
import Sec1 from './hotPlacePage/sec1';
import Sec2 from './hotPlacePage/sec2';
import Sec3 from './hotPlacePage/sec3';
import Footer from './layout/footer'

const RecommendList = Array.from({ length: 20 }, (_, i) => `Post ${i + 1}`);


const HotPlacePage = () =>{
    const sigunguOptions =[
        { value: 1, label: '#강남구' },
        { value: 2, label: '#강동구' },
        { value: 3, label: '#강북구' },
        { value: 4, label: '#강서구' },
        { value: 5, label: '#관악구' },
        { value: 6, label: '#광진구' },
        { value: 7, label: '#구로구' },
        { value: 8, label: '#금천구' },
        { value: 9, label: '#노원구' },
        { value: 10, label: '#도봉구' },
        { value: 11, label: '#동대문구' },
        { value: 12, label: '#동작구' },
        { value: 13, label: '#마포구' },
        { value: 14, label: '#서대문구' },
        { value: 15, label: '#서초구' },
        { value: 16, label: '#성동구' },
        { value: 17, label: '#성북구' },
        { value: 18, label: '#송파구' },
        { value: 19, label: '#양천구' },
        { value: 20, label: '#영등포구' },
        { value: 21, label: '#용산구' },
        { value: 22, label: '#은평구' },
        { value: 23, label: '#종로구' },
        { value: 24, label: '#중구' },
        { value: 25, label: '#중랑구' },
        { value: 99, label: '#기타지역' },
    ];
    
    const [sigunguselected, setSigunguSelected] = useState(null); 
    const handleSubmit = (e) => {
        e.preventDefault();
        setSigunguSelected(null);
    };
    const onChangeSigunguSelect = (option) => {
        setSigunguSelected(option);
    };

    return(
        <section className="hotplacepage">
            <Header></Header>
            <Banner></Banner>
            <div className="article">
                <div className="sec-container">
                    <Sec1></Sec1>
                    <Sec2></Sec2>
                    <Sec3></Sec3>
                </div>
                <aside className='sidebar'>
                    <form className='hashtag-box' onSubmit={handleSubmit}>
                        <p>#서울</p>
                        <Select
                            onChange={onChangeSigunguSelect}
                            options={sigunguOptions}
                            value={sigunguselected}
                            placeholder="#전체"
                        />
                    </form>
                    <div className='recommend-list'>
                        <h2 className='main-title'>추천</h2>
                        {RecommendList.slice(0, 8).map((item, index) =>(
                            <div className='recommend'>
                                <div className='txt'>
                                    <h3 className='title'>에코랜드 테마파크</h3>
                                    <p className='addr'>제주특별자치도 제주시</p>
                                    <p className='info'>설악 워터피아에서 즐기는 세계스파여행</p>
                                </div>
                                <div className='img'></div>
                            </div>
                        ))}
                    </div>
                </aside>
            </div>
            
            <Footer></Footer>
        </section>
    )
}

export default HotPlacePage;