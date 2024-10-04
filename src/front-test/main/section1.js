import React, { useRef, useState, useEffect } from 'react';


const Section1 = () =>{
    const [likeToglled, setlLikeToggled] = useState(false);

    const handleLikeToggle = () => {
        setlLikeToggled(prevState => !prevState);
      };

    return(
        <section className="main_sec1">
            <article className="recommend">
                <div className="category-title">
                    <h3 className="area">서울/경기 핫!스팟</h3>
                    <div className="wall"></div>
                    <p className="right">각 지역별 축제 데이터를 기반으로 추천 행사를 알려드려요.</p>
                </div>
                <div className="area-category">
                    <div className="left">
                        <p>경기도 추천 행사</p>
                    </div>
                    <div className="wall"></div>
                    <div className="right">
                        <p>서울 추천 행사</p>
                    </div>
                </div>
                <h4 className="comment">당신에게 운영자가 추천하고 싶은 행사 입니다!</h4>
                <div className="area-info-box">
                    {/* left-box */}
                    <div className="box box1">
                        <div className="like-btn" onClick={handleLikeToggle}>
                            <img src={likeToglled ? "/img/icon/heart-fill.svg" : "/img/icon/heart.svg"}></img>
                        </div>
                        <div className="txt">
                            <h4 className="title">황룡원</h4>
                            <p className="address">경상북도 경주시</p>
                        </div>
                    </div>
                    <div className="box box2">
                        <div className="like-btn" onClick={handleLikeToggle}>
                            <img src="/img/icon/heart.svg"></img>
                        </div>
                        <div className="txt">
                            <h4 className="title">황룡원</h4>
                            <p className="address">경상북도 경주시</p>
                        </div>
                    </div>
                    {/* right-box */}
                    <div className="box box3">
                        <div className="like-btn" onClick={handleLikeToggle}>
                            <img src="/img/icon/heart.svg"></img>
                        </div>
                        <div className="txt">
                            <h4 className="title">황룡원</h4>
                            <p className="address">경상북도 경주시</p>
                        </div>
                    </div>
                    <div className="box box4">
                        <div className="like-btn" onClick={handleLikeToggle}>
                            <img src="/img/icon/heart.svg"></img>
                        </div>
                        <div className="txt">
                            <h4 className="title">황룡원</h4>
                            <p className="address">경상북도 경주시</p>
                        </div>
                    </div>
                </div>
            </article>
            <div className="announcement">
                <div className="title">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M720-440v-80h160v80H720Zm48 280-128-96 48-64 128 96-48 64Zm-80-480-48-64 128-96 48 64-128 96ZM200-200v-160h-40q-33 0-56.5-23.5T80-440v-80q0-33 23.5-56.5T160-600h160l200-120v480L320-360h-40v160h-80Zm240-182v-196l-98 58H160v80h182l98 58Zm120 36v-268q27 24 43.5 58.5T620-480q0 41-16.5 75.5T560-346ZM300-480Z"/></svg>
                    </div>
                    <h3>공지사항</h3>
                </div>
                <ul className="announcement-list">
                    <li>
                        <div className="icon">공지</div>
                        <p className="announcement-info">웹 서버 점검 안내</p>
                    </li>
                    <li>
                        <div className="icon">공지</div>
                        <p className="announcement-info">웹 서버 점검 안내</p>
                    </li>
                    <li>
                        <div className="icon">공지</div>
                        <p className="announcement-info">경기도에서 열리는 행사 모음</p>
                    </li>
                    <li>
                        <div className="icon">공지</div>
                        <p className="announcement-info">달력 기능 업데이트 안내</p>
                    </li>
                    <li className="last-li">
                        <div className="icon">공지</div>
                        <p className="announcement-info">자주 묻는 질문</p>
                    </li>
                </ul>
            </div> 
        </section>
    )
}
export default Section1;