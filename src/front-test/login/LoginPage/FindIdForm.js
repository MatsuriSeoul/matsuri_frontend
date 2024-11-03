import React, { useState } from "react";
import axios from "axios";

const FindIdForm = ({ closeModal }) =>{
    const [findType, setFindType ] = useState('phone');
    const [checkNum, setCheckNum ] = useState(false);

    const ChangeFindType = (type) =>{
        setFindType(type);
        setSentCode(false); // 인증번호 전송 상태 초기화
        setVerified(false); // 인증 성공 상태 초기화
    }

    const [identities, setIdentities] = useState(''); // 사용자 입력 값 (전화번호 또는 이메일)
    const [name, setName] = useState(''); // 사용자 이름
    const [verificationCode, setVerificationCode] = useState(''); // 입력받은 인증번호
    const [sentCode, setSentCode] = useState(false); // 인증번호가 전송되었는지 여부
    const [error, setError] = useState(''); // 에러 상태
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [verified, setVerified] = useState(false); // 인증 성공 여부


    const handleSendCode = async (e) => {
        e.preventDefault();
        setLoading(true); // 로딩 상태 시작


        try {
            const data = { name, identifier: identities, option: findType };


            await axios.post('/api/user-recovery/send-verification-code', data);

            setSentCode(true);
            alert(`인증번호가 ${findType === 'email' ? '이메일' : '문자'}로 발송되었습니다.`);
            closeModal();
        } catch (error) {
            setError('가입된 정보가 없습니다.');
            setCheckNum(true);
        } finally {
            setLoading(false); // 로딩 상태 종료
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setLoading(true); // 로딩 상태 시작

        try {
            const data = { identifier: identities, option: findType, code: verificationCode };
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
            const data = { name, identifier: identities, option: findType, code: verificationCode };

            const response = await axios.post('/api/user-recovery/recover-userid', data);

            alert(`귀하의 ID는 ${response.data.userId} 입니다.`);
            // 상태 초기화
            resetState();
            closeModal();
        } catch (error) {

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

    return(
        <form className='findId-form' onSubmit={handleRecovery}>
            <h1 className='title'>아이디 찾기</h1>
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
                    <input type="text" placeholder="이름 입력" className="username input-info"
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                           required
                    ></input>
                    <div className='usernumber-box'>
                        {findType === 'email' ? (
                            <input placeholder={`${findType} 입력`} className="usernumber input-info"
                                   type="email"
                                   value={identities}
                                   onChange={(e) => setIdentities(e.target.value)}
                                   required
                            ></input>
                        ) : (
                            <input placeholder={`${findType} 입력`} className="usernumber input-info"
                                   type="tel"
                                   value={identities}
                                   onChange={(e) => setIdentities(e.target.value)}
                                   required
                            ></input>
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
                {checkNum && <p className='error' >{error}</p>}
                <button type='submit' className="findBtn">확인</button>
            </div>
        </form>
    )
}

export default FindIdForm;