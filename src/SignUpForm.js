import React, { useState } from 'react';
import axios from 'axios';

function SignUpForm() {
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userBirthday, setUserBirthday] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userInfo = {
            userId,
            userName,
            userEmail,
            userPassword,
            userBirthday,
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

    return (
        <form onSubmit={handleSubmit}>
            <label>
                아이디:
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
            </label>
            <br />
            <label>
                이름:
                <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
            </label>
            <br />
            <label>
                이메일:
                <input type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} required />
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
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignUpForm;
