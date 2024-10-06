import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Article from './fapp/article';
import MoreArticle from './fapp/moreArticle';
import Header from '../layout/header';
import Footer from '../layout/footer';

import '../../css/eventInfo/freeAndPaidPage.css';



const FreeAndPaidPage = () =>{
    return(
        <div className="fapp">
            <Header></Header>
            <div className='headerbar'></div>
            <section className='banner'>
                <h1 className='title'>어떤 행사를 원하시나요?</h1>
                <p className='sub-title'>무료와 유료 중 어떤 걸 더 선호하시나요.</p>
                <div className='underbar'></div>
            </section>
            <Routes>
              <Route path="/" element={<Article />} /> {/* 기본 경로 리다이렉션 */}
              <Route path=":moreCategory" element={<MoreArticle />} /> {/* 하위 경로 */}
            </Routes>
            <Footer></Footer>
        </div>
    )
}
export default FreeAndPaidPage;