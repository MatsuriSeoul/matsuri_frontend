import React, {useEffect, useState} from "react";
import '../../css/MyPage/changePw.css';
import axios from "axios";
import {useHistory} from "react-router-dom";

const ChangePw = ({ closeModal }) => {

    const history = useHistory();
    const [newPassword, setNewPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState(''); // 비밀번호 확인
    const [passwordError, setPasswordError] = useState(''); // 비밀번호 오류 메시지
    const [currentPassword, setCurrentPassword] = useState('');

    // 비밀번호 확인 로직
    useEffect(() => {
        if (newPassword && userPasswordConfirm) {
            if (newPassword === userPasswordConfirm) {
                setPasswordError(validatePassword(newPassword));  // 조건 검증 추가
            } else {
                setPasswordError('입력한 비밀번호와 일치하지 않습니다.');
            }
        } else {
            setPasswordError('');
        }
    }, [newPassword, userPasswordConfirm]);

    // 비밀번호 조건 검사 함수 (최소 8자, 대문자와 특수문자 포함)
    const validatePassword = (password) => {
        if (password.length < 8) {
            return '비밀번호는 최소 8자 이상이어야 합니다.';
        }
        if (!/[A-Z]/.test(password)) {
            return '비밀번호는 적어도 하나의 대문자를 포함해야 합니다.';
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return '비밀번호는 적어도 하나의 특수문자를 포함해야 합니다.';
        }
        return '';
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
    };
    const handleBackgroundClick = (e) => {
        closeModal(); // 배경 클릭 시 closeModal 호출
    };

    // 비밀번호 변경 처리 함수
    const handlePasswordChange = async () => {
        if (newPassword !== userPasswordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
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
                alert(error.response.data);  // 서버 응답에 따른 메시지 처리
            } else if (error.response && error.response.status === 500) {
                alert('서버 오류로 인해 비밀번호 변경에 실패했습니다.');
            } else {
                alert('비밀번호 변경 중 오류가 발생했습니다.');
            }
        }
    };

    return(
        <div className='changePw-bg' onMouseDown={handleBackgroundClick}>
            <div className='container' onMouseDown={handleContentClick}>
                <h1 className='title'>회원가입</h1>
                <from className='changePw-from'>
                    <div className="inputBox-pw inputBox">
                        <div className="inputBox-headText">현재 비밀번호</div>
                        <input type="password"
                               className="text-field"
                               value={currentPassword}
                               onChange={(e) => setCurrentPassword(e.target.value)}
                               placeholder="현재 비밀번호"></input>
                    </div>
                    <div className="inputBox-newpw inputBox">
                        <div className="inputBox-headText">새 비밀번호</div>
                        <input type="password" placeholder="새 비밀번호" className="text-field"
                               value={newPassword} onChange={(e) =>
                            setNewPassword(e.target.value)} required></input>
                        <div className="warningMsg">*대문자, 특수문자 포함해서 8자리 이상으로 이루어진 비밀번호</div>
                    </div>
                    <div className="inputBox-checkPw inputBox">
                        <input type="password" placeholder="새 비밀번호 확인" className="text-field"
                               value={userPasswordConfirm} onChange={(e) =>
                            setUserPasswordConfirm(e.target.value)} required></input>
                        <p className="warningMsg">{passwordError}</p>
                    </div>
                </from>
                <button className='btn btnOk' onClick={handlePasswordChange}>비밀번호 변경</button>
            </div>

        </div>
    )
}

export default ChangePw;