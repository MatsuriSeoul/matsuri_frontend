
import SignUpPage from "./LoginPage/SignUpPage";

import '../../css/login/LoginPage.css';
import '../../css/login/SignUpPage.css';
import '../../css/login/SearchPw.css';
import '../../css/login/FindIdForm.css';
import LoginForm from "./LoginPage/LoginForm";
import SearchPw from "./LoginPage/SearchPw";
import FindIdForm from "./LoginPage/FindIdForm";
import {useEffect} from "react";

const LoginPage = ({ content, closeModal, openModal }) => {

    const handleContentClick = (e) => {
        e.stopPropagation();
    };
    const handleBackgroundClick = (e) => {
        closeModal(); // 배경 클릭 시 closeModal 호출
    };

    // ESC 키를 눌렀을 때 closeModal() 호출
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        };

        // keydown 이벤트 리스너 추가
        window.addEventListener('keydown', handleKeyDown);

        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [closeModal]);

    return(
        <div className="login-background" onMouseDown={handleBackgroundClick}>
            <div className="login-container" onMouseDown={handleContentClick}>
                <div className='close-btn' onClick={closeModal}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                         fill="#5f6368">
                        <path
                            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                    </svg>
                </div>
                {content === 'login' && <LoginForm closeModal={closeModal}/>}
                {content === 'findId' && <FindIdForm closeModal={closeModal}/>}
                {content === 'findPw' && <SearchPw closeModal={closeModal}/>}
                {content === 'signUp' && <SignUpPage closeModal={closeModal}/>}
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

