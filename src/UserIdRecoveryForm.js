import React, {useState} from 'react';
import axios from 'axios';

const UserIdRecoveryForm = ({isOpen, onClose}) => {
    const [identities, setIdentities] = useState(''); // 사용자 입력 값 email
    const [recoveryOption, setRecoveryOption] = useState('email'); // 기본 값 설정
    const [error, setError] = useState(''); // 에러 상태

    const handleTapClick = (value) => {
        setRecoveryOption(value);
    }

    const handleRecovery = async (e) => {
        e.preventDefault();
        try {
            const data = {identifier: identities, option: recoveryOption};
            const response = await axios.post('/api/recovery-userid', data);
            alert(`귀하의 ID는 ${response.data.userId} 입니다.`);
            onClose();
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError('해당 아이디를 찾을 수 없습니다.');
            } else {
                setError('아이디 찾기 요청에 실패했습니다.');
            }
        }
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="userid-recovery-background" onClick={onClose}>
            <div className="find_id_form" onClick={(e) => e.stopPropagation()}>
                <h2>아이디 찾기</h2>
                <form onSubmit={handleRecovery}>
                    <div className="select">
                        <div className={`value ${recoveryOption === 'email' ? 'active' : ''}`}
                             onClick={() => handleTapClick('email')}>Email
                        </div>
                        <div className={`value ${recoveryOption === 'phone' ? 'active' : ''}`}
                             onClick={() => handleTapClick('phone')}>Phone
                        </div>
                    </div>
                    <input
                        type={recoveryOption === 'email' ? 'email' : 'tel'}
                        value={identities}
                        onChange={(e) => setIdentities(e.target.value)}
                        placeholder={`${recoveryOption} 입력`}
                        required
                        className="find_id_input"
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button className="submit-btn" type="submit">아이디 찾기</button>
                </form>
            </div>
        </div>
    );
};

export default UserIdRecoveryForm;
