import Header from "./layout/header";
import Banner from "./main/banner";
import Section1 from "./main/section1";
import Footer from "./layout/footer";

import "../css/main/banner.css";
import "../css/main/section1.css"
import "../css/main/mainpage.css";
import React, { useState } from "react";
import LoginPage from "./login/LoginPage";
import Section2 from "./main/section2";

const MainPage = () =>{

    return(
        <div className='main-page'>
            <Banner/>
            <Section1/>
            <Section2/>
            <Footer/>
        </div>
    )
}
export default MainPage;