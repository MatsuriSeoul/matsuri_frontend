import React from 'react';
import '../../css/noticePage/noticeView.css';
const NoticeView = () => {
  return (
        <div className="noticeView-container">
            <div className='headText'>공지사항</div>
            <div className="titleText">7월11일(목) 서버 점검 안내 (09:00~16:00)</div>
            <div className="post-info">
                <div className='profile-picture'></div>
                <div className='detail-wrap'>
                    <p className='author-info'><b>작성자</b></p>
                    <p className='datetext'><b>작성일자</b></p>
                </div>
                <div className='detail-info'>
                    <p className='author-name'>관리자</p>
                    <div className='dateView'>
                        <p className='date'>2024-07-07 00:28:37</p>
                        <p className='views'>조회수 : 867</p>
                    </div>    
                </div> 
            </div>
            <div className="content">
                안녕하세요, MIX 핵심역량 진단 안내드립니다. <br />
                모빌리티 핵심역량 수준을 파악하여 역량강화 및 진로개발을 지원하기 위하여 핵심역량 진단을 추진합니다. <br />
                핵심역량 진단 매뉴얼을 확인하시고 경력관리시스템에서 핵심역량 진단을 진행해주시길 바랍니다.
                <br /> 
                <br />
                <br />
                <b>
                진단 기간: ~ 2024. 7. 12.(금) 자정 까지(연장) <br />
                진단 방법: 온라인 진단(경력관리시스템>역량진단>핵심역량진단) <br />
                진단 혜택: 비교과 마일리지 점수 10점 부여
                </b>
            </div>
            <div className="attachment">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.8358 4.02417C11.8123 3.52417 11.6951 3.05347 11.4842 2.61206C11.2733 2.17065 10.9842 1.78198 10.617 1.44604C10.2342 1.10229 9.81036 0.852295 9.34552 0.696045C8.88067 0.539795 8.40997 0.473389 7.93341 0.496826C7.45685 0.520264 6.99396 0.633545 6.54474 0.83667C6.09552 1.03979 5.69903 1.33276 5.35528 1.71558L0.913877 6.63745L0.79669 6.76636C0.781065 6.78198 0.767393 6.79761 0.755674 6.81323C0.743955 6.82886 0.73419 6.84448 0.726377 6.86011C0.531065 7.12573 0.38458 7.41675 0.286924 7.73315C0.189268 8.04956 0.148252 8.37573 0.163877 8.71167C0.179502 9.10229 0.269346 9.46948 0.433409 9.81323C0.597471 10.157 0.820127 10.4578 1.10138 10.7156C1.367 10.95 1.66388 11.1316 1.992 11.2605C2.32013 11.3894 2.66388 11.4539 3.02325 11.4539C3.04669 11.4539 3.07208 11.4519 3.09942 11.448C3.12677 11.4441 3.15606 11.4421 3.18731 11.4421C3.57013 11.4265 3.93341 11.3367 4.27716 11.1726C4.62091 11.0085 4.92169 10.782 5.1795 10.4929L7.52325 7.90308L9.62091 5.58276C9.79278 5.38745 9.92364 5.1687 10.0135 4.92651C10.1033 4.68433 10.1404 4.43042 10.1248 4.16479C10.1092 3.89917 10.0467 3.64917 9.93731 3.41479C9.82794 3.18042 9.6756 2.97729 9.48028 2.80542C9.08185 2.43823 8.6131 2.26636 8.07403 2.28979C7.53497 2.31323 7.08185 2.52026 6.71466 2.91089C6.71466 2.9187 6.71271 2.92261 6.7088 2.92261C6.70489 2.92261 6.70294 2.92261 6.70294 2.92261L6.69122 2.93433C6.69122 2.93433 6.69122 2.93628 6.69122 2.94019C6.69122 2.94409 6.69122 2.94604 6.69122 2.94604L3.62091 6.33276C3.52716 6.43433 3.48419 6.55347 3.492 6.69019C3.49981 6.8269 3.5545 6.94214 3.65606 7.03589C3.70294 7.08276 3.75567 7.11597 3.81427 7.1355C3.87286 7.15503 3.93341 7.16479 3.99591 7.16479C4.06622 7.16479 4.13263 7.15112 4.19513 7.12378C4.25763 7.09644 4.31622 7.05542 4.37091 7.00073L7.4295 3.61401C7.60919 3.41089 7.8338 3.30347 8.10333 3.29175C8.37286 3.28003 8.60528 3.36401 8.8006 3.5437C8.90216 3.62964 8.98028 3.7312 9.03497 3.84839C9.08966 3.96558 9.12091 4.08667 9.12872 4.21167C9.12872 4.34448 9.10724 4.47144 9.06427 4.59253C9.0213 4.71362 8.95685 4.82104 8.87091 4.91479L4.44122 9.82495C4.26935 10.0125 4.07013 10.1589 3.84356 10.2644C3.617 10.3699 3.37872 10.4304 3.12872 10.446C2.87872 10.4617 2.63653 10.4285 2.40216 10.3464C2.16778 10.2644 1.95685 10.1375 1.76935 9.96558C1.58966 9.80151 1.44708 9.6062 1.34161 9.37964C1.23614 9.15308 1.1756 8.91479 1.15997 8.66479C1.15216 8.41479 1.18927 8.17261 1.2713 7.93823C1.35333 7.70386 1.48028 7.49292 1.65216 7.30542L6.10528 2.38354C6.35528 2.11011 6.64435 1.89722 6.97247 1.74487C7.3006 1.59253 7.63849 1.50854 7.98614 1.49292C8.3338 1.47729 8.67755 1.52808 9.01739 1.64526C9.35724 1.76245 9.66778 1.94604 9.94903 2.19604C10.2147 2.43823 10.4236 2.72144 10.576 3.04565C10.7283 3.36987 10.8162 3.71167 10.8397 4.07104C10.8553 4.43823 10.8025 4.78979 10.6815 5.12573C10.5604 5.46167 10.3787 5.76636 10.1365 6.03979L6.97247 9.52026C6.88653 9.62964 6.84552 9.75269 6.84942 9.8894C6.85333 10.0261 6.90997 10.1414 7.01935 10.2351C7.06622 10.2742 7.117 10.3054 7.17169 10.3289C7.22638 10.3523 7.28497 10.364 7.34747 10.364C7.41778 10.364 7.48419 10.3503 7.54669 10.323C7.60919 10.2957 7.66778 10.2546 7.72247 10.2L10.8748 6.70776C11.2108 6.34058 11.4608 5.92456 11.6248 5.45972C11.7889 4.99487 11.8592 4.51636 11.8358 4.02417Z" fill="#222222"/>
                </svg>
                <p>첨부파일</p>
            </div>
            <div className='file-wrap'>
                <div className='attachment-icon'
                     style={{
                    backgroundImage: `url('/img/notice/attachment-Image.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}></div>
            </div>
            <button className='listBtn'>목록보기</button>
        </div>
  );
}

export default NoticeView;