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
    const history = useHistory();

    return (
        <div>
            <Banner />
            <Switch>
                {/* 기본 경로 리다이렉션 */}
                <Route exact path="/" render={() => <Redirect to="/themePage/4" />} />

                {/* 하위 경로 */}
                <Route path="/themePage/:themeId" component={Article} />
            </Switch>
            <Footer />
        </div>
    );
}

export default ThemePage;