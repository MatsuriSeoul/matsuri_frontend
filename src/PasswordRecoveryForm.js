import React, { useState } from 'react';
import axios from 'axios';


const PasswordRecoveryForm = ({ isOpen, onClose }) => {
    const [identifier, setIdentifier] = useState(''); // 사용자 입력 값(id, 이메일 또는 휴대폰)
    const [recoveryOption, setRecoveryOption] = useState('id'); // 기본값을 id로 설정
    const [error, setError] = useState(''); // 에러 메시지 상태

    const handleTabClick = (value) => {
        setRecoveryOption(value.toLowerCase());
    };

    const handleRecovery = async (event) => {
        event.preventDefault();
        setError(''); // 에러 메시지 초기화
        try {
            const response = await axios.post('/api/recover-password', { identifier, option: recoveryOption });
            alert(`귀하의 비밀번호는 ${response.data.password} 입니다.`);
            onClose();
        } catch (error) {
            console.error('비밀번호 찾기에 실패했습니다.', error);
            if (error.response && error.response.status === 404) {
                setError('해당 정보를 찾을 수 없습니다.');
            } else {
                setError('비밀번호 찾기 요청에 실패했습니다. 다시 시도해 주세요.');
            }
        }
    };

    if (!isOpen) {
        return null; // 모달이 열려있지 않으면 아무것도 렌더링하지 않음
    }

    return (
        <div className="password-recovery-background" onClick={onClose}>
            <div className="find_pw_form" onClick={(e) => e.stopPropagation()}>
                <h2>비밀번호 찾기</h2>
                <form onSubmit={handleRecovery}>
                    <div className="select">
                        <div className={`value ${recoveryOption === 'id' ? 'active' : ''}`}
                             onClick={() => handleTabClick('Id')}>ID
                        </div>
                        <div className={`value ${recoveryOption === 'email' ? 'active' : ''}`}
                             onClick={() => handleTabClick('Email')}>Email
                        </div>
                        <div className={`value ${recoveryOption === 'phone' ? 'active' : ''}`}
                             onClick={() => handleTabClick('Phone')}>Phone
                        </div>
                    </div>
                    <input
                        type={recoveryOption === 'email' ? 'email' : 'tel'}
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder={`${recoveryOption} 입력`}
                        required
                        className="find_pw_input"
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button className="submit-btn" type="submit">비밀번호 찾기</button>
                </form>
            </div>
        </div>
    );
};

export default PasswordRecoveryForm;
