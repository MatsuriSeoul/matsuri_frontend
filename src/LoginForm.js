import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';
import DecodingInfo from "./DecodingInfo";

const LoginForm = ({ isOpen, onClose, onNavigateToUserIdRecovery, onNavigateToPasswordRecovery }) => {
    const [userId, setUserId] = useState(''); // 사용자 ID
    const [userPassword, setUserPassword] = useState(''); // 사용자 비밀번호
    const [userName, setUserName] = useState('');  //  사용자 이름
    const [error, setError] = useState(''); // 에러 메시지
    const history = useHistory(); // 히스토리
    const { updateAuth } = useAuth(); // 인증 상태 업데이트

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', {
                userId: userId,
                userPassword: userPassword,
            });
            if (response.data && response.data.token) { // 응답에 토큰이 있으면
                const decodedToken = DecodingInfo(response.data.token); // 토큰 디코딩
                const userIdFromToken = decodedToken ? parseInt(decodedToken.sub, 10) : null;

                if (!isNaN(userIdFromToken)) {
                    localStorage.setItem('token', response.data.token); // 로컬스토리지에 토큰 저장
                    localStorage.setItem('userId', userIdFromToken); // 로컬스토리지에 사용자 ID 저장
                    localStorage.setItem('userNick', response.data.userNick); // 로컬 스토리지에 사용자 닉네임 저장
                    localStorage.setItem('userName', response.data.userName); //  로컬 스토리지에 사용자 이름 저장

                    updateAuth({
                        token: response.data.token,
                        userNick: response.data.userNick,
                        userName: response.data.userName,
                        userId: userIdFromToken
                    });
                    // 폼 필드 상태 초기화
                    setUserId('');
                    setUserPassword('');

                    onClose();
                    history.push('/'); // 홈 페이지로 이동
                } else {
                    alert('로그인 정보가 올바르지 않습니다. 다시 확인해주세요.') // 에러 메시지
                }
            } else {
                alert('로그인 정보가 올바르지 않습니다. 다시 확인해주세요.') // 에러 메시지
            }
        } catch (error) {
            alert('로그인에 실패했습니다. 다시 시도해주세요.'); // 에러 메시지
        }
    };

    if (!isOpen) {
        return null;  // 모달이 열려있지 않으면 아무것도 렌더링하지 않음
    }

    return (
        <div className="login-background" onClick={onClose}>
            <div className="login-form" onClick={(e) => e.stopPropagation()}>
                <h2>로그인</h2>
                <form onSubmit={handleLogin}> {/* 폼 제출 핸들러 */}
                    <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder="아이디" required/>
                    <input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} placeholder="비밀번호" required/>
                    <button className="submit-btn" type="submit">로그인</button>
                </form>
                <div className="find_idpw">
                    <button onClick={() => {
                        onNavigateToUserIdRecovery();
                        onClose();
                    }} className="find_id">아이디 찾기
                    </button>
                    <button onClick={() => {
                        onNavigateToPasswordRecovery();
                        onClose();
                    }} className="password-recovery-button">비밀번호를 잊어버리셨나요?
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
