import React, { useState } from 'react';
import '../../css/login/SignUpPage.css';

const SignUpPage = () => {
    const [selectedMonth, setSelectedMonth] = useState('');
    const [selectedDay, setSelectedDay] = useState('');

    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const handleMonthChange = (e) => {
        setSelectedMonth(e.target.value);
        setSelectedDay('');
    };

    const handleDayChange = (e) => {
        setSelectedDay(e.target.value);
    };

    return(
        <div>
            <form>
                <section className="SignUpPage-container">
                    <div className="signUp-wrapper">
                        <div className="inputBox-id inputBox">
                            <div className="inputBox-headText">아이디</div>
                            <div className="inputBox-id-container">
                                <input type="text" placeholder="아이디" className="text-field id-input"></input>
                                <button type="button" className='overlapCheck'>중복확인</button>
                            </div>
                        </div>
                        <div className="inputBox-pw inputBox">
                            <div className="inputBox-headText">비밀번호</div>
                            <input type="password" placeholder="비밀번호" className="text-field"></input>
                            <div className="warningMsg">*다른 아이디/사이트에서 사용한 적 없는 비밀번호</div>
                            <div className="warningMsg">*대문자, 특수문자 포함해서 8자리 이상으로 이루어진 비밀번호</div>
                        </div>
                        <div className="inputBox-checkPw inputBox">
                            <div className="inputBox-headText">비밀번호 확인</div>
                            <input type="password" placeholder="비밀번호 확인" className="text-field"></input>
                        </div>
                        <div className='inputBox-userIfo inputBox'>
                            <div className='inputBox-headText'>생년월일</div>
                            <input placeholder="년(4자리)" className="text-field"></input>
                            <select id="month" value={selectedMonth} onChange={handleMonthChange} className='text-field'>
                                <option value="">월</option>
                                {months.map(month => (
                                <option key={month} value={month}>
                                    {month < 10 ? `0${month}` : month}
                                </option>
                                ))}
                            </select>

                            <select id="day" value={selectedDay} onChange={handleDayChange} disabled={!selectedMonth} className='text-field'>
                                <option value="">일</option>
                                {days
                                .filter(day => {
                                    if (selectedMonth === '2') {
                                    return day <= 29;
                                    }
                                    if (['4', '6', '9', '11'].includes(selectedMonth)) {
                                    return day <= 30;
                                    }
                                    return day <= 31;
                                })
                                .map(day => (
                                    <option key={day} value={day}>
                                    {day < 10 ? `0${day}` : day}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='inputBox-name inputBox'>
                            <div className='inputBox-headText'>이름</div>
                            <input placeholder='이름' className='text-field'></input>
                        </div>
                        <div className='inputBox-tel inputBox'>
                            <div className='inputBox-headText'>휴대폰 번호</div>
                            <input placeholder='전화번호' className='text-field'></input>
                        </div>
                        <div className='inputBox-email inputBox'>
                            <div className='inputBox-headText'>이메일</div>
                            <input placeholder='이메일' className='text-field'></input>
                        </div>

                        <div className='btn-wrap inputBox'>
                            <button className='btn btnOk'>확인</button>
                        </div>
                    </div>
                </section>
            </form>
        </div>
    )
}

export default SignUpPage;
