import React, { useState } from "react";

const LoginForm = () => {

    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    };

    // const openModal = () => {
    //     setIsModalOpen(true);
    // };
    //
    // const closeModal = () => {
    //     setIsModalOpen(false);
    // };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    // const handleOverlayClick = (e) => {
    //     if (e.target.classList.contains('modal-overlay')) {
    //         closeModal();
    //     }
    // };


    return(
        <form className='login-form'>
            <div className="logo">
                대한민국 <b>핫</b>!스팟
            </div>
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
                                src={isChecked ? "img/icon/checked-icon.png" : "img/icon/unchecked-icon.png"}
                                alt="Toggle Icon"
                            />
                        </div>
                        <div className="autoLoginText">로그인 상태 유지</div>
                    </div>
                    <button className="loginBtn">로그인</button>
                    <div className="wall">
                        <div></div>
                        <p>또는</p>
                        <div></div>
                    </div>
                    <div className="socialLogin">
                        <img className="socialLogin-btn" src="/img/icon/kakao-btn.png">
                        </img>
                        <img className="socialLogin-btn" src="/img/icon/naver-btn.png">
                        </img>
                        <img className="socialLogin-btn" src="/img/icon/google-btn.png">
                        </img>
                    </div>
                </div>

            </div>
        </form>
    );
};

export default LoginForm;

