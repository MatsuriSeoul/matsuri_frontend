import React, { useState, useContext } from 'react';
import {Link, useHistory} from 'react-router-dom';
import AuthContext from './AuthContext';
import LogoutButton from './LogoutButton';
import UserIdRecoveryForm from "./UserIdRecoveryForm";
import LoginForm from "./LoginForm";
import PasswordRecoveryForm from "./PasswordRecoveryForm";

function MainNavigation() {
    const { auth } = useContext(AuthContext);

    console.log('현재 로그인 상태:', auth);

    const [isLoginOpen, setIsLoginOpen] = useState(false); // 로그인 모달 상태
    const [isUserIdRecoveryOpen, setIsUserIdRecoveryModalOpen] = useState(false); // 아이디 찾기 모달 상태
    const [isPasswordRecoveryOpen, setIsPasswordRecoveryModalOpen] = useState(false); // 비밀번호 찾기 모달 상태

    const openLoginModal = () => setIsLoginOpen(true);
    const closeLoginModal = () => setIsLoginOpen(false); // 로그인 모달 닫기
    const openUserIdRecoveryModal = () => setIsUserIdRecoveryModalOpen(true); // 아이디 찾기 모달 열기
    const closeUserIdRecoveryModal = () => setIsUserIdRecoveryModalOpen(false); // 아이디 찾기 모달 닫기
    const openPasswordRecoveryModal = () => setIsPasswordRecoveryModalOpen(true); // 비밀번호 찾기 모달 열기
    const closePasswordRecoveryModal = () => setIsPasswordRecoveryModalOpen(false); // 비밀번호 찾기 모달 닫기
    const history = useHistory();

    const navigateToHome = () => {
        history.push('/');  // 메인 페이지로 이동
    };

    return (
        <>
            <img
                src="/img/mainlogo.png"
                alt="Main Logo"
                onClick={navigateToHome} // 이미지 클릭 시 메인 페이지로 이동
                style={{cursor: 'pointer', width: '150px'}} // 원하는 스타일 추가
            />
            <nav className='test-container'>
                <ul className='backend-test'>
                    <li>
                        <Link to="/signUp">회원가입</Link></li>
                    {!auth.token && (
                        <li>
                            <button onClick={openLoginModal}>로그인</button>
                        </li>
                    )}
                    <li><Link to="/event-search">검색</Link></li>
                    <li><Link to="/inquiry-list">문의사항 리스트</Link></li>
                    <li><Link to="/event-fetch">api 테스트</Link></li>
                    <li><Link to="/api/notice">공지사항 페이지</Link></li>
                    <li><Link to="/category">카테고리 선택</Link></li>
                    <li><Link to="/region-select">지역 선택</Link></li>
                    <li><Link to="/hotspot">핫스팟</Link></li>
                    <li><Link to="/free-paid-events">무료 유료</Link></li>
                    <li><Link to="/scheduled-events">개최예정중인행사</Link></li>
                    <li><Link to="/api/openai/prompt">AI 챗봇</Link></li>
                    {auth.token && (
                        <>
                            <li>
                                <Link to="/userProfile">유저 프로필</Link>
                            </li>

                            <li>
                                <LogoutButton/>
                            </li>
                        </>
                    )}
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
                </ul>
                <ul className='frontend-test'>
                    <li><Link to={'/mainpage'}>mainpage</Link></li>
                    <li><Link to={'/areaPage/서울'}>areaPage</Link></li>
                    <li><Link to={'/hotPlacePage/서울'}>hotPlacePage</Link></li>
                    <li><Link to={'/themePage'}>themePage</Link></li>
                    <li><Link to={'/noticePage'}>noticePage</Link></li>
                    <li><Link to={'/selectSearchPage'}>selectSearchPage</Link></li>
                    <li><Link to={'/freeAndPaidPage'}>freeAndPaidPage</Link></li>
                </ul>
            </nav>
        </>

    );
}

export default MainNavigation;
