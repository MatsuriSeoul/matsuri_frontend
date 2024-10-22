import React from "react";
import '../../css/login/SearchPw.css';

const SearchPw = () => {
    return(
        <div>
            <form>
                <section className="searchPw-container">
                    <div className="searchPw-wrapper">
                        <div className="logo"></div>
                        <div className="headText">비밀번호를 찾고자하는 아이디를 입력해주세요.</div>
                        <input type="text" className="text-field" placeholder="아이디"></input>
                        <button className="btnOk">다음</button>
                    </div>
                </section>
            </form>
        </div>
    )
}

export default SearchPw;