import React, { useState } from 'react';
import axios from 'axios';

function SignUpForm() {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userBirthday, setUserBirthday] = useState('');
    const [userPhone, setUserPhone] = useState('');
    const [idError, setIdError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [isIdValid, setIsIdValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!isIdValid || !isEmailValid) {
            alert('아이디와 이메일 중복 확인을 해주세요.');
            return;
        }

        const userInfo = {
            userId,
            userName,
            userEmail,
            userPassword,
            userBirthday,
            userPhone
        };

        try {
            const response = await axios.post('/api/users/save', userInfo);
            alert(response.data);
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            } else {
                alert('회원가입 오류');
            }
        }
    };

    const checkIdAvailability = async () => {
        if (userId.trim()=== '') {
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
                setIdError('사용 가능한 아이디입니다.')
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
                비밀번호:
                <input type="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} required />
            </label>
            <br />
            <label>
                생일:
                <input type="date" value={userBirthday} onChange={(e) => setUserBirthday(e.target.value)} required />
            </label>
            <br />
            <label>
                휴대폰 번호:
                <input type="tel" value={userPhone} onChange={(e) => setUserPhone(e.target.value)} required />
            </label>
            <br />
            <button type="submit">가입</button>
        </form>
    );
}

export default SignUpForm;
