import React from 'react';
import {  Route, Routes, Navigate } from 'react-router-dom';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/themePage/themePage.css"
import Banner from "./themePage/banner"
import Article from './themePage/article';
import Footer from "./layout/footer"

const ThemePage = () =>{
    return(
      <div>
        <Banner />
        <Routes>
          <Route path="/" element={<Navigate to="/themePage/4" />} /> {/* 기본 경로 리다이렉션 */}
          <Route path=":themeId" element={<Article />} /> {/* 하위 경로 */}
        </Routes>
        <Footer />
      </div>
    )
}

export default ThemePage;