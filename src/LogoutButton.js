import React, { useContext } from 'react';
import AuthContext from './AuthContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function LogoutButton() {
    const { auth, updateAuth } = useContext(AuthContext);
    const history = useHistory();

    const handleLogout = async () => {
        // 서버에 로그아웃 이벤트를 알림
        try {
            await axios.post('/api/logout', { userNick: auth.userNick, userId: auth.userId });
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }

        console.log(`닉네임 : ${auth.userNick} 님이 로그아웃 하였습니다.`);

        // 로컬 스토리지에서 인증 정보 제거
        localStorage.removeItem('token');
        localStorage.removeItem('userNick');
        localStorage.removeItem('userId');

        // Auth 상태 업데이트
        updateAuth({ token: null, userNick: null, userId: null });

        alert('로그아웃 하였습니다.');
        history.push('/');
    };

    return (
        <button onClick={handleLogout}>로그아웃</button>
    );
}

export default LogoutButton;
