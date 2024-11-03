import React, {useState} from "react";
import axios from "axios";


const SearchPw = ({ closeModal }) => {
    const [findType, setFindType ] = useState('phone');
    const [checkNum, setCheckNum ] = useState(false);

    const ChangeFindType = (type) =>{
        setFindType(type);
        setCodeSent(false); // 탭 변경 시 인증번호 전송 상태 초기화
        setVerified(false); // 인증번호 검증 상태 초기화
        setUserId(''); // 사용자 ID 초기화
        setIdentifier(''); // 이메일 또는 전화번호 초기화
        setVerificationCode(''); // 인증번호 초기화
    }


    const [userId, setUserId] = useState(''); // 사용자 아이디
    const [identifier, setIdentifier] = useState(''); // 이메일 또는 전화번호
    const [verificationCode, setVerificationCode] = useState(''); // 인증번호 입력값
    const [codeSent, setCodeSent] = useState(false); // 인증번호 전송 여부 확인
    const [verified, setVerified] = useState(false); // 인증번호 검증 여부 확인

    // 상태 초기화 함수
    const resetForm = () => {
        setUserId('');
        setIdentifier('');
        setVerificationCode('');
        setCodeSent(false);
        setVerified(false);
    };

    // 인증번호 전송 요청
    const handleSendCode = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/password-recovery/send-verification-code', {
                userId,  //  유저 아이디
                identifier, // 이메일 또는 전화번호
                option: findType // 이메일 또는 전화번호 옵션
            });
            alert(`인증번호가 ${findType === 'email' ? '이메일' : '전화번호'}로 전송되었습니다.`);
            setCodeSent(true); // 인증번호 전송 완료
        } catch (error) {
            setCheckNum(true);
            alert('인증번호 전송에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    // 인증번호 검증 요청
    const handleVerifyCode = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/password-recovery/verify-code', {
                identifier,
                option: findType,
                code: verificationCode
            });

            if (response.status === 200) {
                alert('인증에 성공했습니다.');
                setVerified(true); // 인증 성공 상태
            } else {
                alert('인증번호가 일치하지 않습니다.');
            }
        } catch (error) {
            alert('인증번호 검증에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    // 비밀번호 재설정 요청
    const handleRecovery = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('/api/password-recovery/recover-password', {
                userId,        // 사용자 ID
                identifier,    // 이메일 또는 전화번호
                option: findType,
                code: verificationCode // 인증번호 추가
            });

            alert(`귀하의 임시 비밀번호는 ${response.data.password} 입니다.`);
            resetForm(); // 폼 초기화
            closeModal();
        } catch (error) {
            alert('비밀번호 찾기 요청에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    return (
        <form className='findPw-form' onSubmit={handleRecovery}>
            <h1 className='title'>비밀번호 찾기</h1>
            <div className='tabbox'>
                <div className={`topBox ${findType === 'phone' ? 'active' : ''}`}
                     onClick={() => ChangeFindType('phone')}>
                    <div className='tab'>Phone</div>
                </div>
                <div className={`topBox ${findType === 'email' ? 'active' : ''}`}
                     onClick={() => ChangeFindType('email')}>
                    <div className='tab'>Email</div>
                </div>
            </div>
            <div className="bottomBox">
                <div className="InputBox">
                    <input type="text"
                           value={userId}
                           onChange={(e) => setUserId(e.target.value)}
                           placeholder="아이디 입력"
                           required
                           className="username input-info"></input>
                    <div className="usernumber-box">
                        {findType === 'email' ? (
                            <input type="Email" placeholder={`${findType} 입력`}
                                   value={identifier}
                                   onChange={(e) => setIdentifier(e.target.value)}
                                   required
                                   className="usernumber input-info"></input>
                        ) : (
                            <input type="tel" placeholder={`${findType} 입력`}
                                   value={identifier}
                                   onChange={(e) => setIdentifier(e.target.value)}
                                   required
                                   className="usernumber input-info"></input>
                        )}
                        <button type='submit' className='check-btn'
                                onClick={handleSendCode}>인증번호 받기
                        </button>
                    </div>


                    <div className='check-number-box'>
                        <input type="text"
                               value={verificationCode}
                               onChange={(e) => setVerificationCode(e.target.value)}
                               placeholder="인증번호 입력"
                               required
                               className="check-number"></input>
                        <button type='submit' className='check-btn'
                                onClick={handleVerifyCode}>본인확인
                        </button>
                    </div>
                </div>
                {checkNum && <p className='error'>인증번호 발송에 실패했습니다.<br/>입력한 정보를 다시 확인해주세요.</p>}
                <button type='submit' className="findBtn">확인</button>
            </div>
        </form>
    )
}

export default SearchPw;