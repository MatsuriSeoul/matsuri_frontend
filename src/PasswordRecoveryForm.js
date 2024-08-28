import React, { useState } from 'react';
import axios from 'axios';

const PasswordRecoveryForm = ({ isOpen, onClose }) => {
    const [userId, setUserId] = useState(''); // 사용자 아이디
    const [identifier, setIdentifier] = useState(''); // 이메일 또는 전화번호
    const [recoveryOption, setRecoveryOption] = useState('email'); // 기본값을 email로 설정
    const [verificationCode, setVerificationCode] = useState(''); // 인증번호 입력값
    const [codeSent, setCodeSent] = useState(false); // 인증번호 전송 여부 확인
    const [verified, setVerified] = useState(false); // 인증번호 검증 여부 확인
    const [error, setError] = useState(''); // 에러 메시지 상태

    // 탭 변경
    const handleTabClick = (value) => {
        setRecoveryOption(value.toLowerCase());
        setCodeSent(false); // 탭 변경 시 인증번호 전송 상태 초기화
        setVerified(false); // 인증번호 검증 상태 초기화
        setError('');
        setUserId(''); // 사용자 ID 초기화
        setIdentifier(''); // 이메일 또는 전화번호 초기화
        setVerificationCode(''); // 인증번호 초기화
    };

    // 상태 초기화 함수
    const resetForm = () => {
        setUserId('');
        setIdentifier('');
        setVerificationCode('');
        setCodeSent(false);
        setVerified(false);
        setError('');
    };

    // 인증번호 전송 요청
    const handleSendCode = async (event) => {
        event.preventDefault();
        setError(''); // 에러 초기화

        try {
            const response = await axios.post('/api/password-recovery/send-verification-code', {
                userId,  //  유저 아이디
                identifier, // 이메일 또는 전화번호
                option: recoveryOption // 이메일 또는 전화번호 옵션
            });
            alert(`인증번호가 ${recoveryOption === 'email' ? '이메일' : '전화번호'}로 전송되었습니다.`);
            setCodeSent(true); // 인증번호 전송 완료
        } catch (error) {
            console.error('인증번호 전송에 실패했습니다.', error);
            setError('인증번호 전송에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    // 인증번호 검증 요청
    const handleVerifyCode = async (event) => {
        event.preventDefault();
        setError(''); // 에러 메시지 초기화

        try {
            const response = await axios.post('/api/password-recovery/verify-code', {
                identifier,
                option: recoveryOption,
                code: verificationCode
            });

            if (response.status === 200) {
                alert('인증에 성공했습니다.');
                setVerified(true); // 인증 성공 상태
            } else {
                setError('인증번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('인증번호 검증에 실패했습니다.', error);
            setError('인증번호 검증에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    // 비밀번호 재설정 요청
    const handleRecovery = async (event) => {
        event.preventDefault();
        setError(''); // 에러 메시지 초기화

        try {
            const response = await axios.post('/api/password-recovery/recover-password', {
                userId,        // 사용자 ID
                identifier,    // 이메일 또는 전화번호
                option: recoveryOption,
                code: verificationCode // 인증번호 추가
            });

            alert(`귀하의 임시 비밀번호는 ${response.data.password} 입니다.`);
            resetForm(); // 폼 초기화
            onClose();   // 모달 닫기
        } catch (error) {
            console.error('비밀번호 찾기에 실패했습니다.', error);
            setError('비밀번호 찾기 요청에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    if (!isOpen) {
        return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음
    }

    return (
        <div className="password-recovery-background" onClick={onClose}>
            <div className="find_pw_form" onClick={(e) => e.stopPropagation()}>
                <h2>비밀번호 찾기</h2>
                {!codeSent ? (
                    <form onSubmit={handleSendCode}>
                        <div className="select">
                            <div
                                className={`value ${recoveryOption === 'email' ? 'active' : ''}`}
                                onClick={() => handleTabClick('Email')}
                            >
                                Email
                            </div>
                            <div
                                className={`value ${recoveryOption === 'phone' ? 'active' : ''}`}
                                onClick={() => handleTabClick('Phone')}
                            >
                                Phone
                            </div>
                        </div>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            placeholder="아이디 입력"
                            required
                            className="find_pw_input"
                            disabled={verified} // 인증 후 필드 비활성화
                        />
                        <input
                            type={recoveryOption === 'email' ? 'email' : 'tel'}
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            placeholder={`${recoveryOption === 'email' ? '이메일' : '전화번호'} 입력`}
                            required
                            className="find_pw_input"
                            disabled={verified} // 인증 후 필드 비활성화
                        />
                        {error && <p className="error-message">{error}</p>}
                        <button className="submit-btn" type="submit">인증번호 전송</button>
                    </form>
                ) : !verified ? (
                    <form onSubmit={handleVerifyCode}>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="인증번호 입력"
                            required
                            className="find_pw_input"
                        />
                        {error && <p className="error-message">{error}</p>}
                        <button className="submit-btn" type="submit">인증번호 확인</button>
                    </form>
                ) : (
                    <form onSubmit={handleRecovery}>
                        <button className="submit-btn" type="submit">비밀번호 찾기</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default PasswordRecoveryForm;
