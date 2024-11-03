
import Header from "./layout/header";
import Footer from "./layout/footer";
import Article from "./eventDetailPage/article";

import "../css/eventDetailPage/article.css";
import React, {useState} from "react";
import LoginPage from "./login/LoginPage";

const EventDetailPage = () =>{

    return(
        <>
            <Article/>
            <Footer/>
        </>
    )
}

export default EventDetailPage;