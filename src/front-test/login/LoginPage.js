import React, { useState } from "react";
import SignUpPage from "./LoginPage/SignUpPage";

import '../../css/login/LoginPage.css';
import '../../css/login/SignUpPage.css';
import '../../css/login/SearchPw.css';
import '../../css/login/FindIdForm.css';
import LoginForm from "./LoginPage/LoginForm";
import SearchPw from "./LoginPage/SearchPw";
import FindIdForm from "./LoginPage/FindIdForm";

const LoginPage = ({ content, closeModal, openModal }) => {

    const handleContentClick = (e) => {
        e.stopPropagation();
    };


    return(
        <div className="login-background" onClick={closeModal}>
            <div className="login-container" onClick={handleContentClick}>
                {content === 'login' && <LoginForm/>}
                {content === 'findId' && <FindIdForm/>}
                {content === 'findPw' && <SearchPw/>}
                {content === 'signUp' && <SignUpPage/>}
                {content === 'login' && (
                    <div className="helpBtn-wrapper">
                        <div className="findPw" onClick={() => openModal('findPw')}>비밀번호 찾기</div>
                        <div className="findId" onClick={() => openModal('findId')}>아이디 찾기</div>
                        <div className="signUp" onClick={() => openModal('signUp')}>회원가입</div>
                    </div>
                )}


            </div>
        </div>
    );
};

export default LoginPage;

