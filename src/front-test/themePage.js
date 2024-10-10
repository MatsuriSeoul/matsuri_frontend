import React from 'react';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../css/themePage/themePage.css"
import Banner from "./themePage/banner"
import Article from './themePage/article';
import Footer from "./layout/footer"

const ThemePage = () => {
    return (
        <div>
            <Banner />
            <Article />
            <Footer />
        </div>
    );
}

export default ThemePage;