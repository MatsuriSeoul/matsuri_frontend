import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function PasswordChange() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const history = useHistory();

    // 비밀번호 입력 검증 함수
    const validatePasswords = () => {
        if (newPassword !== confirmNewPassword) {
            setMessage('새 비밀번호가 일치하지 않습니다.');
            return false;
        }
        return true;
    };

    // 에러 메시지 처리 함수
    const handleErrorMessage = (errorMessage) => {
        if (errorMessage.includes('현재 비밀번호가 일치하지 않습니다')) {
            setMessage('현재 비밀번호가 일치하지 않습니다.');
        } else if (errorMessage.includes('최근 3개월 내에 사용한 비밀번호는 사용할 수 없습니다')) {
            setMessage('최근 3개월 내에 사용한 비밀번호는 사용할 수 없습니다.');
        } else if (errorMessage.includes('비밀번호는 최소 8자 이상이어야 합니다')) {
            setMessage('비밀번호는 최소 8자 이상이어야 합니다.');
        } else if (errorMessage.includes('비밀번호는 적어도 하나의 대문자를 포함해야 합니다')) {
            setMessage('비밀번호는 적어도 하나의 대문자를 포함해야 합니다.');
        } else if (errorMessage.includes('비밀번호는 적어도 하나의 특수문자를 포함해야 합니다')) {
            setMessage('비밀번호는 적어도 하나의 특수문자를 포함해야 합니다.');
        } else {
            setMessage(errorMessage); // 그 외의 메시지는 그대로 표시
        }
    };

    // 비밀번호 변경 처리 함수
    const handlePasswordChange = async () => {
        if (!validatePasswords()) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/users/change-password', {
                currentPassword,
                newPassword
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // 성공 응답 처리
            if (response.status === 200) {
                alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.');

                // 세션 초기화
                localStorage.clear();

                // 메인 페이지로 리다이렉트
                history.push('/');
            }
        } catch (error) {
            console.error('비밀번호 변경 중 오류 발생:', error); // 오류 로그 확인

            if (error.response && error.response.status === 400) {
                handleErrorMessage(error.response.data);  // 서버 응답에 따른 메시지 처리
            } else if (error.response && error.response.status === 500) {
                setMessage('서버 오류로 인해 비밀번호 변경에 실패했습니다.');
            } else {
                setMessage('비밀번호 변경 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div>
            <h2>비밀번호 변경</h2>
            <div>
                <label>현재 비밀번호:</label>
                <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="현재 비밀번호"
                />
            </div>
            <div>
                <label>새 비밀번호:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="새 비밀번호"
                />
            </div>
            <div>
                <label>새 비밀번호 확인:</label>
                <input
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="새 비밀번호 확인"
                />
            </div>
            {message && <p>{message}</p>}
            <button onClick={handlePasswordChange}>비밀번호 변경</button>
        </div>
    );
}

export default PasswordChange;
