import React, { useState } from 'react';
import Select from 'react-select';

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
        <form className="signUp-wrapper">
            <h1 className='title'>회원가입</h1>
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
            <button className='btn btnOk'>회원가입</button>
        </form>
    )
}

export default SignUpPage;
