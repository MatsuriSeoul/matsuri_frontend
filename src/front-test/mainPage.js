import Header from "./layout/header";
import Banner from "./main/banner";
import Section1 from "./main/section1";
import Footer from "./layout/footer";

import "../css/main/banner.css";
import "../css/main/section1.css"
import "../css/main/mainpage.css";
import React, { useState } from "react";
import LoginPage from "./login/LoginPage";

const MainPage = () =>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('login'); // 'login', 'findId', 'findPw', 'signUp'

    const toggleModal = () => {
        setModalContent('login');
        setIsModalOpen(!isModalOpen);
    };

    const openModal = (content) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    return(
        <div className='main-page'>
            <Header toggleModal={toggleModal} />
            <Banner/>
            <Section1/>
            <Footer/>
            {isModalOpen && (
                <LoginPage content={modalContent}
                           closeModal={() => setIsModalOpen(false)}
                           openModal={openModal}
                />
            )}
        </div>
    )
}
export default MainPage;