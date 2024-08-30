import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SignUpForm() {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userPasswordConfirm, setUserPasswordConfirm] = useState(''); // 비밀번호 확인
    const [userBirthday, setUserBirthday] = useState('');
    const [idError, setIdError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState(''); // 비밀번호 오류 메시지
    const [birthdayError, setBirthdayError] = useState(''); // 생일 오류 메시지
    const [isIdValid, setIsIdValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [verificationType, setVerificationType] = useState(''); // 인증 방식 (email 또는 phone)

    // 전화번호 형식 검사 함수 (숫자 10~11자리만 허용)
    const validatePhone = (phone) => {
        const phonePattern = /^010\d{8}$/;
        return phonePattern.test(phone);
    };

    // 나이 검사 함수 (만 14세 이상 여부)
    const validateBirthday = (birthday) => {
        const today = new Date();
        const birthDate = new Date(birthday);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            return age - 1;
        }
        return age;
    };

    // 비밀번호 확인 로직
    useEffect(() => {
        if (userPassword && userPasswordConfirm) {
            if (userPassword === userPasswordConfirm) {
                setPasswordError('입력한 비밀번호와 일치합니다.');
            } else {
                setPasswordError('입력한 비밀번호와 일치하지 않습니다.');
            }
        } else {
            setPasswordError('');
        }
    }, [userPassword, userPasswordConfirm]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userAge = validateBirthday(userBirthday);

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
        if (!isPhoneValid) {
            alert('휴대폰 번호 중복 검사를 완료해주세요.');
            return;
        }
        if (!codeSent || !isVerified) {
            alert('본인 인증을 완료해주세요.');
            return;
        }
        if (!userPassword) {
            alert('비밀번호를 입력해주세요.');
            return;
        }
        if (userPassword !== userPasswordConfirm) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        if (!userBirthday) {
            alert('생일을 입력해주세요.');
            return;
        }
        if (userAge < 14) {
            setBirthdayError('만 14세 미만은 가입할 수 없습니다.');
            return;
        }

        const userInfo = {
            userId,
            userName,
            userEmail,
            userPhone,
            userPassword,
            userBirthday,
        };

        try {
            const response = await axios.post('/api/users/save', userInfo);
            alert('회원가입 성공: ' + response.data);
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
            setIdError('아이디를 입력하세요');
            setIsIdValid(false);
            return;
        }
        try {
            const response = await axios.get(`/api/users/check-id/${userId}`);
            if (response.data.exists) {
                setIdError('이미 사용 중인 아이디입니다.');
                setIsIdValid(false);
            } else {
                setIdError('사용 가능한 아이디입니다.');
                setIsIdValid(true);
            }
        } catch (error) {
            setIdError('아이디 중복 검사 오류');
            setIsIdValid(false);
        }
    };

    const checkEmailAvailability = async () => {
        if (userEmail.trim() === '') {
            setEmailError('이메일을 입력하세요.');
            setIsEmailValid(false);
            return;
        }
        try {
            const response = await axios.get(`/api/users/check-email/${userEmail}`);
            if (response.data.exists) {
                setEmailError('이미 사용 중인 이메일입니다.');
                setIsEmailValid(false);
            } else {
                setEmailError('사용 가능한 이메일입니다.');
                setIsEmailValid(true);
            }
        } catch (error) {
            setEmailError('이메일 중복 검사 오류');
            setIsEmailValid(false);
        }
    };

    const checkPhoneAvailability = async () => {
        if (userPhone.trim() === '') {
            setPhoneError('휴대폰 번호를 입력하세요.');
            setIsPhoneValid(false);
            return;
        }
        try {
            const response = await axios.get(`/api/users/check-phone/${userPhone}`);
            if (response.data.exists) {
                setPhoneError('이미 사용 중인 휴대폰 번호입니다.');
                setIsPhoneValid(false);
            } else {
                setPhoneError('사용 가능한 휴대폰 번호입니다.');
                setIsPhoneValid(true);
            }
        } catch (error) {
            setPhoneError('휴대폰 번호 중복 검사 오류');
            setIsPhoneValid(false);
        }
    };

    const sendVerificationCode = async (type) => {
        try {
            setVerificationType(type);
            const identifier = type === 'email' ? userEmail : userPhone;
            await axios.post('/api/users/send-verification-code', { identifier, type });
            setCodeSent(true);
            alert(`${type === 'email' ? '이메일' : '휴대폰'}로 인증번호가 발송되었습니다.`);
        } catch (error) {
            alert('인증번호 발송 오류');
        }
    };

    const verifyCode = async () => {
        try {
            const identifier = verificationType === 'email' ? userEmail : userPhone;
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

    return (
        <form onSubmit={handleSubmit}>
            <h1>회원가입</h1>
            <label>
                아이디:
                <input type="text"
                       value={userId}
                       onChange={(e) => {
                           setUserId(e.target.value);
                           setIdError('');
                           setIsIdValid(false);
                       }}
                       required />
                <button type="button" onClick={checkIdAvailability}>중복 확인</button>
                {idError && <p>{idError}</p>}
            </label>
            <br />
            <label>
                이름:
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
            </label>
            <br />
            <label>
                이메일:
                <input type="email"
                       value={userEmail}
                       onChange={(e) => {
                           setUserEmail(e.target.value);
                           setEmailError('');
                           setIsEmailValid(false);
                       }}
                       required />
                <button type="button" onClick={checkEmailAvailability}>중복 확인</button>
                {emailError && <p>{emailError}</p>}
            </label>
            <br />
            <label>
                휴대폰 번호:
                <input type="tel"
                       value={userPhone}
                       onChange={(e) => {
                           const phone = e.target.value;
                           setUserPhone(phone);
                           setPhoneError(validatePhone(phone) ? '' : '휴대폰 번호 형식이 잘못되었습니다.');
                           setIsPhoneValid(false);
                       }}
                       placeholder="010XXXXXXXX"
                       required />
                <button type="button" onClick={checkPhoneAvailability}>중복 확인</button>
                {phoneError && <p>{phoneError}</p>}
            </label>
            <br />
            <label>
                본인 인증:
                <button type="button" onClick={() => sendVerificationCode('email')} disabled={!isEmailValid || codeSent}>이메일 인증</button>
                <button type="button" onClick={() => sendVerificationCode('phone')} disabled={!isPhoneValid || codeSent}>휴대폰 인증</button>
            </label>
            <br />
            {codeSent && (
                <label>
                    인증번호:
                    <input type="text" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
                    <button type="button" onClick={verifyCode}>인증번호 확인</button>
                </label>
            )}
            <br />
            <label>
                비밀번호:
                <input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required />
            </label>
            <br />
            <label>
                비밀번호 확인:
                <input type="password" value={userPasswordConfirm} onChange={(e) => setUserPasswordConfirm(e.target.value)} required />
                {passwordError && <p style={{ color: userPassword === userPasswordConfirm ? 'blue' : 'red' }}>{passwordError}</p>}
            </label>
            <br />
            <label>
                생일:
                <input type="date" value={userBirthday} onChange={(e) => {
                    setUserBirthday(e.target.value);
                    setBirthdayError(validateBirthday(e.target.value) < 14 ? '만 14세 미만은 가입할 수 없습니다.' : '');
                }} required />
                {birthdayError && <p style={{ color: 'red' }}>{birthdayError}</p>}
            </label>
            <br />
            <button type="submit" disabled={birthdayError !== ''}>가입</button>
        </form>
    );
}

export default SignUpForm;
