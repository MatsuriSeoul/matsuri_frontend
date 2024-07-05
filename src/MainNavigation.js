import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from './AuthContext';
import LogoutButton from './LogoutButton';
import UserIdRecoveryForm from "./UserIdRecoveryForm";
import LoginForm from "./LoginForm";
import PasswordRecoveryForm from "./PasswordRecoveryForm";

function MainNavigation() {
    const { auth } = useContext(AuthContext);
    const [isLoginOpen, setIsLoginOpen] = useState(false); // 로그인 모달 상태
    const [isUserIdRecoveryOpen, setIsUserIdRecoveryModalOpen] = useState(false); // 아이디 찾기 모달 상태
    const [isPasswordRecoveryOpen, setIsPasswordRecoveryModalOpen] = useState(false); // 비밀번호 찾기 모달 상태

    const openLoginModal = () => setIsLoginOpen(true);
    const closeLoginModal = () => setIsLoginOpen(false); // 로그인 모달 닫기
    const openUserIdRecoveryModal = () => setIsUserIdRecoveryModalOpen(true); // 아이디 찾기 모달 열기
    const closeUserIdRecoveryModal = () => setIsUserIdRecoveryModalOpen(false); // 아이디 찾기 모달 닫기
    const openPasswordRecoveryModal = () => setIsPasswordRecoveryModalOpen(true); // 비밀번호 찾기 모달 열기
    const closePasswordRecoveryModal = () => setIsPasswordRecoveryModalOpen(false); // 비밀번호 찾기 모달 닫기

    return (
        <nav>
            <ul>
                {!auth.token ? (
                    <>
                        <li><Link to="/signUp">회원가입</Link></li>
                        <li>
                            <button onClick={openLoginModal}>로그인</button>
                        </li>
                        <li><Link to ="/event-search">검색</Link></li>
                        <LoginForm
                            isOpen={isLoginOpen}
                            onClose={closeLoginModal}
                            onNavigateToUserIdRecovery={openUserIdRecoveryModal}
                            onNavigateToPasswordRecovery={openPasswordRecoveryModal}
                        />
                        <UserIdRecoveryForm
                            isOpen={isUserIdRecoveryOpen}
                            onClose={closeUserIdRecoveryModal}
                        />
                        <PasswordRecoveryForm
                            isOpen={isPasswordRecoveryOpen}
                            onClose={closePasswordRecoveryModal}
                        />
                    </>
                ) : (
                    <li>
                        <LogoutButton />
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default MainNavigation;
