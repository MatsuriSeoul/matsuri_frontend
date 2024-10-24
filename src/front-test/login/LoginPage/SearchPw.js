import React, {useState} from "react";


const SearchPw = () => {
    const [findType, setFindType ] = useState('Phone');
    const [checkNum, setCheckNum ] = useState(false);

    const ChangeFindType = (type) =>{
        setFindType(type);
    }

    const handleFindSubmit = () => {

    };

    const handleCheckSubmit = (event) => {
        event.preventDefault();
        setCheckNum(true);
    };

    return (
        <form className='findPw-form'>
            <h1 className='title'>비밀번호 찾기</h1>
            <div className='tabbox'>
                <div className={`topBox ${findType === 'Phone' ? 'active' : ''}`}
                     onClick={() => ChangeFindType('Phone')}>
                    <div className='tab'>Phone</div>
                </div>
                <div className={`topBox ${findType === 'Email' ? 'active' : ''}`}
                     onClick={() => ChangeFindType('Email')}>
                    <div className='tab'>Email</div>
                </div>
            </div>
            <div className="bottomBox">
                <div className="InputBox">
                    <input type="text" placeholder="이름 입력" className="username input-info"></input>
                    {findType === 'Email' ? (
                        <input type="Email" placeholder={`${findType} 입력`} className="usernumber input-info"></input>
                    ) : (
                        <input type="tel" placeholder={`${findType} 입력`} className="usernumber input-info"></input>
                    )}

                    <div className='check-number-box'>
                        <input type="text" placeholder="Phone" className="check-number"></input>
                        <button type='submit' className='check-btn'
                                onClick={handleCheckSubmit}>인증
                        </button>
                    </div>
                </div>
                {checkNum && <p className='error'>인증번호 발송에 실패했습니다. 입력한 정보를 다시 확인해주세요.</p>}
                <button type='submit' className="findBtn"
                        onClick={handleFindSubmit}>확인
                </button>
            </div>
        </form>
    )
}

export default SearchPw;