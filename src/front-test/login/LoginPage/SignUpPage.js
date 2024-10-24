import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import axios from "axios";
import {useHistory} from "react-router-dom";

const SignUpPage = () => {
    //backend
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState(''); // 비밀번호 확인
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState(''); // 비밀번호 오류 메시지
    const [isIdValid, setIsIdValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const history = useHistory();

    // 전화번호 형식 검사 함수 (숫자 10~11자리만 허용)
    const validatePhone = (phone) => {
        const phonePattern = /^010\d{8}$/;
        return phonePattern.test(phone);
    };

    // 이메일 형식 검사 함수
    const validateEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.(com|net)$/;
        return emailPattern.test(email);
    };

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

    // 비밀번호 확인 로직
    useEffect(() => {
        if (userPassword && userPasswordConfirm) {
            if (userPassword === userPasswordConfirm) {
                setPasswordError(validatePassword(userPassword));  // 조건 검증 추가
            } else {
                setPasswordError('입력한 비밀번호와 일치하지 않습니다.');
            }
        } else {
            setPasswordError('');
        }
    }, [userPassword, userPasswordConfirm]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // 필드별 유효성 검사를 수행하여 해당 필드가 유효하지 않으면 경고 메시지를 표시
        if (!userId) {
            alert('아이디를 입력해주세요.');
            return;
        }
        if (!isIdValid) {
            alert('아이디 중복 검사를 완료해주세요.');
            return;
        }
        if (!userName) {
            alert('이름을 입력해주세요.');
            return;
        }
        if (!userEmail) {
            alert('이메일을 입력해주세요.');
            return;
        }
        if (!validateEmail(userEmail)) {
            alert('이메일 형식이 잘못되었습니다. ooo@ooo.com 또는 ooo@ooo.net 형식으로 입력해주세요.');
            return;
        }
        if (!isEmailValid) {
            alert('이메일 중복 검사를 완료해주세요.');
            return;
        }
        if (!userPhone) {
            alert('휴대폰 번호를 입력해주세요.');
            return;
        }
        if (!validatePhone(userPhone)) {
            alert('휴대폰 번호 형식이 잘못되었습니다. 010XXXXXXXX 형식으로 입력해주세요.');
            return;
        }
        // if (!isPhoneValid) {
        //     alert('휴대폰 인증을 완료해주세요.');
        //     return;
        // }
        // if (!codeSent || !isVerified) {
        //     alert('본인 인증을 완료해주세요.');
        //     return;
        // }
        if (!userPassword) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        if (userPassword !== userPasswordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (!yearselected) {
            alert('생일을 입력해주세요.');
            return;
        }
        if (yearselected.value > 2011) {
            alert('만 14세 미만은 가입할 수 없습니다.');
            return;
        }

        const userInfo = {
            userId,
            userName,
            userEmail,
            userPhone,
            userPassword
        };

        try {
            const response = await axios.post('/api/users/save', userInfo);
            alert('회원가입 성공');
            history.push('/');
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else {
                alert('회원가입 오류');
            }
        }
    };

    const checkIdAvailability = async () => {
        if (userId.trim() === '') {
            alert('아이디를 입력하세요');
            setIsIdValid(false);
            return;
        }
        try {
            const response = await axios.get(`/api/users/check-id/${userId}`);
            if (response.data.exists) {
                alert('이미 사용 중인 아이디입니다.');
                setIsIdValid(false);
            } else {
                alert('사용 가능한 아이디입니다.');
                setIsIdValid(true);
            }
        } catch (error) {
            alert('아이디 중복 검사 오류');
            setIsIdValid(false);
        }
    };

    const checkEmailAvailability = async () => {
        if (userEmail.trim() === '') {
            alert('이메일을 입력하세요.');
            setIsEmailValid(false);
            return;
        }
        if (!validateEmail(userEmail)) {
            alert('이메일 형식이 잘못되었습니다.');
            setIsEmailValid(false);
            return;
        }
        try {
            const response = await axios.get(`/api/users/check-email/${userEmail}`);
            if (response.data.exists) {
                alert('이미 사용 중인 이메일입니다.');
                setIsEmailValid(false);
            } else {
                alert('사용 가능한 이메일입니다.');
                setIsEmailValid(true);
            }
        } catch (error) {
            alert('이메일 중복 검사 오류');
            setIsEmailValid(false);
        }
    };

    const sendVerificationCode = async () => {
        try {
            const identifier = userPhone;
            const type = 'phone';
            await axios.post('/api/users/send-verification-code', { identifier, type });
            setCodeSent(true);
            alert(`휴대폰로 인증번호가 발송되었습니다.`);
        } catch (error) {
            alert('인증번호 발송 오류');
        }
    };

    const verifyCode = async () => {
        try {
            const identifier = userPhone;
            const response = await axios.post('/api/users/verify-code', { identifier, code: verificationCode });
            if (response.data.verified) {
                setIsVerified(true);
                alert('인증번호가 확인되었습니다.');
            } else {
                setIsVerified(false);
                alert('인증번호가 일치하지 않습니다.');
            }
        } catch (error) {
            alert('인증번호 확인 오류');
            setIsVerified(false);
        }
    };

    //frontend
    const [monthselected, setMonthSelected] = useState(null);
    const [dayselected, setDaySelected] = useState(null);
    const [yearselected, setYearSelected] = useState(null);

    const yearOptions = [];
    for (let year = 2024; year >= 1910; year--) {
        yearOptions.push({ value: year, label: year + '년' });
    }

    const monthOptions = [
        { value: '1월', label: '1월' },
        { value: '2월', label: '2월' },
        { value: '3월', label: '3월' },
        { value: '4월', label: '4월' },
        { value: '5월', label: '5월' },
        { value: '6월', label: '6월' },
        { value: '7월', label: '7월' },
        { value: '8월', label: '8월' },
        { value: '9월', label: '9월' },
        { value: '10월', label: '10월' },
        { value: '11월', label: '11월' },
        { value: '12월', label: '12월' },
    ];

    const dayOptions = [
        { value: '1일', label: '1일' },
        { value: '2일', label: '2일' },
        { value: '3일', label: '3일' },
        { value: '4일', label: '4일' },
        { value: '5일', label: '5일' },
        { value: '6일', label: '6일' },
        { value: '7일', label: '7일' },
        { value: '8일', label: '8일' },
        { value: '9일', label: '9일' },
        { value: '10일', label: '10일' },
        { value: '11일', label: '11일' },
        { value: '12일', label: '12일' },
        { value: '13일', label: '13일' },
        { value: '14일', label: '14일' },
        { value: '15일', label: '15일' },
        { value: '16일', label: '16일' },
        { value: '17일', label: '17일' },
        { value: '18일', label: '18일' },
        { value: '19일', label: '19일' },
        { value: '20일', label: '20일' },
        { value: '21일', label: '21일' },
        { value: '22일', label: '22일' },
        { value: '23일', label: '23일' },
        { value: '24일', label: '24일' },
        { value: '25일', label: '25일' },
        { value: '26일', label: '26일' },
        { value: '27일', label: '27일' },
        { value: '28일', label: '28일' },
        { value: '29일', label: '29일' },
        { value: '30일', label: '30일' },
        { value: '31일', label: '31일' },
    ];

    const onChangeMonthSelect = (option) => {
        setMonthSelected(option);
    };
    const onChangeDaySelect = (option) => {
        setDaySelected(option);
    };
    const onChangeYearSelect = (option) => {
        setYearSelected(option);
    };

    return(
        <form className="signUp-wrapper" onSubmit={handleSubmit}>
            <h1 className='title'>회원가입</h1>
            <div className="inputBox-id inputBox">
                <div className="inputBox-headText">아이디</div>
                <div className="inputBox-id-container">
                    <input type="text" placeholder="아이디" className="text-field id-input"
                           value={userId}
                           onChange={(e) => {
                               setUserId(e.target.value);
                               setIsIdValid(false);
                           }}
                           required></input>
                    <button type="button" className='overlapCheck'
                            onClick={checkIdAvailability}
                    >중복확인</button>
                </div>
            </div>
            <div className="inputBox-pw inputBox">
                <div className="inputBox-headText">비밀번호</div>
                <input type="password" placeholder="비밀번호" className="text-field"
                       value={userPassword} onChange={(e) =>
                    setUserPassword(e.target.value)} required></input>
                <div className="warningMsg">*대문자, 특수문자 포함해서 8자리 이상으로 이루어진 비밀번호</div>
            </div>
            <div className="inputBox-checkPw inputBox">
                <div className="inputBox-headText">비밀번호 확인</div>
                <input type="password" placeholder="비밀번호 확인" className="text-field"
                       value={userPasswordConfirm} onChange={(e) =>
                    setUserPasswordConfirm(e.target.value)} required></input>
                <p className="warningMsg">{passwordError}</p>
            </div>
            <div className='inputBox-userIfo inputBox'>
                <div className='inputBox-headText'>생년월일</div>
                <div className='select-box'>
                    <Select
                        onChange={onChangeYearSelect}
                        options={yearOptions}
                        value={yearselected}
                        placeholder="년도"
                    />
                    <Select
                        onChange={onChangeMonthSelect}
                        options={monthOptions}
                        value={monthselected}
                        placeholder="월"
                    />
                    <Select
                        onChange={onChangeDaySelect}
                        options={dayOptions}
                        value={dayselected}
                        placeholder="일"
                    />
                </div>
            </div>
            <div className='inputBox-name inputBox'>
                <div className='inputBox-headText'>이름</div>
                <input placeholder='이름' className='text-field'
                       value={userName} onChange={(e) => setUserName(e.target.value)} required></input>
            </div>
            <div className='inputBox-tel inputBox'>
                <div className='inputBox-headText'>휴대폰 번호</div>
                <input placeholder='전화번호' className='text-field check-form'
                       value={userPhone}
                       onChange={(e) => {
                           const phone = e.target.value;
                           setUserPhone(phone);
                       }}
                       required></input>
                <button type="button" className='overlapCheck check1'
                        onClick={sendVerificationCode}>인증번호 받기
                </button>
                <input placeholder='인증번호' className='text-field'
                       value={verificationCode} onChange={(e) =>
                        setVerificationCode(e.target.value)}></input>
                <button type="button" className='overlapCheck check2'
                        onClick={verifyCode}>인증번호 확인
                </button>
            </div>
            <div className='inputBox-email inputBox'>
                <div className='inputBox-headText'>이메일</div>
                <input placeholder='이메일' className='text-field check-form'
                       value={userEmail}
                       onChange={(e) => {
                           setUserEmail(e.target.value);
                           setIsEmailValid(false);
                       }}
                       required></input>
                <button type="button" className='overlapCheck'
                        onClick={checkEmailAvailability}>중복확인</button>
            </div>
            <button className='btn btnOk'>회원가입</button>
        </form>
    )
}

export default SignUpPage;
