import React, { useState } from "react";
import SignUpPage from "./SignUpPage";
import '../../css/login/LoginPage.css';

const LoginPage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    };
    
    return(
        <from className="login-container">
            <div className="logo"
                 style={{
                     backgroundImage: `url(/img/icon/login-logo.png)`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                 }}
            ></div>
            <div className="login-wrapper">
                <div className="topBox">
                    <div className="loginIcon"
                         style={{
                             backgroundImage: `url(/img/icon/login.png)`,
                             backgroundSize: 'cover',
                             backgroundPosition: 'center',
                         }}></div>
                    <div className="loginText">ID 로그인</div>
                </div>
                <div className="bottomBox">
                    <div className="InputBox">
                        <input type="text" placeholder="아이디" className="login-id"></input>
                        <hr></hr>
                        <input type="password" placeholder="비밀번호" className="login-pw"></input>
                    </div>
                    <div className="autoLogin">
                        <div className="autoLoginCheckBtn" onClick={toggleCheck}>
                            <img
                                src={isChecked ? "img/icon/checked-icon.png" : "img/icon/unchecked-icon.png"  }
                                alt="Toggle Icon"
                            />
                        </div>
                        <div className="autoLoginText">로그인 상태 유지</div>
                    </div>
                    <button className="loginBtn">로그인</button>
                </div>
            </div>
            <div className="helpBtn-wrapper">
                <div className="findPw">비밀번호 찾기</div>
                <div className="findId">아이디 찾기</div>
                <div className="signUp" onClick={openModal}>회원가입</div>
            </div>
        </from>
    );
};

export default LoginPage;
