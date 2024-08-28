import React, { useState } from 'react';
import axios from 'axios';

const UserIdRecoveryForm = ({ isOpen, onClose }) => {
    const [identities, setIdentities] = useState(''); // 사용자 입력 값 (전화번호 또는 이메일)
    const [name, setName] = useState(''); // 사용자 이름
    const [verificationCode, setVerificationCode] = useState(''); // 입력받은 인증번호
    const [sentCode, setSentCode] = useState(false); // 인증번호가 전송되었는지 여부
    const [recoveryOption, setRecoveryOption] = useState(''); // 기본 값 설정
    const [error, setError] = useState(''); // 에러 상태
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [verified, setVerified] = useState(false); // 인증 성공 여부

    const handleTapClick = (value) => {
        setRecoveryOption(value);
        setSentCode(false); // 인증번호 전송 상태 초기화
        setVerified(false); // 인증 성공 상태 초기화
        setError('');
    };

    const handleSendCode = async (e) => {
        e.preventDefault();
        setLoading(true); // 로딩 상태 시작

        console.log('name:', name);
        console.log('identities:', identities);
        console.log('recoveryOption:', recoveryOption);

        try {
            const data = { name, identifier: identities, option: recoveryOption };

            console.log('Data to be sent:', data); // 데이터 확인

            await axios.post('/api/user-recovery/send-verification-code', data);

            setSentCode(true);
            alert(`인증번호가 ${recoveryOption === 'email' ? '이메일' : '문자'}로 발송되었습니다.`);
        } catch (error) {
            setError('인증번호 발송에 실패했습니다. 회원가입시 작성한 사용자 이름과 이메일 혹은 전화번호가 일치해야 합니다.');
            console.error('Error:', error); // 에러 메시지 확인
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setLoading(true); // 로딩 상태 시작

        try {
            const data = { identifier: identities, option: recoveryOption, code: verificationCode };
            const response = await axios.post('/api/user-recovery/verify-code', data);

            if (response.status === 200) {
                setVerified(true);
                alert('인증에 성공했습니다. 아이디를 확인해 주세요.');
            } else {
                setError('인증번호가 일치하지 않습니다.');
            }
        } catch (error) {
            setError('인증번호 검증에 실패했습니다.');
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };

    const handleRecovery = async (e) => {
        e.preventDefault();
        setLoading(true); // 로딩 상태 시작

        try {
            const data = { name, identifier: identities, option: recoveryOption, code: verificationCode };
            console.log("아이디 복구를 위한 데이터:", data); // 데이터 확인
            const response = await axios.post('/api/user-recovery/recover-userid', data);
            console.log("서버 응답 데이터:", response.data); // 응답 데이터 확인
            alert(`귀하의 ID는 ${response.data.userId} 입니다.`);
            // 상태 초기화
            resetState();
        } catch (error) {
            console.error('아이디 찾기에 실패했습니다.', error); // 에러 로그 추가
            if (error.response && error.response.status === 404) {
                setError('해당 아이디를 찾을 수 없습니다.');
            } else {
                setError('아이디 찾기 요청에 실패했습니다.');
            }
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };

    const resetState = () => {
        setIdentities('');
        setVerificationCode('');
        setName('');
        setSentCode(false);
        setVerified(false);
        setError('');
        setLoading(false);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="userid-recovery-background" onClick={onClose}>
            <div className="find_id_form" onClick={(e) => e.stopPropagation()}>
                <h2>아이디 찾기</h2>
                {!sentCode ? (
                    <form onSubmit={handleSendCode}>
                        <div className="select">
                            <div
                                className={`value ${recoveryOption === 'email' ? 'active' : ''}`}
                                onClick={() => handleTapClick('email')}
                            >
                                Email
                            </div>
                            <div
                                className={`value ${recoveryOption === 'phone' ? 'active' : ''}`}
                                onClick={() => handleTapClick('phone')}
                            >
                                Phone
                            </div>
                        </div>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="이름 입력"
                            required
                            className="find_id_input"
                        />
                        <input
                            type={recoveryOption === 'email' ? 'email' : 'tel'}
                            value={identities}
                            onChange={(e) => setIdentities(e.target.value)}
                            placeholder={`${recoveryOption} 입력`}
                            required
                            className="find_id_input"
                        />
                        {error && <p className="error-message">{error}</p>}
                        <button className="submit-btn" type="submit" disabled={loading}>
                            {loading ? '발송 중...' : '인증번호 발송'}
                        </button>
                    </form>
                ) : !verified ? (
                    <form onSubmit={handleVerifyCode}>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            placeholder="인증번호 입력"
                            required
                            className="find_id_input"
                        />
                        {error && <p className="error-message">{error}</p>}
                        <button className="submit-btn" type="submit" disabled={loading}>
                            {loading ? '확인 중...' : '인증번호 확인'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRecovery}>
                        <button className="submit-btn" type="submit" disabled={loading}>
                            {loading ? '확인 중...' : '아이디 찾기'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserIdRecoveryForm;
